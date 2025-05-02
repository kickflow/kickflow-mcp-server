import { Tool } from '../../../types.js'
import { createProxyApplicantBody } from '../../generated/proxy-applicant/proxy-applicant.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createProxyApplicantTool: Tool = {
  name: 'create_proxy_applicant',
  description: '代理申請を作成します',
  paramsSchema: createProxyApplicantBody.shape,
  cb: createApiToolCallback(createProxyApplicantBody, (api, validatedArgs) =>
    api.createProxyApplicant(validatedArgs),
  ),
}
export default createProxyApplicantTool
