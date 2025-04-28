import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { WorkflowDetail } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const getWorkflowInputShape = {
  workflowId: z.string().uuid().describe('取得するワークフローのUUID'),
}

const getWorkflowTool: McpTool<typeof getWorkflowInputShape> = {
  name: 'get_workflow',
  description: '指定したIDのワークフローを取得します。',
  inputSchema: getWorkflowInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { getWorkflow } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(getWorkflowInputShape).parse(args)

      // APIを呼び出し
      const response: WorkflowDetail = await getWorkflow(
        validatedParams.workflowId,
      )

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
      console.error('Error getting workflow:', error)
      let errorMessage = 'ワークフロー取得中に不明なエラーが発生しました'
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

export default getWorkflowTool
