import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

// getCurrentUserにはパラメータがないため、空のオブジェクトスキーマを定義
const paramsSchema = z.object({})

const getCurrentUserTool: Tool = {
  name: 'get_current_user',
  description: '現在のユーザーを取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api) => api.getCurrentUser()),
}
export default getCurrentUserTool
