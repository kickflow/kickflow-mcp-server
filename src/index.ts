#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { KickflowClient } from './kickflow-api/client.js';
import { handleSearchTickets } from './tools/search-tickets.js';
import { handleGetTicket } from './tools/get-ticket.js';

// コマンドライン引数からトークンを取得
function parseArguments() {
  const args = process.argv.slice(2);
  const tokenArgPrefix = '--kickflow-api-token=';
  
  // ヘルプメッセージの表示
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`Kickflow MCP Server

使用方法:
  kickflow-mcp-server [オプション]

オプション:
  --kickflow-api-token=TOKEN  Kickflow APIトークン
  --help, -h                  このヘルプメッセージを表示

環境変数:
  KICKFLOW_API_TOKEN          Kickflow APIトークン（コマンドライン引数が優先されます）
`);
    process.exit(0);
  }

  // 引数からトークンを探す
  const tokenArg = args.find(arg => arg.startsWith(tokenArgPrefix));
  if (tokenArg) {
    return tokenArg.substring(tokenArgPrefix.length);
  }
  
  // 環境変数からトークンを取得
  return process.env.KICKFLOW_API_TOKEN;
}

// トークンの取得
const API_TOKEN = parseArguments();
if (!API_TOKEN) {
  console.error(`エラー: Kickflow APIトークンが必要です

以下のいずれかの方法でAPIトークンを指定してください:
1. コマンドライン引数: --kickflow-api-token=YOUR_TOKEN
2. 環境変数: KICKFLOW_API_TOKEN=YOUR_TOKEN

例:
  npx kickflow-mcp-server --kickflow-api-token=YOUR_TOKEN
  
  または
  
  KICKFLOW_API_TOKEN=YOUR_TOKEN npx kickflow-mcp-server
`);
  process.exit(1);
}

/**
 * Kickflow MCP サーバークラス
 */
class KickflowServer {
  private server: Server;
  private kickflowClient: KickflowClient;

  constructor() {
    // MCP サーバーの初期化
    this.server = new Server(
      {
        name: 'kickflow-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Kickflow APIクライアントの初期化
    // API_TOKENは最初のチェックで存在確認済み
    this.kickflowClient = new KickflowClient(API_TOKEN as string);

    // ツールハンドラーの設定
    this.setupToolHandlers();
    
    // エラーハンドリング
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * ツールハンドラーの設定
   */
  private setupToolHandlers() {
    // 利用可能なツールのリストを設定
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_tickets',
          description: 'Kickflowのチケットを検索します',
          inputSchema: {
            type: 'object',
            properties: {
              status: {
                type: ['string', 'array'],
                items: {
                  type: 'string'
                },
                description: 'チケットのステータス。例: "draft", "in_progress", "completed", "rejected", "denied", "archived"'
              },
              workflowId: {
                type: 'string',
                description: 'ワークフローのUUID'
              },
              authorId: {
                type: 'string',
                description: '申請者のUUID'
              },
              ticketNumber: {
                type: 'string',
                description: 'チケット番号'
              },
              page: {
                type: 'number',
                description: 'ページ番号（1から始まる）'
              },
              perPage: {
                type: 'number',
                description: '1ページあたりの件数'
              },
              sortBy: {
                type: 'string',
                description: 'ソートフィールド。例: "createdAt", "updatedAt"'
              }
            }
          }
        },
        {
          name: 'get_ticket',
          description: '指定したチケットの詳細情報を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              ticketId: {
                type: 'string',
                description: 'チケットのUUID'
              }
            },
            required: ['ticketId']
          }
        }
      ]
    }));

    // ツール呼び出しのハンドラー
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'search_tickets':
          return handleSearchTickets(request, this.kickflowClient);
        
        case 'get_ticket':
          return handleGetTicket(request, this.kickflowClient);
        
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  /**
   * サーバーを起動
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Kickflow MCP server running on stdio');
  }
}

// サーバーの起動
const server = new KickflowServer();
server.run().catch(console.error);
