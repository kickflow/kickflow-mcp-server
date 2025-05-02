import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('コメントが所属するチケットのID'),
  commentId: z.string().uuid().describe('削除するコメントのID'),
})

const deleteCommentTool: Tool = {
  name: 'delete_comment',
  description: '指定されたIDのコメントを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, commentId } = validatedArgs
    return api.deleteComment(ticketId, commentId)
  }),
}
export default deleteCommentTool
