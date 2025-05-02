import { z } from 'zod'
import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { denyTicketBody } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('却下するチケットのID'),
  ...denyTicketBody.shape,
})

const denyTicketTool: Tool = {
  name: 'deny_ticket',
  description: '指定されたIDのチケットを却下します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...denyData } = validatedArgs
    return api.denyTicket(ticketId, denyData)
  }),
}
export default denyTicketTool
