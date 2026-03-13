import * as zod from 'zod'

/**
 * 指定した組織図内のチーム一覧を取得します。

parentIdを指定した場合は指定した親チームの配下チームの一覧を、parentIdを指定しない場合は組織図内のルートのチーム一覧を返します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チーム一覧を取得
 */
export const ListTeamsParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
})

export const listTeamsQueryPageDefault = 1

export const listTeamsQueryPerPageDefault = 25
export const listTeamsQueryPerPageMax = 100

export const ListTeamsQueryParams = zod.object({
  parentId: zod.string().optional().describe('親チームのUUID'),
  page: zod
    .number()
    .min(1)
    .default(listTeamsQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listTeamsQueryPerPageMax)
    .default(listTeamsQueryPerPageDefault)
    .describe('1ページあたりの件数'),
})

export const listTeamsResponseNameMax = 300

export const listTeamsResponseCodeMax = 100

export const listTeamsResponseNotesMax = 10000

export const listTeamsResponseUsersCountMin = 0

export const ListTeamsResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    name: zod.string().max(listTeamsResponseNameMax).describe('名前'),
    fullName: zod.string().describe('上位組織を含む名前'),
    code: zod.string().max(listTeamsResponseCodeMax).describe('コード'),
    notes: zod
      .string()
      .max(listTeamsResponseNotesMax)
      .nullish()
      .describe('管理用メモ'),
    approveOnly: zod.boolean().describe('承認専用チームかどうか'),
    usersCount: zod
      .number()
      .min(listTeamsResponseUsersCountMin)
      .describe('ユーザー数'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
  })
  .describe('チーム')
export const ListTeamsResponse = zod.array(ListTeamsResponseItem)

/**
 * 指定した組織図内にチームを作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを作成
 */
export const CreateTeamParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
})

export const CreateTeamBody = zod
  .object({
    name: zod.string().describe('名前'),
    code: zod
      .string()
      .optional()
      .describe(
        'コード。未指定の場合、ランダムな英数字が自動的に設定されます。',
      ),
    notes: zod.string().nullish().describe('管理用メモ'),
    parentId: zod
      .uuid()
      .optional()
      .describe(
        '親チームのUUID。nullの場合、作成したチームはルートになります。',
      ),
    approveOnly: zod.boolean().optional().describe('承認専用チームかどうか'),
  })
  .describe('チームを作成するときのrequest body')

export const createTeamResponseOneNameMax = 300

export const createTeamResponseOneCodeMax = 100

export const createTeamResponseOneNotesMax = 10000

export const createTeamResponseOneUsersCountMin = 0

export const createTeamResponseTwoParentOneNameMax = 300

export const createTeamResponseTwoParentOneCodeMax = 100

export const createTeamResponseTwoParentOneNotesMax = 10000

export const createTeamResponseTwoParentOneUsersCountMin = 0

export const createTeamResponseTwoChildrenItemNameMax = 300

export const createTeamResponseTwoChildrenItemCodeMax = 100

export const createTeamResponseTwoChildrenItemNotesMax = 10000

export const createTeamResponseTwoChildrenItemUsersCountMin = 0

export const createTeamResponseTwoUsersItemOneGradesItemNameMax = 300

export const createTeamResponseTwoUsersItemOneGradesItemLevelMin = 0
export const createTeamResponseTwoUsersItemOneGradesItemLevelMax = 255

export const createTeamResponseTwoUsersItemOneGradesItemCodeMax = 100

export const createTeamResponseTwoUsersItemOneGradesItemIsDefaultDefault = false
export const createTeamResponseTwoUsersItemTwoEmailMax = 254

export const createTeamResponseTwoUsersItemTwoCodeMax = 100

export const createTeamResponseTwoUsersItemTwoFirstNameMax = 255

export const createTeamResponseTwoUsersItemTwoLastNameMax = 255

export const createTeamResponseTwoUsersItemTwoFullNameMax = 255

export const createTeamResponseTwoUsersItemTwoEmployeeIdMax = 30

