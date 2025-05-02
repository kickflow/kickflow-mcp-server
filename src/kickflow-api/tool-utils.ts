import { AxiosError } from 'axios'
import { z, ZodRawShape } from 'zod'
import { getKickflowRESTAPIV1 } from './generated/kickflowRESTAPIV1.js'
import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'

// API呼び出し関数の型定義
type ApiCallFunction<TParams extends ZodRawShape, TResponse> = (
  api: ReturnType<typeof getKickflowRESTAPIV1>,
  validatedArgs: z.infer<z.ZodObject<TParams>>,
) => Promise<TResponse>

/**
 * Kickflow APIを呼び出すToolのコールバック関数を生成する高階関数
 * @param schema Zodスキーマ (バリデーション用)
 * @param apiCall API呼び出しを実行する関数
 * @returns Toolのコールバック関数
 */
export function createApiToolCallback<TParams extends ZodRawShape, TResponse>(
  schema: z.ZodObject<TParams>,
  apiCall: ApiCallFunction<TParams, TResponse>,
): ToolCallback<ZodRawShape> {
  return async (args: unknown) => {
    // args に unknown 型を追加
    // Validate the arguments
    const { error, data: validatedArgs } = schema.safeParse(args)
    if (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Invalid arguments: ${error.message}`,
          },
        ],
      }
    }

    // Call the API
    const api = getKickflowRESTAPIV1()
    try {
      const response = await apiCall(api, validatedArgs)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response, null, 2),
          },
        ],
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred'
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      return {
        content: [
          {
            type: 'text',
            text: `API Error: ${errorMessage}`,
          },
        ],
      }
    }
  }
}
