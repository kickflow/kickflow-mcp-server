/**
 * エラーレスポンス
 */
export interface ErrorResponse {
  /** エラーコード */
  code: string
  /** エラーメッセージ */
  message: string
}

/**
 * 役職
 */
export interface Grade {
  /** UUID */
  id: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /**
   * レベル
   * @minimum 0
   * @maximum 255
   */
  level: number
  /**
   * コード
   * @maxLength 100
   * @nullable
   */
  code: string | null
  /** デフォルトの役職かどうか */
  isDefault: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * 役職を作成するときのrequest body
 */
export interface GradeCreateBody {
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /**
   * レベル
   * @minimum 0
   * @maximum 255
   */
  level: number
  /**
   * コード。未指定の場合、ランダムな英数字が自動的に設定されます。
   * @maxLength 100
   */
  code?: string
}

/**
 * 役職を更新するときのrequest body
 */
export interface GradeUpdateBody {
  /**
   * 名前
   * @maxLength 300
   */
  name?: string
  /**
   * レベル
   * @minimum 0
   * @maximum 255
   */
  level?: number
  /**
   * コード。未指定の場合、ランダムな英数字が自動的に設定されます。
   * @maxLength 100
   */
  code?: string
}

/**
 * ユーザー画像のURL。サイズごとに複数のURLを返します。
 */
export type UserImage = {
  /** @nullable */
  '100x100': string | null
  /** @nullable */
  '64x64': string | null
  /** @nullable */
  '32x32': string | null
}

/**
 * ステータス
 */
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

export const UserStatus = {
  invited: 'invited',
  activated: 'activated',
  suspended: 'suspended',
  deactivated: 'deactivated',
} as const

/**
 * ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。
 */
export type UserUserType = (typeof UserUserType)[keyof typeof UserUserType]

export const UserUserType = {
  normal: 'normal',
  assistant: 'assistant',
} as const

/**
 * ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。
 * @nullable
 */
export type UserCustomFieldsItemFieldType =
  | (typeof UserCustomFieldsItemFieldType)[keyof typeof UserCustomFieldsItemFieldType]
  | null

export const UserCustomFieldsItemFieldType = {
  text: 'text',
  textLong: 'textLong',
  number: 'number',
  integer: 'integer',
  checkbox: 'checkbox',
  pullDown: 'pullDown',
  date: 'date',
} as const

export type UserCustomFieldsItem = {
  /** UserCustomField#code（変換せずそのまま） */
  code: string
  /**
   * ユーザーカスタムフィールドの入力種別。定義が存在しない古い値の場合は null。
   * @nullable
   */
  fieldType: UserCustomFieldsItemFieldType
  /**
   * fieldType に応じた値。number / integer は新規に保存された値は文字列で返る
   * (旧仕様で保存された既存データは number で返ることがあるため、利用側は string / number の両方を受け付けて扱うこと)。
   */
  value: string | number | string[] | null
}

/**
 * ユーザー
 */
export interface User {
  /** UUID */
  id: string
  /**
   * メールアドレス
   * @maxLength 254
   */
  email: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名
   * @maxLength 255
   */
  firstName: string
  /**
   * 姓
   * @maxLength 255
   */
  lastName: string
  /**
   * フルネーム
   * @maxLength 255
   */
  fullName: string
  /**
   * 社員番号
   * @maxLength 30
   * @nullable
   */
  employeeId: string | null
  /** ユーザー画像のURL。サイズごとに複数のURLを返します。 */
  image: UserImage
  /** ステータス */
  status: UserStatus
  /** ロケール（jaまたはen） */
  locale: string
  /** ユーザータイプ。チームメンバー一覧APIのレスポンスには含まれません。 */
  userType?: UserUserType
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /**
   * 削除日時
   * @nullable
   */
  deactivatedAt?: string | null
  /**
   * 最終利用日（kickflowで最後に操作を行った日付。画面からの操作のほか、APIやチャット経由での操作も対象となります）。ユーザー管理権限を持つトークンで /v1/users 配下のユーザー情報を取得した場合に返却されます。
   * @nullable
   */
  lastUsedOn?: string | null
  /**
   * ユーザーカスタムフィールドの値の一覧。各要素は { code, value, fieldType }。
   * code は UserCustomField#code を変換せずそのまま持つ。
   * fieldType はユーザーカスタムフィールド定義の入力種別。定義が存在しない古い値の場合は null。
   * value は fieldType に応じた型 (string / number / string[] / null)。
   * number / integer の value は、新規に保存された値は文字列で返り、旧仕様で保存された既存データは number で返ることがある (利用側は string / number の両方を受け付けて扱うこと)。
   * 値がセットされているフィールドのみを含む。
   * エンタープライズ/トライアル契約テナントでのみ含まれる。
   * ユーザー一覧・ユーザー取得 (ユーザー管理権限が必要) および本人取得 (GET /v1/user) のレスポンスに含まれる。
   * ロールメンバー一覧のユーザーや、チケット等の他リソースにネストされたユーザーには含まれない。
   */
  customFields?: UserCustomFieldsItem[]
}

/**
 * LINE WORKSアカウント。連携していない場合はnull。
 */
export type UserDetailUserLineWorksAccount = {
  /** LINE WORKSアカウントID */
  lineWorksAccountId: string
} | null

/**
 * ユーザーの招待
 */
export interface UserInvitation {
  /** UUID */
  id: string
  /** 招待の有効期限 */
  expiresAt: string
  /**
   * 招待先のメールアドレス
   * @maxLength 254
   */
  userEmail: string
  /** 招待先の言語 */
  userLocale: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * ユーザー詳細
 */
export type UserDetail = User & {
  /** LINE WORKSアカウント。連携していない場合はnull。 */
  userLineWorksAccount: UserDetailUserLineWorksAccount
  /** 招待情報。招待情報が存在しない場合はnull。 */
  invitation: UserInvitation | null
}

/**
 * ステータス。visibleは有効、invisibleは無効、deletedは削除済み。
 */
export type WorkflowStatus =
  (typeof WorkflowStatus)[keyof typeof WorkflowStatus]

export const WorkflowStatus = {
  visible: 'visible',
  invisible: 'invisible',
  deleted: 'deleted',
} as const

/**
 * 申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。
 */
export type WorkflowVisibleToManager =
  (typeof WorkflowVisibleToManager)[keyof typeof WorkflowVisibleToManager]

export const WorkflowVisibleToManager = {
  none: 'none',
  direct: 'direct',
  all: 'all',
} as const

/**
 * タイトル入力モード
 */
export type WorkflowTitleInputMode =
  (typeof WorkflowTitleInputMode)[keyof typeof WorkflowTitleInputMode]

export const WorkflowTitleInputMode = {
  none: 'none',
  input: 'input',
  calculate: 'calculate',
} as const

/**
 * フォルダ
 */
export interface Folder {
  /** UUID */
  id: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /** フルネーム（ルートフォルダからのパス） */
  fullName: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 説明
   * @nullable
   */
  description: string | null
  /**
   * フォルダ内のワークフロー数
   * @minimum 0
   */
  workflowsCount: number
  /**
   * フォルダ内の経路数
   * @minimum 0
   */
  routesCount: number
  /**
   * フォルダ内のパイプライン数
   * @minimum 0
   */
  pipelinesCount: number
  /** 編集可能かどうか */
  editable: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * カテゴリ
 */
export interface Category {
  /** UUID */
  id: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名前
   * @maxLength 100
   */
  name: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

export type WorkflowReportFormatsItem =
  (typeof WorkflowReportFormatsItem)[keyof typeof WorkflowReportFormatsItem]

export const WorkflowReportFormatsItem = {
  pdf: 'pdf',
  excel: 'excel',
} as const

/**
 * ワークフロー
 */
export interface Workflow {
  /** UUID */
  id: string
  /**
   * コード
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string
  /** バージョンのUUID */
  versionId: string
  /** バージョン番号 */
  versionNumber: number
  /** 名前 */
  name: string
  /** 説明 */
  description: string
  /** ステータス。visibleは有効、invisibleは無効、deletedは削除済み。 */
  status: WorkflowStatus
  /** チケットがテナント全体に共有される場合true */
  publicTicket: boolean
  /** 申請者の上長を共有ユーザーに追加するか。noneは追加しない、directは直属の上長のみ、allはすべての上長を表す。 */
  visibleToManager: WorkflowVisibleToManager
  /** 申請チームのメンバーが共有ユーザーに追加される場合true */
  visibleToTeamMembers: boolean
  /**
   * タイトルの説明
   * @nullable
   */
  titleDescription: string | null
  /**
   * チケット番号のフォーマット
   * @nullable
   */
  ticketNumberFormat: string | null
  /** 承認者による上書きが可能な場合true */
  overwritable: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** タイトル入力モード */
  titleInputMode: WorkflowTitleInputMode
  /**
   * タイトルの計算式
   * @nullable
   */
  titleFormula: string | null
  /** 共有ユーザーの編集が可能な場合true */
  allowEditingOfViewers?: boolean
  /** 新規コメント投稿が許可されている場合 true。 false の場合、ワークフロー配下のすべてのチケットで新規コメント投稿が禁止される。 */
  commentingEnabled?: boolean
  /** 承認（回覧の確認を含む）時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは承認・確認できない。 */
  commentingRequiredOnApproval: boolean
  /** 差し戻し時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは差し戻しできない。 */
  commentingRequiredOnRejection: boolean
  /** 却下時のコメント投稿が必須の場合 true。 true の場合、コメントなしでは却下できない。 */
  commentingRequiredOnDenial: boolean
  /** 作成者 */
  author?: User | null
  /** バージョン作成者 */
  versionAuthor?: User | null
  /** フォルダ */
  folder?: Folder
  /** カテゴリの配列 */
  categories?: Category[]
  /** 全ユーザーが申請可能な場合true */
  availableToEveryone: boolean
  /** 帳票のフォーマット */
  reportFormats: WorkflowReportFormatsItem[]
  /** チケット検索のワークフローフィルタに表示しない場合true */
  hiddenOnWorkflowFilterForTicket: boolean
  /** ワークフロー選択画面に表示しない場合true */
  hiddenOnWorkflowSelectionScreen: boolean
  /** 承認の取り消しが可能な場合true */
  approvalCancellable: boolean
  /**
   * 帳票のファイル名フォーマット
   * @nullable
   */
  reportFileNameFormat: string | null
  /** 現在のバージョンの場合true */
  current: boolean
  /**
   * 管理用メモ
   * @nullable
   */
  notes: string | null
  /** バージョンの作成日時 */
  versionCreatedAt: string
  /** 外部公開時にメールアドレスを収集する場合true */
  collectEmailOnExternalPublish: boolean
  /** 外部ゲストに申請結果（完了/却下）を通知する場合true */
  notifyGuestOnCompletion: boolean
  /** カスタムステップの追加を許可する場合true */
  allowCustomSteps: boolean
}

/**
 * 代理申請
 */
export interface ProxyApplicant {
  /** UUID */
  id: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  user: User
  proxyUser: User
  /**
   * 開始日
   * @nullable
   */
  startsOn: string | null
  /**
   * 終了日
   * @nullable
   */
  endsOn: string | null
  /** 対象ワークフロー */
  workflows: Workflow[]
}

/**
 * 代理承認
 */
export interface ProxyApprover {
  /** UUID */
  id: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  user: User
  proxyUser: User
  /**
   * 開始日
   * @nullable
   */
  startsOn: string | null
  /**
   * 終了日
   * @nullable
   */
  endsOn: string | null
  /** 対象ワークフロー */
  workflows: Workflow[]
}

/**
 * チーム
 */
export interface Team {
  /** UUID */
  id: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /** 上位組織を含む名前 */
  fullName: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 管理用メモ
   * @maxLength 10000
   * @nullable
   */
  notes: string | null
  /** 承認専用チームかどうか */
  approveOnly: boolean
  /**
   * ユーザー数
   * @minimum 0
   */
  usersCount: number
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * チームの所属メンバー
 */
export type MemberUser = User & {
  /**
   * 役職
   * @minItems 1
   */
  grades: Grade[]
  /** 上長かどうか */
  leader: boolean
}

/**
 * チームの詳細
 */
export type TeamDetail = Team & {
  /** 親チーム */
  parent: Team | null
  /** 子チーム */
  children: Team[]
  /**
   * メンバーの配列。
   *
   * 注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。
   */
  users: MemberUser[]
}

/**
 * チームを作成するときのrequest body
 */
export interface TeamCreateBody {
  /** 名前 */
  name: string
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /**
   * 管理用メモ
   * @nullable
   */
  notes?: string | null
  /** 親チームのUUID。nullの場合、作成したチームはルートになります。 */
  parentId?: string
  /** 承認専用チームかどうか */
  approveOnly?: boolean
}

/**
 * チームを更新するときのrequest body
 */
export interface TeamUpdateBody {
  /** 名前 */
  name?: string
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 管理用メモ */
  notes?: string
  /** 親チームのID */
  parentId?: string
  /** 承認専用チームかどうか */
  approveOnly?: boolean
}

/**
 * 有効化の予定
 * @nullable
 */
export type OrganizationChartActivationPlan = {
  /** UUID */
  id: string
  /** 有効化の予定日 */
  dueOn: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
} | null

/**
 * 組織図
 */
export interface OrganizationChart {
  /** UUID */
  id: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /** 現在有効な組織図かどうか */
  current: boolean
  /** チーム数 */
  teamsCount: number
  /** 所属数 */
  membershipsCount: number
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /**
   * 有効化の予定
   * @nullable
   */
  activationPlan: OrganizationChartActivationPlan
}

/**
 * 組織図の詳細
 */
export type OrganizationChartDetail = OrganizationChart

/**
 * 組織図を作成・更新するときのrequest body
 */
export interface OrganizationChartBody {
  /** 名前 */
  name: string
}

/**
 * 管理者ロール
 */
export interface Role {
  /** UUID */
  id: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /** 編集可能かどうか。「すべての管理者」のときだけfalseになります。 */
  editable: boolean
  /**
   * この管理者ロールに所属するユーザー数
   * @minimum 0
   */
  usersCount: number
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * 権限タイプ
 */
export type RoleDetailPermissionListItemPermission =
  (typeof RoleDetailPermissionListItemPermission)[keyof typeof RoleDetailPermissionListItemPermission]

export const RoleDetailPermissionListItemPermission = {
  tenant: 'tenant',
  billing: 'billing',
  integration: 'integration',
  security: 'security',
  audit: 'audit',
  stats: 'stats',
  workflow: 'workflow',
  route: 'route',
  pipeline: 'pipeline',
  workflow_misc: 'workflow_misc',
  user: 'user',
  team: 'team',
  role: 'role',
  master: 'master',
  master_read: 'master_read',
  ticket_read: 'ticket_read',
  ticket_write: 'ticket_write',
  label: 'label',
  automation: 'automation',
} as const

/**
 * アイテム一覧のデフォルト並び順
 */
export type GeneralMasterDefaultSortBy =
  (typeof GeneralMasterDefaultSortBy)[keyof typeof GeneralMasterDefaultSortBy]

export const GeneralMasterDefaultSortBy = {
  name: 'name',
  code: 'code',
} as const

/**
 * フィールドの型
 */
export type GeneralMasterFieldFieldType =
  (typeof GeneralMasterFieldFieldType)[keyof typeof GeneralMasterFieldFieldType]

export const GeneralMasterFieldFieldType = {
  text: 'text',
  text_long: 'text_long',
  number: 'number',
  integer: 'integer',
  checkbox: 'checkbox',
  pull_down: 'pull_down',
  date: 'date',
} as const

/**
 * 汎用マスタのカスタムフィールド
 */
export interface GeneralMasterField {
  /** UUID */
  id: string
  /**
   * フィールド名
   * @maxLength 300
   */
  title: string
  /**
   * フィールドの説明
   * @maxLength 10000
   * @nullable
   */
  description: string | null
  /**
   * フィールドのコード
   * @maxLength 100
   */
  code: string
  /** フィールドの型 */
  fieldType: GeneralMasterFieldFieldType
  /** 必須項目かどうか */
  required: boolean
  /** フィールドの表示順 */
  fieldOrder: number
  /** 管理者以外も閲覧可能な場合true */
  visible: boolean
  /** 初期表示するか */
  initialDisplay: boolean
  /**
   * 選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。
   * @nullable
   */
  options: string[] | null
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * 汎用マスタ
 */
export interface GeneralMaster {
  /** UUID */
  id: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /**
   * 説明
   * @maxLength 10000
   * @nullable
   */
  description: string | null
  /** アイテム一覧のデフォルト並び順 */
  defaultSortBy: GeneralMasterDefaultSortBy
  /**
   * アイテム数
   * @minimum 0
   */
  itemsCount: number
  /** コードを初期表示するか */
  initialDisplayCode: boolean
  /** 作成日時を初期表示するか */
  initialDisplayCreatedAt: boolean
  /** 説明を初期表示するか */
  initialDisplayDescription: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** カスタムフィールドの配列 */
  fields: GeneralMasterField[]
}

export type RoleDetailPermissionListItem = {
  /** 権限タイプ */
  permission: RoleDetailPermissionListItemPermission
  /** 管理対象が制限されている場合true */
  restricted: boolean
  /** 管理対象のフォルダ */
  folders: Folder[]
  /** 管理対象の汎用マスタ */
  generalMasters: GeneralMaster[]
  /** 管理対象のチーム */
  teams: Team[]
}

/**
 * 管理者ロールの詳細
 */
export type RoleDetail = Role & {
  /** 権限のリスト */
  permissionList: RoleDetailPermissionListItem[]
}

/**
 * 権限タイプ
 */
export type RoleCreateBodyPermissionListItemPermission =
  (typeof RoleCreateBodyPermissionListItemPermission)[keyof typeof RoleCreateBodyPermissionListItemPermission]

export const RoleCreateBodyPermissionListItemPermission = {
  tenant: 'tenant',
  billing: 'billing',
  integration: 'integration',
  security: 'security',
  audit: 'audit',
  stats: 'stats',
  workflow: 'workflow',
  route: 'route',
  pipeline: 'pipeline',
  workflow_misc: 'workflow_misc',
  user: 'user',
  team: 'team',
  role: 'role',
  master: 'master',
  master_read: 'master_read',
  ticket_read: 'ticket_read',
  ticket_write: 'ticket_write',
  label: 'label',
  automation: 'automation',
} as const

export type RoleCreateBodyPermissionListItem = {
  /** 権限タイプ */
  permission: RoleCreateBodyPermissionListItemPermission
  /** 管理対象を制限する場合true */
  restricted: boolean
  /** 管理対象のフォルダID。同一IDの重複指定は不可（大文字小文字の表記違いも同一IDとして扱う）。 */
  folderIds?: string[]
  /** 管理対象の汎用マスタID。同一IDの重複指定は不可（大文字小文字の表記違いも同一IDとして扱う）。 */
  generalMasterIds?: string[]
  /** 管理対象のチームID。同一IDの重複指定は不可（大文字小文字の表記違いも同一IDとして扱う）。 */
  teamIds?: string[]
}

/**
 * 管理者ロールを作成するときのrequest body
 */
export interface RoleCreateBody {
  /** 名前 */
  name: string
  /** 権限リスト */
  permissionList: RoleCreateBodyPermissionListItem[]
}

/**
 * 権限タイプ
 */
export type RoleUpdateBodyPermissionListItemPermission =
  (typeof RoleUpdateBodyPermissionListItemPermission)[keyof typeof RoleUpdateBodyPermissionListItemPermission]

export const RoleUpdateBodyPermissionListItemPermission = {
  tenant: 'tenant',
  billing: 'billing',
  integration: 'integration',
  security: 'security',
  audit: 'audit',
  stats: 'stats',
  workflow: 'workflow',
  route: 'route',
  pipeline: 'pipeline',
  workflow_misc: 'workflow_misc',
  user: 'user',
  team: 'team',
  role: 'role',
  master: 'master',
  master_read: 'master_read',
  ticket_read: 'ticket_read',
  ticket_write: 'ticket_write',
  label: 'label',
  automation: 'automation',
} as const

export type RoleUpdateBodyPermissionListItem = {
  /** 権限タイプ */
  permission: RoleUpdateBodyPermissionListItemPermission
  /** 管理対象を制限する場合true */
  restricted: boolean
  /** 管理対象のフォルダID。同一IDの重複指定は不可（大文字小文字の表記違いも同一IDとして扱う）。 */
  folderIds?: string[]
  /** 管理対象の汎用マスタID。同一IDの重複指定は不可（大文字小文字の表記違いも同一IDとして扱う）。 */
  generalMasterIds?: string[]
  /** 管理対象のチームID。同一IDの重複指定は不可（大文字小文字の表記違いも同一IDとして扱う）。 */
  teamIds?: string[]
}

/**
 * 管理者ロールを更新するときのrequest body
 */
export interface RoleUpdateBody {
  /** 名前 */
  name?: string
  /** 権限リスト */
  permissionList?: RoleUpdateBodyPermissionListItem[]
}

/**
 * フォルダの詳細
 */
export type FolderDetail = Folder & {
  /** 親フォルダからルートフォルダまでの配列 */
  ancestors: Folder[]
  /** 子フォルダ */
  children: Folder[]
}

/**
 * 招待時に作成する所属
 */
export interface InviteMembershipBody {
  /** 所属先チームのコード */
  teamCode: string
  /** 役職コードの配列 */
  gradeCodes?: string[]
  /** 上長フラグ（デフォルト: false） */
  leader?: boolean
}

export type GeneralMasterItemInputsItem = {
  /** UUID */
  id: string
  /** 入力値 */
  value: string | null | string[]
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  field: GeneralMasterField
}

/**
 * 汎用マスタのアイテム
 */
export interface GeneralMasterItem {
  /** UUID */
  id: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名前
   * @maxLength 100
   */
  name: string
  /**
   * 説明
   * @nullable
   */
  description: string | null
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /**
   * 有効期限の開始日
   * @nullable
   */
  startsOn: string | null
  /**
   * 有効期限の終了日
   * @nullable
   */
  endsOn: string | null
  /** カスタムフィールドの入力の配列 */
  inputs: GeneralMasterItemInputsItem[]
}

/**
 * クラウドサイン連携設定
 */
export type WorkflowInTicketCloudSignSetting = {
  /** 書類の添付が必須な場合true */
  required: boolean
} | null

export type SectionListItemSectionType =
  (typeof SectionListItemSectionType)[keyof typeof SectionListItemSectionType]

export const SectionListItemSectionType = {
  form: 'form',
  slip: 'slip',
} as const

/**
 * フィールドの型
 */
export type FormFieldFieldType =
  (typeof FormFieldFieldType)[keyof typeof FormFieldFieldType]

export const FormFieldFieldType = {
  text: 'text',
  text_long: 'text_long',
  number: 'number',
  integer: 'integer',
  checkbox: 'checkbox',
  pull_down: 'pull_down',
  date: 'date',
  file: 'file',
  master: 'master',
  user: 'user',
  team: 'team',
  ticket: 'ticket',
  calculation: 'calculation',
  button_api: 'button_api',
  button_kintone: 'button_kintone',
  datetime: 'datetime',
} as const

/**
 * フォームサイズ。fullの場合全幅、halfの場合1/2になります。
 */
export type FormFieldSize = (typeof FormFieldSize)[keyof typeof FormFieldSize]

export const FormFieldSize = {
  full: 'full',
  half: 'half',
} as const

/**
 * チェックボックス等の選択肢の並び方向。
 * vertical=縦に並べる、horizontal=横に並べて折り返す。
 * 選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。
 */
export type FormFieldOrientation =
  (typeof FormFieldOrientation)[keyof typeof FormFieldOrientation]

export const FormFieldOrientation = {
  vertical: 'vertical',
  horizontal: 'horizontal',
} as const

export type FormFieldAllowedTicketStatusItem =
  (typeof FormFieldAllowedTicketStatusItem)[keyof typeof FormFieldAllowedTicketStatusItem]

export const FormFieldAllowedTicketStatusItem = {
  draft: 'draft',
  in_progress: 'in_progress',
  completed: 'completed',
  rejected: 'rejected',
  archived: 'archived',
  denied: 'denied',
} as const

/**
 * フォームフィールド
 */
export interface FormField {
  /** UUID */
  id: string
  /**
   * 説明
   * @maxLength 300
   */
  title: string
  /**
   * 説明
   * @nullable
   */
  description: string | null
  /** フィールドの型 */
  fieldType: FormFieldFieldType
  /** 必須項目かどうか */
  required: boolean
  /** 承認者が編集可能かどうか */
  approver: boolean
  /** 申請者が編集可能かどうか */
  author: boolean
  /**
   * 選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。
   * @nullable
   */
  options: string[] | null
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /** フォームサイズ。fullの場合全幅、halfの場合1/2になります。 */
  size: FormFieldSize
  /**
   * 正規表現フォーマット
   * @nullable
   */
  regexpFormat: string | null
  /**
   * 計算式。
   * 型がcalculationのときのみ値が入ります。
   * @nullable
   */
  formula: string | null
  /**
   * 初期値
   * @nullable
   */
  defaultValue: string | null
  /**
   * 最小値
   * @nullable
   */
  minValue: number | null
  /**
   * 最大値
   * @nullable
   */
  maxValue: number | null
  /**
   * 最小文字数
   * @minimum 0
   * @nullable
   */
  minLength: number | null
  /**
   * 最大文字数
   * @minimum 0
   * @nullable
   */
  maxLength: number | null
  /**
   * 小数の桁数
   * @minimum 0
   * @nullable
   */
  decimalDigit: number | null
  /**
   * カンマ区切りで表示する場合true。
   * 整数、数値、自動計算フィールド以外ではnullが入ります。
   * @nullable
   */
  delimited: boolean | null
  /**
   * 単位（接頭辞）
   * @nullable
   */
  prefix: string | null
  /**
   * 単位（接尾辞）
   * @nullable
   */
  suffix: string | null
  /**
   * 隠しフィールドである場合true
   * @nullable
   */
  hidden: boolean | null
  /**
   * trueの時、申請者・承認者が画面上から値を入力することを禁止します。
   * 外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。
   * @nullable
   */
  readonlyOnUi: boolean | null
  /** 複数選択を許可するかどうか */
  multiple: boolean
  /**
   * チェックボックス等の選択肢の並び方向。
   * vertical=縦に並べる、horizontal=横に並べて折り返す。
   * 選択肢を持たないフィールド型でも常に値が返されます（既定はvertical）。
   */
  orientation: FormFieldOrientation
  /**
   * 添付可能な拡張子リスト。fieldTypeがfileのときのみ値が入ります。
   * 古いフィールドではnullを返す場合があります。
   * @nullable
   */
  allowedExtensions: string[] | null
  /** チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか */
  autoLink: boolean
  /** 日付型フィールドで、当日の日付を初期値にするかどうか */
  useTodayForDefaultValue: boolean
  /** チケット型フィールドで、選択可能なチケットのステータス */
  allowedTicketStatus: FormFieldAllowedTicketStatusItem[]
}

/**
 * HTTPメソッド
 */
export type ExternalApiSettingHttpMethod =
  (typeof ExternalApiSettingHttpMethod)[keyof typeof ExternalApiSettingHttpMethod]

export const ExternalApiSettingHttpMethod = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
  patch: 'patch',
} as const

export type ExternalApiSettingHeadersItem = {
  /** ヘッダーのキー */
  key: string
  /** ヘッダーの値 */
  value: string
}

export type ExternalApiSettingMappingsItem = {
  formField: FormField
  /** 値抽出用のJSONPath */
  jsonPath: string
  /** 選択用テーブルで表示する場合true */
  displayInTable: boolean
  /**
   * 選択用テーブルでのタイトル
   * @nullable
   */
  title: string | null
}

/**
 * 外部API設定
 */
export interface ExternalApiSetting {
  /** UUID */
  id: string
  /** HTTPメソッド */
  httpMethod: ExternalApiSettingHttpMethod
  /** URL */
  url: string
  /**
   * リクエストボディ
   * @nullable
   */
  body: string | null
  /** リクエストヘッダー */
  headers: ExternalApiSettingHeadersItem[]
  /** レスポンスが複数レコードを含む場合true */
  responseArray: boolean
  /**
   * 複数レコードを含む場合の配列へのJSONPath
   * @nullable
   */
  arrayJsonPath: string | null
  /** フィールドへのマッピング設定 */
  mappings: ExternalApiSettingMappingsItem[]
}

/**
 * kintone連携
 */
export interface KintoneApp {
  /** UUID */
  id: string
  /** kintoneアプリ名 */
  name: string
  /** kintoneドメイン */
  domain: string
  /** kintoneアプリID */
  appId: string
  /**
   * コード
   * @nullable
   */
  code: string | null
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

export type KintoneAppSettingMappingsItem = {
  /** UUID */
  id: string
  /** 選択用テーブルで表示する場合true */
  displayInTable: boolean
  /** kintoneフィールドコード */
  kintoneFieldCode: string
  /** kintoneフィールドコード */
  kintoneFieldName: string
  /** kintoneフィールドコード */
  kintoneFieldType: string
  formField: FormField
}

/**
 * kintone連携設定
 */
export interface KintoneAppSetting {
  /** UUID */
  id: string
  formField: FormField
  kintoneApp: KintoneApp
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** フィールドへのマッピング設定 */
  mappings: KintoneAppSettingMappingsItem[]
}

export type ClimberCloudSettingMappingsItem = {
  formField: FormField
  /** 表示順（1から始まります） */
  order: number
}

/**
 * ClimberCloud連携設定
 */
export interface ClimberCloudSetting {
  /** UUID */
  id: string
  /** テナントID */
  tenantId: string
  /** ファイル付きリストID */
  contentsId: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  formField: FormField
  /** ClimberCloudのカラムとのマッピング設定 */
  mappings: ClimberCloudSettingMappingsItem[]
}

/**
 * 絞り込み先のフィールドのタイプ
 */
export type GeneralMasterSearchFilterFieldType =
  (typeof GeneralMasterSearchFilterFieldType)[keyof typeof GeneralMasterSearchFilterFieldType]

export const GeneralMasterSearchFilterFieldType = {
  free_word: 'free_word',
  name: 'name',
  code: 'code',
  description: 'description',
  custom_field: 'custom_field',
} as const

export interface GeneralMasterSearchFilter {
  /** UUID */
  id: string
  /** 絞り込みに使う汎用フィールドのID（UUID） */
  filterFormFieldId: string
  /** 絞り込み先のフィールドのタイプ */
  fieldType: GeneralMasterSearchFilterFieldType
  /**
   * fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID）
   * @nullable
   */
  generalMasterFieldId: string | null
}

/**
 * フォームフィールドの承認者による入力制限
 */
export interface FormFieldApproverEditRestriction {
  /** 入力を必須にする経路ステップのコードの配列 */
  routeStepCodes: string[]
}

/**
 * 編集を許可する範囲。
 * all=すべての承認者、user=指定したユーザー、team_grade=指定したチーム・役職。
 */
export type FormFieldApproverEditSettingPermissionType =
  (typeof FormFieldApproverEditSettingPermissionType)[keyof typeof FormFieldApproverEditSettingPermissionType]

export const FormFieldApproverEditSettingPermissionType = {
  all: 'all',
  user: 'user',
  team_grade: 'team_grade',
} as const

/**
 * 役職の比較条件。permissionTypeがteam_gradeで役職を指定した場合のみ値が入ります。
 * @nullable
 */
export type FormFieldApproverEditSettingGradeSymbol =
  | (typeof FormFieldApproverEditSettingGradeSymbol)[keyof typeof FormFieldApproverEditSettingGradeSymbol]
  | null

export const FormFieldApproverEditSettingGradeSymbol = {
  equal: 'equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
} as const

/**
 * フォームフィールドを編集できる承認者の設定
 */
export interface FormFieldApproverEditSetting {
  /**
   * 編集を許可する範囲。
   * all=すべての承認者、user=指定したユーザー、team_grade=指定したチーム・役職。
   */
  permissionType: FormFieldApproverEditSettingPermissionType
  /** 下位のチームを含めるかどうか */
  descendants: boolean
  /**
   * 役職の比較条件。permissionTypeがteam_gradeで役職を指定した場合のみ値が入ります。
   * @nullable
   */
  gradeSymbol: FormFieldApproverEditSettingGradeSymbol
  /** 役職。permissionTypeがteam_gradeのときのみ値が入ります。 */
  grade: Grade | null
  /** チーム。permissionTypeがteam_gradeのときのみ値が入ります。 */
  team: Team | null
  /** ユーザーの配列。permissionTypeがuserのときのみ要素が入ります。 */
  users: User[]
}

/**
 * 条件の組み合わせ方。all=すべての条件を満たす、any=いずれかの条件を満たす。
 */
export type FormCustomValidationCombinationType =
  (typeof FormCustomValidationCombinationType)[keyof typeof FormCustomValidationCombinationType]

export const FormCustomValidationCombinationType = {
  all: 'all',
  any: 'any',
} as const

/**
 * 比較条件
 */
export type FormCustomValidationFieldSymbol =
  (typeof FormCustomValidationFieldSymbol)[keyof typeof FormCustomValidationFieldSymbol]

export const FormCustomValidationFieldSymbol = {
  equal: 'equal',
  not_equal: 'not_equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  include: 'include',
  exclude: 'exclude',
  is_empty: 'is_empty',
  is_not_empty: 'is_not_empty',
  descendants_or_equal: 'descendants_or_equal',
} as const

/**
 * カスタムバリデーションの条件で比較する汎用マスタアイテム。
 * カスタムバリデーションのレスポンスではカスタムフィールドの入力の配列（inputs）を返さないため、
 * 汎用マスタAPIが返す GeneralMasterItem とは別のコンポーネントとして定義している。
 */
export interface CustomValidationGeneralMasterItem {
  /** UUID */
  id: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名前
   * @maxLength 100
   */
  name: string
  /**
   * 説明
   * @nullable
   */
  description: string | null
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /**
   * 有効期限の開始日
   * @nullable
   */
  startsOn: string | null
  /**
   * 有効期限の終了日
   * @nullable
   */
  endsOn: string | null
}

/**
 * フォームフィールドのカスタムバリデーションの条件
 */
export interface FormCustomValidationField {
  /** UUID */
  id: string
  /** 比較条件 */
  symbol: FormCustomValidationFieldSymbol
  /**
   * 比較する値
   * @nullable
   */
  value: string | null
  /** 条件の対象となるフォームフィールド */
  formField: FormField
  /** 比較する汎用マスタアイテム。対象が汎用マスタ型フィールドのときのみ値が入ります。 */
  generalMasterItem: CustomValidationGeneralMasterItem | null
  /** 比較する役職 */
  grade: Grade | null
  /** 比較するチーム */
  team: Team | null
}

/**
 * フォームフィールドのカスタムバリデーション
 */
export interface FormCustomValidation {
  /** UUID */
  id: string
  /** 条件の組み合わせ方。all=すべての条件を満たす、any=いずれかの条件を満たす。 */
  combinationType: FormCustomValidationCombinationType
  /** 条件を満たさない場合に表示するエラーメッセージ */
  errorMessage: string
  /** 条件の配列。表示順の昇順で格納されます。 */
  fields: FormCustomValidationField[]
}

/**
 * 転記元の種別。ticket_title=チケットのタイトル、ticket_number=チケット番号、form_field=フォームフィールド。
 */
export type FormFieldTicketCopySettingMappingsItemFieldType =
  (typeof FormFieldTicketCopySettingMappingsItemFieldType)[keyof typeof FormFieldTicketCopySettingMappingsItemFieldType]

export const FormFieldTicketCopySettingMappingsItemFieldType = {
  ticket_title: 'ticket_title',
  ticket_number: 'ticket_number',
  form_field: 'form_field',
} as const

export type FormFieldTicketCopySettingMappingsItem = {
  /** 転記元の種別。ticket_title=チケットのタイトル、ticket_number=チケット番号、form_field=フォームフィールド。 */
  fieldType: FormFieldTicketCopySettingMappingsItemFieldType
  /**
   * 転記元のフォームフィールドのコード。fieldTypeがform_fieldのときのみ値が入ります。
   * @nullable
   */
  fieldCode: string | null
  /**
   * 転記先のフォームフィールドのコード
   * @nullable
   */
  targetFieldCode: string | null
}

/**
 * チケット型フィールドで、選択したチケットの値を転記する設定
 */
export interface FormFieldTicketCopySetting {
  /** 転記元のワークフロー */
  workflow: Workflow | null
  /** 転記する項目の配列。表示順の昇順で格納されます。 */
  mappings: FormFieldTicketCopySettingMappingsItem[]
}

/**
 * フォームフィールドの詳細
 */
export type FormFieldDetail = FormField & {
  /** 汎用マスタ（汎用マスタフィールドの場合） */
  generalMaster: GeneralMaster | null
  /** 初期値（汎用マスタフィールドの場合） */
  defaultGeneralMasterItem: GeneralMasterItem | null
  /** 外部API設定。fieldTypeがbutton_apiのときのみ値が入ります。 */
  externalApiSetting: ExternalApiSetting | null
  /** 外部API設定。fieldTypeがbutton_kintoneのときのみ値が入ります。 */
  kintoneAppSetting: KintoneAppSetting | null
  /** ClimberCloud連携設定。fieldTypeがfileのときのみ値が入ります。 */
  climberCloudSetting?: ClimberCloudSetting | null
  /**
   * 汎用マスタ型フィールドの自動絞り込みの設定
   * @nullable
   */
  generalMasterSearchFilters: GeneralMasterSearchFilter[] | null
  /** 承認者による入力制限。設定していない場合はnullになります。 */
  approverEditRestriction: FormFieldApproverEditRestriction | null
  /** 編集できる承認者の設定。設定していない場合はpermissionType=allが入ります。 */
  approverEditSetting?: FormFieldApproverEditSetting
  /** カスタムバリデーション */
  customValidations: FormCustomValidation[]
  /** チケット型フィールドの転記設定。設定していない場合はnullになります。 */
  ticketCopySetting: FormFieldTicketCopySetting | null
  /**
   * チケット型フィールドで選択可能なワークフロー。
   * 各要素にはauthor / versionAuthor / folder / categoriesは含まれません。
   */
  selectableTicketWorkflows: Workflow[]
}

/**
 * 条件の組み合わせタイプ。all=すべて、any=いずれか、custom=高度な条件式。明細セクションには含まれません。
 */
export type SectionListItemCombinationType =
  (typeof SectionListItemCombinationType)[keyof typeof SectionListItemCombinationType]

export const SectionListItemCombinationType = {
  all: 'all',
  any: 'any',
  custom: 'custom',
} as const

/**
 * 演算子
 */
export type SectionConditionFieldSymbol =
  (typeof SectionConditionFieldSymbol)[keyof typeof SectionConditionFieldSymbol]

export const SectionConditionFieldSymbol = {
  equal: 'equal',
  not_equal: 'not_equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  include: 'include',
  exclude: 'exclude',
  is_empty: 'is_empty',
  is_not_empty: 'is_not_empty',
  descendants_or_equal: 'descendants_or_equal',
} as const

/**
 * フォームセクションの表示条件
 */
export interface SectionConditionField {
  /** UUID */
  id: string
  /** 演算子 */
  symbol: SectionConditionFieldSymbol
  /**
   * しきい値
   * @nullable
   */
  value: string | null
  /** 条件対象のフォームフィールド */
  formField: FormField | null
  /** しきい値として使う役職 */
  grade: Grade | null
  /** しきい値として使うチーム */
  team: Team | null
  /** しきい値として使う汎用マスタアイテム */
  generalMasterItem: GeneralMasterItem | null
}

/**
 * フィールドの型
 */
export type SlipFieldFieldType =
  (typeof SlipFieldFieldType)[keyof typeof SlipFieldFieldType]

export const SlipFieldFieldType = {
  text: 'text',
  number: 'number',
  integer: 'integer',
  calculation: 'calculation',
  pull_down: 'pull_down',
  checkbox: 'checkbox',
  date: 'date',
  file: 'file',
  master: 'master',
  user: 'user',
  team: 'team',
  ticket: 'ticket',
  datetime: 'datetime',
} as const

export type SlipFieldAllowedTicketStatusItem =
  (typeof SlipFieldAllowedTicketStatusItem)[keyof typeof SlipFieldAllowedTicketStatusItem]

export const SlipFieldAllowedTicketStatusItem = {
  draft: 'draft',
  in_progress: 'in_progress',
  completed: 'completed',
  rejected: 'rejected',
  archived: 'archived',
  denied: 'denied',
} as const

/**
 * 明細フィールド
 */
export interface SlipField {
  /** UUID */
  id: string
  /** フィールドの型 */
  fieldType: SlipFieldFieldType
  /** フィールドのコード */
  code: string
  /** タイトル */
  title: string
  /** 入力必須の場合true */
  required: boolean
  /** 列の合計を表示する場合true */
  showTotal: boolean
  /** 選択肢。プルダウンまたはチェックボックスのときのみ値が入ります。 */
  options: string[]
  /**
   * 正規表現フォーマット
   * @nullable
   */
  regexpFormat: string | null
  /**
   * 計算式。型が自動計算のときのみ値が入ります。
   * @nullable
   */
  formula: string | null
  /**
   * 最大値
   * @nullable
   */
  maxValue: number | null
  /**
   * 最小値
   * @nullable
   */
  minValue: number | null
  /**
   * 初期値
   * @nullable
   */
  defaultValue: string | null
  /**
   * 小数の桁数
   * @nullable
   */
  decimalDigit: number | null
  /**
   * カンマ区切りで表示する場合true。
   * 整数、数値、自動計算フィールド以外ではnullが入ります。
   * @nullable
   */
  delimited: boolean | null
  /** 添付可能な拡張子リスト */
  allowedExtensions: string[]
  /**
   * 単位（接頭辞）
   * @nullable
   */
  prefix: string | null
  /**
   * 単位（接尾辞）
   * @nullable
   */
  suffix: string | null
  /** 承認者が編集可能かどうか */
  approver: boolean
  /** 申請者が編集可能かどうか */
  author: boolean
  /**
   * 隠しフィールドである場合true
   * @nullable
   */
  hidden: boolean | null
  /**
   * trueの時、申請者・承認者が画面上から値を入力することを禁止します。
   * 外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。
   * @nullable
   */
  readonlyOnUi: boolean | null
  /**
   * 最小文字数
   * @minimum 0
   * @nullable
   */
  minLength: number | null
  /**
   * 最大文字数
   * @minimum 0
   * @nullable
   */
  maxLength: number | null
  /** 複数選択を許可するかどうか */
  multiple: boolean
  /** チケット型フィールドで、選択したチケットを自動的に関連チケットにするかどうか */
  autoLink: boolean
  /** 日付型フィールドで、当日の日付を初期値にするかどうか */
  useTodayForDefaultValue: boolean
  /** チケット型フィールドで、選択可能なチケットのステータス */
  allowedTicketStatus: SlipFieldAllowedTicketStatusItem[]
}

/**
 * 絞り込み先のフィールドのタイプ
 */
export type SlipFieldGeneralMasterSearchFilterFieldType =
  (typeof SlipFieldGeneralMasterSearchFilterFieldType)[keyof typeof SlipFieldGeneralMasterSearchFilterFieldType]

export const SlipFieldGeneralMasterSearchFilterFieldType = {
  free_word: 'free_word',
  name: 'name',
  code: 'code',
  description: 'description',
  custom_field: 'custom_field',
} as const

/**
 * 明細フィールドの汎用マスタの自動絞り込みの設定
 */
export interface SlipFieldGeneralMasterSearchFilter {
  /** UUID */
  id: string
  /** 絞り込みに使う明細フィールドのID（UUID） */
  filterSlipFieldId: string
  /** 絞り込み先のフィールドのタイプ */
  fieldType: SlipFieldGeneralMasterSearchFilterFieldType
  /**
   * fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID）
   * @nullable
   */
  generalMasterFieldId: string | null
}

/**
 * 明細フィールドの承認者による入力制限
 */
export interface SlipFieldApproverEditRestriction {
  /** 入力を必須にする経路ステップのコードの配列 */
  routeStepCodes: string[]
}

/**
 * 編集を許可する範囲。
 * all=すべての承認者、user=指定したユーザー、team_grade=指定したチーム・役職。
 */
export type SlipFieldApproverEditSettingPermissionType =
  (typeof SlipFieldApproverEditSettingPermissionType)[keyof typeof SlipFieldApproverEditSettingPermissionType]

export const SlipFieldApproverEditSettingPermissionType = {
  all: 'all',
  user: 'user',
  team_grade: 'team_grade',
} as const

/**
 * 役職の比較条件。permissionTypeがteam_gradeで役職を指定した場合のみ値が入ります。
 * @nullable
 */
export type SlipFieldApproverEditSettingGradeSymbol =
  | (typeof SlipFieldApproverEditSettingGradeSymbol)[keyof typeof SlipFieldApproverEditSettingGradeSymbol]
  | null

export const SlipFieldApproverEditSettingGradeSymbol = {
  equal: 'equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
} as const

/**
 * 明細フィールドを編集できる承認者の設定
 */
export interface SlipFieldApproverEditSetting {
  /**
   * 編集を許可する範囲。
   * all=すべての承認者、user=指定したユーザー、team_grade=指定したチーム・役職。
   */
  permissionType: SlipFieldApproverEditSettingPermissionType
  /** 下位のチームを含めるかどうか */
  descendants: boolean
  /**
   * 役職の比較条件。permissionTypeがteam_gradeで役職を指定した場合のみ値が入ります。
   * @nullable
   */
  gradeSymbol: SlipFieldApproverEditSettingGradeSymbol
  /** 役職。permissionTypeがteam_gradeのときのみ値が入ります。 */
  grade: Grade | null
  /** チーム。permissionTypeがteam_gradeのときのみ値が入ります。 */
  team: Team | null
  /** ユーザーの配列。permissionTypeがuserのときのみ要素が入ります。 */
  users: User[]
}

/**
 * 条件の組み合わせ方。all=すべての条件を満たす、any=いずれかの条件を満たす。
 */
export type SlipCustomValidationCombinationType =
  (typeof SlipCustomValidationCombinationType)[keyof typeof SlipCustomValidationCombinationType]

export const SlipCustomValidationCombinationType = {
  all: 'all',
  any: 'any',
} as const

/**
 * 比較条件
 */
export type SlipCustomValidationFieldSymbol =
  (typeof SlipCustomValidationFieldSymbol)[keyof typeof SlipCustomValidationFieldSymbol]

export const SlipCustomValidationFieldSymbol = {
  equal: 'equal',
  not_equal: 'not_equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  include: 'include',
  exclude: 'exclude',
  is_empty: 'is_empty',
  is_not_empty: 'is_not_empty',
  descendants_or_equal: 'descendants_or_equal',
} as const

/**
 * 明細フィールドのカスタムバリデーションの条件
 */
export interface SlipCustomValidationField {
  /** UUID */
  id: string
  /** 比較条件 */
  symbol: SlipCustomValidationFieldSymbol
  /**
   * 比較する値
   * @nullable
   */
  value: string | null
  /** 条件の対象となる明細フィールド */
  slipField: SlipField
  /** 比較する汎用マスタアイテム。対象が汎用マスタ型フィールドのときのみ値が入ります。 */
  generalMasterItem: CustomValidationGeneralMasterItem | null
  /** 比較する役職 */
  grade: Grade | null
  /** 比較するチーム */
  team: Team | null
}

/**
 * 明細フィールドのカスタムバリデーション
 */
export interface SlipCustomValidation {
  /** UUID */
  id: string
  /** 条件の組み合わせ方。all=すべての条件を満たす、any=いずれかの条件を満たす。 */
  combinationType: SlipCustomValidationCombinationType
  /** 条件を満たさない場合に表示するエラーメッセージ */
  errorMessage: string
  /** 条件の配列。表示順の昇順で格納されます。 */
  fields: SlipCustomValidationField[]
}

/**
 * 明細フィールドの詳細
 */
export type SlipFieldDetail = SlipField & {
  /** 汎用マスタ。型が汎用マスタのときのみ値が入ります。 */
  generalMaster: GeneralMaster | null
  /** 汎用マスタアイテムの初期値 */
  defaultGeneralMasterItem: GeneralMasterItem | null
  /** 汎用マスタ型フィールドの自動絞り込みの設定。表示順の昇順で格納されます。 */
  generalMasterSearchFilters: SlipFieldGeneralMasterSearchFilter[]
  /** 承認者による入力制限。設定していない場合はnullになります。 */
  approverEditRestriction: SlipFieldApproverEditRestriction | null
  /** 編集できる承認者の設定。設定していない場合はpermissionType=allが入ります。 */
  approverEditSetting?: SlipFieldApproverEditSetting
  /** カスタムバリデーション */
  customValidations: SlipCustomValidation[]
  /**
   * チケット型フィールドで選択可能なワークフロー。
   * 各要素にはauthor / versionAuthor / folder / categoriesは含まれません。
   */
  selectableTicketWorkflows: Workflow[]
}

/**
 * フォームセクションの閲覧を許可する対象
 */
export interface SectionViewer {
  /** UUID */
  id: string
  /** 下位のチームを含めるかどうか */
  descendants: boolean
  /** ユーザー。ユーザーとチームは片方のみ値が入ります。 */
  user: User | null
  /** チーム。ユーザーとチームは片方のみ値が入ります。 */
  team: Team | null
  /** 役職。チーム指定で役職も指定する場合のみ値が入ります。 */
  grade: Grade | null
}

/**
 * 明細セクションまたはフォームセクション
 */
export interface SectionListItem {
  sectionType: SectionListItemSectionType
  /**
   * タイトル
   * @nullable
   */
  title: string | null
  /**
   * 説明
   * @nullable
   */
  description: string | null
  /** セクションのID（UUID） */
  id: string
  /** 明細セクションのコード。フォームセクションには含まれません。 */
  code?: string
  /** フォームフィールド。明細セクションには含まれません。 */
  formFields?: FormFieldDetail[]
  /** 表示条件があるかどうか。明細セクションには含まれません。 */
  conditional?: boolean
  /** 条件の組み合わせタイプ。all=すべて、any=いずれか、custom=高度な条件式。明細セクションには含まれません。 */
  combinationType?: SectionListItemCombinationType
  /**
   * 高度な条件式
   * @nullable
   */
  combinationExpression?: string | null
  /** フォームセクションの表示条件。明細セクションには含まれません。 */
  conditionFields?: SectionConditionField[]
  /** 明細フィールド。フォームセクションには含まれません。 */
  slipFields?: SlipFieldDetail[]
  /** 承認者が当該明細セクションに行を追加できるか。明細セクションのみに含まれます。 */
  allowApproverToAddItems?: boolean
  /** 閲覧できる対象を制限する場合true。明細セクションには含まれません。 */
  viewRestriction?: boolean
  /** viewRestrictionがtrueのとき、申請者の閲覧を許可する場合true。明細セクションには含まれません。 */
  allowViewAuthor?: boolean
  /** viewRestrictionがtrueのとき、承認者の閲覧を許可する場合true。明細セクションには含まれません。 */
  allowViewApprover?: boolean
  /** 閲覧を許可する対象。明細セクションには含まれません。 */
  sectionViewers?: SectionViewer[]
}

/**
 * ワークフロー単位で設定された共有ユーザー
 */
export interface WorkflowTicketViewer {
  /** UUID */
  id: string
  /** ユーザー。ユーザーとチームは片方のみ値が入ります。 */
  user: User | null
  /** チーム。ユーザーとチームは片方のみ値が入ります。 */
  team: Team | null
  /** 役職。チーム指定で役職も指定する場合のみ値が入ります。 */
  grade: Grade | null
  /** 下位のチームを含めるかどうか */
  descendants: boolean
}

/**
 * ワークフローの外部公開設定
 */
export interface WorkflowExternalPublish {
  /** UUID */
  id: string
  /** 外部公開URLに含まれるハッシュ値 */
  externalPublishHash: string
}

/**
 * 採番グループ
 */
export interface TicketNumberKey {
  /** UUID */
  id: string
  /** コード */
  code: string
  /** 名前 */
  name: string
  /**
   * 説明
   * @nullable
   */
  notes: string | null
  /** デフォルトの採番グループの場合true */
  default: boolean
}

/**
 * 出力を許可するチケットのステータス
 */
export type ExcelTemplateAllowedTicketStatusTicketStatus =
  (typeof ExcelTemplateAllowedTicketStatusTicketStatus)[keyof typeof ExcelTemplateAllowedTicketStatusTicketStatus]

export const ExcelTemplateAllowedTicketStatusTicketStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
  completed: 'completed',
  archived: 'archived',
  rejected: 'rejected',
  denied: 'denied',
  permanently_deleted: 'permanently_deleted',
} as const

/**
 * サブステータス
 */
export interface SubStatus {
  /** UUID */
  id: string
  /** コード */
  code: string
  /** 名前 */
  name: string
  /**
   * 説明
   * @nullable
   */
  notes: string | null
  /** 取り下げを許可する */
  allowWithdrawal: boolean
  /** 差し戻しを許可する */
  allowRejection: boolean
  /** 却下を許可する */
  allowDenial: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * Excel帳票テンプレートの出力を許可するチケットステータス
 */
export interface ExcelTemplateAllowedTicketStatus {
  /** UUID */
  id: string
  /** 出力を許可するチケットのステータス */
  ticketStatus: ExcelTemplateAllowedTicketStatusTicketStatus
  /** 出力を許可するサブステータスの配列 */
  subStatuses: SubStatus[]
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * Excel帳票テンプレート
 */
export interface ExcelTemplate {
  /** UUID */
  id: string
  /** テンプレートファイルのダウンロードURL */
  url: string
  /** 出力できるチケットのステータスを制限する場合true */
  restrictedExport: boolean
  /** 出力を許可するチケットステータスの配列 */
  allowedTicketStatuses: ExcelTemplateAllowedTicketStatus[]
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * カスタム採番
 */
export interface CustomNumbering {
  /** UUID */
  id: string
  /** カスタム採番のコード */
  code: string
  /** カスタム採番の名前 */
  name: string
  /** 次に採番される番号 */
  value: number
  /**
   * 採番グループ（チケット番号キー）のID。採番グループを使用しない場合はnullになります。
   * @nullable
   */
  ticketNumberKeyId: string | null
}

/**
 * 採番するタイミング。createdはチケット作成時、openedは申請時、completedは完了時、sub_status_attachedはサブステータス付与時を表す。
 */
export type CustomNumberingSettingTimingType =
  (typeof CustomNumberingSettingTimingType)[keyof typeof CustomNumberingSettingTimingType]

export const CustomNumberingSettingTimingType = {
  created: 'created',
  opened: 'opened',
  completed: 'completed',
  sub_status_attached: 'sub_status_attached',
} as const

/**
 * ワークフローバージョンごとのカスタム採番の設定
 */
export interface CustomNumberingSetting {
  /** UUID */
  id: string
  /** カスタム採番のUUID */
  customNumberingId: string
  /**
   * 採番のフォーマット。未設定の場合はnullになります。
   * @nullable
   */
  ticketNumberFormat: string | null
  /** 採番するタイミング。createdはチケット作成時、openedは申請時、completedは完了時、sub_status_attachedはサブステータス付与時を表す。 */
  timingType: CustomNumberingSettingTimingType
  /**
   * 採番するサブステータスのUUID。timingTypeがsub_status_attached以外の場合はnullになります。
   * @nullable
   */
  subStatusId: string | null
  /** 採番するサブステータス。timingTypeがsub_status_attached以外の場合はnullになります。 */
  subStatus: SubStatus | null
  /** 表示順 */
  sortOrder: number
}

/**
 * チケットに含まれるワークフロー。セクション情報と共有ユーザー情報を含みます。
 */
export type WorkflowInTicket = Workflow & {
  /** セクション・明細を表すオブジェクトを画面に表示される順に格納した配列。 */
  sectionList: SectionListItem[]
  /** ワークフロー単位のチケット共有ユーザー */
  ticketViewers: WorkflowTicketViewer[]
  /** クラウドサイン連携設定 */
  cloudSignSetting: WorkflowInTicketCloudSignSetting
  /**
   * 次に採番されるチケット番号の連番値。採番されたことがない場合はnullになります。
   * @nullable
   */
  nextTicketNumberValue: number | null
  /**
   * 採番グループ側で次に採番される連番値。採番グループが未設定の場合はnullになります。
   * @nullable
   */
  nextTicketNumberValueByKey: number | null
  /** 外部公開設定。外部公開していない場合はnullになります。 */
  externalPublish: WorkflowExternalPublish | null
  /** 採番グループ。未設定の場合はnullになります。 */
  ticketNumberKey: TicketNumberKey | null
  /** Excel帳票テンプレート。未設定の場合はnullになります。 */
  excelTemplate: ExcelTemplate | null
  /** カスタム採番の配列。コードの昇順で格納されます。 */
  customNumberings: CustomNumbering[]
  /** カスタム採番の設定の配列。表示順の昇順で格納されます。 */
  customNumberingSettings: CustomNumberingSetting[]
} & Required<
    Pick<
      Workflow & {
        /** セクション・明細を表すオブジェクトを画面に表示される順に格納した配列。 */
        sectionList: SectionListItem[]
        /** ワークフロー単位のチケット共有ユーザー */
        ticketViewers: WorkflowTicketViewer[]
        /** クラウドサイン連携設定 */
        cloudSignSetting: WorkflowInTicketCloudSignSetting
        /**
         * 次に採番されるチケット番号の連番値。採番されたことがない場合はnullになります。
         * @nullable
         */
        nextTicketNumberValue: number | null
        /**
         * 採番グループ側で次に採番される連番値。採番グループが未設定の場合はnullになります。
         * @nullable
         */
        nextTicketNumberValueByKey: number | null
        /** 外部公開設定。外部公開していない場合はnullになります。 */
        externalPublish: WorkflowExternalPublish | null
        /** 採番グループ。未設定の場合はnullになります。 */
        ticketNumberKey: TicketNumberKey | null
        /** Excel帳票テンプレート。未設定の場合はnullになります。 */
        excelTemplate: ExcelTemplate | null
        /** カスタム採番の配列。コードの昇順で格納されます。 */
        customNumberings: CustomNumbering[]
        /** カスタム採番の設定の配列。表示順の昇順で格納されます。 */
        customNumberingSettings: CustomNumberingSetting[]
      },
      | 'author'
      | 'versionAuthor'
      | 'folder'
      | 'categories'
      | 'allowEditingOfViewers'
      | 'commentingEnabled'
    >
  >

/**
 * 経路分岐タイプ
 */
export type WorkflowRouteConditionConditionType =
  (typeof WorkflowRouteConditionConditionType)[keyof typeof WorkflowRouteConditionConditionType]

export const WorkflowRouteConditionConditionType = {
  always: 'always',
  field: 'field',
  field_otherwise: 'field_otherwise',
} as const

/**
 * 条件の組み合わせタイプ
 */
export type WorkflowRouteConditionCombinationType =
  (typeof WorkflowRouteConditionCombinationType)[keyof typeof WorkflowRouteConditionCombinationType]

export const WorkflowRouteConditionCombinationType = {
  all: 'all',
  any: 'any',
  custom: 'custom',
} as const

/**
 * ステータス
 */
export type RouteStatus = (typeof RouteStatus)[keyof typeof RouteStatus]

export const RouteStatus = {
  visible: 'visible',
  deleted: 'deleted',
  error: 'error',
} as const

/**
 * 経路
 */
export interface Route {
  /** UUID */
  id: string
  /** コード */
  code: string
  /** ステータス */
  status: RouteStatus
  /** バージョンのID */
  versionId: string
  /** バージョン番号 */
  versionNumber: number
  /** 名前 */
  name: string
  /** 説明 */
  description: string
  /**
   * 管理用メモ
   * @nullable
   */
  notes: string | null
  /** 現在のバージョンかどうか */
  current: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** バージョンの作成日時 */
  versionCreatedAt: string
  /** 作成者 */
  author: User | null
  versionAuthor?: User | null
  /** フォルダ */
  folder: Folder
}

/**
 * 演算子
 */
export type WorkflowRouteConditionFieldSymbol =
  (typeof WorkflowRouteConditionFieldSymbol)[keyof typeof WorkflowRouteConditionFieldSymbol]

export const WorkflowRouteConditionFieldSymbol = {
  equal: 'equal',
  not_equal: 'not_equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  include: 'include',
  exclude: 'exclude',
  is_empty: 'is_empty',
  is_not_empty: 'is_not_empty',
  descendants_or_equal: 'descendants_or_equal',
} as const

/**
 * ワークフロー経路分岐の条件
 */
export interface WorkflowRouteConditionField {
  /** UUID */
  id: string
  /** 演算子 */
  symbol: WorkflowRouteConditionFieldSymbol
  /**
   * しきい値
   * @nullable
   */
  value: string | null
  /** 対象のフォームフィールド */
  formField: FormField
  /** しきい値として使う役職 */
  grade: Grade | null
  /** しきい値として使うチーム */
  team: Team | null
  /** しきい値として使う汎用マスタアイテム */
  generalMasterItem: GeneralMasterItem | null
}

/**
 * ワークフローの経路分岐
 */
export interface WorkflowRouteCondition {
  /** UUID */
  id: string
  /** 経路分岐タイプ */
  conditionType: WorkflowRouteConditionConditionType
  /** 条件の組み合わせタイプ */
  combinationType: WorkflowRouteConditionCombinationType
  /** 高度な条件式 */
  combinationExpression: string
  /** 経路。routeまたはerrorMessageは片方のみ値が入ります。 */
  route: Route | null
  /** 条件 */
  conditionFields: WorkflowRouteConditionField[]
  /**
   * 申請拒否時のエラーメッセージ。routeまたはerrorMessageは片方のみ値が入ります。
   * @nullable
   */
  errorMessage: string | null
}

/**
 * ワークフローの詳細
 */
export type WorkflowDetail = WorkflowInTicket & {
  /** 経路分岐 */
  routeConditions: WorkflowRouteCondition[]
}

/**
 * アイテム一覧のデフォルト並び順
 */
export type FieldGeneralMasterDefaultSortBy =
  (typeof FieldGeneralMasterDefaultSortBy)[keyof typeof FieldGeneralMasterDefaultSortBy]

export const FieldGeneralMasterDefaultSortBy = {
  name: 'name',
  code: 'code',
} as const

/**
 * フォームフィールド・明細フィールドに紐づく汎用マスタ。
 * チケットのレスポンスではカスタムフィールドの配列（fields）を返さないため、
 * 汎用マスタAPIが返す GeneralMaster とは別のコンポーネントとして定義している。
 */
export interface FieldGeneralMaster {
  /** UUID */
  id: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /**
   * 説明
   * @maxLength 10000
   * @nullable
   */
  description: string | null
  /** アイテム一覧のデフォルト並び順 */
  defaultSortBy: FieldGeneralMasterDefaultSortBy
  /**
   * アイテム数
   * @minimum 0
   */
  itemsCount: number
  /** コードを初期表示するか */
  initialDisplayCode: boolean
  /** 作成日時を初期表示するか */
  initialDisplayCreatedAt: boolean
  /** 説明を初期表示するか */
  initialDisplayDescription: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * チケットの明細アイテム入力に含まれる明細フィールド
 */
export type SlipFieldInTicket = SlipField & {
  /** 汎用マスタ。型が汎用マスタのときのみ値が入ります。 */
  generalMaster: FieldGeneralMaster | null
}

/**
 * チケットの入力値に含まれるフォームフィールド
 */
export type FormFieldInTicket = FormField & {
  /** 汎用マスタ。型が汎用マスタのときのみ値が入ります。 */
  generalMaster: FieldGeneralMaster | null
}

/**
 * ステップのタイプ
 */
export type RouteStepStepType =
  (typeof RouteStepStepType)[keyof typeof RouteStepStepType]

export const RouteStepStepType = {
  author: 'author',
  manager: 'manager',
  team: 'team',
  user: 'user',
  author_customizable: 'author_customizable',
  assignee_customizable: 'assignee_customizable',
  dynamic_team: 'dynamic_team',
  dynamic_user: 'dynamic_user',
} as const

/**
 * アクションタイプ。承認/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。
 */
export type RouteStepActionType =
  (typeof RouteStepActionType)[keyof typeof RouteStepActionType]

export const RouteStepActionType = {
  approve: 'approve',
  confirm: 'confirm',
  none: 'none',
} as const

/**
 * フォールバックのタイプ
 */
export type RouteStepFallbackType =
  | (typeof RouteStepFallbackType)[keyof typeof RouteStepFallbackType]
  | null

export const RouteStepFallbackType = {
  direct_manager: 'direct_manager',
  higher_manager: 'higher_manager',
  skip: 'skip',
  no_fallback: 'no_fallback',
  higher_team: 'higher_team',
} as const

/**
 * 上長の選び方。直属の上長のみを対象とする場合closest、すべての上長を対象とする場合allになります。
 */
export type RouteStepManagerSelectionType =
  (typeof RouteStepManagerSelectionType)[keyof typeof RouteStepManagerSelectionType]

export const RouteStepManagerSelectionType = {
  closest: 'closest',
  all: 'all',
} as const

/**
 * 役職の比較条件。役職が指定されているときのみ値が入ります。
 */
export type RouteStepTargetGradeSymbol =
  | (typeof RouteStepTargetGradeSymbol)[keyof typeof RouteStepTargetGradeSymbol]
  | null

export const RouteStepTargetGradeSymbol = {
  equal: 'equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  any_of: 'any_of',
} as const

export interface RouteStepTarget {
  /** 承認者の指定に使うチーム。チームを指定しないステップではnullになります。 */
  team: Team | null
  /** stepType=author_customizableまたはstepType=assignee_customizableの場合に、指定したチームの下位チームのメンバーも承認者候補に含めるかどうか（true: 含める、false: 含めない） */
  descendants: boolean
  /** 役職の比較条件。役職が指定されているときのみ値が入ります。 */
  gradeSymbol: RouteStepTargetGradeSymbol
  /** 承認者の指定に使う役職の配列 */
  grades: Grade[]
  /**
   * 承認者タイプ「チームを動的に指定」または「ユーザーを動的に指定」で指定する変数名が入ります。
   * @nullable
   */
  variable: string | null
}

/**
 * 実行タイプ
 */
export type RouteStepConditionConditionType =
  (typeof RouteStepConditionConditionType)[keyof typeof RouteStepConditionConditionType]

export const RouteStepConditionConditionType = {
  always: 'always',
  conditional: 'conditional',
  conditional_skip: 'conditional_skip',
} as const

/**
 * 条件の組み合わせタイプ
 */
export type RouteStepConditionCombinationType =
  (typeof RouteStepConditionCombinationType)[keyof typeof RouteStepConditionCombinationType]

export const RouteStepConditionCombinationType = {
  all: 'all',
  any: 'any',
} as const

/**
 * 変数のフィールド
 */
export type RouteStepConditionFieldFieldKey =
  (typeof RouteStepConditionFieldFieldKey)[keyof typeof RouteStepConditionFieldFieldKey]

export const RouteStepConditionFieldFieldKey = {
  author_grade: 'author_grade',
  author_team: 'author_team',
  text_variable: 'text_variable',
  number_variable: 'number_variable',
  checkbox_variable: 'checkbox_variable',
  general_master_variable: 'general_master_variable',
  other_variable: 'other_variable',
} as const

/**
 * 演算子
 */
export type RouteStepConditionFieldSymbol =
  (typeof RouteStepConditionFieldSymbol)[keyof typeof RouteStepConditionFieldSymbol]

export const RouteStepConditionFieldSymbol = {
  equal: 'equal',
  not_equal: 'not_equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  include: 'include',
  exclude: 'exclude',
  is_empty: 'is_empty',
  is_not_empty: 'is_not_empty',
  descendants_or_equal: 'descendants_or_equal',
  not_descendants_or_equal: 'not_descendants_or_equal',
} as const

/**
 * アイテム一覧のデフォルト並び順
 */
export type RouteStepConditionGeneralMasterDefaultSortBy =
  (typeof RouteStepConditionGeneralMasterDefaultSortBy)[keyof typeof RouteStepConditionGeneralMasterDefaultSortBy]

export const RouteStepConditionGeneralMasterDefaultSortBy = {
  name: 'name',
  code: 'code',
} as const

/**
 * 実行条件のしきい値として使う汎用マスタアイテムが属する汎用マスタ。
 * 経路のレスポンスではカスタムフィールドの配列（fields）を返さないため、
 * 汎用マスタAPIが返す GeneralMaster とは別のコンポーネントとして定義している。
 */
export interface RouteStepConditionGeneralMaster {
  /** UUID */
  id: string
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /**
   * 名前
   * @maxLength 300
   */
  name: string
  /**
   * 説明
   * @maxLength 10000
   * @nullable
   */
  description: string | null
  /** アイテム一覧のデフォルト並び順 */
  defaultSortBy: RouteStepConditionGeneralMasterDefaultSortBy
  /**
   * アイテム数
   * @minimum 0
   */
  itemsCount: number
  /** コードを初期表示するか */
  initialDisplayCode: boolean
  /** 作成日時を初期表示するか */
  initialDisplayCreatedAt: boolean
  /** 説明を初期表示するか */
  initialDisplayDescription: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * ステップごとに設定できる実行条件の詳細
 */
export interface RouteStepConditionField {
  /** UUID */
  id: string
  /**
   * 変数。fieldKeyがauthor_grade / author_teamの場合はnullになります。
   * @nullable
   */
  variable: string | null
  /** 変数のフィールド */
  fieldKey: RouteStepConditionFieldFieldKey
  /** 演算子 */
  symbol: RouteStepConditionFieldSymbol
  /**
   * しきい値。fieldKeyがauthor_grade / author_team / general_master_variableの場合、およびsymbolがis_empty / is_not_emptyの場合はnullになります。
   * @nullable
   */
  value: string | null
  /** しきい値として使う役職 */
  grade: Grade | null
  /** しきい値として使うチーム */
  team: Team | null
  /** しきい値として使う汎用マスタアイテムが属する汎用マスタ */
  generalMaster: RouteStepConditionGeneralMaster | null
  /** しきい値として使う汎用マスタアイテム */
  generalMasterItem: GeneralMasterItem | null
}

/**
 * ステップごとに設定できる実行条件
 */
export interface RouteStepCondition {
  /** UUID */
  id: string
  /** 実行タイプ */
  conditionType: RouteStepConditionConditionType
  /** 条件の組み合わせタイプ */
  combinationType: RouteStepConditionCombinationType
  routeStepConditionFields: RouteStepConditionField[]
}

/**
 * 経路ステップ
 */
export interface RouteStep {
  /** UUID */
  id: string
  /** ステップ順序（1から始まります） */
  stepOrder: number
  /** ステップのタイプ */
  stepType: RouteStepStepType
  /** タイトル */
  title: string
  /** アクションタイプ。承認/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。 */
  actionType: RouteStepActionType
  /**
   * 承認者への指示
   * @nullable
   */
  instruction: string | null
  /** 必要な承認人数 */
  requiredApprovalsNumber: number
  /** 必要な承認割合（%） */
  requiredApprovalsPercent: number
  /** フォールバックのタイプ */
  fallbackType: RouteStepFallbackType
  /** 自己承認を許可するか */
  allowSelfApproval: boolean
  /** 上長の選び方。直属の上長のみを対象とする場合closest、すべての上長を対象とする場合allになります。 */
  managerSelectionType: RouteStepManagerSelectionType
  /** このステップの承認者に引き上げを許可するか */
  allowRaising: boolean
  /**
   * 最小指名人数。「申請者が指名」ステップのみ設定可能。
   * @minimum 0
   * @nullable
   */
  minCustomAssignees: number | null
  /**
   * 承認者の選び方
   * @nullable
   */
  approverAssignmentInstruction: string | null
  /** 承認者の指定に使うユーザーの配列 */
  users: User[]
  /** 承認者の指定に使うチームと役職の条件 */
  targets: RouteStepTarget[]
  routeStepCondition: RouteStepCondition | null
  /** コード */
  code: string
  /** このステップで設定されるサブステータス */
  subStatus: SubStatus | null
}

/**
 * 経路の詳細情報
 */
export type RouteDetail = Route & {
  /** バージョンの作成者 */
  versionAuthor: User | null
  /** 経路ステップ */
  steps: RouteStep[]
}

/**
 * ステータス
 */
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

export const TicketStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
  completed: 'completed',
  rejected: 'rejected',
  archived: 'archived',
  denied: 'denied',
  permanently_deleted: 'permanently_deleted',
} as const

/**
 * チケットの共有範囲の上書き設定
 */
export type TicketForcedPublicType =
  (typeof TicketForcedPublicType)[keyof typeof TicketForcedPublicType]

export const TicketForcedPublicType = {
  follow_workflow: 'follow_workflow',
  forced_public: 'forced_public',
  forced_private: 'forced_private',
} as const

/**
 * ラベル
 */
export interface Label {
  /** UUID */
  id: string
  /** 名前 */
  name: string
  /**
   * 説明
   * @nullable
   */
  description: string | null
  /**
   * ラベルの色。#なしHEXコード（例: ff0000）
   * @minLength 6
   * @maxLength 6
   * @pattern ^[a-f0-9]{6}$
   */
  color: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * チケット
 */
export interface Ticket {
  /** UUID */
  id: string
  /**
   * チケット番号
   * @nullable
   */
  ticketNumber: string | null
  /**
   * タイトル
   * @nullable
   */
  title?: string | null
  /** ステータス */
  status: TicketStatus
  /** サブステータス。処理中のみ値が入ります。 */
  subStatus?: SubStatus | null
  /**
   * 現在のステップ。0が起票者、1が最初の承認ステップ。
   * @minimum 0
   */
  currentStep: number
  /** 申請者。代理申請の場合、代理人が入ります。外部ゲストの場合はnullになります。 */
  author: User | null
  /** 代理申請を依頼したユーザー。代理申請の場合のみ値が入ります。 */
  proxyClientUser: User | null
  /** 作成日時 */
  createdAt: string
  /**
   * 申請日時
   * @nullable
   */
  openedAt: string | null
  /**
   * 完了日時
   * @nullable
   */
  completedAt: string | null
  /**
   * アーカイブ日時
   * @nullable
   */
  archivedAt: string | null
  /** 更新日時 */
  updatedAt: string
  /** チケットがテナント全体に共有の場合true */
  publicStatus: boolean
  /** チケットの共有範囲の上書き設定 */
  forcedPublicType: TicketForcedPublicType
  /** このチケットのワークフロー情報。チケットを一件だけ取得した場合のみ、セクションや共有ユーザーを含むより詳細なワークフロー情報が入ります。 */
  workflow: Workflow | WorkflowInTicket
  /** チケットのラベルの配列 */
  labels: Label[]
  /**
   * 申請者の所属チームのID。外部ゲストの場合や所属チームがない場合はnullになります。
   * @nullable
   */
  authorTeamId: string | null
  /** コメント数 */
  commentsCount: number
  /** ログ数 */
  logsCount: number
  /** 関連チケット数 */
  linkedTicketsCount: number
  /**
   * クローズ日時。完了日時またはアーカイブ日時が入ります。どちらもない場合はnullになります。
   * @nullable
   */
  closedAt: string | null
  /**
   * 申請拒否日時
   * @nullable
   */
  deniedAt: string | null
}

/**
 * アクションタイプ。承認/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。
 */
export type TicketStepActionType =
  (typeof TicketStepActionType)[keyof typeof TicketStepActionType]

export const TicketStepActionType = {
  approve: 'approve',
  confirm: 'confirm',
  none: 'none',
} as const

/**
 * フォールバックの結果
 */
export type TicketStepFallbackResult =
  | (typeof TicketStepFallbackResult)[keyof typeof TicketStepFallbackResult]
  | null

export const TicketStepFallbackResult = {
  direct_manager: 'direct_manager',
  higher_manager: 'higher_manager',
  skip: 'skip',
  no_fallback: 'no_fallback',
  higher_team: 'higher_team',
} as const

/**
 * チケット承認者
 */
export interface TicketAssignee {
  /** UUID */
  id: string
  /** ステップ番号。1が最初の承認ステップ。 */
  stepOrder: number
  /** 現在の承認ステップの場合true */
  current: boolean
  /** 承認済みの場合true */
  completed: boolean
  /**
   * 承認日時。古いデータではnullを返します。
   * @nullable
   */
  completedAt: string | null
  /** 承認を保留中の場合true */
  pending: boolean
  user: User
  /** 代理承認者のユーザーID（UUID）の配列。代理承認者がいない場合は空配列を返します。 */
  proxyUserIds: string[]
  /**
   * 実際に承認操作を行ったユーザー。代理承認の場合は代理人が入ります。
   * 承認完了時のみ設定され、それ以外はnullを返します。
   * チケット詳細を返すAPIにのみ含まれ、一覧系API（チケット一覧・タスク一覧）のレスポンスには含まれません。
   */
  actualApprover?: User | null
}

/**
 * ステップのステータス。承認前の場合pending、進行中の場合in_progress、完了した場合completed、スキップされた場合skipped、引き上げられた場合raisedになります。
 */
export type TicketStepStatus =
  (typeof TicketStepStatus)[keyof typeof TicketStepStatus]

export const TicketStepStatus = {
  pending: 'pending',
  in_progress: 'in_progress',
  completed: 'completed',
  skipped: 'skipped',
  raised: 'raised',
} as const

/**
 * チケット承認ステップ
 */
export interface TicketStep {
  /** UUID */
  id: string
  /**
   * 経路ステップのUUID。カスタムステップの場合、nullになります。
   * @nullable
   */
  routeStepId: string | null
  /**
   * ステップのタイトル
   * @nullable
   */
  title: string | null
  /** アクションタイプ。承認/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。 */
  actionType: TicketStepActionType
  /** 必要な承認人数 */
  requiredApprovalsNumber: number
  /** 必要な承認割合% */
  requiredApprovalsPercent: number
  /** ステップの順序。最初の承認ステップが1。 */
  stepOrder: number
  /** スキップ可能な場合true */
  skip: boolean
  /** フォールバックした場合true */
  fallback: boolean
  /** フォールバックの結果 */
  fallbackResult: TicketStepFallbackResult
  /** 承認ステップの作成者。カスタムステップの場合のみ、値が入ります。 */
  author: User | null
  /** 承認者 */
  assignees: TicketAssignee[]
  /** ステップが完了している場合true */
  completed: boolean
  /**
   * ステップが完了した日時。過去のデータではnullを返します。
   * @nullable
   */
  completedAt: string | null
  /**
   * 承認者への指示メッセージ
   * @nullable
   */
  instruction: string | null
  /** ステップの表示順序 */
  displayOrder: number
  /** ステップのステータス。承認前の場合pending、進行中の場合in_progress、完了した場合completed、スキップされた場合skipped、引き上げられた場合raisedになります。 */
  status: TicketStepStatus
}

export type TicketWithStep = Ticket & {
  /** ステップの配列 */
  steps: TicketStep[]
}

/**
 * クラウドサイン書類のステータス
 */
export type TicketDetailCloudSignDocumentStatus =
  (typeof TicketDetailCloudSignDocumentStatus)[keyof typeof TicketDetailCloudSignDocumentStatus]

export const TicketDetailCloudSignDocumentStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
  template: 'template',
  imported: 'imported',
  completed: 'completed',
} as const

/**
 * 添付されたクラウドサインの書類
 */
export type TicketDetailCloudSignDocument = {
  /** UUID */
  id: string
  /** クラウドサイン書類のID */
  documentId: string
  /** クラウドサイン書類のタイトル */
  documentTitle: string
  /** クラウドサイン書類のステータス */
  status: TicketDetailCloudSignDocumentStatus
  /** クラウドサインがサンドボックス環境の場合true */
  sandbox: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** クラウドサイン書類のURL */
  url: string
} | null

/**
 * 添付ファイル
 */
export interface Attachment {
  /** 署名済みID */
  signedId: string
  /** ファイル名 */
  filename: string
  /** ファイルURL */
  url: string
  /** バイト数 */
  byteSize: number
  /** Content-Type */
  contentType: string
}

/**
 * 明細アイテム入力
 */
export interface SlipItemInput {
  /** UUID */
  id: string
  /** 明細フィールドのUUID */
  slipFieldId: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /**
   * 入力値
   *
   * フィールドの型が汎用マスタアイテムの場合、JSON Arrayがキャッシュとして保存されます。
   */
  value: string | unknown[] | number | null
  /** 入力値: 汎用マスタアイテム */
  generalMasterItems: GeneralMasterItem[]
  /** 入力値: ユーザー */
  users: User[]
  /** 入力値: チーム */
  teams: Team[]
  /** 入力値: チケット */
  inputTickets: Ticket[]
  /** 添付ファイル */
  attachments: Attachment[]
  /** 明細フィールド */
  slipField: SlipFieldInTicket
}

/**
 * 明細アイテム
 */
export interface SlipItem {
  /** UUID */
  id: string
  /** 明細アイテムの入力の配列 */
  inputs: SlipItemInput[]
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** 明細セクションのUUID */
  slipSectionId: string
}

/**
 * チケットのフォーム入力
 */
export interface TicketInput {
  /** UUID */
  id: string
  /** フォームフィールドのUUID */
  formFieldId: string
  /**
   * 入力値
   * フィールドの型が汎用マスタアイテム、ユーザー、チーム、チケットの場合、JSON Arrayがキャッシュとして保存されます。
   */
  value: string | null | unknown[] | number
  formField?: FormFieldInTicket
  /** 入力値: 汎用マスタアイテム */
  generalMasterItems?: GeneralMasterItem[]
  /** 入力値: ユーザー */
  users?: User[]
  /** 入力値: チーム */
  teams?: Team[]
  /** 入力値: チケット */
  inputTickets?: Ticket[]
  /** 添付ファイル */
  attachments?: Attachment[]
}

/**
 * チケットのセクション
 */
export interface TicketSection {
  /** チケットセクションID */
  id: string
  /** ワークフローのセクションID */
  sectionId: string
  /** セクションの表示状態 */
  visible: boolean
  /** セクションの閲覧を制限するか */
  viewRestriction: boolean
  /** 申請者に閲覧を許可するか */
  allowViewAuthor: boolean
  /** 承認者に閲覧を許可するか */
  allowViewApprover: boolean
  /** 閲覧可能かどうか */
  viewable: boolean
  /** このセクションの入力の配列 */
  inputs: TicketInput[]
}

/**
 * チケットに割り当てられたカスタム採番の値
 */
export interface CustomNumberingValue {
  /** UUID */
  id: string
  /** フォーマットを適用したカスタム採番の値 */
  formattedNumber: string
  /** カスタム採番 */
  customNumbering: CustomNumbering
}

/**
 * チケットの詳細
 */
export type TicketDetail = Ticket & {
  /** 申請者の所属チーム. 外部ゲストの場合はnullになります。 */
  authorTeam: Team | null
  /** このチケットの承認経路。申請拒否状態の場合、nullになります。 */
  route: RouteDetail | null
  /** 元のチケット（パイプラインで作成されたときのみ値が入ります） */
  triggerTicket?: Ticket | null
  /** 次のチケット（パイプラインで次のチケットを作成したときのみ値が入ります） */
  nextTickets?: Ticket[]
  /** 明細の入力 */
  slipItems: SlipItem[]
  /** セクションの配列 */
  ticketSections: TicketSection[]
  /** フォームの入力 */
  inputs: TicketInput[]
  /** 添付されたクラウドサインの書類 */
  cloudSignDocument: TicketDetailCloudSignDocument
  /** チケットのステップ */
  steps: TicketStep[]
  /** チケットに割り当てられたカスタム採番の値の配列 */
  customNumberingValues?: CustomNumberingValue[]
}

/**
 * `PATCH /tickets/{ticketId}/form`のトップレベル`inputs[]`要素。
 * `formFieldId`または`formFieldCode`のいずれか一方を指定してください。両方指定時は`formFieldId`が優先されます。
 * 明細セクション配下の入力には`TicketFormPartialUpdateSlipFieldInput`を使用してください。
 */
export type TicketFormPartialUpdateInput = unknown & {
  /** フォームフィールドのUUID。`formFieldId`または`formFieldCode`のいずれか一方を指定してください。 */
  formFieldId?: string
  /** フォームフィールドのコード。`formFieldId`または`formFieldCode`のいずれか一方を指定してください。 */
  formFieldCode?: string
  /**
   * 入力値。フィールド種別に応じた値（文字列 / 数値 / 真偽値 / 配列など）を指定します。
   * フィールドがチェックボックスタイプのときは配列で指定してください。
   */
  value?: string | null | number | boolean | unknown[]
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: string | null | string[]
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: string | null | string[]
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: string | null | string[]
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: string | null | string[]
  /**
   * 添付ファイルの署名済みID。フィールドがファイルタイプのときのみ指定してください。
   * @nullable
   */
  files?: string[] | null
}

/**
 * `PATCH /tickets/{ticketId}/form`の明細セクション配下（`slipItems[].inputs[]`）の入力要素。
 * `slipFieldId`または`slipFieldCode`のいずれか一方を指定してください。両方指定時は`slipFieldId`が優先されます。
 */
export type TicketFormPartialUpdateSlipFieldInput = unknown & {
  /** 明細フィールドのUUID。`slipFieldId`または`slipFieldCode`のいずれか一方を指定してください。 */
  slipFieldId?: string
  /** 明細フィールドのコード。`slipFieldId`または`slipFieldCode`のいずれか一方を指定してください。 */
  slipFieldCode?: string
  /**
   * 入力値。フィールド種別に応じた値（文字列 / 数値 / 真偽値 / 配列など）を指定します。
   * フィールドがチェックボックスタイプのときは配列で指定してください。
   */
  value?: string | null | number | boolean | unknown[]
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: string | null | string[]
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: string | null | string[]
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: string | null | string[]
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: string | null | string[]
  /**
   * 添付ファイルの署名済みID。フィールドがファイルタイプのときのみ指定してください。
   * @nullable
   */
  files?: string[] | null
}

/**
 * `PATCH /tickets/{ticketId}/form`の明細アイテム（1 行）。
 * `slipSectionId`または`slipSectionCode`のいずれか一方を指定してください。両方指定時は`slipSectionId`が優先されます。
 * 同一の`slipSectionId` / `slipSectionCode`を持つ要素を複数指定すると、それらは同じ明細セクション配下の複数行として扱われます。
 */
export type TicketFormPartialUpdateSlipItem = unknown & {
  /** 明細セクションのUUID。`slipSectionId`または`slipSectionCode`のいずれか一方を指定してください。 */
  slipSectionId?: string
  /** 明細セクションのコード。`slipSectionId`または`slipSectionCode`のいずれか一方を指定してください。 */
  slipSectionCode?: string
  /**
   * その行のフィールド入力値の配列。各要素は`slipFieldId`または`slipFieldCode`で明細フィールドを指定します。
   * 編集可能なフィールドはすべて含めてください。編集できないフィールド（例: 申請者が更新する場合の承認者用フィールド）は指定せずに省略してください（既存値が保持されます）。
   */
  inputs: TicketFormPartialUpdateSlipFieldInput[]
}

/**
 * `PATCH /tickets/{ticketId}/form`のリクエストボディ。
 *
 * `inputs`と`slipItems`の少なくとも一方を指定してください。両方とも未指定または両方とも空配列の場合は`400`を返します。
 */
export type TicketFormPartialUpdateBody =
  | ({
      /** @minItems 1 */
      inputs: unknown[]
    } & {
      /**
       * 更新対象のフォーム入力の配列。差分更新するフォームフィールドのみを指定します。
       * 未指定のフォームフィールドは既存値が保持されます。
       * 同じフォームフィールドを複数の要素で指定することはできません（重複時は`400`）。
       */
      inputs?: TicketFormPartialUpdateInput[]
      /**
       * 更新対象の明細アイテムの配列。各要素は明細の 1 行を表します。
       * 同じ`slipSectionId` / `slipSectionCode`を持つ要素を複数指定することで、1つの明細セクションに複数行を送信できます。
       * 明示送信した明細セクションの更新ルール（行の追加・削除等）は、既存`PATCH /tickets/{ticketId}`と同等です。
       * 未指定の明細セクションは既存値が保持されます。
       */
      slipItems?: TicketFormPartialUpdateSlipItem[]
    })
  | ({
      /** @minItems 1 */
      slipItems: unknown[]
    } & {
      /**
       * 更新対象のフォーム入力の配列。差分更新するフォームフィールドのみを指定します。
       * 未指定のフォームフィールドは既存値が保持されます。
       * 同じフォームフィールドを複数の要素で指定することはできません（重複時は`400`）。
       */
      inputs?: TicketFormPartialUpdateInput[]
      /**
       * 更新対象の明細アイテムの配列。各要素は明細の 1 行を表します。
       * 同じ`slipSectionId` / `slipSectionCode`を持つ要素を複数指定することで、1つの明細セクションに複数行を送信できます。
       * 明示送信した明細セクションの更新ルール（行の追加・削除等）は、既存`PATCH /tickets/{ticketId}`と同等です。
       * 未指定の明細セクションは既存値が保持されます。
       */
      slipItems?: TicketFormPartialUpdateSlipItem[]
    })

/**
 * チケットの共有ユーザー
 */
export interface TicketViewer {
  /** UUID */
  id: string
  user: User | null
  team: Team | null
  grade: Grade | null
  /** 下位のチームを含めるかどうか */
  descendants: boolean
}

/**
 * コメント
 */
export interface Comment {
  /** UUID */
  id: string
  /** 本文 */
  body: string
  /** 添付ファイル */
  attachments: Attachment[]
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /**
   * 削除日時
   * @nullable
   */
  deletedAt: string | null
  user: User
  /** メンションしたユーザーの配列 */
  mentionedUsers: User[]
}

/**
 * 操作データ
 * @nullable
 */
export type AuditLogData = { [key: string]: unknown } | null

/**
 * システムによる操作種別
 * @nullable
 */
export type AuditLogSystemType =
  | (typeof AuditLogSystemType)[keyof typeof AuditLogSystemType]
  | null

export const AuditLogSystemType = {
  automation: 'automation',
} as const

/**
 * 監査ログ
 */
export interface AuditLog {
  /** UUID */
  id: string
  /** 操作ユーザー。システムによる操作の場合はnull。 */
  user: User | null
  /** 操作種別 */
  action: string
  /**
   * 操作データ
   * @nullable
   */
  data: AuditLogData
  /**
   * リモートIPアドレス
   * @nullable
   */
  remoteIp: string | null
  /**
   * リクエストID
   * @nullable
   */
  requestId: string | null
  /**
   * システムによる操作種別
   * @nullable
   */
  systemType: AuditLogSystemType
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

export type WebhookRequestBodyPingData = {
  /** メッセージ。eventTypeがpingの場合に使用されます。 */
  message?: string
}

/**
 * Webhookのテナント情報
 */
export interface WebhookTenant {
  /** テナントのUUID */
  id?: string
  /** テナントのパブリックID（サブドメイン） */
  publicId?: string
  /** テナント名 */
  name?: string
}

/**
 * Webhookのリクエストボディ（ping）
 */
export interface WebhookRequestBodyPing {
  /** イベントの種類 */
  eventType?: string
  tenant?: WebhookTenant
  user?: User
  data?: WebhookRequestBodyPingData
}

export type WebhookRequestBodyTicketData = {
  ticket?: TicketDetail
}

/**
 * Webhookのリクエストボディ（ticket_*）
 */
export interface WebhookRequestBodyTicket {
  /** イベントの種類 */
  eventType?: string
  tenant?: WebhookTenant
  user?: User
  data?: WebhookRequestBodyTicketData
}

export type WebhookRequestBodyCommentData = {
  ticket?: TicketWithStep
  comment?: Comment
}

/**
 * Webhookのリクエストボディ（comment_*）
 */
export interface WebhookRequestBodyComment {
  /** イベントの種類 */
  eventType?: string
  tenant?: WebhookTenant
  user?: User
  data?: WebhookRequestBodyCommentData
}

/**
 * Bad Request
 */
export type BadRequestResponse = ErrorResponse

/**
 * Unauthorized
 */
export type UnauthorizedResponse = ErrorResponse

/**
 * Forbidden
 */
export type ForbiddenResponse = ErrorResponse

/**
 * Not Found
 */
export type NotFoundResponse = ErrorResponse

/**
 * バリデーションエラーの詳細
 */
export type UnprocessableContentResponseErrors = { [key: string]: string[] }

export type UnprocessableContentResponse = ErrorResponse & {
  /** バリデーションエラーの詳細 */
  errors?: UnprocessableContentResponseErrors
}

/**
 * Internal Server Error
 */
export type InternalServerErrorResponse = ErrorResponse

/**
 * Gateway Timeout
 */
export type GatewayTimeoutResponse = ErrorResponse

export type ListCategoriesParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: name, createdAt, updatedAt
   * @pattern ^(name|createdAt|updatedAt)(-asc|-desc)?$
   */
  sortBy?: string
}

export type CreateCategoryBody = {
  /** 名前 */
  name: string
}

export type UpdateCategoryBody = {
  /** 名前 */
  name: string
}

export type ListFoldersParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name, fullName
   * @pattern ^(createdAt|name|fullName)(-asc|-desc)?$
   */
  sortBy?: string
}

export type CreateFolderBody = {
  /** 名前 */
  name: string
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** フォルダの説明 */
  description?: string
  /**
   * 親フォルダのID
   * @nullable
   */
  parentFolderId?: string | null
}

export type UpdateFolderBody = {
  /** 名前 */
  name?: string
  /** コード */
  code?: string
  /** フォルダの説明 */
  description?: string
  /**
   * 親フォルダのID
   * @nullable
   */
  parentFolderId?: string | null
}

export type ListGeneralMastersParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, code, name
   * @pattern ^(createdAt|code|name)(-asc|-desc)?$
   */
  sortBy?: string
}

/**
 * アイテム一覧のデフォルト並び順
 */
export type CreateGeneralMasterBodyDefaultSortBy =
  (typeof CreateGeneralMasterBodyDefaultSortBy)[keyof typeof CreateGeneralMasterBodyDefaultSortBy]

export const CreateGeneralMasterBodyDefaultSortBy = {
  name: 'name',
  code: 'code',
} as const

/**
 * フィールドの型
 */
export type CreateGeneralMasterBodyFieldsItemFieldType =
  (typeof CreateGeneralMasterBodyFieldsItemFieldType)[keyof typeof CreateGeneralMasterBodyFieldsItemFieldType]

export const CreateGeneralMasterBodyFieldsItemFieldType = {
  text: 'text',
  text_long: 'text_long',
  number: 'number',
  integer: 'integer',
  checkbox: 'checkbox',
  pull_down: 'pull_down',
  date: 'date',
} as const

export type CreateGeneralMasterBodyFieldsItem = {
  /** フィールド名 */
  title: string
  /**
   * フィールドの説明
   * @nullable
   */
  description?: string | null
  /** フィールドのコード */
  code: string
  /** 入力必須かどうか */
  required: boolean
  /** フィールドの型 */
  fieldType: CreateGeneralMasterBodyFieldsItemFieldType
  /**
   * 選択肢。fieldTypeがcheckboxまたはpull_downのとき必須。
   * @nullable
   */
  options?: string[] | null
  /** 管理者以外も閲覧可能な場合true */
  visible?: boolean
}

export type CreateGeneralMasterBody = {
  /** 名前 */
  name: string
  /**
   * コード。未指定の場合、ランダムな英数字が自動的に設定されます。
   * @nullable
   */
  code?: string | null
  /**
   * 説明
   * @nullable
   */
  description?: string | null
  /** アイテム一覧のデフォルト並び順 */
  defaultSortBy?: CreateGeneralMasterBodyDefaultSortBy
  /** カスタムフィールドの配列 */
  fields?: CreateGeneralMasterBodyFieldsItem[]
}

/**
 * アイテム一覧のデフォルト並び順
 */
export type UpdateGeneralMasterBodyDefaultSortBy =
  (typeof UpdateGeneralMasterBodyDefaultSortBy)[keyof typeof UpdateGeneralMasterBodyDefaultSortBy]

export const UpdateGeneralMasterBodyDefaultSortBy = {
  name: 'name',
  code: 'code',
} as const

export type UpdateGeneralMasterBodyFieldsItem = {
  /** フィールド名 */
  title?: string
  /**
   * フィールドの説明
   * @nullable
   */
  description?: string | null
  /** フィールドのコード */
  code: string
  /** 入力必須かどうか */
  required?: boolean
  /** フィールドの型 */
  fieldType?: string
  /**
   * 選択肢。fieldTypeがcheckboxまたはpull_downのときのみ必須。
   * @nullable
   */
  options?: string[] | null
  /** 管理者以外も閲覧可能な場合true */
  visible?: boolean
}

export type UpdateGeneralMasterBody = {
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 名前 */
  name?: string
  /** 説明 */
  description?: string
  /** アイテム一覧のデフォルト並び順 */
  defaultSortBy?: UpdateGeneralMasterBodyDefaultSortBy
  /** カスタムフィールドの配列 */
  fields?: UpdateGeneralMasterBodyFieldsItem[]
}

export type ListGeneralMasterItemsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, code, name
   * @pattern ^(createdAt|code|name)(-asc|-desc)?$
   */
  sortBy?: string
}

export type CreateGeneralMasterItemBodyInputsItem = {
  /** フィールドのコード */
  code: string
  /** 入力値。カスタムフィールドがcheckboxの場合は文字列の配列、それ以外は文字列。 */
  value: string | null | string[]
}

export type CreateGeneralMasterItemBody = {
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 名前 */
  name: string
  /** 説明 */
  description?: string
  /**
   * 有効期限の開始日
   * @nullable
   */
  startsOn?: string | null
  /**
   * 有効期限の終了日
   * @nullable
   */
  endsOn?: string | null
  /** カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。 */
  inputs: CreateGeneralMasterItemBodyInputsItem[]
}

export type UpdateGeneralMasterItemBodyInputsItem = {
  /** フィールドのコード */
  code: string
  /** 入力値。カスタムフィールドがcheckboxの場合文字列の配列、それ以外の場合文字列。 */
  value: string | null | string[]
}

export type UpdateGeneralMasterItemBody = {
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 名前 */
  name?: string
  /** 説明 */
  description?: string
  /**
   * 有効期限の開始日
   * @nullable
   */
  startsOn?: string | null
  /**
   * 有効期限の終了日
   * @nullable
   */
  endsOn?: string | null
  /** カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。 */
  inputs?: UpdateGeneralMasterItemBodyInputsItem[]
}

export type ListGradesParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: level, code
   * @pattern ^(level|code)(-asc|-desc)?$
   */
  sortBy?: string
}

export type ListOrganizationChartsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name
   * @pattern ^(createdAt|name)(-asc|-desc)?$
   */
  sortBy?: string
}

export type ActivateOrganizationChartBody = {
  /** 有効化する日付。nullの場合、即時で有効化します。 */
  dueOn?: string
}

export type ListTeamsParams = {
  /**
   * 親チームのUUID
   */
  parentId?: string
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type ListTeamMembersParams = {
  /**
   * ページ。1が先頭のページ。
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type CreateTeamMembersBodyUsersItem = {
  /** ユーザーのUUID */
  id: string
  /** 上長の場合、true */
  leader: boolean
  /**
   * 役職のUUID
   * @minItems 1
   */
  gradeIds?: string[]
}

export type CreateTeamMembersBody = {
  /**
   * メンバーに追加したいユーザー情報の配列
   * @minItems 1
   * @maxItems 10
   */
  users: CreateTeamMembersBodyUsersItem[]
}

export type DeleteTeamMembersBody = {
  /**
   * ユーザーのUUIDの配列
   * @minItems 1
   * @maxItems 10
   */
  userIds: string[]
}

export type UpdateTeamMemberBody = {
  /** 上長の場合、true */
  leader: boolean
  /**
   * 役職のUUID
   * @minItems 1
   */
  gradeIds: string[]
}

export type ListRolesParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name
   * @pattern ^(createdAt|name)(-asc|-desc)?$
   */
  sortBy?: string
}

export type CreateRoleMembersBody = {
  /**
   * ユーザーUUIDの配列
   * @minItems 1
   * @maxItems 10
   */
  userIds: string[]
}

export type ListRoleMembersParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type ListTicketsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, updatedAt
   * @pattern ^(createdAt|updatedAt)(-asc|-desc)?$
   */
  sortBy?: string
  /**
   * ステータスの配列
   */
  status?:
    | 'draft'
    | 'in_progress'
    | 'rejected'
    | 'completed'
    | 'denied'
    | 'archived'
    | (
        | 'draft'
        | 'in_progress'
        | 'rejected'
        | 'completed'
        | 'denied'
        | 'archived'
      )[]
  /**
   * サブステータスのUUIDの配列
   */
  subStatusIds?: string[]
  /**
   * ワークフローのUUID
   */
  workflowId?: string
  /**
   * 申請者のUUID
   */
  authorId?: string
  /**
   * 申請時に選択したチームの上位組織を含む名前
   * @maxLength 300
   */
  authorTeamFullName?: string
  /**
   * チケット番号
   */
  ticketNumber?: string
  /**
   * 作成日時の起点
   */
  createdAtStart?: string
  /**
   * 作成日時の終点
   */
  createdAtEnd?: string
  /**
   * 更新日時の起点
   */
  updatedAtStart?: string
  /**
   * 更新日時の終点
   */
  updatedAtEnd?: string
  /**
   * 申請日時の起点
   */
  openedAtStart?: string
  /**
   * 申請日時の終点
   */
  openedAtEnd?: string
  /**
   * 完了日時の起点
   */
  completedAtStart?: string
  /**
   * 完了日時の終点
   */
  completedAtEnd?: string
  /**
   * アーカイブ日時の起点
   */
  archivedAtStart?: string
  /**
   * アーカイブ日時の終点
   */
  archivedAtEnd?: string
  /**
   * 承認者のUUID。assigneeStatusとセットで指定してください。
   */
  assigneeUserId?: string
  /**
   * 承認者の状態。assigneeUserIdとセットで指定してください。
   */
  assigneeStatus?: ListTicketsAssigneeStatusItem[]
  /**
   * 現在の承認ステップ名
   * @maxLength 300
   */
  stepTitle?: string
}

export type ListTicketsAssigneeStatusItem =
  (typeof ListTicketsAssigneeStatusItem)[keyof typeof ListTicketsAssigneeStatusItem]

export const ListTicketsAssigneeStatusItem = {
  all: 'all',
  current: 'current',
  approved: 'approved',
} as const

/**
 * ステータス。作成ではdraftまたはin_progressのみ選択可能です。
 */
export type CreateTicketBodyStatus =
  (typeof CreateTicketBodyStatus)[keyof typeof CreateTicketBodyStatus]

export const CreateTicketBodyStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
} as const

/**
 * 明細アイテム入力
 */
export type CreateTicketBodySlipItemsItemInputsItem = {
  /**
   * 明細フィールドのUUID。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
   * @nullable
   */
  slipFieldId?: string | null
  /**
   * 明細フィールドのコード。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
   * @nullable
   */
  slipFieldCode?: string | null
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: string | null | string[]
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: string | null | string[]
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: string | null | string[]
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: string | null | string[]
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: string | null | string[]
  /**
   * 添付ファイルの署名済みID。
   * フィールドがファイルタイプのときのみ指定してください。
   * @nullable
   */
  files?: string[] | null
}

/**
 * 明細アイテム
 */
export type CreateTicketBodySlipItemsItem = {
  /**
   * 明細セクションのUUID。slipSectionIdまたはslipSectionCodeのいずれかを指定してください。省略時は最初の明細セクションが使用されます。
   * @nullable
   */
  slipSectionId?: string | null
  /**
   * 明細セクションのコード。slipSectionIdまたはslipSectionCodeのいずれかを指定してください。省略時は最初の明細セクションが使用されます。
   * @nullable
   */
  slipSectionCode?: string | null
  /** 明細アイテム入力の配列 */
  inputs: CreateTicketBodySlipItemsItemInputsItem[]
}

/**
 * フォームの入力
 */
export type CreateTicketBodyInputsItem = {
  /**
   * フォームフィールドのUUID。formFieldIdまたはformFieldCodeは片方のみ必須です。
   * @nullable
   */
  formFieldId?: string | null
  /**
   * フォームフィールドのコード。formFieldIdまたはformFieldCodeは片方のみ必須です。
   * @nullable
   */
  formFieldCode?: string | null
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: string | null | string[]
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: string | null | string[]
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: string | null | string[]
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: string | null | string[]
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: string | null | string[]
  /**
   * 添付ファイルの署名済みID。
   * フィールドがファイルタイプのときのみ指定してください。
   * @nullable
   */
  files?: string[] | null
}

/**
 * クラウドサイン書類。ワークフローでクラウドサイン連携が有効な場合のみ指定してください。
 */
export type CreateTicketBodyCloudSignDocument = {
  /** クラウドサイン書類のID */
  id: string
  /** クラウドサイン書類のタイトル */
  title: string
  /** クラウドサインのサンドボックス環境の場合true */
  sandbox: string
}

export type CreateTicketBodyApproversItem = {
  /** 承認者を指定する経路ステップのコード */
  routeStepCode: string
  /** 承認者として指定するユーザーのUUID */
  userId: string[]
}

export type CreateTicketBody = {
  /** ステータス。作成ではdraftまたはin_progressのみ選択可能です。 */
  status: CreateTicketBodyStatus
  /** ワークフローのUUID */
  workflowId: string
  /** 申請チームのUUID */
  authorTeamId: string
  /**
   * 依頼者となるユーザーのUUID。代理申請の場合のみ指定してください。
   * @nullable
   */
  proxyClientUserId?: string | null
  /**
   * チケットのタイトル。ワークフローでtitleInputModeがinputのときのみ設定可能です。
   * @nullable
   */
  title?: string | null
  /** 明細アイテムの配列。明細ワークフローの場合、このフィールドは必須です。 */
  slipItems?: CreateTicketBodySlipItemsItem[]
  /** フォームの入力の配列。ワークフローのすべてのフォームフィールドに対応する入力を入れてください。フォームフィールドが存在しないワークフロー（明細セクションのみ）の場合は省略可能です。それ以外のワークフローでは必須です。 */
  inputs?: CreateTicketBodyInputsItem[]
  /** クラウドサイン書類。ワークフローでクラウドサイン連携が有効な場合のみ指定してください。 */
  cloudSignDocument?: CreateTicketBodyCloudSignDocument
  /**
   * 承認タイプが「申請者が指名」の経路ステップの承認者を指定する配列。
   * @nullable
   */
  approvers?: CreateTicketBodyApproversItem[] | null
}

export type ListTasksParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, updatedAt, openedAt, assignedToMeAt
   * @pattern ^(createdAt|updatedAt|openedAt|assignedToMeAt)(-asc|-desc)?$
   */
  sortBy?: string
  /**
   * ステータスの配列
   */
  status?: ListTasksStatusItem[]
  /**
   * サブステータスのUUIDの配列
   */
  subStatusIds?: string[]
  /**
   * ワークフローのUUID
   */
  workflowId?: string
  /**
   * 申請者のUUID
   */
  authorId?: string
  /**
   * 申請時に選択したチームの上位組織を含む名前
   * @maxLength 300
   */
  authorTeamFullName?: string
  /**
   * チケット番号
   */
  ticketNumber?: string
  /**
   * 作成日時の起点
   */
  createdAtStart?: string
  /**
   * 作成日時の終点
   */
  createdAtEnd?: string
  /**
   * 更新日時の起点
   */
  updatedAtStart?: string
  /**
   * 更新日時の終点
   */
  updatedAtEnd?: string
  /**
   * 申請日時の起点
   */
  openedAtStart?: string
  /**
   * 申請日時の終点
   */
  openedAtEnd?: string
  /**
   * 承認依頼日時の起点
   */
  assignedToMeAtStart?: string
  /**
   * 承認依頼日時の終点
   */
  assignedToMeAtEnd?: string
  /**
   * 完了日時の起点
   */
  completedAtStart?: string
  /**
   * 完了日時の終点
   */
  completedAtEnd?: string
  /**
   * アーカイブ日時の起点
   */
  archivedAtStart?: string
  /**
   * アーカイブ日時の終点
   */
  archivedAtEnd?: string
  /**
   * 現在の承認ステップ名
   * @maxLength 300
   */
  stepTitle?: string
  /**
   * 承認の保留状態でチケットを絞り込みます。
   * - true: 保留中のチケットのみを取得
   * - false: 保留されていないチケットのみを取得
   */
  pending?: ListTasksPending
}

export type ListTasksStatusItem =
  (typeof ListTasksStatusItem)[keyof typeof ListTasksStatusItem]

export const ListTasksStatusItem = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
  completed: 'completed',
  deleted: 'deleted',
} as const

export type ListTasksPending =
  (typeof ListTasksPending)[keyof typeof ListTasksPending]

export const ListTasksPending = {
  true: 'true',
  false: 'false',
} as const

/**
 * ステータス。更新ではdraft, in_progress, rejectedのみ選択可能です。
 */
export type UpdateTicketBodyStatus =
  (typeof UpdateTicketBodyStatus)[keyof typeof UpdateTicketBodyStatus]

export const UpdateTicketBodyStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
} as const

