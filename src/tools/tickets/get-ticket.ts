import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema
const getTicketInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
}

const getTicketTool: McpTool<typeof getTicketInputShape> = {
  // Pass the shape type to McpTool
  name: 'get_ticket',
  description: '指定したチケットの詳細情報を取得します',
  inputSchema: getTicketInputShape, // Assign the raw shape
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      // Parse the input using the shape inside execute
      const validatedParams = z.object(getTicketInputShape).parse(params)

      // チケット詳細の取得
      const ticket = await api.getTicket(validatedParams.ticketId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(ticket, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching ticket details:', error)

      let errorMessage = 'チケット詳細の取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }

      return {
        content: [
          {
            type: 'text',
            text: errorMessage,
          },
        ],
        isError: true,
      }
    }
  },
}

export default getTicketTool
