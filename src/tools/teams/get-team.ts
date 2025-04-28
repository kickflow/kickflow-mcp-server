import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const getTeamInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('取得するチームのUUID'),
}

const getTeamTool: McpTool<typeof getTeamInputShape> = {
  name: 'get_team',
  description: 'チームを一件取得します',
  inputSchema: getTeamInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(getTeamInputShape).parse(params)

      const team = await api.getTeam(
        validatedParams.organizationChartId,
        validatedParams.teamId,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(team, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching team:', error)
      let errorMessage = 'チーム取得中に不明なエラーが発生しました'
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

export default getTeamTool
