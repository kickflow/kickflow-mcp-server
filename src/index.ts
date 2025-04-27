import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { setKickflowAccessToken } from './kickflow-api/custom-axios-instance.js'
import { getKickflowRESTAPIV1 } from './kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  GetTicketsStatusOneOfItem as TicketStatusEnum,
  GetTicketsAssigneeStatusItem as AssigneeStatusEnum,
} from './kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

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
  name: 'kickflow-mcp-server',
  version: '0.0.1',
  capabilities: {
    resources: {},
    tools: {},
  },
})

// get_tickets ツールの登録
server.tool(
  'get_tickets',
  'チケットの一覧を取得します',
  {
    page: z
      .number()
      .int()
      .min(1)
      .optional()
      .describe('ページ番号（1から始まる）'),
    perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
    sortBy: z
      .enum(['createdAt', 'updatedAt'])
      .optional()
      .describe('ソート。指定可能なフィールド: createdAt, updatedAt'),
    status: z
      .union([
        z.enum(Object.values(TicketStatusEnum) as [string, ...string[]]),
        z.array(
          z.enum(Object.values(TicketStatusEnum) as [string, ...string[]]),
        ),
      ])
      .optional()
      .describe('ステータスの配列または単一ステータス'),
    subStatusIds: z
      .array(z.string().uuid())
      .optional()
      .describe('サブステータスのUUIDの配列'),
    workflowId: z.string().uuid().optional().describe('ワークフローのUUID'),
    authorId: z.string().uuid().optional().describe('申請者のUUID'),
    authorTeamFullName: z
      .string()
      .optional()
      .describe('申請時に選択したチームの上位組織を含む名前'),
    ticketNumber: z.string().optional().describe('チケット番号'),
    createdAtStart: z
      .string()
      .optional()
      .describe('作成日時の起点 (RFC3339形式)'),
    createdAtEnd: z
      .string()
      .optional()
      .describe('作成日時の終点 (RFC3339形式)'),
    updatedAtStart: z
      .string()
      .optional()
      .describe('更新日時の起点 (RFC3339形式)'),
    updatedAtEnd: z
      .string()
      .optional()
      .describe('更新日時の終点 (RFC3339形式)'),
    openedAtStart: z
      .string()
      .optional()
      .describe('申請日時の起点 (RFC3339形式)'),
    openedAtEnd: z.string().optional().describe('申請日時の終点 (RFC3339形式)'),
    completedAtStart: z
      .string()
      .optional()
      .describe('完了日時の起点 (RFC3339形式)'),
    completedAtEnd: z
      .string()
      .optional()
      .describe('完了日時の終点 (RFC3339形式)'),
    archivedAtStart: z
      .string()
      .optional()
      .describe('アーカイブ日時の起点 (RFC3339形式)'),
    archivedAtEnd: z
      .string()
      .optional()
      .describe('アーカイブ日時の終点 (RFC3339形式)'),
    assigneeUserId: z
      .string()
      .uuid()
      .optional()
      .describe('承認者のUUID。assigneeStatusとセットで指定'),
    assigneeStatus: z
      .array(z.enum(Object.values(AssigneeStatusEnum) as [string, ...string[]]))
      .optional()
      .describe('承認者の状態。assigneeUserIdとセットで指定'),
    stepTitle: z.string().optional().describe('現在の承認ステップ名'),
  },
  async (params) => {
    try {
      const api = getKickflowRESTAPIV1()

      // undefinedでないパラメータだけを抽出してapiParamsに設定
      const apiParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined),
      )

      // チケット一覧の取得
      const tickets = await api.getTickets(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(tickets, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)

      let errorMessage = 'チケット一覧の取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      return {
        content: [
          {
            type: 'text',
            text: errorMessage,
          },
        ],
        isError: true,
      }
    }
  },
)

// get_ticket ツールの登録
server.tool(
  'get_ticket',
  '指定したチケットの詳細情報を取得します',
  {
    ticketId: z.string().uuid().describe('チケットのUUID'),
  },
  async (params) => {
    try {
      const api = getKickflowRESTAPIV1()

      // チケット詳細の取得
      const ticket = await api.getTicketsTicketId(params.ticketId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(ticket, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching ticket details:', error)

      let errorMessage = 'チケット詳細の取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      return {
        content: [
          {
            type: 'text',
            text: errorMessage,
          },
        ],
        isError: true,
      }
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Kickflow MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
