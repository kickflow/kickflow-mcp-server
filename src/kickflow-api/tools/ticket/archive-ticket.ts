import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('アーカイブするチケットのID'),
})

const archiveTicketTool: Tool = {
  name: 'archive_ticket',
  description: '指定されたIDのチケットをアーカイブします',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId } = validatedArgs
    return api.archiveTicket(ticketId)
  }),
}
export default archiveTicketTool
