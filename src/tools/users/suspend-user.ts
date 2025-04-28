import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { User } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const suspendUserInputShape = {
  userId: z.string().uuid().describe('一時停止するユーザーのUUID'),
}

const suspendUserTool: McpTool<typeof suspendUserInputShape> = {
  name: 'suspend_user',
  description:
    '有効なユーザーを一時停止します。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: suspendUserInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { suspendUser } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(suspendUserInputShape).parse(args)

      // APIを呼び出し
      const response: User = await suspendUser(validatedParams.userId)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: `ユーザー (ID: ${validatedParams.userId}) を一時停止しました。\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      }
    } catch (error) {
      console.error('Error suspending user:', error)
      let errorMessage = 'ユーザー一時停止中に不明なエラーが発生しました'
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

export default suspendUserTool
