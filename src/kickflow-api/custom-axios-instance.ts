import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Kickflow APIのベースURL
const KICKFLOW_API_BASE_URL = 'https://api.kickflow.com';

// アクセストークンを保持する変数
let accessToken: string | null = null;

// アクセストークンを設定する関数
export function setKickflowAccessToken(token: string): void {
  accessToken = token;
}

// Axiosインスタンスの作成
export const AXIOS_INSTANCE = Axios.create({
  baseURL: KICKFLOW_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプターでアクセストークンを設定
AXIOS_INSTANCE.interceptors.request.use(config => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// Orvalが使用するカスタムインスタンス関数
export const customAxiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();

  // アクセストークンが設定されていない場合のエラーチェック
  if (!accessToken) {
    console.warn('Kickflow access token is not set. API calls may fail.');
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // キャンセル機能を追加
  // @ts-expect-error キャンセルプロパティはPromiseに存在しないが追加
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// エラー型の定義
export type ErrorType<Error> = AxiosError<Error>;

// ボディ型の定義
export type BodyType<BodyData> = BodyData;
