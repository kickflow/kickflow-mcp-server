import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateTeamBody } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('更新するチームのID'),
  ...updateTeamBody.shape,
})

const updateTeamTool: Tool = {
  name: 'update_team',
  description: '指定されたIDのチームを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId, ...updateData } = validatedArgs
    return api.updateTeam(organizationChartId, teamId, updateData)
  }),
}
export default updateTeamTool
