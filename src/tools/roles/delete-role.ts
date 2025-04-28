import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const deleteRoleInputShape = {
  roleId: z.string().uuid().describe('削除する管理者ロールのUUID'),
}

const deleteRoleTool: McpTool<typeof deleteRoleInputShape> = {
  name: 'delete_role',
  description: '管理者ロールを削除します',
  inputSchema: deleteRoleInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteRoleInputShape).parse(params)

      await api.deleteRole(validatedParams.roleId)

      return {
        content: [
          {
            type: 'text',
            text: `管理者ロール (ID: ${validatedParams.roleId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting role:', error)
      let errorMessage = '管理者ロール削除中に不明なエラーが発生しました'
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

export default deleteRoleTool
