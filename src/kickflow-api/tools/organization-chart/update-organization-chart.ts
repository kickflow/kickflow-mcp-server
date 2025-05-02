import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateOrganizationChartBody } from '../../generated/organization-chart/organization-chart.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('更新する組織図のID'),
  ...updateOrganizationChartBody.shape,
})

const updateOrganizationChartTool: Tool = {
  name: 'update_organization_chart',
  description: '指定されたIDの組織図を更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, ...updateData } = validatedArgs
    return api.updateOrganizationChart(organizationChartId, updateData)
  }),
}
export default updateOrganizationChartTool
