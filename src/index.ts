import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { setKickflowAccessToken } from './kickflow-api/custom-axios-instance.js';
import { handleGetTicket } from './tools/get-ticket.js';
import { handleGetTickets } from './tools/get-tickets.js';
import {
  GetTicketsStatusOneOfItem as TicketStatusEnum,
  GetTicketsAssigneeStatusItem as AssigneeStatusEnum,
} from './kickflow-api/generated/kickflowRESTAPIV1.schemas.js';

// コマンドライン引数からトークンを取得
function parseArguments() {
  const args = process.argv.slice(2);
  const tokenArgPrefix = '--kickflow-access-token=';

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
`);
    process.exit(0);
  }

  // 引数からトークンを探す
  const tokenArg = args.find(arg => arg.startsWith(tokenArgPrefix));
  if (tokenArg) {
    return tokenArg.substring(tokenArgPrefix.length);
  }

  // 環境変数からトークンを取得
  return process.env.KICKFLOW_ACCESS_TOKEN;
}

// トークンの取得
const ACCESS_TOKEN = parseArguments();
if (!ACCESS_TOKEN) {
  console.error(`エラー: Kickflow アクセストークンが必要です

以下のいずれかの方法でアクセストークンを指定してください:
1. コマンドライン引数: --kickflow-access-token=YOUR_TOKEN
2. 環境変数: KICKFLOW_ACCESS_TOKEN=YOUR_TOKEN

例:
  npx kickflow-mcp-server --kickflow-access-token=YOUR_TOKEN
  
  または
  
  KICKFLOW_ACCESS_TOKEN=YOUR_TOKEN npx kickflow-mcp-server
`);
  process.exit(1);
}

/**
 * Kickflow MCP サーバークラス
 */
class KickflowServer {
  private server: Server;

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

    // アクセストークンを設定
    // ACCESS_TOKENは最初のチェックで存在確認済み
    setKickflowAccessToken(ACCESS_TOKEN as string);

    // ツールハンドラーの設定
    this.setupToolHandlers();

    // エラーハンドリング
    this.server.onerror = error => console.error('[MCP Error]', error);
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
          name: 'get_tickets',
          description: 'チケットの一覧を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              page: {
                type: 'integer',
                minimum: 1,
                description: 'ページ番号（1から始まる）',
              },
              perPage: {
                type: 'integer',
                minimum: 1,
                description: '1ページあたりの件数',
              },
              sortBy: {
                type: 'string',
                enum: ['createdAt', 'updatedAt'],
                description: 'ソート。指定可能なフィールド: createdAt, updatedAt',
              },
              status: {
                // statusは単一文字列または文字列配列を受け付ける
                oneOf: [
                  {
                    type: 'string',
                    enum: Object.values(TicketStatusEnum),
                  },
                  {
                    type: 'array',
                    items: {
                      type: 'string',
                      enum: Object.values(TicketStatusEnum),
                    },
                  },
                ],
                description: 'ステータスの配列または単一ステータス',
              },
              subStatusIds: {
                type: 'array',
                items: { type: 'string', format: 'uuid' },
                description: 'サブステータスのUUIDの配列',
              },
              workflowId: {
                type: 'string',
                format: 'uuid',
                description: 'ワークフローのUUID',
              },
              authorId: {
                type: 'string',
                format: 'uuid',
                description: '申請者のUUID',
              },
              authorTeamFullName: {
                type: 'string',
                description: '申請時に選択したチームの上位組織を含む名前',
              },
              ticketNumber: {
                type: 'string',
                description: 'チケット番号',
              },
              createdAtStart: {
                type: 'string',
                format: 'date-time',
                description: '作成日時の起点 (RFC3339形式)',
              },
              createdAtEnd: {
                type: 'string',
                format: 'date-time',
                description: '作成日時の終点 (RFC3339形式)',
              },
              updatedAtStart: {
                type: 'string',
                format: 'date-time',
                description: '更新日時の起点 (RFC3339形式)',
              },
              updatedAtEnd: {
                type: 'string',
                format: 'date-time',
                description: '更新日時の終点 (RFC3339形式)',
              },
              openedAtStart: {
                type: 'string',
                format: 'date-time',
                description: '申請日時の起点 (RFC3339形式)',
              },
              openedAtEnd: {
                type: 'string',
                format: 'date-time',
                description: '申請日時の終点 (RFC3339形式)',
              },
              completedAtStart: {
                type: 'string',
                format: 'date-time',
                description: '完了日時の起点 (RFC3339形式)',
              },
              completedAtEnd: {
                type: 'string',
                format: 'date-time',
                description: '完了日時の終点 (RFC3339形式)',
              },
              archivedAtStart: {
                type: 'string',
                format: 'date-time',
                description: 'アーカイブ日時の起点 (RFC3339形式)',
              },
              archivedAtEnd: {
                type: 'string',
                format: 'date-time',
                description: 'アーカイブ日時の終点 (RFC3339形式)',
              },
              assigneeUserId: {
                type: 'string',
                format: 'uuid',
                description: '承認者のUUID。assigneeStatusとセットで指定',
              },
              assigneeStatus: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: Object.values(AssigneeStatusEnum),
                },
                description: '承認者の状態。assigneeUserIdとセットで指定',
              },
              stepTitle: {
                type: 'string',
                description: '現在の承認ステップ名',
              },
            },
            // 必須パラメータはなし
            required: [],
            // Zodのstrict()に相当する設定
            additionalProperties: false,
          },
        },
        {
          name: 'get_ticket',
          description: '指定したチケットの詳細情報を取得します',
          inputSchema: {
            type: 'object',
            properties: {
              ticketId: {
                type: 'string',
                format: 'uuid', // UUID形式を明示
                description: 'チケットのUUID',
              },
            },
            required: ['ticketId'], // ticketIdは必須
            additionalProperties: false, // Zodのstrict()に相当
          },
        },
      ],
    }));

    // ツール呼び出しのハンドラー
    this.server.setRequestHandler(CallToolRequestSchema, async request => {
      switch (request.params.name) {
        case 'get_tickets':
          return handleGetTickets(request);

        case 'get_ticket':
          return handleGetTicket(request);

        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
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
