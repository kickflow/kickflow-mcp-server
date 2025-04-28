import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const getGradeInputShape = {
  gradeId: z.string().uuid().describe('取得する役職のUUID'),
}

const getGradeTool: McpTool<typeof getGradeInputShape> = {
  name: 'get_grade',
  description: '役職を一件取得します',
  inputSchema: getGradeInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getGradeInputShape).parse(params)

      const grade = await api.getGrade(validatedParams.gradeId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(grade, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching grade:', error)
      let errorMessage = '役職取得中に不明なエラーが発生しました'
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

export default getGradeTool
