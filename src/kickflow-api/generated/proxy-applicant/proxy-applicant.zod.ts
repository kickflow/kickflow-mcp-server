import * as zod from 'zod'

/**
 * テナント内の代理申請の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理申請一覧を取得
 */
export const listProxyApplicantsQueryPageDefault = 1

export const listProxyApplicantsQueryPerPageDefault = 25
export const listProxyApplicantsQueryPerPageMax = 100

export const ListProxyApplicantsQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listProxyApplicantsQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listProxyApplicantsQueryPerPageMax)
    .default(listProxyApplicantsQueryPerPageDefault)
    .describe('1ページあたりの件数'),
})

export const listProxyApplicantsResponseUserEmailMax = 254

export const listProxyApplicantsResponseUserCodeMax = 100

export const listProxyApplicantsResponseUserFirstNameMax = 255

export const listProxyApplicantsResponseUserLastNameMax = 255

export const listProxyApplicantsResponseUserFullNameMax = 255

export const listProxyApplicantsResponseUserEmployeeIdMax = 30

export const listProxyApplicantsResponseProxyUserEmailMax = 254

export const listProxyApplicantsResponseProxyUserCodeMax = 100

export const listProxyApplicantsResponseProxyUserFirstNameMax = 255

export const listProxyApplicantsResponseProxyUserLastNameMax = 255

export const listProxyApplicantsResponseProxyUserFullNameMax = 255

export const listProxyApplicantsResponseProxyUserEmployeeIdMax = 30

export const listProxyApplicantsResponseWorkflowsItemCodeRegExp = new RegExp(
  '^[a-zA-Z0-9_-]+$',
)
export const listProxyApplicantsResponseWorkflowsItemPublicTicketDefault = false
export const listProxyApplicantsResponseWorkflowsItemVisibleToTeamMembersDefault = false
export const listProxyApplicantsResponseWorkflowsItemAllowEditingOfViewersDefault = true
export const listProxyApplicantsResponseWorkflowsItemAuthorOneEmailMax = 254

export const listProxyApplicantsResponseWorkflowsItemAuthorOneCodeMax = 100

export const listProxyApplicantsResponseWorkflowsItemAuthorOneFirstNameMax = 255

export const listProxyApplicantsResponseWorkflowsItemAuthorOneLastNameMax = 255

export const listProxyApplicantsResponseWorkflowsItemAuthorOneFullNameMax = 255

export const listProxyApplicantsResponseWorkflowsItemAuthorOneEmployeeIdMax = 30

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorOneEmailMax = 254

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorOneCodeMax = 100

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorOneFirstNameMax = 255

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorOneLastNameMax = 255

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorOneFullNameMax = 255

export const listProxyApplicantsResponseWorkflowsItemVersionAuthorOneEmployeeIdMax = 30

export const listProxyApplicantsResponseWorkflowsItemFolderOneNameMax = 300

export const listProxyApplicantsResponseWorkflowsItemFolderOneCodeMax = 100

export const listProxyApplicantsResponseWorkflowsItemFolderOneWorkflowsCountMin = 0

export const listProxyApplicantsResponseWorkflowsItemFolderOneRoutesCountMin = 0

export const listProxyApplicantsResponseWorkflowsItemFolderOnePipelinesCountMin = 0

export const listProxyApplicantsResponseWorkflowsItemCategoriesItemNameMax = 100

