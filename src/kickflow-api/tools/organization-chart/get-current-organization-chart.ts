import { z } from 'zod'
import { Tool } from '../../../types.js'
import { createApiToolCallback } from '../../tool-utils.js'

// getCurrentOrganizationChartにはパラメータがないため、空のオブジェクトスキーマを定義
const paramsSchema = z.object({})

const getCurrentOrganizationChartTool: Tool = {
  name: 'get_current_organization_chart',
  description: '現在有効になっている組織図を取得します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api) =>
    api.getCurrentOrganizationChart(),
  ),
}
export default getCurrentOrganizationChartTool
