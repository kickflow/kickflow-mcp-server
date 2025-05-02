import { Tool } from '../../../types.js'
import { listOrganizationChartsQueryParams } from '../../generated/organization-chart/organization-chart.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listOrganizationChartsTool: Tool = {
  name: 'list_organization_charts',
  description: '組織図の一覧を取得します',
  paramsSchema: listOrganizationChartsQueryParams.shape,
  cb: createApiToolCallback(
    listOrganizationChartsQueryParams,
    (api, validatedArgs) => api.listOrganizationCharts(validatedArgs),
  ),
}
export default listOrganizationChartsTool
