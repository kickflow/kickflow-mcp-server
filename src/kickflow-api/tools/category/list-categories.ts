import { Tool } from '../../../types.js'
import { listCategoriesQueryParams } from '../../generated/category/category.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listCategoriesTool: Tool = {
  name: 'list_categories',
  description: 'カテゴリの一覧を取得します',
  paramsSchema: listCategoriesQueryParams.shape,
  cb: createApiToolCallback(listCategoriesQueryParams, (api, validatedArgs) =>
    api.listCategories(validatedArgs),
  ),
}
export default listCategoriesTool
