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


export const listRolesQueryParams = zod.object({
  "page": zod.number().min(1).default(listRolesQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listRolesQueryPerPageMax).default(listRolesQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listRolesQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name')
})

export const listRolesResponseNameMax = 300;

export const listRolesResponseUsersCountMin = 0;



export const listRolesResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listRolesResponseNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(listRolesResponseUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール')
export const listRolesResponse = zod.array(listRolesResponseItem)

/**
 * 管理者ロールを作成します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを作成
 */
export const createRoleBody = zod.object({
  "name": zod.string().describe('名前'),
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象を制限する場合true'),
  "folderIds": zod.array(zod.uuid()).optional().describe('管理対象のフォルダID'),
  "generalMasterIds": zod.array(zod.uuid()).optional().describe('管理対象の汎用マスタID'),
  "teamIds": zod.array(zod.uuid()).optional().describe('管理対象のチームID')
})).describe('権限リスト')
}).describe('管理者ロールを作成するときのrequest body')

export const createRoleResponseNameMax = 300;

export const createRoleResponseUsersCountMin = 0;

export const createRoleResponsePermissionListItemFoldersItemNameMax = 300;

export const createRoleResponsePermissionListItemFoldersItemCodeMax = 100;

export const createRoleResponsePermissionListItemFoldersItemWorkflowsCountMin = 0;

export const createRoleResponsePermissionListItemFoldersItemRoutesCountMin = 0;

export const createRoleResponsePermissionListItemFoldersItemPipelinesCountMin = 0;

export const createRoleResponsePermissionListItemGeneralMastersItemCodeMax = 100;

export const createRoleResponsePermissionListItemGeneralMastersItemNameMax = 300;

export const createRoleResponsePermissionListItemGeneralMastersItemFieldsItemTitleMax = 300;

export const createRoleResponsePermissionListItemGeneralMastersItemFieldsItemCodeMax = 100;

export const createRoleResponsePermissionListItemTeamsItemNameMax = 300;

export const createRoleResponsePermissionListItemTeamsItemCodeMax = 100;

export const createRoleResponsePermissionListItemTeamsItemNotesMax = 10000;

export const createRoleResponsePermissionListItemTeamsItemUsersCountMin = 0;