/**
 * 明細アイテム入力
 */
export type UpdateTicketBodySlipItemsItemInputsItem = {
  /**
   * 明細フィールドのUUID。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
   * @nullable
   */
  slipFieldId?: string | null
  /**
   * 明細フィールドのコード。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
   * @nullable
   */
  slipFieldCode?: string | null
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: string | null | string[]
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: string | null | string[]
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: string | null | string[]
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: string | null | string[]
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: string | null | string[]
  /**
   * 添付ファイルの署名済みID。
   * フィールドがファイルタイプのときのみ指定してください。
   * @nullable
   */
  files?: string[] | null
}

/**
 * 明細アイテム
 */
export type UpdateTicketBodySlipItemsItem = {
  /**
   * 明細セクションのUUID。slipSectionIdまたはslipSectionCodeのいずれかを指定してください。省略時は最初の明細セクションが使用されます。
   * @nullable
   */
  slipSectionId?: string | null
  /**
   * 明細セクションのコード。slipSectionIdまたはslipSectionCodeのいずれかを指定してください。省略時は最初の明細セクションが使用されます。
   * @nullable
   */
  slipSectionCode?: string | null
  /** 明細アイテム入力の配列 */
  inputs: UpdateTicketBodySlipItemsItemInputsItem[]
}

