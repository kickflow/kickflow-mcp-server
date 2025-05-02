import { Tool } from '../../../types.js'
import { listRoutesQueryParams } from '../../generated/route/route.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listRoutesTool: Tool = {
  name: 'list_routes',
  description: '経路の一覧を取得します',
  paramsSchema: listRoutesQueryParams.shape,
  cb: createApiToolCallback(listRoutesQueryParams, (api, validatedArgs) =>
    api.listRoutes(validatedArgs),
  ),
}
export default listRoutesTool
