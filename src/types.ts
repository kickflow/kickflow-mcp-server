import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { ZodRawShape } from 'zod'

export type RegisterToolCallback = (
  args: Record<string, unknown>,
) => Promise<CallToolResult>

export type RegisterTool = {
  name: string
  description?: string
  inputSchema?: ZodRawShape
  callback: RegisterToolCallback
}
