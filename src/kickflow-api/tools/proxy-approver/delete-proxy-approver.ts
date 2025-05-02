import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  proxyApproverId: z.string().uuid().describe('削除する代理承認のID'),
})

const deleteProxyApproverTool: Tool = {
  name: 'delete_proxy_approver',
  description: '指定されたIDの代理承認を削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { proxyApproverId } = validatedArgs
    return api.deleteProxyApprover(proxyApproverId)
  }),
}
export default deleteProxyApproverTool
