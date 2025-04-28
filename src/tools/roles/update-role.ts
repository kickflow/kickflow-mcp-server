import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
import { RoleUpdateBodyPermissionListItemPermission as PermissionEnum } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the shape for the 'permissionList' item for update
const updateRolePermissionItemShape = z.object({
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

// Define the raw shape for the input schema based on RoleUpdateBody and path param
const updateRoleInputShape = {
  roleId: z.string().uuid().describe('更新する管理者ロールのUUID'),
  name: z.string().max(255).optional().describe('新しいロール名'),
  permissionList: z
    .array(updateRolePermissionItemShape)
    .optional()
    .describe('新しい権限リスト'),
}

const updateRoleTool: McpTool<typeof updateRoleInputShape> = {
  name: 'update_role',
  description: '管理者ロールを更新します',
  inputSchema: updateRoleInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateRoleInputShape).parse(params)

      const { roleId, ...updateBody } = validatedParams

      // Ensure permissionList items have correct enum type and optional arrays are handled
      const apiUpdateBody = {
        ...updateBody,
        permissionList: updateBody.permissionList?.map((p) => ({
          ...p,
          permission: p.permission as PermissionEnum, // Type assertion
          folderIds: p.folderIds ?? undefined,
          generalMasterIds: p.generalMasterIds ?? undefined,
          teamIds: p.teamIds ?? undefined,
        })),
      }

      // Remove undefined top-level fields
      Object.keys(apiUpdateBody).forEach((key) => {
        const objKey = key as keyof typeof apiUpdateBody
        if (apiUpdateBody[objKey] === undefined) {
          delete apiUpdateBody[objKey]
        }
      })

      const role = await api.updateRole(
        roleId,
        apiUpdateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').RoleUpdateBody,
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
      console.error('Error updating role:', error)
      let errorMessage = '管理者ロール更新中に不明なエラーが発生しました'
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

export default updateRoleTool
