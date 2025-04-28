import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema
const deleteGeneralMasterInputShape = {
  generalMasterId: z.string().uuid().describe('削除する汎用マスタのUUID'),
}

const deleteGeneralMasterTool: McpTool<typeof deleteGeneralMasterInputShape> = {
  name: 'delete_general_master',
  description:
    '汎用マスタを削除します。この汎用マスタのすべてのアイテムも同時に削除されます。',
  inputSchema: deleteGeneralMasterInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(deleteGeneralMasterInputShape)
        .parse(params)

      await api.deleteGeneralMaster(validatedParams.generalMasterId)

      return {
        content: [
          {
            type: 'text',
            text: `汎用マスタ (ID: ${validatedParams.generalMasterId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting general master:', error)
      let errorMessage = '汎用マスタ削除中に不明なエラーが発生しました'
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

export default deleteGeneralMasterTool
