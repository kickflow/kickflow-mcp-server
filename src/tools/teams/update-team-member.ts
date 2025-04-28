import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on UpdateTeamMemberBody and path params
const updateTeamMemberInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('チームのUUID'),
  userId: z.string().uuid().describe('更新するユーザーのUUID'),
  leader: z.boolean().describe('上長の場合、true'),
  gradeIds: z
    .array(z.string().uuid())
    .min(1)
    .describe('役職のUUIDの配列 (最低1つ)'), // Schema indicates minItems: 1
}

const updateTeamMemberTool: McpTool<typeof updateTeamMemberInputShape> = {
  name: 'update_team_member',
  description: 'チームのメンバーを更新します',
  inputSchema: updateTeamMemberInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateTeamMemberInputShape).parse(params)

      const { organizationChartId, teamId, userId, ...updateBody } =
        validatedParams

      await api.updateTeamMember(
        organizationChartId,
        teamId,
        userId,
        updateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').UpdateTeamMemberBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: `チーム (ID: ${teamId}) のメンバー (User ID: ${userId}) を更新しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error updating team member:', error)
      let errorMessage = 'チームメンバー更新中に不明なエラーが発生しました'
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

export default updateTeamMemberTool
