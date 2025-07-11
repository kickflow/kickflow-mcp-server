/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * kickflow REST API v1
 * kickflowの開発者用REST API (v1)
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod';


/**
 * 現在のユーザーを取得します。
 * @summary 現在のユーザーを取得
 */
export const getCurrentUserResponseEmailMax = 255;
export const getCurrentUserResponseCodeMax = 255;
export const getCurrentUserResponseFirstNameMax = 255;
export const getCurrentUserResponseLastNameMax = 255;
export const getCurrentUserResponseFullNameMax = 255;
export const getCurrentUserResponseEmployeeIdMax = 255;


export const getCurrentUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(getCurrentUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getCurrentUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(getCurrentUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(getCurrentUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(getCurrentUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getCurrentUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー').describe('ユーザー詳細')

/**
 * ユーザー一覧を取得します。
 * @summary ユーザー一覧を取得
 */
export const listUsersQueryPageDefault = 1;export const listUsersQueryPerPageDefault = 25;
export const listUsersQueryPerPageMax = 100;
export const listUsersQuerySortByRegExp = new RegExp('^(email|code)(-asc|-desc)?$');


export const listUsersQueryParams = zod.object({
  "page": zod.number().min(1).default(listUsersQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listUsersQueryPerPageMax).default(listUsersQueryPerPageDefault).describe('1ページあたりの件数'),
  "status": zod.array(zod.enum(['invited', 'activated', 'suspended', 'deactivated'])).optional().describe('ステータスによる絞り込み'),
  "sortBy": zod.string().regex(listUsersQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: email, code')
})

export const listUsersResponseEmailMax = 255;
export const listUsersResponseCodeMax = 255;
export const listUsersResponseFirstNameMax = 255;
export const listUsersResponseLastNameMax = 255;
export const listUsersResponseFullNameMax = 255;
export const listUsersResponseEmployeeIdMax = 255;


export const listUsersResponseItem = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(listUsersResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listUsersResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(listUsersResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(listUsersResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(listUsersResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listUsersResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー')
export const listUsersResponse = zod.array(listUsersResponseItem)

/**
 * ユーザーを作成します。
作成されたユーザーは招待済みステータスとなり、招待メールが送信されます。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを作成（招待）
 */
export const createUserBodyCodeMax = 255;
export const createUserBodyFirstNameMax = 255;
export const createUserBodyLastNameMax = 255;
export const createUserBodyEmployeeIdMax = 255;


export const createUserBody = zod.object({
  "email": zod.string().email().describe('メールアドレス'),
  "code": zod.string().max(createUserBodyCodeMax).describe('コード。未指定の場合、ランダムな英数字がセットされます。'),
  "firstName": zod.string().max(createUserBodyFirstNameMax).describe('名'),
  "lastName": zod.string().max(createUserBodyLastNameMax).describe('姓'),
  "sendEmail": zod.boolean().optional().describe('招待メールを送信する場合true（デフォルト）、送信しない場合false'),
  "employeeId": zod.string().max(createUserBodyEmployeeIdMax).nullish().describe('社員番号')
})

export const createUserResponseEmailMax = 255;
export const createUserResponseCodeMax = 255;
export const createUserResponseFirstNameMax = 255;
export const createUserResponseLastNameMax = 255;
export const createUserResponseFullNameMax = 255;
export const createUserResponseEmployeeIdMax = 255;


export const createUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(createUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(createUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(createUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(createUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー').describe('ユーザー詳細')

/**
 * ユーザーを一件取得します。
 * @summary ユーザーを取得
 */
export const getUserResponseEmailMax = 255;
export const getUserResponseCodeMax = 255;
export const getUserResponseFirstNameMax = 255;
export const getUserResponseLastNameMax = 255;
export const getUserResponseFullNameMax = 255;
export const getUserResponseEmployeeIdMax = 255;


export const getUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(getUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(getUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(getUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(getUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー').describe('ユーザー詳細')

/**
 * ユーザーを削除します（論理削除）。
削除されたユーザーは削除済ステータスとなりますが、引き続きユーザー情報にアクセス可能です。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを削除
 */
export const deleteUserResponseEmailMax = 255;
export const deleteUserResponseCodeMax = 255;
export const deleteUserResponseFirstNameMax = 255;
export const deleteUserResponseLastNameMax = 255;
export const deleteUserResponseFullNameMax = 255;
export const deleteUserResponseEmployeeIdMax = 255;


export const deleteUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(deleteUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(deleteUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(deleteUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(deleteUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(deleteUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(deleteUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー').describe('ユーザー詳細')

/**
 * ユーザーを更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを更新
 */
export const updateUserBodyEmailMax = 255;
export const updateUserBodyCodeMax = 255;
export const updateUserBodyFirstNameMax = 255;
export const updateUserBodyLastNameMax = 255;
export const updateUserBodyEmployeeIdMax = 255;


export const updateUserBody = zod.object({
  "email": zod.string().email().max(updateUserBodyEmailMax).optional().describe('メールアドレス'),
  "code": zod.string().max(updateUserBodyCodeMax).optional().describe('コード'),
  "firstName": zod.string().max(updateUserBodyFirstNameMax).optional().describe('名'),
  "lastName": zod.string().max(updateUserBodyLastNameMax).optional().describe('姓'),
  "employeeId": zod.string().max(updateUserBodyEmployeeIdMax).nullish().describe('社員番号')
})

export const updateUserResponseEmailMax = 255;
export const updateUserResponseCodeMax = 255;
export const updateUserResponseFirstNameMax = 255;
export const updateUserResponseLastNameMax = 255;
export const updateUserResponseFullNameMax = 255;
export const updateUserResponseEmployeeIdMax = 255;


export const updateUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(updateUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(updateUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(updateUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(updateUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(updateUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(updateUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー').describe('ユーザー詳細')

/**
 * メールアドレスからユーザーを取得します（完全一致）
※メールアドレスはURLエンコードしたものを送ってください。
 * @summary メールアドレスからユーザーを取得
 */
export const lookupUserByEmailQueryParams = zod.object({
  "email": zod.string().describe('メールアドレス（URLエンコードを行ったもの）')
})

export const lookupUserByEmailResponseEmailMax = 255;
export const lookupUserByEmailResponseCodeMax = 255;
export const lookupUserByEmailResponseFirstNameMax = 255;
export const lookupUserByEmailResponseLastNameMax = 255;
export const lookupUserByEmailResponseFullNameMax = 255;
export const lookupUserByEmailResponseEmployeeIdMax = 255;


export const lookupUserByEmailResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(lookupUserByEmailResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(lookupUserByEmailResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(lookupUserByEmailResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(lookupUserByEmailResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(lookupUserByEmailResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(lookupUserByEmailResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー').describe('ユーザー詳細')

/**
 * 削除されたユーザーを再び招待します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再招待
 */
export const reinviteUserResponseEmailMax = 255;
export const reinviteUserResponseCodeMax = 255;
export const reinviteUserResponseFirstNameMax = 255;
export const reinviteUserResponseLastNameMax = 255;
export const reinviteUserResponseFullNameMax = 255;
export const reinviteUserResponseEmployeeIdMax = 255;


export const reinviteUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(reinviteUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(reinviteUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(reinviteUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(reinviteUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(reinviteUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(reinviteUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー')

/**
 * 有効なユーザーを一時停止します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを一時停止
 */
export const suspendUserResponseEmailMax = 255;
export const suspendUserResponseCodeMax = 255;
export const suspendUserResponseFirstNameMax = 255;
export const suspendUserResponseLastNameMax = 255;
export const suspendUserResponseFullNameMax = 255;
export const suspendUserResponseEmployeeIdMax = 255;


export const suspendUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(suspendUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(suspendUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(suspendUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(suspendUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(suspendUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(suspendUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー')

/**
 * 一時停止中のユーザーを有効化します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再有効化
 */
export const reactivateUserResponseEmailMax = 255;
export const reactivateUserResponseCodeMax = 255;
export const reactivateUserResponseFirstNameMax = 255;
export const reactivateUserResponseLastNameMax = 255;
export const reactivateUserResponseFullNameMax = 255;
export const reactivateUserResponseEmployeeIdMax = 255;


export const reactivateUserResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "email": zod.string().email().max(reactivateUserResponseEmailMax).describe('メールアドレス'),
  "code": zod.string().max(reactivateUserResponseCodeMax).describe('コード'),
  "firstName": zod.string().max(reactivateUserResponseFirstNameMax).describe('名'),
  "lastName": zod.string().max(reactivateUserResponseLastNameMax).describe('姓'),
  "fullName": zod.string().max(reactivateUserResponseFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(reactivateUserResponseEmployeeIdMax).nullish().describe('社員番号'),
  "image": zod.object({
  "100x100": zod.string().nullable(),
  "64x64": zod.string().nullable(),
  "32x32": zod.string().nullable()
}).describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
  "status": zod.enum(['invited', 'activated', 'suspended', 'deactivated']).describe('ステータス'),
  "locale": zod.string().describe('ロケール（jaまたはen）'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時'),
  "deactivatedAt": zod.string().datetime({}).nullish().describe('削除日時')
}).describe('ユーザー')

/**
 * ユーザーの所属チーム一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary ユーザーの所属チーム一覧を取得
 */
export const listUserTeamsQueryPageDefault = 1;export const listUserTeamsQueryPerPageDefault = 25;
export const listUserTeamsQueryPerPageMax = 100;


export const listUserTeamsQueryParams = zod.object({
  "page": zod.number().min(1).default(listUserTeamsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listUserTeamsQueryPerPageMax).default(listUserTeamsQueryPerPageDefault).describe('1ページあたりの件数'),
  "submittable": zod.boolean().optional().describe('trueの場合、申請可能なチームのみ返す。デフォルトはfalse（すべてのチームを返す）')
})

export const listUserTeamsResponseNameMax = 255;
export const listUserTeamsResponseCodeMax = 255;
export const listUserTeamsResponseUsersCountMin = 0;


export const listUserTeamsResponseItem = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "name": zod.string().max(listUserTeamsResponseNameMax).describe('名前'),
  "fullName": zod.string().describe('上位組織を含む名前'),
  "code": zod.string().max(listUserTeamsResponseCodeMax).describe('コード'),
  "approveOnly": zod.boolean().describe('承認専用チームかどうか'),
  "usersCount": zod.number().min(listUserTeamsResponseUsersCountMin).describe('ユーザー数'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時')
}).describe('チーム')
export const listUserTeamsResponse = zod.array(listUserTeamsResponseItem)

/**
 * ユーザーの管理者ロール一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary ユーザーの管理者ロール一覧を取得
 */
export const listUserRolesQueryPageDefault = 1;export const listUserRolesQueryPerPageDefault = 25;
export const listUserRolesQueryPerPageMax = 100;


export const listUserRolesQueryParams = zod.object({
  "page": zod.number().min(1).default(listUserRolesQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listUserRolesQueryPerPageMax).default(listUserRolesQueryPerPageDefault).describe('1ページあたりの件数')
})

export const listUserRolesResponseNameMax = 255;
export const listUserRolesResponseUsersCountMin = 0;


export const listUserRolesResponseItem = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "name": zod.string().max(listUserRolesResponseNameMax).describe('名前'),
  "editable": zod.boolean().describe('編集可能かどうか。「すべての管理者」のときだけfalseになります。'),
  "usersCount": zod.number().min(listUserRolesResponseUsersCountMin).describe('この管理者ロールに所属するユーザー数'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時')
}).describe('管理者ロール')
export const listUserRolesResponse = zod.array(listUserRolesResponseItem)

