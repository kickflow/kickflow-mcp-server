import * as zod from 'zod'

/**
 * 経路の一覧を取得します。ステータスやフォルダによる絞り込みが可能です。
 * @summary 経路一覧を取得
 */
export const listRoutesQueryPageDefault = 1

export const listRoutesQueryPerPageDefault = 25
export const listRoutesQueryPerPageMax = 100

export const listRoutesQuerySortByRegExp = new RegExp(
  '^(createdAt|folderId)(-asc|-desc)?$',
)

export const ListRoutesQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listRoutesQueryPageDefault)
    .describe('ページ。1が最初のページ。'),
  perPage: zod
    .number()
    .min(1)
    .max(listRoutesQueryPerPageMax)
    .default(listRoutesQueryPerPageDefault)
    .describe('1ページあたりの件数'),
  sortBy: zod
    .string()
    .regex(listRoutesQuerySortByRegExp)
    .optional()
    .describe(
      'ソート対象のフィールドと順序。指定可能なフィールド: createdAt, folderId',
    ),
  status: zod
    .array(zod.enum(['visible', 'error']))
    .optional()
    .describe('ステータス'),
  folderId: zod.uuid().optional().describe('フォルダのUUID'),
})

export const listRoutesResponseAuthorOneEmailMax = 254

export const listRoutesResponseAuthorOneCodeMax = 100

export const listRoutesResponseAuthorOneFirstNameMax = 255

export const listRoutesResponseAuthorOneLastNameMax = 255

export const listRoutesResponseAuthorOneFullNameMax = 255

export const listRoutesResponseAuthorOneEmployeeIdMax = 30

export const listRoutesResponseVersionAuthorOneEmailMax = 254

export const listRoutesResponseVersionAuthorOneCodeMax = 100

export const listRoutesResponseVersionAuthorOneFirstNameMax = 255

export const listRoutesResponseVersionAuthorOneLastNameMax = 255

export const listRoutesResponseVersionAuthorOneFullNameMax = 255

export const listRoutesResponseVersionAuthorOneEmployeeIdMax = 30

export const listRoutesResponseFolderOneNameMax = 300

export const listRoutesResponseFolderOneCodeMax = 100

export const listRoutesResponseFolderOneWorkflowsCountMin = 0

export const listRoutesResponseFolderOneRoutesCountMin = 0

export const listRoutesResponseFolderOnePipelinesCountMin = 0

