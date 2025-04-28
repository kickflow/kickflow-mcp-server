import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on UpdateFolderBody and path param
const updateFolderInputShape = {
  folderId: z.string().uuid().describe('更新するフォルダのUUID'),
  name: z.string().optional().describe('新しいフォルダ名'),
  code: z.string().optional().describe('新しいコード'),
  description: z.string().optional().describe('新しいフォルダの説明'),
  parentFolderId: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe('新しい親フォルダのID。nullの場合、ルートフォルダになります。'),
}

const updateFolderTool: McpTool<typeof updateFolderInputShape> = {
  name: 'update_folder',
  description: 'フォルダを更新します',
  inputSchema: updateFolderInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateFolderInputShape).parse(params)

      const { folderId, ...updateBody } = validatedParams

      // parentFolderId が undefined の場合に null を設定
      const apiUpdateBody = {
        ...updateBody,
        parentFolderId:
          updateBody.parentFolderId === undefined
            ? null
            : updateBody.parentFolderId,
      }

      const folder = await api.updateFolder(folderId, apiUpdateBody)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(folder, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error updating folder:', error)
      let errorMessage = 'フォルダ更新中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default updateFolderTool
