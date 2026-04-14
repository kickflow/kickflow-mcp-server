import * as zod from 'zod'

/**
 * 現在のユーザーを取得します。
 * @summary 現在のユーザーを取得
 */
export const getCurrentUserResponseOneEmailMax = 254

export const getCurrentUserResponseOneCodeMax = 100

export const getCurrentUserResponseOneFirstNameMax = 255

export const getCurrentUserResponseOneLastNameMax = 255

export const getCurrentUserResponseOneFullNameMax = 255

export const getCurrentUserResponseOneEmployeeIdMax = 30

export const GetCurrentUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(getCurrentUserResponseOneEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(getCurrentUserResponseOneCodeMax).describe('コード'),
    firstName: zod
      .string()
      .max(getCurrentUserResponseOneFirstNameMax)
      .describe('名'),
    lastName: zod
      .string()
      .max(getCurrentUserResponseOneLastNameMax)
      .describe('姓'),
    fullName: zod
      .string()
      .max(getCurrentUserResponseOneFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(getCurrentUserResponseOneEmployeeIdMax)
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
  .describe('ユーザー')
  .describe('ユーザー詳細')

/**
 * ユーザー一覧を取得します。
 * @summary ユーザー一覧を取得
 */
export const listUsersQueryPageDefault = 1

export const listUsersQueryPerPageDefault = 25
export const listUsersQueryPerPageMax = 100

export const listUsersQuerySortByRegExp = new RegExp(
  '^(email|code)(-asc|-desc)?$',
)

export const ListUsersQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listUsersQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listUsersQueryPerPageMax)
    .default(listUsersQueryPerPageDefault)
    .describe('1ページあたりの件数'),
  status: zod
    .array(zod.enum(['invited', 'activated', 'suspended', 'deactivated']))
    .optional()
    .describe('ステータスによる絞り込み'),
  sortBy: zod
    .string()
    .regex(listUsersQuerySortByRegExp)
    .optional()
    .describe(
      'ソート対象のフィールドと順序。指定可能なフィールド: email, code',
    ),
})

export const listUsersResponseEmailMax = 254

export const listUsersResponseCodeMax = 100

export const listUsersResponseFirstNameMax = 255

export const listUsersResponseLastNameMax = 255

export const listUsersResponseFullNameMax = 255

export const listUsersResponseEmployeeIdMax = 30

