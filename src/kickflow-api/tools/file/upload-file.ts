import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

// uploadFileBody の元のスキーマは zod.instanceof(File) を使用していますが、
// これは JSON Schema に変換できません（MCP SDK が内部で zod-to-json-schema を使用するため）。
// MCP 経由でのファイルアップロードは base64 エンコードされた文字列として受け渡すのが一般的です。
const uploadFileParamsSchema = z.object({
  file: z
    .string()
    .describe(
      '添付ファイル（base64エンコードされた文字列）。MCPではFileオブジェクトを直接渡すことができないため、base64形式で指定してください。'
    ),
  filename: z.string().describe('ファイル名'),
  contentType: z.string().optional().describe('Content-Type（省略可能）'),
})

const uploadFileTool: Tool = {
  name: 'upload_file',
  description:
    '添付ファイルをアップロードします。注意: MCP経由でのファイルアップロードはbase64エンコードされた文字列として指定する必要があります。',
  paramsSchema: uploadFileParamsSchema.shape,
  cb: createApiToolCallback(uploadFileParamsSchema, async (api, validatedArgs) => {
    // base64文字列からBlobを作成してFormDataに変換
    const base64Data = validatedArgs.file
    const binaryData = Buffer.from(base64Data, 'base64')
    const blob = new Blob([binaryData], { type: validatedArgs.contentType || 'application/octet-stream' })

    // File オブジェクトを作成（Node.js 20+ で利用可能）
    const file = new File([blob], validatedArgs.filename, {
      type: validatedArgs.contentType || 'application/octet-stream',
    })

    return api.uploadFile({ file })
  }),
}
export default uploadFileTool
