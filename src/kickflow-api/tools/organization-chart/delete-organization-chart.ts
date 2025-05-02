import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('削除する組織図のID'),
})

const deleteOrganizationChartTool: Tool = {
  name: 'delete_organization_chart',
  description: '指定されたIDの組織図を削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId } = validatedArgs
    return api.deleteOrganizationChart(organizationChartId)
  }),
}
export default deleteOrganizationChartTool
