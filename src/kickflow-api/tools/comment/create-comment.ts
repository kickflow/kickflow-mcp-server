import { z } from 'zod'
import { Tool } from '../../../types.js'
// comment.zod.ts が存在しないため、型定義から推測して import します
import { createCommentBody } from '../../generated/comment/comment.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('コメントを投稿するチケットのID'),
  ...createCommentBody.shape,
})

const createCommentTool: Tool = {
  name: 'create_comment',
  description: 'チケットにコメントを投稿します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...createData } = validatedArgs
    return api.createComment(ticketId, createData)
  }),
}
export default createCommentTool
