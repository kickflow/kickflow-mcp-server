import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateGeneralMasterItemBody } from '../../generated/general-master/general-master.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z
    .string()
    .uuid()
    .describe('アイテムが所属する汎用マスタのID'),
  itemId: z.string().uuid().describe('更新するアイテムのID'),
  ...updateGeneralMasterItemBody.shape,
})

const updateGeneralMasterItemTool: Tool = {
  name: 'update_general_master_item',
  description: '指定されたIDの汎用マスタアイテムを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId, itemId, ...updateData } = validatedArgs
    return api.updateGeneralMasterItem(generalMasterId, itemId, updateData)
  }),
}
export default updateGeneralMasterItemTool
