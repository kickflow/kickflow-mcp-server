import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('取得するチケットのID'),
})

const getTicketTool: Tool = {
  name: 'get_ticket',
  description: '指定されたIDのチケットを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId } = validatedArgs
    return api.getTicket(ticketId)
  }),
}
export default getTicketTool
