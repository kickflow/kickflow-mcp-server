import * as zod from 'zod';


/**
 * 指定した組織図内のチーム一覧を取得します。

parentIdを指定した場合は指定した親チームの配下チームの一覧を、parentIdを指定しない場合は組織図内のルートのチーム一覧を返します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チーム一覧を取得
 */
export const listTeamsParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID')
})

export const listTeamsQueryPageDefault = 1;

export const listTeamsQueryPerPageDefault = 25;
export const listTeamsQueryPerPageMax = 100;



export const listTeamsQueryParams = zod.object({
  "parentId": zod.string().optional().describe('親チームのUUID'),
  "page": zod.number().min(1).default(listTeamsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listTeamsQueryPerPageMax).default(listTeamsQueryPerPageDefault).describe('1ページあたりの件数')
})

export const listTeamsResponseNameMax = 300;

export const listTeamsResponseCodeMax = 100;

export const listTeamsResponseNotesMax = 10000;

export const listTeamsResponseUsersCountMin = 0;



export const listTeamsResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listTeamsResponseNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(listTeamsResponseCodeMax).describe('コード'),
  "notes": zod.string().max(listTeamsResponseNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(listTeamsResponseUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')
export const listTeamsResponse = zod.array(listTeamsResponseItem)

/**
 * 指定した組織図内にチームを作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを作成
 */
export const createTeamParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID')
})

export const createTeamBody = zod.object({
  "name": zod.string().describe('名前'),
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "notes": zod.string().nullish().describe('管理用メモ'),
  "parentId": zod.uuid().optional().describe('親チームのUUID。nullの場合、作成したチームはルートになります。'),
  "approveOnly": zod.boolean().optional().describe('承認専用チームかどうか')
}).describe('チームを作成するときのrequest body')

export const createTeamResponseNameMax = 300;

export const createTeamResponseCodeMax = 100;

export const createTeamResponseNotesMax = 10000;

export const createTeamResponseUsersCountMin = 0;

export const createTeamResponseParentNameMax = 300;

export const createTeamResponseParentCodeMax = 100;

export const createTeamResponseParentNotesMax = 10000;

export const createTeamResponseParentUsersCountMin = 0;

export const createTeamResponseChildrenItemNameMax = 300;

export const createTeamResponseChildrenItemCodeMax = 100;

export const createTeamResponseChildrenItemNotesMax = 10000;

export const createTeamResponseChildrenItemUsersCountMin = 0;

export const createTeamResponseUsersItemGradesItemNameMax = 300;

export const createTeamResponseUsersItemGradesItemLevelMin = 0;
export const createTeamResponseUsersItemGradesItemLevelMax = 255;

export const createTeamResponseUsersItemGradesItemCodeMax = 100;

export const createTeamResponseUsersItemGradesItemIsDefaultDefault = false;
export const createTeamResponseUsersItemEmailMax = 254;

export const createTeamResponseUsersItemCodeMax = 100;

export const createTeamResponseUsersItemFirstNameMax = 255;

export const createTeamResponseUsersItemLastNameMax = 255;

export const createTeamResponseUsersItemFullNameMax = 255;

export const createTeamResponseUsersItemEmployeeIdMax = 30;



