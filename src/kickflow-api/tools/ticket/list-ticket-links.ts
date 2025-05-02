import { z } from 'zod'
import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { listTicketLinksQueryParams } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('関連チケットを取得するチケットのID'),
  ...listTicketLinksQueryParams.shape,
})

const listTicketLinksTool: Tool = {
  name: 'list_ticket_links',
  description: '指定されたチケットの関連チケットを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...queryParams } = validatedArgs
    return api.listTicketLinks(ticketId, queryParams)
  }),
}
export default listTicketLinksTool
