import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListAuditLogsParams,
  AuditLog,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on ListAuditLogsParams
const listAuditLogsInputShape = {
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ番号（1から始まる）'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt'])
    .optional()
    .describe('ソート。指定可能なフィールド: createdAt'),
  createdAtStart: z
    .string()
    .datetime({ message: 'RFC3339形式で入力してください' })
    .optional()
    .describe('作成日時の起点 (RFC3339形式)'),
  createdAtEnd: z
    .string()
    .datetime({ message: 'RFC3339形式で入力してください' })
    .optional()
    .describe('作成日時の終点 (RFC3339形式)'),
  userId: z.string().uuid().optional().describe('ユーザーID'),
}

const listAuditLogsTool: McpTool<typeof listAuditLogsInputShape> = {
  name: 'list_audit_logs',
  description: '監査ログの一覧を取得します。',
  inputSchema: listAuditLogsInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { listAuditLogs } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(listAuditLogsInputShape).parse(args)

      // APIに渡すパラメータを構築
      const params: ListAuditLogsParams = {
        page: validatedParams.page,
        perPage: validatedParams.perPage,
        sortBy: validatedParams.sortBy,
        createdAtStart: validatedParams.createdAtStart,
        createdAtEnd: validatedParams.createdAtEnd,
        userId: validatedParams.userId,
      }
      // Remove undefined keys
      Object.keys(params).forEach(
        (key) =>
          (params as Record<string, unknown>)[key] === undefined &&
          delete (params as Record<string, unknown>)[key],
      )

      const response: AuditLog[] = await listAuditLogs(params)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error listing audit logs:', error)
      let errorMessage = '監査ログ一覧取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      // エラーを McpToolResult 形式で返す
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default listAuditLogsTool
