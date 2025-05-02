import { z } from 'zod'
import { Tool } from '../../../types.js'
import { deleteTeamMembersBody } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('メンバーを削除するチームのID'),
  ...deleteTeamMembersBody.shape,
})

const deleteTeamMembersTool: Tool = {
  name: 'delete_team_members',
  description: '指定されたチームからメンバーを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId, ...deleteData } = validatedArgs
    return api.deleteTeamMembers(organizationChartId, teamId, deleteData)
  }),
}
export default deleteTeamMembersTool
