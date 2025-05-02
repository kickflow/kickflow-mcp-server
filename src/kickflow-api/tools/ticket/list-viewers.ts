import { z } from 'zod'
import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { listViewersQueryParams } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z
    .string()
    .uuid()
    .describe('共有ユーザー一覧を取得するチケットのID'),
  ...listViewersQueryParams.shape,
})

const listViewersTool: Tool = {
  name: 'list_viewers',
  description: 'チケットの共有ユーザー一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...queryParams } = validatedArgs
    return api.listViewers(ticketId, queryParams)
  }),
}
export default listViewersTool
