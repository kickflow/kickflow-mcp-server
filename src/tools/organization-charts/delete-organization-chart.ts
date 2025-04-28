import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path param
const deleteOrganizationChartInputShape = {
  organizationChartId: z.string().uuid().describe('削除する組織図のUUID'),
}

const deleteOrganizationChartTool: McpTool<
  typeof deleteOrganizationChartInputShape
> = {
  name: 'delete_organization_chart',
  description:
    '組織図を削除します。注意：現在有効な組織図は削除できません。削除は非同期で実行されます。',
  inputSchema: deleteOrganizationChartInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(deleteOrganizationChartInputShape)
        .parse(params)

      await api.deleteOrganizationChart(validatedParams.organizationChartId)

      return {
        content: [
          {
            type: 'text',
            text: `組織図 (ID: ${validatedParams.organizationChartId}) の削除を開始しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting organization chart:', error)
      let errorMessage = '組織図削除中に不明なエラーが発生しました'
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

export default deleteOrganizationChartTool
