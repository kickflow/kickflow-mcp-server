import { Tool } from '../../../types.js'
import { createProxyApproverBody } from '../../generated/proxy-approver/proxy-approver.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createProxyApproverTool: Tool = {
  name: 'create_proxy_approver',
  description: '代理承認を作成します',
  paramsSchema: createProxyApproverBody.shape,
  cb: createApiToolCallback(createProxyApproverBody, (api, validatedArgs) =>
    api.createProxyApprover(validatedArgs),
  ),
}
export default createProxyApproverTool
