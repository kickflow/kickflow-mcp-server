import { Tool } from '../../../types.js'
import { listWorkflowsQueryParams } from '../../generated/workflow/workflow.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listWorkflowsTool: Tool = {
  name: 'list_workflows',
  description: 'ワークフローの一覧を取得します',
  paramsSchema: listWorkflowsQueryParams.shape,
  cb: createApiToolCallback(listWorkflowsQueryParams, (api, validatedArgs) =>
    api.listWorkflows(validatedArgs),
  ),
}
export default listWorkflowsTool
