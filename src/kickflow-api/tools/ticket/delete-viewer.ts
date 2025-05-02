import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('共有ユーザーを削除するチケットのID'),
  viewerId: z.string().uuid().describe('削除する共有ユーザーのID'),
})

const deleteViewerTool: Tool = {
  name: 'delete_viewer',
  description: 'チケットの共有ユーザーを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, viewerId } = validatedArgs
    return api.deleteViewer(ticketId, viewerId)
  }),
}
export default deleteViewerTool
