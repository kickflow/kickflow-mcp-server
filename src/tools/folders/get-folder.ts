import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema
const getFolderInputShape = {
  folderId: z.string().uuid().describe('取得するフォルダのUUID'),
}

const getFolderTool: McpTool<typeof getFolderInputShape> = {
  name: 'get_folder',
  description: 'フォルダを一件取得します',
  inputSchema: getFolderInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getFolderInputShape).parse(params)

      const folder = await api.getFolder(validatedParams.folderId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(folder, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching folder:', error)
      let errorMessage = 'フォルダ取得中に不明なエラーが発生しました'
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

export default getFolderTool
