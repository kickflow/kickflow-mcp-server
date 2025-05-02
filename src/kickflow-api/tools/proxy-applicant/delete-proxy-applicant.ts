import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  proxyApplicantId: z.string().uuid().describe('削除する代理申請のID'),
})

const deleteProxyApplicantTool: Tool = {
  name: 'delete_proxy_applicant',
  description: '指定されたIDの代理申請を削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { proxyApplicantId } = validatedArgs
    return api.deleteProxyApplicant(proxyApplicantId)
  }),
}
export default deleteProxyApplicantTool
