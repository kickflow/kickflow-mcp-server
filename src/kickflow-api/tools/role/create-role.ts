import { Tool } from '../../../types.js'
import { createRoleBody } from '../../generated/role/role.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createRoleTool: Tool = {
  name: 'create_role',
  description: '管理者ロールを作成します',
  paramsSchema: createRoleBody.shape,
  cb: createApiToolCallback(createRoleBody, (api, validatedArgs) =>
    api.createRole(validatedArgs),
  ),
}
export default createRoleTool
