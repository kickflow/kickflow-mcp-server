import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const deleteRoleMemberInputShape = {
  roleId: z.string().uuid().describe('管理者ロールのUUID'),
  userId: z.string().uuid().describe('削除するユーザーのUUID'),
}

const deleteRoleMemberTool: McpTool<typeof deleteRoleMemberInputShape> = {
  name: 'delete_role_member',
  description: '管理者ロールからメンバーを削除します',
  inputSchema: deleteRoleMemberInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteRoleMemberInputShape).parse(params)

      await api.deleteRoleMember(validatedParams.roleId, validatedParams.userId)

      return {
        content: [
          {
            type: 'text',
            text: `管理者ロール (ID: ${validatedParams.roleId}) からメンバー (User ID: ${validatedParams.userId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting role member:', error)
      let errorMessage = 'ロールメンバー削除中に不明なエラーが発生しました'
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

export default deleteRoleMemberTool
