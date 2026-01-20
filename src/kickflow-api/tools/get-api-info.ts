import { z } from 'zod'
import { RegisterTool } from '../../types.js'
import { findApiByOperationId } from '../generated/api-definitions.js'
import { findZodSchema } from '../schema-registry.js'
import { specialHandlers } from '../special-handlers.js'

const inputSchema = z.object({
  operationId: z.string().describe('詳細を取得するAPIのoperationId'),
})

const getApiInfoTool: RegisterTool = {
  name: 'get_api_info',
  description: `指定したoperationIdのAPI情報をJSON Schemaで取得します。call_apiを呼ぶ前に必要なパラメータを確認するために使用してください。`,
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

    const { operationId } = parsed.data
    const apiDef = findApiByOperationId(operationId)

    if (!apiDef) {
      return {
        content: [
          {
            type: 'text',
            text: `不明なoperationId: ${operationId}`,
          },
        ],
      }
    }

    const specialHandler = specialHandlers[operationId]
    if (specialHandler) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { body: z.toJSONSchema(specialHandler.schema) },
              null,
              2,
            ),
          },
        ],
      }
    }

    const { pathParams, queryParams, requestBody } = findZodSchema(operationId)
    const result: Record<string, unknown> = {}

    if (pathParams) {
      result.pathParams = z.toJSONSchema(pathParams)
    }

    if (queryParams) {
      result.queryParams = z.toJSONSchema(queryParams)
    }

    if (requestBody) {
      result.requestBody = z.toJSONSchema(requestBody)
    }

    if (Object.keys(result).length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `${operationId}: パラメータなし`,
          },
        ],
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  },
}

export default getApiInfoTool
