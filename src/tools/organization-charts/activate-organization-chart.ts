import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ActivateOrganizationChartBody and path param
const activateOrganizationChartInputShape = {
  organizationChartId: z.string().uuid().describe('有効化する組織図のUUID'),
  dueOn: z
    .string()
    .nullable()
    .optional()
    .describe('有効化する日付。nullまたは未指定の場合、即時で有効化します。'),
}

const activateOrganizationChartTool: McpTool<
  typeof activateOrganizationChartInputShape
> = {
  name: 'activate_organization_chart',
  description:
    '指定した組織図を有効化します。有効化は非同期で実行されることがあります。',
  inputSchema: activateOrganizationChartInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(activateOrganizationChartInputShape)
        .parse(params)

      const { organizationChartId, ...activateBody } = validatedParams

      // Ensure dueOn is null if undefined
      const apiActivateBody = {
        dueOn: activateBody.dueOn === undefined ? null : activateBody.dueOn,
      }

      const chart = await api.activateOrganizationChart(
        organizationChartId,
        apiActivateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').ActivateOrganizationChartBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(chart, null, 2), // Returns the chart detail on success
          },
        ],
      }
    } catch (error) {
      console.error('Error activating organization chart:', error)
      let errorMessage = '組織図有効化中に不明なエラーが発生しました'
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

export default activateOrganizationChartTool