export const createTeamResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createTeamResponseNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(createTeamResponseCodeMax).describe('コード'),
  "notes": zod.string().max(createTeamResponseNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(createTeamResponseUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム').and(zod.object({
  "parent": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createTeamResponseParentNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(createTeamResponseParentCodeMax).describe('コード'),
  "notes": zod.string().max(createTeamResponseParentNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(createTeamResponseParentUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム'),zod.null()]).optional().describe('親チーム'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createTeamResponseChildrenItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(createTeamResponseChildrenItemCodeMax).describe('コード'),
  "notes": zod.string().max(createTeamResponseChildrenItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(createTeamResponseChildrenItemUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')).describe('子チーム'),
  "users": zod.array(zod.object({
  "grades": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createTeamResponseUsersItemGradesItemNameMax).describe('名前'),
  "level": zod.number().min(createTeamResponseUsersItemGradesItemLevelMin).max(createTeamResponseUsersItemGradesItemLevelMax).describe('レベル'),
  "code": zod.string().max(createTeamResponseUsersItemGradesItemCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職')).min(1).describe('役職'),
  "leader": zod.boolean().describe('上長かどうか')
}).and(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createTeamResponseUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createTeamResponseUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(createTeamResponseUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(createTeamResponseUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(createTeamResponseUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createTeamResponseUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('チームの所属メンバー')).describe('メンバーの配列。\n\n注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。')
})).describe('チームの詳細')

/**
 * チームを一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを取得
 */
export const getTeamParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード')
})

export const getTeamResponseNameMax = 300;

export const getTeamResponseCodeMax = 100;

export const getTeamResponseNotesMax = 10000;

export const getTeamResponseUsersCountMin = 0;

export const getTeamResponseParentNameMax = 300;

export const getTeamResponseParentCodeMax = 100;

export const getTeamResponseParentNotesMax = 10000;

export const getTeamResponseParentUsersCountMin = 0;

export const getTeamResponseChildrenItemNameMax = 300;

export const getTeamResponseChildrenItemCodeMax = 100;

export const getTeamResponseChildrenItemNotesMax = 10000;

export const getTeamResponseChildrenItemUsersCountMin = 0;

export const getTeamResponseUsersItemGradesItemNameMax = 300;

export const getTeamResponseUsersItemGradesItemLevelMin = 0;
export const getTeamResponseUsersItemGradesItemLevelMax = 255;

export const getTeamResponseUsersItemGradesItemCodeMax = 100;

export const getTeamResponseUsersItemGradesItemIsDefaultDefault = false;
export const getTeamResponseUsersItemEmailMax = 254;

export const getTeamResponseUsersItemCodeMax = 100;

export const getTeamResponseUsersItemFirstNameMax = 255;

export const getTeamResponseUsersItemLastNameMax = 255;

export const getTeamResponseUsersItemFullNameMax = 255;

export const getTeamResponseUsersItemEmployeeIdMax = 30;



export const getTeamResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getTeamResponseNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getTeamResponseCodeMax).describe('コード'),
  "notes": zod.string().max(getTeamResponseNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getTeamResponseUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム').and(zod.object({
  "parent": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getTeamResponseParentNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getTeamResponseParentCodeMax).describe('コード'),
  "notes": zod.string().max(getTeamResponseParentNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getTeamResponseParentUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム'),zod.null()]).optional().describe('親チーム'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getTeamResponseChildrenItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(getTeamResponseChildrenItemCodeMax).describe('コード'),
  "notes": zod.string().max(getTeamResponseChildrenItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(getTeamResponseChildrenItemUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')).describe('子チーム'),
  "users": zod.array(zod.object({
  "grades": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getTeamResponseUsersItemGradesItemNameMax).describe('名前'),
  "level": zod.number().min(getTeamResponseUsersItemGradesItemLevelMin).max(getTeamResponseUsersItemGradesItemLevelMax).describe('レベル'),
  "code": zod.string().max(getTeamResponseUsersItemGradesItemCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職')).min(1).describe('役職'),
  "leader": zod.boolean().describe('上長かどうか')
}).and(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getTeamResponseUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getTeamResponseUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(getTeamResponseUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(getTeamResponseUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(getTeamResponseUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getTeamResponseUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('チームの所属メンバー')).describe('メンバーの配列。\n\n注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。')
})).describe('チームの詳細')

/**
 * チームを更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを編集
 */
export const updateTeamParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード')
})

export const updateTeamBody = zod.object({
  "name": zod.string().optional().describe('名前'),
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "notes": zod.string().optional().describe('管理用メモ'),
  "parentId": zod.uuid().optional().describe('親チームのID'),
  "approveOnly": zod.boolean().optional().describe('承認専用チームかどうか')
}).describe('チームを更新するときのrequest body')

export const updateTeamResponseNameMax = 300;

export const updateTeamResponseCodeMax = 100;

export const updateTeamResponseNotesMax = 10000;

export const updateTeamResponseUsersCountMin = 0;

export const updateTeamResponseParentNameMax = 300;

export const updateTeamResponseParentCodeMax = 100;

export const updateTeamResponseParentNotesMax = 10000;

export const updateTeamResponseParentUsersCountMin = 0;

export const updateTeamResponseChildrenItemNameMax = 300;

export const updateTeamResponseChildrenItemCodeMax = 100;

export const updateTeamResponseChildrenItemNotesMax = 10000;

export const updateTeamResponseChildrenItemUsersCountMin = 0;

export const updateTeamResponseUsersItemGradesItemNameMax = 300;

export const updateTeamResponseUsersItemGradesItemLevelMin = 0;
export const updateTeamResponseUsersItemGradesItemLevelMax = 255;

export const updateTeamResponseUsersItemGradesItemCodeMax = 100;

export const updateTeamResponseUsersItemGradesItemIsDefaultDefault = false;
export const updateTeamResponseUsersItemEmailMax = 254;

export const updateTeamResponseUsersItemCodeMax = 100;

export const updateTeamResponseUsersItemFirstNameMax = 255;

export const updateTeamResponseUsersItemLastNameMax = 255;

export const updateTeamResponseUsersItemFullNameMax = 255;

export const updateTeamResponseUsersItemEmployeeIdMax = 30;



export const updateTeamResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateTeamResponseNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(updateTeamResponseCodeMax).describe('コード'),
  "notes": zod.string().max(updateTeamResponseNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(updateTeamResponseUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム').and(zod.object({
  "parent": zod.union([zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateTeamResponseParentNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(updateTeamResponseParentCodeMax).describe('コード'),
  "notes": zod.string().max(updateTeamResponseParentNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(updateTeamResponseParentUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム'),zod.null()]).optional().describe('親チーム'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateTeamResponseChildrenItemNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(updateTeamResponseChildrenItemCodeMax).describe('コード'),
  "notes": zod.string().max(updateTeamResponseChildrenItemNotesMax).nullish().describe('管理用メモ'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(updateTeamResponseChildrenItemUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('チーム')).describe('子チーム'),
  "users": zod.array(zod.object({
  "grades": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateTeamResponseUsersItemGradesItemNameMax).describe('名前'),
  "level": zod.number().min(updateTeamResponseUsersItemGradesItemLevelMin).max(updateTeamResponseUsersItemGradesItemLevelMax).describe('レベル'),
  "code": zod.string().max(updateTeamResponseUsersItemGradesItemCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職')).min(1).describe('役職'),
  "leader": zod.boolean().describe('上長かどうか')
}).and(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(updateTeamResponseUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(updateTeamResponseUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(updateTeamResponseUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(updateTeamResponseUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(updateTeamResponseUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(updateTeamResponseUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('チームの所属メンバー')).describe('メンバーの配列。\n\n注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。')
})).describe('チームの詳細')

/**
 * チームを削除します。同時に、このチームの所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを削除
 */
export const deleteTeamParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード')
})

/**
 * チームのメンバー一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームのメンバー一覧を取得
 */
export const listTeamMembersParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード')
})

export const listTeamMembersQueryPageDefault = 1;

export const listTeamMembersQueryPerPageDefault = 25;
export const listTeamMembersQueryPerPageMax = 100;



export const listTeamMembersQueryParams = zod.object({
  "page": zod.number().min(1).default(listTeamMembersQueryPageDefault).describe('ページ。1が先頭のページ。'),
  "perPage": zod.number().min(1).max(listTeamMembersQueryPerPageMax).default(listTeamMembersQueryPerPageDefault).describe('1ページあたりの件数')
})

export const listTeamMembersResponseGradesItemNameMax = 300;

export const listTeamMembersResponseGradesItemLevelMin = 0;
export const listTeamMembersResponseGradesItemLevelMax = 255;

export const listTeamMembersResponseGradesItemCodeMax = 100;

export const listTeamMembersResponseGradesItemIsDefaultDefault = false;
export const listTeamMembersResponseEmailMax = 254;

export const listTeamMembersResponseCodeMax = 100;

export const listTeamMembersResponseFirstNameMax = 255;

export const listTeamMembersResponseLastNameMax = 255;

export const listTeamMembersResponseFullNameMax = 255;

export const listTeamMembersResponseEmployeeIdMax = 30;



export const listTeamMembersResponseItem = zod.object({
  "grades": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listTeamMembersResponseGradesItemNameMax).describe('名前'),
  "level": zod.number().min(listTeamMembersResponseGradesItemLevelMin).max(listTeamMembersResponseGradesItemLevelMax).describe('レベル'),
  "code": zod.string().max(listTeamMembersResponseGradesItemCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('役職')).min(1).describe('役職'),
  "leader": zod.boolean().describe('上長かどうか')
}).and(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listTeamMembersResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listTeamMembersResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(listTeamMembersResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(listTeamMembersResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(listTeamMembersResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listTeamMembersResponseEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('チームの所属メンバー')
export const listTeamMembersResponse = zod.array(listTeamMembersResponseItem)

/**
 * 指定したチームにメンバーを追加します。最大10人まで同時に追加可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームにメンバーを追加
 */
export const createTeamMembersParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード')
})


export const createTeamMembersBodyUsersMax = 10;



export const createTeamMembersBody = zod.object({
  "users": zod.array(zod.object({
  "id": zod.uuid().describe('ユーザーのUUID'),
  "leader": zod.boolean().describe('上長の場合、true'),
  "gradeIds": zod.array(zod.uuid()).min(1).optional().describe('役職のUUID')
})).min(1).max(createTeamMembersBodyUsersMax).describe('メンバーに追加したいユーザー情報の配列')
})

/**
 * 指定したチームからメンバーを削除します。最大10人まで同時に削除可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: 削除後もメンバーが残る場合、チームに上長は最低一人必要です。メンバー削除によって上長が不在になる場合、APIは422 Unprocessable Contentを返します。
 * @summary チームからメンバーを削除
 */
export const deleteTeamMembersParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード')
})

export const deleteTeamMembersBodyUserIdsMax = 10;



export const deleteTeamMembersBody = zod.object({
  "userIds": zod.array(zod.uuid()).min(1).max(deleteTeamMembersBodyUserIdsMax).describe('ユーザーのUUIDの配列')
})

/**
 * 指定したメンバーを更新します。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人は必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームのメンバーを更新
 */
export const updateTeamMemberParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID'),
  "teamId": zod.string().describe('チームのUUIDまたはコード'),
  "userId": zod.string().describe('ユーザーのUUIDまたはコード')
})




export const updateTeamMemberBody = zod.object({
  "leader": zod.boolean().describe('上長の場合、true'),
  "gradeIds": zod.array(zod.uuid()).min(1).describe('役職のUUID')
})

