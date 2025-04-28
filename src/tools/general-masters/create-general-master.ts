import { z } from 'zod'
import { getKickflowRESTAPIV1 } from '../../kickflow-api/generated/kickflowRESTAPIV1.js'
import type { McpTool } from '../types.js'
import { CreateGeneralMasterBodyFieldsItemFieldType as FieldTypeEnum } from '../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'

// Define the shape for the 'fields' array item
const createGeneralMasterFieldShape = z.object({
  title: z.string().describe('フィールド名'),
  description: z.string().nullable().optional().describe('フィールドの説明'),
  code: z.string().describe('フィールドのコード'),
  required: z.boolean().describe('入力必須かどうか'),
  fieldType: z
    .enum(Object.values(FieldTypeEnum) as [string, ...string[]]) // Use enum values
    .describe('フィールドの型'),
  options: z
    .array(z.string())
    .nullable()
    .optional()
    .describe('選択肢。fieldTypeがcheckboxまたはpull_downのとき必須。'),
  visible: z.boolean().optional().describe('管理者以外も閲覧可能な場合true'),
})

// Define the raw shape for the input schema based on CreateGeneralMasterBody
const createGeneralMasterInputShape = {
  name: z.string().describe('名前'),
  code: z
    .string()
    .nullable()
    .optional()
    .describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
  description: z.string().nullable().optional().describe('説明'),
  fields: z
    .array(createGeneralMasterFieldShape)
    .optional()
    .describe('カスタムフィールドの配列'),
}

const createGeneralMasterTool: McpTool<typeof createGeneralMasterInputShape> = {
  name: 'create_general_master',
  description: '汎用マスタを作成します',
  inputSchema: createGeneralMasterInputShape,
  async execute(params: Record<string, unknown>) {
    try {
      const api = getKickflowRESTAPIV1()
      const validatedParams = z
        .object(createGeneralMasterInputShape)
        .parse(params)

      // Construct apiParams ensuring correct types for fields
      const apiParams = {
        name: validatedParams.name,
        code: validatedParams.code === undefined ? null : validatedParams.code,
        description:
          validatedParams.description === undefined
            ? null
            : validatedParams.description,
        fields: validatedParams.fields?.map((field) => ({
          ...field,
          // Ensure fieldType is of the correct enum type
          fieldType: field.fieldType as FieldTypeEnum,
          // Ensure options is null if not provided or empty
          options:
            field.options && field.options.length > 0 ? field.options : null,
          // Ensure description is null if not provided
          description:
            field.description === undefined ? null : field.description,
        })),
      }

      // Type assertion to satisfy the API client expectation
      const generalMaster = await api.createGeneralMaster(
        apiParams as import('../../kickflow-api/generated/kickflowRESTAPIV1.schemas.js').CreateGeneralMasterBody,
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
      console.error('Error creating general master:', error)
      let errorMessage = '汎用マスタ作成中に不明なエラーが発生しました'
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

export default createGeneralMasterTool