export const CreateTeamResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    name: zod.string().max(createTeamResponseOneNameMax).describe('名前'),
    fullName: zod.string().describe('上位組織を含む名前'),
    code: zod.string().max(createTeamResponseOneCodeMax).describe('コード'),
    notes: zod
      .string()
      .max(createTeamResponseOneNotesMax)
      .nullish()
      .describe('管理用メモ'),
    approveOnly: zod.boolean().describe('承認専用チームかどうか'),
    usersCount: zod
      .number()
      .min(createTeamResponseOneUsersCountMin)
      .describe('ユーザー数'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
  })
  .describe('チーム')
  .and(
    zod.object({
      parent: zod
        .union([
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              name: zod
                .string()
                .max(createTeamResponseTwoParentOneNameMax)
                .describe('名前'),
              fullName: zod.string().describe('上位組織を含む名前'),
              code: zod
                .string()
                .max(createTeamResponseTwoParentOneCodeMax)
                .describe('コード'),
              notes: zod
                .string()
                .max(createTeamResponseTwoParentOneNotesMax)
                .nullish()
                .describe('管理用メモ'),
              approveOnly: zod.boolean().describe('承認専用チームかどうか'),
              usersCount: zod
                .number()
                .min(createTeamResponseTwoParentOneUsersCountMin)
                .describe('ユーザー数'),
              createdAt: zod.iso.datetime({}).describe('作成日時'),
              updatedAt: zod.iso.datetime({}).describe('更新日時'),
            })
            .describe('チーム'),
          zod.null(),
        ])
        .optional()
        .describe('親チーム'),
      children: zod
        .array(
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              name: zod
                .string()
                .max(createTeamResponseTwoChildrenItemNameMax)
                .describe('名前'),
              fullName: zod.string().describe('上位組織を含む名前'),
              code: zod
                .string()
                .max(createTeamResponseTwoChildrenItemCodeMax)
                .describe('コード'),
              notes: zod
                .string()
                .max(createTeamResponseTwoChildrenItemNotesMax)
                .nullish()
                .describe('管理用メモ'),
              approveOnly: zod.boolean().describe('承認専用チームかどうか'),
              usersCount: zod
                .number()
                .min(createTeamResponseTwoChildrenItemUsersCountMin)
                .describe('ユーザー数'),
              createdAt: zod.iso.datetime({}).describe('作成日時'),
              updatedAt: zod.iso.datetime({}).describe('更新日時'),
            })
            .describe('チーム'),
        )
        .describe('子チーム'),
      users: zod
        .array(
          zod
            .object({
              grades: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      name: zod
                        .string()
                        .max(createTeamResponseTwoUsersItemOneGradesItemNameMax)
                        .describe('名前'),
                      level: zod
                        .number()
                        .min(
                          createTeamResponseTwoUsersItemOneGradesItemLevelMin,
                        )
                        .max(
                          createTeamResponseTwoUsersItemOneGradesItemLevelMax,
                        )
                        .describe('レベル'),
                      code: zod
                        .string()
                        .max(createTeamResponseTwoUsersItemOneGradesItemCodeMax)
                        .nullable()
                        .describe('コード'),
                      isDefault: zod
                        .boolean()
                        .default(
                          createTeamResponseTwoUsersItemOneGradesItemIsDefaultDefault,
                        )
                        .describe('デフォルトの役職かどうか'),
                      createdAt: zod.iso.datetime({}).describe('作成日時'),
                      updatedAt: zod.iso.datetime({}).describe('更新日時'),
                    })
                    .describe('役職'),
                )
                .min(1)
                .describe('役職'),
              leader: zod.boolean().describe('上長かどうか'),
            })
            .and(
              zod
                .object({
                  id: zod.uuid().describe('UUID'),
                  email: zod
                    .email()
                    .max(createTeamResponseTwoUsersItemTwoEmailMax)
                    .describe('メールアドレス'),
                  code: zod
                    .string()
                    .max(createTeamResponseTwoUsersItemTwoCodeMax)
                    .describe('コード'),
                  firstName: zod
                    .string()
                    .max(createTeamResponseTwoUsersItemTwoFirstNameMax)
                    .describe('名'),
                  lastName: zod
                    .string()
                    .max(createTeamResponseTwoUsersItemTwoLastNameMax)
                    .describe('姓'),
                  fullName: zod
                    .string()
                    .max(createTeamResponseTwoUsersItemTwoFullNameMax)
                    .describe('フルネーム'),
                  employeeId: zod
                    .string()
                    .max(createTeamResponseTwoUsersItemTwoEmployeeIdMax)
                    .nullish()
                    .describe('社員番号'),
                  image: zod
                    .object({
                      '100x100': zod.string().nullable(),
                      '64x64': zod.string().nullable(),
                      '32x32': zod.string().nullable(),
                    })
                    .describe(
                      'ユーザー画像のURL。サイズごとに複数のURLを返します。',
                    ),
                  status: zod
                    .enum(['invited', 'activated', 'suspended', 'deactivated'])
                    .describe('ステータス'),
                  locale: zod.string().describe('ロケール（jaまたはen）'),
                  createdAt: zod.iso.datetime({}).describe('作成日時'),
                  updatedAt: zod.iso.datetime({}).describe('更新日時'),
                  deactivatedAt: zod.iso
                    .datetime({})
                    .nullish()
                    .describe('削除日時'),
                })
                .describe('ユーザー'),
            )
            .describe('チームの所属メンバー'),
        )
        .describe(
          'メンバーの配列。\n\n注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。',
        ),
    }),
  )
  .describe('チームの詳細')

