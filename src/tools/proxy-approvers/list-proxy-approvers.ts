import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListProxyApproversParams,
  ProxyApprover,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on ListProxyApproversParams
const listProxyApproversInputShape = {
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ番号（1から始まる）'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
}

const listProxyApproversTool: McpTool<typeof listProxyApproversInputShape> = {
  name: 'list_proxy_approvers',
  description:
    '代理承認の一覧を取得します。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: listProxyApproversInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { listProxyApprovers } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(listProxyApproversInputShape).parse(args)

      // APIに渡すパラメータを構築
      const params: ListProxyApproversParams = {
        page: validatedParams.page,
        perPage: validatedParams.perPage,
      }
      // Remove undefined keys
      Object.keys(params).forEach(
        (key) =>
          (params as Record<string, unknown>)[key] === undefined &&
          delete (params as Record<string, unknown>)[key],
      )

      const response: ProxyApprover[] = await listProxyApprovers(params)

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
      console.error('Error listing proxy approvers:', error)
      let errorMessage = '代理承認一覧取得中に不明なエラーが発生しました'
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

export default listProxyApproversTool