/**
 * フォームの入力
 */
export type UpdateTicketBodyInputsItem = {
  /**
   * フォームフィールドのUUID。formFieldIdまたはformFieldCodeは片方のみ必須です。
   * @nullable
   */
  formFieldId?: string | null
  /**
   * フォームフィールドのコード。formFieldIdまたはformFieldCodeは片方のみ必須です。
   * @nullable
   */
  formFieldCode?: string | null
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: string | null | string[]
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: string | null | string[]
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: string | null | string[]
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: string | null | string[]
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: string | null | string[]
  /**
   * 添付ファイルの署名済みID。
   * フィールドがファイルタイプのときのみ指定してください。
   * @nullable
   */
  files?: string[] | null
}

/**
 * クラウドサイン書類。ワークフローでクラウドサイン連携が有効な場合のみ指定してください。
 */
export type UpdateTicketBodyCloudSignDocument = {
  /** クラウドサイン書類のID */
  id: string
  /** クラウドサイン書類のタイトル */
  title: string
  /** クラウドサインのサンドボックス環境の場合true */
  sandbox: boolean
}

export type UpdateTicketBodyApproversItem = {
  /** 承認者を指定する経路ステップのコード */
  routeStepCode: string
  /** 承認者として指定するユーザーのUUID */
  userId: string[]
}

