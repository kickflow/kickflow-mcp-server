import { CallToolRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { getKickflowRESTAPIV1 } from '../kickflow-api/generated/kickflowRESTAPIV1.js';
import type { GetTicketsParams } from '../kickflow-api/generated/kickflowRESTAPIV1.schemas.js';

// 入力パラメータの型検証関数
function isValidGetTicketsArgs(args: unknown): args is GetTicketsParams {
  // TODO: 未実装
  return true;
}

// チケット検索ツールのハンドラー
export async function handleGetTickets(
  request: ReturnType<typeof CallToolRequestSchema.parse>,
) {
  if (!isValidGetTicketsArgs(request.params.arguments)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      'Invalid get tickets arguments: ' + JSON.stringify(request.params.arguments, null, 2),
    );
  }

  const args = request.params.arguments;
  
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
