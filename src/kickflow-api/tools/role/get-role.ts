import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  roleId: z.string().uuid().describe('取得する管理者ロールのID'),
})

const getRoleTool: Tool = {
  name: 'get_role',
  description: '指定されたIDの管理者ロールを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { roleId } = validatedArgs
    return api.getRole(roleId)
  }),
}
export default getRoleTool