export type UpdateTicketBody = {
  /** ステータス。更新ではdraft, in_progress, rejectedのみ選択可能です。 */
  status?: UpdateTicketBodyStatus
  /** 申請チームのUUID */
  authorTeamId?: string
  /** 依頼者となるユーザーのUUID。代理申請の場合のみ指定してください。 */
  proxyClientUserId?: string
  /** チケットのタイトル。ワークフローでallow_titleがtrueのときのみ設定可能です。 */
  title?: string
  /** 明細アイテムの配列 */
  slipItems?: UpdateTicketBodySlipItemsItem[]
  /**
   * フォームの入力の配列。
   * 注意：申請者による更新時は、ワークフローのすべてのフォームフィールドに対応する入力を入れてください。
   * 注意：承認者による更新時は、承認者用フィールドに対応する入力のみ入れてください。
   * 注意：明細ワークフローの場合、slipItemsも同時にリクエストボディに入れてください。
   */
  inputs?: UpdateTicketBodyInputsItem[]
  /** クラウドサイン書類。ワークフローでクラウドサイン連携が有効な場合のみ指定してください。 */
  cloudSignDocument?: UpdateTicketBodyCloudSignDocument
  /**
   * 承認タイプが「申請者が指名」の経路ステップの承認者を指定する配列。
   * @nullable
   */
  approvers?: UpdateTicketBodyApproversItem[] | null
}

