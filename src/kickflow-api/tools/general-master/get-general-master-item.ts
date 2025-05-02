import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z
    .string()
    .uuid()
    .describe('アイテムが所属する汎用マスタのID'),
  itemId: z.string().uuid().describe('取得するアイテムのID'),
})

const getGeneralMasterItemTool: Tool = {
  name: 'get_general_master_item',
  description: '指定されたIDの汎用マスタアイテムを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId, itemId } = validatedArgs
    return api.getGeneralMasterItem(generalMasterId, itemId)
  }),
}
export default getGeneralMasterItemTool
