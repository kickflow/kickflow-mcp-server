import { Tool } from '../../../types.js'
import { createFolderBody } from '../../generated/folder/folder.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const createFolderTool: Tool = {
  name: 'create_folder',
  description: 'フォルダを作成します',
  paramsSchema: createFolderBody.shape,
  cb: createApiToolCallback(createFolderBody, (api, validatedArgs) =>
    api.createFolder(validatedArgs),
  ),
}
export default createFolderTool
