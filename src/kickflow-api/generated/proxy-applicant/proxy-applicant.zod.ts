import * as zod from 'zod';


/**
 * テナント内の代理申請の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理申請一覧を取得
 */
export const listProxyApplicantsQueryPageDefault = 1;

export const listProxyApplicantsQueryPerPageDefault = 25;
export const listProxyApplicantsQueryPerPageMax = 100;



export const listProxyApplicantsQueryParams = zod.object({
  "page": zod.number().min(1).default(listProxyApplicantsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listProxyApplicantsQueryPerPageMax).default(listProxyApplicantsQueryPerPageDefault).describe('1ページあたりの件数')
})

export const listProxyApplicantsResponseUserEmailMax = 254;

export const listProxyApplicantsResponseUserCodeMax = 100;

export const listProxyApplicantsResponseUserFirstNameMax = 255;

export const listProxyApplicantsResponseUserLastNameMax = 255;

export const listProxyApplicantsResponseUserFullNameMax = 255;

export const listProxyApplicantsResponseUserEmployeeIdMax = 30;

export const listProxyApplicantsResponseProxyUserEmailMax = 254;

export const listProxyApplicantsResponseProxyUserCodeMax = 100;

export const listProxyApplicantsResponseProxyUserFirstNameMax = 255;

export const listProxyApplicantsResponseProxyUserLastNameMax = 255;

export const listProxyApplicantsResponseProxyUserFullNameMax = 255;

export const listProxyApplicantsResponseProxyUserEmployeeIdMax = 30;

export const listProxyApplicantsResponseWorkflowsItemCodeRegExp = new RegExp('^[a-zA-Z0-9_-]+$');
export const listProxyApplicantsResponseWorkflowsItemPublicTicketDefault = false;export const listProxyApplicantsResponseWorkflowsItemVisibleToTeamMembersDefault = false;export const listProxyApplicantsResponseWorkflowsItemAllowEditingOfViewersDefault = true;export const listProxyApplicantsResponseWorkflowsItemAuthorEmailMax = 254;

export const listProxyApplicantsResponseWorkflowsItemAuthorCodeMax = 100;

export const listProxyApplicantsResponseWorkflowsItemAuthorFirstNameMax = 255;

export const listProxyApplicantsResponseWorkflowsItemAuthorLastNameMax = 255;

export const listProxyApplicantsResponseWorkflowsItemAuthorFullNameMax = 255;

export const listProxyApplicantsResponseWorkflowsItemAuthorEmployeeIdMax = 30;

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorEmailMax = 254;

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorCodeMax = 100;

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorFirstNameMax = 255;

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorLastNameMax = 255;

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorFullNameMax = 255;

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorEmployeeIdMax = 30;

export const listProxyApplicantsResponseWorkflowsItemFolderNameMax = 300;

export const listProxyApplicantsResponseWorkflowsItemFolderCodeMax = 100;

export const listProxyApplicantsResponseWorkflowsItemFolderWorkflowsCountMin = 0;

export const listProxyApplicantsResponseWorkflowsItemFolderRoutesCountMin = 0;

export const listProxyApplicantsResponseWorkflowsItemFolderPipelinesCountMin = 0;

export const listProxyApplicantsResponseWorkflowsItemCategoriesItemNameMax = 100;



