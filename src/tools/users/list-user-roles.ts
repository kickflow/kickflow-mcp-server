import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListUserRolesParams,
  Role,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param and ListUserRolesParams
const listUserRolesInputShape = {
  userId: z
    .string()
    .uuid()
    .describe('管理者ロール一覧を取得するユーザーのUUID'),
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ番号（1から始まる）'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
}

const listUserRolesTool: McpTool<typeof listUserRolesInputShape> = {
  name: 'list_user_roles',
  description:
    'ユーザーの管理者ロール一覧を取得します。このAPIの実行には、ロールの管理権限が必要です。',
  inputSchema: listUserRolesInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { listUserRoles } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(listUserRolesInputShape).parse(args)
      const { userId, ...paramsArgs } = validatedParams

      // APIに渡すパラメータを構築
      const params: ListUserRolesParams = {
        page: paramsArgs.page,
        perPage: paramsArgs.perPage,
      }
      // Remove undefined keys
      Object.keys(params).forEach(
        (key) =>
          (params as Record<string, unknown>)[key] === undefined &&
          delete (params as Record<string, unknown>)[key],
      )

      const response: Role[] = await listUserRoles(userId, params)

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
      console.error('Error listing user roles:', error)
      let errorMessage =
        'ユーザー管理者ロール一覧取得中に不明なエラーが発生しました'
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

export default listUserRolesTool
