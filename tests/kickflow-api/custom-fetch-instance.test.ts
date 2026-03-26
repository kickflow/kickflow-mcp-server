import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  setKickflowAccessToken,
  customFetchInstance,
  FetchError,
} from '../../src/kickflow-api/custom-fetch-instance.js'

const fetchSpy = vi.spyOn(globalThis, 'fetch')

function mockFetchResponse(
  body: unknown,
  init?: { status?: number; headers?: Record<string, string> },
) {
  const status = init?.status ?? 200
  const responseHeaders = new Headers({
    'content-type': 'application/json',
    ...init?.headers,
  })
  fetchSpy.mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      headers: responseHeaders,
    }),
  )
}

describe('custom-fetch-instance', () => {
  beforeEach(() => {
    fetchSpy.mockReset()
  })

  afterEach(() => {
    fetchSpy.mockReset()
  })

  describe('setKickflowAccessToken', () => {
    it('アクセストークンを設定するとAuthorizationヘッダーに反映される', async () => {
      setKickflowAccessToken('test-token-123')
      mockFetchResponse({ success: true })

      await customFetchInstance('/test', { method: 'GET' })

      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      const headers = new Headers(requestInit.headers)
      expect(headers.get('Authorization')).toBe('Bearer test-token-123')
    })

    it('トークンを更新すると新しいトークンが使用される', async () => {
      setKickflowAccessToken('old-token')
      setKickflowAccessToken('new-token')
      mockFetchResponse({ success: true })

      await customFetchInstance('/test', { method: 'GET' })

      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      const headers = new Headers(requestInit.headers)
      expect(headers.get('Authorization')).toBe('Bearer new-token')
    })
  })

  describe('customFetchInstance', () => {
    beforeEach(() => {
      setKickflowAccessToken('custom-instance-token')
    })

    it('設定されたconfigでリクエストを実行する', async () => {
      mockFetchResponse({ users: [] })

      const result = await customFetchInstance<{
        data: { users: unknown[] }
        status: number
      }>('/api/users', { method: 'GET' })

      expect(result.data).toEqual({ users: [] })
      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy.mock.calls[0][0]).toBe(
        'https://api.kickflow.com/api/users',
      )
    })

    it('POSTリクエストでボディを送信できる', async () => {
      mockFetchResponse({ id: '1', name: 'Test User' })

      const result = await customFetchInstance<{
        data: { id: string; name: string }
        status: number
      }>('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
        }),
      })

      expect(result.data).toEqual({ id: '1', name: 'Test User' })
      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      expect(requestInit.body).toBe(
        JSON.stringify({ name: 'Test User', email: 'test@example.com' }),
      )
    })

    it('レスポンスのdataのみを返す', async () => {
      mockFetchResponse({
        id: 'resource-1',
        attributes: { key: 'value' },
      })

      const result = await customFetchInstance<{
        data: { id: string; attributes: { key: string } }
        status: number
      }>('/api/resource', { method: 'GET' })

      expect(result.data).toEqual({
        id: 'resource-1',
        attributes: { key: 'value' },
      })
    })

    it('エラー時はFetchErrorがthrowされる', async () => {
      mockFetchResponse({ message: 'Internal Server Error' }, { status: 500 })

      await expect(
        customFetchInstance('/api/error', { method: 'GET' }),
      ).rejects.toThrow(FetchError)
    })

    it('エラー時のFetchErrorにstatusとdataが含まれる', async () => {
      mockFetchResponse({ message: 'Not Found' }, { status: 404 })

      const error = await customFetchInstance('/api/error', {
        method: 'GET',
      }).catch((e: unknown) => e)

      expect(error).toBeInstanceOf(FetchError)
      expect((error as FetchError).status).toBe(404)
      expect((error as FetchError).data).toEqual({ message: 'Not Found' })
      expect((error as FetchError).message).toBe('Not Found')
    })

    it('Authorizationヘッダーが正しく設定される', async () => {
      mockFetchResponse({ protected: true })

      await customFetchInstance('/api/protected', { method: 'GET' })

      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      const headers = new Headers(requestInit.headers)
      expect(headers.get('Authorization')).toBe('Bearer custom-instance-token')
    })

    it('Content-Typeがデフォルトでapplication/jsonに設定される', async () => {
      mockFetchResponse({ data: 'test' })

      await customFetchInstance('/api/test', { method: 'GET' })

      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      const headers = new Headers(requestInit.headers)
      expect(headers.get('Content-Type')).toBe('application/json')
    })

    it('FormDataの場合はContent-Typeが設定されない', async () => {
      mockFetchResponse({ signedId: 'abc' })

      const formData = new FormData()
      formData.append('file', new Blob(['test']), 'test.txt')

      await customFetchInstance('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      const headers = new Headers(requestInit.headers)
      expect(headers.get('Content-Type')).toBeNull()
    })

    it('FormDataの場合は既存のContent-Typeヘッダーが削除される', async () => {
      mockFetchResponse({ signedId: 'abc' })

      const formData = new FormData()
      formData.append('file', new Blob(['test']), 'test.txt')

      await customFetchInstance('/api/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const requestInit = fetchSpy.mock.calls[0][1] as RequestInit
      const headers = new Headers(requestInit.headers)
      expect(headers.get('Content-Type')).toBeNull()
    })
  })
})
