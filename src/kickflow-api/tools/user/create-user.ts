import { Tool } from '../../../types.js'
import { createUserBody } from '../../generated/user/user.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createUserTool: Tool = {
  name: 'create_user',
  description: 'ユーザーを作成（招待）します',
  paramsSchema: createUserBody.shape,
  cb: createApiToolCallback(createUserBody, (api, validatedArgs) =>
    api.createUser(validatedArgs),
  ),
}
export default createUserTool
