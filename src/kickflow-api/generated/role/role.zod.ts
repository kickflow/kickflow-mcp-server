import * as zod from 'zod';


/**
 * 管理者ロールの一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールの一覧を取得
 */
export const listRolesQueryPageDefault = 1;

export const listRolesQueryPerPageDefault = 25;
export const listRolesQueryPerPageMax = 100;

export const listRolesQuerySortByRegExp = new RegExp('^(createdAt|name)(-asc|-desc)?$');


export const ListRolesQueryParams = zod.object({
  "page": zod.number().min(1).default(listRolesQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listRolesQueryPerPageMax).default(listRolesQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listRolesQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name')
})

export const listRolesResponseNameMax = 300;

export const listRolesResponseUsersCountMin = 0;



export const ListRolesResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listRolesResponseNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(listRolesResponseUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール')
export const ListRolesResponse = zod.array(ListRolesResponseItem)

/**
 * 管理者ロールを作成します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを作成
 */
export const CreateRoleBody = zod.object({
  "name": zod.string().describe('名前'),
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象を制限する場合true'),
  "folderIds": zod.array(zod.uuid()).optional().describe('管理対象のフォルダID'),
  "generalMasterIds": zod.array(zod.uuid()).optional().describe('管理対象の汎用マスタID'),
  "teamIds": zod.array(zod.uuid()).optional().describe('管理対象のチームID')
})).describe('権限リスト')
}).describe('管理者ロールを作成するときのrequest body')

export const createRoleResponseOneNameMax = 300;

export const createRoleResponseOneUsersCountMin = 0;

export const createRoleResponseTwoPermissionListItemFoldersItemNameMax = 300;

export const createRoleResponseTwoPermissionListItemFoldersItemCodeMax = 100;

export const createRoleResponseTwoPermissionListItemFoldersItemWorkflowsCountMin = 0;

export const createRoleResponseTwoPermissionListItemFoldersItemRoutesCountMin = 0;

export const createRoleResponseTwoPermissionListItemFoldersItemPipelinesCountMin = 0;

export const createRoleResponseTwoPermissionListItemGeneralMastersItemCodeMax = 100;

export const createRoleResponseTwoPermissionListItemGeneralMastersItemNameMax = 300;

export const createRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemTitleMax = 300;

export const createRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemCodeMax = 100;

export const createRoleResponseTwoPermissionListItemTeamsItemNameMax = 300;

export const createRoleResponseTwoPermissionListItemTeamsItemCodeMax = 100;

export const createRoleResponseTwoPermissionListItemTeamsItemNotesMax = 10000;

export const createRoleResponseTwoPermissionListItemTeamsItemUsersCountMin = 0;



export const CreateRoleResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createRoleResponseOneNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(createRoleResponseOneUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール').and(zod.object({
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象が制限されている場合true'),
  "folders": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createRoleResponseTwoPermissionListItemFoldersItemNameMax).describe('名前'),
  "code": zod.string().max(createRoleResponseTwoPermissionListItemFoldersItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createRoleResponseTwoPermissionListItemFoldersItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createRoleResponseTwoPermissionListItemFoldersItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createRoleResponseTwoPermissionListItemFoldersItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).describe('管理対象のフォルダ'),
  "generalMasters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(createRoleResponseTwoPermissionListItemGeneralMastersItemCodeMax).describe('コード'),
  "name": zod.string().max(createRoleResponseTwoPermissionListItemGeneralMastersItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(createRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(createRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')).describe('管理対象の汎用マスタ'),
  "teams": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createRoleResponseTwoPermissionListItemTeamsItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(createRoleResponseTwoPermissionListItemTeamsItemCodeMax).describe('コード'),
  "notes": zod.string().max(createRoleResponseTwoPermissionListItemTeamsItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(createRoleResponseTwoPermissionListItemTeamsItemUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')).describe('管理対象のチーム')
})).describe('権限のリスト')
})).describe('管理者ロールの詳細')

/**
 * 管理者ロールを一件取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを取得
 */
export const GetRoleParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const getRoleResponseOneNameMax = 300;

export const getRoleResponseOneUsersCountMin = 0;

export const getRoleResponseTwoPermissionListItemFoldersItemNameMax = 300;

export const getRoleResponseTwoPermissionListItemFoldersItemCodeMax = 100;

export const getRoleResponseTwoPermissionListItemFoldersItemWorkflowsCountMin = 0;

export const getRoleResponseTwoPermissionListItemFoldersItemRoutesCountMin = 0;

export const getRoleResponseTwoPermissionListItemFoldersItemPipelinesCountMin = 0;

export const getRoleResponseTwoPermissionListItemGeneralMastersItemCodeMax = 100;

export const getRoleResponseTwoPermissionListItemGeneralMastersItemNameMax = 300;

export const getRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemTitleMax = 300;

export const getRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemCodeMax = 100;

export const getRoleResponseTwoPermissionListItemTeamsItemNameMax = 300;

export const getRoleResponseTwoPermissionListItemTeamsItemCodeMax = 100;

export const getRoleResponseTwoPermissionListItemTeamsItemNotesMax = 10000;

export const getRoleResponseTwoPermissionListItemTeamsItemUsersCountMin = 0;



