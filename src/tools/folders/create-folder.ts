import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on CreateFolderBody
const createFolderInputShape = {
  name: z.string().describe('フォルダ名'),
  code: z
    .string()
    .optional()
    .describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
  description: z.string().optional().describe('フォルダの説明'),
  parentFolderId: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe(
      '親フォルダのID。nullまたは未指定の場合、ルートフォルダになります。',
    ),
}

const createFolderTool: McpTool<typeof createFolderInputShape> = {
  name: 'create_folder',
  description: 'フォルダを作成します',
  inputSchema: createFolderInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createFolderInputShape).parse(params)

      // parentFolderId が undefined の場合に null を設定
      const apiParams = {
        ...validatedParams,
        parentFolderId:
          validatedParams.parentFolderId === undefined
            ? null
            : validatedParams.parentFolderId,
      }

      const folder = await api.createFolder(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(folder, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating folder:', error)
      let errorMessage = 'フォルダ作成中に不明なエラーが発生しました'
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

export default createFolderTool
