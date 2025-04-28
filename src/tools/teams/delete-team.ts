import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on path params
const deleteTeamInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('削除するチームのUUID'),
}

const deleteTeamTool: McpTool<typeof deleteTeamInputShape> = {
  name: 'delete_team',
  description:
    'チームを削除します。同時に、このチームの所属もすべて削除されます。',
  inputSchema: deleteTeamInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(deleteTeamInputShape).parse(params)

      await api.deleteTeam(
        validatedParams.organizationChartId,
        validatedParams.teamId,
      )

      return {
        content: [
          {
            type: 'text',
            text: `チーム (ID: ${validatedParams.teamId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting team:', error)
      let errorMessage = 'チーム削除中に不明なエラーが発生しました'
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

export default deleteTeamTool
