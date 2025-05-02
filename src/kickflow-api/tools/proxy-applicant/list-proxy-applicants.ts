import { Tool } from '../../../types.js'
import { listProxyApplicantsQueryParams } from '../../generated/proxy-applicant/proxy-applicant.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listProxyApplicantsTool: Tool = {
  name: 'list_proxy_applicants',
  description: '代理申請の一覧を取得します',
  paramsSchema: listProxyApplicantsQueryParams.shape,
  cb: createApiToolCallback(
    listProxyApplicantsQueryParams,
    (api, validatedArgs) => api.listProxyApplicants(validatedArgs),
  ),
}
export default listProxyApplicantsTool
