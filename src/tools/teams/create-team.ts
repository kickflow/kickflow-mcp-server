import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on TeamCreateBody and path param
const createTeamInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  name: z.string().describe('チーム名'),
  code: z
    .string()
    .optional()
    .describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
  parentId: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe(
      '親チームのUUID。nullまたは未指定の場合、ルートチームになります。',
    ),
  approveOnly: z.boolean().optional().describe('承認専用チームかどうか'),
}

const createTeamTool: McpTool<typeof createTeamInputShape> = {
  name: 'create_team',
  description: '指定した組織図内にチームを作成します',
  inputSchema: createTeamInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(createTeamInputShape).parse(params)

      const { organizationChartId, ...createBody } = validatedParams

      // Ensure parentId is null if undefined
      const apiCreateBody = {
        ...createBody,
        parentId:
          createBody.parentId === undefined ? null : createBody.parentId,
      }

      const team = await api.createTeam(
        organizationChartId,
        apiCreateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').TeamCreateBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(team, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error creating team:', error)
      let errorMessage = 'チーム作成中に不明なエラーが発生しました'
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

export default createTeamTool
