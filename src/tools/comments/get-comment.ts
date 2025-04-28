import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const getCommentInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  commentId: z.string().uuid().describe('取得するコメントのUUID'),
}

const getCommentTool: McpTool<typeof getCommentInputShape> = {
  name: 'get_comment',
  description: 'チケットのコメントを取得します',
  inputSchema: getCommentInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getCommentInputShape).parse(params)

      const comment = await api.getComment(
        validatedParams.ticketId,
        validatedParams.commentId,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(comment, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching comment:', error)
      let errorMessage = 'コメント取得中に不明なエラーが発生しました'
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

export default getCommentTool
