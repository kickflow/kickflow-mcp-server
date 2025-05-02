import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  routeId: z.string().uuid().describe('取得する経路のID'),
})

const getRouteTool: Tool = {
  name: 'get_route',
  description: '指定されたIDの経路を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { routeId } = validatedArgs
    return api.getRoute(routeId)
  }),
}
export default getRouteTool
