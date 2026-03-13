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
    .number()
    .min(1)
    .default(listWorkflowsQueryPageDefault)
    .describe('ページ。1が最初のページ。'),
  perPage: zod
    .number()
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

export const listWorkflowsResponseCategoriesItemNameMax = 100

export const ListWorkflowsResponseItem = zod
  .object({
    id: zod.string().describe('UUID'),
    code: zod
      .string()
      .regex(listWorkflowsResponseCodeRegExp)
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
        zod.null(),
      ])
      .describe('バージョン作成者'),
    folder: zod
      .object({
        id: zod.uuid().describe('UUID'),
        name: zod
          .string()
          .max(listWorkflowsResponseFolderOneNameMax)
          .describe('名前'),
        code: zod
          .string()
          .max(listWorkflowsResponseFolderOneCodeMax)
          .describe('コード'),
        description: zod.string().nullish().describe('説明'),
        workflowsCount: zod
          .number()
          .min(listWorkflowsResponseFolderOneWorkflowsCountMin)
          .describe('フォルダ内のワークフロー数'),
        routesCount: zod
          .number()
          .min(listWorkflowsResponseFolderOneRoutesCountMin)
          .describe('フォルダ内の経路数'),
        pipelinesCount: zod
          .number()
          .min(listWorkflowsResponseFolderOnePipelinesCountMin)
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
              .max(listWorkflowsResponseCategoriesItemNameMax)
              .describe('名前'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
          })
          .describe('カテゴリ'),
      )
      .describe('カテゴリの配列'),
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

export const getWorkflowResponseOneOneCategoriesItemNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMinLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMaxLengthMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneDecimalDigitMin = 0

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoGeneralMasterOneFieldsItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldTitleMax = 300

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

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneNameMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoGeneralMasterOneFieldsItemCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneCodeMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneNameMax = 100

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldTitleMax = 300

export const getWorkflowResponseOneTwoSectionListItemSlipFieldsItemTwoDefaultGeneralMasterItemOneInputsItemFieldCodeMax = 100

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

export const getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax = 100

