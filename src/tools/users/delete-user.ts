import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { UserDetail } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const deleteUserInputShape = {
  userId: z.string().uuid().describe('削除するユーザーのUUID'),
}

const deleteUserTool: McpTool<typeof deleteUserInputShape> = {
  name: 'delete_user',
  description:
    'ユーザーを削除します（論理削除）。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: deleteUserInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { deleteUser } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(deleteUserInputShape).parse(args)

      // APIを呼び出し
      const response: UserDetail = await deleteUser(validatedParams.userId)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: `ユーザー (ID: ${validatedParams.userId}) を削除しました。\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      let errorMessage = 'ユーザー削除中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      // エラーを McpToolResult 形式で返す
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default deleteUserTool
