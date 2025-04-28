import { ZodRawShape } from 'zod' // Remove ZodObject import

export interface McpContentItem {
  [key: string]: unknown // Add index signature
  type: 'text'
  text: string
}

export interface McpToolResult {
  [key: string]: unknown // Add index signature
  content: McpContentItem[]
  isError?: boolean
}

export interface McpTool<T extends ZodRawShape = ZodRawShape> {
  name: string
  description: string
  inputSchema: T
  execute: (params: Record<string, unknown>) => Promise<any> // Change return type to Promise<any> temporarily
}
