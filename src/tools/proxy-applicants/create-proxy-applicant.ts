import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  CreateProxyApplicantBody,
  ProxyApplicant,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on CreateProxyApplicantBody
const createProxyApplicantInputShape = {
  userId: z.string().uuid().describe('代理されるユーザーID'),
  proxyUserId: z.string().uuid().describe('代理するユーザーID'),
  startsOn: z
    .string()
    .date()
    .optional()
    .nullable()
    .describe(
      '開始日 (YYYY-MM-DD形式)。nullの場合、すでに開始しているものとして扱います。',
    ),
  endsOn: z
    .string()
    .date()
    .optional()
    .nullable()
    .describe(
      '終了日 (YYYY-MM-DD形式)。nullの場合、無期限のものとして扱います。',
    ),
  workflowIds: z
    .array(z.string().uuid())
    .optional()
    .describe('対象ワークフローのID配列'),
}

const createProxyApplicantTool: McpTool<typeof createProxyApplicantInputShape> =
  {
    name: 'create_proxy_applicant',
    description:
      '代理申請を作成します。このAPIの実行には、ユーザーの管理権限が必要です（ただし、自分の代理申請の設定をすべてのユーザーに許可している場合は不要）。',
    inputSchema: createProxyApplicantInputShape,
    async execute(args: Record<string, unknown>): Promise<McpToolResult> {
      try {
        const { createProxyApplicant } = getKickflowRESTAPIV1()
        // パラメータをバリデーション
        const validatedParams = z
          .object(createProxyApplicantInputShape)
          .parse(args)

        // APIに渡すパラメータを構築
        const body: CreateProxyApplicantBody = {
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

        const response: ProxyApplicant = await createProxyApplicant(body)

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
        console.error('Error creating proxy applicant:', error)
        let errorMessage = '代理申請作成中に不明なエラーが発生しました'
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

export default createProxyApplicantTool
