import { Tool } from '../../../types.js'
import { listFoldersQueryParams } from '../../generated/folder/folder.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listFoldersTool: Tool = {
  name: 'list_folders',
  description: 'フォルダの一覧を取得します',
  paramsSchema: listFoldersQueryParams.shape,
  cb: createApiToolCallback(listFoldersQueryParams, (api, validatedArgs) =>
    api.listFolders(validatedArgs),
  ),
}

export default listFoldersTool
