import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema
const deleteCategoryInputShape = {
  categoryId: z.string().uuid().describe('削除するカテゴリのUUID'),
}

const deleteCategoryTool: McpTool<typeof deleteCategoryInputShape> = {
  name: 'delete_category',
  description: 'カテゴリを削除します',
  inputSchema: deleteCategoryInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteCategoryInputShape).parse(params)

      await api.deleteCategory(validatedParams.categoryId)

      return {
        content: [
          {
            type: 'text',
            text: `カテゴリ (ID: ${validatedParams.categoryId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      let errorMessage = 'カテゴリ削除中に不明なエラーが発生しました'
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

export default deleteCategoryTool
