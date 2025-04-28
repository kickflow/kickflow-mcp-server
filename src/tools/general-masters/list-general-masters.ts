import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListGeneralMastersParams
const listGeneralMastersInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'code', 'name']) // Corrected based on schema file
    .optional()
    .describe('ソート。 指定可能なフィールド: createdAt, code, name'),
}

const listGeneralMastersTool: McpTool<typeof listGeneralMastersInputShape> = {
  name: 'list_general_masters',
  description: '汎用マスタの一覧を取得します',
  inputSchema: listGeneralMastersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(listGeneralMastersInputShape)
        .parse(params)

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      const generalMasters = await api.listGeneralMasters(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(generalMasters, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching general masters:', error)
      let errorMessage = '汎用マスタ一覧の取得中に不明なエラーが発生しました'
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

export default listGeneralMastersTool