export const createRoleResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createRoleResponseNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(createRoleResponseUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール').and(zod.object({
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象が制限されている場合true'),
  "folders": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createRoleResponsePermissionListItemFoldersItemNameMax).describe('名前'),
  "code": zod.string().max(createRoleResponsePermissionListItemFoldersItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createRoleResponsePermissionListItemFoldersItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createRoleResponsePermissionListItemFoldersItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createRoleResponsePermissionListItemFoldersItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).describe('管理対象のフォルダ'),
  "generalMasters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(createRoleResponsePermissionListItemGeneralMastersItemCodeMax).describe('コード'),
  "name": zod.string().max(createRoleResponsePermissionListItemGeneralMastersItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(createRoleResponsePermissionListItemGeneralMastersItemFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(createRoleResponsePermissionListItemGeneralMastersItemFieldsItemCodeMax).describe('フィールドのコード'),
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
  "name": zod.string().max(createRoleResponsePermissionListItemTeamsItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(createRoleResponsePermissionListItemTeamsItemCodeMax).describe('コード'),
  "notes": zod.string().max(createRoleResponsePermissionListItemTeamsItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(createRoleResponsePermissionListItemTeamsItemUsersCountMin).describe('ユーザー数'),
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
export const getRoleParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const getRoleResponseNameMax = 300;

export const getRoleResponseUsersCountMin = 0;

export const getRoleResponsePermissionListItemFoldersItemNameMax = 300;

export const getRoleResponsePermissionListItemFoldersItemCodeMax = 100;

export const getRoleResponsePermissionListItemFoldersItemWorkflowsCountMin = 0;

export const getRoleResponsePermissionListItemFoldersItemRoutesCountMin = 0;

export const getRoleResponsePermissionListItemFoldersItemPipelinesCountMin = 0;

export const getRoleResponsePermissionListItemGeneralMastersItemCodeMax = 100;

export const getRoleResponsePermissionListItemGeneralMastersItemNameMax = 300;

export const getRoleResponsePermissionListItemGeneralMastersItemFieldsItemTitleMax = 300;

export const getRoleResponsePermissionListItemGeneralMastersItemFieldsItemCodeMax = 100;

export const getRoleResponsePermissionListItemTeamsItemNameMax = 300;

export const getRoleResponsePermissionListItemTeamsItemCodeMax = 100;

export const getRoleResponsePermissionListItemTeamsItemNotesMax = 10000;

export const getRoleResponsePermissionListItemTeamsItemUsersCountMin = 0;



export const getRoleResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRoleResponseNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(getRoleResponseUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール').and(zod.object({
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象が制限されている場合true'),
  "folders": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getRoleResponsePermissionListItemFoldersItemNameMax).describe('名前'),
  "code": zod.string().max(getRoleResponsePermissionListItemFoldersItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getRoleResponsePermissionListItemFoldersItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getRoleResponsePermissionListItemFoldersItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getRoleResponsePermissionListItemFoldersItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).describe('管理対象のフォルダ'),
  "generalMasters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getRoleResponsePermissionListItemGeneralMastersItemCodeMax).describe('コード'),
  "name": zod.string().max(getRoleResponsePermissionListItemGeneralMastersItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getRoleResponsePermissionListItemGeneralMastersItemFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getRoleResponsePermissionListItemGeneralMastersItemFieldsItemCodeMax).describe('フィールドのコード'),
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
  "name": zod.string().max(getRoleResponsePermissionListItemTeamsItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getRoleResponsePermissionListItemTeamsItemCodeMax).describe('コード'),
  "notes": zod.string().max(getRoleResponsePermissionListItemTeamsItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getRoleResponsePermissionListItemTeamsItemUsersCountMin).describe('ユーザー数'),
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
export const updateRoleParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const updateRoleBody = zod.object({
  "name": zod.string().optional().describe('名前'),
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象を制限する場合true'),
  "folderIds": zod.array(zod.uuid()).optional().describe('管理対象のフォルダID'),
  "generalMasterIds": zod.array(zod.uuid()).optional().describe('管理対象の汎用マスタID'),
  "teamIds": zod.array(zod.uuid()).optional().describe('管理対象のチームID')
})).optional().describe('権限リスト')
}).describe('管理者ロールを更新するときのrequest body')

export const updateRoleResponseNameMax = 300;

export const updateRoleResponseUsersCountMin = 0;

export const updateRoleResponsePermissionListItemFoldersItemNameMax = 300;

export const updateRoleResponsePermissionListItemFoldersItemCodeMax = 100;

export const updateRoleResponsePermissionListItemFoldersItemWorkflowsCountMin = 0;

export const updateRoleResponsePermissionListItemFoldersItemRoutesCountMin = 0;

export const updateRoleResponsePermissionListItemFoldersItemPipelinesCountMin = 0;

export const updateRoleResponsePermissionListItemGeneralMastersItemCodeMax = 100;

export const updateRoleResponsePermissionListItemGeneralMastersItemNameMax = 300;

export const updateRoleResponsePermissionListItemGeneralMastersItemFieldsItemTitleMax = 300;

export const updateRoleResponsePermissionListItemGeneralMastersItemFieldsItemCodeMax = 100;

export const updateRoleResponsePermissionListItemTeamsItemNameMax = 300;

export const updateRoleResponsePermissionListItemTeamsItemCodeMax = 100;

export const updateRoleResponsePermissionListItemTeamsItemNotesMax = 10000;

export const updateRoleResponsePermissionListItemTeamsItemUsersCountMin = 0;



export const updateRoleResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateRoleResponseNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(updateRoleResponseUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('管理者ロール').and(zod.object({
  "permissionList": zod.array(zod.object({
  "permission": zod.enum(['tenant', 'billing', 'integration', 'security', 'audit', 'stats', 'workflow', 'route', 'pipeline', 'workflow_misc', 'user', 'team', 'role', 'master', 'ticket_read', 'ticket_write', 'label', 'automation']).describe('権限タイプ'),
  "restricted": zod.boolean().describe('管理対象が制限されている場合true'),
  "folders": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateRoleResponsePermissionListItemFoldersItemNameMax).describe('名前'),
  "code": zod.string().max(updateRoleResponsePermissionListItemFoldersItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateRoleResponsePermissionListItemFoldersItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateRoleResponsePermissionListItemFoldersItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateRoleResponsePermissionListItemFoldersItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).describe('管理対象のフォルダ'),
  "generalMasters": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(updateRoleResponsePermissionListItemGeneralMastersItemCodeMax).describe('コード'),
  "name": zod.string().max(updateRoleResponsePermissionListItemGeneralMastersItemNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(updateRoleResponsePermissionListItemGeneralMastersItemFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(updateRoleResponsePermissionListItemGeneralMastersItemFieldsItemCodeMax).describe('フィールドのコード'),
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
  "name": zod.string().max(updateRoleResponsePermissionListItemTeamsItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(updateRoleResponsePermissionListItemTeamsItemCodeMax).describe('コード'),
  "notes": zod.string().max(updateRoleResponsePermissionListItemTeamsItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(updateRoleResponsePermissionListItemTeamsItemUsersCountMin).describe('ユーザー数'),
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
export const deleteRoleParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

/**
 * 管理者ロールにメンバーを追加します。最大10人まで複数のメンバーを同時に追加可能です。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールにメンバーを追加
 */
export const createRoleMembersParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const createRoleMembersBodyUserIdsMax = 10;



export const createRoleMembersBody = zod.object({
  "userIds": zod.array(zod.uuid()).min(1).max(createRoleMembersBodyUserIdsMax).describe('ユーザーUUIDの配列')
})

/**
 * 管理者ロールのメンバー一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールのメンバー一覧を取得
 */
export const listRoleMembersParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID')
})

export const listRoleMembersQueryPageDefault = 1;

export const listRoleMembersQueryPerPageDefault = 25;
export const listRoleMembersQueryPerPageMax = 100;



export const listRoleMembersQueryParams = zod.object({
  "page": zod.number().min(1).default(listRoleMembersQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listRoleMembersQueryPerPageMax).default(listRoleMembersQueryPerPageDefault).describe('1ページあたりの件数')
})

export const listRoleMembersResponseEmailMax = 254;

export const listRoleMembersResponseCodeMax = 100;

export const listRoleMembersResponseFirstNameMax = 255;

export const listRoleMembersResponseLastNameMax = 255;

export const listRoleMembersResponseFullNameMax = 255;

export const listRoleMembersResponseEmployeeIdMax = 30;



export const listRoleMembersResponseItem = zod.object({
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
export const listRoleMembersResponse = zod.array(listRoleMembersResponseItem)

/**
 * 管理者ロールからメンバーを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールからメンバーを削除
 */
export const deleteRoleMemberParams = zod.object({
  "roleId": zod.uuid().describe('管理者ロールのUUID'),
  "userId": zod.string().describe('ユーザーのUUIDまたはコード')
})

