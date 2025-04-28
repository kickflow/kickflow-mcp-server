import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema
const deleteFolderInputShape = {
  folderId: z.string().uuid().describe('削除するフォルダのUUID'),
}

const deleteFolderTool: McpTool<typeof deleteFolderInputShape> = {
  name: 'delete_folder',
  description:
    'フォルダを削除します。注意：このフォルダ以下のすべてのフォルダ・ワークフロー・経路・パイプラインも削除されます。',
  inputSchema: deleteFolderInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteFolderInputShape).parse(params)

      await api.deleteFolder(validatedParams.folderId)

      return {
        content: [
          {
            type: 'text',
            text: `フォルダ (ID: ${validatedParams.folderId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting folder:', error)
      let errorMessage = 'フォルダ削除中に不明なエラーが発生しました'
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

export default deleteFolderTool
