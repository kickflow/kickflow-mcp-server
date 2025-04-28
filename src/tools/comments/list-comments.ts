import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListCommentsParams and path param
const listCommentsInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt']) // Corrected based on schema file
    .optional()
    .describe('ソート。 指定可能なフィールド: createdAt'),
}

const listCommentsTool: McpTool<typeof listCommentsInputShape> = {
  name: 'list_comments',
  description: 'チケットのコメント一覧を取得します',
  inputSchema: listCommentsInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listCommentsInputShape).parse(params)

      const { ticketId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const comments = await api.listComments(ticketId, apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(comments, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      let errorMessage = 'コメント一覧の取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default listCommentsTool