/**
 * チームを一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを取得
 */
export const GetTeamParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
})

export const getTeamResponseOneNameMax = 300

export const getTeamResponseOneCodeMax = 100

export const getTeamResponseOneNotesMax = 10000

export const getTeamResponseOneUsersCountMin = 0

export const getTeamResponseTwoParentOneNameMax = 300

export const getTeamResponseTwoParentOneCodeMax = 100

export const getTeamResponseTwoParentOneNotesMax = 10000

export const getTeamResponseTwoParentOneUsersCountMin = 0

export const getTeamResponseTwoChildrenItemNameMax = 300

export const getTeamResponseTwoChildrenItemCodeMax = 100

export const getTeamResponseTwoChildrenItemNotesMax = 10000

export const getTeamResponseTwoChildrenItemUsersCountMin = 0

export const getTeamResponseTwoUsersItemOneGradesItemNameMax = 300

export const getTeamResponseTwoUsersItemOneGradesItemLevelMin = 0
export const getTeamResponseTwoUsersItemOneGradesItemLevelMax = 255

export const getTeamResponseTwoUsersItemOneGradesItemCodeMax = 100

export const getTeamResponseTwoUsersItemOneGradesItemIsDefaultDefault = false
export const getTeamResponseTwoUsersItemTwoEmailMax = 254

export const getTeamResponseTwoUsersItemTwoCodeMax = 100

export const getTeamResponseTwoUsersItemTwoFirstNameMax = 255

export const getTeamResponseTwoUsersItemTwoLastNameMax = 255

export const getTeamResponseTwoUsersItemTwoFullNameMax = 255

export const getTeamResponseTwoUsersItemTwoEmployeeIdMax = 30

