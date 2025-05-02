import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { createTicketBody } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createTicketTool: Tool = {
  name: 'create_ticket',
  description: 'チケットを作成します',
  paramsSchema: createTicketBody.shape,
  cb: createApiToolCallback(createTicketBody, (api, validatedArgs) =>
    api.createTicket(validatedArgs),
  ),
}
export default createTicketTool
