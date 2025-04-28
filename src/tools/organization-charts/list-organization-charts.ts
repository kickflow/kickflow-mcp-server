import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListOrganizationChartsParams
const listOrganizationChartsInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'name']) // Corrected based on schema file
    .optional()
    .describe('ソート。指定可能なフィールド: createdAt, name'),
}

const listOrganizationChartsTool: McpTool<
  typeof listOrganizationChartsInputShape
> = {
  name: 'list_organization_charts',
  description: '組織図の一覧を取得します',
  inputSchema: listOrganizationChartsInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(listOrganizationChartsInputShape)
        .parse(params)

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      const charts = await api.listOrganizationCharts(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(charts, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching organization charts:', error)
      let errorMessage = '組織図一覧の取得中に不明なエラーが発生しました'
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

export default listOrganizationChartsTool
