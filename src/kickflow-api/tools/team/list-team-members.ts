import { z } from 'zod'
import { Tool } from '../../../types.js'
import { listTeamMembersQueryParams } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('メンバー一覧を取得するチームのID'),
  ...listTeamMembersQueryParams.shape,
})

const listTeamMembersTool: Tool = {
  name: 'list_team_members',
  description: '指定されたチームのメンバー一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId, ...queryParams } = validatedArgs
    return api.listTeamMembers(organizationChartId, teamId, queryParams)
  }),
}
export default listTeamMembersTool
