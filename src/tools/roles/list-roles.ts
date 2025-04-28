import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'

// Define the raw shape for the input schema based on ListRolesParams
const listRolesInputShape = {
  page: z.number().int().min(1).optional().describe('ページ'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'name']) // Corrected based on schema file
    .optional()
    .describe('ソート。 指定可能なフィールド: createdAt, name'),
}

const listRolesTool: McpTool<typeof listRolesInputShape> = {
  name: 'list_roles',
  description: '管理者ロールの一覧を取得します',
  inputSchema: listRolesInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z.object(listRolesInputShape).parse(params)

      // undefinedでないパラメータだけを抽出
      const apiParams = Object.fromEntries(
        Object.entries(validatedParams).filter(
          ([_, value]) => value !== undefined,
        ),
      )

      const roles = await api.listRoles(apiParams)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(roles, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error fetching roles:', error)
      let errorMessage = '管理者ロール一覧の取得中に不明なエラーが発生しました'
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

export default listRolesTool
