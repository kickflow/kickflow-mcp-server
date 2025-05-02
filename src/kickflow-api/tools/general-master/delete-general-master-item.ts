import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z
    .string()
    .uuid()
    .describe('アイテムが所属する汎用マスタのID'),
  itemId: z.string().uuid().describe('削除するアイテムのID'),
})

const deleteGeneralMasterItemTool: Tool = {
  name: 'delete_general_master_item',
  description: '指定されたIDの汎用マスタアイテムを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId, itemId } = validatedArgs
    return api.deleteGeneralMasterItem(generalMasterId, itemId)
  }),
}
export default deleteGeneralMasterItemTool
