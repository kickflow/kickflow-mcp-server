import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createServer } from '../src/server'
import { getKickflowRESTAPIV1 } from '../src/kickflow-api/generated/kickflowRESTAPIV1'

const schemaFunctionNames = Object.keys(getKickflowRESTAPIV1())

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

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

  it('スキーマの全API関数に対応するtoolが存在する', async () => {
    const result = await client.listTools()
    const toolNames = result.tools.map(({ name }) => name)

    const missingTools: string[] = []

    for (const schemaFn of schemaFunctionNames) {
      const expectedToolName = camelToSnake(schemaFn)
      if (!toolNames.includes(expectedToolName)) {
        missingTools.push(`${schemaFn} → ${expectedToolName}`)
      }
    }

    expect(
      missingTools,
      `以下のスキーマ関数に対応するtoolが見つかりません:\n${missingTools.join('\n')}`,
    ).toHaveLength(0)
  })

  it('実装されているtoolはすべてスキーマに定義がある', async () => {
    const result = await client.listTools()
    const toolNames = result.tools.map(({ name }) => name)

    const extraTools: string[] = []

    for (const toolName of toolNames) {
      const expectedSchemaFn = snakeToCamel(toolName)
      if (!schemaFunctionNames.includes(expectedSchemaFn)) {
        extraTools.push(`${toolName} → ${expectedSchemaFn}`)
      }
    }

    expect(
      extraTools,
      `以下のtoolに対応するスキーマ関数が見つかりません:\n${extraTools.join('\n')}`,
    ).toHaveLength(0)
  })
})
