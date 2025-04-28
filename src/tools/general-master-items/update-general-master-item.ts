import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
import type { UpdateGeneralMasterItemBodyInputsItemValue } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the shape for the 'inputs' array item for update
const updateGeneralMasterItemInputItemShape = z.object({
  code: z.string().describe('フィールドのコード'),
  value: z
    .union([z.string(), z.array(z.string()), z.null()])
    .describe(
      '入力値。カスタムフィールドがcheckboxまたはpull_downの場合文字列の配列、それ以外の場合文字列。',
    ),
})

// Define the raw shape for the input schema based on UpdateGeneralMasterItemBody and path params
const updateGeneralMasterItemInputShape = {
  generalMasterId: z.string().uuid().describe('汎用マスタのUUID'),
  itemId: z.string().uuid().describe('更新するアイテムのUUID'),
  code: z
    .string()
    .optional()
    .describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
  name: z.string().optional().describe('名前'),
  description: z.string().optional().describe('説明'),
  startsOn: z.string().nullable().optional().describe('有効期限の開始日'),
  endsOn: z.string().nullable().optional().describe('有効期限の終了日'),
  inputs: z
    .array(updateGeneralMasterItemInputItemShape)
    .optional()
    .describe(
      'カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。',
    ),
}

const updateGeneralMasterItemTool: McpTool<
  typeof updateGeneralMasterItemInputShape
> = {
  name: 'update_general_master_item',
  description: '汎用マスタアイテムを更新します',
  inputSchema: updateGeneralMasterItemInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(updateGeneralMasterItemInputShape)
        .parse(params)

      const { generalMasterId, itemId, ...updateBody } = validatedParams

      // Ensure correct type for inputs.value and handle undefined/null
      const apiUpdateBody = {
        ...updateBody,
        startsOn:
          updateBody.startsOn === undefined ? null : updateBody.startsOn,
        endsOn: updateBody.endsOn === undefined ? null : updateBody.endsOn,
        inputs: updateBody.inputs?.map((input) => ({
          ...input,
          value: input.value as UpdateGeneralMasterItemBodyInputsItemValue,
        })),
      }

      // Remove undefined fields from the update body
      Object.keys(apiUpdateBody).forEach((key) => {
        const objKey = key as keyof typeof apiUpdateBody
        if (apiUpdateBody[objKey] === undefined) {
          delete apiUpdateBody[objKey]
        }
      })

      const item = await api.updateGeneralMasterItem(
        generalMasterId,
        itemId,
        apiUpdateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').UpdateGeneralMasterItemBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(item, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error updating general master item:', error)
      let errorMessage = '汎用マスタアイテム更新中に不明なエラーが発生しました'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (error instanceof z.ZodError) {
        errorMessage = `入力パラメータエラー: ${error.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ')}`
      }
      return {
        content: [{ type: 'text', text: errorMessage }],
        isError: true,
      }
    }
  },
}

export default updateGeneralMasterItemTool
