import { CallToolRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { KickflowClient } from '../kickflow-api/client.js';
import type { paths } from '../kickflow-api/types.js';

// 入力パラメータの型検証関数
function isValidSearchTicketsArgs(args: unknown): args is {
  status?: string | string[];
  workflowId?: string;
  authorId?: string;
  ticketNumber?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
} {
  if (typeof args !== 'object' || args === null) {
    return false;
  }
  
  const typedArgs = args as Record<string, unknown>;
  
  // 必須パラメータはない
  
  // 任意パラメータの型チェック
  if (typedArgs.status !== undefined &&
      typeof typedArgs.status !== 'string' &&
      !Array.isArray(typedArgs.status)) {
    return false;
  }
  
  if (typedArgs.workflowId !== undefined && typeof typedArgs.workflowId !== 'string') {
    return false;
  }
  
  if (typedArgs.authorId !== undefined && typeof typedArgs.authorId !== 'string') {
    return false;
  }
  
  if (typedArgs.ticketNumber !== undefined && typeof typedArgs.ticketNumber !== 'string') {
    return false;
  }
  
  if (typedArgs.page !== undefined && typeof typedArgs.page !== 'number') {
    return false;
  }
  
  if (typedArgs.perPage !== undefined && typeof typedArgs.perPage !== 'number') {
    return false;
  }
  
  if (typedArgs.sortBy !== undefined && typeof typedArgs.sortBy !== 'string') {
    return false;
  }
  
  return true;
}

// チケット検索ツールのハンドラー
export async function handleSearchTickets(
  request: ReturnType<typeof CallToolRequestSchema.parse>,
  client: KickflowClient
) {
  if (!isValidSearchTicketsArgs(request.params.arguments)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      'Invalid search tickets arguments'
    );
  }

  const args = request.params.arguments;
  
  try {
    // APIクエリパラメータの構築
    const queryParams: paths['/v1/tickets']['get']['parameters']['query'] = {};
    
    if (args.status !== undefined) {
      queryParams.status = args.status as any;
    }
    
    if (args.workflowId !== undefined) {
      queryParams.workflowId = args.workflowId;
    }
    
    if (args.authorId !== undefined) {
      queryParams.authorId = args.authorId;
    }
    
    if (args.ticketNumber !== undefined) {
      queryParams.ticketNumber = args.ticketNumber;
    }
    
    if (args.page !== undefined) {
      queryParams.page = args.page;
    }
    
    if (args.perPage !== undefined) {
      queryParams.perPage = args.perPage;
    }
    
    if (args.sortBy !== undefined) {
      queryParams.sortBy = args.sortBy;
    }
    
    // Kickflow APIを呼び出し
    const response = await client.searchTickets(queryParams);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error('Error searching tickets:', error);
    
    return {
      content: [
        {
          type: 'text',
          text: `Error searching tickets: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}
