import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListRoleMembersParams and path param
const listRoleMembersInputShape = {
  roleId: z.string().uuid().describe('管理者ロールのUUID'),
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
}

const listRoleMembersTool: McpTool<typeof listRoleMembersInputShape> = {
  name: 'list_role_members',
  description: '管理者ロールのメンバー一覧を取得します',
  inputSchema: listRoleMembersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listRoleMembersInputShape).parse(params)

      const { roleId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const members = await api.listRoleMembers(roleId, apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(members, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching role members:', error)
      let errorMessage =
        'ロールメンバー一覧の取得中に不明なエラーが発生しました'
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

export default listRoleMembersTool
