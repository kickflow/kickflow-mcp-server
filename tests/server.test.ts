import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createServer } from '../src/server'

describe('MCP Server', () => {
  let client: Client
  let server: McpServer
  let clientTransport: InMemoryTransport
  let serverTransport: InMemoryTransport

  beforeAll(async () => {
    server = createServer()
    ;[clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

    client = new Client(
      { name: 'test-client', version: '1.0.0' },
      { capabilities: {} },
    )

    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport),
    ])
  })

  afterAll(async () => {
    await Promise.allSettled([client.close(), server.close()])
  })

  it('サーバーに接続でき、サーバー情報を取得できる', () => {
    const serverVersion = client.getServerVersion()
    expect(serverVersion?.name).toBe('kickflow')
    expect(serverVersion?.version).toBeDefined()
  })

  it('discover_apis, get_api_info, call_api, のツールが登録されている', async () => {
    const result = await client.listTools()
    const toolNames = result.tools.map(({ name }) => name)

    expect(toolNames).toContain('discover_apis')
    expect(toolNames).toContain('call_api')
    expect(toolNames).toContain('get_api_info')
  })
})