export type ApproveTicketBody = {
  /** コメント本文。ワークフローのcommentingRequiredOnApprovalがtrueの場合は必須です。ワークフローのcommentingEnabledがfalseの場合は指定できません。 */
  comment?: string
}

export type RejectTicketBody = {
  /** 差し戻し先のステップ番号（0が起票者、1が最初の承認ステップ） */
  to: number
  /** コメント本文。ワークフローのcommentingRequiredOnRejectionがtrueの場合は必須です。ワークフローのcommentingEnabledがfalseの場合は指定できません。 */
  comment?: string
}

export type DenyTicketBody = {
  /** コメント本文。ワークフローのcommentingRequiredOnDenialがtrueの場合は必須です。ワークフローのcommentingEnabledがfalseの場合は指定できません。 */
  comment?: string
}

export type ListTicketLinksParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type ListViewersParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt
   * @pattern ^(createdAt)(-asc|-desc)?$
   */
  sortBy?: string
}

export type CreateViewerBody = {
  /** ユーザーのUUID。userIdとteamIdは片方のみ必須です。 */
  userId?: string | string[] | null
  /** チームのUUID。userIdとteamIdは片方のみ必須です。 */
  teamId?: string | string[] | null
  /**
   * 役職のUUID。teamId指定時のみ、任意で指定できます。
   * @nullable
   */
  gradeId?: string | null
  /**
   * 下位のチームを含めるかどうかをteamId指定時のみ指定できます。未指定時はfalse扱いです。
   * @nullable
   */
  descendants?: boolean | null
}

