import { CallToolRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getKickflowRESTAPIV1 } from '../kickflow-api/generated/kickflowRESTAPIV1.js';
import type { GetTicketsParams } from '../kickflow-api/generated/kickflowRESTAPIV1.schemas.js';
import {
  GetTicketsStatusOneOfItem as TicketStatusEnumZod,
  GetTicketsAssigneeStatusItem as AssigneeStatusEnumZod,
} from '../kickflow-api/generated/kickflowRESTAPIV1.schemas.js'; // Enumの定数をインポート

// Zodスキーマの定義
const TicketStatusEnum = z.nativeEnum(TicketStatusEnumZod);
const AssigneeStatusEnum = z.nativeEnum(AssigneeStatusEnumZod);

const GetTicketsParamsSchema = z
  .object({
    page: z.number().int().positive().optional(),
    perPage: z.number().int().positive().optional(),
    sortBy: z.enum(['createdAt', 'updatedAt']).optional(),
    status: z.union([TicketStatusEnum, z.array(TicketStatusEnum)]).optional(),
    subStatusIds: z.array(z.string().uuid()).optional(),
    workflowId: z.string().uuid().optional(),
    authorId: z.string().uuid().optional(),
    authorTeamFullName: z.string().optional(),
    ticketNumber: z.string().optional(),
    // RFC3339形式の日付文字列を検証 (タイムゾーンオフセットを含む)
    createdAtStart: z.string().datetime({ offset: true }).optional(),
    createdAtEnd: z.string().datetime({ offset: true }).optional(),
    updatedAtStart: z.string().datetime({ offset: true }).optional(),
    updatedAtEnd: z.string().datetime({ offset: true }).optional(),
    openedAtStart: z.string().datetime({ offset: true }).optional(),
    openedAtEnd: z.string().datetime({ offset: true }).optional(),
    completedAtStart: z.string().datetime({ offset: true }).optional(),
    completedAtEnd: z.string().datetime({ offset: true }).optional(),
    archivedAtStart: z.string().datetime({ offset: true }).optional(),
    archivedAtEnd: z.string().datetime({ offset: true }).optional(),
    assigneeUserId: z.string().uuid().optional(),
    assigneeStatus: z.array(AssigneeStatusEnum).optional(),
    stepTitle: z.string().optional(),
  })
  .strict() // 定義されていないプロパティをエラーにする
  .refine(
    (data) => {
      // assigneeUserId と assigneeStatus は同時に指定する必要がある
      const hasAssigneeUserId = data.assigneeUserId !== undefined;
      const hasAssigneeStatus = data.assigneeStatus !== undefined;
      return hasAssigneeUserId === hasAssigneeStatus;
    },
    {
      message: 'assigneeUserId and assigneeStatus must be specified together or both omitted',
      path: ['assigneeUserId', 'assigneeStatus'], // エラー箇所を示すパス
    }
  );

// 入力パラメータの型検証関数
function validateGetTicketsArgs(args: unknown): { success: true; data: GetTicketsParams } | { success: false; error: z.ZodError } {
  return GetTicketsParamsSchema.safeParse(args);
}

// チケット検索ツールのハンドラー
export async function handleGetTickets(request: ReturnType<typeof CallToolRequestSchema.parse>) {
  const validationResult = validateGetTicketsArgs(request.params.arguments);

  if (!validationResult.success) {
    // Zodのエラーを整形して詳細なメッセージを作成
    const errorDetails = validationResult.error.errors
      .map((err) => `Parameter '${err.path.join('.')}': ${err.message}`)
      .join('\n');
    throw new McpError(ErrorCode.InvalidParams, `Invalid get tickets arguments:\n${errorDetails}`);
  }

  const args = validationResult.data;

  try {
    // Orvalで生成されたAPIクライアントを使用
    const api = getKickflowRESTAPIV1();

    // Kickflow APIを呼び出し
    const response = await api.getTickets(args);

    // Orvalで生成されたAPIクライアントは、レスポンスそのものがデータになっている
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error('Error getting tickets:', error);

    return {
      content: [
        {
          type: 'text',
          text: `Error getting tickets: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}
