import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListTeamsParams and path param
const listTeamsInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  parentId: z
    .string()
    .uuid()
    .optional()
    .describe('親チームのUUID。指定しない場合はルートチームの一覧を返します。'),
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
}

const listTeamsTool: McpTool<typeof listTeamsInputShape> = {
  name: 'list_teams',
  description: '指定した組織図内のチーム一覧を取得します',
  inputSchema: listTeamsInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listTeamsInputShape).parse(params)

      const { organizationChartId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const teams = await api.listTeams(organizationChartId, apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(teams, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      let errorMessage = 'チーム一覧の取得中に不明なエラーが発生しました'
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

export default listTeamsTool
