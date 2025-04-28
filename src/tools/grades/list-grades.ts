import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListGradesParams
const listGradesInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['level', 'code']) // Corrected based on schema file
    .optional()
    .describe('ソート。指定可能なフィールド: level, code'),
}

const listGradesTool: McpTool<typeof listGradesInputShape> = {
  name: 'list_grades',
  description: '役職の一覧を取得します',
  inputSchema: listGradesInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listGradesInputShape).parse(params)

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      const grades = await api.listGrades(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(grades, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching grades:', error)
      let errorMessage = '役職一覧の取得中に不明なエラーが発生しました'
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

export default listGradesTool
