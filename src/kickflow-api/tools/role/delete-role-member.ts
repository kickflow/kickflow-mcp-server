import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  roleId: z.string().uuid().describe('メンバーを削除する管理者ロールのID'),
  userId: z.string().uuid().describe('削除するメンバーのユーザーID'),
})

const deleteRoleMemberTool: Tool = {
  name: 'delete_role_member',
  description: '指定された管理者ロールからメンバーを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { roleId, userId } = validatedArgs
    return api.deleteRoleMember(roleId, userId)
  }),
}
export default deleteRoleMemberTool
