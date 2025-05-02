import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateTeamMemberBody } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('更新するメンバーが所属するチームのID'),
  userId: z.string().uuid().describe('更新するメンバーのユーザーID'),
  ...updateTeamMemberBody.shape,
})

const updateTeamMemberTool: Tool = {
  name: 'update_team_member',
  description: '指定されたチームのメンバーを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId, userId, ...updateData } = validatedArgs
    return api.updateTeamMember(organizationChartId, teamId, userId, updateData)
  }),
}
export default updateTeamMemberTool
