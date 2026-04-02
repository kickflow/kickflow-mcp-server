import * as zod from 'zod'

/**
 * チケットのコメント一覧を取得します。
 * @summary コメントの一覧を取得
 */
export const ListCommentsParams = zod.object({
  ticketId: zod.uuid().describe('チケットのUUID'),
})

export const listCommentsQueryPageDefault = 1

export const listCommentsQueryPerPageDefault = 25
export const listCommentsQueryPerPageMax = 100

export const listCommentsQuerySortByRegExp = new RegExp(
  '^(createdAt)(-asc|-desc)?$',
)

export const ListCommentsQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listCommentsQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listCommentsQueryPerPageMax)
    .default(listCommentsQueryPerPageDefault)
    .describe('1ページあたりの件数'),
  sortBy: zod
    .string()
    .regex(listCommentsQuerySortByRegExp)
    .optional()
    .describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt'),
})

export const listCommentsResponseUserOneEmailMax = 254

export const listCommentsResponseUserOneCodeMax = 100

export const listCommentsResponseUserOneFirstNameMax = 255

export const listCommentsResponseUserOneLastNameMax = 255

export const listCommentsResponseUserOneFullNameMax = 255

export const listCommentsResponseUserOneEmployeeIdMax = 30

export const listCommentsResponseMentionedUsersItemEmailMax = 254

export const listCommentsResponseMentionedUsersItemCodeMax = 100

export const listCommentsResponseMentionedUsersItemFirstNameMax = 255

export const listCommentsResponseMentionedUsersItemLastNameMax = 255

export const listCommentsResponseMentionedUsersItemFullNameMax = 255

export const listCommentsResponseMentionedUsersItemEmployeeIdMax = 30

