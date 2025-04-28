import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the base shape without refinements
const createViewerBaseShape = {
  ticketId: z.string().uuid().describe('チケットのUUID'),
  userId: z
    .union([z.string().uuid(), z.array(z.string().uuid())])
    .nullable()
    .optional()
    .describe('ユーザーUUIDまたはその配列。teamIdと排他的。'),
  teamId: z
    .union([z.string().uuid(), z.array(z.string().uuid())])
    .nullable()
    .optional()
    .describe('チームUUIDまたはその配列。userIdと排他的。'),
  gradeId: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe('役職UUID。teamId指定時のみ有効。'),
  descendants: z
    .boolean()
    .nullable()
    .optional()
    .describe('下位チームを含めるか。teamId指定時のみ有効。'),
}

// Define the refined schema for validation within execute
const createViewerRefinedSchema = z
  .object(createViewerBaseShape) // Use the base shape here
  .refine(
    (data) => !(data.userId && data.teamId),
    'userIdとteamIdはどちらか一方のみ指定可能です。',
  )
  .refine(
    (data) => !((data.gradeId || data.descendants) && !data.teamId),
    'gradeIdまたはdescendantsはteamId指定時のみ有効です。',
  )

const createViewerTool: McpTool<typeof createViewerBaseShape> = {
  // Use base shape for McpTool type
  name: 'create_viewer',
  description: 'チケットに共有ユーザーを追加します',
  inputSchema: createViewerBaseShape, // Use base shape for inputSchema
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      // Use the refined schema for parsing inside execute
      const validatedParams = createViewerRefinedSchema.parse(params)

      const { ticketId, ...createBody } = validatedParams

      // Handle nullable/optional fields for the API call
      const apiCreateBody = {
        userId: createBody.userId === undefined ? null : createBody.userId,
        teamId: createBody.teamId === undefined ? null : createBody.teamId,
        gradeId: createBody.gradeId === undefined ? null : createBody.gradeId,
        descendants:
          createBody.descendants === undefined ? null : createBody.descendants,
      }

      await api.createViewer(
        ticketId,
        apiCreateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateViewerBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: `チケット (ID: ${ticketId}) に共有ユーザーを追加しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error creating viewer:', error)
      let errorMessage = '共有ユーザー追加中に不明なエラーが発生しました'
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

export default createViewerTool
