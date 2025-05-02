import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  roleId: z.string().uuid().describe('削除する管理者ロールのID'),
})

const deleteRoleTool: Tool = {
  name: 'delete_role',
  description: '指定されたIDの管理者ロールを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { roleId } = validatedArgs
    return api.deleteRole(roleId)
  }),
}
export default deleteRoleTool
