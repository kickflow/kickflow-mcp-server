import { describe, it, expect } from 'vitest'
import {
  getListTicketsUrl,
  getListTasksUrl,
  getListUsersUrl,
  getListRoutesUrl,
  getListWorkflowsUrl,
} from '../../../src/kickflow-api/generated/kickflowRESTAPIV1.js'

function parseQuery(url: string): URLSearchParams {
  const query = url.split('?')[1] ?? ''
  return new URLSearchParams(query)
}

describe('配列クエリパラメータのシリアライズ', () => {
  describe('getListTicketsUrl', () => {
    it('status配列がブラケット付きで展開される', () => {
      const url = getListTicketsUrl({
        page: 1,
        perPage: 10,
        status: ['draft', 'completed'],
      })
      const params = parseQuery(url)
      expect(params.getAll('status[]')).toEqual(['draft', 'completed'])
      expect(params.has('status')).toBe(false)
    })

    it('status単一値はブラケットなしで送信される', () => {
      const url = getListTicketsUrl({
        page: 1,
        perPage: 10,
        status: 'draft',
      })
      const params = parseQuery(url)
      expect(params.get('status')).toBe('draft')
      expect(params.has('status[]')).toBe(false)
    })

    it('subStatusIds配列がブラケット付きで展開される', () => {
      const url = getListTicketsUrl({
        page: 1,
        perPage: 10,
        subStatusIds: ['id-1', 'id-2'],
      })
      const params = parseQuery(url)
      expect(params.getAll('subStatusIds[]')).toEqual(['id-1', 'id-2'])
    })

    it('assigneeStatus配列がブラケット付きで展開される', () => {
      const url = getListTicketsUrl({
        page: 1,
        perPage: 10,
        assigneeStatus: ['current', 'approved'],
      })
      const params = parseQuery(url)
      expect(params.getAll('assigneeStatus[]')).toEqual(['current', 'approved'])
    })
  })

  describe('getListTasksUrl', () => {
    it('status配列がブラケット付きで展開される', () => {
      const url = getListTasksUrl({
        page: 1,
        perPage: 10,
        status: ['draft', 'in_progress'],
      })
      const params = parseQuery(url)
      expect(params.getAll('status[]')).toEqual(['draft', 'in_progress'])
    })

    it('subStatusIds配列がブラケット付きで展開される', () => {
      const url = getListTasksUrl({
        page: 1,
        perPage: 10,
        subStatusIds: ['id-1', 'id-2'],
      })
      const params = parseQuery(url)
      expect(params.getAll('subStatusIds[]')).toEqual(['id-1', 'id-2'])
    })
  })

  describe('getListUsersUrl', () => {
    it('status配列がブラケット付きで展開される', () => {
      const url = getListUsersUrl({
        page: 1,
        perPage: 10,
        status: ['activated', 'suspended'],
      })
      const params = parseQuery(url)
      expect(params.getAll('status[]')).toEqual(['activated', 'suspended'])
    })
  })

  describe('getListRoutesUrl', () => {
    it('status配列がブラケット付きで展開される', () => {
      const url = getListRoutesUrl({
        page: 1,
        perPage: 10,
        status: ['visible', 'error'],
      })
      const params = parseQuery(url)
      expect(params.getAll('status[]')).toEqual(['visible', 'error'])
    })
  })

  describe('getListWorkflowsUrl', () => {
    it('status配列がブラケット付きで展開される', () => {
      const url = getListWorkflowsUrl({
        page: 1,
        perPage: 10,
        status: ['visible', 'invisible'],
      })
      const params = parseQuery(url)
      expect(params.getAll('status[]')).toEqual(['visible', 'invisible'])
    })
  })

  describe('非配列パラメータへの影響がないこと', () => {
    it('文字列・数値パラメータはそのまま送信される', () => {
      const url = getListTicketsUrl({
        page: 2,
        perPage: 25,
        workflowId: 'wf-123',
        sortBy: 'createdAt-desc',
      })
      const params = parseQuery(url)
      expect(params.get('page')).toBe('2')
      expect(params.get('perPage')).toBe('25')
      expect(params.get('workflowId')).toBe('wf-123')
      expect(params.get('sortBy')).toBe('createdAt-desc')
    })
  })
})
