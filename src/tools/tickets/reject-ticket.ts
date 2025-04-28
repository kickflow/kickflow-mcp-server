import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on RejectTicketBody and path param
const rejectTicketInputShape = {
  ticketId: z.string().uuid().describe('差し戻すチケットのUUID'),
  to: z
    .number()
    .int()
    .min(0)
    .describe('差し戻し先のステップ番号（0が起票者、1が最初の承認ステップ）'),
}

const rejectTicketTool: McpTool<typeof rejectTicketInputShape> = {
  name: 'reject_ticket',
  description: 'チケットを差し戻します',
  inputSchema: rejectTicketInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(rejectTicketInputShape).parse(params)

      const { ticketId, ...rejectBody } = validatedParams

      const ticket = await api.rejectTicket(
        ticketId,
        rejectBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').RejectTicketBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(ticket, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error rejecting ticket:', error)
      let errorMessage = 'チケット差し戻し中に不明なエラーが発生しました'
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

export default rejectTicketTool
