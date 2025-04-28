import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
import type { CreateGeneralMasterItemBodyInputsItemValue } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the shape for the 'inputs' array item
const createGeneralMasterItemInputItemShape = z.object({
  code: z.string().describe('フィールドのコード'),
  value: z
    .union([z.string(), z.array(z.string()), z.null()])
    .describe(
      '入力値。カスタムフィールドがcheckboxまたはpull_downの場合は文字列の配列、それ以外は文字列。',
    ),
})

// Define the raw shape for the input schema based on CreateGeneralMasterItemBody and path param
const createGeneralMasterItemInputShape = {
  generalMasterId: z.string().uuid().describe('汎用マスタのUUID'),
  code: z
    .string()
    .optional()
    .describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
  name: z.string().describe('名前'),
  description: z.string().optional().describe('説明'),
  startsOn: z.string().nullable().optional().describe('有効期限の開始日'),
  endsOn: z.string().nullable().optional().describe('有効期限の終了日'),
  inputs: z
    .array(createGeneralMasterItemInputItemShape)
    .describe(
      'カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。',
    ),
}

const createGeneralMasterItemTool: McpTool<
  typeof createGeneralMasterItemInputShape
> = {
  name: 'create_general_master_item',
  description: '汎用マスタアイテムを作成します',
  inputSchema: createGeneralMasterItemInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(createGeneralMasterItemInputShape)
        .parse(params)

      const { generalMasterId, ...createBody } = validatedParams

      // Ensure correct type for inputs.value
      const apiCreateBody = {
        ...createBody,
        startsOn:
          createBody.startsOn === undefined ? null : createBody.startsOn,
        endsOn: createBody.endsOn === undefined ? null : createBody.endsOn,
        inputs: createBody.inputs.map((input) => ({
          ...input,
          value: input.value as CreateGeneralMasterItemBodyInputsItemValue,
        })),
      }

      const item = await api.createGeneralMasterItem(
        generalMasterId,
        apiCreateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateGeneralMasterItemBody,
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
      console.error('Error creating general master item:', error)
      let errorMessage = '汎用マスタアイテム作成中に不明なエラーが発生しました'
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

export default createGeneralMasterItemTool
