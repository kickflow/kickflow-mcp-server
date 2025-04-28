import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const deleteProxyApplicantInputShape = {
  proxyApplicantId: z.string().uuid().describe('削除する代理申請のUUID'),
}

const deleteProxyApplicantTool: McpTool<typeof deleteProxyApplicantInputShape> =
  {
    name: 'delete_proxy_applicant',
    description:
      '指定した代理申請を削除します。このAPIの実行には、ユーザーの管理権限が必要です（ただし、自分の代理申請の設定をすべてのユーザーに許可している場合は不要）。',
    inputSchema: deleteProxyApplicantInputShape,
    async execute(args: Record<string, unknown>): Promise<McpToolResult> {
      try {
        const { deleteProxyApplicant } = getKickflowRESTAPIV1()
        // パラメータをバリデーション
        const validatedParams = z
          .object(deleteProxyApplicantInputShape)
          .parse(args)

        // APIを呼び出し (戻り値は void)
        await deleteProxyApplicant(validatedParams.proxyApplicantId)

        // 結果を McpToolResult 形式に整形 (成功メッセージ)
        return {
          content: [
            {
              type: 'text',
              text: `代理申請 (ID: ${validatedParams.proxyApplicantId}) を削除しました。`,
            },
          ],
        }
      } catch (error) {
        console.error('Error deleting proxy applicant:', error)
        let errorMessage = '代理申請削除中に不明なエラーが発生しました'
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

export default deleteProxyApplicantTool
