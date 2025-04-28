import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const getRoleInputShape = {
  roleId: z.string().uuid().describe('取得する管理者ロールのUUID'),
}

const getRoleTool: McpTool<typeof getRoleInputShape> = {
  name: 'get_role',
  description: '管理者ロールを一件取得します',
  inputSchema: getRoleInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getRoleInputShape).parse(params)

      const role = await api.getRole(validatedParams.roleId)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(role, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching role:', error)
      let errorMessage = '管理者ロール取得中に不明なエラーが発生しました'
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

export default getRoleTool
