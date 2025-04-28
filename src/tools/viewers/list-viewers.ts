import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListViewersParams and path param
const listViewersInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt']) // Corrected based on schema file
    .optional()
    .describe('ソート。 指定可能なフィールド: createdAt'),
}

const listViewersTool: McpTool<typeof listViewersInputShape> = {
  name: 'list_viewers',
  description: 'チケットの共有ユーザー一覧を取得します',
  inputSchema: listViewersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listViewersInputShape).parse(params)

      const { ticketId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const viewers = await api.listViewers(ticketId, apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(viewers, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching viewers:', error)
      let errorMessage = '共有ユーザー一覧の取得中に不明なエラーが発生しました'
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

export default listViewersTool
