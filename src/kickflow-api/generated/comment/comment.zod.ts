import * as zod from 'zod';


/**
 * チケットのコメント一覧を取得します。
 * @summary コメントの一覧を取得
 */
export const listCommentsParams = zod.object({
  "ticketId": zod.uuid().describe('チケットのUUID')
})

export const listCommentsQueryPageDefault = 1;

export const listCommentsQueryPerPageDefault = 25;
export const listCommentsQueryPerPageMax = 100;

export const listCommentsQuerySortByRegExp = new RegExp('^(createdAt)(-asc|-desc)?$');


export const listCommentsQueryParams = zod.object({
  "page": zod.number().min(1).default(listCommentsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listCommentsQueryPerPageMax).default(listCommentsQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listCommentsQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt')
})

export const listCommentsResponseUserEmailMax = 254;

export const listCommentsResponseUserCodeMax = 100;

export const listCommentsResponseUserFirstNameMax = 255;

export const listCommentsResponseUserLastNameMax = 255;

export const listCommentsResponseUserFullNameMax = 255;

export const listCommentsResponseUserEmployeeIdMax = 30;

export const listCommentsResponseMentionedUsersItemEmailMax = 254;

export const listCommentsResponseMentionedUsersItemCodeMax = 100;

export const listCommentsResponseMentionedUsersItemFirstNameMax = 255;

export const listCommentsResponseMentionedUsersItemLastNameMax = 255;

export const listCommentsResponseMentionedUsersItemFullNameMax = 255;

export const listCommentsResponseMentionedUsersItemEmployeeIdMax = 30;



export const listCommentsResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "body": zod.string().describe('本文'),
  "attachments": zod.array(zod.object({
  "signedId": zod.string().describe('署名済みID'),
  "filename": zod.string().describe('ファイル名'),
  "url": zod.url().describe('ファイルURL')
}).describe('添付ファイル')).describe('添付ファイル'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "deletedAt": zod.iso.datetime({}).nullable().describe('削除日時'),
  "user": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listCommentsResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listCommentsResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(listCommentsResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(listCommentsResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(listCommentsResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listCommentsResponseUserEmployeeIdMax).nullish().describe('社員番号'),
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
  "mentionedUsers": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(listCommentsResponseMentionedUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(listCommentsResponseMentionedUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(listCommentsResponseMentionedUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(listCommentsResponseMentionedUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(listCommentsResponseMentionedUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(listCommentsResponseMentionedUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('メンションしたユーザーの配列')
}).describe('コメント')
export const listCommentsResponse = zod.array(listCommentsResponseItem)

/**
 * チケットにコメントを投稿します。
 * @summary コメントを投稿
 */
export const createCommentParams = zod.object({
  "ticketId": zod.uuid().describe('チケットのUUID')
})

export const createCommentBody = zod.object({
  "body": zod.string().describe('本文'),
  "files": zod.array(zod.string()).nullish().describe('添付ファイルの署名済みID')
})

export const createCommentResponseUserEmailMax = 254;

export const createCommentResponseUserCodeMax = 100;

export const createCommentResponseUserFirstNameMax = 255;

export const createCommentResponseUserLastNameMax = 255;

export const createCommentResponseUserFullNameMax = 255;

export const createCommentResponseUserEmployeeIdMax = 30;

export const createCommentResponseMentionedUsersItemEmailMax = 254;

export const createCommentResponseMentionedUsersItemCodeMax = 100;

export const createCommentResponseMentionedUsersItemFirstNameMax = 255;

export const createCommentResponseMentionedUsersItemLastNameMax = 255;

export const createCommentResponseMentionedUsersItemFullNameMax = 255;

export const createCommentResponseMentionedUsersItemEmployeeIdMax = 30;



export const createCommentResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "body": zod.string().describe('本文'),
  "attachments": zod.array(zod.object({
  "signedId": zod.string().describe('署名済みID'),
  "filename": zod.string().describe('ファイル名'),
  "url": zod.url().describe('ファイルURL')
}).describe('添付ファイル')).describe('添付ファイル'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "deletedAt": zod.iso.datetime({}).nullable().describe('削除日時'),
  "user": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createCommentResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createCommentResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(createCommentResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(createCommentResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(createCommentResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createCommentResponseUserEmployeeIdMax).nullish().describe('社員番号'),
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
  "mentionedUsers": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(createCommentResponseMentionedUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(createCommentResponseMentionedUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(createCommentResponseMentionedUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(createCommentResponseMentionedUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(createCommentResponseMentionedUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(createCommentResponseMentionedUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('メンションしたユーザーの配列')
}).describe('コメント')

/**
 * チケットのコメントを取得します。
 * @summary コメントを取得
 */
export const getCommentParams = zod.object({
  "ticketId": zod.uuid().describe('チケットのUUID'),
  "commentId": zod.uuid().describe('コメントのUUID')
})

export const getCommentResponseUserEmailMax = 254;

export const getCommentResponseUserCodeMax = 100;

export const getCommentResponseUserFirstNameMax = 255;

export const getCommentResponseUserLastNameMax = 255;

export const getCommentResponseUserFullNameMax = 255;

export const getCommentResponseUserEmployeeIdMax = 30;

export const getCommentResponseMentionedUsersItemEmailMax = 254;

export const getCommentResponseMentionedUsersItemCodeMax = 100;

export const getCommentResponseMentionedUsersItemFirstNameMax = 255;

export const getCommentResponseMentionedUsersItemLastNameMax = 255;

export const getCommentResponseMentionedUsersItemFullNameMax = 255;

export const getCommentResponseMentionedUsersItemEmployeeIdMax = 30;



export const getCommentResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "body": zod.string().describe('本文'),
  "attachments": zod.array(zod.object({
  "signedId": zod.string().describe('署名済みID'),
  "filename": zod.string().describe('ファイル名'),
  "url": zod.url().describe('ファイルURL')
}).describe('添付ファイル')).describe('添付ファイル'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "deletedAt": zod.iso.datetime({}).nullable().describe('削除日時'),
  "user": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getCommentResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getCommentResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(getCommentResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(getCommentResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(getCommentResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getCommentResponseUserEmployeeIdMax).nullish().describe('社員番号'),
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
  "mentionedUsers": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(getCommentResponseMentionedUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(getCommentResponseMentionedUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(getCommentResponseMentionedUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(getCommentResponseMentionedUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(getCommentResponseMentionedUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(getCommentResponseMentionedUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('メンションしたユーザーの配列')
}).describe('コメント')

/**
 * チケットのコメントを更新します。添付ファイルは更新できません。
 * @summary コメントを更新
 */
export const updateCommentParams = zod.object({
  "ticketId": zod.uuid().describe('チケットのUUID'),
  "commentId": zod.uuid().describe('コメントのUUID')
})

export const updateCommentBody = zod.object({
  "body": zod.string().describe('本文')
})

export const updateCommentResponseUserEmailMax = 254;

export const updateCommentResponseUserCodeMax = 100;

export const updateCommentResponseUserFirstNameMax = 255;

export const updateCommentResponseUserLastNameMax = 255;

export const updateCommentResponseUserFullNameMax = 255;

export const updateCommentResponseUserEmployeeIdMax = 30;

export const updateCommentResponseMentionedUsersItemEmailMax = 254;

export const updateCommentResponseMentionedUsersItemCodeMax = 100;

export const updateCommentResponseMentionedUsersItemFirstNameMax = 255;

export const updateCommentResponseMentionedUsersItemLastNameMax = 255;

export const updateCommentResponseMentionedUsersItemFullNameMax = 255;

export const updateCommentResponseMentionedUsersItemEmployeeIdMax = 30;



export const updateCommentResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "body": zod.string().describe('本文'),
  "attachments": zod.array(zod.object({
  "signedId": zod.string().describe('署名済みID'),
  "filename": zod.string().describe('ファイル名'),
  "url": zod.url().describe('ファイルURL')
}).describe('添付ファイル')).describe('添付ファイル'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "deletedAt": zod.iso.datetime({}).nullable().describe('削除日時'),
  "user": zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(updateCommentResponseUserEmailMax).describe('メールアドレス'),
  "code": zod.string().max(updateCommentResponseUserCodeMax).describe('コード'),
  "firstName": zod.string().max(updateCommentResponseUserFirstNameMax).describe('名'),
  "lastName": zod.string().max(updateCommentResponseUserLastNameMax).describe('姓'),
  "fullName": zod.string().max(updateCommentResponseUserFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(updateCommentResponseUserEmployeeIdMax).nullish().describe('社員番号'),
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
  "mentionedUsers": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "email": zod.email().max(updateCommentResponseMentionedUsersItemEmailMax).describe('メールアドレス'),
  "code": zod.string().max(updateCommentResponseMentionedUsersItemCodeMax).describe('コード'),
  "firstName": zod.string().max(updateCommentResponseMentionedUsersItemFirstNameMax).describe('名'),
  "lastName": zod.string().max(updateCommentResponseMentionedUsersItemLastNameMax).describe('姓'),
  "fullName": zod.string().max(updateCommentResponseMentionedUsersItemFullNameMax).describe('フルネーム'),
  "employeeId": zod.string().max(updateCommentResponseMentionedUsersItemEmployeeIdMax).nullish().describe('社員番号'),
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
}).describe('ユーザー')).describe('メンションしたユーザーの配列')
}).describe('コメント')

/**
 * チケットのコメントを削除します。
 * @summary コメントを削除
 */
export const deleteCommentParams = zod.object({
  "ticketId": zod.uuid().describe('チケットのUUID'),
  "commentId": zod.uuid().describe('コメントのUUID')
})

