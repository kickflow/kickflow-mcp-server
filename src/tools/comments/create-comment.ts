import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on CreateCommentBody and path param
const createCommentInputShape = {
  ticketId: z.string().uuid().describe('コメントを投稿するチケットのUUID'),
  body: z.string().describe('コメント本文'),
  files: z
    .array(z.string())
    .nullable()
    .optional()
    .describe('添付ファイルの署名済みIDの配列'),
}

const createCommentTool: McpTool<typeof createCommentInputShape> = {
  name: 'create_comment',
  description: 'チケットにコメントを投稿します',
  inputSchema: createCommentInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createCommentInputShape).parse(params)

      const { ticketId, ...createBody } = validatedParams

      // Ensure files is null if undefined or empty
      const apiCreateBody = {
        ...createBody,
        files:
          createBody.files && createBody.files.length > 0
            ? createBody.files
            : null,
      }

      const comment = await api.createComment(
        ticketId,
        apiCreateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateCommentBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(comment, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating comment:', error)
      let errorMessage = 'コメント投稿中に不明なエラーが発生しました'
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

export default createCommentTool