export const GetRoleResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRoleResponseOneNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(getRoleResponseOneUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール').and(zod.object({
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象が制限されている場合true'),
  "folders": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRoleResponseTwoPermissionListItemFoldersItemNameMax).describe('名前'),
  "code": zod.string().max(getRoleResponseTwoPermissionListItemFoldersItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getRoleResponseTwoPermissionListItemFoldersItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getRoleResponseTwoPermissionListItemFoldersItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getRoleResponseTwoPermissionListItemFoldersItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).describe('管理対象のフォルダ'),
  "generalMasters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getRoleResponseTwoPermissionListItemGeneralMastersItemCodeMax).describe('コード'),
  "name": zod.string().max(getRoleResponseTwoPermissionListItemGeneralMastersItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')).describe('管理対象の汎用マスタ'),
  "teams": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRoleResponseTwoPermissionListItemTeamsItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getRoleResponseTwoPermissionListItemTeamsItemCodeMax).describe('コード'),
  "notes": zod.string().max(getRoleResponseTwoPermissionListItemTeamsItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getRoleResponseTwoPermissionListItemTeamsItemUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')).describe('管理対象のチーム')
})).describe('権限のリスト')
})).describe('管理者ロールの詳細')

/**
 * 管理者ロールを更新します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを更新
 */
export const UpdateRoleParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const UpdateRoleBody = zod.object({
  "name": zod.string().optional().describe('名前'),
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象を制限する場合true'),
  "folderIds": zod.array(zod.uuid()).optional().describe('管理対象のフォルダID'),
  "generalMasterIds": zod.array(zod.uuid()).optional().describe('管理対象の汎用マスタID'),
  "teamIds": zod.array(zod.uuid()).optional().describe('管理対象のチームID')
})).optional().describe('権限リスト')
}).describe('管理者ロールを更新するときのrequest body')

export const updateRoleResponseOneNameMax = 300;

export const updateRoleResponseOneUsersCountMin = 0;

export const updateRoleResponseTwoPermissionListItemFoldersItemNameMax = 300;

export const updateRoleResponseTwoPermissionListItemFoldersItemCodeMax = 100;

export const updateRoleResponseTwoPermissionListItemFoldersItemWorkflowsCountMin = 0;

export const updateRoleResponseTwoPermissionListItemFoldersItemRoutesCountMin = 0;

export const updateRoleResponseTwoPermissionListItemFoldersItemPipelinesCountMin = 0;

export const updateRoleResponseTwoPermissionListItemGeneralMastersItemCodeMax = 100;

export const updateRoleResponseTwoPermissionListItemGeneralMastersItemNameMax = 300;

export const updateRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemTitleMax = 300;

export const updateRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemCodeMax = 100;

export const updateRoleResponseTwoPermissionListItemTeamsItemNameMax = 300;

export const updateRoleResponseTwoPermissionListItemTeamsItemCodeMax = 100;

export const updateRoleResponseTwoPermissionListItemTeamsItemNotesMax = 10000;

export const updateRoleResponseTwoPermissionListItemTeamsItemUsersCountMin = 0;



export const UpdateRoleResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateRoleResponseOneNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(updateRoleResponseOneUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール').and(zod.object({
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象が制限されている場合true'),
  "folders": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateRoleResponseTwoPermissionListItemFoldersItemNameMax).describe('名前'),
  "code": zod.string().max(updateRoleResponseTwoPermissionListItemFoldersItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateRoleResponseTwoPermissionListItemFoldersItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateRoleResponseTwoPermissionListItemFoldersItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateRoleResponseTwoPermissionListItemFoldersItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).describe('管理対象のフォルダ'),
  "generalMasters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(updateRoleResponseTwoPermissionListItemGeneralMastersItemCodeMax).describe('コード'),
  "name": zod.string().max(updateRoleResponseTwoPermissionListItemGeneralMastersItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(updateRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(updateRoleResponseTwoPermissionListItemGeneralMastersItemFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')).describe('管理対象の汎用マスタ'),
  "teams": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateRoleResponseTwoPermissionListItemTeamsItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(updateRoleResponseTwoPermissionListItemTeamsItemCodeMax).describe('コード'),
  "notes": zod.string().max(updateRoleResponseTwoPermissionListItemTeamsItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(updateRoleResponseTwoPermissionListItemTeamsItemUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')).describe('管理対象のチーム')
})).describe('権限のリスト')
})).describe('管理者ロールの詳細')

/**
 * 管理者ロールを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを削除
 */
export const DeleteRoleParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

/**
 * 管理者ロールにメンバーを追加します。最大10人まで複数のメンバーを同時に追加可能です。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールにメンバーを追加
 */
export const CreateRoleMembersParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const createRoleMembersBodyUserIdsMax = 10;



export const CreateRoleMembersBody = zod.object({
  "userIds": zod.array(zod.uuid()).min(1).max(createRoleMembersBodyUserIdsMax).describe('ユーザーUUIDの配列')
})

/**
 * 管理者ロールのメンバー一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールのメンバー一覧を取得
 */
export const ListRoleMembersParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const listRoleMembersQueryPageDefault = 1;

export const listRoleMembersQueryPerPageDefault = 25;
export const listRoleMembersQueryPerPageMax = 100;



export const ListRoleMembersQueryParams = zod.object({
  "page": zod.number().min(1).default(listRoleMembersQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listRoleMembersQueryPerPageMax).default(listRoleMembersQueryPerPageDefault).describe('1ページあたりの件数')
})

export const listRoleMembersResponseEmailMax = 254;

export const listRoleMembersResponseCodeMax = 100;

export const listRoleMembersResponseFirstNameMax = 255;

export const listRoleMembersResponseLastNameMax = 255;

export const listRoleMembersResponseFullNameMax = 255;

export const listRoleMembersResponseEmployeeIdMax = 30;



export const ListRoleMembersResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listRoleMembersResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listRoleMembersResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(listRoleMembersResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(listRoleMembersResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(listRoleMembersResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listRoleMembersResponseEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')
export const ListRoleMembersResponse = zod.array(ListRoleMembersResponseItem)

/**
 * 管理者ロールからメンバーを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールからメンバーを削除
 */
export const DeleteRoleMemberParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID'),
  "userId": zod.string().describe('ユーザーのUUIDまたはコード')
})

