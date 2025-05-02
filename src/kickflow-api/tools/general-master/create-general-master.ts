import { Tool } from '../../../types.js'
import { createGeneralMasterBody } from '../../generated/general-master/general-master.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createGeneralMasterTool: Tool = {
  name: 'create_general_master',
  description: '汎用マスタを作成します',
  paramsSchema: createGeneralMasterBody.shape,
  cb: createApiToolCallback(createGeneralMasterBody, (api, validatedArgs) =>
    api.createGeneralMaster(validatedArgs),
  ),
}
export default createGeneralMasterTool
