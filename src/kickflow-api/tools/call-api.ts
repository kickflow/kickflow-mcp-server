import { z } from 'zod'
import { AxiosError } from 'axios'
import { RegisterTool } from '../../types.js'
import { getKickflowRESTAPIV1 } from '../generated/kickflowRESTAPIV1.js'
import { findApiByOperationId } from '../generated/api-definitions.js'
import { findZodSchema } from '../schema-registry.js'
import { specialHandlers, executeSpecialHandler } from '../special-handlers.js'

const inputSchema = z.object({
  operationId: z
    .string()
    .describe('実行するAPIのoperationId（discover_apisで確認可能）'),
  pathParams: z
    .record(z.string(), z.unknown())
    .optional()
    .describe('パスパラメータ（例: { "categoryId": "uuid" }）'),
  queryParams: z
    .record(z.string(), z.unknown())
    .optional()
    .describe('クエリパラメータ（例: { "page": 1, "perPage": 25 }）'),
  requestBody: z
    .record(z.string(), z.unknown())
    .optional()
    .describe('リクエストボディ（例: { "name": "カテゴリ名" }）'),
})

type ApiFunction = (...args: unknown[]) => Promise<unknown>

interface BuildApiArgumentsInput {
  operationId: string
  pathParams?: Record<string, unknown>
  queryParams?: Record<string, unknown>
  requestBody?: Record<string, unknown>
}

function buildApiArguments(input: BuildApiArgumentsInput): unknown[] {
  const { operationId, pathParams = {}, queryParams, requestBody } = input
  const args: unknown[] = []

  const apiDef = findApiByOperationId(operationId)
  if (apiDef) {
    for (const param of apiDef.pathParams) {
      args.push(pathParams[param.name])
    }
  }

  if (queryParams && Object.keys(queryParams).length > 0) {
    args.push(queryParams)
  }
  if (requestBody && Object.keys(requestBody).length > 0) {
    args.push(requestBody)
  }

  return args
}

function formatValidationErrors(category: string, error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.join('.')
    return `- ${category}.${path}: ${issue.message}`
  })
}

const callApiTool: RegisterTool = {
  name: 'call_api',
  description: `Kickflow APIを実行します。operationIdはdiscover_apisで確認できます。パラメータ仕様はget_api_infoで確認できます。pathParams、queryParams、requestBodyをそれぞれ個別に指定してください。`,
  inputSchema: inputSchema.shape,
  callback: async (args) => {
    const parsed = inputSchema.safeParse(args)
    if (!parsed.success) {
      return {
        content: [
          { type: 'text', text: `Invalid arguments: ${parsed.error.message}` },
        ],
      }
    }

    const {
      operationId,
      pathParams = {},
      queryParams,
      requestBody,
    } = parsed.data

    const apiDef = findApiByOperationId(operationId)
    if (!apiDef) {
      return {
        content: [
          {
            type: 'text',
            text: `不明なoperationId: ${operationId}\ndiscover_apisツールで利用可能なAPIを確認してください。`,
          },
        ],
      }
    }

    if (specialHandlers[operationId]) {
      const result = await executeSpecialHandler(operationId, requestBody ?? {})
      if (result.success) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result.data, null, 2),
            },
          ],
        }
      } else {
        return {
          content: [
            {
              type: 'text',
              text: result.error,
            },
          ],
        }
      }
    }

    const schemas = findZodSchema(operationId)
    const validationErrors: string[] = []
    let validatedPathParams: Record<string, unknown> = {}
    let validatedQueryParams: Record<string, unknown> | undefined
    let validatedRequestBody: Record<string, unknown> | undefined

    if (schemas.pathParams) {
      const result = schemas.pathParams.safeParse(pathParams)
      if (!result.success) {
        validationErrors.push(
          ...formatValidationErrors('pathParams', result.error),
        )
      } else {
        validatedPathParams = result.data
      }
    }

    if (schemas.queryParams) {
      const result = schemas.queryParams.safeParse(queryParams ?? {})
      if (!result.success) {
        validationErrors.push(
          ...formatValidationErrors('queryParams', result.error),
        )
      } else {
        validatedQueryParams = result.data
      }
    } else if (queryParams) {
      validatedQueryParams = queryParams
    }

    if (schemas.requestBody) {
      const result = schemas.requestBody.safeParse(requestBody ?? {})
      if (!result.success) {
        validationErrors.push(
          ...formatValidationErrors('requestBody', result.error),
        )
      } else {
        validatedRequestBody = result.data
      }
    } else if (requestBody) {
      validatedRequestBody = requestBody
    }

    if (validationErrors.length > 0) {
      return {
        content: [
          {
            type: 'text',
            text: `パラメータ検証エラー:\n${validationErrors.join('\n')}\n\nget_api_infoツールでパラメータ仕様を確認してください。`,
          },
        ],
      }
    }

    const api = getKickflowRESTAPIV1()
    const apiMethod = api[operationId as keyof typeof api] as
      | ApiFunction
      | undefined

    if (!apiMethod) {
      return {
        content: [
          {
            type: 'text',
            text: `APIメソッドが見つかりません: ${operationId}`,
          },
        ],
      }
    }

    try {
      const apiArgs = buildApiArguments({
        operationId,
        pathParams: validatedPathParams,
        queryParams: validatedQueryParams,
        requestBody: validatedRequestBody,
      })
      const response = await apiMethod.call(api, ...apiArgs)
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
  },
}

export default callApiTool
