import { Tool } from '../../../types.js'
import { createOrganizationChartBody } from '../../generated/organization-chart/organization-chart.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createOrganizationChartTool: Tool = {
  name: 'create_organization_chart',
  description: '組織図を作成します',
  paramsSchema: createOrganizationChartBody.shape,
  cb: createApiToolCallback(createOrganizationChartBody, (api, validatedArgs) =>
    api.createOrganizationChart(validatedArgs),
  ),
}
export default createOrganizationChartTool
