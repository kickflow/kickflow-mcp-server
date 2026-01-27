import * as zod from 'zod';


/**
 * ワークフローの一覧を取得します。ステータスによる絞り込みが可能です。
 * @summary ワークフロー一覧を取得
 */
export const listWorkflowsQueryPageDefault = 1;

export const listWorkflowsQueryPerPageDefault = 25;
export const listWorkflowsQueryPerPageMax = 100;

export const listWorkflowsQuerySortByRegExp = new RegExp('^(createdAt|updatedAt|name|status)(-asc|-desc)?$');


export const listWorkflowsQueryParams = zod.object({
  "page": zod.number().min(1).default(listWorkflowsQueryPageDefault).describe('ページ。1が最初のページ。'),
  "perPage": zod.number().min(1).max(listWorkflowsQueryPerPageMax).default(listWorkflowsQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listWorkflowsQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, updatedAt, name, status'),
  "status": zod.array(zod.enum(['visible', 'invisible'])).optional().describe('ステータス')
})

export const listWorkflowsResponseCodeRegExp = new RegExp('^[a-zA-Z0-9_-]+$');
export const listWorkflowsResponsePublicTicketDefault = false;export const listWorkflowsResponseVisibleToTeamMembersDefault = false;export const listWorkflowsResponseAllowEditingOfViewersDefault = true;export const listWorkflowsResponseAuthorEmailMax = 254;

export const listWorkflowsResponseAuthorCodeMax = 100;

export const listWorkflowsResponseAuthorFirstNameMax = 255;

export const listWorkflowsResponseAuthorLastNameMax = 255;

export const listWorkflowsResponseAuthorFullNameMax = 255;

export const listWorkflowsResponseAuthorEmployeeIdMax = 30;

export const listWorkflowsResponseVersionAuthorEmailMax = 254;

export const listWorkflowsResponseVersionAuthorCodeMax = 100;

export const listWorkflowsResponseVersionAuthorFirstNameMax = 255;

export const listWorkflowsResponseVersionAuthorLastNameMax = 255;

export const listWorkflowsResponseVersionAuthorFullNameMax = 255;

export const listWorkflowsResponseVersionAuthorEmployeeIdMax = 30;

export const listWorkflowsResponseFolderNameMax = 300;

export const listWorkflowsResponseFolderCodeMax = 100;

export const listWorkflowsResponseFolderWorkflowsCountMin = 0;

export const listWorkflowsResponseFolderRoutesCountMin = 0;

export const listWorkflowsResponseFolderPipelinesCountMin = 0;

export const listWorkflowsResponseCategoriesItemNameMax = 100;



export const listWorkflowsResponseItem = zod.object({
  "id": zod.string().describe('UUID'),
  "code": zod.string().regex(listWorkflowsResponseCodeRegExp).describe('コード'),
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
  "allowEditingOfViewers": zod.boolean().default(listWorkflowsResponseAllowEditingOfViewersDefault).describe('共有ユーザーの編集が可能な場合true'),
  "author": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listWorkflowsResponseAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listWorkflowsResponseAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(listWorkflowsResponseAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(listWorkflowsResponseAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(listWorkflowsResponseAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listWorkflowsResponseAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "email": zod.email().max(listWorkflowsResponseVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listWorkflowsResponseVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(listWorkflowsResponseVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(listWorkflowsResponseVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(listWorkflowsResponseVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listWorkflowsResponseVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "name": zod.string().max(listWorkflowsResponseFolderNameMax).describe('名前'),
  "code": zod.string().max(listWorkflowsResponseFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(listWorkflowsResponseFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(listWorkflowsResponseFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(listWorkflowsResponseFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ'),
  "categories": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listWorkflowsResponseCategoriesItemNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')).describe('カテゴリの配列')
}).describe('ワークフロー')
export const listWorkflowsResponse = zod.array(listWorkflowsResponseItem)

/**
 * 指定したIDのワークフローを取得します。
 * @summary ワークフローを取得
 */
export const getWorkflowPathWorkflowIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const getWorkflowParams = zod.object({
  "workflowId": zod.string().regex(getWorkflowPathWorkflowIdRegExp).describe('ワークフローのUUIDまたはコード')
})

export const getWorkflowResponseCodeRegExp = new RegExp('^[a-zA-Z0-9_-]+$');
export const getWorkflowResponsePublicTicketDefault = false;export const getWorkflowResponseVisibleToTeamMembersDefault = false;export const getWorkflowResponseAllowEditingOfViewersDefault = true;export const getWorkflowResponseAuthorEmailMax = 254;

export const getWorkflowResponseAuthorCodeMax = 100;

export const getWorkflowResponseAuthorFirstNameMax = 255;

export const getWorkflowResponseAuthorLastNameMax = 255;

export const getWorkflowResponseAuthorFullNameMax = 255;

export const getWorkflowResponseAuthorEmployeeIdMax = 30;

export const getWorkflowResponseVersionAuthorEmailMax = 254;

export const getWorkflowResponseVersionAuthorCodeMax = 100;

export const getWorkflowResponseVersionAuthorFirstNameMax = 255;

export const getWorkflowResponseVersionAuthorLastNameMax = 255;

export const getWorkflowResponseVersionAuthorFullNameMax = 255;

export const getWorkflowResponseVersionAuthorEmployeeIdMax = 30;

export const getWorkflowResponseFolderNameMax = 300;

export const getWorkflowResponseFolderCodeMax = 100;

export const getWorkflowResponseFolderWorkflowsCountMin = 0;

export const getWorkflowResponseFolderRoutesCountMin = 0;

export const getWorkflowResponseFolderPipelinesCountMin = 0;

export const getWorkflowResponseCategoriesItemNameMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemMinLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemMaxLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemDecimalDigitMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterNameMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterFieldsItemTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterFieldsItemCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemNameMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemInputsItemFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemInputsItemFieldCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldMinLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldMaxLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldDecimalDigitMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldMinLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldMaxLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldDecimalDigitMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldMinLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldMaxLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldDecimalDigitMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldMinLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldMaxLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldDecimalDigitMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldCodeMax = 100;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldMinLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldMaxLengthMin = 0;

export const getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldDecimalDigitMin = 0;

export const getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterCodeMax = 100;

export const getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterNameMax = 300;

export const getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterFieldsItemTitleMax = 300;

export const getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterFieldsItemCodeMax = 100;

export const getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemCodeMax = 100;

export const getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemNameMax = 100;

export const getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemInputsItemFieldTitleMax = 300;

export const getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemInputsItemFieldCodeMax = 100;

export const getWorkflowResponseTicketViewersItemUserEmailMax = 254;

export const getWorkflowResponseTicketViewersItemUserCodeMax = 100;

export const getWorkflowResponseTicketViewersItemUserFirstNameMax = 255;

export const getWorkflowResponseTicketViewersItemUserLastNameMax = 255;

export const getWorkflowResponseTicketViewersItemUserFullNameMax = 255;

export const getWorkflowResponseTicketViewersItemUserEmployeeIdMax = 30;

export const getWorkflowResponseTicketViewersItemTeamNameMax = 300;

export const getWorkflowResponseTicketViewersItemTeamCodeMax = 100;

export const getWorkflowResponseTicketViewersItemTeamNotesMax = 10000;

export const getWorkflowResponseTicketViewersItemTeamUsersCountMin = 0;

export const getWorkflowResponseTicketViewersItemGradeNameMax = 300;

export const getWorkflowResponseTicketViewersItemGradeLevelMin = 0;
export const getWorkflowResponseTicketViewersItemGradeLevelMax = 255;

export const getWorkflowResponseTicketViewersItemGradeCodeMax = 100;

export const getWorkflowResponseTicketViewersItemGradeIsDefaultDefault = false;export const getWorkflowResponseRouteConditionsItemRouteAuthorEmailMax = 254;

export const getWorkflowResponseRouteConditionsItemRouteAuthorCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemRouteAuthorFirstNameMax = 255;

export const getWorkflowResponseRouteConditionsItemRouteAuthorLastNameMax = 255;

export const getWorkflowResponseRouteConditionsItemRouteAuthorFullNameMax = 255;

export const getWorkflowResponseRouteConditionsItemRouteAuthorEmployeeIdMax = 30;

export const getWorkflowResponseRouteConditionsItemRouteVersionAuthorEmailMax = 254;

export const getWorkflowResponseRouteConditionsItemRouteVersionAuthorCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemRouteVersionAuthorFirstNameMax = 255;

export const getWorkflowResponseRouteConditionsItemRouteVersionAuthorLastNameMax = 255;

export const getWorkflowResponseRouteConditionsItemRouteVersionAuthorFullNameMax = 255;

export const getWorkflowResponseRouteConditionsItemRouteVersionAuthorEmployeeIdMax = 30;

export const getWorkflowResponseRouteConditionsItemRouteFolderNameMax = 300;

export const getWorkflowResponseRouteConditionsItemRouteFolderCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemRouteFolderWorkflowsCountMin = 0;

export const getWorkflowResponseRouteConditionsItemRouteFolderRoutesCountMin = 0;

export const getWorkflowResponseRouteConditionsItemRouteFolderPipelinesCountMin = 0;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldTitleMax = 300;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldMinLengthMin = 0;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldMaxLengthMin = 0;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldDecimalDigitMin = 0;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeNameMax = 300;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeLevelMin = 0;
export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeLevelMax = 255;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeIsDefaultDefault = false;export const getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamNameMax = 300;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamNotesMax = 10000;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamUsersCountMin = 0;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemCodeMax = 100;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemNameMax = 100;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemInputsItemFieldTitleMax = 300;

export const getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemInputsItemFieldCodeMax = 100;



export const getWorkflowResponse = zod.object({
  "id": zod.string().describe('UUID'),
  "code": zod.string().regex(getWorkflowResponseCodeRegExp).describe('コード'),
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
  "allowEditingOfViewers": zod.boolean().default(getWorkflowResponseAllowEditingOfViewersDefault).describe('共有ユーザーの編集が可能な場合true'),
  "author": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getWorkflowResponseAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getWorkflowResponseAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(getWorkflowResponseAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(getWorkflowResponseAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(getWorkflowResponseAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getWorkflowResponseAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "email": zod.email().max(getWorkflowResponseVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getWorkflowResponseVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(getWorkflowResponseVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(getWorkflowResponseVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(getWorkflowResponseVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getWorkflowResponseVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "name": zod.string().max(getWorkflowResponseFolderNameMax).describe('名前'),
  "code": zod.string().max(getWorkflowResponseFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getWorkflowResponseFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getWorkflowResponseFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getWorkflowResponseFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ'),
  "categories": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getWorkflowResponseCategoriesItemNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')).describe('カテゴリの配列')
}).describe('ワークフロー').and(zod.object({
  "sectionList": zod.array(zod.object({
  "sectionType": zod.enum(['form', 'slip']),
  "title": zod.string().nullable().describe('タイトル'),
  "description": zod.string().nullable().describe('説明'),
  "id": zod.uuid().optional().describe('フォームセクションのID（UUID）。明細セクションには含まれません。'),
  "formFields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('フォームフィールド').and(zod.object({
  "generalMaster": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterCodeMax).describe('コード'),
  "name": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemGeneralMasterFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ'),zod.null()]).optional().describe('汎用マスタ（汎用マスタフィールドの場合）'),
  "defaultGeneralMasterItem": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemCodeMax).describe('コード'),
  "name": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemDefaultGeneralMasterItemInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム'),zod.null()]).optional().describe('初期値（汎用マスタフィールドの場合）'),
  "externalApiSetting": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "httpMethod": zod.enum(['get', 'post', 'put', 'delete', 'patch']).describe('HTTPメソッド'),
  "url": zod.url().describe('URL'),
  "headers": zod.array(zod.object({
  "key": zod.string().describe('ヘッダーのキー'),
  "value": zod.string().describe('ヘッダーの値')
})).describe('リクエストヘッダー'),
  "responseArray": zod.boolean().describe('レスポンスが複数レコードを含む場合true'),
  "arrayJsonPath": zod.string().nullable().describe('複数レコードを含む場合の配列へのJSONPath'),
  "mappings": zod.array(zod.object({
  "formField": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemExternalApiSettingMappingsItemFormFieldDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('フォームフィールド'),
  "jsonPath": zod.string().describe('値抽出用のJSONPath'),
  "displayInTable": zod.boolean().describe('選択用テーブルで表示する場合true'),
  "title": zod.string().nullable().describe('選択用テーブルでのタイトル')
})).describe('フィールドへのマッピング設定')
}).describe('外部API設定'),zod.null()]).optional().describe('外部API設定。fieldTypeがbutton_apiのときのみ値が入ります。'),
  "kintoneAppSetting": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "formField": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingFormFieldDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('フォームフィールド'),
  "kintoneApp": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().describe('kintoneアプリ名'),
  "domain": zod.string().describe('kintoneドメイン'),
  "appId": zod.string().describe('kintoneアプリID')
}).describe('kintone連携'),
  "mappings": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "displayInTable": zod.boolean().describe('選択用テーブルで表示する場合true'),
  "kintoneFieldCode": zod.string().describe('kintoneフィールドコード'),
  "kintoneFieldName": zod.string().describe('kintoneフィールドコード'),
  "kintoneFieldType": zod.string().describe('kintoneフィールドコード'),
  "formField": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemKintoneAppSettingMappingsItemFormFieldDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('フォームフィールド')
})).describe('フィールドへのマッピング設定')
}).describe('kintone連携設定'),zod.null()]).optional().describe('外部API設定。fieldTypeがbutton_kintoneのときのみ値が入ります。'),
  "climberCloudSetting": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "contentsId": zod.string().optional().describe('ファイル付きリストID'),
  "formField": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingFormFieldDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).optional().describe('フォームフィールド'),
  "mappings": zod.array(zod.object({
  "formField": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseSectionListItemFormFieldsItemClimberCloudSettingMappingsItemFormFieldDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('フォームフィールド'),
  "order": zod.number().describe('表示順（1から始まります）')
})).describe('ClimberCloudのカラムとのマッピング設定')
}).describe('ClimberCloud連携設定'),zod.null()]).optional().describe('ClimberCloud連携設定。fieldTypeがfileのときのみ値が入ります。'),
  "generalMasterSearchFilters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "filterFormFieldId": zod.uuid().describe('絞り込みに使う汎用フィールドのID（UUID）'),
  "fieldType": zod.enum(['free_word', 'name', 'code', 'description', 'custom_field']).describe('絞り込み先のフィールドのタイプ'),
  "generalMasterFieldId": zod.uuid().nullable().describe('fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID）')
})).nullish().describe('汎用マスタ型フィールドの自動絞り込みの設定')
})).describe('フォームフィールドの詳細')).optional().describe('フォームフィールド。明細セクションには含まれません。'),
  "conditional": zod.boolean().optional().describe('表示条件があるかどうか。明細セクションには含まれません。'),
  "combinationType": zod.enum(['all', 'any', 'custom']).optional().describe('条件の組み合わせタイプ。all=すべて、any=いずれか、custom=高度な条件式。明細セクションには含まれません。'),
  "combinationExpression": zod.string().nullish().describe('高度な条件式'),
  "slipFields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "fieldType": zod.enum(['text', 'number', 'integer', 'calculation', 'pull_down', 'checkbox', 'date', 'file', 'master', 'user', 'team', 'ticket']).describe('フィールドの型'),
  "code": zod.string().describe('フィールドのコード'),
  "title": zod.string().describe('タイトル'),
  "required": zod.boolean().describe('入力必須の場合true'),
  "showTotal": zod.boolean().describe('列の合計を表示する場合true'),
  "options": zod.array(zod.string()).describe('選択肢。プルダウンまたはチェックボックスのときのみ値が入ります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。型が自動計算のときのみ値が入ります。'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "decimalDigit": zod.number().nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "allowedExtensions": zod.array(zod.string()).describe('添付可能な拡張子リスト'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('明細フィールド').and(zod.object({
  "generalMaster": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterCodeMax).describe('コード'),
  "name": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemGeneralMasterFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ'),zod.null()]).optional().describe('汎用マスタ。型が汎用マスタのときのみ値が入ります。'),
  "defaultGeneralMasterItem": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemCodeMax).describe('コード'),
  "name": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getWorkflowResponseSectionListItemSlipFieldsItemDefaultGeneralMasterItemInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム'),zod.null()]).optional().describe('汎用マスタアイテムの初期値')
})).describe('明細フィールドの詳細')).optional().describe('明細フィールド。フォームセクションには含まれません。')
}).describe('明細セクションまたはフォームセクション')).optional().describe('セクション・明細を表すオブジェクトを画面に表示される順に格納した配列。'),
  "ticketViewers": zod.array(zod.object({
  "id": zod.string().describe('UUID'),
  "user": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getWorkflowResponseTicketViewersItemUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getWorkflowResponseTicketViewersItemUserCodeMax).describe('コード'),
  "firstName": zod.string().max(getWorkflowResponseTicketViewersItemUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(getWorkflowResponseTicketViewersItemUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(getWorkflowResponseTicketViewersItemUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getWorkflowResponseTicketViewersItemUserEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).describe('ユーザー。ユーザーとチームは片方のみ値が入ります。'),
  "team": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getWorkflowResponseTicketViewersItemTeamNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getWorkflowResponseTicketViewersItemTeamCodeMax).describe('コード'),
  "notes": zod.string().max(getWorkflowResponseTicketViewersItemTeamNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getWorkflowResponseTicketViewersItemTeamUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム'),zod.null()]).describe('チーム。ユーザーとチームは片方のみ値が入ります。'),
  "grade": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getWorkflowResponseTicketViewersItemGradeNameMax).describe('名前'),
  "level": zod.number().min(getWorkflowResponseTicketViewersItemGradeLevelMin).max(getWorkflowResponseTicketViewersItemGradeLevelMax).describe('レベル'),
  "code": zod.string().max(getWorkflowResponseTicketViewersItemGradeCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職'),zod.null()]).describe('役職。チーム指定で役職も指定する場合のみ値が入ります。')
}).describe('ワークフロー単位で設定された共有ユーザー')).describe('ワークフロー単位のチケット共有ユーザー'),
  "cloudSignSetting": zod.union([zod.object({
  "required": zod.boolean().describe('書類の添付が必須な場合true')
}),zod.null()]).describe('クラウドサイン連携設定')
})).describe('チケットに含まれるワークフロー。セクション情報と共有ユーザー情報を含みます。').and(zod.object({
  "routeConditions": zod.array(zod.object({
  "id": zod.string().describe('UUID'),
  "conditionType": zod.enum(['always', 'field', 'field_otherwise']).describe('経路分岐タイプ'),
  "combinationType": zod.enum(['all', 'any', 'custom']).describe('条件の組み合わせタイプ'),
  "combinationExpression": zod.string().describe('高度な条件式'),
  "route": zod.union([zod.object({
  "id": zod.string().describe('UUID'),
  "code": zod.string().describe('コード'),
  "status": zod.enum(['visible', 'deleted', 'error']).describe('ステータス'),
  "versionId": zod.string().describe('バージョンのID'),
  "versionNumber": zod.number().describe('バージョン番号'),
  "name": zod.string().describe('名前'),
  "description": zod.string().describe('説明'),
  "createdAt": zod.string().describe('作成日時'),
  "updatedAt": zod.string().describe('更新日時'),
  "author": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getWorkflowResponseRouteConditionsItemRouteAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemRouteAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(getWorkflowResponseRouteConditionsItemRouteAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(getWorkflowResponseRouteConditionsItemRouteAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(getWorkflowResponseRouteConditionsItemRouteAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getWorkflowResponseRouteConditionsItemRouteAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).optional().describe('作成者'),
  "versionAuthor": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getWorkflowResponseRouteConditionsItemRouteVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemRouteVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(getWorkflowResponseRouteConditionsItemRouteVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(getWorkflowResponseRouteConditionsItemRouteVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(getWorkflowResponseRouteConditionsItemRouteVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getWorkflowResponseRouteConditionsItemRouteVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー'),zod.null()]).optional(),
  "folder": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getWorkflowResponseRouteConditionsItemRouteFolderNameMax).describe('名前'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemRouteFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getWorkflowResponseRouteConditionsItemRouteFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getWorkflowResponseRouteConditionsItemRouteFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getWorkflowResponseRouteConditionsItemRouteFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ')
}).describe('経路'),zod.null()]).describe('経路。routeまたはerrorMessageは片方のみ値が入ります。'),
  "conditionFields": zod.array(zod.object({
  "id": zod.string().describe('UUID'),
  "symbol": zod.enum(['equal', 'not_equal', 'greater_than', 'greater_than_or_equal', 'less_than', 'less_than_or_equal', 'include', 'exclude', 'is_empty', 'is_not_empty', 'descendants_or_equal']).describe('演算子'),
  "value": zod.string().nullable().describe('しきい値'),
  "formField": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldTitleMax).describe('説明'),
  "description": zod.string().nullable().describe('説明'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date', 'file', 'master', 'user', 'team', 'ticket', 'calculation', 'button_api', 'button_kintone']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "approver": zod.boolean().describe('承認者が編集可能かどうか'),
  "author": zod.boolean().optional().describe('申請者が編集可能かどうか'),
  "options": zod.array(zod.string()).nullable().describe('選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldCodeMax).describe('コード'),
  "size": zod.enum(['full', 'half']).describe('フォームサイズ。fullの場合全幅、halfの場合1/2になります。'),
  "regexpFormat": zod.string().nullable().describe('正規表現フォーマット'),
  "formula": zod.string().nullable().describe('計算式。\n型がcalculationのときのみ値が入ります。'),
  "defaultValue": zod.string().nullable().describe('初期値'),
  "minValue": zod.number().nullable().describe('最小値'),
  "maxValue": zod.number().nullable().describe('最大値'),
  "minLength": zod.number().min(getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldMinLengthMin).nullable().describe('最小文字数'),
  "maxLength": zod.number().min(getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldMaxLengthMin).nullable().describe('最大文字数'),
  "decimalDigit": zod.number().min(getWorkflowResponseRouteConditionsItemConditionFieldsItemFormFieldDecimalDigitMin).nullable().describe('小数の桁数'),
  "delimited": zod.boolean().nullable().describe('カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。'),
  "prefix": zod.string().nullable().describe('単位（接頭辞）'),
  "suffix": zod.string().nullable().describe('単位（接尾辞）'),
  "hidden": zod.boolean().nullish().describe('隠しフィールドである場合true'),
  "readonlyOnUi": zod.boolean().nullish().describe('trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。')
}).describe('フォームフィールド').describe('対象のフォームフィールド'),
  "grade": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeNameMax).describe('名前'),
  "level": zod.number().min(getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeLevelMin).max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeLevelMax).describe('レベル'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGradeCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職'),zod.null()]).describe('しきい値として使う役職'),
  "team": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamCodeMax).describe('コード'),
  "notes": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getWorkflowResponseRouteConditionsItemConditionFieldsItemTeamUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム'),zod.null()]).describe('しきい値として使うチーム'),
  "generalMasterItem": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemCodeMax).describe('コード'),
  "name": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getWorkflowResponseRouteConditionsItemConditionFieldsItemGeneralMasterItemInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム'),zod.null()]).describe('しきい値として使う汎用マスタアイテム')
}).describe('ワークフロー経路分岐の条件')).describe('条件'),
  "errorMessage": zod.string().nullable().describe('申請拒否時のエラーメッセージ。routeまたはerrorMessageは片方のみ値が入ります。')
}).describe('ワークフローの経路分岐')).describe('経路分岐')
})).describe('ワークフローの詳細')

