import * as zod from 'zod'

/**
 * ワークフローの一覧を取得します。ステータスによる絞り込みが可能です。
 * @summary ワークフロー一覧を取得
 */
export const listWorkflowsQueryPageDefault = 1

export const listWorkflowsQueryPerPageDefault = 25
export const listWorkflowsQueryPerPageMax = 100

export const listWorkflowsQuerySortByRegExp = new RegExp(
  '^(createdAt|updatedAt|name|status)(-asc|-desc)?$',
)

export const ListWorkflowsQueryParams = zod.object({
  page: zod
    .int()
    .min(1)
    .default(listWorkflowsQueryPageDefault)
    .describe('ページ。1が最初のページ。'),
  perPage: zod
    .int()
    .min(1)
    .max(listWorkflowsQueryPerPageMax)
    .default(listWorkflowsQueryPerPageDefault)
    .describe('1ページあたりの件数'),
  sortBy: zod
    .string()
    .regex(listWorkflowsQuerySortByRegExp)
    .optional()
    .describe(
      'ソート対象のフィールドと順序。指定可能なフィールド: createdAt, updatedAt, name, status',
    ),
  status: zod
    .array(zod.enum(['visible', 'invisible']))
    .optional()
    .describe('ステータス'),
})

export const listWorkflowsResponseCodeRegExp = new RegExp('^[a-zA-Z0-9_-]+$')
export const listWorkflowsResponsePublicTicketDefault = false
export const listWorkflowsResponseVisibleToTeamMembersDefault = false
export const listWorkflowsResponseAllowEditingOfViewersDefault = true
export const listWorkflowsResponseCommentingEnabledDefault = true
export const listWorkflowsResponseCommentingRequiredOnApprovalDefault = false
export const listWorkflowsResponseCommentingRequiredOnRejectionDefault = false
export const listWorkflowsResponseCommentingRequiredOnDenialDefault = false
export const listWorkflowsResponseAuthorOneEmailMax = 254

export const listWorkflowsResponseAuthorOneCodeMax = 100

export const listWorkflowsResponseAuthorOneFirstNameMax = 255

export const listWorkflowsResponseAuthorOneLastNameMax = 255

export const listWorkflowsResponseAuthorOneFullNameMax = 255

export const listWorkflowsResponseAuthorOneEmployeeIdMax = 30

export const listWorkflowsResponseVersionAuthorOneEmailMax = 254

export const listWorkflowsResponseVersionAuthorOneCodeMax = 100

export const listWorkflowsResponseVersionAuthorOneFirstNameMax = 255

export const listWorkflowsResponseVersionAuthorOneLastNameMax = 255

export const listWorkflowsResponseVersionAuthorOneFullNameMax = 255

export const listWorkflowsResponseVersionAuthorOneEmployeeIdMax = 30

export const listWorkflowsResponseFolderOneNameMax = 300

export const listWorkflowsResponseFolderOneCodeMax = 100

export const listWorkflowsResponseFolderOneWorkflowsCountMin = 0

export const listWorkflowsResponseFolderOneRoutesCountMin = 0

export const listWorkflowsResponseFolderOnePipelinesCountMin = 0

export const listWorkflowsResponseCategoriesItemCodeMax = 100

export const listWorkflowsResponseCategoriesItemNameMax = 100