export type ListCommentsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt
   * @pattern ^(createdAt)(-asc|-desc)?$
   */
  sortBy?: string
}

export type CreateCommentBody = {
  /** 本文 */
  body: string
  /**
   * 添付ファイルの署名済みID
   * @nullable
   */
  files?: string[] | null
}

export type UpdateCommentBody = {
  /** 本文 */
  body: string
}

export type ListUsersParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ステータスによる絞り込み
   */
  status?: ListUsersStatusItem[]
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: email, code, lastUsedOn
   * @pattern ^(email|code|lastUsedOn)(-asc|-desc)?$
   */
  sortBy?: string
}

export type ListUsersStatusItem =
  (typeof ListUsersStatusItem)[keyof typeof ListUsersStatusItem]

export const ListUsersStatusItem = {
  invited: 'invited',
  activated: 'activated',
  suspended: 'suspended',
  deactivated: 'deactivated',
} as const

export type CreateUserBodyCustomFieldsItem = {
  /** UserCustomField#code */
  code: string
  /**
   * fieldType に応じた値。number / integer は文字列で送信する
   * (JSON 数値も互換のため許容するが、保存時に文字列へ正規化される)。
   * number / integer では桁区切りのカンマは使用できず、通常表記の数値文字列のみ受け付ける (指定した場合は 422)。
   * null でクリア。
   */
  value: string | number | string[] | null
}

