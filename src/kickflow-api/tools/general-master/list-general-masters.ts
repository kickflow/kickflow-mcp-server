import { Tool } from '../../../types.js'
import { listGeneralMastersQueryParams } from '../../generated/general-master/general-master.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listGeneralMastersTool: Tool = {
  name: 'list_general_masters',
  description: '汎用マスタの一覧を取得します',
  paramsSchema: listGeneralMastersQueryParams.shape,
  cb: createApiToolCallback(
    listGeneralMastersQueryParams,
    (api, validatedArgs) => api.listGeneralMasters(validatedArgs),
  ),
}
export default listGeneralMastersTool
