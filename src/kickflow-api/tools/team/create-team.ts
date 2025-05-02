import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createTeamBody } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z.string().uuid().describe('チームを作成する組織図のID'),
  ...createTeamBody.shape,
})

const createTeamTool: Tool = {
  name: 'create_team',
  description: '指定された組織図内にチームを作成します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, ...createData } = validatedArgs
    return api.createTeam(organizationChartId, createData)
  }),
}
export default createTeamTool
