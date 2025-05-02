import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('一時停止するユーザーのID'),
})

const suspendUserTool: Tool = {
  name: 'suspend_user',
  description: '指定されたIDのユーザーを一時停止します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId } = validatedArgs
    return api.suspendUser(userId)
  }),
}
export default suspendUserTool
