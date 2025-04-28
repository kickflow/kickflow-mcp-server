import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListTasksStatusItem as TaskStatusEnum,
  ListTasksPending as PendingEnum,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import type { McpTool } from '../types.js' // Import McpTool

// Define the raw shape for the input schema
const listTasksInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'updatedAt'])
    .optional()
    .describe('ソート。指定可能なフィールド: createdAt, updatedAt'),
  status: z
    .array(z.enum(Object.values(TaskStatusEnum) as [string, ...string[]]))
    .optional()
    .describe('ステータスの配列'),
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
  createdAtStart: z.string().datetime().optional().describe('作成日時の起点'),
  createdAtEnd: z.string().datetime().optional().describe('作成日時の終点'),
  updatedAtStart: z.string().datetime().optional().describe('更新日時の起点'),
  updatedAtEnd: z.string().datetime().optional().describe('更新日時の終点'),
  openedAtStart: z.string().datetime().optional().describe('申請日時の起点'),
  openedAtEnd: z.string().datetime().optional().describe('申請日時の終点'),
  completedAtStart: z.string().datetime().optional().describe('完了日時の起点'),
  completedAtEnd: z.string().datetime().optional().describe('完了日時の終点'),
  archivedAtStart: z
    .string()
    .datetime()
    .optional()
    .describe('アーカイブ日時の起点'),
  archivedAtEnd: z
    .string()
    .datetime()
    .optional()
    .describe('アーカイブ日時の終点'),
  stepTitle: z.string().optional().describe('現在の承認ステップ名'),
  pending: z
    .enum(Object.values(PendingEnum) as [string, ...string[]]) // Use enum for pending
    .optional()
    .describe('承認の保留状態 (true: 保留中, false: 保留されていない)'),
}

const listTasksTool: McpTool<typeof listTasksInputShape> = {
  name: 'list_tasks',
  description:
    '現在のユーザーにアサインされている承認リクエストの一覧を取得します。',
  inputSchema: listTasksInputShape, // Assign the raw shape
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      // Parse the input using the shape inside execute
      const validatedParams = z.object(listTasksInputShape).parse(params)

      // undefinedでないパラメータだけを抽出してapiParamsに設定
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      // タスク一覧の取得
      const tasks = await api.listTasks(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(tasks, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)

      let errorMessage = 'タスク一覧の取得中に不明なエラーが発生しました'
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

export default listTasksTool // Use export default
