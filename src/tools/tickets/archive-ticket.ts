import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const archiveTicketInputShape = {
  ticketId: z.string().uuid().describe('アーカイブするチケットのUUID'),
}

const archiveTicketTool: McpTool<typeof archiveTicketInputShape> = {
  name: 'archive_ticket',
  description: 'チケットをアーカイブします',
  inputSchema: archiveTicketInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(archiveTicketInputShape).parse(params)

      const ticket = await api.archiveTicket(validatedParams.ticketId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(ticket, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error archiving ticket:', error)
      let errorMessage = 'チケットアーカイブ中に不明なエラーが発生しました'
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

export default archiveTicketTool
