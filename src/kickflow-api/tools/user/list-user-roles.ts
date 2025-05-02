import { z } from 'zod'
import { Tool } from '../../../types.js'
import { listUserRolesQueryParams } from '../../generated/user/user.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('管理者ロール一覧を取得するユーザーのID'),
  ...listUserRolesQueryParams.shape,
})

const listUserRolesTool: Tool = {
  name: 'list_user_roles',
  description: '指定されたIDのユーザーの管理者ロール一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId, ...queryParams } = validatedArgs
    return api.listUserRoles(userId, queryParams)
  }),
}
export default listUserRolesTool
