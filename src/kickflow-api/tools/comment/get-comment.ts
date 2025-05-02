import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('コメントが所属するチケットのID'),
  commentId: z.string().uuid().describe('取得するコメントのID'),
})

const getCommentTool: Tool = {
  name: 'get_comment',
  description: '指定されたIDのコメントを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, commentId } = validatedArgs
    return api.getComment(ticketId, commentId)
  }),
}
export default getCommentTool
