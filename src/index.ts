import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { setKickflowAccessToken } from './kickflow-api/custom-axios-instance.js'
import { allTools } from './tools/index.js'

// コマンドライン引数からトークンを取得
function parseArguments() {
  const args = process.argv.slice(2)
  const tokenArgPrefix = '--kickflow-access-token='

  // ヘルプメッセージの表示
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`Kickflow MCP Server

使用方法:
  kickflow-mcp-server [オプション]

オプション:
  --kickflow-access-token=TOKEN  Kickflow アクセストークン
  --help, -h                     このヘルプメッセージを表示

環境変数:
  KICKFLOW_ACCESS_TOKEN          Kickflow アクセストークン（コマンドライン引数が優先されます）
`)
    process.exit(0)
  }

  // 引数からトークンを探す
  const tokenArg = args.find((arg) => arg.startsWith(tokenArgPrefix))
  if (tokenArg) {
    return tokenArg.substring(tokenArgPrefix.length)
  }

  // 環境変数からトークンを取得
  return process.env.KICKFLOW_ACCESS_TOKEN
}

// トークンの取得
const ACCESS_TOKEN = parseArguments()
if (!ACCESS_TOKEN) {
  console.error(`エラー: Kickflow アクセストークンが必要です

以下のいずれかの方法でアクセストークンを指定してください:
1. コマンドライン引数: --kickflow-access-token=YOUR_TOKEN
2. 環境変数: KICKFLOW_ACCESS_TOKEN=YOUR_TOKEN

例:
  npx kickflow-mcp-server --kickflow-access-token=YOUR_TOKEN
  
  または
  
  KICKFLOW_ACCESS_TOKEN=YOUR_TOKEN npx kickflow-mcp-server
`)
  process.exit(1)
}

// アクセストークンを設定
setKickflowAccessToken(ACCESS_TOKEN)

// Create server instance
const server = new McpServer({
  name: 'kickflow',
  version: '0.0.1',
  capabilities: {
    resources: {},
    tools: {},
  },
})

// Register all tools dynamically
for (const tool of allTools) {
  server.tool(tool.name, tool.description, tool.inputSchema, tool.execute)
}

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Kickflow MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
