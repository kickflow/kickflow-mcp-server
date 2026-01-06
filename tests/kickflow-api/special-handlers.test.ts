import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AxiosError, AxiosHeaders } from 'axios'

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
  realpathSync: vi.fn(),
}))

const mockUploadFile = vi.fn()

vi.mock('../../src/kickflow-api/generated/kickflowRESTAPIV1.js', () => ({
  getKickflowRESTAPIV1: vi.fn(() => ({
    uploadFile: mockUploadFile,
  })),
}))

import * as fs from 'fs'
import {
  specialHandlers,
  executeSpecialHandler,
} from '../../src/kickflow-api/special-handlers.js'

describe('special-handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('specialHandlers', () => {
    describe('uploadFile', () => {
      it('スキーマにfilePathが必須', () => {
        const result = specialHandlers.uploadFile.schema.safeParse({})
        expect(result.success).toBe(false)
      })

      it('スキーマはfilePathを含む有効なパラメータを受け入れる', () => {
        const result = specialHandlers.uploadFile.schema.safeParse({
          filePath: '/path/to/file.pdf',
        })
        expect(result.success).toBe(true)
      })

      it('スキーマはcontentTypeをオプショナルで受け入れる', () => {
        const result = specialHandlers.uploadFile.schema.safeParse({
          filePath: '/path/to/file.pdf',
          contentType: 'application/pdf',
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('executeSpecialHandler', () => {
    it('存在しないoperationIdの場合はエラーを返す', async () => {
      const result = await executeSpecialHandler('nonExistentOperation', {})

      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('No special handler for'),
        }),
      )
    })

    it('パラメータ検証エラーの場合はエラーメッセージを返す', async () => {
      const result = await executeSpecialHandler('uploadFile', {})

      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('パラメータ検証エラー'),
        }),
      )
    })

    it('成功時はAPI結果を返す', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/test.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)
      mockUploadFile.mockResolvedValue({ signedId: 'abc123' })

      const result = await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      expect(result).toEqual(
        expect.objectContaining({
          success: true,
          data: { signedId: 'abc123' },
        }),
      )
      expect(fs.readFileSync).toHaveBeenCalledWith(testFilePath)
      expect(mockUploadFile).toHaveBeenCalled()
    })

    it('contentTypeを指定した場合はそれが使用される', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/test.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)
      mockUploadFile.mockResolvedValue({ signedId: 'abc123' })

      await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
        contentType: 'application/pdf',
      })

      const callArgs = mockUploadFile.mock.calls[0][0]
      expect(callArgs.file.type).toBe('application/pdf')
    })

    it('contentType未指定時はapplication/octet-streamが使用される', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/test.bin`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)
      mockUploadFile.mockResolvedValue({ signedId: 'abc123' })

      await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      const callArgs = mockUploadFile.mock.calls[0][0]
      expect(callArgs.file.type).toBe('application/octet-stream')
    })

    it('AxiosError発生時はエラーメッセージを返す', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/large.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)

      const axiosError = new AxiosError('Request failed')
      axiosError.response = {
        data: { message: 'File too large' },
        status: 413,
        statusText: 'Payload Too Large',
        headers: {},
        config: { headers: new AxiosHeaders() },
      }
      mockUploadFile.mockRejectedValue(axiosError)

      const result = await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('API Error: File too large'),
        }),
      )
    })

    it('AxiosErrorでresponse.data.messageがない場合はerror.messageを使用', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/file.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)

      const axiosError = new AxiosError('Network Error')
      axiosError.response = {
        data: {},
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: { headers: new AxiosHeaders() },
      }
      mockUploadFile.mockRejectedValue(axiosError)

      const result = await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('API Error: Network Error'),
        }),
      )
    })

    it('通常のError発生時はエラーメッセージを返す', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/file.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)

      mockUploadFile.mockRejectedValue(new Error('Something went wrong'))

      const result = await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('API Error: Something went wrong'),
        }),
      )
    })

    it('未知のエラー発生時はデフォルトエラーメッセージを返す', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/file.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)

      mockUploadFile.mockRejectedValue('unknown error')

      const result = await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('An unknown error occurred'),
        }),
      )
    })

    it('ファイル名がパスから正しく抽出される', async () => {
      const cwd = process.cwd()
      const testFilePath = `${cwd}/documents/report.pdf`
      const mockFileContent = Buffer.from('file content')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.realpathSync).mockImplementation((p) =>
        p === cwd ? cwd : testFilePath,
      )
      vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent)
      mockUploadFile.mockResolvedValue({ signedId: 'abc123' })

      await executeSpecialHandler('uploadFile', {
        filePath: testFilePath,
      })

      const callArgs = mockUploadFile.mock.calls[0][0]
      expect(callArgs.file.name).toBe('report.pdf')
    })
  })
})
