import { Tool } from '../../../types.js'
import { listUsersQueryParams } from '../../generated/user/user.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listUsersTool: Tool = {
  name: 'list_users',
  description: 'ユーザー一覧を取得します',
  paramsSchema: listUsersQueryParams.shape,
  cb: createApiToolCallback(listUsersQueryParams, (api, validatedArgs) =>
    api.listUsers(validatedArgs),
  ),
}
export default listUsersTool
