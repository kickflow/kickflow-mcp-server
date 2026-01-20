import { z } from 'zod'
import * as fs from 'fs'
import * as path from 'path'
import { AxiosError } from 'axios'
import { getKickflowRESTAPIV1 } from './generated/kickflowRESTAPIV1.js'

type KickflowApi = ReturnType<typeof getKickflowRESTAPIV1>

export type SpecialHandler = {
  schema: z.ZodObject<z.ZodRawShape>
  handler: (
    api: KickflowApi,
    params: Record<string, unknown>,
  ) => Promise<unknown>
}

export const specialHandlers: Record<string, SpecialHandler> = {
  uploadFile: {
    schema: z.object({
      filePath: z.string().describe('アップロードするファイルのローカルパス'),
      contentType: z
        .string()
        .optional()
        .describe('Content-Type（省略可能、未指定の場合は自動判定）'),
    }),
    handler: async (api, params) => {
      const filePath = params.filePath as string
      const resolvedPath = path.resolve(filePath)

      if (!fs.existsSync(resolvedPath)) {
        throw new Error(`File not found: ${resolvedPath}`)
      }

      const allowedBaseDir = fs.realpathSync(process.cwd())
      const realPath = fs.realpathSync(resolvedPath)
      if (!realPath.startsWith(allowedBaseDir + path.sep)) {
        throw new Error(
          `Access denied: file path must be within ${allowedBaseDir}`,
        )
      }

      const filename = path.basename(resolvedPath)
      const contentType =
        (params.contentType as string) || 'application/octet-stream'

      const binaryData = fs.readFileSync(resolvedPath)
      const blob = new Blob([binaryData], { type: contentType })
      const file = new File([blob], filename, { type: contentType })

      return api.uploadFile({ file })
    },
  },
}

export async function executeSpecialHandler(
  operationId: string,
  params: Record<string, unknown>,
): Promise<
  { success: true; data: unknown } | { success: false; error: string }
> {
  const handler = specialHandlers[operationId]
  if (!handler) {
    return { success: false, error: `No special handler for: ${operationId}` }
  }

  const validated = handler.schema.safeParse(params)
  if (!validated.success) {
    const errors = validated.error.issues.map((issue) => {
      const path = issue.path.join('.')
      return `- ${path}: ${issue.message}`
    })
    return {
      success: false,
      error: `パラメータ検証エラー:\n${errors.join('\n')}\n\nget_api_infoツールでパラメータ仕様を確認してください。`,
    }
  }

  const api = getKickflowRESTAPIV1()
  try {
    const response = await handler.handler(api, validated.data)
    return { success: true, data: response }
  } catch (error) {
    let errorMessage = 'An unknown error occurred'
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message
    } else if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: `API Error: ${errorMessage}` }
  }
}
