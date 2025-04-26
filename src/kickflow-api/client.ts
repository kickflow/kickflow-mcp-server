import axios, { AxiosInstance } from 'axios';
import type { paths } from './types.js';

/**
 * KickflowのAPIレスポンスの型
 */
export type KickflowResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

/**
 * Kickflow APIクライアント
 */
export class KickflowClient {
  private client: AxiosInstance;
  private baseUrl = 'https://api.kickflow.com';

  /**
   * @param apiToken Kickflow APIのトークン（Bearer認証用）
   */
  constructor(apiToken: string) {
    if (!apiToken.startsWith('Bearer ')) {
      apiToken = `Bearer ${apiToken}`;
    }

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  /**
   * チケット一覧を取得
   * @param params 検索パラメータ
   * @returns チケット一覧
   */
  async searchTickets(params?: paths['/v1/tickets']['get']['parameters']['query']) {
    const response = await this.client.get<
      paths['/v1/tickets']['get']['responses'][200]['content']['application/json']
    >('/v1/tickets', { params });
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  /**
   * 特定のチケットを取得
   * @param ticketId チケットのUUID
   * @returns チケットの詳細情報
   */
  async getTicket(ticketId: string) {
    const response = await this.client.get<
      paths['/v1/tickets/{ticketId}']['get']['responses'][200]['content']['application/json']
    >(`/v1/tickets/${ticketId}`);
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
}