export const ListUsersResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(listUsersResponseEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(listUsersResponseCodeMax).describe('コード'),
    firstName: zod.string().max(listUsersResponseFirstNameMax).describe('名'),
    lastName: zod.string().max(listUsersResponseLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(listUsersResponseFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(listUsersResponseEmployeeIdMax)
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
  .describe('ユーザー')
export const ListUsersResponse = zod.array(ListUsersResponseItem)

/**
 * ユーザーを作成します。
作成されたユーザーは招待済みステータスとなり、招待メールが送信されます。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを作成（招待）
 */
export const createUserBodyCodeMax = 100

export const createUserBodyFirstNameMax = 255

export const createUserBodyLastNameMax = 255

export const createUserBodyEmployeeIdMax = 30

export const createUserBodyMembershipsMax = 5

export const CreateUserBody = zod.object({
  email: zod.email().describe('メールアドレス'),
  code: zod
    .string()
    .max(createUserBodyCodeMax)
    .describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  firstName: zod.string().max(createUserBodyFirstNameMax).describe('名'),
  lastName: zod.string().max(createUserBodyLastNameMax).describe('姓'),
  sendEmail: zod
    .boolean()
    .optional()
    .describe(
      '招待メールを送信する場合true（デフォルト）、送信しない場合false',
    ),
  employeeId: zod
    .string()
    .max(createUserBodyEmployeeIdMax)
    .nullish()
    .describe('社員番号'),
  memberships: zod
    .array(
      zod
        .object({
          teamCode: zod.string().describe('所属先チームのコード'),
          gradeCodes: zod
            .array(zod.string())
            .optional()
            .describe('役職コードの配列'),
          leader: zod
            .boolean()
            .optional()
            .describe('上長フラグ（デフォルト: false）'),
        })
        .describe('招待時に作成する所属'),
    )
    .max(createUserBodyMembershipsMax)
    .optional()
    .describe('招待時に作成する所属の配列（最大5件）'),
})

export const createUserResponseOneEmailMax = 254

export const createUserResponseOneCodeMax = 100

export const createUserResponseOneFirstNameMax = 255

export const createUserResponseOneLastNameMax = 255

export const createUserResponseOneFullNameMax = 255

export const createUserResponseOneEmployeeIdMax = 30

export const CreateUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(createUserResponseOneEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(createUserResponseOneCodeMax).describe('コード'),
    firstName: zod
      .string()
      .max(createUserResponseOneFirstNameMax)
      .describe('名'),
    lastName: zod.string().max(createUserResponseOneLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(createUserResponseOneFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(createUserResponseOneEmployeeIdMax)
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
  .describe('ユーザー')
  .describe('ユーザー詳細')

/**
 * ユーザーを一件取得します。
 * @summary ユーザーを取得
 */
export const getUserPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const GetUserParams = zod.object({
  userId: zod
    .string()
    .regex(getUserPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const getUserResponseOneEmailMax = 254

export const getUserResponseOneCodeMax = 100

export const getUserResponseOneFirstNameMax = 255

export const getUserResponseOneLastNameMax = 255

export const getUserResponseOneFullNameMax = 255

export const getUserResponseOneEmployeeIdMax = 30

export const GetUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(getUserResponseOneEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(getUserResponseOneCodeMax).describe('コード'),
    firstName: zod.string().max(getUserResponseOneFirstNameMax).describe('名'),
    lastName: zod.string().max(getUserResponseOneLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(getUserResponseOneFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(getUserResponseOneEmployeeIdMax)
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
  .describe('ユーザー')
  .describe('ユーザー詳細')

/**
 * ユーザーを削除します（論理削除）。
削除されたユーザーは削除済ステータスとなりますが、引き続きユーザー情報にアクセス可能です。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを削除
 */
export const deleteUserPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const DeleteUserParams = zod.object({
  userId: zod
    .string()
    .regex(deleteUserPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const deleteUserResponseOneEmailMax = 254

export const deleteUserResponseOneCodeMax = 100

export const deleteUserResponseOneFirstNameMax = 255

export const deleteUserResponseOneLastNameMax = 255

export const deleteUserResponseOneFullNameMax = 255

export const deleteUserResponseOneEmployeeIdMax = 30

export const DeleteUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(deleteUserResponseOneEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(deleteUserResponseOneCodeMax).describe('コード'),
    firstName: zod
      .string()
      .max(deleteUserResponseOneFirstNameMax)
      .describe('名'),
    lastName: zod.string().max(deleteUserResponseOneLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(deleteUserResponseOneFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(deleteUserResponseOneEmployeeIdMax)
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
  .describe('ユーザー')
  .describe('ユーザー詳細')

/**
 * ユーザーを更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを更新
 */
export const updateUserPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const UpdateUserParams = zod.object({
  userId: zod
    .string()
    .regex(updateUserPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const updateUserBodyEmailMax = 254

export const updateUserBodyCodeMax = 100

export const updateUserBodyFirstNameMax = 255

export const updateUserBodyLastNameMax = 255

export const updateUserBodyEmployeeIdMax = 30

export const UpdateUserBody = zod.object({
  email: zod
    .email()
    .max(updateUserBodyEmailMax)
    .optional()
    .describe('メールアドレス'),
  code: zod.string().max(updateUserBodyCodeMax).optional().describe('コード'),
  firstName: zod
    .string()
    .max(updateUserBodyFirstNameMax)
    .optional()
    .describe('名'),
  lastName: zod
    .string()
    .max(updateUserBodyLastNameMax)
    .optional()
    .describe('姓'),
  employeeId: zod
    .string()
    .max(updateUserBodyEmployeeIdMax)
    .nullish()
    .describe('社員番号'),
})

export const updateUserResponseOneEmailMax = 254

export const updateUserResponseOneCodeMax = 100

export const updateUserResponseOneFirstNameMax = 255

export const updateUserResponseOneLastNameMax = 255

export const updateUserResponseOneFullNameMax = 255

export const updateUserResponseOneEmployeeIdMax = 30

export const UpdateUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(updateUserResponseOneEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(updateUserResponseOneCodeMax).describe('コード'),
    firstName: zod
      .string()
      .max(updateUserResponseOneFirstNameMax)
      .describe('名'),
    lastName: zod.string().max(updateUserResponseOneLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(updateUserResponseOneFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(updateUserResponseOneEmployeeIdMax)
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
  .describe('ユーザー')
  .describe('ユーザー詳細')

/**
 * メールアドレスからユーザーを取得します（完全一致）
※メールアドレスはURLエンコードしたものを送ってください。
 * @summary メールアドレスからユーザーを取得
 */
export const LookupUserByEmailQueryParams = zod.object({
  email: zod.string().describe('メールアドレス（URLエンコードを行ったもの）'),
})

export const lookupUserByEmailResponseOneEmailMax = 254

export const lookupUserByEmailResponseOneCodeMax = 100

export const lookupUserByEmailResponseOneFirstNameMax = 255

export const lookupUserByEmailResponseOneLastNameMax = 255

export const lookupUserByEmailResponseOneFullNameMax = 255

export const lookupUserByEmailResponseOneEmployeeIdMax = 30

export const LookupUserByEmailResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(lookupUserByEmailResponseOneEmailMax)
      .describe('メールアドレス'),
    code: zod
      .string()
      .max(lookupUserByEmailResponseOneCodeMax)
      .describe('コード'),
    firstName: zod
      .string()
      .max(lookupUserByEmailResponseOneFirstNameMax)
      .describe('名'),
    lastName: zod
      .string()
      .max(lookupUserByEmailResponseOneLastNameMax)
      .describe('姓'),
    fullName: zod
      .string()
      .max(lookupUserByEmailResponseOneFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(lookupUserByEmailResponseOneEmployeeIdMax)
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
  .describe('ユーザー')
  .describe('ユーザー詳細')

/**
 * 削除されたユーザーを再び招待します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再招待
 */
export const reinviteUserPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const ReinviteUserParams = zod.object({
  userId: zod
    .string()
    .regex(reinviteUserPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const reinviteUserResponseEmailMax = 254

export const reinviteUserResponseCodeMax = 100

export const reinviteUserResponseFirstNameMax = 255

export const reinviteUserResponseLastNameMax = 255

export const reinviteUserResponseFullNameMax = 255

export const reinviteUserResponseEmployeeIdMax = 30

export const ReinviteUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(reinviteUserResponseEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(reinviteUserResponseCodeMax).describe('コード'),
    firstName: zod
      .string()
      .max(reinviteUserResponseFirstNameMax)
      .describe('名'),
    lastName: zod.string().max(reinviteUserResponseLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(reinviteUserResponseFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(reinviteUserResponseEmployeeIdMax)
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
  .describe('ユーザー')

/**
 * 有効なユーザーを一時停止します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを一時停止
 */
export const suspendUserPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const SuspendUserParams = zod.object({
  userId: zod
    .string()
    .regex(suspendUserPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const suspendUserResponseEmailMax = 254

export const suspendUserResponseCodeMax = 100

export const suspendUserResponseFirstNameMax = 255

export const suspendUserResponseLastNameMax = 255

export const suspendUserResponseFullNameMax = 255

export const suspendUserResponseEmployeeIdMax = 30

export const SuspendUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(suspendUserResponseEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(suspendUserResponseCodeMax).describe('コード'),
    firstName: zod.string().max(suspendUserResponseFirstNameMax).describe('名'),
    lastName: zod.string().max(suspendUserResponseLastNameMax).describe('姓'),
    fullName: zod
      .string()
      .max(suspendUserResponseFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(suspendUserResponseEmployeeIdMax)
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
  .describe('ユーザー')

/**
 * 一時停止中のユーザーを有効化します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再有効化
 */
export const reactivateUserPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const ReactivateUserParams = zod.object({
  userId: zod
    .string()
    .regex(reactivateUserPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const reactivateUserResponseEmailMax = 254

export const reactivateUserResponseCodeMax = 100

export const reactivateUserResponseFirstNameMax = 255

export const reactivateUserResponseLastNameMax = 255

export const reactivateUserResponseFullNameMax = 255

export const reactivateUserResponseEmployeeIdMax = 30

export const ReactivateUserResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    email: zod
      .email()
      .max(reactivateUserResponseEmailMax)
      .describe('メールアドレス'),
    code: zod.string().max(reactivateUserResponseCodeMax).describe('コード'),
    firstName: zod
      .string()
      .max(reactivateUserResponseFirstNameMax)
      .describe('名'),
    lastName: zod
      .string()
      .max(reactivateUserResponseLastNameMax)
      .describe('姓'),
    fullName: zod
      .string()
      .max(reactivateUserResponseFullNameMax)
      .describe('フルネーム'),
    employeeId: zod
      .string()
      .max(reactivateUserResponseEmployeeIdMax)
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
  .describe('ユーザー')

/**
 * ユーザーの所属チーム一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary ユーザーの所属チーム一覧を取得
 */
export const listUserTeamsPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const ListUserTeamsParams = zod.object({
  userId: zod
    .string()
    .regex(listUserTeamsPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const listUserTeamsQueryPageDefault = 1

export const listUserTeamsQueryPerPageDefault = 25
export const listUserTeamsQueryPerPageMax = 100

export const ListUserTeamsQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listUserTeamsQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listUserTeamsQueryPerPageMax)
    .default(listUserTeamsQueryPerPageDefault)
    .describe('1ページあたりの件数'),
  submittable: zod
    .boolean()
    .optional()
    .describe(
      'trueの場合、申請可能なチームのみ返す。デフォルトはfalse（すべてのチームを返す）',
    ),
})

export const listUserTeamsResponseNameMax = 300

export const listUserTeamsResponseCodeMax = 100

export const listUserTeamsResponseNotesMax = 10000

export const listUserTeamsResponseUsersCountMin = 0

export const ListUserTeamsResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    name: zod.string().max(listUserTeamsResponseNameMax).describe('名前'),
    fullName: zod.string().describe('上位組織を含む名前'),
    code: zod.string().max(listUserTeamsResponseCodeMax).describe('コード'),
    notes: zod
      .string()
      .max(listUserTeamsResponseNotesMax)
      .nullish()
      .describe('管理用メモ'),
    approveOnly: zod.boolean().describe('承認専用チームかどうか'),
    usersCount: zod
      .number()
      .min(listUserTeamsResponseUsersCountMin)
      .describe('ユーザー数'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
  })
  .describe('チーム')
export const ListUserTeamsResponse = zod.array(ListUserTeamsResponseItem)

/**
 * ユーザーの管理者ロール一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary ユーザーの管理者ロール一覧を取得
 */
export const listUserRolesPathUserIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const ListUserRolesParams = zod.object({
  userId: zod
    .string()
    .regex(listUserRolesPathUserIdRegExp)
    .describe('ユーザーのUUIDまたはコード'),
})

export const listUserRolesQueryPageDefault = 1

export const listUserRolesQueryPerPageDefault = 25
export const listUserRolesQueryPerPageMax = 100

export const ListUserRolesQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listUserRolesQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listUserRolesQueryPerPageMax)
    .default(listUserRolesQueryPerPageDefault)
    .describe('1ページあたりの件数'),
})

export const listUserRolesResponseNameMax = 300

export const listUserRolesResponseUsersCountMin = 0

export const ListUserRolesResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    name: zod.string().max(listUserRolesResponseNameMax).describe('名前'),
    editable: zod
      .boolean()
      .describe(
        '編集可能かどうか。「すべての管理者」のときだけfalseになります。',
      ),
    usersCount: zod
      .number()
      .min(listUserRolesResponseUsersCountMin)
      .describe('この管理者ロールに所属するユーザー数'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
  })
  .describe('管理者ロール')
export const ListUserRolesResponse = zod.array(ListUserRolesResponseItem)
