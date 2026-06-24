import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// Kickflow APIのベースURL（環境変数で上書き可能。未指定時は本番環境）
const KICKFLOW_API_BASE_URL =
  process.env.KICKFLOW_API_BASE_URL ?? 'https://api.kickflow.com'

// アクセストークンを送信するヘッダー名（未指定時は Authorization）
const KICKFLOW_ACCESS_TOKEN_HEADER =
  process.env.KICKFLOW_ACCESS_TOKEN_HEADER ?? 'Authorization'

// 全リクエストに付与する追加ヘッダー（JSON形式の文字列で指定）
function parseAdditionalHeaders(): Record<string, string> {
  const raw = process.env.KICKFLOW_API_HEADERS
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, string>
    }
    console.warn('KICKFLOW_API_HEADERS must be a JSON object. Ignoring it.')
  } catch {
    console.warn('KICKFLOW_API_HEADERS is not valid JSON. Ignoring it.')
  }
  return {}
}

const KICKFLOW_API_HEADERS = parseAdditionalHeaders()

// アクセストークンを保持する変数
let accessToken: string | null = null

// アクセストークンを設定する関数
export function setKickflowAccessToken(token: string): void {
  accessToken = token
}

// Axiosインスタンスの作成
export const AXIOS_INSTANCE = Axios.create({
  baseURL: KICKFLOW_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプターで追加ヘッダーと認証ヘッダーを設定
AXIOS_INSTANCE.interceptors.request.use((config) => {
  for (const [key, value] of Object.entries(KICKFLOW_API_HEADERS)) {
    config.headers[key] = value
  }
  if (accessToken) {
    config.headers[KICKFLOW_ACCESS_TOKEN_HEADER] = `Bearer ${accessToken}`
  }
  if (config.data instanceof FormData) {
    config.headers.delete('Content-Type')
  }
  return config
})

// Orvalが使用するカスタムインスタンス関数
export const customAxiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source()

  // アクセストークンが設定されていない場合のエラーチェック
  if (!accessToken) {
    console.warn('Kickflow access token is not set. API calls may fail.')
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // キャンセル機能を追加
  // @ts-expect-error キャンセルプロパティはPromiseに存在しないが追加
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// エラー型の定義
export type ErrorType<Error> = AxiosError<Error>

// ボディ型の定義
export type BodyType<BodyData> = BodyData
