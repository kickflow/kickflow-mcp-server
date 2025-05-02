import { Tool } from '../../../types.js'
// file.zod.ts が存在しない、または読み込めない可能性があるため、型定義から推測して import します
import { uploadFileBody } from '../../generated/file/file.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const uploadFileTool: Tool = {
  name: 'upload_file',
  description: '添付ファイルをアップロードします',
  // 注意: uploadFileBody は zod.object({ file: zod.instanceof(File) }) のような形を期待しますが、
  // MCP経由でのFileオブジェクトの直接受け渡しは標準化されていません。
  // ここではスキーマ定義が存在すると仮定しますが、実際の動作はMCPクライアントの実装に依存します。
  paramsSchema: uploadFileBody.shape,
  cb: createApiToolCallback(uploadFileBody, (api, validatedArgs) =>
    // uploadFileBodyが { file: File } の形であることを期待
    api.uploadFile(validatedArgs),
  ),
}
export default uploadFileTool
