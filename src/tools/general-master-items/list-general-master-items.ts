import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListGeneralMasterItemsParams and path param
const listGeneralMasterItemsInputShape = {
  generalMasterId: z.string().uuid().describe('汎用マスタのUUID'),
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'code', 'name']) // Corrected based on schema file
    .optional()
    .describe('ソート。 指定可能なフィールド: createdAt, code, name'),
}

const listGeneralMasterItemsTool: McpTool<
  typeof listGeneralMasterItemsInputShape
> = {
  name: 'list_general_master_items',
  description: '汎用マスタアイテムの一覧を取得します',
  inputSchema: listGeneralMasterItemsInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(listGeneralMasterItemsInputShape)
        .parse(params)

      const { generalMasterId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const items = await api.listGeneralMasterItems(generalMasterId, apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(items, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching general master items:', error)
      let errorMessage =
        '汎用マスタアイテム一覧の取得中に不明なエラーが発生しました'
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

export default listGeneralMasterItemsTool
