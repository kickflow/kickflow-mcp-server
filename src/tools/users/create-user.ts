import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on CreateUserBody
const createUserInputShape = {
  email: z.string().email().describe('メールアドレス'),
  code: z.string().max(255).describe('コード'),
  firstName: z.string().max(255).describe('名'),
  lastName: z.string().max(255).describe('姓'),
  sendEmail: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      '招待メールを送信する場合true（デフォルト）、送信しない場合false',
    ),
  employeeId: z.string().max(255).nullable().optional().describe('社員番号'),
}

const createUserTool: McpTool<typeof createUserInputShape> = {
  name: 'create_user',
  description: 'ユーザーを作成（招待）します',
  inputSchema: createUserInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createUserInputShape).parse(params)

      // Handle nullable/optional fields
      const apiCreateBody = {
        ...validatedParams,
        employeeId:
          validatedParams.employeeId === undefined
            ? null
            : validatedParams.employeeId,
      }

      const user = await api.createUser(
        apiCreateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateUserBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(user, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating user:', error)
      let errorMessage = 'ユーザー作成中に不明なエラーが発生しました'
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

export default createUserTool
