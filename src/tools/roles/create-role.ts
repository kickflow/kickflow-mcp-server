import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
import { RoleCreateBodyPermissionListItemPermission as PermissionEnum } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the shape for the 'permissionList' item
const createRolePermissionItemShape = z.object({
  permission: z
    .enum(Object.values(PermissionEnum) as [string, ...string[]])
    .describe('権限タイプ'),
  restricted: z.boolean().describe('管理対象を制限する場合true'),
  folderIds: z
    .array(z.string().uuid())
    .optional()
    .describe('管理対象のフォルダID'),
  generalMasterIds: z
    .array(z.string().uuid())
    .optional()
    .describe('管理対象の汎用マスタID'),
  teamIds: z.array(z.string().uuid()).optional().describe('管理対象のチームID'),
})

// Define the raw shape for the input schema based on RoleCreateBody
const createRoleInputShape = {
  name: z.string().max(255).describe('ロール名'),
  permissionList: z.array(createRolePermissionItemShape).describe('権限リスト'),
}

const createRoleTool: McpTool<typeof createRoleInputShape> = {
  name: 'create_role',
  description: '管理者ロールを作成します',
  inputSchema: createRoleInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createRoleInputShape).parse(params)

      // Ensure permissionList items have correct enum type and optional arrays are handled
      const apiCreateBody = {
        ...validatedParams,
        permissionList: validatedParams.permissionList.map((p) => ({
          ...p,
          permission: p.permission as PermissionEnum, // Type assertion
          folderIds: p.folderIds ?? undefined, // Use undefined if null/undefined
          generalMasterIds: p.generalMasterIds ?? undefined,
          teamIds: p.teamIds ?? undefined,
        })),
      }

      const role = await api.createRole(
        apiCreateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').RoleCreateBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(role, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating role:', error)
      let errorMessage = '管理者ロール作成中に不明なエラーが発生しました'
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

export default createRoleTool
