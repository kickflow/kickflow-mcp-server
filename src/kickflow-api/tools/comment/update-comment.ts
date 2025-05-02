import { z } from 'zod'
import { Tool } from '../../../types.js'
// comment.zod.ts が存在しないため、型定義から推測して import します
import { updateCommentBody } from '../../generated/comment/comment.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('コメントが所属するチケットのID'),
  commentId: z.string().uuid().describe('更新するコメントのID'),
  ...updateCommentBody.shape,
})

const updateCommentTool: Tool = {
  name: 'update_comment',
  description: '指定されたIDのコメントを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, commentId, ...updateData } = validatedArgs
    return api.updateComment(ticketId, commentId, updateData)
  }),
}
export default updateCommentTool
