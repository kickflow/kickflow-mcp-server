import { Tool } from '../../../types.js'
import { listRolesQueryParams } from '../../generated/role/role.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listRolesTool: Tool = {
  name: 'list_roles',
  description: '管理者ロールの一覧を取得します',
  paramsSchema: listRolesQueryParams.shape,
  cb: createApiToolCallback(listRolesQueryParams, (api, validatedArgs) =>
    api.listRoles(validatedArgs),
  ),
}
export default listRolesTool
