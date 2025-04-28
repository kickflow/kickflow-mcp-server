import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema (empty object as there are no params)
const getCurrentUserInputShape = {}

const getCurrentUserTool: McpTool<typeof getCurrentUserInputShape> = {
  name: 'get_current_user',
  description: '現在のユーザーを取得します',
  inputSchema: getCurrentUserInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      // No params to validate for this specific API call
      z.object(getCurrentUserInputShape).parse(params) // Still parse to ensure no unexpected params

      const user = await api.getCurrentUser()

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(user, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching current user:', error)
      let errorMessage = '現在のユーザー取得中に不明なエラーが発生しました'
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

export default getCurrentUserTool
