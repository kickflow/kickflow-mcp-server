import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createGeneralMasterItemBody } from '../../generated/general-master/general-master.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z
    .string()
    .uuid()
    .describe('アイテムを作成する汎用マスタのID'),
  ...createGeneralMasterItemBody.shape,
})

const createGeneralMasterItemTool: Tool = {
  name: 'create_general_master_item',
  description: '指定された汎用マスタにアイテムを作成します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId, ...createData } = validatedArgs
    return api.createGeneralMasterItem(generalMasterId, createData)
  }),
}
export default createGeneralMasterItemTool
