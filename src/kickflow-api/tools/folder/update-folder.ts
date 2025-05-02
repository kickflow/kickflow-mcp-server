import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateFolderBody } from '../../generated/folder/folder.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  folderId: z.string().uuid().describe('更新するフォルダのID'),
  ...updateFolderBody.shape,
})

const updateFolderTool: Tool = {
  name: 'update_folder',
  description: '指定されたIDのフォルダを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { folderId, ...updateData } = validatedArgs
    return api.updateFolder(folderId, updateData)
  }),
}
export default updateFolderTool
