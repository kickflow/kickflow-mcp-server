import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const setDefaultGradeInputShape = {
  gradeId: z.string().uuid().describe('デフォルトにする役職のUUID'),
}

const setDefaultGradeTool: McpTool<typeof setDefaultGradeInputShape> = {
  name: 'set_default_grade',
  description:
    '指定した役職をデフォルトにします。これまでデフォルトだった役職は自動的にデフォルトではなくなります。',
  inputSchema: setDefaultGradeInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(setDefaultGradeInputShape).parse(params)

      await api.setDefaultGrade(validatedParams.gradeId)

      return {
        content: [
          {
            type: 'text',
            text: `役職 (ID: ${validatedParams.gradeId}) をデフォルトに設定しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error setting default grade:', error)
      let errorMessage = 'デフォルト役職設定中に不明なエラーが発生しました'
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

export default setDefaultGradeTool
