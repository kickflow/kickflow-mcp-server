import { CallToolRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getKickflowRESTAPIV1 } from '../kickflow-api/generated/kickflowRESTAPIV1.js';

// Zodスキーマの定義
const GetTicketParamsSchema = z
  .object({
    ticketId: z.string().uuid('Invalid UUID format for ticketId'), // ticketIdはUUID形式であるべき
  })
  .strict(); // 定義されていないプロパティをエラーにする

// 入力パラメータの型検証関数
function validateGetTicketArgs(args: unknown): { success: true; data: z.infer<typeof GetTicketParamsSchema> } | { success: false; error: z.ZodError } {
  return GetTicketParamsSchema.safeParse(args);
}

// 特定のチケットを取得するツールのハンドラー
export async function handleGetTicket(request: ReturnType<typeof CallToolRequestSchema.parse>) {
  const validationResult = validateGetTicketArgs(request.params.arguments);

  if (!validationResult.success) {
    // Zodのエラーを整形して詳細なメッセージを作成
    const errorDetails = validationResult.error.errors
      .map((err) => `Parameter '${err.path.join('.')}': ${err.message}`)
      .join('\n');
    throw new McpError(ErrorCode.InvalidParams, `Invalid get ticket arguments:\n${errorDetails}`);
  }

  const { ticketId } = validationResult.data;

  try {
    // Orvalで生成されたAPIクライアントを使用
    const api = getKickflowRESTAPIV1();

    // Kickflow APIを呼び出し
    const response = await api.getTicketsTicketId(ticketId);

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
    console.error(`Error getting ticket ${ticketId}:`, error);

    return {
      content: [
        {
          type: 'text',
          text: `Error getting ticket: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}
