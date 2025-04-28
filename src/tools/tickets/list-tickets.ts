import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListTicketsStatusOneOfItem as TicketStatusEnum,
  ListTicketsAssigneeStatusItem as AssigneeStatusEnum,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import type { McpTool } from '../types.js' // Import McpTool from the new types file

// Define the raw shape for the input schema
const listTicketsInputShape = {
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
      z.array(z.enum(Object.values(TicketStatusEnum) as [string, ...string[]])),
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
  createdAtEnd: z.string().optional().describe('作成日時の終点 (RFC3339形式)'),
  updatedAtStart: z
    .string()
    .optional()
    .describe('更新日時の起点 (RFC3339形式)'),
  updatedAtEnd: z.string().optional().describe('更新日時の終点 (RFC3339形式)'),
  openedAtStart: z.string().optional().describe('申請日時の起点 (RFC3339形式)'),
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
}

const listTicketsTool: McpTool<typeof listTicketsInputShape> = {
  // Pass the shape type to McpTool
  name: 'list_tickets',
  description: 'チケットの一覧を取得します',
  inputSchema: listTicketsInputShape, // Assign the raw shape
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      // Parse the input using the shape inside execute
      const validatedParams = z.object(listTicketsInputShape).parse(params)

      // undefinedでないパラメータだけを抽出してapiParamsに設定
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      // チケット一覧の取得
      const tickets = await api.listTickets(apiParams)

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
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
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
}

export default listTicketsTool
