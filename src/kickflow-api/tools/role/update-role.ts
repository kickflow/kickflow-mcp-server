import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateRoleBody } from '../../generated/role/role.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  roleId: z.string().uuid().describe('更新する管理者ロールのID'),
  ...updateRoleBody.shape,
})

const updateRoleTool: Tool = {
  name: 'update_role',
  description: '指定されたIDの管理者ロールを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { roleId, ...updateData } = validatedArgs
    return api.updateRole(roleId, updateData)
  }),
}
export default updateRoleTool
