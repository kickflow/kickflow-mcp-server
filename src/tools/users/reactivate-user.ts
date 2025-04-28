import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { User } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const reactivateUserInputShape = {
  userId: z.string().uuid().describe('再有効化するユーザーのUUID'),
}

const reactivateUserTool: McpTool<typeof reactivateUserInputShape> = {
  name: 'reactivate_user',
  description:
    '一時停止中のユーザーを有効化します。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: reactivateUserInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { reactivateUser } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(reactivateUserInputShape).parse(args)

      // APIを呼び出し
      const response: User = await reactivateUser(validatedParams.userId)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: `ユーザー (ID: ${validatedParams.userId}) を再有効化しました。\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      }
    } catch (error) {
      console.error('Error reactivating user:', error)
      let errorMessage = 'ユーザー再有効化中に不明なエラーが発生しました'
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

export default reactivateUserTool