export const ListCommentsResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    body: zod.string().describe('本文'),
    attachments: zod
      .array(
        zod
          .object({
            signedId: zod.string().describe('署名済みID'),
            filename: zod.string().describe('ファイル名'),
            url: zod.url().describe('ファイルURL'),
            byteSize: zod.number().describe('バイト数'),
            contentType: zod.string().describe('Content-Type'),
          })
          .describe('添付ファイル'),
      )
      .describe('添付ファイル'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    deletedAt: zod.iso.datetime({}).nullable().describe('削除日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(listCommentsResponseUserOneEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(listCommentsResponseUserOneCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(listCommentsResponseUserOneFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(listCommentsResponseUserOneLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(listCommentsResponseUserOneFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(listCommentsResponseUserOneEmployeeIdMax)
          .nullish()
          .describe('社員番号'),
        image: zod
          .object({
            '100x100': zod.string().nullable(),
            '64x64': zod.string().nullable(),
            '32x32': zod.string().nullable(),
          })
          .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
        status: zod
          .enum(['invited', 'activated', 'suspended', 'deactivated'])
          .describe('ステータス'),
        locale: zod.string().describe('ロケール（jaまたはen）'),
        createdAt: zod.iso.datetime({}).describe('作成日時'),
        updatedAt: zod.iso.datetime({}).describe('更新日時'),
        deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
      })
      .describe('ユーザー'),
    mentionedUsers: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(listCommentsResponseMentionedUsersItemEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(listCommentsResponseMentionedUsersItemCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(listCommentsResponseMentionedUsersItemFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(listCommentsResponseMentionedUsersItemLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(listCommentsResponseMentionedUsersItemFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(listCommentsResponseMentionedUsersItemEmployeeIdMax)
              .nullish()
              .describe('社員番号'),
            image: zod
              .object({
                '100x100': zod.string().nullable(),
                '64x64': zod.string().nullable(),
                '32x32': zod.string().nullable(),
              })
              .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
            status: zod
              .enum(['invited', 'activated', 'suspended', 'deactivated'])
              .describe('ステータス'),
            locale: zod.string().describe('ロケール（jaまたはen）'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
            deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
          })
          .describe('ユーザー'),
      )
      .describe('メンションしたユーザーの配列'),
  })
  .describe('コメント')
export const ListCommentsResponse = zod.array(ListCommentsResponseItem)

/**
 * チケットにコメントを投稿します。
 * @summary コメントを投稿
 */
export const CreateCommentParams = zod.object({
  ticketId: zod.uuid().describe('チケットのUUID'),
})

export const CreateCommentBody = zod.object({
  body: zod.string().describe('本文'),
  files: zod.array(zod.string()).nullish().describe('添付ファイルの署名済みID'),
})

export const createCommentResponseUserOneEmailMax = 254

export const createCommentResponseUserOneCodeMax = 100

export const createCommentResponseUserOneFirstNameMax = 255

export const createCommentResponseUserOneLastNameMax = 255

export const createCommentResponseUserOneFullNameMax = 255

export const createCommentResponseUserOneEmployeeIdMax = 30

export const createCommentResponseMentionedUsersItemEmailMax = 254

export const createCommentResponseMentionedUsersItemCodeMax = 100

export const createCommentResponseMentionedUsersItemFirstNameMax = 255

export const createCommentResponseMentionedUsersItemLastNameMax = 255

export const createCommentResponseMentionedUsersItemFullNameMax = 255

export const createCommentResponseMentionedUsersItemEmployeeIdMax = 30

export const CreateCommentResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    body: zod.string().describe('本文'),
    attachments: zod
      .array(
        zod
          .object({
            signedId: zod.string().describe('署名済みID'),
            filename: zod.string().describe('ファイル名'),
            url: zod.url().describe('ファイルURL'),
            byteSize: zod.number().describe('バイト数'),
            contentType: zod.string().describe('Content-Type'),
          })
          .describe('添付ファイル'),
      )
      .describe('添付ファイル'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    deletedAt: zod.iso.datetime({}).nullable().describe('削除日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(createCommentResponseUserOneEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(createCommentResponseUserOneCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(createCommentResponseUserOneFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(createCommentResponseUserOneLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(createCommentResponseUserOneFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(createCommentResponseUserOneEmployeeIdMax)
          .nullish()
          .describe('社員番号'),
        image: zod
          .object({
            '100x100': zod.string().nullable(),
            '64x64': zod.string().nullable(),
            '32x32': zod.string().nullable(),
          })
          .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
        status: zod
          .enum(['invited', 'activated', 'suspended', 'deactivated'])
          .describe('ステータス'),
        locale: zod.string().describe('ロケール（jaまたはen）'),
        createdAt: zod.iso.datetime({}).describe('作成日時'),
        updatedAt: zod.iso.datetime({}).describe('更新日時'),
        deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
      })
      .describe('ユーザー'),
    mentionedUsers: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(createCommentResponseMentionedUsersItemEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(createCommentResponseMentionedUsersItemCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(createCommentResponseMentionedUsersItemFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(createCommentResponseMentionedUsersItemLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(createCommentResponseMentionedUsersItemFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(createCommentResponseMentionedUsersItemEmployeeIdMax)
              .nullish()
              .describe('社員番号'),
            image: zod
              .object({
                '100x100': zod.string().nullable(),
                '64x64': zod.string().nullable(),
                '32x32': zod.string().nullable(),
              })
              .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
            status: zod
              .enum(['invited', 'activated', 'suspended', 'deactivated'])
              .describe('ステータス'),
            locale: zod.string().describe('ロケール（jaまたはen）'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
            deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
          })
          .describe('ユーザー'),
      )
      .describe('メンションしたユーザーの配列'),
  })
  .describe('コメント')

/**
 * チケットのコメントを取得します。
 * @summary コメントを取得
 */
export const GetCommentParams = zod.object({
  ticketId: zod.uuid().describe('チケットのUUID'),
  commentId: zod.uuid().describe('コメントのUUID'),
})

export const getCommentResponseUserOneEmailMax = 254

export const getCommentResponseUserOneCodeMax = 100

export const getCommentResponseUserOneFirstNameMax = 255

export const getCommentResponseUserOneLastNameMax = 255

export const getCommentResponseUserOneFullNameMax = 255

export const getCommentResponseUserOneEmployeeIdMax = 30

export const getCommentResponseMentionedUsersItemEmailMax = 254

export const getCommentResponseMentionedUsersItemCodeMax = 100

export const getCommentResponseMentionedUsersItemFirstNameMax = 255

export const getCommentResponseMentionedUsersItemLastNameMax = 255

export const getCommentResponseMentionedUsersItemFullNameMax = 255

export const getCommentResponseMentionedUsersItemEmployeeIdMax = 30

export const GetCommentResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    body: zod.string().describe('本文'),
    attachments: zod
      .array(
        zod
          .object({
            signedId: zod.string().describe('署名済みID'),
            filename: zod.string().describe('ファイル名'),
            url: zod.url().describe('ファイルURL'),
            byteSize: zod.number().describe('バイト数'),
            contentType: zod.string().describe('Content-Type'),
          })
          .describe('添付ファイル'),
      )
      .describe('添付ファイル'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    deletedAt: zod.iso.datetime({}).nullable().describe('削除日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(getCommentResponseUserOneEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(getCommentResponseUserOneCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(getCommentResponseUserOneFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(getCommentResponseUserOneLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(getCommentResponseUserOneFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(getCommentResponseUserOneEmployeeIdMax)
          .nullish()
          .describe('社員番号'),
        image: zod
          .object({
            '100x100': zod.string().nullable(),
            '64x64': zod.string().nullable(),
            '32x32': zod.string().nullable(),
          })
          .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
        status: zod
          .enum(['invited', 'activated', 'suspended', 'deactivated'])
          .describe('ステータス'),
        locale: zod.string().describe('ロケール（jaまたはen）'),
        createdAt: zod.iso.datetime({}).describe('作成日時'),
        updatedAt: zod.iso.datetime({}).describe('更新日時'),
        deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
      })
      .describe('ユーザー'),
    mentionedUsers: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(getCommentResponseMentionedUsersItemEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(getCommentResponseMentionedUsersItemCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(getCommentResponseMentionedUsersItemFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(getCommentResponseMentionedUsersItemLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(getCommentResponseMentionedUsersItemFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(getCommentResponseMentionedUsersItemEmployeeIdMax)
              .nullish()
              .describe('社員番号'),
            image: zod
              .object({
                '100x100': zod.string().nullable(),
                '64x64': zod.string().nullable(),
                '32x32': zod.string().nullable(),
              })
              .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
            status: zod
              .enum(['invited', 'activated', 'suspended', 'deactivated'])
              .describe('ステータス'),
            locale: zod.string().describe('ロケール（jaまたはen）'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
            deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
          })
          .describe('ユーザー'),
      )
      .describe('メンションしたユーザーの配列'),
  })
  .describe('コメント')

/**
 * チケットのコメントを更新します。添付ファイルは更新できません。
 * @summary コメントを更新
 */
export const UpdateCommentParams = zod.object({
  ticketId: zod.uuid().describe('チケットのUUID'),
  commentId: zod.uuid().describe('コメントのUUID'),
})

export const UpdateCommentBody = zod.object({
  body: zod.string().describe('本文'),
})

export const updateCommentResponseUserOneEmailMax = 254

export const updateCommentResponseUserOneCodeMax = 100

export const updateCommentResponseUserOneFirstNameMax = 255

export const updateCommentResponseUserOneLastNameMax = 255

export const updateCommentResponseUserOneFullNameMax = 255

export const updateCommentResponseUserOneEmployeeIdMax = 30

export const updateCommentResponseMentionedUsersItemEmailMax = 254

export const updateCommentResponseMentionedUsersItemCodeMax = 100

export const updateCommentResponseMentionedUsersItemFirstNameMax = 255

export const updateCommentResponseMentionedUsersItemLastNameMax = 255

export const updateCommentResponseMentionedUsersItemFullNameMax = 255

export const updateCommentResponseMentionedUsersItemEmployeeIdMax = 30

export const UpdateCommentResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    body: zod.string().describe('本文'),
    attachments: zod
      .array(
        zod
          .object({
            signedId: zod.string().describe('署名済みID'),
            filename: zod.string().describe('ファイル名'),
            url: zod.url().describe('ファイルURL'),
            byteSize: zod.number().describe('バイト数'),
            contentType: zod.string().describe('Content-Type'),
          })
          .describe('添付ファイル'),
      )
      .describe('添付ファイル'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    deletedAt: zod.iso.datetime({}).nullable().describe('削除日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(updateCommentResponseUserOneEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(updateCommentResponseUserOneCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(updateCommentResponseUserOneFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(updateCommentResponseUserOneLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(updateCommentResponseUserOneFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(updateCommentResponseUserOneEmployeeIdMax)
          .nullish()
          .describe('社員番号'),
        image: zod
          .object({
            '100x100': zod.string().nullable(),
            '64x64': zod.string().nullable(),
            '32x32': zod.string().nullable(),
          })
          .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
        status: zod
          .enum(['invited', 'activated', 'suspended', 'deactivated'])
          .describe('ステータス'),
        locale: zod.string().describe('ロケール（jaまたはen）'),
        createdAt: zod.iso.datetime({}).describe('作成日時'),
        updatedAt: zod.iso.datetime({}).describe('更新日時'),
        deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
      })
      .describe('ユーザー'),
    mentionedUsers: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(updateCommentResponseMentionedUsersItemEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(updateCommentResponseMentionedUsersItemCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(updateCommentResponseMentionedUsersItemFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(updateCommentResponseMentionedUsersItemLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(updateCommentResponseMentionedUsersItemFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(updateCommentResponseMentionedUsersItemEmployeeIdMax)
              .nullish()
              .describe('社員番号'),
            image: zod
              .object({
                '100x100': zod.string().nullable(),
                '64x64': zod.string().nullable(),
                '32x32': zod.string().nullable(),
              })
              .describe('ユーザー画像のURL。サイズごとに複数のURLを返します。'),
            status: zod
              .enum(['invited', 'activated', 'suspended', 'deactivated'])
              .describe('ステータス'),
            locale: zod.string().describe('ロケール（jaまたはen）'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
            deactivatedAt: zod.iso.datetime({}).nullish().describe('削除日時'),
          })
          .describe('ユーザー'),
      )
      .describe('メンションしたユーザーの配列'),
  })
  .describe('コメント')

/**
 * チケットのコメントを削除します。
 * @summary コメントを削除
 */
export const DeleteCommentParams = zod.object({
  ticketId: zod.uuid().describe('チケットのUUID'),
  commentId: zod.uuid().describe('コメントのUUID'),
})
