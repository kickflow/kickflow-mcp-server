import * as zod from 'zod'

/**
 * テナント内の代理承認の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理承認一覧を取得
 */
export const listProxyApproversQueryPageDefault = 1

export const listProxyApproversQueryPerPageDefault = 25
export const listProxyApproversQueryPerPageMax = 100

export const ListProxyApproversQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listProxyApproversQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listProxyApproversQueryPerPageMax)
    .default(listProxyApproversQueryPerPageDefault)
    .describe('1ページあたりの件数'),
})

export const listProxyApproversResponseUserEmailMax = 254

export const listProxyApproversResponseUserCodeMax = 100

export const listProxyApproversResponseUserFirstNameMax = 255

export const listProxyApproversResponseUserLastNameMax = 255

export const listProxyApproversResponseUserFullNameMax = 255

export const listProxyApproversResponseUserEmployeeIdMax = 30

export const listProxyApproversResponseProxyUserEmailMax = 254

export const listProxyApproversResponseProxyUserCodeMax = 100

export const listProxyApproversResponseProxyUserFirstNameMax = 255

export const listProxyApproversResponseProxyUserLastNameMax = 255

export const listProxyApproversResponseProxyUserFullNameMax = 255

export const listProxyApproversResponseProxyUserEmployeeIdMax = 30

export const listProxyApproversResponseWorkflowsItemCodeRegExp = new RegExp(
  '^[a-zA-Z0-9_-]+$',
)
export const listProxyApproversResponseWorkflowsItemPublicTicketDefault = false
export const listProxyApproversResponseWorkflowsItemVisibleToTeamMembersDefault = false
export const listProxyApproversResponseWorkflowsItemAllowEditingOfViewersDefault = true
export const listProxyApproversResponseWorkflowsItemAuthorOneEmailMax = 254

export const listProxyApproversResponseWorkflowsItemAuthorOneCodeMax = 100

export const listProxyApproversResponseWorkflowsItemAuthorOneFirstNameMax = 255

export const listProxyApproversResponseWorkflowsItemAuthorOneLastNameMax = 255

export const listProxyApproversResponseWorkflowsItemAuthorOneFullNameMax = 255

export const listProxyApproversResponseWorkflowsItemAuthorOneEmployeeIdMax = 30

export const listProxyApproversResponseWorkflowsItemVersionAuthorOneEmailMax = 254

export const listProxyApproversResponseWorkflowsItemVersionAuthorOneCodeMax = 100

export const listProxyApproversResponseWorkflowsItemVersionAuthorOneFirstNameMax = 255

export const listProxyApproversResponseWorkflowsItemVersionAuthorOneLastNameMax = 255

export const listProxyApproversResponseWorkflowsItemVersionAuthorOneFullNameMax = 255

export const listProxyApproversResponseWorkflowsItemVersionAuthorOneEmployeeIdMax = 30

export const listProxyApproversResponseWorkflowsItemFolderOneNameMax = 300

export const listProxyApproversResponseWorkflowsItemFolderOneCodeMax = 100

export const listProxyApproversResponseWorkflowsItemFolderOneWorkflowsCountMin = 0

export const listProxyApproversResponseWorkflowsItemFolderOneRoutesCountMin = 0

export const listProxyApproversResponseWorkflowsItemFolderOnePipelinesCountMin = 0

export const listProxyApproversResponseWorkflowsItemCategoriesItemNameMax = 100

