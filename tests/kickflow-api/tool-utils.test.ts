import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'
import { AxiosError, AxiosHeaders } from 'axios'
import { createApiToolCallback } from '../../src/kickflow-api/tool-utils.js'
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js'
import type {
  ServerRequest,
  ServerNotification,
} from '@modelcontextprotocol/sdk/types.js'

vi.mock('../../src/kickflow-api/generated/kickflowRESTAPIV1.js', () => ({
  getKickflowRESTAPIV1: vi.fn(() => ({})),
}))

describe('createApiToolCallback', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const testSchema = z.object({
    name: z.string(),
    age: z.number().optional(),
  })

  // モック extra オブジェクト
  const mockExtra = {} as RequestHandlerExtra<ServerRequest, ServerNotification>

  it('バリデーション成功時、APIを呼び出して結果をJSONで返す', async () => {
    const mockResponse = { id: '123', name: 'test' }
    const mockApiCall = vi.fn().mockResolvedValue(mockResponse)

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 'John', age: 30 }, mockExtra)

    expect(mockApiCall).toHaveBeenCalledWith(expect.anything(), {
      name: 'John',
      age: 30,
    })
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: JSON.stringify(mockResponse, null, 2),
        },
      ],
    })
  })

  it('バリデーション失敗時、エラーメッセージを返す', async () => {
    const mockApiCall = vi.fn()

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 123 }, mockExtra) // name は string であるべき

    expect(mockApiCall).not.toHaveBeenCalled()
    expect(result.content[0]).toMatchObject({
      type: 'text',
      text: expect.stringContaining('Invalid arguments:'),
    })
  })

  it('必須フィールドが欠けている場合、バリデーションエラーを返す', async () => {
    const mockApiCall = vi.fn()

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({}, mockExtra) // name が必須

    expect(mockApiCall).not.toHaveBeenCalled()
    expect(result.content[0]).toMatchObject({
      type: 'text',
      text: expect.stringContaining('Invalid arguments:'),
    })
  })

  it('AxiosError発生時、response.data.messageを返す', async () => {
    const axiosError = new AxiosError('Request failed')
    axiosError.response = {
      data: { message: 'User not found' },
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: { headers: new AxiosHeaders() },
    }
    const mockApiCall = vi.fn().mockRejectedValue(axiosError)

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 'John' }, mockExtra)

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'API Error: User not found',
        },
      ],
    })
  })

  it('AxiosError発生時、response.data.messageがなければerror.messageを返す', async () => {
    const axiosError = new AxiosError('Network Error')
    axiosError.response = {
      data: {},
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: { headers: new AxiosHeaders() },
    }
    const mockApiCall = vi.fn().mockRejectedValue(axiosError)

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 'John' }, mockExtra)

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'API Error: Network Error',
        },
      ],
    })
  })

  it('通常のError発生時、エラーメッセージを返す', async () => {
    const error = new Error('Something went wrong')
    const mockApiCall = vi.fn().mockRejectedValue(error)

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 'John' }, mockExtra)

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'API Error: Something went wrong',
        },
      ],
    })
  })

  it('未知のエラー発生時、デフォルトエラーメッセージを返す', async () => {
    const mockApiCall = vi.fn().mockRejectedValue('unknown error')

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 'John' }, mockExtra)

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'API Error: An unknown error occurred',
        },
      ],
    })
  })

  it('オプショナルフィールドなしでもバリデーションが成功する', async () => {
    const mockResponse = { success: true }
    const mockApiCall = vi.fn().mockResolvedValue(mockResponse)

    const callback = createApiToolCallback(testSchema, mockApiCall)
    const result = await callback({ name: 'John' }, mockExtra) // age はオプショナル

    expect(mockApiCall).toHaveBeenCalledWith(expect.anything(), {
      name: 'John',
    })
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: JSON.stringify(mockResponse, null, 2),
        },
      ],
    })
  })
})