export const GetTeamResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    name: zod.string().max(getTeamResponseOneNameMax).describe('名前'),
    fullName: zod.string().describe('上位組織を含む名前'),
    code: zod.string().max(getTeamResponseOneCodeMax).describe('コード'),
    notes: zod
      .string()
      .max(getTeamResponseOneNotesMax)
      .nullish()
      .describe('管理用メモ'),
    approveOnly: zod.boolean().describe('承認専用チームかどうか'),
    usersCount: zod
      .number()
      .min(getTeamResponseOneUsersCountMin)
      .describe('ユーザー数'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
  })
  .describe('チーム')
  .and(
    zod.object({
      parent: zod
        .union([
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              name: zod
                .string()
                .max(getTeamResponseTwoParentOneNameMax)
                .describe('名前'),
              fullName: zod.string().describe('上位組織を含む名前'),
              code: zod
                .string()
                .max(getTeamResponseTwoParentOneCodeMax)
                .describe('コード'),
              notes: zod
                .string()
                .max(getTeamResponseTwoParentOneNotesMax)
                .nullish()
                .describe('管理用メモ'),
              approveOnly: zod.boolean().describe('承認専用チームかどうか'),
              usersCount: zod
                .number()
                .min(getTeamResponseTwoParentOneUsersCountMin)
                .describe('ユーザー数'),
              createdAt: zod.iso.datetime({}).describe('作成日時'),
              updatedAt: zod.iso.datetime({}).describe('更新日時'),
            })
            .describe('チーム'),
          zod.null(),
        ])
        .optional()
        .describe('親チーム'),
      children: zod
        .array(
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              name: zod
                .string()
                .max(getTeamResponseTwoChildrenItemNameMax)
                .describe('名前'),
              fullName: zod.string().describe('上位組織を含む名前'),
              code: zod
                .string()
                .max(getTeamResponseTwoChildrenItemCodeMax)
                .describe('コード'),
              notes: zod
                .string()
                .max(getTeamResponseTwoChildrenItemNotesMax)
                .nullish()
                .describe('管理用メモ'),
              approveOnly: zod.boolean().describe('承認専用チームかどうか'),
              usersCount: zod
                .number()
                .min(getTeamResponseTwoChildrenItemUsersCountMin)
                .describe('ユーザー数'),
              createdAt: zod.iso.datetime({}).describe('作成日時'),
              updatedAt: zod.iso.datetime({}).describe('更新日時'),
            })
            .describe('チーム'),
        )
        .describe('子チーム'),
      users: zod
        .array(
          zod
            .object({
              grades: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      name: zod
                        .string()
                        .max(getTeamResponseTwoUsersItemOneGradesItemNameMax)
                        .describe('名前'),
                      level: zod
                        .number()
                        .min(getTeamResponseTwoUsersItemOneGradesItemLevelMin)
                        .max(getTeamResponseTwoUsersItemOneGradesItemLevelMax)
                        .describe('レベル'),
                      code: zod
                        .string()
                        .max(getTeamResponseTwoUsersItemOneGradesItemCodeMax)
                        .nullable()
                        .describe('コード'),
                      isDefault: zod
                        .boolean()
                        .default(
                          getTeamResponseTwoUsersItemOneGradesItemIsDefaultDefault,
                        )
                        .describe('デフォルトの役職かどうか'),
                      createdAt: zod.iso.datetime({}).describe('作成日時'),
                      updatedAt: zod.iso.datetime({}).describe('更新日時'),
                    })
                    .describe('役職'),
                )
                .min(1)
                .describe('役職'),
              leader: zod.boolean().describe('上長かどうか'),
            })
            .and(
              zod
                .object({
                  id: zod.uuid().describe('UUID'),
                  email: zod
                    .email()
                    .max(getTeamResponseTwoUsersItemTwoEmailMax)
                    .describe('メールアドレス'),
                  code: zod
                    .string()
                    .max(getTeamResponseTwoUsersItemTwoCodeMax)
                    .describe('コード'),
                  firstName: zod
                    .string()
                    .max(getTeamResponseTwoUsersItemTwoFirstNameMax)
                    .describe('名'),
                  lastName: zod
                    .string()
                    .max(getTeamResponseTwoUsersItemTwoLastNameMax)
                    .describe('姓'),
                  fullName: zod
                    .string()
                    .max(getTeamResponseTwoUsersItemTwoFullNameMax)
                    .describe('フルネーム'),
                  employeeId: zod
                    .string()
                    .max(getTeamResponseTwoUsersItemTwoEmployeeIdMax)
                    .nullish()
                    .describe('社員番号'),
                  image: zod
                    .object({
                      '100x100': zod.string().nullable(),
                      '64x64': zod.string().nullable(),
                      '32x32': zod.string().nullable(),
                    })
                    .describe(
                      'ユーザー画像のURL。サイズごとに複数のURLを返します。',
                    ),
                  status: zod
                    .enum(['invited', 'activated', 'suspended', 'deactivated'])
                    .describe('ステータス'),
                  locale: zod.string().describe('ロケール（jaまたはen）'),
                  createdAt: zod.iso.datetime({}).describe('作成日時'),
                  updatedAt: zod.iso.datetime({}).describe('更新日時'),
                  deactivatedAt: zod.iso
                    .datetime({})
                    .nullish()
                    .describe('削除日時'),
                })
                .describe('ユーザー'),
            )
            .describe('チームの所属メンバー'),
        )
        .describe(
          'メンバーの配列。\n\n注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。',
        ),
    }),
  )
  .describe('チームの詳細')

