import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on DenyTicketBody (empty) and path param
const denyTicketInputShape = {
  ticketId: z.string().uuid().describe('却下するチケットのUUID'),
  // DenyTicketBody is an empty object {} according to the schema, so no body params needed here.
  // We can add an optional comment field if desired for user convenience, though the API doesn't strictly require it.
  // comment: z.string().optional().describe('却下理由（任意）'),
}

const denyTicketTool: McpTool<typeof denyTicketInputShape> = {
  name: 'deny_ticket',
  description: 'チケットを却下します',
  inputSchema: denyTicketInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(denyTicketInputShape).parse(params)

      const { ticketId } = validatedParams
      // The API expects an empty object for the body
      const denyBody = {}

      const ticket = await api.denyTicket(
        ticketId,
        denyBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').DenyTicketBody,
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
      console.error('Error denying ticket:', error)
      let errorMessage = 'チケット却下中に不明なエラーが発生しました'
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

export default denyTicketTool
