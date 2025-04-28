import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const getUserInputShape = {
  userId: z.string().uuid().describe('取得するユーザーのUUID'),
}

const getUserTool: McpTool<typeof getUserInputShape> = {
  name: 'get_user',
  description: 'ユーザーを一件取得します',
  inputSchema: getUserInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getUserInputShape).parse(params)

      const user = await api.getUser(validatedParams.userId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(user, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      let errorMessage = 'ユーザー取得中に不明なエラーが発生しました'
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

export default getUserTool