/**
 * チームを更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを編集
 */
export const UpdateTeamParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
})

export const UpdateTeamBody = zod
  .object({
    name: zod.string().optional().describe('名前'),
    code: zod
      .string()
      .optional()
      .describe(
        'コード。未指定の場合、ランダムな英数字が自動的に設定されます。',
      ),
    notes: zod.string().optional().describe('管理用メモ'),
    parentId: zod.uuid().optional().describe('親チームのID'),
    approveOnly: zod.boolean().optional().describe('承認専用チームかどうか'),
  })
  .describe('チームを更新するときのrequest body')

export const updateTeamResponseOneNameMax = 300

export const updateTeamResponseOneCodeMax = 100

export const updateTeamResponseOneNotesMax = 10000

export const updateTeamResponseOneUsersCountMin = 0

export const updateTeamResponseTwoParentOneNameMax = 300

export const updateTeamResponseTwoParentOneCodeMax = 100

export const updateTeamResponseTwoParentOneNotesMax = 10000

export const updateTeamResponseTwoParentOneUsersCountMin = 0

export const updateTeamResponseTwoChildrenItemNameMax = 300

export const updateTeamResponseTwoChildrenItemCodeMax = 100

export const updateTeamResponseTwoChildrenItemNotesMax = 10000

export const updateTeamResponseTwoChildrenItemUsersCountMin = 0

export const updateTeamResponseTwoUsersItemOneGradesItemNameMax = 300

export const updateTeamResponseTwoUsersItemOneGradesItemLevelMin = 0
export const updateTeamResponseTwoUsersItemOneGradesItemLevelMax = 255

export const updateTeamResponseTwoUsersItemOneGradesItemCodeMax = 100

export const updateTeamResponseTwoUsersItemOneGradesItemIsDefaultDefault = false
export const updateTeamResponseTwoUsersItemTwoEmailMax = 254

export const updateTeamResponseTwoUsersItemTwoCodeMax = 100

export const updateTeamResponseTwoUsersItemTwoFirstNameMax = 255

export const updateTeamResponseTwoUsersItemTwoLastNameMax = 255

export const updateTeamResponseTwoUsersItemTwoFullNameMax = 255

export const updateTeamResponseTwoUsersItemTwoEmployeeIdMax = 30

