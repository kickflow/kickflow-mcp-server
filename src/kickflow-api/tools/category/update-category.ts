import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateCategoryBody } from '../../generated/category/category.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  categoryId: z.string().uuid().describe('更新するカテゴリのID'),
  ...updateCategoryBody.shape,
})

const updateCategoryTool: Tool = {
  name: 'update_category',
  description: '指定されたIDのカテゴリを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { categoryId, ...updateData } = validatedArgs
    return api.updateCategory(categoryId, updateData)
  }),
}
export default updateCategoryTool
