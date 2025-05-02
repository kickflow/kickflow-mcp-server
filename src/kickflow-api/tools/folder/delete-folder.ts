import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  folderId: z.string().uuid().describe('削除するフォルダのID'),
})

const deleteFolderTool: Tool = {
  name: 'delete_folder',
  description: '指定されたIDのフォルダを削除します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { folderId } = validatedArgs
    return api.deleteFolder(folderId)
  }),
}
export default deleteFolderTool
