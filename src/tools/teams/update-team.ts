import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on TeamUpdateBody and path params
const updateTeamInputShape = {
  organizationChartId: z.string().uuid().describe('組織図のUUID'),
  teamId: z.string().uuid().describe('更新するチームのUUID'),
  name: z.string().optional().describe('新しいチーム名'),
  code: z
    .string()
    .optional()
    .describe('新しいコード。未指定の場合、ランダムな英数字がセットされます。'),
  parentId: z.string().uuid().optional().describe('新しい親チームのID'), // Nullable is not explicitly mentioned for update, assuming optional string ID
  approveOnly: z.boolean().optional().describe('承認専用チームかどうか'),
}

const updateTeamTool: McpTool<typeof updateTeamInputShape> = {
  name: 'update_team',
  description: 'チームを編集します',
  inputSchema: updateTeamInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(updateTeamInputShape).parse(params)

      const { organizationChartId, teamId, ...updateBody } = validatedParams

      // Remove undefined fields from the update body
      Object.keys(updateBody).forEach((key) => {
        const objKey = key as keyof typeof updateBody
        if (updateBody[objKey] === undefined) {
          delete updateBody[objKey]
        }
      })

      const team = await api.updateTeam(
        organizationChartId,
        teamId,
        updateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').TeamUpdateBody,
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
      console.error('Error updating team:', error)
      let errorMessage = 'チーム更新中に不明なエラーが発生しました'
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

export default updateTeamTool
