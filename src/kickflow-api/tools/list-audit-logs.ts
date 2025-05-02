import { Tool } from '../../types.js'
import { listAuditLogsQueryParams } from '../generated/audit-log/audit-log.zod.js'
import { createApiToolCallback } from '../tool-utils.js'

const listAuditLogsTool: Tool = {
  name: 'list_audit_logs',
  description: '監査ログの一覧を取得します',
  paramsSchema: listAuditLogsQueryParams.shape,
  cb: createApiToolCallback(listAuditLogsQueryParams, (api, validatedArgs) =>
    api.listAuditLogs(validatedArgs),
  ),
}
export default listAuditLogsTool
