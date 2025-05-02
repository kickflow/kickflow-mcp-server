import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const deleteCategoryParams = z.object({
  categoryId: z.string().uuid().describe('削除するカテゴリのID'),
})

const deleteCategoryTool: Tool = {
  name: 'delete_category',
  description: 'カテゴリを削除します',
  paramsSchema: deleteCategoryParams.shape,
  cb: createApiToolCallback(deleteCategoryParams, (api, validatedArgs) =>
    api.deleteCategory(validatedArgs.categoryId),
  ),
}
export default deleteCategoryTool
