import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('取り下げるチケットのID'),
})

const withdrawTicketTool: Tool = {
  name: 'withdraw_ticket',
  description: '指定されたIDのチケットを取り下げます',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId } = validatedArgs
    return api.withdrawTicket(ticketId)
  }),
}
export default withdrawTicketTool
