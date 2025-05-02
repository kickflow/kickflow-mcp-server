import { z } from 'zod'
import { Tool } from '../../../types.js'
// comment.zod.ts が存在しないため、型定義から推測して import します
import { listCommentsQueryParams } from '../../generated/comment/comment.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('コメント一覧を取得するチケットのID'),
  ...listCommentsQueryParams.shape,
})

const listCommentsTool: Tool = {
  name: 'list_comments',
  description: 'チケットのコメント一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...queryParams } = validatedArgs
    return api.listComments(ticketId, queryParams)
  }),
}
export default listCommentsTool
