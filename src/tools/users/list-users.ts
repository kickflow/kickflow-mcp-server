import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
import { ListUsersStatusItem as UserStatusEnum } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the raw shape for the input schema based on ListUsersParams
const listUsersInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  status: z
    .array(z.enum(Object.values(UserStatusEnum) as [string, ...string[]]))
    .optional()
    .describe('ステータスによる絞り込み'),
  sortBy: z
    .enum(['email', 'code']) // Corrected based on schema file
    .optional()
    .describe('ソート。指定可能なフィールド: email, code'),
}

const listUsersTool: McpTool<typeof listUsersInputShape> = {
  name: 'list_users',
  description: 'ユーザー一覧を取得します',
  inputSchema: listUsersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listUsersInputShape).parse(params)

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      const users = await api.listUsers(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(users, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      let errorMessage = 'ユーザー一覧の取得中に不明なエラーが発生しました'
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

export default listUsersTool
