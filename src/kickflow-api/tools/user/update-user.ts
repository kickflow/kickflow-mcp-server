import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateUserBody } from '../../generated/user/user.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('更新するユーザーのID'),
  ...updateUserBody.shape,
})

const updateUserTool: Tool = {
  name: 'update_user',
  description: '指定されたIDのユーザーを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId, ...updateData } = validatedArgs
    return api.updateUser(userId, updateData)
  }),
}
export default updateUserTool
