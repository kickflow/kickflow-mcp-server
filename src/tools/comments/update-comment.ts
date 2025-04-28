import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on UpdateCommentBody and path params
const updateCommentInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  commentId: z.string().uuid().describe('更新するコメントのUUID'),
  body: z.string().describe('新しいコメント本文'),
  // files cannot be updated via this API according to the spec
}

const updateCommentTool: McpTool<typeof updateCommentInputShape> = {
  name: 'update_comment',
  description: 'チケットのコメントを更新します (添付ファイルは更新不可)',
  inputSchema: updateCommentInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateCommentInputShape).parse(params)

      const { ticketId, commentId, ...updateBody } = validatedParams

      const comment = await api.updateComment(
        ticketId,
        commentId,
        updateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').UpdateCommentBody,
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
      console.error('Error updating comment:', error)
      let errorMessage = 'コメント更新中に不明なエラーが発生しました'
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

export default updateCommentTool
