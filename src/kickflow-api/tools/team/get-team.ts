import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームが所属する組織図のID'),
  teamId: z.string().uuid().describe('取得するチームのID'),
})

const getTeamTool: Tool = {
  name: 'get_team',
  description: '指定されたIDのチームを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, teamId } = validatedArgs
    return api.getTeam(organizationChartId, teamId)
  }),
}
export default getTeamTool