export const ListProxyApplicantsResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(listProxyApplicantsResponseUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(listProxyApplicantsResponseUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(listProxyApplicantsResponseUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(listProxyApplicantsResponseUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(listProxyApplicantsResponseUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(listProxyApplicantsResponseUserEmployeeIdMax)
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
          .max(listProxyApplicantsResponseProxyUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(listProxyApplicantsResponseProxyUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(listProxyApplicantsResponseProxyUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(listProxyApplicantsResponseProxyUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(listProxyApplicantsResponseProxyUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(listProxyApplicantsResponseProxyUserEmployeeIdMax)
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
              .regex(listProxyApplicantsResponseWorkflowsItemCodeRegExp)
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
                listProxyApplicantsResponseWorkflowsItemPublicTicketDefault,
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
                listProxyApplicantsResponseWorkflowsItemVisibleToTeamMembersDefault,
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
                listProxyApplicantsResponseWorkflowsItemAllowEditingOfViewersDefault,
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
                        listProxyApplicantsResponseWorkflowsItemAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemAuthorOneEmployeeIdMax,
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
                        listProxyApplicantsResponseWorkflowsItemVersionAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemVersionAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemVersionAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemVersionAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemVersionAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        listProxyApplicantsResponseWorkflowsItemVersionAuthorOneEmployeeIdMax,
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
                  .max(listProxyApplicantsResponseWorkflowsItemFolderOneNameMax)
                  .describe('名前'),
                code: zod
                  .string()
                  .max(listProxyApplicantsResponseWorkflowsItemFolderOneCodeMax)
                  .describe('コード'),
                description: zod.string().nullish().describe('説明'),
                workflowsCount: zod
                  .number()
                  .min(
                    listProxyApplicantsResponseWorkflowsItemFolderOneWorkflowsCountMin,
                  )
                  .describe('フォルダ内のワークフロー数'),
                routesCount: zod
                  .number()
                  .min(
                    listProxyApplicantsResponseWorkflowsItemFolderOneRoutesCountMin,
                  )
                  .describe('フォルダ内の経路数'),
                pipelinesCount: zod
                  .number()
                  .min(
                    listProxyApplicantsResponseWorkflowsItemFolderOnePipelinesCountMin,
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
                        listProxyApplicantsResponseWorkflowsItemCategoriesItemNameMax,
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
  .describe('代理申請')
export const ListProxyApplicantsResponse = zod.array(
  ListProxyApplicantsResponseItem,
)

/**
 * 代理申請を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を作成
 */
export const CreateProxyApplicantBody = zod.object({
  userId: zod.uuid().describe('代理されるユーザーID'),
  proxyUserId: zod.uuid().describe('代理するユーザーID'),
  startsOn: zod.iso
    .date()
    .nullish()
    .describe('開始日。nullの場合、すでに開始しているものとして扱います。'),
  endsOn: zod.iso
    .date()
    .nullish()
    .describe('終了日。nullの場合、無期限のものとして扱います。'),
  workflowIds: zod
    .array(zod.uuid())
    .optional()
    .describe('対象ワークフローのID'),
})

export const createProxyApplicantResponseUserEmailMax = 254

export const createProxyApplicantResponseUserCodeMax = 100

export const createProxyApplicantResponseUserFirstNameMax = 255

export const createProxyApplicantResponseUserLastNameMax = 255

export const createProxyApplicantResponseUserFullNameMax = 255

export const createProxyApplicantResponseUserEmployeeIdMax = 30

export const createProxyApplicantResponseProxyUserEmailMax = 254

export const createProxyApplicantResponseProxyUserCodeMax = 100

export const createProxyApplicantResponseProxyUserFirstNameMax = 255

export const createProxyApplicantResponseProxyUserLastNameMax = 255

export const createProxyApplicantResponseProxyUserFullNameMax = 255

export const createProxyApplicantResponseProxyUserEmployeeIdMax = 30

export const createProxyApplicantResponseWorkflowsItemCodeRegExp = new RegExp(
  '^[a-zA-Z0-9_-]+$',
)
export const createProxyApplicantResponseWorkflowsItemPublicTicketDefault = false
export const createProxyApplicantResponseWorkflowsItemVisibleToTeamMembersDefault = false
export const createProxyApplicantResponseWorkflowsItemAllowEditingOfViewersDefault = true
export const createProxyApplicantResponseWorkflowsItemAuthorOneEmailMax = 254

export const createProxyApplicantResponseWorkflowsItemAuthorOneCodeMax = 100

export const createProxyApplicantResponseWorkflowsItemAuthorOneFirstNameMax = 255

export const createProxyApplicantResponseWorkflowsItemAuthorOneLastNameMax = 255

export const createProxyApplicantResponseWorkflowsItemAuthorOneFullNameMax = 255

export const createProxyApplicantResponseWorkflowsItemAuthorOneEmployeeIdMax = 30

export const createProxyApplicantResponseWorkflowsItemVersionAuthorOneEmailMax = 254

export const createProxyApplicantResponseWorkflowsItemVersionAuthorOneCodeMax = 100

export const createProxyApplicantResponseWorkflowsItemVersionAuthorOneFirstNameMax = 255

export const createProxyApplicantResponseWorkflowsItemVersionAuthorOneLastNameMax = 255

export const createProxyApplicantResponseWorkflowsItemVersionAuthorOneFullNameMax = 255

export const createProxyApplicantResponseWorkflowsItemVersionAuthorOneEmployeeIdMax = 30

export const createProxyApplicantResponseWorkflowsItemFolderOneNameMax = 300

export const createProxyApplicantResponseWorkflowsItemFolderOneCodeMax = 100

export const createProxyApplicantResponseWorkflowsItemFolderOneWorkflowsCountMin = 0

export const createProxyApplicantResponseWorkflowsItemFolderOneRoutesCountMin = 0

export const createProxyApplicantResponseWorkflowsItemFolderOnePipelinesCountMin = 0

export const createProxyApplicantResponseWorkflowsItemCategoriesItemNameMax = 100

export const CreateProxyApplicantResponse = zod
  .object({
    id: zod.uuid().describe('UUID'),
    createdAt: zod.iso.datetime({}).describe('作成日時'),
    updatedAt: zod.iso.datetime({}).describe('更新日時'),
    user: zod
      .object({
        id: zod.uuid().describe('UUID'),
        email: zod
          .email()
          .max(createProxyApplicantResponseUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(createProxyApplicantResponseUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(createProxyApplicantResponseUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(createProxyApplicantResponseUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(createProxyApplicantResponseUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(createProxyApplicantResponseUserEmployeeIdMax)
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
          .max(createProxyApplicantResponseProxyUserEmailMax)
          .describe('メールアドレス'),
        code: zod
          .string()
          .max(createProxyApplicantResponseProxyUserCodeMax)
          .describe('コード'),
        firstName: zod
          .string()
          .max(createProxyApplicantResponseProxyUserFirstNameMax)
          .describe('名'),
        lastName: zod
          .string()
          .max(createProxyApplicantResponseProxyUserLastNameMax)
          .describe('姓'),
        fullName: zod
          .string()
          .max(createProxyApplicantResponseProxyUserFullNameMax)
          .describe('フルネーム'),
        employeeId: zod
          .string()
          .max(createProxyApplicantResponseProxyUserEmployeeIdMax)
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
              .regex(createProxyApplicantResponseWorkflowsItemCodeRegExp)
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
                createProxyApplicantResponseWorkflowsItemPublicTicketDefault,
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
                createProxyApplicantResponseWorkflowsItemVisibleToTeamMembersDefault,
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
                createProxyApplicantResponseWorkflowsItemAllowEditingOfViewersDefault,
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
                        createProxyApplicantResponseWorkflowsItemAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemAuthorOneEmployeeIdMax,
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
                        createProxyApplicantResponseWorkflowsItemVersionAuthorOneEmailMax,
                      )
                      .describe('メールアドレス'),
                    code: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemVersionAuthorOneCodeMax,
                      )
                      .describe('コード'),
                    firstName: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemVersionAuthorOneFirstNameMax,
                      )
                      .describe('名'),
                    lastName: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemVersionAuthorOneLastNameMax,
                      )
                      .describe('姓'),
                    fullName: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemVersionAuthorOneFullNameMax,
                      )
                      .describe('フルネーム'),
                    employeeId: zod
                      .string()
                      .max(
                        createProxyApplicantResponseWorkflowsItemVersionAuthorOneEmployeeIdMax,
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
                  .max(
                    createProxyApplicantResponseWorkflowsItemFolderOneNameMax,
                  )
                  .describe('名前'),
                code: zod
                  .string()
                  .max(
                    createProxyApplicantResponseWorkflowsItemFolderOneCodeMax,
                  )
                  .describe('コード'),
                description: zod.string().nullish().describe('説明'),
                workflowsCount: zod
                  .number()
                  .min(
                    createProxyApplicantResponseWorkflowsItemFolderOneWorkflowsCountMin,
                  )
                  .describe('フォルダ内のワークフロー数'),
                routesCount: zod
                  .number()
                  .min(
                    createProxyApplicantResponseWorkflowsItemFolderOneRoutesCountMin,
                  )
                  .describe('フォルダ内の経路数'),
                pipelinesCount: zod
                  .number()
                  .min(
                    createProxyApplicantResponseWorkflowsItemFolderOnePipelinesCountMin,
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
                        createProxyApplicantResponseWorkflowsItemCategoriesItemNameMax,
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
  .describe('代理申請')

/**
 * 指定した代理申請を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を削除
 */
export const DeleteProxyApplicantParams = zod.object({
  proxyApplicantId: zod.uuid().describe('代理申請のUUID'),
})
