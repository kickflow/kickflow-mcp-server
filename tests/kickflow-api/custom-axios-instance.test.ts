import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import {
  AXIOS_INSTANCE,
  setKickflowAccessToken,
  customAxiosInstance,
} from '../../src/kickflow-api/custom-axios-instance.js'

describe('custom-axios-instance', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(AXIOS_INSTANCE)
  })

  afterEach(() => {
    mock.reset()
  })

  describe('AXIOS_INSTANCE', () => {
    it('baseURLがhttps://api.kickflow.comに設定されている', () => {
      expect(AXIOS_INSTANCE.defaults.baseURL).toBe('https://api.kickflow.com')
    })

    it('Content-Typeヘッダーがapplication/jsonに設定されている', () => {
      expect(AXIOS_INSTANCE.defaults.headers['Content-Type']).toBe(
        'application/json',
      )
    })
  })

  describe('setKickflowAccessToken', () => {
    it('アクセストークンを設定するとAuthorizationヘッダーに反映される', async () => {
      setKickflowAccessToken('test-token-123')
      mock.onGet('/test').reply(200, { success: true })

      await AXIOS_INSTANCE.get('/test')

      const requestHeaders = mock.history.get[0].headers
      expect(requestHeaders?.['Authorization']).toBe('Bearer test-token-123')
    })

    it('トークンを更新すると新しいトークンが使用される', async () => {
      setKickflowAccessToken('old-token')
      setKickflowAccessToken('new-token')
      mock.onGet('/test').reply(200, { success: true })

      await AXIOS_INSTANCE.get('/test')

      const requestHeaders = mock.history.get[0].headers
      expect(requestHeaders?.['Authorization']).toBe('Bearer new-token')
    })
  })

  describe('customAxiosInstance', () => {
    beforeEach(() => {
      setKickflowAccessToken('custom-instance-token')
    })

    it('設定されたconfigでリクエストを実行する', async () => {
      mock.onGet('/api/users').reply(200, { users: [] })

      const result = await customAxiosInstance({
        method: 'get',
        url: '/api/users',
      })

      expect(result).toEqual({ users: [] })
      expect(mock.history.get).toHaveLength(1)
    })

    it('POSTリクエストでボディを送信できる', async () => {
      mock.onPost('/api/users').reply(201, { id: '1', name: 'Test User' })

      const result = await customAxiosInstance({
        method: 'post',
        url: '/api/users',
        data: { name: 'Test User', email: 'test@example.com' },
      })

      expect(result).toEqual({ id: '1', name: 'Test User' })
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ name: 'Test User', email: 'test@example.com' }),
      )
    })

    it('追加のoptionsを渡せる', async () => {
      mock.onGet('/api/data').reply(200, { data: 'value' })

      await customAxiosInstance(
        { method: 'get', url: '/api/data' },
        { timeout: 5000 },
      )

      expect(mock.history.get[0].timeout).toBe(5000)
    })

    it('レスポンスのdataのみを返す', async () => {
      mock.onGet('/api/resource').reply(200, {
        id: 'resource-1',
        attributes: { key: 'value' },
      })

      const result = await customAxiosInstance<{
        id: string
        attributes: { key: string }
      }>({ method: 'get', url: '/api/resource' })

      expect(result).toEqual({
        id: 'resource-1',
        attributes: { key: 'value' },
      })
    })

    it('cancelプロパティが付与される', () => {
      mock.onGet('/api/long-request').reply(200, {})

      const promise = customAxiosInstance({
        method: 'get',
        url: '/api/long-request',
      })

      expect(promise).toHaveProperty('cancel')
      expect(typeof (promise as unknown as { cancel: () => void }).cancel).toBe(
        'function',
      )
    })

    it('エラー時はPromiseがrejectされる', async () => {
      mock.onGet('/api/error').reply(500, { message: 'Internal Server Error' })

      await expect(
        customAxiosInstance({ method: 'get', url: '/api/error' }),
      ).rejects.toThrow()
    })

    it('Authorizationヘッダーが正しく設定される', async () => {
      mock.onGet('/api/protected').reply(200, { protected: true })

      await customAxiosInstance({ method: 'get', url: '/api/protected' })

      const requestHeaders = mock.history.get[0].headers
      expect(requestHeaders?.['Authorization']).toBe(
        'Bearer custom-instance-token',
      )
    })
  })
})