export const ListProxyApproversResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(listProxyApproversResponseUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(listProxyApproversResponseUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(listProxyApproversResponseUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(listProxyApproversResponseUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(listProxyApproversResponseUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(listProxyApproversResponseUserEmployeeIdMax)
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
    proxyUser: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(listProxyApproversResponseProxyUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(listProxyApproversResponseProxyUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(listProxyApproversResponseProxyUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(listProxyApproversResponseProxyUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(listProxyApproversResponseProxyUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(listProxyApproversResponseProxyUserEmployeeIdMax)
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
    startsOn: zod.iso.date().nullable().describe('開始日'),
    endsOn: zod.iso.date().nullable().describe('終了日'),
    workflows: zod
      .array(
        zod
          .object({
            id: zod.string().describe('UUID'),
            code: zod
              .string()
              .regex(listProxyApproversResponseWorkflowsItemCodeRegExp)
              .describe('コード'),
            versionId: zod.string().describe('バージョンのUUID'),
            versionNumber: zod.number().describe('バージョン番号'),
            name: zod.string().describe('名前'),
            description: zod.string().describe('説明'),
            status: zod
              .enum(['visible', 'invisible', 'deleted'])
              .describe(
                'ステータス。visibleは有効、invisibleは無効、deletedは削除済み。',
              ),
            publicTicket: zod
              .boolean()
              .default(
                listProxyApproversResponseWorkflowsItemPublicTicketDefault,
              )
              .describe('チケットがテナント全体に共有される場合true'),
            visibleToManager: zod
              .enum(['none', 'direct', 'all'])
              .describe(
                '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
              ),
            visibleToTeamMembers: zod
              .boolean()
              .default(
                listProxyApproversResponseWorkflowsItemVisibleToTeamMembersDefault,
              )
              .describe(
                '申請チームのメンバーが共有ユーザーに追加される場合true',
              ),
            titleDescription: zod
              .string()
              .nullable()
              .describe('タイトルの説明'),
            ticketNumberFormat: zod
              .string()
              .nullable()
              .describe('チケット番号のフォーマット'),
            overwritable: zod
              .boolean()
              .describe('承認者による上書きが可能な場合true'),
            createdAt: zod.string().describe('作成日時'),
            updatedAt: zod.string().describe('更新日時'),
            titleInputMode: zod
              .enum(['none', 'input', 'calculate'])
              .describe('タイトル入力モード'),
            titleFormula: zod.string().nullable().describe('タイトルの計算式'),
            allowEditingOfViewers: zod
              .boolean()
              .default(
                listProxyApproversResponseWorkflowsItemAllowEditingOfViewersDefault,
              )
              .describe('共有ユーザーの編集が可能な場合true'),
            author: zod
              .union([
                zod
                  .object({
                    id: zod.uuid().describe('UUID'),
                    email: zod
                      .email()
                      .max(
                        listProxyApproversResponseWorkflowsItemAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemAuthorOneEmployeeIdMax,
                      )
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
                      .enum([
                        'invited',
                        'activated',
                        'suspended',
                        'deactivated',
                      ])
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
                zod.null(),
              ])
              .describe('作成者'),
            versionAuthor: zod
              .union([
                zod
                  .object({
                    id: zod.uuid().describe('UUID'),
                    email: zod
                      .email()
                      .max(
                        listProxyApproversResponseWorkflowsItemVersionAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemVersionAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemVersionAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemVersionAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemVersionAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemVersionAuthorOneEmployeeIdMax,
                      )
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
                      .enum([
                        'invited',
                        'activated',
                        'suspended',
                        'deactivated',
                      ])
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
                zod.null(),
              ])
              .describe('バージョン作成者'),
            folder: zod
              .object({
                id: zod.uuid().describe('UUID'),
                name: zod
                  .string()
                  .max(listProxyApproversResponseWorkflowsItemFolderOneNameMax)
                  .describe('名前'),
                code: zod
                  .string()
                  .max(listProxyApproversResponseWorkflowsItemFolderOneCodeMax)
                  .describe('コード'),
                description: zod.string().nullish().describe('説明'),
                workflowsCount: zod
                  .number()
                  .min(
                    listProxyApproversResponseWorkflowsItemFolderOneWorkflowsCountMin,
                  )
                  .describe('フォルダ内のワークフロー数'),
                routesCount: zod
                  .number()
                  .min(
                    listProxyApproversResponseWorkflowsItemFolderOneRoutesCountMin,
                  )
                  .describe('フォルダ内の経路数'),
                pipelinesCount: zod
                  .number()
                  .min(
                    listProxyApproversResponseWorkflowsItemFolderOnePipelinesCountMin,
                  )
                  .describe('フォルダ内のパイプライン数'),
                createdAt: zod.iso.datetime({}).describe('作成日時'),
                updatedAt: zod.iso.datetime({}).describe('更新日時'),
              })
              .describe('フォルダ')
              .describe('フォルダ'),
            categories: zod
              .array(
                zod
                  .object({
                    id: zod.uuid().describe('UUID'),
                    name: zod
                      .string()
                      .max(
                        listProxyApproversResponseWorkflowsItemCategoriesItemNameMax,
                      )
                      .describe('名前'),
                    createdAt: zod.iso.datetime({}).describe('作成日時'),
                    updatedAt: zod.iso.datetime({}).describe('更新日時'),
                  })
                  .describe('カテゴリ'),
              )
              .describe('カテゴリの配列'),
          })
          .describe('ワークフロー'),
      )
      .describe('対象ワークフロー'),
  })
  .describe('代理承認')
export const ListProxyApproversResponse = zod.array(
  ListProxyApproversResponseItem,
)

/**
 * 代理承認を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理承認の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理承認を作成
 */
export const CreateProxyApproverBody = zod.object({
  userId: zod.uuid().describe('代理されるユーザーID'),
  proxyUserId: zod.uuid().describe('代理するユーザーID'),
  startsOn: zod.iso
    .date()
    .nullish()
    .describe('開始日。nullの場合、すでに始まっているものとして扱います。'),
  endsOn: zod.iso
    .date()
    .nullish()
    .describe('終了日。nullの場合、無期限として扱います。'),
  workflowIds: zod
    .array(zod.uuid())
    .optional()
    .describe('対象ワークフローのID'),
})

export const createProxyApproverResponseUserEmailMax = 254

export const createProxyApproverResponseUserCodeMax = 100

export const createProxyApproverResponseUserFirstNameMax = 255

export const createProxyApproverResponseUserLastNameMax = 255

export const createProxyApproverResponseUserFullNameMax = 255

export const createProxyApproverResponseUserEmployeeIdMax = 30

export const createProxyApproverResponseProxyUserEmailMax = 254

export const createProxyApproverResponseProxyUserCodeMax = 100

export const createProxyApproverResponseProxyUserFirstNameMax = 255

export const createProxyApproverResponseProxyUserLastNameMax = 255

export const createProxyApproverResponseProxyUserFullNameMax = 255

export const createProxyApproverResponseProxyUserEmployeeIdMax = 30

export const createProxyApproverResponseWorkflowsItemCodeRegExp = new RegExp(
  '^[a-zA-Z0-9_-]+$',
)
export const createProxyApproverResponseWorkflowsItemPublicTicketDefault = false
export const createProxyApproverResponseWorkflowsItemVisibleToTeamMembersDefault = false
export const createProxyApproverResponseWorkflowsItemAllowEditingOfViewersDefault = true
export const createProxyApproverResponseWorkflowsItemAuthorOneEmailMax = 254

export const createProxyApproverResponseWorkflowsItemAuthorOneCodeMax = 100

export const createProxyApproverResponseWorkflowsItemAuthorOneFirstNameMax = 255

export const createProxyApproverResponseWorkflowsItemAuthorOneLastNameMax = 255

export const createProxyApproverResponseWorkflowsItemAuthorOneFullNameMax = 255

export const createProxyApproverResponseWorkflowsItemAuthorOneEmployeeIdMax = 30

export const createProxyApproverResponseWorkflowsItemVersionAuthorOneEmailMax = 254

export const createProxyApproverResponseWorkflowsItemVersionAuthorOneCodeMax = 100

export const createProxyApproverResponseWorkflowsItemVersionAuthorOneFirstNameMax = 255

export const createProxyApproverResponseWorkflowsItemVersionAuthorOneLastNameMax = 255

export const createProxyApproverResponseWorkflowsItemVersionAuthorOneFullNameMax = 255

export const createProxyApproverResponseWorkflowsItemVersionAuthorOneEmployeeIdMax = 30

export const createProxyApproverResponseWorkflowsItemFolderOneNameMax = 300

export const createProxyApproverResponseWorkflowsItemFolderOneCodeMax = 100

export const createProxyApproverResponseWorkflowsItemFolderOneWorkflowsCountMin = 0

export const createProxyApproverResponseWorkflowsItemFolderOneRoutesCountMin = 0

export const createProxyApproverResponseWorkflowsItemFolderOnePipelinesCountMin = 0

export const createProxyApproverResponseWorkflowsItemCategoriesItemNameMax = 100

export const CreateProxyApproverResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(createProxyApproverResponseUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(createProxyApproverResponseUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(createProxyApproverResponseUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(createProxyApproverResponseUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(createProxyApproverResponseUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(createProxyApproverResponseUserEmployeeIdMax)
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
    proxyUser: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(createProxyApproverResponseProxyUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(createProxyApproverResponseProxyUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(createProxyApproverResponseProxyUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(createProxyApproverResponseProxyUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(createProxyApproverResponseProxyUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(createProxyApproverResponseProxyUserEmployeeIdMax)
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
    startsOn: zod.iso.date().nullable().describe('開始日'),
    endsOn: zod.iso.date().nullable().describe('終了日'),
    workflows: zod
      .array(
        zod
          .object({
            id: zod.string().describe('UUID'),
            code: zod
              .string()
              .regex(createProxyApproverResponseWorkflowsItemCodeRegExp)
              .describe('コード'),
            versionId: zod.string().describe('バージョンのUUID'),
            versionNumber: zod.number().describe('バージョン番号'),
            name: zod.string().describe('名前'),
            description: zod.string().describe('説明'),
            status: zod
              .enum(['visible', 'invisible', 'deleted'])
              .describe(
                'ステータス。visibleは有効、invisibleは無効、deletedは削除済み。',
              ),
            publicTicket: zod
              .boolean()
              .default(
                createProxyApproverResponseWorkflowsItemPublicTicketDefault,
              )
              .describe('チケットがテナント全体に共有される場合true'),
            visibleToManager: zod
              .enum(['none', 'direct', 'all'])
              .describe(
                '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
              ),
            visibleToTeamMembers: zod
              .boolean()
              .default(
                createProxyApproverResponseWorkflowsItemVisibleToTeamMembersDefault,
              )
              .describe(
                '申請チームのメンバーが共有ユーザーに追加される場合true',
              ),
            titleDescription: zod
              .string()
              .nullable()
              .describe('タイトルの説明'),
            ticketNumberFormat: zod
              .string()
              .nullable()
              .describe('チケット番号のフォーマット'),
            overwritable: zod
              .boolean()
              .describe('承認者による上書きが可能な場合true'),
            createdAt: zod.string().describe('作成日時'),
            updatedAt: zod.string().describe('更新日時'),
            titleInputMode: zod
              .enum(['none', 'input', 'calculate'])
              .describe('タイトル入力モード'),
            titleFormula: zod.string().nullable().describe('タイトルの計算式'),
            allowEditingOfViewers: zod
              .boolean()
              .default(
                createProxyApproverResponseWorkflowsItemAllowEditingOfViewersDefault,
              )
              .describe('共有ユーザーの編集が可能な場合true'),
            author: zod
              .union([
                zod
                  .object({
                    id: zod.uuid().describe('UUID'),
                    email: zod
                      .email()
                      .max(
                        createProxyApproverResponseWorkflowsItemAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemAuthorOneEmployeeIdMax,
                      )
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
                      .enum([
                        'invited',
                        'activated',
                        'suspended',
                        'deactivated',
                      ])
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
                zod.null(),
              ])
              .describe('作成者'),
            versionAuthor: zod
              .union([
                zod
                  .object({
                    id: zod.uuid().describe('UUID'),
                    email: zod
                      .email()
                      .max(
                        createProxyApproverResponseWorkflowsItemVersionAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemVersionAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemVersionAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemVersionAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemVersionAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemVersionAuthorOneEmployeeIdMax,
                      )
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
                      .enum([
                        'invited',
                        'activated',
                        'suspended',
                        'deactivated',
                      ])
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
                zod.null(),
              ])
              .describe('バージョン作成者'),
            folder: zod
              .object({
                id: zod.uuid().describe('UUID'),
                name: zod
                  .string()
                  .max(createProxyApproverResponseWorkflowsItemFolderOneNameMax)
                  .describe('名前'),
                code: zod
                  .string()
                  .max(createProxyApproverResponseWorkflowsItemFolderOneCodeMax)
                  .describe('コード'),
                description: zod.string().nullish().describe('説明'),
                workflowsCount: zod
                  .number()
                  .min(
                    createProxyApproverResponseWorkflowsItemFolderOneWorkflowsCountMin,
                  )
                  .describe('フォルダ内のワークフロー数'),
                routesCount: zod
                  .number()
                  .min(
                    createProxyApproverResponseWorkflowsItemFolderOneRoutesCountMin,
                  )
                  .describe('フォルダ内の経路数'),
                pipelinesCount: zod
                  .number()
                  .min(
                    createProxyApproverResponseWorkflowsItemFolderOnePipelinesCountMin,
                  )
                  .describe('フォルダ内のパイプライン数'),
                createdAt: zod.iso.datetime({}).describe('作成日時'),
                updatedAt: zod.iso.datetime({}).describe('更新日時'),
              })
              .describe('フォルダ')
              .describe('フォルダ'),
            categories: zod
              .array(
                zod
                  .object({
                    id: zod.uuid().describe('UUID'),
                    name: zod
                      .string()
                      .max(
                        createProxyApproverResponseWorkflowsItemCategoriesItemNameMax,
                      )
                      .describe('名前'),
                    createdAt: zod.iso.datetime({}).describe('作成日時'),
                    updatedAt: zod.iso.datetime({}).describe('更新日時'),
                  })
                  .describe('カテゴリ'),
              )
              .describe('カテゴリの配列'),
          })
          .describe('ワークフロー'),
      )
      .describe('対象ワークフロー'),
  })
  .describe('代理承認')

/**
 * 指定した代理承認を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理承認の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理承認を削除
 */
export const DeleteProxyApproverParams = zod.object({
  proxyApproverId: zod.uuid().describe('代理承認のUUID'),
})
