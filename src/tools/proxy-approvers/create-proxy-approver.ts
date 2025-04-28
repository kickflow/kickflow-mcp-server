import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  CreateProxyApproverBody,
  ProxyApprover,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on CreateProxyApproverBody
const createProxyApproverInputShape = {
  userId: z.string().uuid().describe('代理されるユーザーID'),
  proxyUserId: z.string().uuid().describe('代理するユーザーID'),
  startsOn: z
    .string()
    .date()
    .optional()
    .nullable()
    .describe(
      '開始日 (YYYY-MM-DD形式)。nullの場合、すでに始まっているものとして扱います。',
    ),
  endsOn: z
    .string()
    .date()
    .optional()
    .nullable()
    .describe('終了日 (YYYY-MM-DD形式)。nullの場合、無期限として扱います。'),
  workflowIds: z
    .array(z.string().uuid())
    .optional()
    .describe('対象ワークフローのID配列'),
}

const createProxyApproverTool: McpTool<typeof createProxyApproverInputShape> = {
  name: 'create_proxy_approver',
  description:
    '代理承認を作成します。このAPIの実行には、ユーザーの管理権限が必要です（ただし、自分の代理承認の設定をすべてのユーザーに許可している場合は不要）。',
  inputSchema: createProxyApproverInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { createProxyApprover } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z
        .object(createProxyApproverInputShape)
        .parse(args)

      // APIに渡すパラメータを構築
      const body: CreateProxyApproverBody = {
        userId: validatedParams.userId,
        proxyUserId: validatedParams.proxyUserId,
        startsOn: validatedParams.startsOn,
        endsOn: validatedParams.endsOn,
        workflowIds: validatedParams.workflowIds,
      }
      // Remove undefined keys
      Object.keys(body).forEach(
        (key) =>
          (body as Record<string, unknown>)[key] === undefined &&
          delete (body as Record<string, unknown>)[key],
      )

      const response: ProxyApprover = await createProxyApprover(body)

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
      console.error('Error creating proxy approver:', error)
      let errorMessage = '代理承認作成中に不明なエラーが発生しました'
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

export default createProxyApproverTool