export const ListRoutesResponseItem = zod
  .object({
    id: zod.string().describe('UUID'),
    code: zod.string().describe('コード'),
    status: zod.enum(['visible', 'deleted', 'error']).describe('ステータス'),
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
              .max(listRoutesResponseAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(listRoutesResponseAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(listRoutesResponseAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(listRoutesResponseAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(listRoutesResponseAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(listRoutesResponseAuthorOneEmployeeIdMax)
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
      .optional()
      .describe('作成者'),
    versionAuthor: zod
      .union([
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(listRoutesResponseVersionAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(listRoutesResponseVersionAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(listRoutesResponseVersionAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(listRoutesResponseVersionAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(listRoutesResponseVersionAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(listRoutesResponseVersionAuthorOneEmployeeIdMax)
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
      .optional(),
    folder: zod
      .object({
        id: zod.uuid().describe('UUID'),
        name: zod
          .string()
          .max(listRoutesResponseFolderOneNameMax)
          .describe('名前'),
        code: zod
          .string()
          .max(listRoutesResponseFolderOneCodeMax)
          .describe('コード'),
        description: zod.string().nullish().describe('説明'),
        workflowsCount: zod
          .number()
          .min(listRoutesResponseFolderOneWorkflowsCountMin)
          .describe('フォルダ内のワークフロー数'),
        routesCount: zod
          .number()
          .min(listRoutesResponseFolderOneRoutesCountMin)
          .describe('フォルダ内の経路数'),
        pipelinesCount: zod
          .number()
          .min(listRoutesResponseFolderOnePipelinesCountMin)
          .describe('フォルダ内のパイプライン数'),
        createdAt: zod.iso.datetime({}).describe('作成日時'),
        updatedAt: zod.iso.datetime({}).describe('更新日時'),
      })
      .describe('フォルダ')
      .describe('フォルダ'),
  })
  .describe('経路')
export const ListRoutesResponse = zod.array(ListRoutesResponseItem)

/**
 * 指定した経路を取得します。
 * @summary 経路を取得
 */
export const getRoutePathRouteIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$')

export const GetRouteParams = zod.object({
  routeId: zod
    .string()
    .regex(getRoutePathRouteIdRegExp)
    .describe('経路のUUIDまたはコード'),
})

export const getRouteResponseOneAuthorOneEmailMax = 254

export const getRouteResponseOneAuthorOneCodeMax = 100

export const getRouteResponseOneAuthorOneFirstNameMax = 255

export const getRouteResponseOneAuthorOneLastNameMax = 255

export const getRouteResponseOneAuthorOneFullNameMax = 255

export const getRouteResponseOneAuthorOneEmployeeIdMax = 30

export const getRouteResponseOneVersionAuthorOneEmailMax = 254

export const getRouteResponseOneVersionAuthorOneCodeMax = 100

export const getRouteResponseOneVersionAuthorOneFirstNameMax = 255

export const getRouteResponseOneVersionAuthorOneLastNameMax = 255

export const getRouteResponseOneVersionAuthorOneFullNameMax = 255

export const getRouteResponseOneVersionAuthorOneEmployeeIdMax = 30

export const getRouteResponseOneFolderOneNameMax = 300

export const getRouteResponseOneFolderOneCodeMax = 100

export const getRouteResponseOneFolderOneWorkflowsCountMin = 0

export const getRouteResponseOneFolderOneRoutesCountMin = 0

export const getRouteResponseOneFolderOnePipelinesCountMin = 0

export const getRouteResponseTwoStepsItemMinCustomAssigneesMin = 0

export const getRouteResponseTwoStepsItemUsersItemEmailMax = 254

export const getRouteResponseTwoStepsItemUsersItemCodeMax = 100

export const getRouteResponseTwoStepsItemUsersItemFirstNameMax = 255

export const getRouteResponseTwoStepsItemUsersItemLastNameMax = 255

export const getRouteResponseTwoStepsItemUsersItemFullNameMax = 255

export const getRouteResponseTwoStepsItemUsersItemEmployeeIdMax = 30

export const getRouteResponseTwoStepsItemTargetsItemTeamNameMax = 300

export const getRouteResponseTwoStepsItemTargetsItemTeamCodeMax = 100

export const getRouteResponseTwoStepsItemTargetsItemTeamNotesMax = 10000

export const getRouteResponseTwoStepsItemTargetsItemTeamUsersCountMin = 0

export const getRouteResponseTwoStepsItemTargetsItemGradesItemNameMax = 300

export const getRouteResponseTwoStepsItemTargetsItemGradesItemLevelMin = 0
export const getRouteResponseTwoStepsItemTargetsItemGradesItemLevelMax = 255

export const getRouteResponseTwoStepsItemTargetsItemGradesItemCodeMax = 100

export const getRouteResponseTwoStepsItemTargetsItemGradesItemIsDefaultDefault = false
export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneNameMax = 300

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneLevelMin = 0
export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneLevelMax = 255

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneCodeMax = 100

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneIsDefaultDefault = false
export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneNameMax = 300

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneCodeMax = 100

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneNotesMax = 10000

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneUsersCountMin = 0

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneCodeMax = 100

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneNameMax = 100

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneInputsItemFieldTitleMax = 300

export const getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax = 100

export const GetRouteResponse = zod
  .object({
    id: zod.string().describe('UUID'),
    code: zod.string().describe('コード'),
    status: zod.enum(['visible', 'deleted', 'error']).describe('ステータス'),
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
              .max(getRouteResponseOneAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(getRouteResponseOneAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(getRouteResponseOneAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(getRouteResponseOneAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(getRouteResponseOneAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(getRouteResponseOneAuthorOneEmployeeIdMax)
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
      .optional()
      .describe('作成者'),
    versionAuthor: zod
      .union([
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(getRouteResponseOneVersionAuthorOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(getRouteResponseOneVersionAuthorOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(getRouteResponseOneVersionAuthorOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(getRouteResponseOneVersionAuthorOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(getRouteResponseOneVersionAuthorOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(getRouteResponseOneVersionAuthorOneEmployeeIdMax)
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
      .optional(),
    folder: zod
      .object({
        id: zod.uuid().describe('UUID'),
        name: zod
          .string()
          .max(getRouteResponseOneFolderOneNameMax)
          .describe('名前'),
        code: zod
          .string()
          .max(getRouteResponseOneFolderOneCodeMax)
          .describe('コード'),
        description: zod.string().nullish().describe('説明'),
        workflowsCount: zod
          .number()
          .min(getRouteResponseOneFolderOneWorkflowsCountMin)
          .describe('フォルダ内のワークフロー数'),
        routesCount: zod
          .number()
          .min(getRouteResponseOneFolderOneRoutesCountMin)
          .describe('フォルダ内の経路数'),
        pipelinesCount: zod
          .number()
          .min(getRouteResponseOneFolderOnePipelinesCountMin)
          .describe('フォルダ内のパイプライン数'),
        createdAt: zod.iso.datetime({}).describe('作成日時'),
        updatedAt: zod.iso.datetime({}).describe('更新日時'),
      })
      .describe('フォルダ')
      .describe('フォルダ'),
  })
  .describe('経路')
  .and(
    zod.object({
      steps: zod
        .array(
          zod
            .object({
              id: zod.string().describe('UUID'),
              stepOrder: zod
                .number()
                .describe('ステップ順序（1から始まります）'),
              stepType: zod
                .enum([
                  'author',
                  'manager',
                  'team',
                  'user',
                  'author_customizable',
                  'assignee_customizable',
                  'dynamic_team',
                  'dynamic_user',
                ])
                .describe('ステップのタイプ'),
              title: zod.string().describe('タイトル'),
              actionType: zod
                .enum(['approve', 'confirm', 'none'])
                .describe(
                  'アクションタイプ。承認\/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。',
                ),
              instruction: zod.string().nullable().describe('承認者への指示'),
              requiredApprovalsNumber: zod.number().describe('必要な承認人数'),
              requiredApprovalsPercent: zod
                .number()
                .describe('必要な承認割合（%）'),
              fallbackType: zod
                .union([
                  zod.enum([
                    'direct_manager',
                    'higher_manager',
                    'skip',
                    'no_fallback',
                    'higher_team',
                  ]),
                  zod.null(),
                ])
                .describe('フォールバックのタイプ'),
              allowSelfApproval: zod.boolean().describe('自己承認を許可するか'),
              minCustomAssignees: zod
                .number()
                .min(getRouteResponseTwoStepsItemMinCustomAssigneesMin)
                .nullable()
                .describe(
                  '最小指名人数。「申請者が指名」ステップのみ設定可能。',
                ),
              approverAssignmentInstruction: zod
                .string()
                .nullable()
                .describe('承認者の選び方'),
              users: zod
                .array(
                  zod
                    .object({
                      id: zod.uuid().describe('UUID'),
                      email: zod
                        .email()
                        .max(getRouteResponseTwoStepsItemUsersItemEmailMax)
                        .describe('メールアドレス'),
                      code: zod
                        .string()
                        .max(getRouteResponseTwoStepsItemUsersItemCodeMax)
                        .describe('コード'),
                      firstName: zod
                        .string()
                        .max(getRouteResponseTwoStepsItemUsersItemFirstNameMax)
                        .describe('名'),
                      lastName: zod
                        .string()
                        .max(getRouteResponseTwoStepsItemUsersItemLastNameMax)
                        .describe('姓'),
                      fullName: zod
                        .string()
                        .max(getRouteResponseTwoStepsItemUsersItemFullNameMax)
                        .describe('フルネーム'),
                      employeeId: zod
                        .string()
                        .max(getRouteResponseTwoStepsItemUsersItemEmployeeIdMax)
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
                )
                .describe('承認者の指定に使うユーザーの配列'),
              targets: zod
                .array(
                  zod.object({
                    team: zod
                      .object({
                        id: zod.uuid().describe('UUID'),
                        name: zod
                          .string()
                          .max(
                            getRouteResponseTwoStepsItemTargetsItemTeamNameMax,
                          )
                          .describe('名前'),
                        fullName: zod.string().describe('上位組織を含む名前'),
                        code: zod
                          .string()
                          .max(
                            getRouteResponseTwoStepsItemTargetsItemTeamCodeMax,
                          )
                          .describe('コード'),
                        notes: zod
                          .string()
                          .max(
                            getRouteResponseTwoStepsItemTargetsItemTeamNotesMax,
                          )
                          .nullish()
                          .describe('管理用メモ'),
                        approveOnly: zod
                          .boolean()
                          .describe('承認専用チームかどうか'),
                        usersCount: zod
                          .number()
                          .min(
                            getRouteResponseTwoStepsItemTargetsItemTeamUsersCountMin,
                          )
                          .describe('ユーザー数'),
                        createdAt: zod.iso.datetime({}).describe('作成日時'),
                        updatedAt: zod.iso.datetime({}).describe('更新日時'),
                      })
                      .optional()
                      .describe('チーム'),
                    descendants: zod
                      .boolean()
                      .optional()
                      .describe(
                        'stepType=author_customizableまたはstepType=assignee_customizableの場合に、指定したチームの下位チームのメンバーも承認者候補に含めるかどうか（true: 含める、false: 含めない）',
                      ),
                    gradeSymbol: zod
                      .union([
                        zod.enum([
                          'equal',
                          'greater_than',
                          'greater_than_or_equal',
                          'less_than',
                          'less_than_or_equal',
                          'any_of',
                        ]),
                        zod.null(),
                      ])
                      .optional()
                      .describe(
                        '役職の比較条件。役職が指定されているときのみ値が入ります。',
                      ),
                    grades: zod
                      .array(
                        zod
                          .object({
                            id: zod.uuid().describe('UUID'),
                            name: zod
                              .string()
                              .max(
                                getRouteResponseTwoStepsItemTargetsItemGradesItemNameMax,
                              )
                              .describe('名前'),
                            level: zod
                              .number()
                              .min(
                                getRouteResponseTwoStepsItemTargetsItemGradesItemLevelMin,
                              )
                              .max(
                                getRouteResponseTwoStepsItemTargetsItemGradesItemLevelMax,
                              )
                              .describe('レベル'),
                            code: zod
                              .string()
                              .max(
                                getRouteResponseTwoStepsItemTargetsItemGradesItemCodeMax,
                              )
                              .nullable()
                              .describe('コード'),
                            isDefault: zod
                              .boolean()
                              .default(
                                getRouteResponseTwoStepsItemTargetsItemGradesItemIsDefaultDefault,
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
                      )
                      .optional()
                      .describe('承認者の指定に使う役職の配列'),
                    variable: zod
                      .string()
                      .nullish()
                      .describe(
                        '承認者タイプ「チームを動的に指定」または「ユーザーを動的に指定」で指定する変数名が入ります。',
                      ),
                  }),
                )
                .optional()
                .describe('承認者の指定に使うチームと役職の条件'),
              routeStepCondition: zod
                .union([
                  zod
                    .object({
                      id: zod.uuid().optional().describe('UUID'),
                      conditionType: zod
                        .enum(['always', 'conditional', 'conditional_skip'])
                        .optional()
                        .describe('実行タイプ'),
                      combinationType: zod
                        .enum(['all', 'any'])
                        .optional()
                        .describe('条件の組み合わせタイプ'),
                      routeStepConditionFields: zod
                        .array(
                          zod
                            .object({
                              id: zod.uuid().optional().describe('UUID'),
                              variable: zod
                                .string()
                                .optional()
                                .describe('変数'),
                              fieldKey: zod
                                .enum([
                                  'author_grade',
                                  'author_team',
                                  'text_variable',
                                  'number_variable',
                                  'checkbox_variable',
                                  'general_master_variable',
                                  'other_variable',
                                ])
                                .optional()
                                .describe('変数のフィールド'),
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
                                  'not_descendants_or_equal',
                                ])
                                .optional()
                                .describe('演算子'),
                              value: zod
                                .string()
                                .optional()
                                .describe('しきい値'),
                              grade: zod
                                .object({
                                  id: zod.uuid().describe('UUID'),
                                  name: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneNameMax,
                                    )
                                    .describe('名前'),
                                  level: zod
                                    .number()
                                    .min(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneLevelMin,
                                    )
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneLevelMax,
                                    )
                                    .describe('レベル'),
                                  code: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneCodeMax,
                                    )
                                    .nullable()
                                    .describe('コード'),
                                  isDefault: zod
                                    .boolean()
                                    .default(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGradeOneIsDefaultDefault,
                                    )
                                    .describe('デフォルトの役職かどうか'),
                                  createdAt: zod.iso
                                    .datetime({})
                                    .describe('作成日時'),
                                  updatedAt: zod.iso
                                    .datetime({})
                                    .describe('更新日時'),
                                })
                                .describe('役職')
                                .optional()
                                .describe('しきい値として使う役職'),
                              team: zod
                                .object({
                                  id: zod.uuid().describe('UUID'),
                                  name: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneNameMax,
                                    )
                                    .describe('名前'),
                                  fullName: zod
                                    .string()
                                    .describe('上位組織を含む名前'),
                                  code: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneCodeMax,
                                    )
                                    .describe('コード'),
                                  notes: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneNotesMax,
                                    )
                                    .nullish()
                                    .describe('管理用メモ'),
                                  approveOnly: zod
                                    .boolean()
                                    .describe('承認専用チームかどうか'),
                                  usersCount: zod
                                    .number()
                                    .min(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemTeamOneUsersCountMin,
                                    )
                                    .describe('ユーザー数'),
                                  createdAt: zod.iso
                                    .datetime({})
                                    .describe('作成日時'),
                                  updatedAt: zod.iso
                                    .datetime({})
                                    .describe('更新日時'),
                                })
                                .describe('チーム')
                                .optional()
                                .describe('しきい値として使うチーム'),
                              generalMasterItem: zod
                                .object({
                                  id: zod.uuid().describe('UUID'),
                                  code: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneCodeMax,
                                    )
                                    .describe('コード'),
                                  name: zod
                                    .string()
                                    .max(
                                      getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneNameMax,
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
                                                getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneInputsItemFieldTitleMax,
                                              )
                                              .describe('フィールド名'),
                                            description: zod
                                              .string()
                                              .nullable()
                                              .describe('フィールドの説明'),
                                            code: zod
                                              .string()
                                              .max(
                                                getRouteResponseTwoStepsItemRouteStepConditionOneRouteStepConditionFieldsItemGeneralMasterItemOneInputsItemFieldCodeMax,
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
                                .describe('汎用マスタのアイテム')
                                .optional()
                                .describe(
                                  'しきい値として使う汎用マスタアイテム',
                                ),
                            })
                            .describe('ステップごとに設定できる実行条件の詳細'),
                        )
                        .optional(),
                    })
                    .describe('ステップごとに設定できる実行条件'),
                  zod.null(),
                ])
                .optional(),
              code: zod.string().describe('コード'),
            })
            .describe('経路ステップ'),
        )
        .describe('経路ステップ'),
    }),
  )
  .describe('経路の詳細情報')
