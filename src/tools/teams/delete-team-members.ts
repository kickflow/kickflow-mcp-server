import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on DeleteTeamMembersBody and path params
const deleteTeamMembersInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('チームのUUID'),
  userIds: z
    .array(z.string().uuid())
    .min(1)
    .max(10)
    .describe('削除するユーザーUUIDの配列 (1〜10件)'),
}

const deleteTeamMembersTool: McpTool<typeof deleteTeamMembersInputShape> = {
  name: 'delete_team_members',
  description: '指定したチームからメンバーを削除します (最大10人)',
  inputSchema: deleteTeamMembersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(deleteTeamMembersInputShape)
        .parse(params)

      const { organizationChartId, teamId, userIds } = validatedParams

      // Construct the request body
      const deleteBody = { userIds }

      await api.deleteTeamMembers(
        organizationChartId,
        teamId,
        deleteBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').DeleteTeamMembersBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: `${userIds.length}人のメンバーをチーム (ID: ${teamId}) から削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting team members:', error)
      let errorMessage = 'チームメンバー削除中に不明なエラーが発生しました'
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

export default deleteTeamMembersTool
