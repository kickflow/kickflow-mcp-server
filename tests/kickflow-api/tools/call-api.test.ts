import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AxiosError, AxiosHeaders } from 'axios'

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}))

const mockApiMethod = vi.fn()

vi.mock('../../../src/kickflow-api/generated/kickflowRESTAPIV1.js', () => ({
  getKickflowRESTAPIV1: vi.fn(
    () =>
      new Proxy(
        {},
        {
          get: () => mockApiMethod,
        },
      ),
  ),
}))

import * as fs from 'fs'
import callApiTool from '../../../src/kickflow-api/tools/call-api.js'

describe('call-api tool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ツール名がcall_apiである', () => {
    expect(callApiTool.name).toBe('call_api')
  })

  describe('callback', () => {
    describe('引数バリデーション', () => {
      it('引数が空オブジェクトの場合はエラーを返す', async () => {
        const result = await callApiTool.callback({})

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('Invalid arguments')
      })

      it('operationIdが文字列でない場合はエラーを返す', async () => {
        const result = await callApiTool.callback({ operationId: 123 })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('Invalid arguments')
      })
    })

    describe('operationIdの検証', () => {
      it('存在しないoperationIdの場合はエラーを返す', async () => {
        const result = await callApiTool.callback({
          operationId: 'nonExistentOperation',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('不明なoperationId')
        expect(text).toContain('nonExistentOperation')
        expect(text).toContain('discover_apis')
      })

      it('有効なoperationIdの場合はAPIを呼び出す', async () => {
        mockApiMethod.mockResolvedValue({ categories: [] })

        const result = await callApiTool.callback({
          operationId: 'listCategories',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(JSON.parse(text)).toEqual({ categories: [] })
      })
    })

    describe('スペシャルハンドラー', () => {
      describe('uploadFile', () => {
        it('スペシャルハンドラーで処理される', async () => {
          const mockFileContent = Buffer.from('file content')
          vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)
          mockApiMethod.mockResolvedValue({ signedId: 'abc123' })

          const result = await callApiTool.callback({
            operationId: 'uploadFile',
            requestBody: { filePath: '/path/to/file.pdf' },
          })

          expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/file.pdf')
          const text = (result.content[0] as { type: 'text'; text: string })
            .text
          expect(text).toContain('signedId')
          expect(text).toContain('abc123')
        })

        it('filePathがない場合はエラーを返す', async () => {
          const result = await callApiTool.callback({
            operationId: 'uploadFile',
            requestBody: {},
          })

          const text = (result.content[0] as { type: 'text'; text: string })
            .text
          expect(text).toContain('パラメータ検証エラー')
        })

        it('ファイル読み込みエラーの場合はエラーを返す', async () => {
          vi.mocked(fs.readFileSync).mockImplementation(() => {
            throw new Error('ENOENT: no such file')
          })

          const result = await callApiTool.callback({
            operationId: 'uploadFile',
            requestBody: { filePath: '/invalid/path' },
          })

          const text = (result.content[0] as { type: 'text'; text: string })
            .text
          expect(text).toContain('ENOENT')
        })
      })
    })

    describe('パラメータ検証', () => {
      it('uuid形式のパスパラメータに無効な値を渡すとエラー', async () => {
        const result = await callApiTool.callback({
          operationId: 'ge' + 'tTicket',
          pathParams: { ticketId: 'invalid-uuid' },
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('パラメータ検証エラー')
        expect(text).toContain('get_api_info')
      })

      it('uuid形式のパスパラメータに有効な値を渡すと成功', async () => {
        mockApiMethod.mockResolvedValue({
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Test Ticket',
        })

        const result = await callApiTool.callback({
          operationId: 'getTicket',
          pathParams: { ticketId: '550e8400-e29b-41d4-a716-446655440000' },
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        const parsed = JSON.parse(text)
        expect(parsed.id).toBe('550e8400-e29b-41d4-a716-446655440000')
      })

      it('pattern制約のあるパスパラメータに無効な値を渡すとエラー', async () => {
        const result = await callApiTool.callback({
          operationId: 'getFolder',
          pathParams: { folderId: 'invalid folder!' },
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('パラメータ検証エラー')
      })

      it('pattern制約のあるパスパラメータに有効な値を渡すと成功', async () => {
        mockApiMethod.mockResolvedValue({
          id: 'valid-folder_123',
          name: 'Test Folder',
        })

        const result = await callApiTool.callback({
          operationId: 'getFolder',
          pathParams: { folderId: 'valid-folder_123' },
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        const parsed = JSON.parse(text)
        expect(parsed.id).toBe('valid-folder_123')
      })
    })

    describe('API呼び出し', () => {
      it('パラメータなしのAPIを正しく呼び出せる', async () => {
        mockApiMethod.mockResolvedValue({
          categories: [{ id: '1', name: 'Test' }],
        })

        const result = await callApiTool.callback({
          operationId: 'listCategories',
        })

        expect(mockApiMethod).toHaveBeenCalled()
        const text = (result.content[0] as { type: 'text'; text: string }).text
        const parsed = JSON.parse(text)
        expect(parsed.categories).toHaveLength(1)
      })

      it('クエリパラメータ付きのAPIを正しく呼び出せる', async () => {
        mockApiMethod.mockResolvedValue({ tickets: [] })

        await callApiTool.callback({
          operationId: 'listTickets',
          queryParams: { page: 1, perPage: 10 },
        })

        expect(mockApiMethod).toHaveBeenCalledWith({ page: 1, perPage: 10 })
      })

      it('パスパラメータとクエリパラメータの両方を渡せる', async () => {
        mockApiMethod.mockResolvedValue({ teams: [] })

        await callApiTool.callback({
          operationId: 'listTeams',
          pathParams: {
            organizationChartId: '550e8400-e29b-41d4-a716-446655440000',
          },
          queryParams: {
            page: 1,
          },
        })

        expect(mockApiMethod).toHaveBeenCalledWith(
          '550e8400-e29b-41d4-a716-446655440000',
          expect.objectContaining({ page: 1 }),
        )
      })

      it('パラメータが省略された場合でも正しく動作する', async () => {
        mockApiMethod.mockResolvedValue({ user: { id: '1' } })

        const result = await callApiTool.callback({
          operationId: 'getCurrentUser',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(JSON.parse(text)).toEqual({ user: { id: '1' } })
      })
    })

    describe('エラーハンドリング', () => {
      it('AxiosErrorでresponse.data.messageがある場合はそれを返す', async () => {
        const axiosError = new AxiosError('Request failed')
        axiosError.response = {
          data: { message: 'Unauthorized' },
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: { headers: new AxiosHeaders() },
        }
        mockApiMethod.mockRejectedValue(axiosError)

        const result = await callApiTool.callback({
          operationId: 'listCategories',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('API Error: Unauthorized')
      })

      it('AxiosErrorでresponse.data.messageがない場合はerror.messageを返す', async () => {
        const axiosError = new AxiosError('Network Error')
        axiosError.response = {
          data: {},
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
          config: { headers: new AxiosHeaders() },
        }
        mockApiMethod.mockRejectedValue(axiosError)

        const result = await callApiTool.callback({
          operationId: 'listCategories',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('API Error: Network Error')
      })

      it('通常のError発生時はエラーメッセージを返す', async () => {
        mockApiMethod.mockRejectedValue(new Error('Something went wrong'))

        const result = await callApiTool.callback({
          operationId: 'listCategories',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('API Error: Something went wrong')
      })

      it('未知のエラー発生時はデフォルトエラーメッセージを返す', async () => {
        mockApiMethod.mockRejectedValue('unknown error')

        const result = await callApiTool.callback({
          operationId: 'listCategories',
        })

        const text = (result.content[0] as { type: 'text'; text: string }).text
        expect(text).toContain('An unknown error occurred')
      })
    })
  })
})
