import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z.string().uuid().describe('取得する汎用マスタのID'),
})

const getGeneralMasterTool: Tool = {
  name: 'get_general_master',
  description: '指定されたIDの汎用マスタを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId } = validatedArgs
    return api.getGeneralMaster(generalMasterId)
  }),
}
export default getGeneralMasterTool
