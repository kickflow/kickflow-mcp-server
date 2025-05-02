import { Tool } from '../../../types.js'
import { listProxyApproversQueryParams } from '../../generated/proxy-approver/proxy-approver.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listProxyApproversTool: Tool = {
  name: 'list_proxy_approvers',
  description: '代理承認の一覧を取得します',
  paramsSchema: listProxyApproversQueryParams.shape,
  cb: createApiToolCallback(
    listProxyApproversQueryParams,
    (api, validatedArgs) => api.listProxyApprovers(validatedArgs),
  ),
}
export default listProxyApproversTool
