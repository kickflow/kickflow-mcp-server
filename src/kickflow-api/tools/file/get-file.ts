import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  signedId: z.string().describe('情報を取得する添付ファイルのSigned ID'),
})

const getFileTool: Tool = {
  name: 'get_file',
  description: '添付ファイルの情報を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { signedId } = validatedArgs
    return api.getFile(signedId)
  }),
}
export default getFileTool
