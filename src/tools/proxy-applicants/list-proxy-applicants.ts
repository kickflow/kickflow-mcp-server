import { McpTool, McpToolResult } from '../types.js' // McpToolResult をインポート
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListProxyApplicantsParams,
  ProxyApplicant,
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on ListProxyApplicantsParams
const listProxyApplicantsInputShape = {
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ番号（1から始まる）'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  // applicantUserId, proxyUserId, startAt, endAt, sortBy はスキーマにないので削除
}

const listProxyApplicantsTool: McpTool<typeof listProxyApplicantsInputShape> = {
  // 型引数を修正
  name: 'list_proxy_applicants',
  description:
    '代理申請の一覧を取得します。このAPIの実行には、ユーザーの管理権限が必要です。',
  inputSchema: listProxyApplicantsInputShape, // inputSchema を修正
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    // 戻り値の型を McpToolResult に修正
    try {
      const { listProxyApplicants } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z
        .object(listProxyApplicantsInputShape)
        .parse(args)

      // APIに渡すパラメータを構築 (スキーマに合わせて page と perPage のみ)
      const params: ListProxyApplicantsParams = {
        page: validatedParams.page,
        perPage: validatedParams.perPage,
      }
      // Remove undefined keys (念のため)
      Object.keys(params).forEach(
        (key) =>
          (params as Record<string, unknown>)[key] === undefined &&
          delete (params as Record<string, unknown>)[key],
      )

      // customAxiosInstance はデータを直接返すため、型を ProxyApplicant[] に修正
      const response: ProxyApplicant[] = await listProxyApplicants(params)

      // 結果を McpToolResult 形式に整形
      return {
        content: [
          {
            type: 'text',
            // response.data ではなく response を直接使用
            text: JSON.stringify(response, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error listing proxy applicants:', error)
      let errorMessage = '代理申請一覧取得中に不明なエラーが発生しました'
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

export default listProxyApplicantsTool
