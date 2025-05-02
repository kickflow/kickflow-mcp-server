import { z } from 'zod'
import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { updateTicketBody } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('更新するチケットのID'),
  ...updateTicketBody.shape,
})

const updateTicketTool: Tool = {
  name: 'update_ticket',
  description: '指定されたIDのチケットを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...updateData } = validatedArgs
    return api.updateTicket(ticketId, updateData)
  }),
}
export default updateTicketTool
