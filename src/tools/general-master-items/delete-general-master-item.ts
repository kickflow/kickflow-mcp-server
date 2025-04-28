import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const deleteGeneralMasterItemInputShape = {
  generalMasterId: z.string().uuid().describe('汎用マスタのUUID'),
  itemId: z.string().uuid().describe('削除するアイテムのUUID'),
}

const deleteGeneralMasterItemTool: McpTool<
  typeof deleteGeneralMasterItemInputShape
> = {
  name: 'delete_general_master_item',
  description: '汎用マスタアイテムを削除します',
  inputSchema: deleteGeneralMasterItemInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(deleteGeneralMasterItemInputShape)
        .parse(params)

      await api.deleteGeneralMasterItem(
        validatedParams.generalMasterId,
        validatedParams.itemId,
      )

      return {
        content: [
          {
            type: 'text',
            text: `汎用マスタアイテム (ID: ${validatedParams.itemId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting general master item:', error)
      let errorMessage = '汎用マスタアイテム削除中に不明なエラーが発生しました'
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

export default deleteGeneralMasterItemTool
