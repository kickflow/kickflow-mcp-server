import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListTicketLinksParams and path param
const listTicketLinksInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
}

const listTicketLinksTool: McpTool<typeof listTicketLinksInputShape> = {
  name: 'list_ticket_links',
  description: '指定したチケットの関連チケットを取得します',
  inputSchema: listTicketLinksInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listTicketLinksInputShape).parse(params)

      const { ticketId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const linkedTickets = await api.listTicketLinks(ticketId, apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(linkedTickets, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching ticket links:', error)
      let errorMessage = '関連チケット一覧の取得中に不明なエラーが発生しました'
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

export default listTicketLinksTool
