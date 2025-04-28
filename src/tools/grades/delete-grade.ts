import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const deleteGradeInputShape = {
  gradeId: z.string().uuid().describe('削除する役職のUUID'),
}

const deleteGradeTool: McpTool<typeof deleteGradeInputShape> = {
  name: 'delete_grade',
  description:
    '役職を削除します。注意：この役職を使用しているユーザーがいる場合、エラーとなります。',
  inputSchema: deleteGradeInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteGradeInputShape).parse(params)

      await api.deleteGrade(validatedParams.gradeId)

      return {
        content: [
          {
            type: 'text',
            text: `役職 (ID: ${validatedParams.gradeId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting grade:', error)
      let errorMessage = '役職削除中に不明なエラーが発生しました'
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

export default deleteGradeTool
