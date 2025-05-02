import { Tool } from '../../../types.js'
import { createGradeBody } from '../../generated/grade/grade.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createGradeTool: Tool = {
  name: 'create_grade',
  description: '役職を作成します',
  paramsSchema: createGradeBody.shape,
  cb: createApiToolCallback(createGradeBody, (api, validatedArgs) =>
    api.createGrade(validatedArgs),
  ),
}
export default createGradeTool
