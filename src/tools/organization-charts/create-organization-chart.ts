import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on OrganizationChartBody
const createOrganizationChartInputShape = {
  name: z.string().max(255).describe('組織図の名前'),
}

const createOrganizationChartTool: McpTool<
  typeof createOrganizationChartInputShape
> = {
  name: 'create_organization_chart',
  description: '組織図を作成します',
  inputSchema: createOrganizationChartInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(createOrganizationChartInputShape)
        .parse(params)

      const chart = await api.createOrganizationChart(validatedParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(chart, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating organization chart:', error)
      let errorMessage = '組織図作成中に不明なエラーが発生しました'
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

export default createOrganizationChartTool
