import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  gradeId: z.string().uuid().describe('取得する役職のID'),
})

const getGradeTool: Tool = {
  name: 'get_grade',
  description: '指定されたIDの役職を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { gradeId } = validatedArgs
    return api.getGrade(gradeId)
  }),
}
export default getGradeTool
