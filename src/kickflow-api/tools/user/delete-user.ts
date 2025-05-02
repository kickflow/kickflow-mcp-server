import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('削除するユーザーのID'),
})

const deleteUserTool: Tool = {
  name: 'delete_user',
  description: '指定されたIDのユーザーを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId } = validatedArgs
    return api.deleteUser(userId)
  }),
}
export default deleteUserTool
