import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('取得するユーザーのID'),
})

const getUserTool: Tool = {
  name: 'get_user',
  description: '指定されたIDのユーザーを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId } = validatedArgs
    return api.getUser(userId)
  }),
}
export default getUserTool
