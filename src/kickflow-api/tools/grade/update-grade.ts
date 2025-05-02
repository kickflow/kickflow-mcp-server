import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateGradeBody } from '../../generated/grade/grade.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  gradeId: z.string().uuid().describe('更新する役職のID'),
  ...updateGradeBody.shape,
})

const updateGradeTool: Tool = {
  name: 'update_grade',
  description: '指定されたIDの役職を更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { gradeId, ...updateData } = validatedArgs
    return api.updateGrade(gradeId, updateData)
  }),
}
export default updateGradeTool
