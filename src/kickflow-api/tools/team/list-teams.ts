import { z } from 'zod'
import { Tool } from '../../../types.js'
import { listTeamsQueryParams } from '../../generated/team/team.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  organizationChartId: z
    .string()
    .uuid()
    .describe('チーム一覧を取得する組織図のID'),
  ...listTeamsQueryParams.shape,
})

const listTeamsTool: Tool = {
  name: 'list_teams',
  description: '指定された組織図内のチーム一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { organizationChartId, ...queryParams } = validatedArgs
    return api.listTeams(organizationChartId, queryParams)
  }),
}
export default listTeamsTool
