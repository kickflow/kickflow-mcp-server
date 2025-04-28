import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { User } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const reinviteUserInputShape = {
  userId: z.string().uuid().describe('再招待するユーザーのUUID'),
}

const reinviteUserTool: McpTool<typeof reinviteUserInputShape> = {
  name: 'reinvite_user',
  description:
    '削除されたユーザーを再び招待します。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: reinviteUserInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { reinviteUser } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(reinviteUserInputShape).parse(args)

      // APIを呼び出し
      const response: User = await reinviteUser(validatedParams.userId)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: `ユーザー (ID: ${validatedParams.userId}) を再招待しました。\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      }
    } catch (error) {
      console.error('Error reinviting user:', error)
      let errorMessage = 'ユーザー再招待中に不明なエラーが発生しました'
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

export default reinviteUserTool
