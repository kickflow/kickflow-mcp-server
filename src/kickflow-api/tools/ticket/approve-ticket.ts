import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('承認または確認するチケットのID'),
})

const approveTicketTool: Tool = {
  name: 'approve_ticket',
  description: '指定されたIDのチケットを承認または確認します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId } = validatedArgs
    return api.approveTicket(ticketId)
  }),
}
export default approveTicketTool
