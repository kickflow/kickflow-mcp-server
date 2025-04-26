import { CallToolRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { KickflowClient } from '../kickflow-api/client.js';

// 入力パラメータの型検証関数
function isValidGetTicketArgs(args: unknown): args is {
  ticketId: string;
} {
  if (typeof args !== 'object' || args === null) {
    return false;
  }
  
  const typedArgs = args as Record<string, unknown>;
  
  // ticketIdは必須パラメータ
  if (typeof typedArgs.ticketId !== 'string' || typedArgs.ticketId.trim() === '') {
    return false;
  }
  
  return true;
}

// 特定のチケットを取得するツールのハンドラー
export async function handleGetTicket(
  request: ReturnType<typeof CallToolRequestSchema.parse>,
  client: KickflowClient
) {
  if (!isValidGetTicketArgs(request.params.arguments)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      'Missing or invalid ticketId parameter'
    );
  }

  const { ticketId } = request.params.arguments;
  
  try {
    // Kickflow APIを呼び出し
    const response = await client.getTicket(ticketId);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response.data, null, 2),
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
