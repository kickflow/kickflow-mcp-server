import * as zod from 'zod';


/**
 * 経路の一覧を取得します。ステータスやフォルダによる絞り込みが可能です。
 * @summary 経路一覧を取得
 */
export const listRoutesQueryPageDefault = 1;

export const listRoutesQueryPerPageDefault = 25;
export const listRoutesQueryPerPageMax = 100;

export const listRoutesQuerySortByRegExp = new RegExp('^(createdAt|folderId)(-asc|-desc)?$');


export const listRoutesQueryParams = zod.object({
  "page": zod.number().min(1).default(listRoutesQueryPageDefault).describe('ページ。1が最初のページ。'),
  "perPage": zod.number().min(1).max(listRoutesQueryPerPageMax).default(listRoutesQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listRoutesQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, folderId'),
  "status": zod.array(zod.enum(['visible', 'error'])).optional().describe('ステータス'),
  "folderId": zod.uuid().optional().describe('フォルダのUUID')
})

export const listRoutesResponseAuthorEmailMax = 254;

export const listRoutesResponseAuthorCodeMax = 100;

export const listRoutesResponseAuthorFirstNameMax = 255;

export const listRoutesResponseAuthorLastNameMax = 255;

export const listRoutesResponseAuthorFullNameMax = 255;

export const listRoutesResponseAuthorEmployeeIdMax = 30;

export const listRoutesResponseVersionAuthorEmailMax = 254;

export const listRoutesResponseVersionAuthorCodeMax = 100;

export const listRoutesResponseVersionAuthorFirstNameMax = 255;

export const listRoutesResponseVersionAuthorLastNameMax = 255;

export const listRoutesResponseVersionAuthorFullNameMax = 255;

export const listRoutesResponseVersionAuthorEmployeeIdMax = 30;

export const listRoutesResponseFolderNameMax = 300;

export const listRoutesResponseFolderCodeMax = 100;

export const listRoutesResponseFolderWorkflowsCountMin = 0;

export const listRoutesResponseFolderRoutesCountMin = 0;

export const listRoutesResponseFolderPipelinesCountMin = 0;



export const listRoutesResponseItem = zod.object({
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
  "email": zod.email().max(listRoutesResponseAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listRoutesResponseAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(listRoutesResponseAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(listRoutesResponseAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(listRoutesResponseAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listRoutesResponseAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "email": zod.email().max(listRoutesResponseVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listRoutesResponseVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(listRoutesResponseVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(listRoutesResponseVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(listRoutesResponseVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listRoutesResponseVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "name": zod.string().max(listRoutesResponseFolderNameMax).describe('名前'),
  "code": zod.string().max(listRoutesResponseFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(listRoutesResponseFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(listRoutesResponseFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(listRoutesResponseFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ')
}).describe('経路')
export const listRoutesResponse = zod.array(listRoutesResponseItem)

/**
 * 指定した経路を取得します。
 * @summary 経路を取得
 */
export const getRoutePathRouteIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const getRouteParams = zod.object({
  "routeId": zod.string().regex(getRoutePathRouteIdRegExp).describe('経路のUUIDまたはコード')
})

export const getRouteResponseAuthorEmailMax = 254;

export const getRouteResponseAuthorCodeMax = 100;

export const getRouteResponseAuthorFirstNameMax = 255;

export const getRouteResponseAuthorLastNameMax = 255;

export const getRouteResponseAuthorFullNameMax = 255;

export const getRouteResponseAuthorEmployeeIdMax = 30;

export const getRouteResponseVersionAuthorEmailMax = 254;

export const getRouteResponseVersionAuthorCodeMax = 100;

export const getRouteResponseVersionAuthorFirstNameMax = 255;

export const getRouteResponseVersionAuthorLastNameMax = 255;

export const getRouteResponseVersionAuthorFullNameMax = 255;

export const getRouteResponseVersionAuthorEmployeeIdMax = 30;

export const getRouteResponseFolderNameMax = 300;

export const getRouteResponseFolderCodeMax = 100;

export const getRouteResponseFolderWorkflowsCountMin = 0;

export const getRouteResponseFolderRoutesCountMin = 0;

export const getRouteResponseFolderPipelinesCountMin = 0;

export const getRouteResponseStepsItemMinCustomAssigneesMin = 0;

export const getRouteResponseStepsItemUsersItemEmailMax = 254;

export const getRouteResponseStepsItemUsersItemCodeMax = 100;

export const getRouteResponseStepsItemUsersItemFirstNameMax = 255;

export const getRouteResponseStepsItemUsersItemLastNameMax = 255;

export const getRouteResponseStepsItemUsersItemFullNameMax = 255;

export const getRouteResponseStepsItemUsersItemEmployeeIdMax = 30;

export const getRouteResponseStepsItemTargetsItemTeamNameMax = 300;

export const getRouteResponseStepsItemTargetsItemTeamCodeMax = 100;

export const getRouteResponseStepsItemTargetsItemTeamNotesMax = 10000;

export const getRouteResponseStepsItemTargetsItemTeamUsersCountMin = 0;

export const getRouteResponseStepsItemTargetsItemGradesItemNameMax = 300;

export const getRouteResponseStepsItemTargetsItemGradesItemLevelMin = 0;
export const getRouteResponseStepsItemTargetsItemGradesItemLevelMax = 255;

export const getRouteResponseStepsItemTargetsItemGradesItemCodeMax = 100;

export const getRouteResponseStepsItemTargetsItemGradesItemIsDefaultDefault = false;export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeNameMax = 300;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeLevelMin = 0;
export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeLevelMax = 255;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeCodeMax = 100;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeIsDefaultDefault = false;export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamNameMax = 300;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamCodeMax = 100;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamNotesMax = 10000;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamUsersCountMin = 0;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemCodeMax = 100;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemNameMax = 100;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemInputsItemFieldTitleMax = 300;

export const getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemInputsItemFieldCodeMax = 100;



export const getRouteResponse = zod.object({
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
  "email": zod.email().max(getRouteResponseAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getRouteResponseAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(getRouteResponseAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(getRouteResponseAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(getRouteResponseAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getRouteResponseAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "email": zod.email().max(getRouteResponseVersionAuthorEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getRouteResponseVersionAuthorCodeMax).describe('コード'),
  "firstName": zod.string().max(getRouteResponseVersionAuthorFirstNameMax).describe('名'),
  "lastName": zod.string().max(getRouteResponseVersionAuthorLastNameMax).describe('姓'),
  "fullName": zod.string().max(getRouteResponseVersionAuthorFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getRouteResponseVersionAuthorEmployeeIdMax).nullish().describe('社員番号'),
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
  "name": zod.string().max(getRouteResponseFolderNameMax).describe('名前'),
  "code": zod.string().max(getRouteResponseFolderCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getRouteResponseFolderWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getRouteResponseFolderRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getRouteResponseFolderPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').describe('フォルダ')
}).describe('経路').and(zod.object({
  "steps": zod.array(zod.object({
  "id": zod.string().describe('UUID'),
  "stepOrder": zod.number().describe('ステップ順序（1から始まります）'),
  "stepType": zod.enum(['author', 'manager', 'team', 'user', 'author_customizable', 'assignee_customizable', 'dynamic_team', 'dynamic_user']).describe('ステップのタイプ'),
  "title": zod.string().describe('タイトル'),
  "actionType": zod.enum(['approve', 'confirm', 'none']).describe('アクションタイプ。承認\/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。'),
  "instruction": zod.string().nullable().describe('承認者への指示'),
  "requiredApprovalsNumber": zod.number().describe('必要な承認人数'),
  "requiredApprovalsPercent": zod.number().describe('必要な承認割合（%）'),
  "fallbackType": zod.union([zod.enum(['direct_manager', 'higher_manager', 'skip', 'no_fallback', 'higher_team']),zod.null()]).describe('フォールバックのタイプ'),
  "allowSelfApproval": zod.boolean().describe('自己承認を許可するか'),
  "minCustomAssignees": zod.number().min(getRouteResponseStepsItemMinCustomAssigneesMin).nullable().describe('最小指名人数。「申請者が指名」ステップのみ設定可能。'),
  "approverAssignmentInstruction": zod.string().nullable().describe('承認者の選び方'),
  "users": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getRouteResponseStepsItemUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getRouteResponseStepsItemUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(getRouteResponseStepsItemUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(getRouteResponseStepsItemUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(getRouteResponseStepsItemUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getRouteResponseStepsItemUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('承認者の指定に使うユーザーの配列'),
  "targets": zod.array(zod.object({
  "team": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRouteResponseStepsItemTargetsItemTeamNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getRouteResponseStepsItemTargetsItemTeamCodeMax).describe('コード'),
  "notes": zod.string().max(getRouteResponseStepsItemTargetsItemTeamNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getRouteResponseStepsItemTargetsItemTeamUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).optional().describe('チーム'),
  "descendants": zod.boolean().optional().describe('stepType=author_customizableまたはstepType=assignee_customizableの場合に、指定したチームの下位チームのメンバーも承認者候補に含めるかどうか（true: 含める、false: 含めない）'),
  "gradeSymbol": zod.enum(['equal', 'greater_than', 'greater_than_or_equal', 'less_than', 'less_than_or_equal', 'any_of']).optional().describe('役職の比較条件。役職が指定されているときのみ値が入ります。'),
  "grades": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRouteResponseStepsItemTargetsItemGradesItemNameMax).describe('名前'),
  "level": zod.number().min(getRouteResponseStepsItemTargetsItemGradesItemLevelMin).max(getRouteResponseStepsItemTargetsItemGradesItemLevelMax).describe('レベル'),
  "code": zod.string().max(getRouteResponseStepsItemTargetsItemGradesItemCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職')).optional().describe('承認者の指定に使う役職の配列'),
  "variable": zod.string().optional().describe('承認者タイプ「チームを動的に指定」または「ユーザーを動的に指定」で指定する変数名が入ります。')
})).optional().describe('承認者の指定に使うチームと役職の条件'),
  "routeStepCondition": zod.union([zod.object({
  "id": zod.uuid().optional().describe('UUID'),
  "conditionType": zod.enum(['always', 'conditional', 'conditional_skip']).optional().describe('実行タイプ'),
  "combinationType": zod.enum(['all', 'any']).optional().describe('条件の組み合わせタイプ'),
  "routeStepConditionFields": zod.union([zod.object({
  "id": zod.uuid().optional().describe('UUID'),
  "variable": zod.string().optional().describe('変数'),
  "fieldKey": zod.enum(['author_grade', 'author_team', 'text_variable', 'number_variable', 'checkbox_variable', 'general_master_variable', 'other_variable']).optional().describe('変数のフィールド'),
  "symbol": zod.enum(['equal', 'not_equal', 'greater_than', 'greater_than_or_equal', 'less_than', 'less_than_or_equal', 'include', 'exclude', 'is_empty', 'is_not_empty', 'descendants_or_equal', 'not_descendants_or_equal']).optional().describe('演算子'),
  "value": zod.string().optional().describe('しきい値'),
  "grade": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeNameMax).describe('名前'),
  "level": zod.number().min(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeLevelMin).max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeLevelMax).describe('レベル'),
  "code": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGradeCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職').optional().describe('しきい値として使う役職'),
  "team": zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamCodeMax).describe('コード'),
  "notes": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsTeamUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム').optional().describe('しきい値として使うチーム'),
  "generalMasterItem": zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemCodeMax).describe('コード'),
  "name": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemNameMax).describe('名前'),
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
  "title": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getRouteResponseStepsItemRouteStepConditionRouteStepConditionFieldsGeneralMasterItemInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム').optional().describe('しきい値として使う汎用マスタアイテム')
}).describe('ステップごとに設定できる実行条件の詳細'),zod.object({

})]).optional()
}).describe('ステップごとに設定できる実行条件'),zod.null()]).optional(),
  "code": zod.string().describe('コード')
}).describe('経路ステップ')).describe('経路ステップ')
})).describe('経路の詳細情報')

