import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on UpdateCategoryBody and path param
const updateCategoryInputShape = {
  categoryId: z.string().uuid().describe('更新するカテゴリのUUID'),
  name: z.string().max(100).describe('新しいカテゴリ名'), // Max length from schema
}

const updateCategoryTool: McpTool<typeof updateCategoryInputShape> = {
  name: 'update_category',
  description: 'カテゴリを更新します',
  inputSchema: updateCategoryInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateCategoryInputShape).parse(params)

      const { categoryId, ...updateBody } = validatedParams

      const category = await api.updateCategory(categoryId, updateBody)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(category, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error updating category:', error)
      let errorMessage = 'カテゴリ更新中に不明なエラーが発生しました'
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

export default updateCategoryTool
