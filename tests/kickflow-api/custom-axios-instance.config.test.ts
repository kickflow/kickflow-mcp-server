import { describe, it, expect, afterEach, vi } from 'vite-plus/test'
import MockAdapter from 'axios-mock-adapter'

async function loadModule() {
  vi.resetModules()
  return import('../../src/kickflow-api/custom-axios-instance.js')
}

describe('custom-axios-instance 環境変数による設定', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('未設定時はデフォルトのbaseURLとAuthorizationヘッダーを使用する', async () => {
    const { AXIOS_INSTANCE, setKickflowAccessToken } = await loadModule()
    const mock = new MockAdapter(AXIOS_INSTANCE)
    setKickflowAccessToken('tok')
    mock.onGet('/test').reply(200, {})

    await AXIOS_INSTANCE.get('/test')

    expect(AXIOS_INSTANCE.defaults.baseURL).toBe('https://api.kickflow.com')
    expect(mock.history.get[0].headers?.['Authorization']).toBe('Bearer tok')
    mock.restore()
  })

  it('KICKFLOW_API_BASE_URL で接続先を上書きできる', async () => {
    vi.stubEnv('KICKFLOW_API_BASE_URL', 'https://example.test')
    const { AXIOS_INSTANCE } = await loadModule()

    expect(AXIOS_INSTANCE.defaults.baseURL).toBe('https://example.test')
  })

  it('KICKFLOW_ACCESS_TOKEN_HEADER でトークンのヘッダー名を変更できる', async () => {
    vi.stubEnv('KICKFLOW_ACCESS_TOKEN_HEADER', 'X-Authorization')
    const { AXIOS_INSTANCE, setKickflowAccessToken } = await loadModule()
    const mock = new MockAdapter(AXIOS_INSTANCE)
    setKickflowAccessToken('tok')
    mock.onGet('/test').reply(200, {})

    await AXIOS_INSTANCE.get('/test')

    const headers = mock.history.get[0].headers
    expect(headers?.['X-Authorization']).toBe('Bearer tok')
    expect(headers?.['Authorization']).toBeUndefined()
    mock.restore()
  })

  it('KICKFLOW_API_HEADERS で追加ヘッダーを付与できる', async () => {
    vi.stubEnv('KICKFLOW_ACCESS_TOKEN_HEADER', 'X-Authorization')
    vi.stubEnv(
      'KICKFLOW_API_HEADERS',
      JSON.stringify({ Authorization: 'custom' }),
    )
    const { AXIOS_INSTANCE, setKickflowAccessToken } = await loadModule()
    const mock = new MockAdapter(AXIOS_INSTANCE)
    setKickflowAccessToken('tok')
    mock.onGet('/test').reply(200, {})

    await AXIOS_INSTANCE.get('/test')

    const headers = mock.history.get[0].headers
    expect(headers?.['Authorization']).toBe('custom')
    expect(headers?.['X-Authorization']).toBe('Bearer tok')
    mock.restore()
  })

  it('追加ヘッダーがアクセストークンのヘッダーを上書きしない', async () => {
    vi.stubEnv(
      'KICKFLOW_API_HEADERS',
      JSON.stringify({ Authorization: 'should-not-win' }),
    )
    const { AXIOS_INSTANCE, setKickflowAccessToken } = await loadModule()
    const mock = new MockAdapter(AXIOS_INSTANCE)
    setKickflowAccessToken('tok')
    mock.onGet('/test').reply(200, {})

    await AXIOS_INSTANCE.get('/test')

    const headers = mock.history.get[0].headers
    expect(headers?.['Authorization']).toBe('Bearer tok')
    mock.restore()
  })

  it('不正なJSONのKICKFLOW_API_HEADERSは無視される', async () => {
    vi.stubEnv('KICKFLOW_API_HEADERS', 'not-json')
    const { AXIOS_INSTANCE, setKickflowAccessToken } = await loadModule()
    const mock = new MockAdapter(AXIOS_INSTANCE)
    setKickflowAccessToken('tok')
    mock.onGet('/test').reply(200, {})

    await AXIOS_INSTANCE.get('/test')

    const headers = mock.history.get[0].headers
    expect(headers?.['Authorization']).toBe('Bearer tok')
    mock.restore()
  })
})
