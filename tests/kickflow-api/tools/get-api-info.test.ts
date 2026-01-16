import { describe, it, expect, vi, beforeEach } from 'vitest'

import getApiInfoTool from '../../../src/kickflow-api/tools/get-api-info.js'

describe('get-api-info tool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ツール名がget_api_infoである', () => {
    expect(getApiInfoTool.name).toBe('get_api_info')
  })

  describe('callback', () => {
    it('引数が無効な場合はエラーを返す', async () => {
      const result = await getApiInfoTool.callback({})

      const text = (result.content[0] as { type: 'text'; text: string }).text
      expect(text).toContain('Invalid arguments')
    })

    it('存在しないoperationIdの場合はエラーを返す', async () => {
      const result = await getApiInfoTool.callback({
        operationId: 'nonExistentOperation',
      })

      const text = (result.content[0] as { type: 'text'; text: string }).text
      expect(text).toContain('不明なoperationId')
    })

    it('存在するoperationIdで入力パラメータがない場合はパラメータなしを返す', async () => {
      const result = await getApiInfoTool.callback({
        operationId: 'getCurrentUser',
      })

      const text = (result.content[0] as { type: 'text'; text: string }).text
      expect(text).toContain('パラメータなし')
    })

    it('存在するoperationIdでPathParamsが必要な場合はpathParamsを含むJSON Schemaを返す', async () => {
      const result = await getApiInfoTool.callback({
        operationId: 'deleteUser',
      })

      const text = (result.content[0] as { type: 'text'; text: string }).text
      const parsed = JSON.parse(text)
      expect(parsed).toHaveProperty('pathParams')
    })

    it('存在するoperationIdでqueryParamsが必要な場合はqueryParamsを含むJSON Schemaを返す', async () => {
      const result = await getApiInfoTool.callback({
        operationId: 'listCategories',
      })

      const text = (result.content[0] as { type: 'text'; text: string }).text
      const parsed = JSON.parse(text)
      expect(parsed).toHaveProperty('queryParams')
    })

    it('存在するoperationIdでrequestBodyが必要な場合はrequestBodyを含むJSON Schemaを返す', async () => {
      const result = await getApiInfoTool.callback({
        operationId: 'createUser',
      })

      const text = (result.content[0] as { type: 'text'; text: string }).text
      const parsed = JSON.parse(text)
      expect(parsed).toHaveProperty('requestBody')
    })

    it('special handlerを持つoperationIdの場合はそのスキーマを返す', async () => {
      const result = await getApiInfoTool.callback({
        operationId: 'uploadFile',
      })

      const text = (result.content[0] as { type: 'text'; text: string }).text
      const parsed = JSON.parse(text)
      expect(parsed).toHaveProperty('body')
      expect(parsed.body).toHaveProperty('properties')
      expect(parsed.body.properties).toHaveProperty('filePath')
    })
  })
})
