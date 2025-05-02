import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('取得する組織図のID'),
})

const getOrganizationChartTool: Tool = {
  name: 'get_organization_chart',
  description: '指定されたIDの組織図を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId } = validatedArgs
    return api.getOrganizationChart(organizationChartId)
  }),
}
export default getOrganizationChartTool
