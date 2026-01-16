import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import pkg from '../package.json' with { type: 'json' }
import { RegisterTool } from './types.js'

import discoverApisTool from './kickflow-api/tools/discover-apis.js'
import getApiInfoTool from './kickflow-api/tools/get-api-info.js'
import callApiTool from './kickflow-api/tools/call-api.js'

export const tools: RegisterTool[] = [
  discoverApisTool,
  getApiInfoTool,
  callApiTool,
]

export function createServer(): McpServer {
  const server = new McpServer(
    {
      name: 'kickflow',
      version: pkg.version,
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    },
  )

  tools.forEach(({ name, description, inputSchema, callback }) => {
    server.registerTool(name, { description, inputSchema }, callback)
  })

  return server
}
