import { describe, it, expect } from 'vitest'
import {
  findZodSchema,
  buildCombinedSchema,
} from '../../src/kickflow-api/schema-registry.js'

describe('schema-registry', () => {
  describe('findZodSchema', () => {
    it('queryParamsが存在するoperationIdの場合、queryParamsを取得できる', () => {
      const result = findZodSchema('listTickets')

      expect(result.queryParams).toBeDefined()
      expect(result.requestBody).toBeUndefined()
    })

    it('requestBodyのみ存在するoperationIdの場合、requestBodyのみ取得できる', () => {
      const result = findZodSchema('createCategory')

      expect(result.queryParams).toBeUndefined()
      expect(result.requestBody).toBeDefined()
    })

    it('スキーマが存在しないoperationIdの場合、すべてundefined', () => {
      const result = findZodSchema('nonExistent')

      expect(result.pathParams).toBeUndefined()
      expect(result.queryParams).toBeUndefined()
      expect(result.requestBody).toBeUndefined()
    })

    it('パスパラメータがあるoperationIdの場合、pathParamsを取得できる', () => {
      const result = findZodSchema('getTicket')

      expect(result.pathParams).toBeDefined()
      expect(result.pathParams?.shape).toHaveProperty('ticketId')
    })

    it('パスパラメータがないoperationIdの場合、pathParamsはundefined', () => {
      const result = findZodSchema('listCategories')

      expect(result.pathParams).toBeUndefined()
    })
  })

  describe('buildCombinedSchema', () => {
    it('存在しないoperationIdの場合は空のスキーマを返す', () => {
      const result = buildCombinedSchema('nonExistent')

      expect(result).toBeDefined()
      expect(Object.keys(result.shape)).toHaveLength(0)
    })

    it('パスパラメータがないAPIの場合、パスパラメータなしのスキーマを返す', () => {
      const result = buildCombinedSchema('listCategories')

      expect(result).toBeDefined()
      expect(result.shape).not.toHaveProperty('categoryId')
    })

    it('パスパラメータがあるAPIの場合、パスパラメータがスキーマに含まれる', () => {
      const result = buildCombinedSchema('updateCategory')

      expect(result).toBeDefined()
      expect(result.shape).toHaveProperty('categoryId')
    })

    it('uuid形式のパスパラメータはuuid検証付きになる', () => {
      const result = buildCombinedSchema('getTicket')

      expect(result).toBeDefined()
      const invalidResult = result.safeParse({ ticketId: 'invalid-uuid' })
      expect(invalidResult.success).toBe(false)

      const validResult = result.safeParse({
        ticketId: '550e8400-e29b-41d4-a716-446655440000',
      })
      expect(validResult.success).toBe(true)
    })

    it('pattern付きのパスパラメータは正規表現検証付きになる', () => {
      const result = buildCombinedSchema('getFolder')

      expect(result).toBeDefined()
      const invalidResult = result.safeParse({ folderId: 'invalid folder!' })
      expect(invalidResult.success).toBe(false)

      const validResult = result.safeParse({ folderId: 'valid-folder_123' })
      expect(validResult.success).toBe(true)
    })

    it('複数のパスパラメータがあるAPIの場合、すべてがスキーマに含まれる', () => {
      const result = buildCombinedSchema('getComment')

      expect(result).toBeDefined()
      expect(result.shape).toHaveProperty('ticketId')
      expect(result.shape).toHaveProperty('commentId')
    })

    it('パスパラメータとクエリパラメータの両方を持つスキーマを構築できる', () => {
      const result = buildCombinedSchema('listTeams')

      expect(result).toBeDefined()
      expect(result.shape).toHaveProperty('organizationChartId')
    })

    it('パラメータがないAPIでも空のスキーマを返す', () => {
      const result = buildCombinedSchema('getCurrentUser')

      expect(result).toBeDefined()
      expect(Object.keys(result.shape)).toHaveLength(0)
    })

    it('クエリパラメータとrequestBodyの両方を持つ場合はマージされる', () => {
      const result = buildCombinedSchema('createTicket')

      expect(result).toBeDefined()
      expect(result.shape).toHaveProperty('workflowId')
    })
  })
})
