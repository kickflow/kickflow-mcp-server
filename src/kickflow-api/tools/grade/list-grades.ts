import { Tool } from '../../../types.js'
import { listGradesQueryParams } from '../../generated/grade/grade.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listGradesTool: Tool = {
  name: 'list_grades',
  description: '役職の一覧を取得します',
  paramsSchema: listGradesQueryParams.shape,
  cb: createApiToolCallback(listGradesQueryParams, (api, validatedArgs) =>
    api.listGrades(validatedArgs),
  ),
}
export default listGradesTool
