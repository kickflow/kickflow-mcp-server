import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
// Use the enum from Create operation as suggested by TS error
import { CreateGeneralMasterBodyFieldsItemFieldType as FieldTypeEnum } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the shape for the 'fields' array item for update
const updateGeneralMasterFieldShape = z.object({
  title: z.string().optional().describe('フィールド名'),
  description: z.string().nullable().optional().describe('フィールドの説明'),
  code: z.string().describe('フィールドのコード (必須)'), // Code is required to identify the field to update
  required: z.boolean().optional().describe('入力必須かどうか'),
  fieldType: z
    .enum(Object.values(FieldTypeEnum) as [string, ...string[]])
    .optional() // Field type might not be updatable or optional in update
    .describe('フィールドの型'),
  options: z
    .array(z.string())
    .nullable()
    .optional()
    .describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ必須。'),
  visible: z.boolean().optional().describe('管理者以外も閲覧可能な場合true'),
})

// Define the raw shape for the input schema based on UpdateGeneralMasterBody and path param
const updateGeneralMasterInputShape = {
  generalMasterId: z.string().uuid().describe('更新する汎用マスタのUUID'),
  name: z.string().optional().describe('新しい名前'),
  code: z.string().optional().describe('新しいコード'),
  description: z.string().nullable().optional().describe('新しい説明'),
  fields: z
    .array(updateGeneralMasterFieldShape)
    .optional()
    .describe('更新するカスタムフィールドの配列'),
}

const updateGeneralMasterTool: McpTool<typeof updateGeneralMasterInputShape> = {
  name: 'update_general_master',
  description: '汎用マスタを更新します',
  inputSchema: updateGeneralMasterInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(updateGeneralMasterInputShape)
        .parse(params)

      const { generalMasterId, ...updateBody } = validatedParams

      // Construct apiUpdateBody ensuring correct types and handling undefined/null
      const apiUpdateBody = {
        name: updateBody.name,
        code: updateBody.code,
        description:
          updateBody.description === undefined ? null : updateBody.description,
        fields: updateBody.fields?.map((field) => ({
          ...field,
          fieldType: field.fieldType as FieldTypeEnum, // Type assertion
          options:
            field.options && field.options.length > 0 ? field.options : null,
          description:
            field.description === undefined ? null : field.description,
        })),
      }

      // Remove undefined fields from the update body
      Object.keys(apiUpdateBody).forEach((key) => {
        const objKey = key as keyof typeof apiUpdateBody // Cast key
        if (apiUpdateBody[objKey] === undefined) {
          delete apiUpdateBody[objKey]
        }
      })

      const generalMaster = await api.updateGeneralMaster(
        generalMasterId,
        apiUpdateBody as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').UpdateGeneralMasterBody,
      )

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(generalMaster, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error('Error updating general master:', error)
      let errorMessage = '汎用マスタ更新中に不明なエラーが発生しました'
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

export default updateGeneralMasterTool
