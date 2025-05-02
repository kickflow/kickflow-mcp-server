import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('再招待するユーザーのID'),
})

const reinviteUserTool: Tool = {
  name: 'reinvite_user',
  description: '指定されたIDのユーザーを再招待します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId } = validatedArgs
    return api.reinviteUser(userId)
  }),
}
export default reinviteUserTool