export type CreateUserBody = {
  /** メールアドレス */
  email: string
  /**
   * コード。未指定の場合、ランダムな英数字が自動的に設定されます。
   * @maxLength 100
   */
  code: string
  /**
   * 名
   * @maxLength 255
   */
  firstName: string
  /**
   * 姓
   * @maxLength 255
   */
  lastName: string
  /** 招待メールを送信する場合true（デフォルト）、送信しない場合false */
  sendEmail?: boolean
  /**
   * 社員番号
   * @maxLength 30
   * @nullable
   */
  employeeId?: string | null
  /**
   * 招待時に作成する所属の配列（最大5件）
   * @maxItems 5
   */
  memberships?: InviteMembershipBody[]
  /**
   * ユーザーカスタムフィールドの値の一覧。各要素は { code, value }。
   * code は UserCustomField#code を指定します。
   * value は fieldType に応じた値 (string / number / string[] / null)。
   * value に null を指定すると、そのフィールドの値をクリアします。
   * このパラメータは、エンタープライズ/トライアル契約テナントでのみ有効です。
   */
  customFields?: CreateUserBodyCustomFieldsItem[]
}

export type UpdateUserBodyCustomFieldsItem = {
  /** UserCustomField#code */
  code: string
  /**
   * fieldType に応じた値。number / integer は文字列で送信する
   * (JSON 数値も互換のため許容するが、保存時に文字列へ正規化される)。
   * number / integer では桁区切りのカンマは使用できず、通常表記の数値文字列のみ受け付ける (指定した場合は 422)。
   * null でクリア。
   */
  value: string | number | string[] | null
}

