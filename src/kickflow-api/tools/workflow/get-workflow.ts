import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  workflowId: z.string().uuid().describe('取得するワークフローのID'),
})

const getWorkflowTool: Tool = {
  name: 'get_workflow',
  description: '指定されたIDのワークフローを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { workflowId } = validatedArgs
    return api.getWorkflow(workflowId)
  }),
}
export default getWorkflowTool
