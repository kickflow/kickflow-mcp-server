const KICKFLOW_API_BASE_URL = 'https://api.kickflow.com'

let accessToken: string | null = null

export function setKickflowAccessToken(token: string): void {
  accessToken = token
}

export const customFetchInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  if (!accessToken) {
    console.warn('Kickflow access token is not set. API calls may fail.')
  }

  const headers = new Headers(options?.headers)

  if (options?.body instanceof FormData) {
    headers.delete('Content-Type')
  } else if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const response = await fetch(`${KICKFLOW_API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type')
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const error = new FetchError(
      data?.message || response.statusText,
      response.status,
      data,
    )
    throw error
  }

  return { data, status: response.status, headers: response.headers } as T
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: unknown,
  ) {
    super(message)
    this.name = 'FetchError'
  }
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof FetchError) {
    const data = error.data as { message?: string } | undefined
    return data?.message || error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

export type ErrorType<Error> = Error
export type BodyType<BodyData> = BodyData
