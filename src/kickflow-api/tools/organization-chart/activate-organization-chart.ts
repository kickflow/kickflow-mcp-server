import { z } from 'zod'
import { Tool } from '../../../types.js'
import { activateOrganizationChartBody } from '../../generated/organization-chart/organization-chart.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('有効化する組織図のID'),
  ...activateOrganizationChartBody.shape,
})

const activateOrganizationChartTool: Tool = {
  name: 'activate_organization_chart',
  description: '指定されたIDの組織図を有効化します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, ...activateData } = validatedArgs
    return api.activateOrganizationChart(organizationChartId, activateData)
  }),
}
export default activateOrganizationChartTool
