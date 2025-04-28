import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const getGeneralMasterItemInputShape = {
  generalMasterId: z.string().uuid().describe('汎用マスタのUUID'),
  itemId: z.string().uuid().describe('取得するアイテムのUUID'),
}

const getGeneralMasterItemTool: McpTool<typeof getGeneralMasterItemInputShape> =
  {
    name: 'get_general_master_item',
    description: '汎用マスタアイテムを一件取得します',
    inputSchema: getGeneralMasterItemInputShape,
    async execute(params: Record<string, unknown>) {
      try {
        const api = getKickflowRESTAPIV1()
        const validatedParams = z
          .object(getGeneralMasterItemInputShape)
          .parse(params)

        const item = await api.getGeneralMasterItem(
          validatedParams.generalMasterId,
          validatedParams.itemId,
        )

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(item, null, 2),
            },
          ],
        }
      } catch (error) {
        console.error('Error fetching general master item:', error)
        let errorMessage =
          '汎用マスタアイテム取得中に不明なエラーが発生しました'
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

export default getGeneralMasterItemTool
