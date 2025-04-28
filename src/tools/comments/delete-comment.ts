import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const deleteCommentInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  commentId: z.string().uuid().describe('削除するコメントのUUID'),
}

const deleteCommentTool: McpTool<typeof deleteCommentInputShape> = {
  name: 'delete_comment',
  description: 'チケットのコメントを削除します',
  inputSchema: deleteCommentInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteCommentInputShape).parse(params)

      await api.deleteComment(
        validatedParams.ticketId,
        validatedParams.commentId,
      )

      return {
        content: [
          {
            type: 'text',
            text: `コメント (ID: ${validatedParams.commentId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      let errorMessage = 'コメント削除中に不明なエラーが発生しました'
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

export default deleteCommentTool
