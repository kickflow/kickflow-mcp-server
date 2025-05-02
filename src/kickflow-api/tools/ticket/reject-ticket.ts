import { z } from 'zod'
import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { rejectTicketBody } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('差し戻すチケットのID'),
  ...rejectTicketBody.shape,
})

const rejectTicketTool: Tool = {
  name: 'reject_ticket',
  description: '指定されたIDのチケットを差し戻します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...rejectData } = validatedArgs
    return api.rejectTicket(ticketId, rejectData)
  }),
}
export default rejectTicketTool