export const listProxyApplicantsResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "user": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listProxyApplicantsResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listProxyApplicantsResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(listProxyApplicantsResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(listProxyApplicantsResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(listProxyApplicantsResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listProxyApplicantsResponseUserEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),
  "proxyUser": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listProxyApplicantsResponseProxyUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listProxyApplicantsResponseProxyUserCodeMax).describe('コード'),
  "firstName": zod.string().max(listProxyApplicantsResponseProxyUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(listProxyApplicantsResponseProxyUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(listProxyApplicantsResponseProxyUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listProxyApplicantsResponseProxyUserEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),
  "startsOn": zod.iso.date().nullable().describe('開始日'),
  "endsOn": zod.iso.date().nullable().describe('終了日'),
  "workflows": zod.array(zod.object({
  "id": zod.string().describe('UUID'),
  "code": zod.string().regex(listProxyApplicantsResponseWorkflowsItemCodeRegExp).describe('コード'),
  "versionId": zod.string().describe('バージョンのUUID'),
  "versionNumber": zod.number().describe('バージョン番号'),
  "name": zod.string().describe('名前'),
  "description": zod.string().describe('説明'),
  "status": zod.enum(['visible', 'invisible', 'deleted']).describe('ステータス。visibleは有効、invisibleは無効、deletedは削除済み。'),
  "publicTicket": zod.boolean().describe('チケットがテナント全体に共有される場合true'),
  "visibleToManager": zod.enum(['none', 'direct', 'all']).describe('申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。'),
  "visibleToTeamMembers": zod.boolean().describe('申請チームのメンバーが共有ユーザーに追加される場合true'),
  "titleDescription": zod.string().nullable().describe('タイトルの説明'),
  "ticketNumberFormat": zod.string().nullable().describe('チケット番号のフォーマット'),
  "overwritable": zod.boolean().describe('承認者による上書きが可能な場合true'),
  "createdAt": zod.string().describe('作成日時'),
  "updatedAt": zod.string().describe('更新日時'),
  "titleInputMode": zod.enum(['none', 'input', 'calculate']).describe('タイトル入力モード'),
  "titleFormula": zod.string().nullable().describe('タイトルの計算式'),
  "allowEditingOfViewers": zod.boolean().default(listProxyApplicantsResponseWorkflowsItemAllowEditingOfViewersDefault).describe('共有ユーザーの編集が可能な場合true'),
  "author": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listProxyApplicantsResponseWorkflowsItemAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listProxyApplicantsResponseWorkflowsItemAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(listProxyApplicantsResponseWorkflowsItemAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(listProxyApplicantsResponseWorkflowsItemAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(listProxyApplicantsResponseWorkflowsItemAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listProxyApplicantsResponseWorkflowsItemAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).describe('作成者'),
  "versionAuthor": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listProxyApplicantsResponseWorkflowsItemVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listProxyApplicantsResponseWorkflowsItemVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(listProxyApplicantsResponseWorkflowsItemVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(listProxyApplicantsResponseWorkflowsItemVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(listProxyApplicantsResponseWorkflowsItemVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listProxyApplicantsResponseWorkflowsItemVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).describe('バージョン作成者'),
  "folder": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listProxyApplicantsResponseWorkflowsItemFolderNameMax).describe('名前'),
  "code": zod.string().max(listProxyApplicantsResponseWorkflowsItemFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(listProxyApplicantsResponseWorkflowsItemFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(listProxyApplicantsResponseWorkflowsItemFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(listProxyApplicantsResponseWorkflowsItemFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ'),
  "categories": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listProxyApplicantsResponseWorkflowsItemCategoriesItemNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')).describe('カテゴリの配列')
}).describe('ワークフロー')).describe('対象ワークフロー')
}).describe('代理申請')
export const listProxyApplicantsResponse = zod.array(listProxyApplicantsResponseItem)

/**
 * 代理申請を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を作成
 */
export const createProxyApplicantBody = zod.object({
  "userId": zod.uuid().describe('代理されるユーザーID'),
  "proxyUserId": zod.uuid().describe('代理するユーザーID'),
  "startsOn": zod.iso.date().nullish().describe('開始日。nullの場合、すでに開始しているものとして扱います。'),
  "endsOn": zod.iso.date().nullish().describe('終了日。nullの場合、無期限のものとして扱います。'),
  "workflowIds": zod.array(zod.uuid()).optional().describe('対象ワークフローのID')
})

export const createProxyApplicantResponseUserEmailMax = 254;

export const createProxyApplicantResponseUserCodeMax = 100;

export const createProxyApplicantResponseUserFirstNameMax = 255;

export const createProxyApplicantResponseUserLastNameMax = 255;

export const createProxyApplicantResponseUserFullNameMax = 255;

export const createProxyApplicantResponseUserEmployeeIdMax = 30;

export const createProxyApplicantResponseProxyUserEmailMax = 254;

export const createProxyApplicantResponseProxyUserCodeMax = 100;

export const createProxyApplicantResponseProxyUserFirstNameMax = 255;

export const createProxyApplicantResponseProxyUserLastNameMax = 255;

export const createProxyApplicantResponseProxyUserFullNameMax = 255;

export const createProxyApplicantResponseProxyUserEmployeeIdMax = 30;

export const createProxyApplicantResponseWorkflowsItemCodeRegExp = new RegExp('^[a-zA-Z0-9_-]+$');
export const createProxyApplicantResponseWorkflowsItemPublicTicketDefault = false;export const createProxyApplicantResponseWorkflowsItemVisibleToTeamMembersDefault = false;export const createProxyApplicantResponseWorkflowsItemAllowEditingOfViewersDefault = true;export const createProxyApplicantResponseWorkflowsItemAuthorEmailMax = 254;

export const createProxyApplicantResponseWorkflowsItemAuthorCodeMax = 100;

export const createProxyApplicantResponseWorkflowsItemAuthorFirstNameMax = 255;

export const createProxyApplicantResponseWorkflowsItemAuthorLastNameMax = 255;

export const createProxyApplicantResponseWorkflowsItemAuthorFullNameMax = 255;

export const createProxyApplicantResponseWorkflowsItemAuthorEmployeeIdMax = 30;

export const createProxyApplicantResponseWorkflowsItemVersionAuthorEmailMax = 254;

export const createProxyApplicantResponseWorkflowsItemVersionAuthorCodeMax = 100;

export const createProxyApplicantResponseWorkflowsItemVersionAuthorFirstNameMax = 255;

export const createProxyApplicantResponseWorkflowsItemVersionAuthorLastNameMax = 255;

export const createProxyApplicantResponseWorkflowsItemVersionAuthorFullNameMax = 255;

export const createProxyApplicantResponseWorkflowsItemVersionAuthorEmployeeIdMax = 30;

export const createProxyApplicantResponseWorkflowsItemFolderNameMax = 300;

export const createProxyApplicantResponseWorkflowsItemFolderCodeMax = 100;

export const createProxyApplicantResponseWorkflowsItemFolderWorkflowsCountMin = 0;

export const createProxyApplicantResponseWorkflowsItemFolderRoutesCountMin = 0;

export const createProxyApplicantResponseWorkflowsItemFolderPipelinesCountMin = 0;

export const createProxyApplicantResponseWorkflowsItemCategoriesItemNameMax = 100;



export const createProxyApplicantResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "user": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createProxyApplicantResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createProxyApplicantResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(createProxyApplicantResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(createProxyApplicantResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(createProxyApplicantResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createProxyApplicantResponseUserEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),
  "proxyUser": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createProxyApplicantResponseProxyUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createProxyApplicantResponseProxyUserCodeMax).describe('コード'),
  "firstName": zod.string().max(createProxyApplicantResponseProxyUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(createProxyApplicantResponseProxyUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(createProxyApplicantResponseProxyUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createProxyApplicantResponseProxyUserEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),
  "startsOn": zod.iso.date().nullable().describe('開始日'),
  "endsOn": zod.iso.date().nullable().describe('終了日'),
  "workflows": zod.array(zod.object({
  "id": zod.string().describe('UUID'),
  "code": zod.string().regex(createProxyApplicantResponseWorkflowsItemCodeRegExp).describe('コード'),
  "versionId": zod.string().describe('バージョンのUUID'),
  "versionNumber": zod.number().describe('バージョン番号'),
  "name": zod.string().describe('名前'),
  "description": zod.string().describe('説明'),
  "status": zod.enum(['visible', 'invisible', 'deleted']).describe('ステータス。visibleは有効、invisibleは無効、deletedは削除済み。'),
  "publicTicket": zod.boolean().describe('チケットがテナント全体に共有される場合true'),
  "visibleToManager": zod.enum(['none', 'direct', 'all']).describe('申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。'),
  "visibleToTeamMembers": zod.boolean().describe('申請チームのメンバーが共有ユーザーに追加される場合true'),
  "titleDescription": zod.string().nullable().describe('タイトルの説明'),
  "ticketNumberFormat": zod.string().nullable().describe('チケット番号のフォーマット'),
  "overwritable": zod.boolean().describe('承認者による上書きが可能な場合true'),
  "createdAt": zod.string().describe('作成日時'),
  "updatedAt": zod.string().describe('更新日時'),
  "titleInputMode": zod.enum(['none', 'input', 'calculate']).describe('タイトル入力モード'),
  "titleFormula": zod.string().nullable().describe('タイトルの計算式'),
  "allowEditingOfViewers": zod.boolean().default(createProxyApplicantResponseWorkflowsItemAllowEditingOfViewersDefault).describe('共有ユーザーの編集が可能な場合true'),
  "author": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createProxyApplicantResponseWorkflowsItemAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createProxyApplicantResponseWorkflowsItemAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(createProxyApplicantResponseWorkflowsItemAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(createProxyApplicantResponseWorkflowsItemAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(createProxyApplicantResponseWorkflowsItemAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createProxyApplicantResponseWorkflowsItemAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).describe('作成者'),
  "versionAuthor": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createProxyApplicantResponseWorkflowsItemVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createProxyApplicantResponseWorkflowsItemVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(createProxyApplicantResponseWorkflowsItemVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(createProxyApplicantResponseWorkflowsItemVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(createProxyApplicantResponseWorkflowsItemVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createProxyApplicantResponseWorkflowsItemVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).describe('バージョン作成者'),
  "folder": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createProxyApplicantResponseWorkflowsItemFolderNameMax).describe('名前'),
  "code": zod.string().max(createProxyApplicantResponseWorkflowsItemFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createProxyApplicantResponseWorkflowsItemFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createProxyApplicantResponseWorkflowsItemFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createProxyApplicantResponseWorkflowsItemFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ'),
  "categories": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createProxyApplicantResponseWorkflowsItemCategoriesItemNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')).describe('カテゴリの配列')
}).describe('ワークフロー')).describe('対象ワークフロー')
}).describe('代理申請')

/**
 * 指定した代理申請を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を削除
 */
export const deleteProxyApplicantParams = zod.object({
  "proxyApplicantId": zod.uuid().describe('代理申請のUUID')
})

