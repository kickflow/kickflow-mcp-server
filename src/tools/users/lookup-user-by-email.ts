import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  LookupUserByEmailParams,
  UserDetail,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on LookupUserByEmailParams
const lookupUserByEmailInputShape = {
  email: z.string().email().describe('検索するユーザーのメールアドレス'),
}

const lookupUserByEmailTool: McpTool<typeof lookupUserByEmailInputShape> = {
  name: 'lookup_user_by_email',
  description: 'メールアドレスからユーザーを取得します（完全一致）。',
  inputSchema: lookupUserByEmailInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { lookupUserByEmail } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(lookupUserByEmailInputShape).parse(args)

      // APIに渡すパラメータを構築
      const params: LookupUserByEmailParams = {
        email: validatedParams.email, // メールアドレスはURLエンコード不要 (Axiosが自動で行う)
      }

      const response: UserDetail = await lookupUserByEmail(params)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error looking up user by email:', error)
      let errorMessage =
        'メールアドレスでのユーザー検索中に不明なエラーが発生しました'
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

export default lookupUserByEmailTool
