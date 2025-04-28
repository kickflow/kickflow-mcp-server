import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListWorkflowsParams,
  Workflow,
  ListWorkflowsStatusItem, // Import enum type
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on ListWorkflowsParams
const listWorkflowsInputShape = {
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ番号（1から始まる）'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name', 'status'])
    .optional()
    .describe(
      'ソート。ソート可能なフィールド: createdAt, updatedAt, name, status',
    ),
  status: z
    .array(z.enum(['visible', 'invisible']))
    .optional()
    .describe('ステータス (visible, invisible)'),
}

const listWorkflowsTool: McpTool<typeof listWorkflowsInputShape> = {
  name: 'list_workflows',
  description:
    'ワークフローの一覧を取得します。ステータスによる絞り込みが可能です。',
  inputSchema: listWorkflowsInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { listWorkflows } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(listWorkflowsInputShape).parse(args)

      // APIに渡すパラメータを構築
      const params: ListWorkflowsParams = {
        page: validatedParams.page,
        perPage: validatedParams.perPage,
        sortBy: validatedParams.sortBy,
        status: validatedParams.status as ListWorkflowsStatusItem[] | undefined, // Cast to enum array type
      }
      // Remove undefined keys
      Object.keys(params).forEach(
        (key) =>
          (params as Record<string, unknown>)[key] === undefined &&
          delete (params as Record<string, unknown>)[key],
      )

      const response: Workflow[] = await listWorkflows(params)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error listing workflows:', error)
      let errorMessage = 'ワークフロー一覧取得中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      // エラーを McpToolResult 形式で返す
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default listWorkflowsTool
