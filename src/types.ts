import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { ZodRawShape } from 'zod'

export interface Tool {
  name: string
  description: string
  paramsSchema: ZodRawShape
  cb: ToolCallback<ZodRawShape>
}

export type RegisterToolCallback = (
  args: Record<string, unknown>,
) => Promise<CallToolResult>

export type RegisterTool = {
  name: string
  description?: string
  inputSchema?: ZodRawShape
  callback: RegisterToolCallback
}
