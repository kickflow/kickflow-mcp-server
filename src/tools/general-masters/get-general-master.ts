import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema
const getGeneralMasterInputShape = {
  generalMasterId: z.string().uuid().describe('取得する汎用マスタのUUID'),
}

const getGeneralMasterTool: McpTool<typeof getGeneralMasterInputShape> = {
  name: 'get_general_master',
  description: '汎用マスタを一件取得します',
  inputSchema: getGeneralMasterInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getGeneralMasterInputShape).parse(params)

      const generalMaster = await api.getGeneralMaster(
        validatedParams.generalMasterId,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(generalMaster, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching general master:', error)
      let errorMessage = '汎用マスタ取得中に不明なエラーが発生しました'
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

export default getGeneralMasterTool
