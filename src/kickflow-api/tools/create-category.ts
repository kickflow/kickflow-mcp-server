import { Tool } from '../../types.js'
import { createCategoryBody } from '../generated/category/category.zod.js'
import { createApiToolCallback } from '../tool-utils.js'

const createCategoryTool: Tool = {
  name: 'create_category',
  description: 'カテゴリを作成します',
  paramsSchema: createCategoryBody.shape,
  cb: createApiToolCallback(createCategoryBody, (api, validatedArgs) =>
    api.createCategory(validatedArgs),
  ),
}
export default createCategoryTool
