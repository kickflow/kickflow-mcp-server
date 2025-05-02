import { z } from 'zod'
import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { createViewerBody } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  ticketId: z.string().uuid().describe('共有ユーザーを追加するチケットのID'),
  ...createViewerBody.shape,
})

const createViewerTool: Tool = {
  name: 'create_viewer',
  description: 'チケットに共有ユーザーを追加します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { ticketId, ...createData } = validatedArgs
    return api.createViewer(ticketId, createData)
  }),
}
export default createViewerTool
