import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('再有効化するユーザーのID'),
})

const reactivateUserTool: Tool = {
  name: 'reactivate_user',
  description: '指定されたIDのユーザーを再有効化します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId } = validatedArgs
    return api.reactivateUser(userId)
  }),
}
export default reactivateUserTool