export type UpdateUserBody = {
  /**
   * メールアドレス
   * @maxLength 254
   */
  email?: string
  /**
   * コード
   * @maxLength 100
   */
  code?: string
  /**
   * 名
   * @maxLength 255
   */
  firstName?: string
  /**
   * 姓
   * @maxLength 255
   */
  lastName?: string
  /**
   * 社員番号
   * @maxLength 30
   * @nullable
   */
  employeeId?: string | null
  /**
   * ユーザーカスタムフィールドの値の一覧。各要素は { code, value }。
   * code は UserCustomField#code を指定します。
   * value は fieldType に応じた値 (string / number / string[] / null)。
   * value に null を指定すると、そのフィールドの値をクリアします。
   * このパラメータは、エンタープライズ/トライアル契約テナントでのみ有効です。
   */
  customFields?: UpdateUserBodyCustomFieldsItem[]
}

export type LookupUserByEmailParams = {
  /**
   * メールアドレス（URLエンコードを行ったもの）
   */
  email: string
}

export type ListUserTeamsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * trueの場合、申請可能なチームのみ返す。デフォルトはfalse（すべてのチームを返す）
   */
  submittable?: boolean
}

export type ListUserRolesParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type ListRoutesParams = {
  /**
   * ページ。1が最初のページ。
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, folderId
   * @pattern ^(createdAt|folderId)(-asc|-desc)?$
   */
  sortBy?: string
  /**
   * ステータス
   */
  status?: ListRoutesStatusItem[]
  /**
   * フォルダのUUID
   */
  folderId?: string
}

export type ListRoutesStatusItem =
  (typeof ListRoutesStatusItem)[keyof typeof ListRoutesStatusItem]

export const ListRoutesStatusItem = {
  visible: 'visible',
  error: 'error',
} as const

export type ListWorkflowsParams = {
  /**
   * ページ。1が最初のページ。
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, updatedAt, name, status
   * @pattern ^(createdAt|updatedAt|name|status)(-asc|-desc)?$
   */
  sortBy?: string
  /**
   * ステータス
   */
  status?: ListWorkflowsStatusItem[]
}

export type ListWorkflowsStatusItem =
  (typeof ListWorkflowsStatusItem)[keyof typeof ListWorkflowsStatusItem]

export const ListWorkflowsStatusItem = {
  visible: 'visible',
  invisible: 'invisible',
} as const

export type ListProxyApplicantsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type CreateProxyApplicantBody = {
  /** 代理されるユーザーID */
  userId: string
  /** 代理するユーザーID */
  proxyUserId: string
  /**
   * 開始日。nullの場合、すでに開始しているものとして扱います。
   * @nullable
   */
  startsOn?: string | null
  /**
   * 終了日。nullの場合、無期限のものとして扱います。
   * @nullable
   */
  endsOn?: string | null
  /** 対象ワークフローのID */
  workflowIds?: string[]
}

export type ListProxyApproversParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
}

export type CreateProxyApproverBody = {
  /** 代理されるユーザーID */
  userId: string
  /** 代理するユーザーID */
  proxyUserId: string
  /**
   * 開始日。nullの場合、すでに始まっているものとして扱います。
   * @nullable
   */
  startsOn?: string | null
  /**
   * 終了日。nullの場合、無期限として扱います。
   * @nullable
   */
  endsOn?: string | null
  /** 対象ワークフローのID */
  workflowIds?: string[]
}

export type UploadFileBody = {
  /** 添付ファイル */
  file: Blob
}

export type UploadFile200 = {
  /** 添付ファイルの署名済みID */
  signedId: string
}

export type GetFile200 = {
  /** Amazon S3のURL */
  url: string
  /** ファイル名 */
  filename: string
  /** チェックサム */
  checksum: string
  /** バイト数 */
  byteSize: number
  /** Content-Type */
  contentType: string
  /** 作成日時 */
  createdAt: string
}

export type ListAuditLogsParams = {
  /**
   * ページ
   * @minimum 1
   */
  page?: number
  /**
   * 1ページあたりの件数
   * @minimum 1
   * @maximum 100
   */
  perPage?: number
  /**
   * ソート対象のフィールドと順序。フィールドは createdAt のみ指定可能。
   * @pattern ^(createdAt)(-asc|-desc)?$
   */
  sortBy?: string
  /**
   * 作成日時の起点
   */
  createdAtStart?: string
  /**
   * 作成日時の終点
   */
  createdAtEnd?: string
  /**
   * ユーザーID
   */
  userId?: string
}
