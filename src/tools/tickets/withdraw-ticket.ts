import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const withdrawTicketInputShape = {
  ticketId: z.string().uuid().describe('取り下げるチケットのUUID'),
}

const withdrawTicketTool: McpTool<typeof withdrawTicketInputShape> = {
  name: 'withdraw_ticket',
  description: '自分が作成したチケットを取り下げます',
  inputSchema: withdrawTicketInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(withdrawTicketInputShape).parse(params)

      const ticket = await api.withdrawTicket(validatedParams.ticketId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(ticket, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error withdrawing ticket:', error)
      let errorMessage = 'チケット取り下げ中に不明なエラーが発生しました'
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

export default withdrawTicketTool
