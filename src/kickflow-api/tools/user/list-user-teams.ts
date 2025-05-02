import { z } from 'zod'
import { Tool } from '../../../types.js'
import { listUserTeamsQueryParams } from '../../generated/user/user.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  userId: z.string().uuid().describe('所属チーム一覧を取得するユーザーのID'),
  ...listUserTeamsQueryParams.shape,
})

const listUserTeamsTool: Tool = {
  name: 'list_user_teams',
  description: '指定されたIDのユーザーの所属チーム一覧を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { userId, ...queryParams } = validatedArgs
    return api.listUserTeams(userId, queryParams)
  }),
}
export default listUserTeamsTool
