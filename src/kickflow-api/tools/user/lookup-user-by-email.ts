import { Tool } from '../../../types.js'
import { lookupUserByEmailQueryParams } from '../../generated/user/user.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const lookupUserByEmailTool: Tool = {
  name: 'lookup_user_by_email',
  description: 'メールアドレスからユーザーを取得します（完全一致）',
  paramsSchema: lookupUserByEmailQueryParams.shape,
  cb: createApiToolCallback(
    lookupUserByEmailQueryParams,
    (api, validatedArgs) => api.lookupUserByEmail(validatedArgs),
  ),
}
export default lookupUserByEmailTool
