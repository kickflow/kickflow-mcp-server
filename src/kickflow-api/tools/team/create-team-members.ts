import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createTeamMembersBody } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('メンバーを追加するチームのID'),
  ...createTeamMembersBody.shape,
})

const createTeamMembersTool: Tool = {
  name: 'create_team_members',
  description: '指定されたチームにメンバーを追加します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId, ...createData } = validatedArgs
    return api.createTeamMembers(organizationChartId, teamId, createData)
  }),
}
export default createTeamMembersTool
