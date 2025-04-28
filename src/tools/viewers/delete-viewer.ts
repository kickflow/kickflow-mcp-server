import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const deleteViewerInputShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  viewerId: z.string().uuid().describe('削除する共有ユーザーのID'),
}

const deleteViewerTool: McpTool<typeof deleteViewerInputShape> = {
  name: 'delete_viewer',
  description: 'チケットの共有ユーザーを削除します',
  inputSchema: deleteViewerInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteViewerInputShape).parse(params)

      await api.deleteViewer(validatedParams.ticketId, validatedParams.viewerId)

      return {
        content: [
          {
            type: 'text',
            text: `チケット (ID: ${validatedParams.ticketId}) から共有ユーザー (ID: ${validatedParams.viewerId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting viewer:', error)
      let errorMessage = '共有ユーザー削除中に不明なエラーが発生しました'
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

export default deleteViewerTool
