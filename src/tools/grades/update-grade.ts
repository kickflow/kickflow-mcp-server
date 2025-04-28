import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on GradeUpdateBody and path param
const updateGradeInputShape = {
  gradeId: z.string().uuid().describe('更新する役職のUUID'),
  name: z.string().max(30).optional().describe('新しい名前'), // Max length from schema
  level: z.number().int().min(0).max(255).optional().describe('新しいレベル'),
  code: z.string().optional().describe('新しいコード'),
}

const updateGradeTool: McpTool<typeof updateGradeInputShape> = {
  name: 'update_grade',
  description: '役職を更新します',
  inputSchema: updateGradeInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateGradeInputShape).parse(params)

      const { gradeId, ...updateBody } = validatedParams

      // Remove undefined fields from the update body
      Object.keys(updateBody).forEach((key) => {
        const objKey = key as keyof typeof updateBody
        if (updateBody[objKey] === undefined) {
          delete updateBody[objKey]
        }
      })

      const grade = await api.updateGrade(gradeId, updateBody)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(grade, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error updating grade:', error)
      let errorMessage = '役職更新中に不明なエラーが発生しました'
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

export default updateGradeTool
