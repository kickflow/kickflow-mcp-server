import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  folderId: z.string().uuid().describe('取得するフォルダのID'),
})

const getFolderTool: Tool = {
  name: 'get_folder',
  description: '指定されたIDのフォルダを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { folderId } = validatedArgs
    return api.getFolder(folderId)
  }),
}
export default getFolderTool
