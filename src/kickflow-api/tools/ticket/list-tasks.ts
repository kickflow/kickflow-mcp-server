import { Tool } from '../../../types.js'
// ticket.zod.ts が大きすぎるため読み込めませんでしたが、型定義から推測して import します
import { listTasksQueryParams } from '../../generated/ticket/ticket.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listTasksTool: Tool = {
  name: 'list_tasks',
  description:
    '現在のユーザーにアサインされている承認リクエストの一覧を取得します',
  paramsSchema: listTasksQueryParams.shape,
  cb: createApiToolCallback(listTasksQueryParams, (api, validatedArgs) =>
    api.listTasks(validatedArgs),
  ),
}
export default listTasksTool