export const UpdateTeamResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    name: zod.string().max(updateTeamResponseOneNameMax).describe('名前'),
    fullName: zod.string().describe('上位組織を含む名前'),
    code: zod.string().max(updateTeamResponseOneCodeMax).describe('コード'),
    notes: zod
      .string()
      .max(updateTeamResponseOneNotesMax)
      .nullish()
      .describe('管理用メモ'),
    approveOnly: zod.boolean().describe('承認専用チームかどうか'),
    usersCount: zod
      .number()
      .min(updateTeamResponseOneUsersCountMin)
      .describe('ユーザー数'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
  })
  .describe('チーム')
  .and(
    zod.object({
      parent: zod
        .union([
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              name: zod
                .string()
                .max(updateTeamResponseTwoParentOneNameMax)
                .describe('名前'),
              fullName: zod.string().describe('上位組織を含む名前'),
              code: zod
                .string()
                .max(updateTeamResponseTwoParentOneCodeMax)
                .describe('コード'),
              notes: zod
                .string()
                .max(updateTeamResponseTwoParentOneNotesMax)
                .nullish()
                .describe('管理用メモ'),
              approveOnly: zod.boolean().describe('承認専用チームかどうか'),
              usersCount: zod
                .number()
                .min(updateTeamResponseTwoParentOneUsersCountMin)
                .describe('ユーザー数'),
              createdAt: zod.iso.datetime({}).describe('作成日時'),
              updatedAt: zod.iso.datetime({}).describe('更新日時'),
            })
            .describe('チーム'),
          zod.null(),
        ])
        .optional()
        .describe('親チーム'),
      children: zod
        .array(
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              name: zod
                .string()
                .max(updateTeamResponseTwoChildrenItemNameMax)
                .describe('名前'),
              fullName: zod.string().describe('上位組織を含む名前'),
              code: zod
                .string()
                .max(updateTeamResponseTwoChildrenItemCodeMax)
                .describe('コード'),
              notes: zod
                .string()
                .max(updateTeamResponseTwoChildrenItemNotesMax)
                .nullish()
                .describe('管理用メモ'),
              approveOnly: zod.boolean().describe('承認専用チームかどうか'),
              usersCount: zod
                .number()
                .min(updateTeamResponseTwoChildrenItemUsersCountMin)
                .describe('ユーザー数'),
              createdAt: zod.iso.datetime({}).describe('作成日時'),
              updatedAt: zod.iso.datetime({}).describe('更新日時'),
            })
            .describe('チーム'),
        )
        .describe('子チーム'),
      users: zod
        .array(
          zod
            .object({
              grades: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      name: zod
                        .string()
                        .max(updateTeamResponseTwoUsersItemOneGradesItemNameMax)
                        .describe('名前'),
                      level: zod
                        .number()
                        .min(
                          updateTeamResponseTwoUsersItemOneGradesItemLevelMin,
                        )
                        .max(
                          updateTeamResponseTwoUsersItemOneGradesItemLevelMax,
                        )
                        .describe('レベル'),
                      code: zod
                        .string()
                        .max(updateTeamResponseTwoUsersItemOneGradesItemCodeMax)
                        .nullable()
                        .describe('コード'),
                      isDefault: zod
                        .boolean()
                        .default(
                          updateTeamResponseTwoUsersItemOneGradesItemIsDefaultDefault,
                        )
                        .describe('デフォルトの役職かどうか'),
                      createdAt: zod.iso.datetime({}).describe('作成日時'),
                      updatedAt: zod.iso.datetime({}).describe('更新日時'),
                    })
                    .describe('役職'),
                )
                .min(1)
                .describe('役職'),
              leader: zod.boolean().describe('上長かどうか'),
            })
            .and(
              zod
                .object({
                  id: zod.uuid().describe('UUID'),
                  email: zod
                    .email()
                    .max(updateTeamResponseTwoUsersItemTwoEmailMax)
                    .describe('メールアドレス'),
                  code: zod
                    .string()
                    .max(updateTeamResponseTwoUsersItemTwoCodeMax)
                    .describe('コード'),
                  firstName: zod
                    .string()
                    .max(updateTeamResponseTwoUsersItemTwoFirstNameMax)
                    .describe('名'),
                  lastName: zod
                    .string()
                    .max(updateTeamResponseTwoUsersItemTwoLastNameMax)
                    .describe('姓'),
                  fullName: zod
                    .string()
                    .max(updateTeamResponseTwoUsersItemTwoFullNameMax)
                    .describe('フルネーム'),
                  employeeId: zod
                    .string()
                    .max(updateTeamResponseTwoUsersItemTwoEmployeeIdMax)
                    .nullish()
                    .describe('社員番号'),
                  image: zod
                    .object({
                      '100x100': zod.string().nullable(),
                      '64x64': zod.string().nullable(),
                      '32x32': zod.string().nullable(),
                    })
                    .describe(
                      'ユーザー画像のURL。サイズごとに複数のURLを返します。',
                    ),
                  status: zod
                    .enum(['invited', 'activated', 'suspended', 'deactivated'])
                    .describe('ステータス'),
                  locale: zod.string().describe('ロケール（jaまたはen）'),
                  createdAt: zod.iso.datetime({}).describe('作成日時'),
                  updatedAt: zod.iso.datetime({}).describe('更新日時'),
                  deactivatedAt: zod.iso
                    .datetime({})
                    .nullish()
                    .describe('削除日時'),
                })
                .describe('ユーザー'),
            )
            .describe('チームの所属メンバー'),
        )
        .describe(
          'メンバーの配列。\n\n注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。',
        ),
    }),
  )
  .describe('チームの詳細')

/**
 * チームを削除します。同時に、このチームの所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを削除
 */
export const DeleteTeamParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
})

/**
 * チームのメンバー一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームのメンバー一覧を取得
 */
export const ListTeamMembersParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
})

export const listTeamMembersQueryPageDefault = 1

export const listTeamMembersQueryPerPageDefault = 25
export const listTeamMembersQueryPerPageMax = 100

