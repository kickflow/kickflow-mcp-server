import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const approveTicketInputShape = {
  ticketId: z.string().uuid().describe('承認または確認するチケットのUUID'),
}

const approveTicketTool: McpTool<typeof approveTicketInputShape> = {
  name: 'approve_ticket',
  description: 'チケットを承認または確認します',
  inputSchema: approveTicketInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(approveTicketInputShape).parse(params)

      const ticket = await api.approveTicket(validatedParams.ticketId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(ticket, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error approving ticket:', error)
      let errorMessage = 'チケット承認中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default approveTicketTool
