import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListTeamMembersParams and path params
const listTeamMembersInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('チームのUUID'),
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ。1が先頭のページ。'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
}

const listTeamMembersTool: McpTool<typeof listTeamMembersInputShape> = {
  name: 'list_team_members',
  description: 'チームのメンバー一覧を取得します',
  inputSchema: listTeamMembersInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listTeamMembersInputShape).parse(params)

      const { organizationChartId, teamId, ...queryParams } = validatedParams

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined),
      )

      const members = await api.listTeamMembers(
        organizationChartId,
        teamId,
        apiParams,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(members, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
      let errorMessage =
        'チームメンバー一覧の取得中に不明なエラーが発生しました'
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

export default listTeamMembersTool
