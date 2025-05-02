import { z } from 'zod'
import { Tool } from '../../../types.js'
import { listRoleMembersQueryParams } from '../../generated/role/role.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  roleId: z.string().uuid().describe('メンバー一覧を取得する管理者ロールのID'),
  ...listRoleMembersQueryParams.shape,
})

const listRoleMembersTool: Tool = {
  name: 'list_role_members',
  description: '指定された管理者ロールのメンバー一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { roleId, ...queryParams } = validatedArgs
    return api.listRoleMembers(roleId, queryParams)
  }),
}
export default listRoleMembersTool
