import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on CreateRoleMembersBody and path param
const createRoleMembersInputShape = {
  roleId: z.string().uuid().describe('メンバーを追加する管理者ロールのUUID'),
  userIds: z
    .array(z.string().uuid())
    .min(1)
    .max(10)
    .describe('追加するユーザーUUIDの配列 (1〜10件)'),
}

const createRoleMembersTool: McpTool<typeof createRoleMembersInputShape> = {
  name: 'create_role_members',
  description: '管理者ロールにメンバーを追加します (最大10人)',
  inputSchema: createRoleMembersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(createRoleMembersInputShape)
        .parse(params)

      const { roleId, userIds } = validatedParams

      // Construct the request body
      const createBody = { userIds }

      await api.createRoleMembers(
        roleId,
        createBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateRoleMembersBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: `${userIds.length}人のメンバーを管理者ロール (ID: ${roleId}) に追加しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error creating role members:', error)
      let errorMessage = 'ロールメンバー追加中に不明なエラーが発生しました'
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

export default createRoleMembersTool
