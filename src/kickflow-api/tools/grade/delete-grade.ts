import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  gradeId: z.string().uuid().describe('削除する役職のID'),
})

const deleteGradeTool: Tool = {
  name: 'delete_grade',
  description: '指定されたIDの役職を削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { gradeId } = validatedArgs
    return api.deleteGrade(gradeId)
  }),
}
export default deleteGradeTool
