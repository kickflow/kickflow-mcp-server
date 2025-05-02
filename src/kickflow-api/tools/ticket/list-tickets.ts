import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { listTicketsQueryParams } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listTicketsTool: Tool = {
  name: 'list_tickets',
  description: 'チケットの一覧を取得します',
  paramsSchema: listTicketsQueryParams.shape,
  cb: createApiToolCallback(listTicketsQueryParams, (api, validatedArgs) =>
    api.listTickets(validatedArgs),
  ),
}
export default listTicketsTool
