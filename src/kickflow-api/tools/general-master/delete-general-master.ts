import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z.string().uuid().describe('削除する汎用マスタのID'),
})

const deleteGeneralMasterTool: Tool = {
  name: 'delete_general_master',
  description: '指定されたIDの汎用マスタを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId } = validatedArgs
    return api.deleteGeneralMaster(generalMasterId)
  }),
}
export default deleteGeneralMasterTool
