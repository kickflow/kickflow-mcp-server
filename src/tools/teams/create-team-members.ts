import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the shape for the 'users' array item
const createTeamMemberItemShape = z.object({
  id: z.string().uuid().describe('ユーザーのUUID'),
  leader: z.boolean().describe('上長の場合、true'),
  gradeIds: z
    .array(z.string().uuid())
    .min(1) // Schema indicates minItems: 1, but let's keep it optional as API might handle defaults
    .optional() // Making optional for flexibility, API might assign default grade if omitted
    .describe('役職のUUIDの配列 (最低1つ)'),
})

// Define the raw shape for the input schema based on CreateTeamMembersBody and path params
const createTeamMembersInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('チームのUUID'),
  users: z
    .array(createTeamMemberItemShape)
    .min(1)
    .max(10) // Max 10 users at a time
    .describe('メンバーに追加したいユーザー情報の配列 (1〜10件)'),
}

const createTeamMembersTool: McpTool<typeof createTeamMembersInputShape> = {
  name: 'create_team_members',
  description: '指定したチームにメンバーを追加します (最大10人)',
  inputSchema: createTeamMembersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(createTeamMembersInputShape)
        .parse(params)

      const { organizationChartId, teamId, users } = validatedParams

      // Construct the request body, ensuring gradeIds is handled if optional
      const createBody = {
        users: users.map((user) => ({
          ...user,
          // If gradeIds is optional and not provided, don't include it
          ...(user.gradeIds && { gradeIds: user.gradeIds }),
        })),
      }

      await api.createTeamMembers(
        organizationChartId,
        teamId,
        createBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateTeamMembersBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: `${users.length}人のメンバーをチーム (ID: ${teamId}) に追加しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error creating team members:', error)
      let errorMessage = 'チームメンバー追加中に不明なエラーが発生しました'
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

export default createTeamMembersTool
