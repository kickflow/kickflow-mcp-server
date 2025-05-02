import { z } from 'zod'
import { Tool } from '../../../types.js'
import { listGeneralMasterItemsQueryParams } from '../../generated/general-master/general-master.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  generalMasterId: z
    .string()
    .uuid()
    .describe('アイテム一覧を取得する汎用マスタのID'),
  ...listGeneralMasterItemsQueryParams.shape,
})

const listGeneralMasterItemsTool: Tool = {
  name: 'list_general_master_items',
  description: '指定された汎用マスタのアイテム一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { generalMasterId, ...queryParams } = validatedArgs
    return api.listGeneralMasterItems(generalMasterId, queryParams)
  }),
}
export default listGeneralMasterItemsTool
