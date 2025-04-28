import { McpTool, McpToolResult } from '../types.js'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import {
  ListRoutesParams,
  Route,
  ListRoutesStatusItem, // Import enum type
} from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'
import { z } from 'zod'

// Define the raw shape for the input schema based on ListRoutesParams
const listRoutesInputShape = {
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('ページ番号（1から始まる）'),
  perPage: z.number().int().min(1).optional().describe('1ページあたりの件数'),
  sortBy: z
    .enum(['createdAt', 'folderId'])
    .optional()
    .describe('ソート。ソート可能なフィールド: createdAt, folderId'),
  status: z
    .array(z.enum(['visible', 'error']))
    .optional()
    .describe('ステータス (visible, error)'),
  folderId: z.string().uuid().optional().describe('フォルダのUUID'),
}

const listRoutesTool: McpTool<typeof listRoutesInputShape> = {
  name: 'list_routes',
  description:
    '経路の一覧を取得します。ステータスやフォルダによる絞り込みが可能です。',
  inputSchema: listRoutesInputShape,
  async execute(args: Record<string, unknown>): Promise<McpToolResult> {
    try {
      const { listRoutes } = getKickflowRESTAPIV1()
      // パラメータをバリデーション
      const validatedParams = z.object(listRoutesInputShape).parse(args)

      // APIに渡すパラメータを構築
      const params: ListRoutesParams = {
        page: validatedParams.page,
        perPage: validatedParams.perPage,
        sortBy: validatedParams.sortBy,
        status: validatedParams.status as ListRoutesStatusItem[] | undefined, // Cast to enum array type
        folderId: validatedParams.folderId,
      }
      // Remove undefined keys
      Object.keys(params).forEach(
        (key) =>
          (params as Record<string, unknown>)[key] === undefined &&
          delete (params as Record<string, unknown>)[key],
      )

      const response: Route[] = await listRoutes(params)

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
      console.error('Error listing routes:', error)
      let errorMessage = '経路一覧取得中に不明なエラーが発生しました'
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

export default listRoutesTool
