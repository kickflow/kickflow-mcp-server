import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateGeneralMasterBody } from '../../generated/general-master/general-master.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z.string().uuid().describe('更新する汎用マスタのID'),
  ...updateGeneralMasterBody.shape,
})

const updateGeneralMasterTool: Tool = {
  name: 'update_general_master',
  description: '指定されたIDの汎用マスタを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId, ...updateData } = validatedArgs
    return api.updateGeneralMaster(generalMasterId, updateData)
  }),
}
export default updateGeneralMasterTool
