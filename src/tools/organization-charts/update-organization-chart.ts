import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on OrganizationChartBody and path param
const updateOrganizationChartInputShape = {
  organizationChartId: z.string().uuid().describe('更新する組織図のUUID'),
  name: z.string().max(255).describe('新しい組織図の名前'),
}

const updateOrganizationChartTool: McpTool<
  typeof updateOrganizationChartInputShape
> = {
  name: 'update_organization_chart',
  description: '組織図を更新します',
  inputSchema: updateOrganizationChartInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(updateOrganizationChartInputShape)
        .parse(params)

      const { organizationChartId, ...updateBody } = validatedParams

      const chart = await api.updateOrganizationChart(
        organizationChartId,
        updateBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(chart, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error updating organization chart:', error)
      let errorMessage = '組織図更新中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default updateOrganizationChartTool
