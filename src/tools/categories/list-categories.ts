import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListCategoriesParams
const listCategoriesInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['name', 'createdAt', 'updatedAt'])
    .optional()
    .describe('ソート。指定可能なフィールド: name, createdAt, updatedAt'),
}

const listCategoriesTool: McpTool<typeof listCategoriesInputShape> = {
  name: 'list_categories',
  description: 'カテゴリの一覧を取得します',
  inputSchema: listCategoriesInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listCategoriesInputShape).parse(params)

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      const categories = await api.listCategories(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(categories, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      let errorMessage = 'カテゴリ一覧の取得中に不明なエラーが発生しました'
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

export default listCategoriesTool
