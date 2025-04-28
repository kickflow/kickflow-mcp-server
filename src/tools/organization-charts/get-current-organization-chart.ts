import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema (empty object as there are no params)
const getCurrentOrganizationChartInputShape = {}

const getCurrentOrganizationChartTool: McpTool<
  typeof getCurrentOrganizationChartInputShape
> = {
  name: 'get_current_organization_chart',
  description: '現在有効になっている組織図を取得します',
  inputSchema: getCurrentOrganizationChartInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      // No params to validate for this specific API call
      z.object(getCurrentOrganizationChartInputShape).parse(params) // Still parse to ensure no unexpected params

      const chart = await api.getCurrentOrganizationChart()

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(chart, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching current organization chart:', error)
      let errorMessage = '現在の組織図取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        // This case might be less likely without input params, but good practice
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default getCurrentOrganizationChartTool
