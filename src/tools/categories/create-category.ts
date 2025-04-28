import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on CreateCategoryBody
const createCategoryInputShape = {
  name: z.string().max(100).describe('カテゴリ名'), // Max length from schema
}

const createCategoryTool: McpTool<typeof createCategoryInputShape> = {
  name: 'create_category',
  description: 'カテゴリを作成します',
  inputSchema: createCategoryInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createCategoryInputShape).parse(params)

      const category = await api.createCategory(validatedParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(category, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating category:', error)
      let errorMessage = 'カテゴリ作成中に不明なエラーが発生しました'
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

export default createCategoryTool
