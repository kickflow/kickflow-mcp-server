import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  gradeId: z.string().uuid().describe('デフォルトにする役職のID'),
})

const setDefaultGradeTool: Tool = {
  name: 'set_default_grade',
  description: '指定されたIDの役職をデフォルトにします',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { gradeId } = validatedArgs
    return api.setDefaultGrade(gradeId)
  }),
}
export default setDefaultGradeTool
