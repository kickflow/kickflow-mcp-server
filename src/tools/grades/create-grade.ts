import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on GradeCreateBody
const createGradeInputShape = {
  name: z.string().max(255).describe('名前'),
  level: z.number().int().min(0).max(255).describe('レベル'),
  code: z
    .string()
    .max(255)
    .optional()
    .describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
}

const createGradeTool: McpTool<typeof createGradeInputShape> = {
  name: 'create_grade',
  description: '役職を作成します',
  inputSchema: createGradeInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createGradeInputShape).parse(params)

      const grade = await api.createGrade(validatedParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(grade, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating grade:', error)
      let errorMessage = '役職作成中に不明なエラーが発生しました'
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

export default createGradeTool
