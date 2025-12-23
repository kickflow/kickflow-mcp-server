import { describe, it, expect } from 'vitest'
import { apiDefinitions } from '../../../src/kickflow-api/generated/api-definitions.js'
import discoverApisTool from '../../../src/kickflow-api/tools/discover-apis.js'

describe('discover-apis tool', () => {
  it('ツール名がdiscover_apisである', () => {
    expect(discoverApisTool.name).toBe('discover_apis')
  })

  it('callbackがOpenAPIスキーマと同じAPI一覧を返す', async () => {
    const result = await discoverApisTool.callback({})

    const text = (result.content[0] as { type: 'text'; text: string }).text

    const lines = text.split('\n')
    expect(lines.length).toBe(apiDefinitions.length)

    lines.forEach((line, index) => {
      expect(line).toBe(
        `${apiDefinitions[index].operationId}: ${apiDefinitions[index].summary}`,
      )
    })
  })
})
