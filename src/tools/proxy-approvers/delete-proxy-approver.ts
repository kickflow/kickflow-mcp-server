import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const deleteProxyApproverInputShape = {
  proxyApproverId: z.string().uuid().describe('削除する代理承認のUUID'),
}

const deleteProxyApproverTool: McpTool<typeof deleteProxyApproverInputShape> = {
  name: 'delete_proxy_approver',
  description:
    '指定した代理承認を削除します。このAPIの実行には、ユーザーの管理権限が必要です（ただし、自分の代理承認の設定をすべてのユーザーに許可している場合は不要）。',
  inputSchema: deleteProxyApproverInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { deleteProxyApprover } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z
        .object(deleteProxyApproverInputShape)
        .parse(args)

      // APIを呼び出し (戻り値は void)
      await deleteProxyApprover(validatedParams.proxyApproverId)

      // 結果を McpToolResult 形式に整形 (成功メッセージ)
      return {
        content: [
          {
            type: 'text',
            text: `代理承認 (ID: ${validatedParams.proxyApproverId}) を削除しました。`,
          },
        ],
      }
    } catch (error) {
      console.error('Error deleting proxy approver:', error)
      let errorMessage = '代理承認削除中に不明なエラーが発生しました'
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

export default deleteProxyApproverTool
