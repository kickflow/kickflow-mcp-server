import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  UpdateUserBody,
  UserDetail,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param and UpdateUserBody
const updateUserInputShape = {
  userId: z.string().uuid().describe('更新するユーザーのUUID'),
  email: z.string().email().optional().describe('メールアドレス'),
  code: z.string().max(255).optional().describe('コード'),
  firstName: z.string().max(255).optional().describe('名'),
  lastName: z.string().max(255).optional().describe('姓'),
  employeeId: z.string().max(255).optional().nullable().describe('社員番号'),
}

const updateUserTool: McpTool<typeof updateUserInputShape> = {
  name: 'update_user',
  description:
    'ユーザーを更新します。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: updateUserInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { updateUser } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(updateUserInputShape).parse(args)
      const { userId, ...bodyArgs } = validatedParams

      // APIに渡すパラメータを構築
      const body: UpdateUserBody = {
        email: bodyArgs.email,
        code: bodyArgs.code,
        firstName: bodyArgs.firstName,
        lastName: bodyArgs.lastName,
        employeeId: bodyArgs.employeeId,
      }
      // Remove undefined keys
      Object.keys(body).forEach(
        (key) =>
          (body as Record<string, unknown>)[key] === undefined &&
          delete (body as Record<string, unknown>)[key],
      )

      // bodyが空の場合はエラー（何か更新する項目が必要）
      if (Object.keys(body).length === 0) {
        throw new Error('更新する項目を少なくとも1つ指定してください。')
      }

      const response: UserDetail = await updateUser(userId, body)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: `ユーザー (ID: ${userId}) を更新しました。\n${JSON.stringify(response, null, 2)}`,
          },
        ],
      }
    } catch (error) {
      console.error('Error updating user:', error)
      let errorMessage = 'ユーザー更新中に不明なエラーが発生しました'
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

export default updateUserTool
