import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createRoleMembersBody } from '../../generated/role/role.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  roleId: z.string().uuid().describe('メンバーを追加する管理者ロールのID'),
  ...createRoleMembersBody.shape,
})

const createRoleMembersTool: Tool = {
  name: 'create_role_members',
  description: '指定された管理者ロールにメンバーを追加します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { roleId, ...createData } = validatedArgs
    return api.createRoleMembers(roleId, createData)
  }),
}
export default createRoleMembersTool
