import * as zod from 'zod'

/**
 * 監査ログの一覧を取得します。
 * @summary 監査ログ一覧を取得
 */
export const listAuditLogsQueryPageDefault = 1

export const listAuditLogsQueryPerPageDefault = 25
export const listAuditLogsQueryPerPageMax = 100

export const listAuditLogsQuerySortByRegExp = new RegExp(
  '^(createdAt)(-asc|-desc)?$',
)

export const ListAuditLogsQueryParams = zod.object({
  page: zod
    .number()
    .min(1)
    .default(listAuditLogsQueryPageDefault)
    .describe('ページ'),
  perPage: zod
    .number()
    .min(1)
    .max(listAuditLogsQueryPerPageMax)
    .default(listAuditLogsQueryPerPageDefault)
    .describe('1ページあたりの件数'),
  sortBy: zod
    .string()
    .regex(listAuditLogsQuerySortByRegExp)
    .optional()
    .describe(
      'ソート対象のフィールドと順序。フィールドは createdAt のみ指定可能。',
    ),
  createdAtStart: zod.string().optional().describe('作成日時の起点'),
  createdAtEnd: zod.string().optional().describe('作成日時の終点'),
  userId: zod.uuid().optional().describe('ユーザーID'),
})

export const listAuditLogsResponseUserOneEmailMax = 254

export const listAuditLogsResponseUserOneCodeMax = 100

export const listAuditLogsResponseUserOneFirstNameMax = 255

export const listAuditLogsResponseUserOneLastNameMax = 255

export const listAuditLogsResponseUserOneFullNameMax = 255

export const listAuditLogsResponseUserOneEmployeeIdMax = 30

export const ListAuditLogsResponseItem = zod
  .object({
    id: zod.uuid().describe('UUID'),
    user: zod
      .union([
        zod
          .object({
            id: zod.uuid().describe('UUID'),
            email: zod
              .email()
              .max(listAuditLogsResponseUserOneEmailMax)
              .describe('メールアドレス'),
            code: zod
              .string()
              .max(listAuditLogsResponseUserOneCodeMax)
              .describe('コード'),
            firstName: zod
              .string()
              .max(listAuditLogsResponseUserOneFirstNameMax)
              .describe('名'),
            lastName: zod
              .string()
              .max(listAuditLogsResponseUserOneLastNameMax)
              .describe('姓'),
            fullName: zod
              .string()
              .max(listAuditLogsResponseUserOneFullNameMax)
              .describe('フルネーム'),
            employeeId: zod
              .string()
              .max(listAuditLogsResponseUserOneEmployeeIdMax)
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
            createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
            updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
            deactivatedAt: zod.iso
              .datetime({ offset: true })
              .nullish()
              .describe('削除日時'),
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
      .describe('操作ユーザー。システムによる操作の場合はnull。'),
    action: zod.string().describe('操作種別'),
    data: zod.looseObject({}).nullable().describe('操作データ'),
    remoteIp: zod.string().nullable().describe('リモートIPアドレス'),
    systemType: zod
      .union([zod.literal('automation'), zod.literal(null)])
      .nullable()
      .describe('システムによる操作種別'),
    createdAt: zod.iso.datetime({ offset: true }).describe('作成日時'),
    updatedAt: zod.iso.datetime({ offset: true }).describe('更新日時'),
  })
  .describe('監査ログ')
export const ListAuditLogsResponse = zod.array(ListAuditLogsResponseItem)
