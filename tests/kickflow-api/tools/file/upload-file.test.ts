import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApiToolCallback } from '../../../../src/kickflow-api/tool-utils.js'

// uploadFile APIのモック
const mockUploadFile = vi.fn()

vi.mock('../../../../src/kickflow-api/generated/kickflowRESTAPIV1.js', () => ({
  getKickflowRESTAPIV1: () => ({
    uploadFile: mockUploadFile,
  }),
}))

// テスト対象のモジュールをインポート（モック設定後）
const uploadFileTool = await import(
  '../../../../src/kickflow-api/tools/file/upload-file.js'
).then((m) => m.default)

describe('upload-file tool', () => {
  // テスト用のextraオブジェクト
  const mockExtra = {} as Parameters<
    ReturnType<typeof createApiToolCallback>
  >[1]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('base64 → File 変換', () => {
    it('正常なbase64文字列をFileオブジェクトに変換してAPIを呼び出す', async () => {
      // "Hello, World!" のbase64エンコード
      const base64Content = Buffer.from('Hello, World!').toString('base64')
      const filename = 'test.txt'
      const contentType = 'text/plain'

      mockUploadFile.mockResolvedValue({ signedId: 'signed-id-123' })

      const result = await uploadFileTool.cb(
        {
          file: base64Content,
          filename,
          contentType,
        },
        mockExtra,
      )

      // APIが呼び出されたことを確認
      expect(mockUploadFile).toHaveBeenCalledTimes(1)

      // 呼び出し時の引数を取得
      const callArgs = mockUploadFile.mock.calls[0][0]
      expect(callArgs).toHaveProperty('file')

      // Fileオブジェクトのプロパティを確認
      const file = callArgs.file as File
      expect(file.name).toBe(filename)
      expect(file.type).toBe(contentType)

      // ファイルの内容を確認
      const fileContent = await file.text()
      expect(fileContent).toBe('Hello, World!')

      // レスポンスを確認
      expect(result.content).toBeDefined()
      expect(result.content[0]).toMatchObject({
        type: 'text',
        text: expect.stringContaining('"signedId": "signed-id-123"'),
      })
    })

    it('contentTypeを省略した場合、application/octet-streamが使用される', async () => {
      const base64Content = Buffer.from('binary data').toString('base64')
      const filename = 'data.bin'

      mockUploadFile.mockResolvedValue({ signedId: 'signed-id-456' })

      await uploadFileTool.cb(
        {
          file: base64Content,
          filename,
          // contentType を省略
        },
        mockExtra,
      )

      expect(mockUploadFile).toHaveBeenCalledTimes(1)
      const file = mockUploadFile.mock.calls[0][0].file as File
      expect(file.type).toBe('application/octet-stream')
    })

    it('バイナリデータ（画像など）を正しく変換できる', async () => {
      // PNG画像のヘッダー部分を模したバイナリデータ
      const pngHeader = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      ])
      const base64Content = Buffer.from(pngHeader).toString('base64')
      const filename = 'image.png'
      const contentType = 'image/png'

      mockUploadFile.mockResolvedValue({ signedId: 'signed-id-789' })

      await uploadFileTool.cb(
        {
          file: base64Content,
          filename,
          contentType,
        },
        mockExtra,
      )

      expect(mockUploadFile).toHaveBeenCalledTimes(1)
      const file = mockUploadFile.mock.calls[0][0].file as File

      // バイナリ内容を確認
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      expect(uint8Array).toEqual(pngHeader)
    })

    it('空のファイルでも正しく処理できる', async () => {
      const base64Content = '' // 空のbase64
      const filename = 'empty.txt'

      mockUploadFile.mockResolvedValue({ signedId: 'signed-id-empty' })

      await uploadFileTool.cb(
        {
          file: base64Content,
          filename,
        },
        mockExtra,
      )

      expect(mockUploadFile).toHaveBeenCalledTimes(1)
      const file = mockUploadFile.mock.calls[0][0].file as File
      expect(file.size).toBe(0)
    })

    it('大きなファイルでも正しく処理できる', async () => {
      // 1MB のデータを生成
      const largeData = Buffer.alloc(1024 * 1024, 'x')
      const base64Content = largeData.toString('base64')
      const filename = 'large.bin'

      mockUploadFile.mockResolvedValue({ signedId: 'signed-id-large' })

      await uploadFileTool.cb(
        {
          file: base64Content,
          filename,
        },
        mockExtra,
      )

      expect(mockUploadFile).toHaveBeenCalledTimes(1)
      const file = mockUploadFile.mock.calls[0][0].file as File
      expect(file.size).toBe(1024 * 1024)
    })
  })

  describe('バリデーションエラー', () => {
    it('fileが未指定の場合、バリデーションエラーを返す', async () => {
      const result = await uploadFileTool.cb(
        {
          filename: 'test.txt',
          // file を省略
        },
        mockExtra,
      )

      expect(mockUploadFile).not.toHaveBeenCalled()
      expect(result.content[0]).toMatchObject({
        type: 'text',
        text: expect.stringContaining('Invalid arguments'),
      })
    })

    it('filenameが未指定の場合、バリデーションエラーを返す', async () => {
      const result = await uploadFileTool.cb(
        {
          file: Buffer.from('test').toString('base64'),
          // filename を省略
        },
        mockExtra,
      )

      expect(mockUploadFile).not.toHaveBeenCalled()
      expect(result.content[0]).toMatchObject({
        type: 'text',
        text: expect.stringContaining('Invalid arguments'),
      })
    })
  })

  describe('APIエラーハンドリング', () => {
    it('API呼び出しが失敗した場合、エラーメッセージを返す', async () => {
      const base64Content = Buffer.from('test').toString('base64')

      mockUploadFile.mockRejectedValue(new Error('Upload failed'))

      const result = await uploadFileTool.cb(
        {
          file: base64Content,
          filename: 'test.txt',
        },
        mockExtra,
      )

      expect(result.content[0]).toMatchObject({
        type: 'text',
        text: expect.stringMatching(/API Error.*Upload failed/),
      })
    })
  })

  describe('ツールのメタデータ', () => {
    it('ツール名が正しく設定されている', () => {
      expect(uploadFileTool.name).toBe('upload_file')
    })

    it('descriptionにbase64についての説明が含まれている', () => {
      expect(uploadFileTool.description).toContain('base64')
    })

    it('paramsSchemaに必要なフィールドが定義されている', () => {
      const schema = uploadFileTool.paramsSchema
      expect(schema).toHaveProperty('file')
      expect(schema).toHaveProperty('filename')
      expect(schema).toHaveProperty('contentType')
    })
  })
})