export const ListTeamMembersQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listTeamMembersQueryPageDefault)
    .describe('ページ。1が先頭のページ。'),
  perPage: zod
    .number()
    .min(1)
    .max(listTeamMembersQueryPerPageMax)
    .default(listTeamMembersQueryPerPageDefault)
    .describe('1ページあたりの件数'),
})

export const listTeamMembersResponseOneGradesItemNameMax = 300

export const listTeamMembersResponseOneGradesItemLevelMin = 0
export const listTeamMembersResponseOneGradesItemLevelMax = 255

export const listTeamMembersResponseOneGradesItemCodeMax = 100

export const listTeamMembersResponseOneGradesItemIsDefaultDefault = false
export const listTeamMembersResponseTwoEmailMax = 254

export const listTeamMembersResponseTwoCodeMax = 100

export const listTeamMembersResponseTwoFirstNameMax = 255

export const listTeamMembersResponseTwoLastNameMax = 255

export const listTeamMembersResponseTwoFullNameMax = 255

export const listTeamMembersResponseTwoEmployeeIdMax = 30

export const ListTeamMembersResponseItem = zod
  .object({
    grades: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            name: zod
              .string()
              .max(listTeamMembersResponseOneGradesItemNameMax)
              .describe('名前'),
            level: zod
              .number()
              .min(listTeamMembersResponseOneGradesItemLevelMin)
              .max(listTeamMembersResponseOneGradesItemLevelMax)
              .describe('レベル'),
            code: zod
              .string()
              .max(listTeamMembersResponseOneGradesItemCodeMax)
              .nullable()
              .describe('コード'),
            isDefault: zod
              .boolean()
              .default(listTeamMembersResponseOneGradesItemIsDefaultDefault)
              .describe('デフォルトの役職かどうか'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
          })
          .describe('役職'),
      )
      .min(1)
      .describe('役職'),
    leader: zod.boolean().describe('上長かどうか'),
  })
  .and(
    zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(listTeamMembersResponseTwoEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(listTeamMembersResponseTwoCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(listTeamMembersResponseTwoFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(listTeamMembersResponseTwoLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(listTeamMembersResponseTwoFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(listTeamMembersResponseTwoEmployeeIdMax)
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
  .describe('チームの所属メンバー')
export const ListTeamMembersResponse = zod.array(ListTeamMembersResponseItem)

/**
 * 指定したチームにメンバーを追加します。最大10人まで同時に追加可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームにメンバーを追加
 */
export const CreateTeamMembersParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
})

export const createTeamMembersBodyUsersMax = 10

export const CreateTeamMembersBody = zod.object({
  users: zod
    .array(
      zod.object({
        id: zod.uuid().describe('ユーザーのUUID'),
        leader: zod.boolean().describe('上長の場合、true'),
        gradeIds: zod
          .array(zod.uuid())
          .min(1)
          .optional()
          .describe('役職のUUID'),
      }),
    )
    .min(1)
    .max(createTeamMembersBodyUsersMax)
    .describe('メンバーに追加したいユーザー情報の配列'),
})

/**
 * 指定したチームからメンバーを削除します。最大10人まで同時に削除可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: 削除後もメンバーが残る場合、チームに上長は最低一人必要です。メンバー削除によって上長が不在になる場合、APIは422 Unprocessable Contentを返します。
 * @summary チームからメンバーを削除
 */
export const DeleteTeamMembersParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
})

export const deleteTeamMembersBodyUserIdsMax = 10

export const DeleteTeamMembersBody = zod.object({
  userIds: zod
    .array(zod.uuid())
    .min(1)
    .max(deleteTeamMembersBodyUserIdsMax)
    .describe('ユーザーのUUIDの配列'),
})

/**
 * 指定したメンバーを更新します。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人は必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームのメンバーを更新
 */
export const UpdateTeamMemberParams = zod.object({
  organizationChartId: zod.uuid().describe('組織図のUUID'),
  teamId: zod.string().describe('チームのUUIDまたはコード'),
  userId: zod.string().describe('ユーザーのUUIDまたはコード'),
})

export const UpdateTeamMemberBody = zod.object({
  leader: zod.boolean().describe('上長の場合、true'),
  gradeIds: zod.array(zod.uuid()).min(1).describe('役職のUUID'),
})