export const GetWorkflowResponse = zod
  .object({
    id: zod.string().describe('UUID'),
    code: zod
      .string()
      .regex(getWorkflowResponseOneOneCodeRegExp)
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
        code: zod
          .string()
          .max(getWorkflowResponseOneOneFolderOneCodeMax)
          .describe('コード'),
        description: zod.string().nullish().describe('説明'),
        workflowsCount: zod
          .number()
          .min(getWorkflowResponseOneOneFolderOneWorkflowsCountMin)
          .describe('フォルダ内のワークフロー数'),
        routesCount: zod
          .number()
          .min(getWorkflowResponseOneOneFolderOneRoutesCountMin)
          .describe('フォルダ内の経路数'),
        pipelinesCount: zod
          .number()
          .min(getWorkflowResponseOneOneFolderOnePipelinesCountMin)
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
              .max(getWorkflowResponseOneOneCategoriesItemNameMax)
              .describe('名前'),
            createdAt: zod.iso.datetime({}).describe('作成日時'),
            updatedAt: zod.iso.datetime({}).describe('更新日時'),
          })
          .describe('カテゴリ'),
      )
      .describe('カテゴリの配列'),
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
              id: zod
                .uuid()
                .optional()
                .describe(
                  'フォームセクションのID（UUID）。明細セクションには含まれません。',
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
                        ])
                        .describe('フィールドの型'),
                      required: zod.boolean().describe('必須項目かどうか'),
                      approver: zod
                        .boolean()
                        .describe('承認者が編集可能かどうか'),
                      author: zod
                        .boolean()
                        .optional()
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
                        .number()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMinLengthMin,
                        )
                        .nullable()
                        .describe('最小文字数'),
                      maxLength: zod
                        .number()
                        .min(
                          getWorkflowResponseOneTwoSectionListItemFormFieldsItemOneMaxLengthMin,
                        )
                        .nullable()
                        .describe('最大文字数'),
                      decimalDigit: zod
                        .number()
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
                        .nullish()
                        .describe('隠しフィールドである場合true'),
                      readonlyOnUi: zod
                        .boolean()
                        .nullish()
                        .describe(
                          'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                                  .nullable()
                                  .describe('説明'),
                                createdAt: zod.iso
                                  .datetime({})
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({})
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
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({})
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({})
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
                          .optional()
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
                                  .datetime({})
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({})
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
                                        .datetime({})
                                        .describe('作成日時'),
                                      updatedAt: zod.iso
                                        .datetime({})
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
                                          visible: zod
                                            .boolean()
                                            .describe(
                                              '管理者以外も閲覧可能な場合true',
                                            ),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                            ),
                                          createdAt: zod.iso
                                            .datetime({})
                                            .describe('作成日時'),
                                          updatedAt: zod.iso
                                            .datetime({})
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
                          .optional()
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
                                            .optional()
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
                                            .number()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldMinLengthMin,
                                            )
                                            .nullable()
                                            .describe('最小文字数'),
                                          maxLength: zod
                                            .number()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoExternalApiSettingOneMappingsItemFormFieldMaxLengthMin,
                                            )
                                            .nullable()
                                            .describe('最大文字数'),
                                          decimalDigit: zod
                                            .number()
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
                                            .nullish()
                                            .describe(
                                              '隠しフィールドである場合true',
                                            ),
                                          readonlyOnUi: zod
                                            .boolean()
                                            .nullish()
                                            .describe(
                                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                          .optional()
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
                                      .optional()
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
                                      .number()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldMinLengthMin,
                                      )
                                      .nullable()
                                      .describe('最小文字数'),
                                    maxLength: zod
                                      .number()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneFormFieldMaxLengthMin,
                                      )
                                      .nullable()
                                      .describe('最大文字数'),
                                    decimalDigit: zod
                                      .number()
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
                                      .nullish()
                                      .describe('隠しフィールドである場合true'),
                                    readonlyOnUi: zod
                                      .boolean()
                                      .nullish()
                                      .describe(
                                        'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                                  })
                                  .describe('kintone連携'),
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
                                            .optional()
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
                                            .number()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldMinLengthMin,
                                            )
                                            .nullable()
                                            .describe('最小文字数'),
                                          maxLength: zod
                                            .number()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoKintoneAppSettingOneMappingsItemFormFieldMaxLengthMin,
                                            )
                                            .nullable()
                                            .describe('最大文字数'),
                                          decimalDigit: zod
                                            .number()
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
                                            .nullish()
                                            .describe(
                                              '隠しフィールドである場合true',
                                            ),
                                          readonlyOnUi: zod
                                            .boolean()
                                            .nullish()
                                            .describe(
                                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                          .optional()
                          .describe(
                            '外部API設定。fieldTypeがbutton_kintoneのときのみ値が入ります。',
                          ),
                        climberCloudSetting: zod
                          .union([
                            zod
                              .object({
                                id: zod.uuid().describe('UUID'),
                                contentsId: zod
                                  .string()
                                  .describe('ファイル付きリストID'),
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
                                      .optional()
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
                                      .number()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldMinLengthMin,
                                      )
                                      .nullable()
                                      .describe('最小文字数'),
                                    maxLength: zod
                                      .number()
                                      .min(
                                        getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneFormFieldMaxLengthMin,
                                      )
                                      .nullable()
                                      .describe('最大文字数'),
                                    decimalDigit: zod
                                      .number()
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
                                      .nullish()
                                      .describe('隠しフィールドである場合true'),
                                    readonlyOnUi: zod
                                      .boolean()
                                      .nullish()
                                      .describe(
                                        'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                                            .optional()
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
                                            .number()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldMinLengthMin,
                                            )
                                            .nullable()
                                            .describe('最小文字数'),
                                          maxLength: zod
                                            .number()
                                            .min(
                                              getWorkflowResponseOneTwoSectionListItemFormFieldsItemTwoClimberCloudSettingOneMappingsItemFormFieldMaxLengthMin,
                                            )
                                            .nullable()
                                            .describe('最大文字数'),
                                          decimalDigit: zod
                                            .number()
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
                                            .nullish()
                                            .describe(
                                              '隠しフィールドである場合true',
                                            ),
                                          readonlyOnUi: zod
                                            .boolean()
                                            .nullish()
                                            .describe(
                                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
                                            ),
                                        })
                                        .describe('フォームフィールド'),
                                      order: zod
                                        .number()
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
                          .nullish()
                          .describe(
                            '汎用マスタ型フィールドの自動絞り込みの設定',
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
                      decimalDigit: zod
                        .number()
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
                        .optional()
                        .describe('申請者が編集可能かどうか'),
                      hidden: zod
                        .boolean()
                        .nullish()
                        .describe('隠しフィールドである場合true'),
                      readonlyOnUi: zod
                        .boolean()
                        .nullish()
                        .describe(
                          'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                                  .nullable()
                                  .describe('説明'),
                                createdAt: zod.iso
                                  .datetime({})
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({})
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
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({})
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({})
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
                          .optional()
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
                                  .datetime({})
                                  .describe('作成日時'),
                                updatedAt: zod.iso
                                  .datetime({})
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
                                        .datetime({})
                                        .describe('作成日時'),
                                      updatedAt: zod.iso
                                        .datetime({})
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
                                          visible: zod
                                            .boolean()
                                            .describe(
                                              '管理者以外も閲覧可能な場合true',
                                            ),
                                          options: zod
                                            .array(zod.string())
                                            .nullable()
                                            .describe(
                                              '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                            ),
                                          createdAt: zod.iso
                                            .datetime({})
                                            .describe('作成日時'),
                                          updatedAt: zod.iso
                                            .datetime({})
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
                          .optional()
                          .describe('汎用マスタアイテムの初期値'),
                      }),
                    )
                    .describe('明細フィールドの詳細'),
                )
                .optional()
                .describe(
                  '明細フィールド。フォームセクションには含まれません。',
                ),
            })
            .describe('明細セクションまたはフォームセクション'),
        )
        .optional()
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
                        .nullish()
                        .describe('管理用メモ'),
                      approveOnly: zod
                        .boolean()
                        .describe('承認専用チームかどうか'),
                      usersCount: zod
                        .number()
                        .min(
                          getWorkflowResponseOneTwoTicketViewersItemTeamOneUsersCountMin,
                        )
                        .describe('ユーザー数'),
                      createdAt: zod.iso.datetime({}).describe('作成日時'),
                      updatedAt: zod.iso.datetime({}).describe('更新日時'),
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
                        .number()
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
                      createdAt: zod.iso.datetime({}).describe('作成日時'),
                      updatedAt: zod.iso.datetime({}).describe('更新日時'),
                    })
                    .describe('役職'),
                  zod.null(),
                ])
                .describe(
                  '役職。チーム指定で役職も指定する場合のみ値が入ります。',
                ),
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
                      versionNumber: zod.number().describe('バージョン番号'),
                      name: zod.string().describe('名前'),
                      description: zod.string().describe('説明'),
                      createdAt: zod.string().describe('作成日時'),
                      updatedAt: zod.string().describe('更新日時'),
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
                              locale: zod
                                .string()
                                .describe('ロケール（jaまたはen）'),
                              createdAt: zod.iso
                                .datetime({})
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({})
                                .describe('更新日時'),
                              deactivatedAt: zod.iso
                                .datetime({})
                                .nullish()
                                .describe('削除日時'),
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
                              locale: zod
                                .string()
                                .describe('ロケール（jaまたはen）'),
                              createdAt: zod.iso
                                .datetime({})
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({})
                                .describe('更新日時'),
                              deactivatedAt: zod.iso
                                .datetime({})
                                .nullish()
                                .describe('削除日時'),
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
                          code: zod
                            .string()
                            .max(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneCodeMax,
                            )
                            .describe('コード'),
                          description: zod.string().nullish().describe('説明'),
                          workflowsCount: zod
                            .number()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneWorkflowsCountMin,
                            )
                            .describe('フォルダ内のワークフロー数'),
                          routesCount: zod
                            .number()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOneRoutesCountMin,
                            )
                            .describe('フォルダ内の経路数'),
                          pipelinesCount: zod
                            .number()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemRouteOneFolderOnePipelinesCountMin,
                            )
                            .describe('フォルダ内のパイプライン数'),
                          createdAt: zod.iso.datetime({}).describe('作成日時'),
                          updatedAt: zod.iso.datetime({}).describe('更新日時'),
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
                            ])
                            .describe('フィールドの型'),
                          required: zod.boolean().describe('必須項目かどうか'),
                          approver: zod
                            .boolean()
                            .describe('承認者が編集可能かどうか'),
                          author: zod
                            .boolean()
                            .optional()
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
                            .number()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneMinLengthMin,
                            )
                            .nullable()
                            .describe('最小文字数'),
                          maxLength: zod
                            .number()
                            .min(
                              getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemFormFieldOneMaxLengthMin,
                            )
                            .nullable()
                            .describe('最大文字数'),
                          decimalDigit: zod
                            .number()
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
                            .nullish()
                            .describe('隠しフィールドである場合true'),
                          readonlyOnUi: zod
                            .boolean()
                            .nullish()
                            .describe(
                              'trueの時、申請者・承認者が画面上から値を入力することを禁止します。\n外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。',
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
                                .number()
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
                                .datetime({})
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({})
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
                                .nullish()
                                .describe('管理用メモ'),
                              approveOnly: zod
                                .boolean()
                                .describe('承認専用チームかどうか'),
                              usersCount: zod
                                .number()
                                .min(
                                  getWorkflowResponseTwoRouteConditionsItemConditionFieldsItemTeamOneUsersCountMin,
                                )
                                .describe('ユーザー数'),
                              createdAt: zod.iso
                                .datetime({})
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({})
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
                                .datetime({})
                                .describe('作成日時'),
                              updatedAt: zod.iso
                                .datetime({})
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
                                      .datetime({})
                                      .describe('作成日時'),
                                    updatedAt: zod.iso
                                      .datetime({})
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
                                        visible: zod
                                          .boolean()
                                          .describe(
                                            '管理者以外も閲覧可能な場合true',
                                          ),
                                        options: zod
                                          .array(zod.string())
                                          .nullable()
                                          .describe(
                                            '選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。',
                                          ),
                                        createdAt: zod.iso
                                          .datetime({})
                                          .describe('作成日時'),
                                        updatedAt: zod.iso
                                          .datetime({})
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
