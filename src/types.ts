import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import { ZodRawShape } from 'zod'

export interface Tool {
  name: string
  description: string
  paramsSchema: ZodRawShape
  cb: ToolCallback<ZodRawShape>
}