export const ListWorkflowsResponseItem = zod
  .object({
    id: zod.string().describe('UUID'),
    code: zod
      .string()
      .regex(listWorkflowsResponseCodeRegExp)
      .describe('コード'),
    versionId: zod.string().describe('バージョンのUUID'),
    versionNumber: zod.int().describe('バージョン番号'),
    name: zod.string().describe('名前'),
    description: zod.string().describe('説明'),
    status: zod
      .enum(['visible', 'invisible', 'deleted'])
      .describe(
        'ステータス。visibleは有効、invisibleは無効、deletedは削除済み。',
      ),
    publicTicket: zod
      .boolean()
      .default(listWorkflowsResponsePublicTicketDefault)
      .describe('チケットがテナント全体に共有される場合true'),
    visibleToManager: zod
      .enum(['none', 'direct', 'all'])
      .describe(
        '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
      ),
    visibleToTeamMembers: zod
      .boolean()
      .default(listWorkflowsResponseVisibleToTeamMembersDefault)
      .describe('申請チームのメンバーが共有ユーザーに追加される場合true'),
    titleDescription: zod.string().nullable().describe('タイトルの説明'),
    ticketNumberFormat: zod
      .string()
      .nullable()
      .describe('チケット番号のフォーマット'),
    overwritable: zod.boolean().describe('承認者による上書きが可能な場合true'),
    createdAt: zod.string().describe('作成日時'),
    updatedAt: zod.string().describe('更新日時'),
    titleInputMode: zod
      .enum(['none', 'input', 'calculate'])
      .describe('タイトル入力モード'),
    titleFormula: zod.string().nullable().describe('タイトルの計算式'),
    allowEditingOfViewers: zod
      .boolean()
      .default(listWorkflowsResponseAllowEditingOfViewersDefault)
      .describe('共有ユーザーの編集が可能な場合true'),
    commentingEnabled: zod
      .boolean()
      .default(listWorkflowsResponseCommentingEnabledDefault)
      .describe(
        '新規コメント投稿が許可されている場合 true。 false の場合、ワークフロー配下のすべてのチケットで新規コメント投稿が禁止される。',
      ),
    commentingRequiredOnApproval: zod
      .boolean()
      .default(listWorkflowsResponseCommentingRequiredOnApprovalDefault)
      .describe(
        '承認（回覧の確認を含む）時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは承認・確認できない。',
      ),
    commentingRequiredOnRejection: zod
      .boolean()
      .default(listWorkflowsResponseCommentingRequiredOnRejectionDefault)
      .describe(
        '差し戻し時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは差し戻しできない。',
      ),
    commentingRequiredOnDenial: zod
      .boolean()
      .default(listWorkflowsResponseCommentingRequiredOnDenialDefault)
      .describe(
        '却下時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは却下できない。',
      ),
    author: zod
      .union([
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(listWorkflowsResponseAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(listWorkflowsResponseAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(listWorkflowsResponseAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(listWorkflowsResponseAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(listWorkflowsResponseAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(listWorkflowsResponseAuthorOneEmployeeIdMax)
              .nullable()
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
            userType: zod
              .enum(['normal', 'assistant'])
              .optional()
              .describe(
                'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
              ),
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
            deactivatedAt: zod.iso
              .datetime({ offset: true })
              .nullish()
              .describe('削除日時'),
            lastUsedOn: zod.iso
              .date()
              .nullish()
              .describe(
                '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
              ),
            customFields: zod
              .array(
                zod.object({
                  code: zod
                    .string()
                    .describe('UserCustomField#code（変換せずそのまま）'),
                  fieldType: zod
                    .union([
                      zod.literal('text'),
                      zod.literal('textLong'),
                      zod.literal('number'),
                      zod.literal('integer'),
                      zod.literal('checkbox'),
                      zod.literal('pullDown'),
                      zod.literal('date'),
                      zod.literal(null),
                    ])
                    .nullable()
                    .describe(
                      'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                    ),
                  value: zod
                    .union([
                      zod.string(),
                      zod.number(),
                      zod.array(zod.string()),
                      zod.null(),
                    ])
                    .describe(
                      'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                    ),
                }),
              )
              .optional()
              .describe(
                'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
              ),
          })
          .describe('ユーザー'),
        zod.null(),
      ])
      .optional()
      .describe('作成者'),
    versionAuthor: zod
      .union([
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(listWorkflowsResponseVersionAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(listWorkflowsResponseVersionAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(listWorkflowsResponseVersionAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(listWorkflowsResponseVersionAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(listWorkflowsResponseVersionAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(listWorkflowsResponseVersionAuthorOneEmployeeIdMax)
              .nullable()
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
            userType: zod
              .enum(['normal', 'assistant'])
              .optional()
              .describe(
                'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
              ),
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
            deactivatedAt: zod.iso
              .datetime({ offset: true })
              .nullish()
              .describe('削除日時'),
            lastUsedOn: zod.iso
              .date()
              .nullish()
              .describe(
                '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
              ),
            customFields: zod
              .array(
                zod.object({
                  code: zod
                    .string()
                    .describe('UserCustomField#code（変換せずそのまま）'),
                  fieldType: zod
                    .union([
                      zod.literal('text'),
                      zod.literal('textLong'),
                      zod.literal('number'),
                      zod.literal('integer'),
                      zod.literal('checkbox'),
                      zod.literal('pullDown'),
                      zod.literal('date'),
                      zod.literal(null),
                    ])
                    .nullable()
                    .describe(
                      'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                    ),
                  value: zod
                    .union([
                      zod.string(),
                      zod.number(),
                      zod.array(zod.string()),
                      zod.null(),
                    ])
                    .describe(
                      'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                    ),
                }),
              )
              .optional()
              .describe(
                'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
              ),
          })
          .describe('ユーザー'),
        zod.null(),
      ])
      .optional()
      .describe('バージョン作成者'),
    folder: zod
      .object({
        id: zod.uuid().describe('UUID'),
        name: zod
          .string()
          .max(listWorkflowsResponseFolderOneNameMax)
          .describe('名前'),
        fullName: zod
          .string()
          .describe('フルネーム（ルートフォルダからのパス）'),
        code: zod
          .string()
          .max(listWorkflowsResponseFolderOneCodeMax)
          .describe('コード'),
        description: zod.string().nullable().describe('説明'),
        workflowsCount: zod
          .int()
          .min(listWorkflowsResponseFolderOneWorkflowsCountMin)
          .describe('フォルダ内のワークフロー数'),
        routesCount: zod
          .int()
          .min(listWorkflowsResponseFolderOneRoutesCountMin)
          .describe('フォルダ内の経路数'),
        pipelinesCount: zod
          .int()
          .min(listWorkflowsResponseFolderOnePipelinesCountMin)
          .describe('フォルダ内のパイプライン数'),
        editable: zod.boolean().describe('編集可能かどうか'),
        createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
        updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
      })
      .describe('フォルダ')
      .optional()
      .describe('フォルダ'),
    categories: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            code: zod
              .string()
              .max(listWorkflowsResponseCategoriesItemCodeMax)
              .describe('コード'),
            name: zod
              .string()
              .max(listWorkflowsResponseCategoriesItemNameMax)
              .describe('名前'),
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
          })
          .describe('カテゴリ'),
      )
      .optional()
      .describe('カテゴリの配列'),
    availableToEveryone: zod
      .boolean()
      .describe('全ユーザーが申請可能な場合true'),
    reportFormats: zod
      .array(zod.enum(['pdf', 'excel']))
      .describe('帳票のフォーマット'),
    hiddenOnWorkflowFilterForTicket: zod
      .boolean()
      .describe('チケット検索のワークフローフィルタに表示しない場合true'),
    hiddenOnWorkflowSelectionScreen: zod
      .boolean()
      .describe('ワークフロー選択画面に表示しない場合true'),
    approvalCancellable: zod
      .boolean()
      .describe('承認の取り消しが可能な場合true'),
    reportFileNameFormat: zod
      .string()
      .nullable()
      .describe('帳票のファイル名フォーマット'),
    current: zod.boolean().describe('現在のバージョンの場合true'),
    notes: zod.string().nullable().describe('管理用メモ'),
    versionCreatedAt: zod.iso
      .datetime({ offset: true })
      .describe('バージョンの作成日時'),
    collectEmailOnExternalPublish: zod
      .boolean()
      .describe('外部公開時にメールアドレスを収集する場合true'),
    notifyGuestOnCompletion: zod
      .boolean()
      .describe('外部ゲストに申請結果（完了\/却下）を通知する場合true'),
    allowCustomSteps: zod
      .boolean()
      .describe('カスタムステップの追加を許可する場合true'),
  })
  .describe('ワークフロー')
export const ListWorkflowsResponse = zod.array(ListWorkflowsResponseItem)

/**
 * 指定したIDのワークフローを取得します。
 * @summary ワークフローを取得
 */
export const getWorkflowPathWorkflowIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const GetWorkflowParams = zod.object({
  workflowId: zod
    .string()
    .regex(getWorkflowPathWorkflowIdRegExp)
    .describe('ワークフローのUUIDまたはコード'),
})

export const getWorkflowResponseOneOneCodeRegExp = new RegExp(
  '^[a-zA-Z0-9_-]+$',
)
export const getWorkflowResponseOneOnePublicTicketDefault = false
export const getWorkflowResponseOneOneVisibleToTeamMembersDefault = false
export const getWorkflowResponseOneOneAllowEditingOfViewersDefault = true
export const getWorkflowResponseOneOneCommentingEnabledDefault = true
export const getWorkflowResponseOneOneCommentingRequiredOnApprovalDefault = false
export const getWorkflowResponseOneOneCommentingRequiredOnRejectionDefault = false
export const getWorkflowResponseOneOneCommentingRequiredOnDenialDefault = false
export const getWorkflowResponseOneOneAuthorOneEmailMax = 254

export const getWorkflowResponseOneOneAuthorOneCodeMax = 100

export const getWorkflowResponseOneOneAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneOneAuthorOneLastNameMax = 255

export const getWorkflowResponseOneOneAuthorOneFullNameMax = 255

export const getWorkflowResponseOneOneAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneOneVersionAuthorOneEmailMax = 254

export const getWorkflowResponseOneOneVersionAuthorOneCodeMax = 100

export const getWorkflowResponseOneOneVersionAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneOneVersionAuthorOneLastNameMax = 255

export const getWorkflowResponseOneOneVersionAuthorOneFullNameMax = 255

export const getWorkflowResponseOneOneVersionAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneOneFolderOneNameMax = 300

export const getWorkflowResponseOneOneFolderOneCodeMax = 100

export const getWorkflowResponseOneOneFolderOneWorkflowsCountMin = 0

export const getWorkflowResponseOneOneFolderOneRoutesCountMin = 0

export const getWorkflowResponseOneOneFolderOnePipelinesCountMin = 0

export const getWorkflowResponseOneOneCategoriesItemCodeMax = 100

export const getWorkflowResponseOneOneCategoriesItemNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneItemsCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneIsDefaultDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneIsDefaultDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCodeRegExp =
  new RegExp('^[a-zA-Z0-9_-]+$')
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOnePublicTicketDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVisibleToTeamMembersDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAllowEditingOfViewersDefault = true
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingEnabledDefault = true
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingRequiredOnApprovalDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingRequiredOnRejectionDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingRequiredOnDenialDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneWorkflowsCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneRoutesCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOnePipelinesCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCategoriesItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCategoriesItemNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCodeRegExp =
  new RegExp('^[a-zA-Z0-9_-]+$')
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemPublicTicketDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVisibleToTeamMembersDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAllowEditingOfViewersDefault = true
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingEnabledDefault = true
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnApprovalDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnRejectionDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnDenialDefault = false
export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneWorkflowsCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneRoutesCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOnePipelinesCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneIsDefaultDefault = false
export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemOneMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemOneMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneItemsCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldDescriptionMax = 10000

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneIsDefaultDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemSlipFieldMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemSlipFieldMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneIsDefaultDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCodeRegExp =
  new RegExp('^[a-zA-Z0-9_-]+$')
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemPublicTicketDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVisibleToTeamMembersDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAllowEditingOfViewersDefault = true
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingEnabledDefault = true
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnApprovalDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnRejectionDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnDenialDefault = false
export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneWorkflowsCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneRoutesCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOnePipelinesCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneEmailMax = 254

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneFirstNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneLastNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneFullNameMax = 255

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneIsDefaultDefault = false
export const getWorkflowResponseOneTwoTicketViewersItemUserOneEmailMax = 254

export const getWorkflowResponseOneTwoTicketViewersItemUserOneCodeMax = 100

export const getWorkflowResponseOneTwoTicketViewersItemUserOneFirstNameMax = 255

export const getWorkflowResponseOneTwoTicketViewersItemUserOneLastNameMax = 255

export const getWorkflowResponseOneTwoTicketViewersItemUserOneFullNameMax = 255

export const getWorkflowResponseOneTwoTicketViewersItemUserOneEmployeeIdMax = 30

export const getWorkflowResponseOneTwoTicketViewersItemTeamOneNameMax = 300

export const getWorkflowResponseOneTwoTicketViewersItemTeamOneCodeMax = 100

export const getWorkflowResponseOneTwoTicketViewersItemTeamOneNotesMax = 10000

export const getWorkflowResponseOneTwoTicketViewersItemTeamOneUsersCountMin = 0

export const getWorkflowResponseOneTwoTicketViewersItemGradeOneNameMax = 300

export const getWorkflowResponseOneTwoTicketViewersItemGradeOneLevelMin = 0
export const getWorkflowResponseOneTwoTicketViewersItemGradeOneLevelMax = 255

export const getWorkflowResponseOneTwoTicketViewersItemGradeOneCodeMax = 100

export const getWorkflowResponseOneTwoTicketViewersItemGradeOneIsDefaultDefault = false
export const getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneEmailMax = 254

export const getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneFirstNameMax = 255

export const getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneLastNameMax = 255

export const getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneFullNameMax = 255

export const getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneEmailMax = 254

export const getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneFirstNameMax = 255

export const getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneLastNameMax = 255

export const getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneFullNameMax = 255

export const getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneEmployeeIdMax = 30

export const getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneNameMax = 300

export const getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneWorkflowsCountMin = 0

export const getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneRoutesCountMin = 0

export const getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOnePipelinesCountMin = 0

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneTitleMax = 300

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneMinLengthMin = 0

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneMaxLengthMin = 0

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneDecimalDigitMin = 0

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneNameMax = 300

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneLevelMin = 0
export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneLevelMax = 255

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneIsDefaultDefault = false
export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneNameMax = 300

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneNotesMax = 10000

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneUsersCountMin = 0

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldTitleMax = 300

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldDescriptionMax = 10000

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax = 100

export const GetWorkflowResponse = zod
  .object({
    id: zod.string().describe('UUID'),
    code: zod
      .string()
      .regex(getWorkflowResponseOneOneCodeRegExp)
      .describe('コード'),
    versionId: zod.string().describe('バージョンのUUID'),
    versionNumber: zod.int().describe('バージョン番号'),
    name: zod.string().describe('名前'),
    description: zod.string().describe('説明'),
    status: zod
      .enum(['visible', 'invisible', 'deleted'])
      .describe(
        'ステータス。visibleは有効、invisibleは無効、deletedは削除済み。',
      ),
    publicTicket: zod
      .boolean()
      .default(getWorkflowResponseOneOnePublicTicketDefault)
      .describe('チケットがテナント全体に共有される場合true'),
    visibleToManager: zod
      .enum(['none', 'direct', 'all'])
      .describe(
        '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
      ),
    visibleToTeamMembers: zod
      .boolean()
      .default(getWorkflowResponseOneOneVisibleToTeamMembersDefault)
      .describe('申請チームのメンバーが共有ユーザーに追加される場合true'),
    titleDescription: zod.string().nullable().describe('タイトルの説明'),
    ticketNumberFormat: zod
      .string()
      .nullable()
      .describe('チケット番号のフォーマット'),
    overwritable: zod.boolean().describe('承認者による上書きが可能な場合true'),
    createdAt: zod.string().describe('作成日時'),
    updatedAt: zod.string().describe('更新日時'),
    titleInputMode: zod
      .enum(['none', 'input', 'calculate'])
      .describe('タイトル入力モード'),
    titleFormula: zod.string().nullable().describe('タイトルの計算式'),
    allowEditingOfViewers: zod
      .boolean()
      .default(getWorkflowResponseOneOneAllowEditingOfViewersDefault)
      .describe('共有ユーザーの編集が可能な場合true'),
    commentingEnabled: zod
      .boolean()
      .default(getWorkflowResponseOneOneCommentingEnabledDefault)
      .describe(
        '新規コメント投稿が許可されている場合 true。 false の場合、ワークフロー配下のすべてのチケットで新規コメント投稿が禁止される。',
      ),
    commentingRequiredOnApproval: zod
      .boolean()
      .default(getWorkflowResponseOneOneCommentingRequiredOnApprovalDefault)
      .describe(
        '承認（回覧の確認を含む）時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは承認・確認できない。',
      ),
    commentingRequiredOnRejection: zod
      .boolean()
      .default(getWorkflowResponseOneOneCommentingRequiredOnRejectionDefault)
      .describe(
        '差し戻し時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは差し戻しできない。',
      ),
    commentingRequiredOnDenial: zod
      .boolean()
      .default(getWorkflowResponseOneOneCommentingRequiredOnDenialDefault)
      .describe(
        '却下時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは却下できない。',
      ),
    author: zod
      .union([
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(getWorkflowResponseOneOneAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(getWorkflowResponseOneOneAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(getWorkflowResponseOneOneAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(getWorkflowResponseOneOneAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(getWorkflowResponseOneOneAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(getWorkflowResponseOneOneAuthorOneEmployeeIdMax)
              .nullable()
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
            userType: zod
              .enum(['normal', 'assistant'])
              .optional()
              .describe(
                'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
              ),
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
            deactivatedAt: zod.iso
              .datetime({ offset: true })
              .nullish()
              .describe('削除日時'),
            lastUsedOn: zod.iso
              .date()
              .nullish()
              .describe(
                '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
              ),
            customFields: zod
              .array(
                zod.object({
                  code: zod
                    .string()
                    .describe('UserCustomField#code（変換せずそのまま）'),
                  fieldType: zod
                    .union([
                      zod.literal('text'),
                      zod.literal('textLong'),
                      zod.literal('number'),
                      zod.literal('integer'),
                      zod.literal('checkbox'),
                      zod.literal('pullDown'),
                      zod.literal('date'),
                      zod.literal(null),
                    ])
                    .nullable()
                    .describe(
                      'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                    ),
                  value: zod
                    .union([
                      zod.string(),
                      zod.number(),
                      zod.array(zod.string()),
                      zod.null(),
                    ])
                    .describe(
                      'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                    ),
                }),
              )
              .optional()
              .describe(
                'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
              ),
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
              .max(getWorkflowResponseOneOneVersionAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(getWorkflowResponseOneOneVersionAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(getWorkflowResponseOneOneVersionAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(getWorkflowResponseOneOneVersionAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(getWorkflowResponseOneOneVersionAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(getWorkflowResponseOneOneVersionAuthorOneEmployeeIdMax)
              .nullable()
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
            userType: zod
              .enum(['normal', 'assistant'])
              .optional()
              .describe(
                'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
              ),
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
            deactivatedAt: zod.iso
              .datetime({ offset: true })
              .nullish()
              .describe('削除日時'),
            lastUsedOn: zod.iso
              .date()
              .nullish()
              .describe(
                '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
              ),
            customFields: zod
              .array(
                zod.object({
                  code: zod
                    .string()
                    .describe('UserCustomField#code（変換せずそのまま）'),
                  fieldType: zod
                    .union([
                      zod.literal('text'),
                      zod.literal('textLong'),
                      zod.literal('number'),
                      zod.literal('integer'),
                      zod.literal('checkbox'),
                      zod.literal('pullDown'),
                      zod.literal('date'),
                      zod.literal(null),
                    ])
                    .nullable()
                    .describe(
                      'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                    ),
                  value: zod
                    .union([
                      zod.string(),
                      zod.number(),
                      zod.array(zod.string()),
                      zod.null(),
                    ])
                    .describe(
                      'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                    ),
                }),
              )
              .optional()
              .describe(
                'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
              ),
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
          .max(getWorkflowResponseOneOneFolderOneNameMax)
          .describe('名前'),
        fullName: zod
          .string()
          .describe('フルネーム（ルートフォルダからのパス）'),
        code: zod
          .string()
          .max(getWorkflowResponseOneOneFolderOneCodeMax)
          .describe('コード'),
        description: zod.string().nullable().describe('説明'),
        workflowsCount: zod
          .int()
          .min(getWorkflowResponseOneOneFolderOneWorkflowsCountMin)
          .describe('フォルダ内のワークフロー数'),
        routesCount: zod
          .int()
          .min(getWorkflowResponseOneOneFolderOneRoutesCountMin)
          .describe('フォルダ内の経路数'),
        pipelinesCount: zod
          .int()
          .min(getWorkflowResponseOneOneFolderOnePipelinesCountMin)
          .describe('フォルダ内のパイプライン数'),
        editable: zod.boolean().describe('編集可能かどうか'),
        createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
        updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
      })
      .describe('フォルダ')
      .describe('フォルダ'),
    categories: zod
      .array(
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            code: zod
              .string()
              .max(getWorkflowResponseOneOneCategoriesItemCodeMax)
              .describe('コード'),
            name: zod
              .string()
              .max(getWorkflowResponseOneOneCategoriesItemNameMax)
              .describe('名前'),
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
          })
          .describe('カテゴリ'),
      )
      .describe('カテゴリの配列'),
    availableToEveryone: zod
      .boolean()
      .describe('全ユーザーが申請可能な場合true'),
    reportFormats: zod
      .array(zod.enum(['pdf', 'excel']))
      .describe('帳票のフォーマット'),
    hiddenOnWorkflowFilterForTicket: zod
      .boolean()
      .describe('チケット検索のワークフローフィルタに表示しない場合true'),
    hiddenOnWorkflowSelectionScreen: zod
      .boolean()
      .describe('ワークフロー選択画面に表示しない場合true'),
    approvalCancellable: zod
      .boolean()
      .describe('承認の取り消しが可能な場合true'),
    reportFileNameFormat: zod
      .string()
      .nullable()
      .describe('帳票のファイル名フォーマット'),
    current: zod.boolean().describe('現在のバージョンの場合true'),
    notes: zod.string().nullable().describe('管理用メモ'),
    versionCreatedAt: zod.iso
      .datetime({ offset: true })
      .describe('バージョンの作成日時'),
    collectEmailOnExternalPublish: zod
      .boolean()
      .describe('外部公開時にメールアドレスを収集する場合true'),
    notifyGuestOnCompletion: zod
      .boolean()
      .describe('外部ゲストに申請結果（完了\/却下）を通知する場合true'),
    allowCustomSteps: zod
      .boolean()
      .describe('カスタムステップの追加を許可する場合true'),
  })
  .describe('ワークフロー')
  .and(
    zod.object({
      sectionList: zod
        .array(
          zod
            .object({
              sectionType: zod.enum(['form', 'slip']),
              title: zod.string().nullable().describe('タイトル'),
              description: zod.string().nullable().describe('説明'),
              id: zod.uuid().describe('セクションのID（UUID）'),
              code: zod
                .string()
                .optional()
                .describe(
                  '明細セクションのコード。フォームセクションには含まれません。',
                ),
              formFields: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      title: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneTitleMax,
                        )
                        .describe('説明'),
                      description: zod.string().nullable().describe('説明'),
                      fieldType: zod
                        .enum([
                          'text',
                          'text_long',
                          'number',
                          'integer',
                          'checkbox',
                          'pull_down',
                          'date',
                          'file',
                          'master',
                          'user',
                          'team',
                          'ticket',
                          'calculation',
                          'button_api',
                          'button_kintone',
                          'datetime',
                        ])
                        .describe('フィールドの型'),
                      required: zod.boolean().describe('必須項目かどうか'),
                      approver: zod
                        .boolean()
                        .describe('承認者が編集可能かどうか'),
                      author: zod
                        .boolean()
                        .describe('申請者が編集可能かどうか'),
                      options: zod
                        .array(zod.string())
                        .nullable()
                        .describe(
                          '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                        ),
                      code: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneCodeMax,
                        )
                        .describe('コード'),
                      size: zod
                        .enum(['full', 'half'])
                        .describe(
                          'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                        ),
                      regexpFormat: zod
                        .string()
                        .nullable()
                        .describe('正規表現フォーマット'),
                      formula: zod
                        .string()
                        .nullable()
                        .describe(
                          '計算式。\n型がcalculationのときのみ値が入ります。',
                        ),
                      defaultValue: zod.string().nullable().describe('初期値'),
                      minValue: zod.number().nullable().describe('最小値'),
                      maxValue: zod.number().nullable().describe('最大値'),
                      minLength: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMinLengthMin,
                        )
                        .nullable()
                        .describe('最小文字数'),
                      maxLength: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMaxLengthMin,
                        )
                        .nullable()
                        .describe('最大文字数'),
                      decimalDigit: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneDecimalDigitMin,
                        )
                        .nullable()
                        .describe('小数の桁数'),
                      delimited: zod
                        .boolean()
                        .nullable()
                        .describe(
                          'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                        ),
                      prefix: zod
                        .string()
                        .nullable()
                        .describe('単位（接頭辞）'),
                      suffix: zod
                        .string()
                        .nullable()
                        .describe('単位（接尾辞）'),
                      hidden: zod
                        .boolean()
                        .nullable()
                        .describe('隠しフィールドである場合true'),
                      readonlyOnUi: zod
                        .boolean()
                        .nullable()
                        .describe(
                          'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                        ),
                      multiple: zod
                        .boolean()
                        .describe('複数選択を許可するかどうか'),
                      orientation: zod
                        .enum(['vertical', 'horizontal'])
                        .describe(
                          'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                        ),
                      allowedExtensions: zod
                        .array(zod.string())
                        .nullable()
                        .describe(
                          '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                        ),
                      autoLink: zod
                        .boolean()
                        .describe(
                          'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                        ),
                      useTodayForDefaultValue: zod
                        .boolean()
                        .describe(
                          '日付型フィールドで、当日の日付を初期値にするかどうか',
                        ),
                      allowedTicketStatus: zod
                        .array(
                          zod.enum([
                            'draft',
                            'in_progress',
                            'completed',
                            'rejected',
                            'archived',
                            'denied',
                          ]),
                        )
                        .describe(
                          'チケット型フィールドで、選択可能なチケットのステータス',
                        ),
                    })
                    .describe('フォームフィールド')
                    .and(
                      zod.object({
                        generalMaster: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                code: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneCodeMax,
                                  )
                                  .describe('コード'),
                                name: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneNameMax,
                                  )
                                  .describe('名前'),
                                description: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneDescriptionMax,
                                  )
                                  .nullable()
                                  .describe('説明'),
                                defaultSortBy: zod
                                  .enum(['name', 'code'])
                                  .describe('アイテム一覧のデフォルト並び順'),
                                itemsCount: zod
                                  .int()
                                  .min(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneItemsCountMin,
                                  )
                                  .describe('アイテム数'),
                                initialDisplayCode: zod
                                  .boolean()
                                  .describe('コードを初期表示するか'),
                                initialDisplayCreatedAt: zod
                                  .boolean()
                                  .describe('作成日時を初期表示するか'),
                                initialDisplayDescription: zod
                                  .boolean()
                                  .describe('説明を初期表示するか'),
                                createdAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('更新日時'),
                                fields: zod
                                  .array(
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        title: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemTitleMax,
                                          )
                                          .describe('フィールド名'),
                                        description: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemDescriptionMax,
                                          )
                                          .nullable()
                                          .describe('フィールドの説明'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemCodeMax,
                                          )
                                          .describe('フィールドのコード'),
                                        fieldType: zod
                                          .enum([
                                            'text',
                                            'text_long',
                                            'number',
                                            'integer',
                                            'checkbox',
                                            'pull_down',
                                            'date',
                                          ])
                                          .describe('フィールドの型'),
                                        required: zod
                                          .boolean()
                                          .describe('必須項目かどうか'),
                                        fieldOrder: zod
                                          .int()
                                          .describe('フィールドの表示順'),
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        initialDisplay: zod
                                          .boolean()
                                          .describe('初期表示するか'),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                      })
                                      .describe(
                                        '汎用マスタのカスタムフィールド',
                                      ),
                                  )
                                  .describe('カスタムフィールドの配列'),
                              })
                              .describe('汎用マスタ'),
                            zod.null(),
                          ])
                          .describe('汎用マスタ（汎用マスタフィールドの場合）'),
                        defaultGeneralMasterItem: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                code: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneCodeMax,
                                  )
                                  .describe('コード'),
                                name: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneNameMax,
                                  )
                                  .describe('名前'),
                                description: zod
                                  .string()
                                  .nullable()
                                  .describe('説明'),
                                createdAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('更新日時'),
                                startsOn: zod.iso
                                  .date()
                                  .nullable()
                                  .describe('有効期限の開始日'),
                                endsOn: zod.iso
                                  .date()
                                  .nullable()
                                  .describe('有効期限の終了日'),
                                inputs: zod
                                  .array(
                                    zod.object({
                                      id: zod.uuid().describe('UUID'),
                                      value: zod
                                        .union([
                                          zod.string().nullable(),
                                          zod.array(zod.string()),
                                        ])
                                        .describe('入力値'),
                                      createdAt: zod.iso
                                        .datetime({ offset: true })
                                        .describe('作成日時'),
                                      updatedAt: zod.iso
                                        .datetime({ offset: true })
                                        .describe('更新日時'),
                                      field: zod
                                        .object({
                                          id: zod.uuid().describe('UUID'),
                                          title: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldTitleMax,
                                            )
                                            .describe('フィールド名'),
                                          description: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldDescriptionMax,
                                            )
                                            .nullable()
                                            .describe('フィールドの説明'),
                                          code: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldCodeMax,
                                            )
                                            .describe('フィールドのコード'),
                                          fieldType: zod
                                            .enum([
                                              'text',
                                              'text_long',
                                              'number',
                                              'integer',
                                              'checkbox',
                                              'pull_down',
                                              'date',
                                            ])
                                            .describe('フィールドの型'),
                                          required: zod
                                            .boolean()
                                            .describe('必須項目かどうか'),
                                          fieldOrder: zod
                                            .int()
                                            .describe('フィールドの表示順'),
                                          visible: zod
                                            .boolean()
                                            .describe(
                                              '管理者以外も閲覧可能な場合true',
                                            ),
                                          initialDisplay: zod
                                            .boolean()
                                            .describe('初期表示するか'),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                            ),
                                          createdAt: zod.iso
                                            .datetime({ offset: true })
                                            .describe('作成日時'),
                                          updatedAt: zod.iso
                                            .datetime({ offset: true })
                                            .describe('更新日時'),
                                        })
                                        .describe(
                                          '汎用マスタのカスタムフィールド',
                                        ),
                                    }),
                                  )
                                  .describe('カスタムフィールドの入力の配列'),
                              })
                              .describe('汎用マスタのアイテム'),
                            zod.null(),
                          ])
                          .describe('初期値（汎用マスタフィールドの場合）'),
                        externalApiSetting: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                httpMethod: zod
                                  .enum([
                                    'get',
                                    'post',
                                    'put',
                                    'delete',
                                    'patch',
                                  ])
                                  .describe('HTTPメソッド'),
                                url: zod.url().describe('URL'),
                                body: zod
                                  .string()
                                  .nullable()
                                  .describe('リクエストボディ'),
                                headers: zod
                                  .array(
                                    zod.object({
                                      key: zod
                                        .string()
                                        .describe('ヘッダーのキー'),
                                      value: zod
                                        .string()
                                        .describe('ヘッダーの値'),
                                    }),
                                  )
                                  .describe('リクエストヘッダー'),
                                responseArray: zod
                                  .boolean()
                                  .describe(
                                    'レスポンスが複数レコードを含む場合true',
                                  ),
                                arrayJsonPath: zod
                                  .string()
                                  .nullable()
                                  .describe(
                                    '複数レコードを含む場合の配列へのJSONPath',
                                  ),
                                mappings: zod
                                  .array(
                                    zod.object({
                                      formField: zod
                                        .object({
                                          id: zod.uuid().describe('UUID'),
                                          title: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldTitleMax,
                                            )
                                            .describe('説明'),
                                          description: zod
                                            .string()
                                            .nullable()
                                            .describe('説明'),
                                          fieldType: zod
                                            .enum([
                                              'text',
                                              'text_long',
                                              'number',
                                              'integer',
                                              'checkbox',
                                              'pull_down',
                                              'date',
                                              'file',
                                              'master',
                                              'user',
                                              'team',
                                              'ticket',
                                              'calculation',
                                              'button_api',
                                              'button_kintone',
                                              'datetime',
                                            ])
                                            .describe('フィールドの型'),
                                          required: zod
                                            .boolean()
                                            .describe('必須項目かどうか'),
                                          approver: zod
                                            .boolean()
                                            .describe(
                                              '承認者が編集可能かどうか',
                                            ),
                                          author: zod
                                            .boolean()
                                            .describe(
                                              '申請者が編集可能かどうか',
                                            ),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                            ),
                                          code: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldCodeMax,
                                            )
                                            .describe('コード'),
                                          size: zod
                                            .enum(['full', 'half'])
                                            .describe(
                                              'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                            ),
                                          regexpFormat: zod
                                            .string()
                                            .nullable()
                                            .describe('正規表現フォーマット'),
                                          formula: zod
                                            .string()
                                            .nullable()
                                            .describe(
                                              '計算式。\n型がcalculationのときのみ値が入ります。',
                                            ),
                                          defaultValue: zod
                                            .string()
                                            .nullable()
                                            .describe('初期値'),
                                          minValue: zod
                                            .number()
                                            .nullable()
                                            .describe('最小値'),
                                          maxValue: zod
                                            .number()
                                            .nullable()
                                            .describe('最大値'),
                                          minLength: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldMinLengthMin,
                                            )
                                            .nullable()
                                            .describe('最小文字数'),
                                          maxLength: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldMaxLengthMin,
                                            )
                                            .nullable()
                                            .describe('最大文字数'),
                                          decimalDigit: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldDecimalDigitMin,
                                            )
                                            .nullable()
                                            .describe('小数の桁数'),
                                          delimited: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                            ),
                                          prefix: zod
                                            .string()
                                            .nullable()
                                            .describe('単位（接頭辞）'),
                                          suffix: zod
                                            .string()
                                            .nullable()
                                            .describe('単位（接尾辞）'),
                                          hidden: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              '隠しフィールドである場合true',
                                            ),
                                          readonlyOnUi: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                            ),
                                          multiple: zod
                                            .boolean()
                                            .describe(
                                              '複数選択を許可するかどうか',
                                            ),
                                          orientation: zod
                                            .enum(['vertical', 'horizontal'])
                                            .describe(
                                              'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                            ),
                                          allowedExtensions: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                            ),
                                          autoLink: zod
                                            .boolean()
                                            .describe(
                                              'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                            ),
                                          useTodayForDefaultValue: zod
                                            .boolean()
                                            .describe(
                                              '日付型フィールドで、当日の日付を初期値にするかどうか',
                                            ),
                                          allowedTicketStatus: zod
                                            .array(
                                              zod.enum([
                                                'draft',
                                                'in_progress',
                                                'completed',
                                                'rejected',
                                                'archived',
                                                'denied',
                                              ]),
                                            )
                                            .describe(
                                              'チケット型フィールドで、選択可能なチケットのステータス',
                                            ),
                                        })
                                        .describe('フォームフィールド'),
                                      jsonPath: zod
                                        .string()
                                        .describe('値抽出用のJSONPath'),
                                      displayInTable: zod
                                        .boolean()
                                        .describe(
                                          '選択用テーブルで表示する場合true',
                                        ),
                                      title: zod
                                        .string()
                                        .nullable()
                                        .describe('選択用テーブルでのタイトル'),
                                    }),
                                  )
                                  .describe('フィールドへのマッピング設定'),
                              })
                              .describe('外部API設定'),
                            zod.null(),
                          ])
                          .describe(
                            '外部API設定。fieldTypeがbutton_apiのときのみ値が入ります。',
                          ),
                        kintoneAppSetting: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                formField: zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    title: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldTitleMax,
                                      )
                                      .describe('説明'),
                                    description: zod
                                      .string()
                                      .nullable()
                                      .describe('説明'),
                                    fieldType: zod
                                      .enum([
                                        'text',
                                        'text_long',
                                        'number',
                                        'integer',
                                        'checkbox',
                                        'pull_down',
                                        'date',
                                        'file',
                                        'master',
                                        'user',
                                        'team',
                                        'ticket',
                                        'calculation',
                                        'button_api',
                                        'button_kintone',
                                        'datetime',
                                      ])
                                      .describe('フィールドの型'),
                                    required: zod
                                      .boolean()
                                      .describe('必須項目かどうか'),
                                    approver: zod
                                      .boolean()
                                      .describe('承認者が編集可能かどうか'),
                                    author: zod
                                      .boolean()
                                      .describe('申請者が編集可能かどうか'),
                                    options: zod
                                      .array(zod.string())
                                      .nullable()
                                      .describe(
                                        '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                      ),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldCodeMax,
                                      )
                                      .describe('コード'),
                                    size: zod
                                      .enum(['full', 'half'])
                                      .describe(
                                        'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                      ),
                                    regexpFormat: zod
                                      .string()
                                      .nullable()
                                      .describe('正規表現フォーマット'),
                                    formula: zod
                                      .string()
                                      .nullable()
                                      .describe(
                                        '計算式。\n型がcalculationのときのみ値が入ります。',
                                      ),
                                    defaultValue: zod
                                      .string()
                                      .nullable()
                                      .describe('初期値'),
                                    minValue: zod
                                      .number()
                                      .nullable()
                                      .describe('最小値'),
                                    maxValue: zod
                                      .number()
                                      .nullable()
                                      .describe('最大値'),
                                    minLength: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldMinLengthMin,
                                      )
                                      .nullable()
                                      .describe('最小文字数'),
                                    maxLength: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldMaxLengthMin,
                                      )
                                      .nullable()
                                      .describe('最大文字数'),
                                    decimalDigit: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldDecimalDigitMin,
                                      )
                                      .nullable()
                                      .describe('小数の桁数'),
                                    delimited: zod
                                      .boolean()
                                      .nullable()
                                      .describe(
                                        'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                      ),
                                    prefix: zod
                                      .string()
                                      .nullable()
                                      .describe('単位（接頭辞）'),
                                    suffix: zod
                                      .string()
                                      .nullable()
                                      .describe('単位（接尾辞）'),
                                    hidden: zod
                                      .boolean()
                                      .nullable()
                                      .describe('隠しフィールドである場合true'),
                                    readonlyOnUi: zod
                                      .boolean()
                                      .nullable()
                                      .describe(
                                        'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                      ),
                                    multiple: zod
                                      .boolean()
                                      .describe('複数選択を許可するかどうか'),
                                    orientation: zod
                                      .enum(['vertical', 'horizontal'])
                                      .describe(
                                        'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                      ),
                                    allowedExtensions: zod
                                      .array(zod.string())
                                      .nullable()
                                      .describe(
                                        '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                      ),
                                    autoLink: zod
                                      .boolean()
                                      .describe(
                                        'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                      ),
                                    useTodayForDefaultValue: zod
                                      .boolean()
                                      .describe(
                                        '日付型フィールドで、当日の日付を初期値にするかどうか',
                                      ),
                                    allowedTicketStatus: zod
                                      .array(
                                        zod.enum([
                                          'draft',
                                          'in_progress',
                                          'completed',
                                          'rejected',
                                          'archived',
                                          'denied',
                                        ]),
                                      )
                                      .describe(
                                        'チケット型フィールドで、選択可能なチケットのステータス',
                                      ),
                                  })
                                  .describe('フォームフィールド'),
                                kintoneApp: zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .describe('kintoneアプリ名'),
                                    domain: zod
                                      .string()
                                      .describe('kintoneドメイン'),
                                    appId: zod
                                      .string()
                                      .describe('kintoneアプリID'),
                                    code: zod
                                      .string()
                                      .nullable()
                                      .describe('コード'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('kintone連携'),
                                createdAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('更新日時'),
                                mappings: zod
                                  .array(
                                    zod.object({
                                      id: zod.uuid().describe('UUID'),
                                      displayInTable: zod
                                        .boolean()
                                        .describe(
                                          '選択用テーブルで表示する場合true',
                                        ),
                                      kintoneFieldCode: zod
                                        .string()
                                        .describe('kintoneフィールドコード'),
                                      kintoneFieldName: zod
                                        .string()
                                        .describe('kintoneフィールドコード'),
                                      kintoneFieldType: zod
                                        .string()
                                        .describe('kintoneフィールドコード'),
                                      formField: zod
                                        .object({
                                          id: zod.uuid().describe('UUID'),
                                          title: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldTitleMax,
                                            )
                                            .describe('説明'),
                                          description: zod
                                            .string()
                                            .nullable()
                                            .describe('説明'),
                                          fieldType: zod
                                            .enum([
                                              'text',
                                              'text_long',
                                              'number',
                                              'integer',
                                              'checkbox',
                                              'pull_down',
                                              'date',
                                              'file',
                                              'master',
                                              'user',
                                              'team',
                                              'ticket',
                                              'calculation',
                                              'button_api',
                                              'button_kintone',
                                              'datetime',
                                            ])
                                            .describe('フィールドの型'),
                                          required: zod
                                            .boolean()
                                            .describe('必須項目かどうか'),
                                          approver: zod
                                            .boolean()
                                            .describe(
                                              '承認者が編集可能かどうか',
                                            ),
                                          author: zod
                                            .boolean()
                                            .describe(
                                              '申請者が編集可能かどうか',
                                            ),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                            ),
                                          code: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldCodeMax,
                                            )
                                            .describe('コード'),
                                          size: zod
                                            .enum(['full', 'half'])
                                            .describe(
                                              'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                            ),
                                          regexpFormat: zod
                                            .string()
                                            .nullable()
                                            .describe('正規表現フォーマット'),
                                          formula: zod
                                            .string()
                                            .nullable()
                                            .describe(
                                              '計算式。\n型がcalculationのときのみ値が入ります。',
                                            ),
                                          defaultValue: zod
                                            .string()
                                            .nullable()
                                            .describe('初期値'),
                                          minValue: zod
                                            .number()
                                            .nullable()
                                            .describe('最小値'),
                                          maxValue: zod
                                            .number()
                                            .nullable()
                                            .describe('最大値'),
                                          minLength: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldMinLengthMin,
                                            )
                                            .nullable()
                                            .describe('最小文字数'),
                                          maxLength: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldMaxLengthMin,
                                            )
                                            .nullable()
                                            .describe('最大文字数'),
                                          decimalDigit: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldDecimalDigitMin,
                                            )
                                            .nullable()
                                            .describe('小数の桁数'),
                                          delimited: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                            ),
                                          prefix: zod
                                            .string()
                                            .nullable()
                                            .describe('単位（接頭辞）'),
                                          suffix: zod
                                            .string()
                                            .nullable()
                                            .describe('単位（接尾辞）'),
                                          hidden: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              '隠しフィールドである場合true',
                                            ),
                                          readonlyOnUi: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                            ),
                                          multiple: zod
                                            .boolean()
                                            .describe(
                                              '複数選択を許可するかどうか',
                                            ),
                                          orientation: zod
                                            .enum(['vertical', 'horizontal'])
                                            .describe(
                                              'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                            ),
                                          allowedExtensions: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                            ),
                                          autoLink: zod
                                            .boolean()
                                            .describe(
                                              'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                            ),
                                          useTodayForDefaultValue: zod
                                            .boolean()
                                            .describe(
                                              '日付型フィールドで、当日の日付を初期値にするかどうか',
                                            ),
                                          allowedTicketStatus: zod
                                            .array(
                                              zod.enum([
                                                'draft',
                                                'in_progress',
                                                'completed',
                                                'rejected',
                                                'archived',
                                                'denied',
                                              ]),
                                            )
                                            .describe(
                                              'チケット型フィールドで、選択可能なチケットのステータス',
                                            ),
                                        })
                                        .describe('フォームフィールド'),
                                    }),
                                  )
                                  .describe('フィールドへのマッピング設定'),
                              })
                              .describe('kintone連携設定'),
                            zod.null(),
                          ])
                          .describe(
                            '外部API設定。fieldTypeがbutton_kintoneのときのみ値が入ります。',
                          ),
                        climberCloudSetting: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                tenantId: zod.uuid().describe('テナントID'),
                                contentsId: zod
                                  .string()
                                  .describe('ファイル付きリストID'),
                                createdAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('更新日時'),
                                formField: zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    title: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldTitleMax,
                                      )
                                      .describe('説明'),
                                    description: zod
                                      .string()
                                      .nullable()
                                      .describe('説明'),
                                    fieldType: zod
                                      .enum([
                                        'text',
                                        'text_long',
                                        'number',
                                        'integer',
                                        'checkbox',
                                        'pull_down',
                                        'date',
                                        'file',
                                        'master',
                                        'user',
                                        'team',
                                        'ticket',
                                        'calculation',
                                        'button_api',
                                        'button_kintone',
                                        'datetime',
                                      ])
                                      .describe('フィールドの型'),
                                    required: zod
                                      .boolean()
                                      .describe('必須項目かどうか'),
                                    approver: zod
                                      .boolean()
                                      .describe('承認者が編集可能かどうか'),
                                    author: zod
                                      .boolean()
                                      .describe('申請者が編集可能かどうか'),
                                    options: zod
                                      .array(zod.string())
                                      .nullable()
                                      .describe(
                                        '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                      ),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldCodeMax,
                                      )
                                      .describe('コード'),
                                    size: zod
                                      .enum(['full', 'half'])
                                      .describe(
                                        'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                      ),
                                    regexpFormat: zod
                                      .string()
                                      .nullable()
                                      .describe('正規表現フォーマット'),
                                    formula: zod
                                      .string()
                                      .nullable()
                                      .describe(
                                        '計算式。\n型がcalculationのときのみ値が入ります。',
                                      ),
                                    defaultValue: zod
                                      .string()
                                      .nullable()
                                      .describe('初期値'),
                                    minValue: zod
                                      .number()
                                      .nullable()
                                      .describe('最小値'),
                                    maxValue: zod
                                      .number()
                                      .nullable()
                                      .describe('最大値'),
                                    minLength: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldMinLengthMin,
                                      )
                                      .nullable()
                                      .describe('最小文字数'),
                                    maxLength: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldMaxLengthMin,
                                      )
                                      .nullable()
                                      .describe('最大文字数'),
                                    decimalDigit: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldDecimalDigitMin,
                                      )
                                      .nullable()
                                      .describe('小数の桁数'),
                                    delimited: zod
                                      .boolean()
                                      .nullable()
                                      .describe(
                                        'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                      ),
                                    prefix: zod
                                      .string()
                                      .nullable()
                                      .describe('単位（接頭辞）'),
                                    suffix: zod
                                      .string()
                                      .nullable()
                                      .describe('単位（接尾辞）'),
                                    hidden: zod
                                      .boolean()
                                      .nullable()
                                      .describe('隠しフィールドである場合true'),
                                    readonlyOnUi: zod
                                      .boolean()
                                      .nullable()
                                      .describe(
                                        'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                      ),
                                    multiple: zod
                                      .boolean()
                                      .describe('複数選択を許可するかどうか'),
                                    orientation: zod
                                      .enum(['vertical', 'horizontal'])
                                      .describe(
                                        'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                      ),
                                    allowedExtensions: zod
                                      .array(zod.string())
                                      .nullable()
                                      .describe(
                                        '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                      ),
                                    autoLink: zod
                                      .boolean()
                                      .describe(
                                        'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                      ),
                                    useTodayForDefaultValue: zod
                                      .boolean()
                                      .describe(
                                        '日付型フィールドで、当日の日付を初期値にするかどうか',
                                      ),
                                    allowedTicketStatus: zod
                                      .array(
                                        zod.enum([
                                          'draft',
                                          'in_progress',
                                          'completed',
                                          'rejected',
                                          'archived',
                                          'denied',
                                        ]),
                                      )
                                      .describe(
                                        'チケット型フィールドで、選択可能なチケットのステータス',
                                      ),
                                  })
                                  .describe('フォームフィールド'),
                                mappings: zod
                                  .array(
                                    zod.object({
                                      formField: zod
                                        .object({
                                          id: zod.uuid().describe('UUID'),
                                          title: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldTitleMax,
                                            )
                                            .describe('説明'),
                                          description: zod
                                            .string()
                                            .nullable()
                                            .describe('説明'),
                                          fieldType: zod
                                            .enum([
                                              'text',
                                              'text_long',
                                              'number',
                                              'integer',
                                              'checkbox',
                                              'pull_down',
                                              'date',
                                              'file',
                                              'master',
                                              'user',
                                              'team',
                                              'ticket',
                                              'calculation',
                                              'button_api',
                                              'button_kintone',
                                              'datetime',
                                            ])
                                            .describe('フィールドの型'),
                                          required: zod
                                            .boolean()
                                            .describe('必須項目かどうか'),
                                          approver: zod
                                            .boolean()
                                            .describe(
                                              '承認者が編集可能かどうか',
                                            ),
                                          author: zod
                                            .boolean()
                                            .describe(
                                              '申請者が編集可能かどうか',
                                            ),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                            ),
                                          code: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldCodeMax,
                                            )
                                            .describe('コード'),
                                          size: zod
                                            .enum(['full', 'half'])
                                            .describe(
                                              'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                            ),
                                          regexpFormat: zod
                                            .string()
                                            .nullable()
                                            .describe('正規表現フォーマット'),
                                          formula: zod
                                            .string()
                                            .nullable()
                                            .describe(
                                              '計算式。\n型がcalculationのときのみ値が入ります。',
                                            ),
                                          defaultValue: zod
                                            .string()
                                            .nullable()
                                            .describe('初期値'),
                                          minValue: zod
                                            .number()
                                            .nullable()
                                            .describe('最小値'),
                                          maxValue: zod
                                            .number()
                                            .nullable()
                                            .describe('最大値'),
                                          minLength: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldMinLengthMin,
                                            )
                                            .nullable()
                                            .describe('最小文字数'),
                                          maxLength: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldMaxLengthMin,
                                            )
                                            .nullable()
                                            .describe('最大文字数'),
                                          decimalDigit: zod
                                            .int()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldDecimalDigitMin,
                                            )
                                            .nullable()
                                            .describe('小数の桁数'),
                                          delimited: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                            ),
                                          prefix: zod
                                            .string()
                                            .nullable()
                                            .describe('単位（接頭辞）'),
                                          suffix: zod
                                            .string()
                                            .nullable()
                                            .describe('単位（接尾辞）'),
                                          hidden: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              '隠しフィールドである場合true',
                                            ),
                                          readonlyOnUi: zod
                                            .boolean()
                                            .nullable()
                                            .describe(
                                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                            ),
                                          multiple: zod
                                            .boolean()
                                            .describe(
                                              '複数選択を許可するかどうか',
                                            ),
                                          orientation: zod
                                            .enum(['vertical', 'horizontal'])
                                            .describe(
                                              'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                            ),
                                          allowedExtensions: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                            ),
                                          autoLink: zod
                                            .boolean()
                                            .describe(
                                              'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                            ),
                                          useTodayForDefaultValue: zod
                                            .boolean()
                                            .describe(
                                              '日付型フィールドで、当日の日付を初期値にするかどうか',
                                            ),
                                          allowedTicketStatus: zod
                                            .array(
                                              zod.enum([
                                                'draft',
                                                'in_progress',
                                                'completed',
                                                'rejected',
                                                'archived',
                                                'denied',
                                              ]),
                                            )
                                            .describe(
                                              'チケット型フィールドで、選択可能なチケットのステータス',
                                            ),
                                        })
                                        .describe('フォームフィールド'),
                                      order: zod
                                        .int()
                                        .describe('表示順（1から始まります）'),
                                    }),
                                  )
                                  .describe(
                                    'ClimberCloudのカラムとのマッピング設定',
                                  ),
                              })
                              .describe('ClimberCloud連携設定'),
                            zod.null(),
                          ])
                          .optional()
                          .describe(
                            'ClimberCloud連携設定。fieldTypeがfileのときのみ値が入ります。',
                          ),
                        generalMasterSearchFilters: zod
                          .array(
                            zod.object({
                              id: zod.uuid().describe('UUID'),
                              filterFormFieldId: zod
                                .uuid()
                                .describe(
                                  '絞り込みに使う汎用フィールドのID（UUID）',
                                ),
                              fieldType: zod
                                .enum([
                                  'free_word',
                                  'name',
                                  'code',
                                  'description',
                                  'custom_field',
                                ])
                                .describe('絞り込み先のフィールドのタイプ'),
                              generalMasterFieldId: zod
                                .uuid()
                                .nullable()
                                .describe(
                                  'fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID）',
                                ),
                            }),
                          )
                          .nullable()
                          .describe(
                            '汎用マスタ型フィールドの自動絞り込みの設定',
                          ),
                        approverEditRestriction: zod
                          .union([
                            zod
                              .object({
                                routeStepCodes: zod
                                  .array(zod.string())
                                  .describe(
                                    '入力を必須にする経路ステップのコードの配列',
                                  ),
                              })
                              .describe(
                                'フォームフィールドの承認者による入力制限',
                              ),
                            zod.null(),
                          ])
                          .describe(
                            '承認者による入力制限。設定していない場合はnullになります。',
                          ),
                        approverEditSetting: zod
                          .object({
                            permissionType: zod
                              .enum(['all', 'user', 'team_grade'])
                              .describe(
                                '編集を許可する範囲。\nall=すべての承認者、user=指定したユーザー、team_grade=指定したチーム・役職。',
                              ),
                            descendants: zod
                              .boolean()
                              .describe('下位のチームを含めるかどうか'),
                            gradeSymbol: zod
                              .union([
                                zod.literal('equal'),
                                zod.literal('greater_than'),
                                zod.literal('greater_than_or_equal'),
                                zod.literal('less_than'),
                                zod.literal('less_than_or_equal'),
                                zod.literal(null),
                              ])
                              .nullable()
                              .describe(
                                '役職の比較条件。permissionTypeがteam_gradeで役職を指定した場合のみ値が入ります。',
                              ),
                            grade: zod
                              .union([
                                zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneNameMax,
                                      )
                                      .describe('名前'),
                                    level: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneLevelMin,
                                      )
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneLevelMax,
                                      )
                                      .describe('レベル'),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneCodeMax,
                                      )
                                      .nullable()
                                      .describe('コード'),
                                    isDefault: zod
                                      .boolean()
                                      .default(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingGradeOneIsDefaultDefault,
                                      )
                                      .describe('デフォルトの役職かどうか'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('役職'),
                                zod.null(),
                              ])
                              .describe(
                                '役職。permissionTypeがteam_gradeのときのみ値が入ります。',
                              ),
                            team: zod
                              .union([
                                zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneNameMax,
                                      )
                                      .describe('名前'),
                                    fullName: zod
                                      .string()
                                      .describe('上位組織を含む名前'),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneCodeMax,
                                      )
                                      .describe('コード'),
                                    notes: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneNotesMax,
                                      )
                                      .nullable()
                                      .describe('管理用メモ'),
                                    approveOnly: zod
                                      .boolean()
                                      .describe('承認専用チームかどうか'),
                                    usersCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingTeamOneUsersCountMin,
                                      )
                                      .describe('ユーザー数'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('チーム'),
                                zod.null(),
                              ])
                              .describe(
                                'チーム。permissionTypeがteam_gradeのときのみ値が入ります。',
                              ),
                            users: zod
                              .array(
                                zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    email: zod
                                      .email()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemEmailMax,
                                      )
                                      .describe('メールアドレス'),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemCodeMax,
                                      )
                                      .describe('コード'),
                                    firstName: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemFirstNameMax,
                                      )
                                      .describe('名'),
                                    lastName: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemLastNameMax,
                                      )
                                      .describe('姓'),
                                    fullName: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemFullNameMax,
                                      )
                                      .describe('フルネーム'),
                                    employeeId: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoApproverEditSettingUsersItemEmployeeIdMax,
                                      )
                                      .nullable()
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
                                    locale: zod
                                      .string()
                                      .describe('ロケール（jaまたはen）'),
                                    userType: zod
                                      .enum(['normal', 'assistant'])
                                      .optional()
                                      .describe(
                                        'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                      ),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                    deactivatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .nullish()
                                      .describe('削除日時'),
                                    lastUsedOn: zod.iso
                                      .date()
                                      .nullish()
                                      .describe(
                                        '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                      ),
                                    customFields: zod
                                      .array(
                                        zod.object({
                                          code: zod
                                            .string()
                                            .describe(
                                              'UserCustomField#code（変換せずそのまま）',
                                            ),
                                          fieldType: zod
                                            .union([
                                              zod.literal('text'),
                                              zod.literal('textLong'),
                                              zod.literal('number'),
                                              zod.literal('integer'),
                                              zod.literal('checkbox'),
                                              zod.literal('pullDown'),
                                              zod.literal('date'),
                                              zod.literal(null),
                                            ])
                                            .nullable()
                                            .describe(
                                              'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                            ),
                                          value: zod
                                            .union([
                                              zod.string(),
                                              zod.number(),
                                              zod.array(zod.string()),
                                              zod.null(),
                                            ])
                                            .describe(
                                              'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                            ),
                                        }),
                                      )
                                      .optional()
                                      .describe(
                                        'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                      ),
                                  })
                                  .describe('ユーザー'),
                              )
                              .describe(
                                'ユーザーの配列。permissionTypeがuserのときのみ要素が入ります。',
                              ),
                          })
                          .optional()
                          .describe(
                            '編集できる承認者の設定。設定していない場合はpermissionType=allが入ります。',
                          ),
                        customValidations: zod
                          .array(
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                combinationType: zod
                                  .enum(['all', 'any'])
                                  .describe(
                                    '条件の組み合わせ方。all=すべての条件を満たす、any=いずれかの条件を満たす。',
                                  ),
                                errorMessage: zod
                                  .string()
                                  .describe(
                                    '条件を満たさない場合に表示するエラーメッセージ',
                                  ),
                                fields: zod
                                  .array(
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        symbol: zod
                                          .enum([
                                            'equal',
                                            'not_equal',
                                            'greater_than',
                                            'greater_than_or_equal',
                                            'less_than',
                                            'less_than_or_equal',
                                            'include',
                                            'exclude',
                                            'is_empty',
                                            'is_not_empty',
                                            'descendants_or_equal',
                                          ])
                                          .describe('比較条件'),
                                        value: zod
                                          .string()
                                          .nullable()
                                          .describe('比較する値'),
                                        formField: zod
                                          .object({
                                            id: zod.uuid().describe('UUID'),
                                            title: zod
                                              .string()
                                              .max(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldTitleMax,
                                              )
                                              .describe('説明'),
                                            description: zod
                                              .string()
                                              .nullable()
                                              .describe('説明'),
                                            fieldType: zod
                                              .enum([
                                                'text',
                                                'text_long',
                                                'number',
                                                'integer',
                                                'checkbox',
                                                'pull_down',
                                                'date',
                                                'file',
                                                'master',
                                                'user',
                                                'team',
                                                'ticket',
                                                'calculation',
                                                'button_api',
                                                'button_kintone',
                                                'datetime',
                                              ])
                                              .describe('フィールドの型'),
                                            required: zod
                                              .boolean()
                                              .describe('必須項目かどうか'),
                                            approver: zod
                                              .boolean()
                                              .describe(
                                                '承認者が編集可能かどうか',
                                              ),
                                            author: zod
                                              .boolean()
                                              .describe(
                                                '申請者が編集可能かどうか',
                                              ),
                                            options: zod
                                              .array(zod.string())
                                              .nullable()
                                              .describe(
                                                '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                              ),
                                            code: zod
                                              .string()
                                              .max(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldCodeMax,
                                              )
                                              .describe('コード'),
                                            size: zod
                                              .enum(['full', 'half'])
                                              .describe(
                                                'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                              ),
                                            regexpFormat: zod
                                              .string()
                                              .nullable()
                                              .describe('正規表現フォーマット'),
                                            formula: zod
                                              .string()
                                              .nullable()
                                              .describe(
                                                '計算式。\n型がcalculationのときのみ値が入ります。',
                                              ),
                                            defaultValue: zod
                                              .string()
                                              .nullable()
                                              .describe('初期値'),
                                            minValue: zod
                                              .number()
                                              .nullable()
                                              .describe('最小値'),
                                            maxValue: zod
                                              .number()
                                              .nullable()
                                              .describe('最大値'),
                                            minLength: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldMinLengthMin,
                                              )
                                              .nullable()
                                              .describe('最小文字数'),
                                            maxLength: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldMaxLengthMin,
                                              )
                                              .nullable()
                                              .describe('最大文字数'),
                                            decimalDigit: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemFormFieldDecimalDigitMin,
                                              )
                                              .nullable()
                                              .describe('小数の桁数'),
                                            delimited: zod
                                              .boolean()
                                              .nullable()
                                              .describe(
                                                'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                              ),
                                            prefix: zod
                                              .string()
                                              .nullable()
                                              .describe('単位（接頭辞）'),
                                            suffix: zod
                                              .string()
                                              .nullable()
                                              .describe('単位（接尾辞）'),
                                            hidden: zod
                                              .boolean()
                                              .nullable()
                                              .describe(
                                                '隠しフィールドである場合true',
                                              ),
                                            readonlyOnUi: zod
                                              .boolean()
                                              .nullable()
                                              .describe(
                                                'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                              ),
                                            multiple: zod
                                              .boolean()
                                              .describe(
                                                '複数選択を許可するかどうか',
                                              ),
                                            orientation: zod
                                              .enum(['vertical', 'horizontal'])
                                              .describe(
                                                'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                              ),
                                            allowedExtensions: zod
                                              .array(zod.string())
                                              .nullable()
                                              .describe(
                                                '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                              ),
                                            autoLink: zod
                                              .boolean()
                                              .describe(
                                                'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                              ),
                                            useTodayForDefaultValue: zod
                                              .boolean()
                                              .describe(
                                                '日付型フィールドで、当日の日付を初期値にするかどうか',
                                              ),
                                            allowedTicketStatus: zod
                                              .array(
                                                zod.enum([
                                                  'draft',
                                                  'in_progress',
                                                  'completed',
                                                  'rejected',
                                                  'archived',
                                                  'denied',
                                                ]),
                                              )
                                              .describe(
                                                'チケット型フィールドで、選択可能なチケットのステータス',
                                              ),
                                          })
                                          .describe(
                                            '条件の対象となるフォームフィールド',
                                          ),
                                        generalMasterItem: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneCodeMax,
                                                  )
                                                  .describe('コード'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneNameMax,
                                                  )
                                                  .describe('名前'),
                                                description: zod
                                                  .string()
                                                  .nullable()
                                                  .describe('説明'),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                                startsOn: zod.iso
                                                  .date()
                                                  .nullable()
                                                  .describe('有効期限の開始日'),
                                                endsOn: zod.iso
                                                  .date()
                                                  .nullable()
                                                  .describe('有効期限の終了日'),
                                              })
                                              .describe(
                                                'カスタムバリデーションの条件で比較する汎用マスタアイテム。\nカスタムバリデーションのレスポンスではカスタムフィールドの入力の配列（inputs）を返さないため、\n汎用マスタAPIが返す GeneralMasterItem とは別のコンポーネントとして定義している。',
                                              ),
                                            zod.null(),
                                          ])
                                          .describe(
                                            '比較する汎用マスタアイテム。対象が汎用マスタ型フィールドのときのみ値が入ります。',
                                          ),
                                        grade: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneNameMax,
                                                  )
                                                  .describe('名前'),
                                                level: zod
                                                  .int()
                                                  .min(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMin,
                                                  )
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMax,
                                                  )
                                                  .describe('レベル'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneCodeMax,
                                                  )
                                                  .nullable()
                                                  .describe('コード'),
                                                isDefault: zod
                                                  .boolean()
                                                  .default(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemGradeOneIsDefaultDefault,
                                                  )
                                                  .describe(
                                                    'デフォルトの役職かどうか',
                                                  ),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                              })
                                              .describe('役職'),
                                            zod.null(),
                                          ])
                                          .describe('比較する役職'),
                                        team: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNameMax,
                                                  )
                                                  .describe('名前'),
                                                fullName: zod
                                                  .string()
                                                  .describe(
                                                    '上位組織を含む名前',
                                                  ),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneCodeMax,
                                                  )
                                                  .describe('コード'),
                                                notes: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNotesMax,
                                                  )
                                                  .nullable()
                                                  .describe('管理用メモ'),
                                                approveOnly: zod
                                                  .boolean()
                                                  .describe(
                                                    '承認専用チームかどうか',
                                                  ),
                                                usersCount: zod
                                                  .int()
                                                  .min(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoCustomValidationsItemFieldsItemTeamOneUsersCountMin,
                                                  )
                                                  .describe('ユーザー数'),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                              })
                                              .describe('チーム'),
                                            zod.null(),
                                          ])
                                          .describe('比較するチーム'),
                                      })
                                      .describe(
                                        'フォームフィールドのカスタムバリデーションの条件',
                                      ),
                                  )
                                  .describe(
                                    '条件の配列。表示順の昇順で格納されます。',
                                  ),
                              })
                              .describe(
                                'フォームフィールドのカスタムバリデーション',
                              ),
                          )
                          .describe('カスタムバリデーション'),
                        ticketCopySetting: zod
                          .union([
                            zod
                              .object({
                                workflow: zod
                                  .union([
                                    zod
                                      .object({
                                        id: zod.string().describe('UUID'),
                                        code: zod
                                          .string()
                                          .regex(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCodeRegExp,
                                          )
                                          .describe('コード'),
                                        versionId: zod
                                          .string()
                                          .describe('バージョンのUUID'),
                                        versionNumber: zod
                                          .int()
                                          .describe('バージョン番号'),
                                        name: zod.string().describe('名前'),
                                        description: zod
                                          .string()
                                          .describe('説明'),
                                        status: zod
                                          .enum([
                                            'visible',
                                            'invisible',
                                            'deleted',
                                          ])
                                          .describe(
                                            'ステータス。visibleは有効、invisibleは無効、deletedは削除済み。',
                                          ),
                                        publicTicket: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOnePublicTicketDefault,
                                          )
                                          .describe(
                                            'チケットがテナント全体に共有される場合true',
                                          ),
                                        visibleToManager: zod
                                          .enum(['none', 'direct', 'all'])
                                          .describe(
                                            '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
                                          ),
                                        visibleToTeamMembers: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVisibleToTeamMembersDefault,
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
                                          .describe(
                                            'チケット番号のフォーマット',
                                          ),
                                        overwritable: zod
                                          .boolean()
                                          .describe(
                                            '承認者による上書きが可能な場合true',
                                          ),
                                        createdAt: zod
                                          .string()
                                          .describe('作成日時'),
                                        updatedAt: zod
                                          .string()
                                          .describe('更新日時'),
                                        titleInputMode: zod
                                          .enum(['none', 'input', 'calculate'])
                                          .describe('タイトル入力モード'),
                                        titleFormula: zod
                                          .string()
                                          .nullable()
                                          .describe('タイトルの計算式'),
                                        allowEditingOfViewers: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAllowEditingOfViewersDefault,
                                          )
                                          .describe(
                                            '共有ユーザーの編集が可能な場合true',
                                          ),
                                        commentingEnabled: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingEnabledDefault,
                                          )
                                          .describe(
                                            '新規コメント投稿が許可されている場合 true。 false の場合、ワークフロー配下のすべてのチケットで新規コメント投稿が禁止される。',
                                          ),
                                        commentingRequiredOnApproval: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingRequiredOnApprovalDefault,
                                          )
                                          .describe(
                                            '承認（回覧の確認を含む）時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは承認・確認できない。',
                                          ),
                                        commentingRequiredOnRejection: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingRequiredOnRejectionDefault,
                                          )
                                          .describe(
                                            '差し戻し時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは差し戻しできない。',
                                          ),
                                        commentingRequiredOnDenial: zod
                                          .boolean()
                                          .default(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCommentingRequiredOnDenialDefault,
                                          )
                                          .describe(
                                            '却下時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは却下できない。',
                                          ),
                                        author: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                email: zod
                                                  .email()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneEmailMax,
                                                  )
                                                  .describe('メールアドレス'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneCodeMax,
                                                  )
                                                  .describe('コード'),
                                                firstName: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneFirstNameMax,
                                                  )
                                                  .describe('名'),
                                                lastName: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneLastNameMax,
                                                  )
                                                  .describe('姓'),
                                                fullName: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneFullNameMax,
                                                  )
                                                  .describe('フルネーム'),
                                                employeeId: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneAuthorOneEmployeeIdMax,
                                                  )
                                                  .nullable()
                                                  .describe('社員番号'),
                                                image: zod
                                                  .object({
                                                    '100x100': zod
                                                      .string()
                                                      .nullable(),
                                                    '64x64': zod
                                                      .string()
                                                      .nullable(),
                                                    '32x32': zod
                                                      .string()
                                                      .nullable(),
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
                                                locale: zod
                                                  .string()
                                                  .describe(
                                                    'ロケール（jaまたはen）',
                                                  ),
                                                userType: zod
                                                  .enum(['normal', 'assistant'])
                                                  .optional()
                                                  .describe(
                                                    'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                                  ),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                                deactivatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .nullish()
                                                  .describe('削除日時'),
                                                lastUsedOn: zod.iso
                                                  .date()
                                                  .nullish()
                                                  .describe(
                                                    '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                                  ),
                                                customFields: zod
                                                  .array(
                                                    zod.object({
                                                      code: zod
                                                        .string()
                                                        .describe(
                                                          'UserCustomField#code（変換せずそのまま）',
                                                        ),
                                                      fieldType: zod
                                                        .union([
                                                          zod.literal('text'),
                                                          zod.literal(
                                                            'textLong',
                                                          ),
                                                          zod.literal('number'),
                                                          zod.literal(
                                                            'integer',
                                                          ),
                                                          zod.literal(
                                                            'checkbox',
                                                          ),
                                                          zod.literal(
                                                            'pullDown',
                                                          ),
                                                          zod.literal('date'),
                                                          zod.literal(null),
                                                        ])
                                                        .nullable()
                                                        .describe(
                                                          'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                                        ),
                                                      value: zod
                                                        .union([
                                                          zod.string(),
                                                          zod.number(),
                                                          zod.array(
                                                            zod.string(),
                                                          ),
                                                          zod.null(),
                                                        ])
                                                        .describe(
                                                          'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                                        ),
                                                    }),
                                                  )
                                                  .optional()
                                                  .describe(
                                                    'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                                  ),
                                              })
                                              .describe('ユーザー'),
                                            zod.null(),
                                          ])
                                          .optional()
                                          .describe('作成者'),
                                        versionAuthor: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                email: zod
                                                  .email()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneEmailMax,
                                                  )
                                                  .describe('メールアドレス'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneCodeMax,
                                                  )
                                                  .describe('コード'),
                                                firstName: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneFirstNameMax,
                                                  )
                                                  .describe('名'),
                                                lastName: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneLastNameMax,
                                                  )
                                                  .describe('姓'),
                                                fullName: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneFullNameMax,
                                                  )
                                                  .describe('フルネーム'),
                                                employeeId: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneVersionAuthorOneEmployeeIdMax,
                                                  )
                                                  .nullable()
                                                  .describe('社員番号'),
                                                image: zod
                                                  .object({
                                                    '100x100': zod
                                                      .string()
                                                      .nullable(),
                                                    '64x64': zod
                                                      .string()
                                                      .nullable(),
                                                    '32x32': zod
                                                      .string()
                                                      .nullable(),
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
                                                locale: zod
                                                  .string()
                                                  .describe(
                                                    'ロケール（jaまたはen）',
                                                  ),
                                                userType: zod
                                                  .enum(['normal', 'assistant'])
                                                  .optional()
                                                  .describe(
                                                    'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                                  ),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                                deactivatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .nullish()
                                                  .describe('削除日時'),
                                                lastUsedOn: zod.iso
                                                  .date()
                                                  .nullish()
                                                  .describe(
                                                    '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                                  ),
                                                customFields: zod
                                                  .array(
                                                    zod.object({
                                                      code: zod
                                                        .string()
                                                        .describe(
                                                          'UserCustomField#code（変換せずそのまま）',
                                                        ),
                                                      fieldType: zod
                                                        .union([
                                                          zod.literal('text'),
                                                          zod.literal(
                                                            'textLong',
                                                          ),
                                                          zod.literal('number'),
                                                          zod.literal(
                                                            'integer',
                                                          ),
                                                          zod.literal(
                                                            'checkbox',
                                                          ),
                                                          zod.literal(
                                                            'pullDown',
                                                          ),
                                                          zod.literal('date'),
                                                          zod.literal(null),
                                                        ])
                                                        .nullable()
                                                        .describe(
                                                          'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                                        ),
                                                      value: zod
                                                        .union([
                                                          zod.string(),
                                                          zod.number(),
                                                          zod.array(
                                                            zod.string(),
                                                          ),
                                                          zod.null(),
                                                        ])
                                                        .describe(
                                                          'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                                        ),
                                                    }),
                                                  )
                                                  .optional()
                                                  .describe(
                                                    'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                                  ),
                                              })
                                              .describe('ユーザー'),
                                            zod.null(),
                                          ])
                                          .optional()
                                          .describe('バージョン作成者'),
                                        folder: zod
                                          .object({
                                            id: zod.uuid().describe('UUID'),
                                            name: zod
                                              .string()
                                              .max(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneNameMax,
                                              )
                                              .describe('名前'),
                                            fullName: zod
                                              .string()
                                              .describe(
                                                'フルネーム（ルートフォルダからのパス）',
                                              ),
                                            code: zod
                                              .string()
                                              .max(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneCodeMax,
                                              )
                                              .describe('コード'),
                                            description: zod
                                              .string()
                                              .nullable()
                                              .describe('説明'),
                                            workflowsCount: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneWorkflowsCountMin,
                                              )
                                              .describe(
                                                'フォルダ内のワークフロー数',
                                              ),
                                            routesCount: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOneRoutesCountMin,
                                              )
                                              .describe('フォルダ内の経路数'),
                                            pipelinesCount: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneFolderOnePipelinesCountMin,
                                              )
                                              .describe(
                                                'フォルダ内のパイプライン数',
                                              ),
                                            editable: zod
                                              .boolean()
                                              .describe('編集可能かどうか'),
                                            createdAt: zod.iso
                                              .datetime({ offset: true })
                                              .describe('作成日時'),
                                            updatedAt: zod.iso
                                              .datetime({ offset: true })
                                              .describe('更新日時'),
                                          })
                                          .describe('フォルダ')
                                          .optional()
                                          .describe('フォルダ'),
                                        categories: zod
                                          .array(
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCategoriesItemCodeMax,
                                                  )
                                                  .describe('コード'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoTicketCopySettingOneWorkflowOneCategoriesItemNameMax,
                                                  )
                                                  .describe('名前'),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                              })
                                              .describe('カテゴリ'),
                                          )
                                          .optional()
                                          .describe('カテゴリの配列'),
                                        availableToEveryone: zod
                                          .boolean()
                                          .describe(
                                            '全ユーザーが申請可能な場合true',
                                          ),
                                        reportFormats: zod
                                          .array(zod.enum(['pdf', 'excel']))
                                          .describe('帳票のフォーマット'),
                                        hiddenOnWorkflowFilterForTicket: zod
                                          .boolean()
                                          .describe(
                                            'チケット検索のワークフローフィルタに表示しない場合true',
                                          ),
                                        hiddenOnWorkflowSelectionScreen: zod
                                          .boolean()
                                          .describe(
                                            'ワークフロー選択画面に表示しない場合true',
                                          ),
                                        approvalCancellable: zod
                                          .boolean()
                                          .describe(
                                            '承認の取り消しが可能な場合true',
                                          ),
                                        reportFileNameFormat: zod
                                          .string()
                                          .nullable()
                                          .describe(
                                            '帳票のファイル名フォーマット',
                                          ),
                                        current: zod
                                          .boolean()
                                          .describe(
                                            '現在のバージョンの場合true',
                                          ),
                                        notes: zod
                                          .string()
                                          .nullable()
                                          .describe('管理用メモ'),
                                        versionCreatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('バージョンの作成日時'),
                                        collectEmailOnExternalPublish: zod
                                          .boolean()
                                          .describe(
                                            '外部公開時にメールアドレスを収集する場合true',
                                          ),
                                        notifyGuestOnCompletion: zod
                                          .boolean()
                                          .describe(
                                            '外部ゲストに申請結果（完了\/却下）を通知する場合true',
                                          ),
                                        allowCustomSteps: zod
                                          .boolean()
                                          .describe(
                                            'カスタムステップの追加を許可する場合true',
                                          ),
                                      })
                                      .describe('ワークフロー'),
                                    zod.null(),
                                  ])
                                  .describe('転記元のワークフロー'),
                                mappings: zod
                                  .array(
                                    zod.object({
                                      fieldType: zod
                                        .enum([
                                          'ticket_title',
                                          'ticket_number',
                                          'form_field',
                                        ])
                                        .describe(
                                          '転記元の種別。ticket_title=チケットのタイトル、ticket_number=チケット番号、form_field=フォームフィールド。',
                                        ),
                                      fieldCode: zod
                                        .string()
                                        .nullable()
                                        .describe(
                                          '転記元のフォームフィールドのコード。fieldTypeがform_fieldのときのみ値が入ります。',
                                        ),
                                      targetFieldCode: zod
                                        .string()
                                        .nullable()
                                        .describe(
                                          '転記先のフォームフィールドのコード',
                                        ),
                                    }),
                                  )
                                  .describe(
                                    '転記する項目の配列。表示順の昇順で格納されます。',
                                  ),
                              })
                              .describe(
                                'チケット型フィールドで、選択したチケットの値を転記する設定',
                              ),
                            zod.null(),
                          ])
                          .describe(
                            'チケット型フィールドの転記設定。設定していない場合はnullになります。',
                          ),
                        selectableTicketWorkflows: zod
                          .array(
                            zod
                              .object({
                                id: zod.string().describe('UUID'),
                                code: zod
                                  .string()
                                  .regex(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCodeRegExp,
                                  )
                                  .describe('コード'),
                                versionId: zod
                                  .string()
                                  .describe('バージョンのUUID'),
                                versionNumber: zod
                                  .int()
                                  .describe('バージョン番号'),
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
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemPublicTicketDefault,
                                  )
                                  .describe(
                                    'チケットがテナント全体に共有される場合true',
                                  ),
                                visibleToManager: zod
                                  .enum(['none', 'direct', 'all'])
                                  .describe(
                                    '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
                                  ),
                                visibleToTeamMembers: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVisibleToTeamMembersDefault,
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
                                  .describe(
                                    '承認者による上書きが可能な場合true',
                                  ),
                                createdAt: zod.string().describe('作成日時'),
                                updatedAt: zod.string().describe('更新日時'),
                                titleInputMode: zod
                                  .enum(['none', 'input', 'calculate'])
                                  .describe('タイトル入力モード'),
                                titleFormula: zod
                                  .string()
                                  .nullable()
                                  .describe('タイトルの計算式'),
                                allowEditingOfViewers: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAllowEditingOfViewersDefault,
                                  )
                                  .describe(
                                    '共有ユーザーの編集が可能な場合true',
                                  ),
                                commentingEnabled: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingEnabledDefault,
                                  )
                                  .describe(
                                    '新規コメント投稿が許可されている場合 true。 false の場合、ワークフロー配下のすべてのチケットで新規コメント投稿が禁止される。',
                                  ),
                                commentingRequiredOnApproval: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnApprovalDefault,
                                  )
                                  .describe(
                                    '承認（回覧の確認を含む）時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは承認・確認できない。',
                                  ),
                                commentingRequiredOnRejection: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnRejectionDefault,
                                  )
                                  .describe(
                                    '差し戻し時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは差し戻しできない。',
                                  ),
                                commentingRequiredOnDenial: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnDenialDefault,
                                  )
                                  .describe(
                                    '却下時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは却下できない。',
                                  ),
                                author: zod
                                  .union([
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        email: zod
                                          .email()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmailMax,
                                          )
                                          .describe('メールアドレス'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneCodeMax,
                                          )
                                          .describe('コード'),
                                        firstName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFirstNameMax,
                                          )
                                          .describe('名'),
                                        lastName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneLastNameMax,
                                          )
                                          .describe('姓'),
                                        fullName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFullNameMax,
                                          )
                                          .describe('フルネーム'),
                                        employeeId: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmployeeIdMax,
                                          )
                                          .nullable()
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
                                        locale: zod
                                          .string()
                                          .describe('ロケール（jaまたはen）'),
                                        userType: zod
                                          .enum(['normal', 'assistant'])
                                          .optional()
                                          .describe(
                                            'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                        deactivatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .nullish()
                                          .describe('削除日時'),
                                        lastUsedOn: zod.iso
                                          .date()
                                          .nullish()
                                          .describe(
                                            '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                          ),
                                        customFields: zod
                                          .array(
                                            zod.object({
                                              code: zod
                                                .string()
                                                .describe(
                                                  'UserCustomField#code（変換せずそのまま）',
                                                ),
                                              fieldType: zod
                                                .union([
                                                  zod.literal('text'),
                                                  zod.literal('textLong'),
                                                  zod.literal('number'),
                                                  zod.literal('integer'),
                                                  zod.literal('checkbox'),
                                                  zod.literal('pullDown'),
                                                  zod.literal('date'),
                                                  zod.literal(null),
                                                ])
                                                .nullable()
                                                .describe(
                                                  'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                                ),
                                              value: zod
                                                .union([
                                                  zod.string(),
                                                  zod.number(),
                                                  zod.array(zod.string()),
                                                  zod.null(),
                                                ])
                                                .describe(
                                                  'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                                ),
                                            }),
                                          )
                                          .optional()
                                          .describe(
                                            'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                          ),
                                      })
                                      .describe('ユーザー'),
                                    zod.null(),
                                  ])
                                  .optional()
                                  .describe('作成者'),
                                versionAuthor: zod
                                  .union([
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        email: zod
                                          .email()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmailMax,
                                          )
                                          .describe('メールアドレス'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneCodeMax,
                                          )
                                          .describe('コード'),
                                        firstName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFirstNameMax,
                                          )
                                          .describe('名'),
                                        lastName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneLastNameMax,
                                          )
                                          .describe('姓'),
                                        fullName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFullNameMax,
                                          )
                                          .describe('フルネーム'),
                                        employeeId: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmployeeIdMax,
                                          )
                                          .nullable()
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
                                        locale: zod
                                          .string()
                                          .describe('ロケール（jaまたはen）'),
                                        userType: zod
                                          .enum(['normal', 'assistant'])
                                          .optional()
                                          .describe(
                                            'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                        deactivatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .nullish()
                                          .describe('削除日時'),
                                        lastUsedOn: zod.iso
                                          .date()
                                          .nullish()
                                          .describe(
                                            '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                          ),
                                        customFields: zod
                                          .array(
                                            zod.object({
                                              code: zod
                                                .string()
                                                .describe(
                                                  'UserCustomField#code（変換せずそのまま）',
                                                ),
                                              fieldType: zod
                                                .union([
                                                  zod.literal('text'),
                                                  zod.literal('textLong'),
                                                  zod.literal('number'),
                                                  zod.literal('integer'),
                                                  zod.literal('checkbox'),
                                                  zod.literal('pullDown'),
                                                  zod.literal('date'),
                                                  zod.literal(null),
                                                ])
                                                .nullable()
                                                .describe(
                                                  'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                                ),
                                              value: zod
                                                .union([
                                                  zod.string(),
                                                  zod.number(),
                                                  zod.array(zod.string()),
                                                  zod.null(),
                                                ])
                                                .describe(
                                                  'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                                ),
                                            }),
                                          )
                                          .optional()
                                          .describe(
                                            'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                          ),
                                      })
                                      .describe('ユーザー'),
                                    zod.null(),
                                  ])
                                  .optional()
                                  .describe('バージョン作成者'),
                                folder: zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneNameMax,
                                      )
                                      .describe('名前'),
                                    fullName: zod
                                      .string()
                                      .describe(
                                        'フルネーム（ルートフォルダからのパス）',
                                      ),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneCodeMax,
                                      )
                                      .describe('コード'),
                                    description: zod
                                      .string()
                                      .nullable()
                                      .describe('説明'),
                                    workflowsCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneWorkflowsCountMin,
                                      )
                                      .describe('フォルダ内のワークフロー数'),
                                    routesCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOneRoutesCountMin,
                                      )
                                      .describe('フォルダ内の経路数'),
                                    pipelinesCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemFolderOnePipelinesCountMin,
                                      )
                                      .describe('フォルダ内のパイプライン数'),
                                    editable: zod
                                      .boolean()
                                      .describe('編集可能かどうか'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('フォルダ')
                                  .optional()
                                  .describe('フォルダ'),
                                categories: zod
                                  .array(
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemCodeMax,
                                          )
                                          .describe('コード'),
                                        name: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemNameMax,
                                          )
                                          .describe('名前'),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                      })
                                      .describe('カテゴリ'),
                                  )
                                  .optional()
                                  .describe('カテゴリの配列'),
                                availableToEveryone: zod
                                  .boolean()
                                  .describe('全ユーザーが申請可能な場合true'),
                                reportFormats: zod
                                  .array(zod.enum(['pdf', 'excel']))
                                  .describe('帳票のフォーマット'),
                                hiddenOnWorkflowFilterForTicket: zod
                                  .boolean()
                                  .describe(
                                    'チケット検索のワークフローフィルタに表示しない場合true',
                                  ),
                                hiddenOnWorkflowSelectionScreen: zod
                                  .boolean()
                                  .describe(
                                    'ワークフロー選択画面に表示しない場合true',
                                  ),
                                approvalCancellable: zod
                                  .boolean()
                                  .describe('承認の取り消しが可能な場合true'),
                                reportFileNameFormat: zod
                                  .string()
                                  .nullable()
                                  .describe('帳票のファイル名フォーマット'),
                                current: zod
                                  .boolean()
                                  .describe('現在のバージョンの場合true'),
                                notes: zod
                                  .string()
                                  .nullable()
                                  .describe('管理用メモ'),
                                versionCreatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('バージョンの作成日時'),
                                collectEmailOnExternalPublish: zod
                                  .boolean()
                                  .describe(
                                    '外部公開時にメールアドレスを収集する場合true',
                                  ),
                                notifyGuestOnCompletion: zod
                                  .boolean()
                                  .describe(
                                    '外部ゲストに申請結果（完了\/却下）を通知する場合true',
                                  ),
                                allowCustomSteps: zod
                                  .boolean()
                                  .describe(
                                    'カスタムステップの追加を許可する場合true',
                                  ),
                              })
                              .describe('ワークフロー'),
                          )
                          .describe(
                            'チケット型フィールドで選択可能なワークフロー。\n各要素にはauthor \/ versionAuthor \/ folder \/ categoriesは含まれません。',
                          ),
                      }),
                    )
                    .describe('フォームフィールドの詳細'),
                )
                .optional()
                .describe(
                  'フォームフィールド。明細セクションには含まれません。',
                ),
              conditional: zod
                .boolean()
                .optional()
                .describe(
                  '表示条件があるかどうか。明細セクションには含まれません。',
                ),
              combinationType: zod
                .enum(['all', 'any', 'custom'])
                .optional()
                .describe(
                  '条件の組み合わせタイプ。all=すべて、any=いずれか、custom=高度な条件式。明細セクションには含まれません。',
                ),
              combinationExpression: zod
                .string()
                .nullish()
                .describe('高度な条件式'),
              conditionFields: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      symbol: zod
                        .enum([
                          'equal',
                          'not_equal',
                          'greater_than',
                          'greater_than_or_equal',
                          'less_than',
                          'less_than_or_equal',
                          'include',
                          'exclude',
                          'is_empty',
                          'is_not_empty',
                          'descendants_or_equal',
                        ])
                        .describe('演算子'),
                      value: zod.string().nullable().describe('しきい値'),
                      formField: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              title: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneTitleMax,
                                )
                                .describe('説明'),
                              description: zod
                                .string()
                                .nullable()
                                .describe('説明'),
                              fieldType: zod
                                .enum([
                                  'text',
                                  'text_long',
                                  'number',
                                  'integer',
                                  'checkbox',
                                  'pull_down',
                                  'date',
                                  'file',
                                  'master',
                                  'user',
                                  'team',
                                  'ticket',
                                  'calculation',
                                  'button_api',
                                  'button_kintone',
                                  'datetime',
                                ])
                                .describe('フィールドの型'),
                              required: zod
                                .boolean()
                                .describe('必須項目かどうか'),
                              approver: zod
                                .boolean()
                                .describe('承認者が編集可能かどうか'),
                              author: zod
                                .boolean()
                                .describe('申請者が編集可能かどうか'),
                              options: zod
                                .array(zod.string())
                                .nullable()
                                .describe(
                                  '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                                ),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneCodeMax,
                                )
                                .describe('コード'),
                              size: zod
                                .enum(['full', 'half'])
                                .describe(
                                  'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                                ),
                              regexpFormat: zod
                                .string()
                                .nullable()
                                .describe('正規表現フォーマット'),
                              formula: zod
                                .string()
                                .nullable()
                                .describe(
                                  '計算式。\n型がcalculationのときのみ値が入ります。',
                                ),
                              defaultValue: zod
                                .string()
                                .nullable()
                                .describe('初期値'),
                              minValue: zod
                                .number()
                                .nullable()
                                .describe('最小値'),
                              maxValue: zod
                                .number()
                                .nullable()
                                .describe('最大値'),
                              minLength: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneMinLengthMin,
                                )
                                .nullable()
                                .describe('最小文字数'),
                              maxLength: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneMaxLengthMin,
                                )
                                .nullable()
                                .describe('最大文字数'),
                              decimalDigit: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemFormFieldOneDecimalDigitMin,
                                )
                                .nullable()
                                .describe('小数の桁数'),
                              delimited: zod
                                .boolean()
                                .nullable()
                                .describe(
                                  'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                ),
                              prefix: zod
                                .string()
                                .nullable()
                                .describe('単位（接頭辞）'),
                              suffix: zod
                                .string()
                                .nullable()
                                .describe('単位（接尾辞）'),
                              hidden: zod
                                .boolean()
                                .nullable()
                                .describe('隠しフィールドである場合true'),
                              readonlyOnUi: zod
                                .boolean()
                                .nullable()
                                .describe(
                                  'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                ),
                              multiple: zod
                                .boolean()
                                .describe('複数選択を許可するかどうか'),
                              orientation: zod
                                .enum(['vertical', 'horizontal'])
                                .describe(
                                  'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                                ),
                              allowedExtensions: zod
                                .array(zod.string())
                                .nullable()
                                .describe(
                                  '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                                ),
                              autoLink: zod
                                .boolean()
                                .describe(
                                  'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                ),
                              useTodayForDefaultValue: zod
                                .boolean()
                                .describe(
                                  '日付型フィールドで、当日の日付を初期値にするかどうか',
                                ),
                              allowedTicketStatus: zod
                                .array(
                                  zod.enum([
                                    'draft',
                                    'in_progress',
                                    'completed',
                                    'rejected',
                                    'archived',
                                    'denied',
                                  ]),
                                )
                                .describe(
                                  'チケット型フィールドで、選択可能なチケットのステータス',
                                ),
                            })
                            .describe('フォームフィールド'),
                          zod.null(),
                        ])
                        .describe('条件対象のフォームフィールド'),
                      grade: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneNameMax,
                                )
                                .describe('名前'),
                              level: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneLevelMin,
                                )
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneLevelMax,
                                )
                                .describe('レベル'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneCodeMax,
                                )
                                .nullable()
                                .describe('コード'),
                              isDefault: zod
                                .boolean()
                                .default(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGradeOneIsDefaultDefault,
                                )
                                .describe('デフォルトの役職かどうか'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('役職'),
                          zod.null(),
                        ])
                        .describe('しきい値として使う役職'),
                      team: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneNameMax,
                                )
                                .describe('名前'),
                              fullName: zod
                                .string()
                                .describe('上位組織を含む名前'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneCodeMax,
                                )
                                .describe('コード'),
                              notes: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneNotesMax,
                                )
                                .nullable()
                                .describe('管理用メモ'),
                              approveOnly: zod
                                .boolean()
                                .describe('承認専用チームかどうか'),
                              usersCount: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemTeamOneUsersCountMin,
                                )
                                .describe('ユーザー数'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('チーム'),
                          zod.null(),
                        ])
                        .describe('しきい値として使うチーム'),
                      generalMasterItem: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneCodeMax,
                                )
                                .describe('コード'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneNameMax,
                                )
                                .describe('名前'),
                              description: zod
                                .string()
                                .nullable()
                                .describe('説明'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                              startsOn: zod.iso
                                .date()
                                .nullable()
                                .describe('有効期限の開始日'),
                              endsOn: zod.iso
                                .date()
                                .nullable()
                                .describe('有効期限の終了日'),
                              inputs: zod
                                .array(
                                  zod.object({
                                    id: zod.uuid().describe('UUID'),
                                    value: zod
                                      .union([
                                        zod.string().nullable(),
                                        zod.array(zod.string()),
                                      ])
                                      .describe('入力値'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                    field: zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        title: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldTitleMax,
                                          )
                                          .describe('フィールド名'),
                                        description: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldDescriptionMax,
                                          )
                                          .nullable()
                                          .describe('フィールドの説明'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax,
                                          )
                                          .describe('フィールドのコード'),
                                        fieldType: zod
                                          .enum([
                                            'text',
                                            'text_long',
                                            'number',
                                            'integer',
                                            'checkbox',
                                            'pull_down',
                                            'date',
                                          ])
                                          .describe('フィールドの型'),
                                        required: zod
                                          .boolean()
                                          .describe('必須項目かどうか'),
                                        fieldOrder: zod
                                          .int()
                                          .describe('フィールドの表示順'),
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        initialDisplay: zod
                                          .boolean()
                                          .describe('初期表示するか'),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                      })
                                      .describe(
                                        '汎用マスタのカスタムフィールド',
                                      ),
                                  }),
                                )
                                .describe('カスタムフィールドの入力の配列'),
                            })
                            .describe('汎用マスタのアイテム'),
                          zod.null(),
                        ])
                        .describe('しきい値として使う汎用マスタアイテム'),
                    })
                    .describe('フォームセクションの表示条件'),
                )
                .optional()
                .describe(
                  'フォームセクションの表示条件。明細セクションには含まれません。',
                ),
              slipFields: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      fieldType: zod
                        .enum([
                          'text',
                          'number',
                          'integer',
                          'calculation',
                          'pull_down',
                          'checkbox',
                          'date',
                          'file',
                          'master',
                          'user',
                          'team',
                          'ticket',
                          'datetime',
                        ])
                        .describe('フィールドの型'),
                      code: zod.string().describe('フィールドのコード'),
                      title: zod.string().describe('タイトル'),
                      required: zod.boolean().describe('入力必須の場合true'),
                      showTotal: zod
                        .boolean()
                        .describe('列の合計を表示する場合true'),
                      options: zod
                        .array(zod.string())
                        .describe(
                          '選択肢。プルダウンまたはチェックボックスのときのみ値が入ります。',
                        ),
                      regexpFormat: zod
                        .string()
                        .nullable()
                        .describe('正規表現フォーマット'),
                      formula: zod
                        .string()
                        .nullable()
                        .describe(
                          '計算式。型が自動計算のときのみ値が入ります。',
                        ),
                      maxValue: zod.number().nullable().describe('最大値'),
                      minValue: zod.number().nullable().describe('最小値'),
                      defaultValue: zod.string().nullable().describe('初期値'),
                      decimalDigit: zod.int().nullable().describe('小数の桁数'),
                      delimited: zod
                        .boolean()
                        .nullable()
                        .describe(
                          'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                        ),
                      allowedExtensions: zod
                        .array(zod.string())
                        .describe('添付可能な拡張子リスト'),
                      prefix: zod
                        .string()
                        .nullable()
                        .describe('単位（接頭辞）'),
                      suffix: zod
                        .string()
                        .nullable()
                        .describe('単位（接尾辞）'),
                      approver: zod
                        .boolean()
                        .describe('承認者が編集可能かどうか'),
                      author: zod
                        .boolean()
                        .describe('申請者が編集可能かどうか'),
                      hidden: zod
                        .boolean()
                        .nullable()
                        .describe('隠しフィールドである場合true'),
                      readonlyOnUi: zod
                        .boolean()
                        .nullable()
                        .describe(
                          'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                        ),
                      minLength: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemSlipFieldsItemOneMinLengthMin,
                        )
                        .nullable()
                        .describe('最小文字数'),
                      maxLength: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemSlipFieldsItemOneMaxLengthMin,
                        )
                        .nullable()
                        .describe('最大文字数'),
                      multiple: zod
                        .boolean()
                        .describe('複数選択を許可するかどうか'),
                      autoLink: zod
                        .boolean()
                        .describe(
                          'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                        ),
                      useTodayForDefaultValue: zod
                        .boolean()
                        .describe(
                          '日付型フィールドで、当日の日付を初期値にするかどうか',
                        ),
                      allowedTicketStatus: zod
                        .array(
                          zod.enum([
                            'draft',
                            'in_progress',
                            'completed',
                            'rejected',
                            'archived',
                            'denied',
                          ]),
                        )
                        .describe(
                          'チケット型フィールドで、選択可能なチケットのステータス',
                        ),
                    })
                    .describe('明細フィールド')
                    .and(
                      zod.object({
                        generalMaster: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                code: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneCodeMax,
                                  )
                                  .describe('コード'),
                                name: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneNameMax,
                                  )
                                  .describe('名前'),
                                description: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneDescriptionMax,
                                  )
                                  .nullable()
                                  .describe('説明'),
                                defaultSortBy: zod
                                  .enum(['name', 'code'])
                                  .describe('アイテム一覧のデフォルト並び順'),
                                itemsCount: zod
                                  .int()
                                  .min(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneItemsCountMin,
                                  )
                                  .describe('アイテム数'),
                                initialDisplayCode: zod
                                  .boolean()
                                  .describe('コードを初期表示するか'),
                                initialDisplayCreatedAt: zod
                                  .boolean()
                                  .describe('作成日時を初期表示するか'),
                                initialDisplayDescription: zod
                                  .boolean()
                                  .describe('説明を初期表示するか'),
                                createdAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('更新日時'),
                                fields: zod
                                  .array(
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        title: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemTitleMax,
                                          )
                                          .describe('フィールド名'),
                                        description: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemDescriptionMax,
                                          )
                                          .nullable()
                                          .describe('フィールドの説明'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemCodeMax,
                                          )
                                          .describe('フィールドのコード'),
                                        fieldType: zod
                                          .enum([
                                            'text',
                                            'text_long',
                                            'number',
                                            'integer',
                                            'checkbox',
                                            'pull_down',
                                            'date',
                                          ])
                                          .describe('フィールドの型'),
                                        required: zod
                                          .boolean()
                                          .describe('必須項目かどうか'),
                                        fieldOrder: zod
                                          .int()
                                          .describe('フィールドの表示順'),
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        initialDisplay: zod
                                          .boolean()
                                          .describe('初期表示するか'),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                      })
                                      .describe(
                                        '汎用マスタのカスタムフィールド',
                                      ),
                                  )
                                  .describe('カスタムフィールドの配列'),
                              })
                              .describe('汎用マスタ'),
                            zod.null(),
                          ])
                          .describe(
                            '汎用マスタ。型が汎用マスタのときのみ値が入ります。',
                          ),
                        defaultGeneralMasterItem: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                code: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneCodeMax,
                                  )
                                  .describe('コード'),
                                name: zod
                                  .string()
                                  .max(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneNameMax,
                                  )
                                  .describe('名前'),
                                description: zod
                                  .string()
                                  .nullable()
                                  .describe('説明'),
                                createdAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('更新日時'),
                                startsOn: zod.iso
                                  .date()
                                  .nullable()
                                  .describe('有効期限の開始日'),
                                endsOn: zod.iso
                                  .date()
                                  .nullable()
                                  .describe('有効期限の終了日'),
                                inputs: zod
                                  .array(
                                    zod.object({
                                      id: zod.uuid().describe('UUID'),
                                      value: zod
                                        .union([
                                          zod.string().nullable(),
                                          zod.array(zod.string()),
                                        ])
                                        .describe('入力値'),
                                      createdAt: zod.iso
                                        .datetime({ offset: true })
                                        .describe('作成日時'),
                                      updatedAt: zod.iso
                                        .datetime({ offset: true })
                                        .describe('更新日時'),
                                      field: zod
                                        .object({
                                          id: zod.uuid().describe('UUID'),
                                          title: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldTitleMax,
                                            )
                                            .describe('フィールド名'),
                                          description: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldDescriptionMax,
                                            )
                                            .nullable()
                                            .describe('フィールドの説明'),
                                          code: zod
                                            .string()
                                            .max(
                                              getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldCodeMax,
                                            )
                                            .describe('フィールドのコード'),
                                          fieldType: zod
                                            .enum([
                                              'text',
                                              'text_long',
                                              'number',
                                              'integer',
                                              'checkbox',
                                              'pull_down',
                                              'date',
                                            ])
                                            .describe('フィールドの型'),
                                          required: zod
                                            .boolean()
                                            .describe('必須項目かどうか'),
                                          fieldOrder: zod
                                            .int()
                                            .describe('フィールドの表示順'),
                                          visible: zod
                                            .boolean()
                                            .describe(
                                              '管理者以外も閲覧可能な場合true',
                                            ),
                                          initialDisplay: zod
                                            .boolean()
                                            .describe('初期表示するか'),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                            ),
                                          createdAt: zod.iso
                                            .datetime({ offset: true })
                                            .describe('作成日時'),
                                          updatedAt: zod.iso
                                            .datetime({ offset: true })
                                            .describe('更新日時'),
                                        })
                                        .describe(
                                          '汎用マスタのカスタムフィールド',
                                        ),
                                    }),
                                  )
                                  .describe('カスタムフィールドの入力の配列'),
                              })
                              .describe('汎用マスタのアイテム'),
                            zod.null(),
                          ])
                          .describe('汎用マスタアイテムの初期値'),
                        generalMasterSearchFilters: zod
                          .array(
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                filterSlipFieldId: zod
                                  .uuid()
                                  .describe(
                                    '絞り込みに使う明細フィールドのID（UUID）',
                                  ),
                                fieldType: zod
                                  .enum([
                                    'free_word',
                                    'name',
                                    'code',
                                    'description',
                                    'custom_field',
                                  ])
                                  .describe('絞り込み先のフィールドのタイプ'),
                                generalMasterFieldId: zod
                                  .uuid()
                                  .nullable()
                                  .describe(
                                    'fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID）',
                                  ),
                              })
                              .describe(
                                '明細フィールドの汎用マスタの自動絞り込みの設定',
                              ),
                          )
                          .describe(
                            '汎用マスタ型フィールドの自動絞り込みの設定。表示順の昇順で格納されます。',
                          ),
                        approverEditRestriction: zod
                          .union([
                            zod
                              .object({
                                routeStepCodes: zod
                                  .array(zod.string())
                                  .describe(
                                    '入力を必須にする経路ステップのコードの配列',
                                  ),
                              })
                              .describe('明細フィールドの承認者による入力制限'),
                            zod.null(),
                          ])
                          .describe(
                            '承認者による入力制限。設定していない場合はnullになります。',
                          ),
                        approverEditSetting: zod
                          .object({
                            permissionType: zod
                              .enum(['all', 'user', 'team_grade'])
                              .describe(
                                '編集を許可する範囲。\nall=すべての承認者、user=指定したユーザー、team_grade=指定したチーム・役職。',
                              ),
                            descendants: zod
                              .boolean()
                              .describe('下位のチームを含めるかどうか'),
                            gradeSymbol: zod
                              .union([
                                zod.literal('equal'),
                                zod.literal('greater_than'),
                                zod.literal('greater_than_or_equal'),
                                zod.literal('less_than'),
                                zod.literal('less_than_or_equal'),
                                zod.literal(null),
                              ])
                              .nullable()
                              .describe(
                                '役職の比較条件。permissionTypeがteam_gradeで役職を指定した場合のみ値が入ります。',
                              ),
                            grade: zod
                              .union([
                                zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneNameMax,
                                      )
                                      .describe('名前'),
                                    level: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneLevelMin,
                                      )
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneLevelMax,
                                      )
                                      .describe('レベル'),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneCodeMax,
                                      )
                                      .nullable()
                                      .describe('コード'),
                                    isDefault: zod
                                      .boolean()
                                      .default(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingGradeOneIsDefaultDefault,
                                      )
                                      .describe('デフォルトの役職かどうか'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('役職'),
                                zod.null(),
                              ])
                              .describe(
                                '役職。permissionTypeがteam_gradeのときのみ値が入ります。',
                              ),
                            team: zod
                              .union([
                                zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneNameMax,
                                      )
                                      .describe('名前'),
                                    fullName: zod
                                      .string()
                                      .describe('上位組織を含む名前'),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneCodeMax,
                                      )
                                      .describe('コード'),
                                    notes: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneNotesMax,
                                      )
                                      .nullable()
                                      .describe('管理用メモ'),
                                    approveOnly: zod
                                      .boolean()
                                      .describe('承認専用チームかどうか'),
                                    usersCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingTeamOneUsersCountMin,
                                      )
                                      .describe('ユーザー数'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('チーム'),
                                zod.null(),
                              ])
                              .describe(
                                'チーム。permissionTypeがteam_gradeのときのみ値が入ります。',
                              ),
                            users: zod
                              .array(
                                zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    email: zod
                                      .email()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemEmailMax,
                                      )
                                      .describe('メールアドレス'),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemCodeMax,
                                      )
                                      .describe('コード'),
                                    firstName: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemFirstNameMax,
                                      )
                                      .describe('名'),
                                    lastName: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemLastNameMax,
                                      )
                                      .describe('姓'),
                                    fullName: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemFullNameMax,
                                      )
                                      .describe('フルネーム'),
                                    employeeId: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoApproverEditSettingUsersItemEmployeeIdMax,
                                      )
                                      .nullable()
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
                                    locale: zod
                                      .string()
                                      .describe('ロケール（jaまたはen）'),
                                    userType: zod
                                      .enum(['normal', 'assistant'])
                                      .optional()
                                      .describe(
                                        'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                      ),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                    deactivatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .nullish()
                                      .describe('削除日時'),
                                    lastUsedOn: zod.iso
                                      .date()
                                      .nullish()
                                      .describe(
                                        '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                      ),
                                    customFields: zod
                                      .array(
                                        zod.object({
                                          code: zod
                                            .string()
                                            .describe(
                                              'UserCustomField#code（変換せずそのまま）',
                                            ),
                                          fieldType: zod
                                            .union([
                                              zod.literal('text'),
                                              zod.literal('textLong'),
                                              zod.literal('number'),
                                              zod.literal('integer'),
                                              zod.literal('checkbox'),
                                              zod.literal('pullDown'),
                                              zod.literal('date'),
                                              zod.literal(null),
                                            ])
                                            .nullable()
                                            .describe(
                                              'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                            ),
                                          value: zod
                                            .union([
                                              zod.string(),
                                              zod.number(),
                                              zod.array(zod.string()),
                                              zod.null(),
                                            ])
                                            .describe(
                                              'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                            ),
                                        }),
                                      )
                                      .optional()
                                      .describe(
                                        'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                      ),
                                  })
                                  .describe('ユーザー'),
                              )
                              .describe(
                                'ユーザーの配列。permissionTypeがuserのときのみ要素が入ります。',
                              ),
                          })
                          .optional()
                          .describe(
                            '編集できる承認者の設定。設定していない場合はpermissionType=allが入ります。',
                          ),
                        customValidations: zod
                          .array(
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                combinationType: zod
                                  .enum(['all', 'any'])
                                  .describe(
                                    '条件の組み合わせ方。all=すべての条件を満たす、any=いずれかの条件を満たす。',
                                  ),
                                errorMessage: zod
                                  .string()
                                  .describe(
                                    '条件を満たさない場合に表示するエラーメッセージ',
                                  ),
                                fields: zod
                                  .array(
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        symbol: zod
                                          .enum([
                                            'equal',
                                            'not_equal',
                                            'greater_than',
                                            'greater_than_or_equal',
                                            'less_than',
                                            'less_than_or_equal',
                                            'include',
                                            'exclude',
                                            'is_empty',
                                            'is_not_empty',
                                            'descendants_or_equal',
                                          ])
                                          .describe('比較条件'),
                                        value: zod
                                          .string()
                                          .nullable()
                                          .describe('比較する値'),
                                        slipField: zod
                                          .object({
                                            id: zod.uuid().describe('UUID'),
                                            fieldType: zod
                                              .enum([
                                                'text',
                                                'number',
                                                'integer',
                                                'calculation',
                                                'pull_down',
                                                'checkbox',
                                                'date',
                                                'file',
                                                'master',
                                                'user',
                                                'team',
                                                'ticket',
                                                'datetime',
                                              ])
                                              .describe('フィールドの型'),
                                            code: zod
                                              .string()
                                              .describe('フィールドのコード'),
                                            title: zod
                                              .string()
                                              .describe('タイトル'),
                                            required: zod
                                              .boolean()
                                              .describe('入力必須の場合true'),
                                            showTotal: zod
                                              .boolean()
                                              .describe(
                                                '列の合計を表示する場合true',
                                              ),
                                            options: zod
                                              .array(zod.string())
                                              .describe(
                                                '選択肢。プルダウンまたはチェックボックスのときのみ値が入ります。',
                                              ),
                                            regexpFormat: zod
                                              .string()
                                              .nullable()
                                              .describe('正規表現フォーマット'),
                                            formula: zod
                                              .string()
                                              .nullable()
                                              .describe(
                                                '計算式。型が自動計算のときのみ値が入ります。',
                                              ),
                                            maxValue: zod
                                              .number()
                                              .nullable()
                                              .describe('最大値'),
                                            minValue: zod
                                              .number()
                                              .nullable()
                                              .describe('最小値'),
                                            defaultValue: zod
                                              .string()
                                              .nullable()
                                              .describe('初期値'),
                                            decimalDigit: zod
                                              .int()
                                              .nullable()
                                              .describe('小数の桁数'),
                                            delimited: zod
                                              .boolean()
                                              .nullable()
                                              .describe(
                                                'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                                              ),
                                            allowedExtensions: zod
                                              .array(zod.string())
                                              .describe(
                                                '添付可能な拡張子リスト',
                                              ),
                                            prefix: zod
                                              .string()
                                              .nullable()
                                              .describe('単位（接頭辞）'),
                                            suffix: zod
                                              .string()
                                              .nullable()
                                              .describe('単位（接尾辞）'),
                                            approver: zod
                                              .boolean()
                                              .describe(
                                                '承認者が編集可能かどうか',
                                              ),
                                            author: zod
                                              .boolean()
                                              .describe(
                                                '申請者が編集可能かどうか',
                                              ),
                                            hidden: zod
                                              .boolean()
                                              .nullable()
                                              .describe(
                                                '隠しフィールドである場合true',
                                              ),
                                            readonlyOnUi: zod
                                              .boolean()
                                              .nullable()
                                              .describe(
                                                'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                              ),
                                            minLength: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemSlipFieldMinLengthMin,
                                              )
                                              .nullable()
                                              .describe('最小文字数'),
                                            maxLength: zod
                                              .int()
                                              .min(
                                                getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemSlipFieldMaxLengthMin,
                                              )
                                              .nullable()
                                              .describe('最大文字数'),
                                            multiple: zod
                                              .boolean()
                                              .describe(
                                                '複数選択を許可するかどうか',
                                              ),
                                            autoLink: zod
                                              .boolean()
                                              .describe(
                                                'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                                              ),
                                            useTodayForDefaultValue: zod
                                              .boolean()
                                              .describe(
                                                '日付型フィールドで、当日の日付を初期値にするかどうか',
                                              ),
                                            allowedTicketStatus: zod
                                              .array(
                                                zod.enum([
                                                  'draft',
                                                  'in_progress',
                                                  'completed',
                                                  'rejected',
                                                  'archived',
                                                  'denied',
                                                ]),
                                              )
                                              .describe(
                                                'チケット型フィールドで、選択可能なチケットのステータス',
                                              ),
                                          })
                                          .describe(
                                            '条件の対象となる明細フィールド',
                                          ),
                                        generalMasterItem: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneCodeMax,
                                                  )
                                                  .describe('コード'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGeneralMasterItemOneNameMax,
                                                  )
                                                  .describe('名前'),
                                                description: zod
                                                  .string()
                                                  .nullable()
                                                  .describe('説明'),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                                startsOn: zod.iso
                                                  .date()
                                                  .nullable()
                                                  .describe('有効期限の開始日'),
                                                endsOn: zod.iso
                                                  .date()
                                                  .nullable()
                                                  .describe('有効期限の終了日'),
                                              })
                                              .describe(
                                                'カスタムバリデーションの条件で比較する汎用マスタアイテム。\nカスタムバリデーションのレスポンスではカスタムフィールドの入力の配列（inputs）を返さないため、\n汎用マスタAPIが返す GeneralMasterItem とは別のコンポーネントとして定義している。',
                                              ),
                                            zod.null(),
                                          ])
                                          .describe(
                                            '比較する汎用マスタアイテム。対象が汎用マスタ型フィールドのときのみ値が入ります。',
                                          ),
                                        grade: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneNameMax,
                                                  )
                                                  .describe('名前'),
                                                level: zod
                                                  .int()
                                                  .min(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMin,
                                                  )
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneLevelMax,
                                                  )
                                                  .describe('レベル'),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneCodeMax,
                                                  )
                                                  .nullable()
                                                  .describe('コード'),
                                                isDefault: zod
                                                  .boolean()
                                                  .default(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemGradeOneIsDefaultDefault,
                                                  )
                                                  .describe(
                                                    'デフォルトの役職かどうか',
                                                  ),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                              })
                                              .describe('役職'),
                                            zod.null(),
                                          ])
                                          .describe('比較する役職'),
                                        team: zod
                                          .union([
                                            zod
                                              .object({
                                                id: zod.uuid().describe('UUID'),
                                                name: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNameMax,
                                                  )
                                                  .describe('名前'),
                                                fullName: zod
                                                  .string()
                                                  .describe(
                                                    '上位組織を含む名前',
                                                  ),
                                                code: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneCodeMax,
                                                  )
                                                  .describe('コード'),
                                                notes: zod
                                                  .string()
                                                  .max(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneNotesMax,
                                                  )
                                                  .nullable()
                                                  .describe('管理用メモ'),
                                                approveOnly: zod
                                                  .boolean()
                                                  .describe(
                                                    '承認専用チームかどうか',
                                                  ),
                                                usersCount: zod
                                                  .int()
                                                  .min(
                                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoCustomValidationsItemFieldsItemTeamOneUsersCountMin,
                                                  )
                                                  .describe('ユーザー数'),
                                                createdAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('作成日時'),
                                                updatedAt: zod.iso
                                                  .datetime({ offset: true })
                                                  .describe('更新日時'),
                                              })
                                              .describe('チーム'),
                                            zod.null(),
                                          ])
                                          .describe('比較するチーム'),
                                      })
                                      .describe(
                                        '明細フィールドのカスタムバリデーションの条件',
                                      ),
                                  )
                                  .describe(
                                    '条件の配列。表示順の昇順で格納されます。',
                                  ),
                              })
                              .describe(
                                '明細フィールドのカスタムバリデーション',
                              ),
                          )
                          .describe('カスタムバリデーション'),
                        selectableTicketWorkflows: zod
                          .array(
                            zod
                              .object({
                                id: zod.string().describe('UUID'),
                                code: zod
                                  .string()
                                  .regex(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCodeRegExp,
                                  )
                                  .describe('コード'),
                                versionId: zod
                                  .string()
                                  .describe('バージョンのUUID'),
                                versionNumber: zod
                                  .int()
                                  .describe('バージョン番号'),
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
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemPublicTicketDefault,
                                  )
                                  .describe(
                                    'チケットがテナント全体に共有される場合true',
                                  ),
                                visibleToManager: zod
                                  .enum(['none', 'direct', 'all'])
                                  .describe(
                                    '申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。',
                                  ),
                                visibleToTeamMembers: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVisibleToTeamMembersDefault,
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
                                  .describe(
                                    '承認者による上書きが可能な場合true',
                                  ),
                                createdAt: zod.string().describe('作成日時'),
                                updatedAt: zod.string().describe('更新日時'),
                                titleInputMode: zod
                                  .enum(['none', 'input', 'calculate'])
                                  .describe('タイトル入力モード'),
                                titleFormula: zod
                                  .string()
                                  .nullable()
                                  .describe('タイトルの計算式'),
                                allowEditingOfViewers: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAllowEditingOfViewersDefault,
                                  )
                                  .describe(
                                    '共有ユーザーの編集が可能な場合true',
                                  ),
                                commentingEnabled: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingEnabledDefault,
                                  )
                                  .describe(
                                    '新規コメント投稿が許可されている場合 true。 false の場合、ワークフロー配下のすべてのチケットで新規コメント投稿が禁止される。',
                                  ),
                                commentingRequiredOnApproval: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnApprovalDefault,
                                  )
                                  .describe(
                                    '承認（回覧の確認を含む）時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは承認・確認できない。',
                                  ),
                                commentingRequiredOnRejection: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnRejectionDefault,
                                  )
                                  .describe(
                                    '差し戻し時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは差し戻しできない。',
                                  ),
                                commentingRequiredOnDenial: zod
                                  .boolean()
                                  .default(
                                    getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCommentingRequiredOnDenialDefault,
                                  )
                                  .describe(
                                    '却下時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは却下できない。',
                                  ),
                                author: zod
                                  .union([
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        email: zod
                                          .email()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmailMax,
                                          )
                                          .describe('メールアドレス'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneCodeMax,
                                          )
                                          .describe('コード'),
                                        firstName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFirstNameMax,
                                          )
                                          .describe('名'),
                                        lastName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneLastNameMax,
                                          )
                                          .describe('姓'),
                                        fullName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneFullNameMax,
                                          )
                                          .describe('フルネーム'),
                                        employeeId: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemAuthorOneEmployeeIdMax,
                                          )
                                          .nullable()
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
                                        locale: zod
                                          .string()
                                          .describe('ロケール（jaまたはen）'),
                                        userType: zod
                                          .enum(['normal', 'assistant'])
                                          .optional()
                                          .describe(
                                            'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                        deactivatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .nullish()
                                          .describe('削除日時'),
                                        lastUsedOn: zod.iso
                                          .date()
                                          .nullish()
                                          .describe(
                                            '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                          ),
                                        customFields: zod
                                          .array(
                                            zod.object({
                                              code: zod
                                                .string()
                                                .describe(
                                                  'UserCustomField#code（変換せずそのまま）',
                                                ),
                                              fieldType: zod
                                                .union([
                                                  zod.literal('text'),
                                                  zod.literal('textLong'),
                                                  zod.literal('number'),
                                                  zod.literal('integer'),
                                                  zod.literal('checkbox'),
                                                  zod.literal('pullDown'),
                                                  zod.literal('date'),
                                                  zod.literal(null),
                                                ])
                                                .nullable()
                                                .describe(
                                                  'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                                ),
                                              value: zod
                                                .union([
                                                  zod.string(),
                                                  zod.number(),
                                                  zod.array(zod.string()),
                                                  zod.null(),
                                                ])
                                                .describe(
                                                  'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                                ),
                                            }),
                                          )
                                          .optional()
                                          .describe(
                                            'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                          ),
                                      })
                                      .describe('ユーザー'),
                                    zod.null(),
                                  ])
                                  .optional()
                                  .describe('作成者'),
                                versionAuthor: zod
                                  .union([
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        email: zod
                                          .email()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmailMax,
                                          )
                                          .describe('メールアドレス'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneCodeMax,
                                          )
                                          .describe('コード'),
                                        firstName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFirstNameMax,
                                          )
                                          .describe('名'),
                                        lastName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneLastNameMax,
                                          )
                                          .describe('姓'),
                                        fullName: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneFullNameMax,
                                          )
                                          .describe('フルネーム'),
                                        employeeId: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemVersionAuthorOneEmployeeIdMax,
                                          )
                                          .nullable()
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
                                        locale: zod
                                          .string()
                                          .describe('ロケール（jaまたはen）'),
                                        userType: zod
                                          .enum(['normal', 'assistant'])
                                          .optional()
                                          .describe(
                                            'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                        deactivatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .nullish()
                                          .describe('削除日時'),
                                        lastUsedOn: zod.iso
                                          .date()
                                          .nullish()
                                          .describe(
                                            '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                          ),
                                        customFields: zod
                                          .array(
                                            zod.object({
                                              code: zod
                                                .string()
                                                .describe(
                                                  'UserCustomField#code（変換せずそのまま）',
                                                ),
                                              fieldType: zod
                                                .union([
                                                  zod.literal('text'),
                                                  zod.literal('textLong'),
                                                  zod.literal('number'),
                                                  zod.literal('integer'),
                                                  zod.literal('checkbox'),
                                                  zod.literal('pullDown'),
                                                  zod.literal('date'),
                                                  zod.literal(null),
                                                ])
                                                .nullable()
                                                .describe(
                                                  'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                                ),
                                              value: zod
                                                .union([
                                                  zod.string(),
                                                  zod.number(),
                                                  zod.array(zod.string()),
                                                  zod.null(),
                                                ])
                                                .describe(
                                                  'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                                ),
                                            }),
                                          )
                                          .optional()
                                          .describe(
                                            'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                          ),
                                      })
                                      .describe('ユーザー'),
                                    zod.null(),
                                  ])
                                  .optional()
                                  .describe('バージョン作成者'),
                                folder: zod
                                  .object({
                                    id: zod.uuid().describe('UUID'),
                                    name: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneNameMax,
                                      )
                                      .describe('名前'),
                                    fullName: zod
                                      .string()
                                      .describe(
                                        'フルネーム（ルートフォルダからのパス）',
                                      ),
                                    code: zod
                                      .string()
                                      .max(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneCodeMax,
                                      )
                                      .describe('コード'),
                                    description: zod
                                      .string()
                                      .nullable()
                                      .describe('説明'),
                                    workflowsCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneWorkflowsCountMin,
                                      )
                                      .describe('フォルダ内のワークフロー数'),
                                    routesCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOneRoutesCountMin,
                                      )
                                      .describe('フォルダ内の経路数'),
                                    pipelinesCount: zod
                                      .int()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemFolderOnePipelinesCountMin,
                                      )
                                      .describe('フォルダ内のパイプライン数'),
                                    editable: zod
                                      .boolean()
                                      .describe('編集可能かどうか'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                  })
                                  .describe('フォルダ')
                                  .optional()
                                  .describe('フォルダ'),
                                categories: zod
                                  .array(
                                    zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemCodeMax,
                                          )
                                          .describe('コード'),
                                        name: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoSelectableTicketWorkflowsItemCategoriesItemNameMax,
                                          )
                                          .describe('名前'),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                      })
                                      .describe('カテゴリ'),
                                  )
                                  .optional()
                                  .describe('カテゴリの配列'),
                                availableToEveryone: zod
                                  .boolean()
                                  .describe('全ユーザーが申請可能な場合true'),
                                reportFormats: zod
                                  .array(zod.enum(['pdf', 'excel']))
                                  .describe('帳票のフォーマット'),
                                hiddenOnWorkflowFilterForTicket: zod
                                  .boolean()
                                  .describe(
                                    'チケット検索のワークフローフィルタに表示しない場合true',
                                  ),
                                hiddenOnWorkflowSelectionScreen: zod
                                  .boolean()
                                  .describe(
                                    'ワークフロー選択画面に表示しない場合true',
                                  ),
                                approvalCancellable: zod
                                  .boolean()
                                  .describe('承認の取り消しが可能な場合true'),
                                reportFileNameFormat: zod
                                  .string()
                                  .nullable()
                                  .describe('帳票のファイル名フォーマット'),
                                current: zod
                                  .boolean()
                                  .describe('現在のバージョンの場合true'),
                                notes: zod
                                  .string()
                                  .nullable()
                                  .describe('管理用メモ'),
                                versionCreatedAt: zod.iso
                                  .datetime({ offset: true })
                                  .describe('バージョンの作成日時'),
                                collectEmailOnExternalPublish: zod
                                  .boolean()
                                  .describe(
                                    '外部公開時にメールアドレスを収集する場合true',
                                  ),
                                notifyGuestOnCompletion: zod
                                  .boolean()
                                  .describe(
                                    '外部ゲストに申請結果（完了\/却下）を通知する場合true',
                                  ),
                                allowCustomSteps: zod
                                  .boolean()
                                  .describe(
                                    'カスタムステップの追加を許可する場合true',
                                  ),
                              })
                              .describe('ワークフロー'),
                          )
                          .describe(
                            'チケット型フィールドで選択可能なワークフロー。\n各要素にはauthor \/ versionAuthor \/ folder \/ categoriesは含まれません。',
                          ),
                      }),
                    )
                    .describe('明細フィールドの詳細'),
                )
                .optional()
                .describe(
                  '明細フィールド。フォームセクションには含まれません。',
                ),
              allowApproverToAddItems: zod
                .boolean()
                .optional()
                .describe(
                  '承認者が当該明細セクションに行を追加できるか。明細セクションのみに含まれます。',
                ),
              viewRestriction: zod
                .boolean()
                .optional()
                .describe(
                  '閲覧できる対象を制限する場合true。明細セクションには含まれません。',
                ),
              allowViewAuthor: zod
                .boolean()
                .optional()
                .describe(
                  'viewRestrictionがtrueのとき、申請者の閲覧を許可する場合true。明細セクションには含まれません。',
                ),
              allowViewApprover: zod
                .boolean()
                .optional()
                .describe(
                  'viewRestrictionがtrueのとき、承認者の閲覧を許可する場合true。明細セクションには含まれません。',
                ),
              sectionViewers: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      descendants: zod
                        .boolean()
                        .describe('下位のチームを含めるかどうか'),
                      user: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              email: zod
                                .email()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneEmailMax,
                                )
                                .describe('メールアドレス'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneCodeMax,
                                )
                                .describe('コード'),
                              firstName: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneFirstNameMax,
                                )
                                .describe('名'),
                              lastName: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneLastNameMax,
                                )
                                .describe('姓'),
                              fullName: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneFullNameMax,
                                )
                                .describe('フルネーム'),
                              employeeId: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemUserOneEmployeeIdMax,
                                )
                                .nullable()
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
                              locale: zod
                                .string()
                                .describe('ロケール（jaまたはen）'),
                              userType: zod
                                .enum(['normal', 'assistant'])
                                .optional()
                                .describe(
                                  'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                ),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                              deactivatedAt: zod.iso
                                .datetime({ offset: true })
                                .nullish()
                                .describe('削除日時'),
                              lastUsedOn: zod.iso
                                .date()
                                .nullish()
                                .describe(
                                  '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                ),
                              customFields: zod
                                .array(
                                  zod.object({
                                    code: zod
                                      .string()
                                      .describe(
                                        'UserCustomField#code（変換せずそのまま）',
                                      ),
                                    fieldType: zod
                                      .union([
                                        zod.literal('text'),
                                        zod.literal('textLong'),
                                        zod.literal('number'),
                                        zod.literal('integer'),
                                        zod.literal('checkbox'),
                                        zod.literal('pullDown'),
                                        zod.literal('date'),
                                        zod.literal(null),
                                      ])
                                      .nullable()
                                      .describe(
                                        'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                      ),
                                    value: zod
                                      .union([
                                        zod.string(),
                                        zod.number(),
                                        zod.array(zod.string()),
                                        zod.null(),
                                      ])
                                      .describe(
                                        'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                      ),
                                  }),
                                )
                                .optional()
                                .describe(
                                  'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                ),
                            })
                            .describe('ユーザー'),
                          zod.null(),
                        ])
                        .describe(
                          'ユーザー。ユーザーとチームは片方のみ値が入ります。',
                        ),
                      team: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneNameMax,
                                )
                                .describe('名前'),
                              fullName: zod
                                .string()
                                .describe('上位組織を含む名前'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneCodeMax,
                                )
                                .describe('コード'),
                              notes: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneNotesMax,
                                )
                                .nullable()
                                .describe('管理用メモ'),
                              approveOnly: zod
                                .boolean()
                                .describe('承認専用チームかどうか'),
                              usersCount: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemTeamOneUsersCountMin,
                                )
                                .describe('ユーザー数'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('チーム'),
                          zod.null(),
                        ])
                        .describe(
                          'チーム。ユーザーとチームは片方のみ値が入ります。',
                        ),
                      grade: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneNameMax,
                                )
                                .describe('名前'),
                              level: zod
                                .int()
                                .min(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneLevelMin,
                                )
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneLevelMax,
                                )
                                .describe('レベル'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneCodeMax,
                                )
                                .nullable()
                                .describe('コード'),
                              isDefault: zod
                                .boolean()
                                .default(
                                  getWorkflowResponseOneTwoSectionListItemSectionViewersItemGradeOneIsDefaultDefault,
                                )
                                .describe('デフォルトの役職かどうか'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('役職'),
                          zod.null(),
                        ])
                        .describe(
                          '役職。チーム指定で役職も指定する場合のみ値が入ります。',
                        ),
                    })
                    .describe('フォームセクションの閲覧を許可する対象'),
                )
                .optional()
                .describe(
                  '閲覧を許可する対象。明細セクションには含まれません。',
                ),
            })
            .describe('明細セクションまたはフォームセクション'),
        )
        .describe(
          'セクション・明細を表すオブジェクトを画面に表示される順に格納した配列。',
        ),
      ticketViewers: zod
        .array(
          zod
            .object({
              id: zod.string().describe('UUID'),
              user: zod
                .union([
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      email: zod
                        .email()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemUserOneEmailMax,
                        )
                        .describe('メールアドレス'),
                      code: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemUserOneCodeMax,
                        )
                        .describe('コード'),
                      firstName: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemUserOneFirstNameMax,
                        )
                        .describe('名'),
                      lastName: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemUserOneLastNameMax,
                        )
                        .describe('姓'),
                      fullName: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemUserOneFullNameMax,
                        )
                        .describe('フルネーム'),
                      employeeId: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemUserOneEmployeeIdMax,
                        )
                        .nullable()
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
                      userType: zod
                        .enum(['normal', 'assistant'])
                        .optional()
                        .describe(
                          'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                        ),
                      createdAt: zod.iso
                        .datetime({ offset: true })
                        .describe('作成日時'),
                      updatedAt: zod.iso
                        .datetime({ offset: true })
                        .describe('更新日時'),
                      deactivatedAt: zod.iso
                        .datetime({ offset: true })
                        .nullish()
                        .describe('削除日時'),
                      lastUsedOn: zod.iso
                        .date()
                        .nullish()
                        .describe(
                          '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                        ),
                      customFields: zod
                        .array(
                          zod.object({
                            code: zod
                              .string()
                              .describe(
                                'UserCustomField#code（変換せずそのまま）',
                              ),
                            fieldType: zod
                              .union([
                                zod.literal('text'),
                                zod.literal('textLong'),
                                zod.literal('number'),
                                zod.literal('integer'),
                                zod.literal('checkbox'),
                                zod.literal('pullDown'),
                                zod.literal('date'),
                                zod.literal(null),
                              ])
                              .nullable()
                              .describe(
                                'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                              ),
                            value: zod
                              .union([
                                zod.string(),
                                zod.number(),
                                zod.array(zod.string()),
                                zod.null(),
                              ])
                              .describe(
                                'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                              ),
                          }),
                        )
                        .optional()
                        .describe(
                          'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                        ),
                    })
                    .describe('ユーザー'),
                  zod.null(),
                ])
                .describe('ユーザー。ユーザーとチームは片方のみ値が入ります。'),
              team: zod
                .union([
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      name: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemTeamOneNameMax,
                        )
                        .describe('名前'),
                      fullName: zod.string().describe('上位組織を含む名前'),
                      code: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemTeamOneCodeMax,
                        )
                        .describe('コード'),
                      notes: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemTeamOneNotesMax,
                        )
                        .nullable()
                        .describe('管理用メモ'),
                      approveOnly: zod
                        .boolean()
                        .describe('承認専用チームかどうか'),
                      usersCount: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoTicketViewersItemTeamOneUsersCountMin,
                        )
                        .describe('ユーザー数'),
                      createdAt: zod.iso
                        .datetime({ offset: true })
                        .describe('作成日時'),
                      updatedAt: zod.iso
                        .datetime({ offset: true })
                        .describe('更新日時'),
                    })
                    .describe('チーム'),
                  zod.null(),
                ])
                .describe('チーム。ユーザーとチームは片方のみ値が入ります。'),
              grade: zod
                .union([
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      name: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemGradeOneNameMax,
                        )
                        .describe('名前'),
                      level: zod
                        .int()
                        .min(
                          getWorkflowResponseOneTwoTicketViewersItemGradeOneLevelMin,
                        )
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemGradeOneLevelMax,
                        )
                        .describe('レベル'),
                      code: zod
                        .string()
                        .max(
                          getWorkflowResponseOneTwoTicketViewersItemGradeOneCodeMax,
                        )
                        .nullable()
                        .describe('コード'),
                      isDefault: zod
                        .boolean()
                        .default(
                          getWorkflowResponseOneTwoTicketViewersItemGradeOneIsDefaultDefault,
                        )
                        .describe('デフォルトの役職かどうか'),
                      createdAt: zod.iso
                        .datetime({ offset: true })
                        .describe('作成日時'),
                      updatedAt: zod.iso
                        .datetime({ offset: true })
                        .describe('更新日時'),
                    })
                    .describe('役職'),
                  zod.null(),
                ])
                .describe(
                  '役職。チーム指定で役職も指定する場合のみ値が入ります。',
                ),
              descendants: zod
                .boolean()
                .describe('下位のチームを含めるかどうか'),
            })
            .describe('ワークフロー単位で設定された共有ユーザー'),
        )
        .describe('ワークフロー単位のチケット共有ユーザー'),
      cloudSignSetting: zod
        .union([
          zod.object({
            required: zod.boolean().describe('書類の添付が必須な場合true'),
          }),
          zod.null(),
        ])
        .describe('クラウドサイン連携設定'),
      nextTicketNumberValue: zod
        .int()
        .nullable()
        .describe(
          '次に採番されるチケット番号の連番値。採番されたことがない場合はnullになります。',
        ),
      nextTicketNumberValueByKey: zod
        .int()
        .nullable()
        .describe(
          '採番グループ側で次に採番される連番値。採番グループが未設定の場合はnullになります。',
        ),
      externalPublish: zod
        .union([
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              externalPublishHash: zod
                .string()
                .describe('外部公開URLに含まれるハッシュ値'),
            })
            .describe('ワークフローの外部公開設定'),
          zod.null(),
        ])
        .describe('外部公開設定。外部公開していない場合はnullになります。'),
      ticketNumberKey: zod
        .union([
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              code: zod.string().describe('コード'),
              name: zod.string().describe('名前'),
              notes: zod.string().nullable().describe('説明'),
              default: zod
                .boolean()
                .describe('デフォルトの採番グループの場合true'),
            })
            .describe('採番グループ'),
          zod.null(),
        ])
        .describe('採番グループ。未設定の場合はnullになります。'),
      excelTemplate: zod
        .union([
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              url: zod
                .string()
                .describe('テンプレートファイルのダウンロードURL'),
              restrictedExport: zod
                .boolean()
                .describe('出力できるチケットのステータスを制限する場合true'),
              allowedTicketStatuses: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      ticketStatus: zod
                        .enum([
                          'draft',
                          'in_progress',
                          'completed',
                          'archived',
                          'rejected',
                          'denied',
                          'permanently_deleted',
                        ])
                        .describe('出力を許可するチケットのステータス'),
                      subStatuses: zod
                        .array(
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              code: zod.string().describe('コード'),
                              name: zod.string().describe('名前'),
                              notes: zod.string().nullable().describe('説明'),
                              allowWithdrawal: zod
                                .boolean()
                                .describe('取り下げを許可する'),
                              allowRejection: zod
                                .boolean()
                                .describe('差し戻しを許可する'),
                              allowDenial: zod
                                .boolean()
                                .describe('却下を許可する'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('サブステータス'),
                        )
                        .describe('出力を許可するサブステータスの配列'),
                      createdAt: zod.iso
                        .datetime({ offset: true })
                        .describe('作成日時'),
                      updatedAt: zod.iso
                        .datetime({ offset: true })
                        .describe('更新日時'),
                    })
                    .describe(
                      'Excel帳票テンプレートの出力を許可するチケットステータス',
                    ),
                )
                .describe('出力を許可するチケットステータスの配列'),
              createdAt: zod.iso
                .datetime({ offset: true })
                .describe('作成日時'),
              updatedAt: zod.iso
                .datetime({ offset: true })
                .describe('更新日時'),
            })
            .describe('Excel帳票テンプレート'),
          zod.null(),
        ])
        .describe('Excel帳票テンプレート。未設定の場合はnullになります。'),
      customNumberings: zod
        .array(
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              code: zod.string().describe('カスタム採番のコード'),
              name: zod.string().describe('カスタム採番の名前'),
              value: zod.int().describe('次に採番される番号'),
              ticketNumberKeyId: zod
                .uuid()
                .nullable()
                .describe(
                  '採番グループ（チケット番号キー）のID。採番グループを使用しない場合はnullになります。',
                ),
            })
            .describe('カスタム採番'),
        )
        .describe('カスタム採番の配列。コードの昇順で格納されます。'),
      customNumberingSettings: zod
        .array(
          zod
            .object({
              id: zod.uuid().describe('UUID'),
              customNumberingId: zod.uuid().describe('カスタム採番のUUID'),
              ticketNumberFormat: zod
                .string()
                .nullable()
                .describe('採番のフォーマット。未設定の場合はnullになります。'),
              timingType: zod
                .enum(['created', 'opened', 'completed', 'sub_status_attached'])
                .describe(
                  '採番するタイミング。createdはチケット作成時、openedは申請時、completedは完了時、sub_status_attachedはサブステータス付与時を表す。',
                ),
              subStatusId: zod
                .uuid()
                .nullable()
                .describe(
                  '採番するサブステータスのUUID。timingTypeがsub_status_attached以外の場合はnullになります。',
                ),
              subStatus: zod
                .union([
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      code: zod.string().describe('コード'),
                      name: zod.string().describe('名前'),
                      notes: zod.string().nullable().describe('説明'),
                      allowWithdrawal: zod
                        .boolean()
                        .describe('取り下げを許可する'),
                      allowRejection: zod
                        .boolean()
                        .describe('差し戻しを許可する'),
                      allowDenial: zod.boolean().describe('却下を許可する'),
                      createdAt: zod.iso
                        .datetime({ offset: true })
                        .describe('作成日時'),
                      updatedAt: zod.iso
                        .datetime({ offset: true })
                        .describe('更新日時'),
                    })
                    .describe('サブステータス'),
                  zod.null(),
                ])
                .describe(
                  '採番するサブステータス。timingTypeがsub_status_attached以外の場合はnullになります。',
                ),
              sortOrder: zod.int().describe('表示順'),
            })
            .describe('ワークフローバージョンごとのカスタム採番の設定'),
        )
        .describe('カスタム採番の設定の配列。表示順の昇順で格納されます。'),
    }),
  )
  .describe(
    'チケットに含まれるワークフロー。セクション情報と共有ユーザー情報を含みます。',
  )
  .and(
    zod.object({
      routeConditions: zod
        .array(
          zod
            .object({
              id: zod.string().describe('UUID'),
              conditionType: zod
                .enum(['always', 'field', 'field_otherwise'])
                .describe('経路分岐タイプ'),
              combinationType: zod
                .enum(['all', 'any', 'custom'])
                .describe('条件の組み合わせタイプ'),
              combinationExpression: zod.string().describe('高度な条件式'),
              route: zod
                .union([
                  zod
                    .object({
                      id: zod.string().describe('UUID'),
                      code: zod.string().describe('コード'),
                      status: zod
                        .enum(['visible', 'deleted', 'error'])
                        .describe('ステータス'),
                      versionId: zod.string().describe('バージョンのID'),
                      versionNumber: zod.int().describe('バージョン番号'),
                      name: zod.string().describe('名前'),
                      description: zod.string().describe('説明'),
                      notes: zod.string().nullable().describe('管理用メモ'),
                      current: zod
                        .boolean()
                        .describe('現在のバージョンかどうか'),
                      createdAt: zod.string().describe('作成日時'),
                      updatedAt: zod.string().describe('更新日時'),
                      versionCreatedAt: zod.iso
                        .datetime({ offset: true })
                        .describe('バージョンの作成日時'),
                      author: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              email: zod
                                .email()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneEmailMax,
                                )
                                .describe('メールアドレス'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneCodeMax,
                                )
                                .describe('コード'),
                              firstName: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneFirstNameMax,
                                )
                                .describe('名'),
                              lastName: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneLastNameMax,
                                )
                                .describe('姓'),
                              fullName: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneFullNameMax,
                                )
                                .describe('フルネーム'),
                              employeeId: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneAuthorOneEmployeeIdMax,
                                )
                                .nullable()
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
                              locale: zod
                                .string()
                                .describe('ロケール（jaまたはen）'),
                              userType: zod
                                .enum(['normal', 'assistant'])
                                .optional()
                                .describe(
                                  'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                ),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                              deactivatedAt: zod.iso
                                .datetime({ offset: true })
                                .nullish()
                                .describe('削除日時'),
                              lastUsedOn: zod.iso
                                .date()
                                .nullish()
                                .describe(
                                  '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                ),
                              customFields: zod
                                .array(
                                  zod.object({
                                    code: zod
                                      .string()
                                      .describe(
                                        'UserCustomField#code（変換せずそのまま）',
                                      ),
                                    fieldType: zod
                                      .union([
                                        zod.literal('text'),
                                        zod.literal('textLong'),
                                        zod.literal('number'),
                                        zod.literal('integer'),
                                        zod.literal('checkbox'),
                                        zod.literal('pullDown'),
                                        zod.literal('date'),
                                        zod.literal(null),
                                      ])
                                      .nullable()
                                      .describe(
                                        'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                      ),
                                    value: zod
                                      .union([
                                        zod.string(),
                                        zod.number(),
                                        zod.array(zod.string()),
                                        zod.null(),
                                      ])
                                      .describe(
                                        'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                      ),
                                  }),
                                )
                                .optional()
                                .describe(
                                  'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                ),
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
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneEmailMax,
                                )
                                .describe('メールアドレス'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneCodeMax,
                                )
                                .describe('コード'),
                              firstName: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneFirstNameMax,
                                )
                                .describe('名'),
                              lastName: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneLastNameMax,
                                )
                                .describe('姓'),
                              fullName: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneFullNameMax,
                                )
                                .describe('フルネーム'),
                              employeeId: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemRouteOneVersionAuthorOneEmployeeIdMax,
                                )
                                .nullable()
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
                              locale: zod
                                .string()
                                .describe('ロケール（jaまたはen）'),
                              userType: zod
                                .enum(['normal', 'assistant'])
                                .optional()
                                .describe(
                                  'ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。',
                                ),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                              deactivatedAt: zod.iso
                                .datetime({ offset: true })
                                .nullish()
                                .describe('削除日時'),
                              lastUsedOn: zod.iso
                                .date()
                                .nullish()
                                .describe(
                                  '最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで \/v1\/users 配下のユーザー情報を取得した場合に返却されます。',
                                ),
                              customFields: zod
                                .array(
                                  zod.object({
                                    code: zod
                                      .string()
                                      .describe(
                                        'UserCustomField#code（変換せずそのまま）',
                                      ),
                                    fieldType: zod
                                      .union([
                                        zod.literal('text'),
                                        zod.literal('textLong'),
                                        zod.literal('number'),
                                        zod.literal('integer'),
                                        zod.literal('checkbox'),
                                        zod.literal('pullDown'),
                                        zod.literal('date'),
                                        zod.literal(null),
                                      ])
                                      .nullable()
                                      .describe(
                                        'ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。',
                                      ),
                                    value: zod
                                      .union([
                                        zod.string(),
                                        zod.number(),
                                        zod.array(zod.string()),
                                        zod.null(),
                                      ])
                                      .describe(
                                        'fieldType に応じた値。number \/ integer は新規に保存された値は文字列で返る\n(旧仕様で保存された既存データは number で返ることがあるため、利用側は string \/ number の両方を受け付けて扱うこと)。\n',
                                      ),
                                  }),
                                )
                                .optional()
                                .describe(
                                  'ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。\ncode は UserCustomField#code を変換せずそのまま持つ。\nfieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。\nvalue は fieldType に応じた型 (string \/ number \/ string[] \/ null)。\nnumber \/ integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string \/ number の両方を受け付けて扱うこと)。\n値がセットされているフィールドのみを含む。\nエンタープライズ\/トライアル契約テナントでのみ含まれる。\nユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET \/v1\/user) のレスポンスに含まれる。\nロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。\n',
                                ),
                            })
                            .describe('ユーザー'),
                          zod.null(),
                        ])
                        .optional(),
                      folder: zod
                        .object({
                          id: zod.uuid().describe('UUID'),
                          name: zod
                            .string()
                            .max(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneNameMax,
                            )
                            .describe('名前'),
                          fullName: zod
                            .string()
                            .describe('フルネーム（ルートフォルダからのパス）'),
                          code: zod
                            .string()
                            .max(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneCodeMax,
                            )
                            .describe('コード'),
                          description: zod.string().nullable().describe('説明'),
                          workflowsCount: zod
                            .int()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneWorkflowsCountMin,
                            )
                            .describe('フォルダ内のワークフロー数'),
                          routesCount: zod
                            .int()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneRoutesCountMin,
                            )
                            .describe('フォルダ内の経路数'),
                          pipelinesCount: zod
                            .int()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOnePipelinesCountMin,
                            )
                            .describe('フォルダ内のパイプライン数'),
                          editable: zod.boolean().describe('編集可能かどうか'),
                          createdAt: zod.iso
                            .datetime({ offset: true })
                            .describe('作成日時'),
                          updatedAt: zod.iso
                            .datetime({ offset: true })
                            .describe('更新日時'),
                        })
                        .describe('フォルダ')
                        .describe('フォルダ'),
                    })
                    .describe('経路'),
                  zod.null(),
                ])
                .describe(
                  '経路。routeまたはerrorMessageは片方のみ値が入ります。',
                ),
              conditionFields: zod
                .array(
                  zod
                    .object({
                      id: zod.string().describe('UUID'),
                      symbol: zod
                        .enum([
                          'equal',
                          'not_equal',
                          'greater_than',
                          'greater_than_or_equal',
                          'less_than',
                          'less_than_or_equal',
                          'include',
                          'exclude',
                          'is_empty',
                          'is_not_empty',
                          'descendants_or_equal',
                        ])
                        .describe('演算子'),
                      value: zod.string().nullable().describe('しきい値'),
                      formField: zod
                        .object({
                          id: zod.uuid().describe('UUID'),
                          title: zod
                            .string()
                            .max(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneTitleMax,
                            )
                            .describe('説明'),
                          description: zod.string().nullable().describe('説明'),
                          fieldType: zod
                            .enum([
                              'text',
                              'text_long',
                              'number',
                              'integer',
                              'checkbox',
                              'pull_down',
                              'date',
                              'file',
                              'master',
                              'user',
                              'team',
                              'ticket',
                              'calculation',
                              'button_api',
                              'button_kintone',
                              'datetime',
                            ])
                            .describe('フィールドの型'),
                          required: zod.boolean().describe('必須項目かどうか'),
                          approver: zod
                            .boolean()
                            .describe('承認者が編集可能かどうか'),
                          author: zod
                            .boolean()
                            .describe('申請者が編集可能かどうか'),
                          options: zod
                            .array(zod.string())
                            .nullable()
                            .describe(
                              '選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。',
                            ),
                          code: zod
                            .string()
                            .max(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneCodeMax,
                            )
                            .describe('コード'),
                          size: zod
                            .enum(['full', 'half'])
                            .describe(
                              'フォームサイズ。fullの場合全幅、halfの場合1\/2になります。',
                            ),
                          regexpFormat: zod
                            .string()
                            .nullable()
                            .describe('正規表現フォーマット'),
                          formula: zod
                            .string()
                            .nullable()
                            .describe(
                              '計算式。\n型がcalculationのときのみ値が入ります。',
                            ),
                          defaultValue: zod
                            .string()
                            .nullable()
                            .describe('初期値'),
                          minValue: zod.number().nullable().describe('最小値'),
                          maxValue: zod.number().nullable().describe('最大値'),
                          minLength: zod
                            .int()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneMinLengthMin,
                            )
                            .nullable()
                            .describe('最小文字数'),
                          maxLength: zod
                            .int()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneMaxLengthMin,
                            )
                            .nullable()
                            .describe('最大文字数'),
                          decimalDigit: zod
                            .int()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneDecimalDigitMin,
                            )
                            .nullable()
                            .describe('小数の桁数'),
                          delimited: zod
                            .boolean()
                            .nullable()
                            .describe(
                              'カンマ区切りで表示する場合true。\n整数、数値、自動計算フィールド以外ではnullが入ります。',
                            ),
                          prefix: zod
                            .string()
                            .nullable()
                            .describe('単位（接頭辞）'),
                          suffix: zod
                            .string()
                            .nullable()
                            .describe('単位（接尾辞）'),
                          hidden: zod
                            .boolean()
                            .nullable()
                            .describe('隠しフィールドである場合true'),
                          readonlyOnUi: zod
                            .boolean()
                            .nullable()
                            .describe(
                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                            ),
                          multiple: zod
                            .boolean()
                            .describe('複数選択を許可するかどうか'),
                          orientation: zod
                            .enum(['vertical', 'horizontal'])
                            .describe(
                              'チェックボックス等の選択肢の並び方向。\nvertical=縦に並べる、horizontal=横に並べて折り返す。\n選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。',
                            ),
                          allowedExtensions: zod
                            .array(zod.string())
                            .nullable()
                            .describe(
                              '添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。\n古いフィールドではnullを返す場合があります。',
                            ),
                          autoLink: zod
                            .boolean()
                            .describe(
                              'チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか',
                            ),
                          useTodayForDefaultValue: zod
                            .boolean()
                            .describe(
                              '日付型フィールドで、当日の日付を初期値にするかどうか',
                            ),
                          allowedTicketStatus: zod
                            .array(
                              zod.enum([
                                'draft',
                                'in_progress',
                                'completed',
                                'rejected',
                                'archived',
                                'denied',
                              ]),
                            )
                            .describe(
                              'チケット型フィールドで、選択可能なチケットのステータス',
                            ),
                        })
                        .describe('フォームフィールド')
                        .describe('対象のフォームフィールド'),
                      grade: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneNameMax,
                                )
                                .describe('名前'),
                              level: zod
                                .int()
                                .min(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneLevelMin,
                                )
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneLevelMax,
                                )
                                .describe('レベル'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneCodeMax,
                                )
                                .nullable()
                                .describe('コード'),
                              isDefault: zod
                                .boolean()
                                .default(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGradeOneIsDefaultDefault,
                                )
                                .describe('デフォルトの役職かどうか'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('役職'),
                          zod.null(),
                        ])
                        .describe('しきい値として使う役職'),
                      team: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneNameMax,
                                )
                                .describe('名前'),
                              fullName: zod
                                .string()
                                .describe('上位組織を含む名前'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneCodeMax,
                                )
                                .describe('コード'),
                              notes: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneNotesMax,
                                )
                                .nullable()
                                .describe('管理用メモ'),
                              approveOnly: zod
                                .boolean()
                                .describe('承認専用チームかどうか'),
                              usersCount: zod
                                .int()
                                .min(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneUsersCountMin,
                                )
                                .describe('ユーザー数'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                            })
                            .describe('チーム'),
                          zod.null(),
                        ])
                        .describe('しきい値として使うチーム'),
                      generalMasterItem: zod
                        .union([
                          zod
                            .object({
                              id: zod.uuid().describe('UUID'),
                              code: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneCodeMax,
                                )
                                .describe('コード'),
                              name: zod
                                .string()
                                .max(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneNameMax,
                                )
                                .describe('名前'),
                              description: zod
                                .string()
                                .nullable()
                                .describe('説明'),
                              createdAt: zod.iso
                                .datetime({ offset: true })
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({ offset: true })
                                .describe('更新日時'),
                              startsOn: zod.iso
                                .date()
                                .nullable()
                                .describe('有効期限の開始日'),
                              endsOn: zod.iso
                                .date()
                                .nullable()
                                .describe('有効期限の終了日'),
                              inputs: zod
                                .array(
                                  zod.object({
                                    id: zod.uuid().describe('UUID'),
                                    value: zod
                                      .union([
                                        zod.string().nullable(),
                                        zod.array(zod.string()),
                                      ])
                                      .describe('入力値'),
                                    createdAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({ offset: true })
                                      .describe('更新日時'),
                                    field: zod
                                      .object({
                                        id: zod.uuid().describe('UUID'),
                                        title: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldTitleMax,
                                          )
                                          .describe('フィールド名'),
                                        description: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldDescriptionMax,
                                          )
                                          .nullable()
                                          .describe('フィールドの説明'),
                                        code: zod
                                          .string()
                                          .max(
                                            getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax,
                                          )
                                          .describe('フィールドのコード'),
                                        fieldType: zod
                                          .enum([
                                            'text',
                                            'text_long',
                                            'number',
                                            'integer',
                                            'checkbox',
                                            'pull_down',
                                            'date',
                                          ])
                                          .describe('フィールドの型'),
                                        required: zod
                                          .boolean()
                                          .describe('必須項目かどうか'),
                                        fieldOrder: zod
                                          .int()
                                          .describe('フィールドの表示順'),
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        initialDisplay: zod
                                          .boolean()
                                          .describe('初期表示するか'),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({ offset: true })
                                          .describe('更新日時'),
                                      })
                                      .describe(
                                        '汎用マスタのカスタムフィールド',
                                      ),
                                  }),
                                )
                                .describe('カスタムフィールドの入力の配列'),
                            })
                            .describe('汎用マスタのアイテム'),
                          zod.null(),
                        ])
                        .describe('しきい値として使う汎用マスタアイテム'),
                    })
                    .describe('ワークフロー経路分岐の条件'),
                )
                .describe('条件'),
              errorMessage: zod
                .string()
                .nullable()
                .describe(
                  '申請拒否時のエラーメッセージ。routeまたはerrorMessageは片方のみ値が入ります。',
                ),
            })
            .describe('ワークフローの経路分岐'),
        )
        .describe('経路分岐'),
    }),
  )
  .describe('ワークフローの詳細')
