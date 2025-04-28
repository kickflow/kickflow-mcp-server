import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import { RouteDetail } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on path param
const getRouteInputShape = {
  routeId: z.string().uuid().describe('取得する経路のUUID'),
}

const getRouteTool: McpTool<typeof getRouteInputShape> = {
  name: 'get_route',
  description: '指定した経路を取得します。',
  inputSchema: getRouteInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { getRoute } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(getRouteInputShape).parse(args)

      // APIを呼び出し
      const response: RouteDetail = await getRoute(validatedParams.routeId)

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
      console.error('Error getting route:', error)
      let errorMessage = '経路取得中に不明なエラーが発生しました'
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

export default getRouteTool
