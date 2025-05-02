import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('削除するチームのID'),
})

const deleteTeamTool: Tool = {
  name: 'delete_team',
  description: '指定されたIDのチームを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId } = validatedArgs
    return api.deleteTeam(organizationChartId, teamId)
  }),
}
export default deleteTeamTool
