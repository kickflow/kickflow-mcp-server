import { z, ZodObject, ZodType } from 'zod'
import {
  PathParamInfo,
  findApiByOperationId,
} from './generated/api-definitions.js'
import { allZodSchemas } from './generated/zod-schemas.js'

type ZodShape = Record<string, ZodType>
type ZodShapeObject = ZodObject<ZodShape>

export interface ZodSchemaSet {
  pathParams?: ZodShapeObject
  queryParams?: ZodShapeObject
  requestBody?: ZodShapeObject
}

export function findZodSchema(operationId: string): ZodSchemaSet {
  const queryParamsKey = `${operationId}QueryParams`
  const bodyKey = `${operationId}Body`

  let pathParams: ZodShapeObject | undefined
  let queryParams: ZodShapeObject | undefined
  let requestBody: ZodShapeObject | undefined

  const pathParamsSchema = buildPathParamsSchema(operationId)
  if (pathParamsSchema instanceof ZodObject) {
    pathParams = pathParamsSchema as ZodShapeObject
  }

  const queryParamsSchema = allZodSchemas[queryParamsKey]
  if (queryParamsSchema instanceof ZodObject) {
    queryParams = queryParamsSchema as ZodShapeObject
  }

  const bodySchema = allZodSchemas[bodyKey]
  if (bodySchema instanceof ZodObject) {
    requestBody = bodySchema as ZodShapeObject
  }

  return { pathParams, queryParams, requestBody }
}

function pathParamToZod(param: PathParamInfo): ZodType {
  let schema: ZodType = z.string()

  if (param.format === 'uuid') {
    schema = z.uuid()
  } else if (param.pattern) {
    schema = z.string().regex(new RegExp(param.pattern))
  }

  if (param.description) {
    schema = schema.describe(param.description)
  }

  return schema
}

function buildPathParamsSchema(
  operationId: string,
): ZodShapeObject | undefined {
  const apiDef = findApiByOperationId(operationId)

  if (apiDef === undefined || apiDef.pathParams.length === 0) {
    return undefined
  }

  const shape: ZodShape = {}
  for (const param of apiDef.pathParams) {
    shape[param.name] = pathParamToZod(param)
  }

  return z.object(shape)
}

export function buildCombinedSchema(operationId: string): ZodShapeObject {
  const { pathParams, queryParams, requestBody } = findZodSchema(operationId)

  const shapes: ZodShape[] = []

  if (pathParams) {
    shapes.push(pathParams.shape)
  }
  if (queryParams) {
    shapes.push(queryParams.shape)
  }
  if (requestBody) {
    shapes.push(requestBody.shape)
  }

  const combinedShape: ZodShape = {}
  for (const shape of shapes) {
    Object.assign(combinedShape, shape)
  }

  return z.object(combinedShape)
}
