import * as zod from 'zod';


/**
 * 監査ログの一覧を取得します。
 * @summary 監査ログ一覧を取得
 */
export const listAuditLogsQueryPageDefault = 1;

export const listAuditLogsQueryPerPageDefault = 25;
export const listAuditLogsQueryPerPageMax = 100;

export const listAuditLogsQuerySortByRegExp = new RegExp('^(createdAt)(-asc|-desc)?$');


export const listAuditLogsQueryParams = zod.object({
  "page": zod.number().min(1).default(listAuditLogsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listAuditLogsQueryPerPageMax).default(listAuditLogsQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listAuditLogsQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。フィールドは createdAt のみ指定可能。'),
  "createdAtStart": zod.string().optional().describe('作成日時の起点'),
  "createdAtEnd": zod.string().optional().describe('作成日時の終点'),
  "userId": zod.uuid().optional().describe('ユーザーID')
})

export const listAuditLogsResponseUserEmailMax = 254;

export const listAuditLogsResponseUserCodeMax = 100;

export const listAuditLogsResponseUserFirstNameMax = 255;

export const listAuditLogsResponseUserLastNameMax = 255;

export const listAuditLogsResponseUserFullNameMax = 255;

export const listAuditLogsResponseUserEmployeeIdMax = 30;



export const listAuditLogsResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "user": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listAuditLogsResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listAuditLogsResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(listAuditLogsResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(listAuditLogsResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(listAuditLogsResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listAuditLogsResponseUserEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "deactivatedAt": zod.iso.datetime({}).nullish().describe('削除日時')
}).describe('ユーザー'),zod.null()]).describe('操作ユーザー。システムによる操作の場合はnull。'),
  "action": zod.string().describe('操作種別'),
  "data": zod.object({

}).nullable().describe('操作データ'),
  "remoteIp": zod.string().nullable().describe('リモートIPアドレス'),
  "systemType": zod.union([zod.literal('automation'),zod.literal(null)]).nullable().describe('システムによる操作種別'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('監査ログ')
export const listAuditLogsResponse = zod.array(listAuditLogsResponseItem)

