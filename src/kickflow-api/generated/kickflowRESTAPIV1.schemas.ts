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
 * コード
 * @maxLength 100
 */
export type GradeCode = string | null

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
   */
  code: GradeCode
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
 * 社員番号
 * @maxLength 30
 */
export type UserEmployeeId = string | null

export type UserImage100x100 = string | null

export type UserImage64x64 = string | null

export type UserImage32x32 = string | null

/**
 * ユーザー画像のURL。サイズごとに複数のURLを返します。
 */
export type UserImage = {
  '100x100': UserImage100x100
  '64x64': UserImage64x64
  '32x32': UserImage32x32
}

/**
 * ステータス
 */
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserStatus = {
  invited: 'invited',
  activated: 'activated',
  suspended: 'suspended',
  deactivated: 'deactivated',
} as const

/**
 * 削除日時
 */
export type UserDeactivatedAt = string | null

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
   */
  employeeId?: UserEmployeeId
  /** ユーザー画像のURL。サイズごとに複数のURLを返します。 */
  image: UserImage
  /** ステータス */
  status: UserStatus
  /** ロケール（jaまたはen） */
  locale: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** 削除日時 */
  deactivatedAt?: UserDeactivatedAt
}

/**
 * ユーザー詳細
 */
export type UserDetail = User

/**
 * 開始日
 */
export type ProxyApplicantStartsOn = string | null

/**
 * 終了日
 */
export type ProxyApplicantEndsOn = string | null

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
  /** 開始日 */
  startsOn: ProxyApplicantStartsOn
  /** 終了日 */
  endsOn: ProxyApplicantEndsOn
  /** 対象ワークフロー */
  workflows: Workflow[]
}

/**
 * 開始日
 */
export type ProxyApproverStartsOn = string | null

/**
 * 終了日
 */
export type ProxyApproverEndsOn = string | null

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
  /** 開始日 */
  startsOn: ProxyApproverStartsOn
  /** 終了日 */
  endsOn: ProxyApproverEndsOn
  /** 対象ワークフロー */
  workflows: Workflow[]
}

/**
 * 管理用メモ
 * @maxLength 10000
 */
export type TeamNotes = string | null

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
   */
  notes?: TeamNotes
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
 * 親チーム
 */
export type TeamDetailAllOfParent = Team | null

export type TeamDetailAllOf = {
  /** 親チーム */
  parent?: TeamDetailAllOfParent
  /** 子チーム */
  children: Team[]
  /** メンバーの配列。

注意：パフォーマンス上の理由から、100件を超えるメンバーを返すことはできません。101件以上のメンバーをすべて取得したい場合は、別途メンバー取得APIを呼び出してください。 */
  users: MemberUser[]
}

/**
 * チームの詳細
 */
export type TeamDetail = Team & TeamDetailAllOf

/**
 * 管理用メモ
 */
export type TeamCreateBodyNotes = string | null

/**
 * チームを作成するときのrequest body
 */
export interface TeamCreateBody {
  /** 名前 */
  name: string
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 管理用メモ */
  notes?: TeamCreateBodyNotes
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
 */
export type OrganizationChartActivationPlanAnyOf = {
  /** UUID */
  id: string
  /** 有効化の予定日 */
  dueOn: string
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * 有効化の予定
 */
export type OrganizationChartActivationPlan =
  OrganizationChartActivationPlanAnyOf | null

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
  /** 有効化の予定 */
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

export type MemberUserAllOf = {
  /**
   * 役職
   * @minItems 1
   */
  grades: Grade[]
  /** 上長かどうか */
  leader: boolean
}

/**
 * チームの所属メンバー
 */
export type MemberUser = MemberUserAllOf & User

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
export type RoleDetailAllOfPermissionListItemPermission =
  (typeof RoleDetailAllOfPermissionListItemPermission)[keyof typeof RoleDetailAllOfPermissionListItemPermission]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RoleDetailAllOfPermissionListItemPermission = {
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
  ticket_read: 'ticket_read',
  ticket_write: 'ticket_write',
  label: 'label',
  automation: 'automation',
} as const

export type RoleDetailAllOfPermissionListItem = {
  /** 権限タイプ */
  permission: RoleDetailAllOfPermissionListItemPermission
  /** 管理対象が制限されている場合true */
  restricted: boolean
  /** 管理対象のフォルダ */
  folders: Folder[]
  /** 管理対象の汎用マスタ */
  generalMasters: GeneralMaster[]
  /** 管理対象のチーム */
  teams: Team[]
}

export type RoleDetailAllOf = {
  /** 権限のリスト */
  permissionList: RoleDetailAllOfPermissionListItem[]
}

/**
 * 管理者ロールの詳細
 */
export type RoleDetail = Role & RoleDetailAllOf

/**
 * 権限タイプ
 */
export type RoleCreateBodyPermissionListItemPermission =
  (typeof RoleCreateBodyPermissionListItemPermission)[keyof typeof RoleCreateBodyPermissionListItemPermission]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
  /** 管理対象のフォルダID */
  folderIds?: string[]
  /** 管理対象の汎用マスタID */
  generalMasterIds?: string[]
  /** 管理対象のチームID */
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
  /** 管理対象のフォルダID */
  folderIds?: string[]
  /** 管理対象の汎用マスタID */
  generalMasterIds?: string[]
  /** 管理対象のチームID */
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
 * カテゴリ
 */
export interface Category {
  /** UUID */
  id: string
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

/**
 * 説明
 */
export type FolderDescription = string | null

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
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /** 説明 */
  description?: FolderDescription
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
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

export type FolderDetailAllOf = {
  /** 親フォルダからルートフォルダまでの配列 */
  ancestors?: Folder[]
  /** 子フォルダ */
  children?: Folder[]
}

/**
 * フォルダの詳細
 */
export type FolderDetail = Folder & FolderDetailAllOf

/**
 * 説明
 */
export type GeneralMasterDescription = string | null

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
  /** 説明 */
  description: GeneralMasterDescription
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** カスタムフィールドの配列 */
  fields: GeneralMasterField[]
}

/**
 * 説明
 */
export type GeneralMasterItemDescription = string | null

/**
 * 有効期限の開始日
 */
export type GeneralMasterItemStartsOn = string | null

/**
 * 有効期限の終了日
 */
export type GeneralMasterItemEndsOn = string | null

export type GeneralMasterItemInputsItemValueAnyOf = string | null

/**
 * 入力値
 */
export type GeneralMasterItemInputsItemValue =
  | GeneralMasterItemInputsItemValueAnyOf
  | string[]

export type GeneralMasterItemInputsItem = {
  /** UUID */
  id: string
  /** 入力値 */
  value: GeneralMasterItemInputsItemValue
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
  /** 説明 */
  description: GeneralMasterItemDescription
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** 有効期限の開始日 */
  startsOn: GeneralMasterItemStartsOn
  /** 有効期限の終了日 */
  endsOn: GeneralMasterItemEndsOn
  /** カスタムフィールドの入力の配列 */
  inputs: GeneralMasterItemInputsItem[]
}

/**
 * フィールドの説明
 */
export type GeneralMasterFieldDescription = string | null

/**
 * フィールドの型
 */
export type GeneralMasterFieldFieldType =
  (typeof GeneralMasterFieldFieldType)[keyof typeof GeneralMasterFieldFieldType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
 * 選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。
 */
export type GeneralMasterFieldOptions = string[] | null

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
  /** フィールドの説明 */
  description: GeneralMasterFieldDescription
  /**
   * フィールドのコード
   * @maxLength 100
   */
  code: string
  /** フィールドの型 */
  fieldType: GeneralMasterFieldFieldType
  /** 必須項目かどうか */
  required: boolean
  /** 管理者以外も閲覧可能な場合true */
  visible: boolean
  /** 選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。 */
  options: GeneralMasterFieldOptions
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

/**
 * ステータス。visibleは有効、invisibleは無効、deletedは削除済み。
 */
export type WorkflowStatus =
  (typeof WorkflowStatus)[keyof typeof WorkflowStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const WorkflowVisibleToManager = {
  none: 'none',
  direct: 'direct',
  all: 'all',
} as const

/**
 * タイトルの説明
 */
export type WorkflowTitleDescription = string | null

/**
 * チケット番号のフォーマット
 */
export type WorkflowTicketNumberFormat = string | null

/**
 * タイトル入力モード
 */
export type WorkflowTitleInputMode =
  (typeof WorkflowTitleInputMode)[keyof typeof WorkflowTitleInputMode]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const WorkflowTitleInputMode = {
  none: 'none',
  input: 'input',
  calculate: 'calculate',
} as const

/**
 * タイトルの計算式
 */
export type WorkflowTitleFormula = string | null

/**
 * 作成者
 */
export type WorkflowAuthor = User | null

/**
 * バージョン作成者
 */
export type WorkflowVersionAuthor = User | null

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
  /** タイトルの説明 */
  titleDescription: WorkflowTitleDescription
  /** チケット番号のフォーマット */
  ticketNumberFormat: WorkflowTicketNumberFormat
  /** 承認者による上書きが可能な場合true */
  overwritable: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** タイトル入力モード */
  titleInputMode: WorkflowTitleInputMode
  /** タイトルの計算式 */
  titleFormula: WorkflowTitleFormula
  /** 共有ユーザーの編集が可能な場合true */
  allowEditingOfViewers?: boolean
  /** 作成者 */
  author: WorkflowAuthor
  /** バージョン作成者 */
  versionAuthor: WorkflowVersionAuthor
  /** フォルダ */
  folder: Folder
  /** カテゴリの配列 */
  categories: Category[]
}

export type WorkflowInTicketAllOfCloudSignSettingAnyOf = {
  /** 書類の添付が必須な場合true */
  required: boolean
}

/**
 * クラウドサイン連携設定
 */
export type WorkflowInTicketAllOfCloudSignSetting =
  WorkflowInTicketAllOfCloudSignSettingAnyOf | null

export type WorkflowInTicketAllOf = {
  /** セクション・明細を表すオブジェクトを画面に表示される順に格納した配列。 */
  sectionList?: SectionListItem[]
  /** ワークフロー単位のチケット共有ユーザー */
  ticketViewers: WorkflowTicketViewer[]
  /** クラウドサイン連携設定 */
  cloudSignSetting: WorkflowInTicketAllOfCloudSignSetting
}

/**
 * チケットに含まれるワークフロー。セクション情報と共有ユーザー情報を含みます。
 */
export type WorkflowInTicket = Workflow & WorkflowInTicketAllOf

export type WorkflowDetailAllOf = {
  /** 経路分岐 */
  routeConditions: WorkflowRouteCondition[]
}

/**
 * ワークフローの詳細
 */
export type WorkflowDetail = WorkflowInTicket & WorkflowDetailAllOf

export type SectionListItemSectionType =
  (typeof SectionListItemSectionType)[keyof typeof SectionListItemSectionType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SectionListItemSectionType = {
  form: 'form',
  slip: 'slip',
} as const

/**
 * タイトル
 */
export type SectionListItemTitle = string | null

/**
 * 説明
 */
export type SectionListItemDescription = string | null

/**
 * 条件の組み合わせタイプ。all=すべて、any=いずれか、custom=高度な条件式。明細セクションには含まれません。
 */
export type SectionListItemCombinationType =
  (typeof SectionListItemCombinationType)[keyof typeof SectionListItemCombinationType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SectionListItemCombinationType = {
  all: 'all',
  any: 'any',
  custom: 'custom',
} as const

/**
 * 高度な条件式
 */
export type SectionListItemCombinationExpression = string | null

/**
 * 明細セクションまたはフォームセクション
 */
export interface SectionListItem {
  sectionType: SectionListItemSectionType
  /** タイトル */
  title: SectionListItemTitle
  /** 説明 */
  description: SectionListItemDescription
  /** フォームセクションのID（UUID）。明細セクションには含まれません。 */
  id?: string
  /** フォームフィールド。明細セクションには含まれません。 */
  formFields?: FormFieldDetail[]
  /** 表示条件があるかどうか。明細セクションには含まれません。 */
  conditional?: boolean
  /** 条件の組み合わせタイプ。all=すべて、any=いずれか、custom=高度な条件式。明細セクションには含まれません。 */
  combinationType?: SectionListItemCombinationType
  /** 高度な条件式 */
  combinationExpression?: SectionListItemCombinationExpression
  /** 明細フィールド。フォームセクションには含まれません。 */
  slipFields?: SlipFieldDetail[]
}

/**
 * 説明
 */
export type FormFieldDescription = string | null

/**
 * フィールドの型
 */
export type FormFieldFieldType =
  (typeof FormFieldFieldType)[keyof typeof FormFieldFieldType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
} as const

/**
 * 選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。
 */
export type FormFieldOptions = string[] | null

/**
 * フォームサイズ。fullの場合全幅、halfの場合1/2になります。
 */
export type FormFieldSize = (typeof FormFieldSize)[keyof typeof FormFieldSize]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FormFieldSize = {
  full: 'full',
  half: 'half',
} as const

/**
 * 正規表現フォーマット
 */
export type FormFieldRegexpFormat = string | null

/**
 * 計算式。
型がcalculationのときのみ値が入ります。
 */
export type FormFieldFormula = string | null

/**
 * 初期値
 */
export type FormFieldDefaultValue = string | null

/**
 * 最小値
 */
export type FormFieldMinValue = number | null

/**
 * 最大値
 */
export type FormFieldMaxValue = number | null

/**
 * 最小文字数
 * @minimum 0
 */
export type FormFieldMinLength = number | null

/**
 * 最大文字数
 * @minimum 0
 */
export type FormFieldMaxLength = number | null

/**
 * 小数の桁数
 * @minimum 0
 */
export type FormFieldDecimalDigit = number | null

/**
 * カンマ区切りで表示する場合true。
整数、数値、自動計算フィールド以外ではnullが入ります。
 */
export type FormFieldDelimited = boolean | null

/**
 * 単位（接頭辞）
 */
export type FormFieldPrefix = string | null

/**
 * 単位（接尾辞）
 */
export type FormFieldSuffix = string | null

/**
 * 隠しフィールドである場合true
 */
export type FormFieldHidden = boolean | null

/**
 * trueの時、申請者・承認者が画面上から値を入力することを禁止します。
外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。
 */
export type FormFieldReadonlyOnUi = boolean | null

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
  /** 説明 */
  description: FormFieldDescription
  /** フィールドの型 */
  fieldType: FormFieldFieldType
  /** 必須項目かどうか */
  required: boolean
  /** 承認者が編集可能かどうか */
  approver: boolean
  /** 申請者が編集可能かどうか */
  author?: boolean
  /** 選択肢のリスト。型がcheckboxまたはpull_downのときのみ値が入ります。 */
  options: FormFieldOptions
  /**
   * コード
   * @maxLength 100
   */
  code: string
  /** フォームサイズ。fullの場合全幅、halfの場合1/2になります。 */
  size: FormFieldSize
  /** 正規表現フォーマット */
  regexpFormat: FormFieldRegexpFormat
  /** 計算式。
型がcalculationのときのみ値が入ります。 */
  formula: FormFieldFormula
  /** 初期値 */
  defaultValue: FormFieldDefaultValue
  /** 最小値 */
  minValue: FormFieldMinValue
  /** 最大値 */
  maxValue: FormFieldMaxValue
  /**
   * 最小文字数
   * @minimum 0
   */
  minLength: FormFieldMinLength
  /**
   * 最大文字数
   * @minimum 0
   */
  maxLength: FormFieldMaxLength
  /**
   * 小数の桁数
   * @minimum 0
   */
  decimalDigit: FormFieldDecimalDigit
  /** カンマ区切りで表示する場合true。
整数、数値、自動計算フィールド以外ではnullが入ります。 */
  delimited: FormFieldDelimited
  /** 単位（接頭辞） */
  prefix: FormFieldPrefix
  /** 単位（接尾辞） */
  suffix: FormFieldSuffix
  /** 隠しフィールドである場合true */
  hidden?: FormFieldHidden
  /** trueの時、申請者・承認者が画面上から値を入力することを禁止します。
外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。 */
  readonlyOnUi?: FormFieldReadonlyOnUi
}

/**
 * 汎用マスタ（汎用マスタフィールドの場合）
 */
export type FormFieldDetailAllOfGeneralMaster = GeneralMaster | null

/**
 * 初期値（汎用マスタフィールドの場合）
 */
export type FormFieldDetailAllOfDefaultGeneralMasterItem =
  GeneralMasterItem | null

/**
 * 外部API設定。fieldTypeがbutton_apiのときのみ値が入ります。
 */
export type FormFieldDetailAllOfExternalApiSetting = ExternalApiSetting | null

/**
 * 外部API設定。fieldTypeがbutton_kintoneのときのみ値が入ります。
 */
export type FormFieldDetailAllOfKintoneAppSetting = KintoneAppSetting | null

/**
 * ClimberCloud連携設定。fieldTypeがfileのときのみ値が入ります。
 */
export type FormFieldDetailAllOfClimberCloudSetting = ClimberCloudSetting | null

/**
 * 汎用マスタ型フィールドの自動絞り込みの設定
 */
export type FormFieldDetailAllOfGeneralMasterSearchFilters =
  | GeneralMasterSearchFilter[]
  | null

export type FormFieldDetailAllOf = {
  /** 汎用マスタ（汎用マスタフィールドの場合） */
  generalMaster?: FormFieldDetailAllOfGeneralMaster
  /** 初期値（汎用マスタフィールドの場合） */
  defaultGeneralMasterItem?: FormFieldDetailAllOfDefaultGeneralMasterItem
  /** 外部API設定。fieldTypeがbutton_apiのときのみ値が入ります。 */
  externalApiSetting?: FormFieldDetailAllOfExternalApiSetting
  /** 外部API設定。fieldTypeがbutton_kintoneのときのみ値が入ります。 */
  kintoneAppSetting?: FormFieldDetailAllOfKintoneAppSetting
  /** ClimberCloud連携設定。fieldTypeがfileのときのみ値が入ります。 */
  climberCloudSetting?: FormFieldDetailAllOfClimberCloudSetting
  /** 汎用マスタ型フィールドの自動絞り込みの設定 */
  generalMasterSearchFilters?: FormFieldDetailAllOfGeneralMasterSearchFilters
}

/**
 * フォームフィールドの詳細
 */
export type FormFieldDetail = FormField & FormFieldDetailAllOf

/**
 * HTTPメソッド
 */
export type ExternalApiSettingHttpMethod =
  (typeof ExternalApiSettingHttpMethod)[keyof typeof ExternalApiSettingHttpMethod]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

/**
 * 複数レコードを含む場合の配列へのJSONPath
 */
export type ExternalApiSettingArrayJsonPath = string | null

/**
 * 選択用テーブルでのタイトル
 */
export type ExternalApiSettingMappingsItemTitle = string | null

export type ExternalApiSettingMappingsItem = {
  formField: FormField
  /** 値抽出用のJSONPath */
  jsonPath: string
  /** 選択用テーブルで表示する場合true */
  displayInTable: boolean
  /** 選択用テーブルでのタイトル */
  title: ExternalApiSettingMappingsItemTitle
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
  /** リクエストヘッダー */
  headers: ExternalApiSettingHeadersItem[]
  /** レスポンスが複数レコードを含む場合true */
  responseArray: boolean
  /** 複数レコードを含む場合の配列へのJSONPath */
  arrayJsonPath: ExternalApiSettingArrayJsonPath
  /** フィールドへのマッピング設定 */
  mappings: ExternalApiSettingMappingsItem[]
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
  /** ファイル付きリストID */
  contentsId?: string
  formField?: FormField
  /** ClimberCloudのカラムとのマッピング設定 */
  mappings: ClimberCloudSettingMappingsItem[]
}

/**
 * フィールドの型
 */
export type SlipFieldFieldType =
  (typeof SlipFieldFieldType)[keyof typeof SlipFieldFieldType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
} as const

/**
 * 正規表現フォーマット
 */
export type SlipFieldRegexpFormat = string | null

/**
 * 計算式。型が自動計算のときのみ値が入ります。
 */
export type SlipFieldFormula = string | null

/**
 * 最大値
 */
export type SlipFieldMaxValue = number | null

/**
 * 最小値
 */
export type SlipFieldMinValue = number | null

/**
 * 初期値
 */
export type SlipFieldDefaultValue = string | null

/**
 * 小数の桁数
 */
export type SlipFieldDecimalDigit = number | null

/**
 * カンマ区切りで表示する場合true。
整数、数値、自動計算フィールド以外ではnullが入ります。
 */
export type SlipFieldDelimited = boolean | null

/**
 * 単位（接頭辞）
 */
export type SlipFieldPrefix = string | null

/**
 * 単位（接尾辞）
 */
export type SlipFieldSuffix = string | null

/**
 * 隠しフィールドである場合true
 */
export type SlipFieldHidden = boolean | null

/**
 * trueの時、申請者・承認者が画面上から値を入力することを禁止します。
外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。
 */
export type SlipFieldReadonlyOnUi = boolean | null

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
  /** 正規表現フォーマット */
  regexpFormat: SlipFieldRegexpFormat
  /** 計算式。型が自動計算のときのみ値が入ります。 */
  formula: SlipFieldFormula
  /** 最大値 */
  maxValue: SlipFieldMaxValue
  /** 最小値 */
  minValue: SlipFieldMinValue
  /** 初期値 */
  defaultValue: SlipFieldDefaultValue
  /** 小数の桁数 */
  decimalDigit: SlipFieldDecimalDigit
  /** カンマ区切りで表示する場合true。
整数、数値、自動計算フィールド以外ではnullが入ります。 */
  delimited: SlipFieldDelimited
  /** 添付可能な拡張子リスト */
  allowedExtensions: string[]
  /** 単位（接頭辞） */
  prefix: SlipFieldPrefix
  /** 単位（接尾辞） */
  suffix: SlipFieldSuffix
  /** 承認者が編集可能かどうか */
  approver: boolean
  /** 申請者が編集可能かどうか */
  author?: boolean
  /** 隠しフィールドである場合true */
  hidden?: SlipFieldHidden
  /** trueの時、申請者・承認者が画面上から値を入力することを禁止します。
外部API連携（ボタン）による代入や、REST API経由での入力はこのオプションの対象外です。 */
  readonlyOnUi?: SlipFieldReadonlyOnUi
}

/**
 * 汎用マスタ。型が汎用マスタのときのみ値が入ります。
 */
export type SlipFieldDetailAllOfGeneralMaster = GeneralMaster | null

/**
 * 汎用マスタアイテムの初期値
 */
export type SlipFieldDetailAllOfDefaultGeneralMasterItem =
  GeneralMasterItem | null

export type SlipFieldDetailAllOf = {
  /** 汎用マスタ。型が汎用マスタのときのみ値が入ります。 */
  generalMaster?: SlipFieldDetailAllOfGeneralMaster
  /** 汎用マスタアイテムの初期値 */
  defaultGeneralMasterItem?: SlipFieldDetailAllOfDefaultGeneralMasterItem
}

/**
 * 明細フィールドの詳細
 */
export type SlipFieldDetail = SlipField & SlipFieldDetailAllOf

/**
 * 経路分岐タイプ
 */
export type WorkflowRouteConditionConditionType =
  (typeof WorkflowRouteConditionConditionType)[keyof typeof WorkflowRouteConditionConditionType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const WorkflowRouteConditionCombinationType = {
  all: 'all',
  any: 'any',
  custom: 'custom',
} as const

/**
 * 経路。routeまたはerrorMessageは片方のみ値が入ります。
 */
export type WorkflowRouteConditionRoute = Route | null

/**
 * 申請拒否時のエラーメッセージ。routeまたはerrorMessageは片方のみ値が入ります。
 */
export type WorkflowRouteConditionErrorMessage = string | null

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
  route: WorkflowRouteConditionRoute
  /** 条件 */
  conditionFields: WorkflowRouteConditionField[]
  /** 申請拒否時のエラーメッセージ。routeまたはerrorMessageは片方のみ値が入ります。 */
  errorMessage: WorkflowRouteConditionErrorMessage
}

/**
 * 演算子
 */
export type WorkflowRouteConditionFieldSymbol =
  (typeof WorkflowRouteConditionFieldSymbol)[keyof typeof WorkflowRouteConditionFieldSymbol]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
 * しきい値
 */
export type WorkflowRouteConditionFieldValue = string | null

/**
 * しきい値として使う役職
 */
export type WorkflowRouteConditionFieldGrade = Grade | null

/**
 * しきい値として使うチーム
 */
export type WorkflowRouteConditionFieldTeam = Team | null

/**
 * しきい値として使う汎用マスタアイテム
 */
export type WorkflowRouteConditionFieldGeneralMasterItem =
  GeneralMasterItem | null

/**
 * ワークフロー経路分岐の条件
 */
export interface WorkflowRouteConditionField {
  /** UUID */
  id: string
  /** 演算子 */
  symbol: WorkflowRouteConditionFieldSymbol
  /** しきい値 */
  value: WorkflowRouteConditionFieldValue
  /** 対象のフォームフィールド */
  formField: FormField
  /** しきい値として使う役職 */
  grade: WorkflowRouteConditionFieldGrade
  /** しきい値として使うチーム */
  team: WorkflowRouteConditionFieldTeam
  /** しきい値として使う汎用マスタアイテム */
  generalMasterItem: WorkflowRouteConditionFieldGeneralMasterItem
}

/**
 * ユーザー。ユーザーとチームは片方のみ値が入ります。
 */
export type WorkflowTicketViewerUser = User | null

/**
 * チーム。ユーザーとチームは片方のみ値が入ります。
 */
export type WorkflowTicketViewerTeam = Team | null

/**
 * 役職。チーム指定で役職も指定する場合のみ値が入ります。
 */
export type WorkflowTicketViewerGrade = Grade | null

/**
 * ワークフロー単位で設定された共有ユーザー
 */
export interface WorkflowTicketViewer {
  /** UUID */
  id: string
  /** ユーザー。ユーザーとチームは片方のみ値が入ります。 */
  user: WorkflowTicketViewerUser
  /** チーム。ユーザーとチームは片方のみ値が入ります。 */
  team: WorkflowTicketViewerTeam
  /** 役職。チーム指定で役職も指定する場合のみ値が入ります。 */
  grade: WorkflowTicketViewerGrade
}

/**
 * ステータス
 */
export type RouteStatus = (typeof RouteStatus)[keyof typeof RouteStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RouteStatus = {
  visible: 'visible',
  deleted: 'deleted',
  error: 'error',
} as const

/**
 * 作成者
 */
export type RouteAuthor = User | null

export type RouteVersionAuthor = User | null

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
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** 作成者 */
  author?: RouteAuthor
  versionAuthor?: RouteVersionAuthor
  /** フォルダ */
  folder: Folder
}

export type RouteDetailAllOf = {
  /** 経路ステップ */
  steps: RouteStep[]
}

/**
 * 経路の詳細情報
 */
export type RouteDetail = Route & RouteDetailAllOf

/**
 * ステップのタイプ
 */
export type RouteStepStepType =
  (typeof RouteStepStepType)[keyof typeof RouteStepStepType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RouteStepActionType = {
  approve: 'approve',
  confirm: 'confirm',
  none: 'none',
} as const

/**
 * 承認者への指示
 */
export type RouteStepInstruction = string | null

/**
 * フォールバックのタイプ
 */
export type RouteStepFallbackType =
  | 'direct_manager'
  | 'higher_manager'
  | 'skip'
  | 'no_fallback'
  | 'higher_team'
  | null

/**
 * 最小指名人数。「申請者が指名」ステップのみ設定可能。
 * @minimum 0
 */
export type RouteStepMinCustomAssignees = number | null

/**
 * 承認者の選び方
 */
export type RouteStepApproverAssignmentInstruction = string | null

export type RouteStepRouteStepCondition = RouteStepCondition | null

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
  /** 承認者への指示 */
  instruction: RouteStepInstruction
  /** 必要な承認人数 */
  requiredApprovalsNumber: number
  /** 必要な承認割合（%） */
  requiredApprovalsPercent: number
  /** フォールバックのタイプ */
  fallbackType: RouteStepFallbackType
  /** 自己承認を許可するか */
  allowSelfApproval: boolean
  /**
   * 最小指名人数。「申請者が指名」ステップのみ設定可能。
   * @minimum 0
   */
  minCustomAssignees: RouteStepMinCustomAssignees
  /** 承認者の選び方 */
  approverAssignmentInstruction: RouteStepApproverAssignmentInstruction
  /** 承認者の指定に使うユーザーの配列 */
  users: User[]
  /** 承認者の指定に使うチームと役職の条件 */
  targets?: RouteStepTarget[]
  routeStepCondition?: RouteStepRouteStepCondition
  /** コード */
  code: string
}

/**
 * 役職の比較条件。役職が指定されているときのみ値が入ります。
 */
export type RouteStepTargetGradeSymbol =
  (typeof RouteStepTargetGradeSymbol)[keyof typeof RouteStepTargetGradeSymbol]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RouteStepTargetGradeSymbol = {
  equal: 'equal',
  greater_than: 'greater_than',
  greater_than_or_equal: 'greater_than_or_equal',
  less_than: 'less_than',
  less_than_or_equal: 'less_than_or_equal',
  any_of: 'any_of',
} as const

export interface RouteStepTarget {
  team?: Team
  /** stepType=author_customizableまたはstepType=assignee_customizableの場合に、指定したチームの下位チームのメンバーも承認者候補に含めるかどうか（true: 含める、false: 含めない） */
  descendants?: boolean
  /** 役職の比較条件。役職が指定されているときのみ値が入ります。 */
  gradeSymbol?: RouteStepTargetGradeSymbol
  /** 承認者の指定に使う役職の配列 */
  grades?: Grade[]
  /** 承認者タイプ「チームを動的に指定」または「ユーザーを動的に指定」で指定する変数名が入ります。 */
  variable?: string
}

/**
 * 実行タイプ
 */
export type RouteStepConditionConditionType =
  (typeof RouteStepConditionConditionType)[keyof typeof RouteStepConditionConditionType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RouteStepConditionCombinationType = {
  all: 'all',
  any: 'any',
} as const

export type RouteStepConditionRouteStepConditionFields =
  | RouteStepConditionField
  | unknown

/**
 * ステップごとに設定できる実行条件
 */
export interface RouteStepCondition {
  /** UUID */
  id?: string
  /** 実行タイプ */
  conditionType?: RouteStepConditionConditionType
  /** 条件の組み合わせタイプ */
  combinationType?: RouteStepConditionCombinationType
  routeStepConditionFields?: RouteStepConditionRouteStepConditionFields
}

/**
 * 変数のフィールド
 */
export type RouteStepConditionFieldFieldKey =
  (typeof RouteStepConditionFieldFieldKey)[keyof typeof RouteStepConditionFieldFieldKey]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
 * ステップごとに設定できる実行条件の詳細
 */
export interface RouteStepConditionField {
  /** UUID */
  id?: string
  /** 変数 */
  variable?: string
  /** 変数のフィールド */
  fieldKey?: RouteStepConditionFieldFieldKey
  /** 演算子 */
  symbol?: RouteStepConditionFieldSymbol
  /** しきい値 */
  value?: string
  /** しきい値として使う役職 */
  grade?: Grade
  /** しきい値として使うチーム */
  team?: Team
  /** しきい値として使う汎用マスタアイテム */
  generalMasterItem?: GeneralMasterItem
}

/**
 * チケット番号
 */
export type TicketTicketNumber = string | null

/**
 * タイトル
 */
export type TicketTitle = string | null

/**
 * ステータス
 */
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
 * サブステータス。処理中のみ値が入ります。
 */
export type TicketSubStatus = SubStatus | null

/**
 * 申請者。代理申請の場合、代理人が入ります。外部ゲストの場合はnullになります。
 */
export type TicketAuthor = User | null

/**
 * 代理申請を依頼したユーザー。代理申請の場合のみ値が入ります。
 */
export type TicketProxyClientUser = User | null

/**
 * 申請日時
 */
export type TicketOpenedAt = string | null

/**
 * 完了日時
 */
export type TicketCompletedAt = string | null

/**
 * アーカイブ日時
 */
export type TicketArchivedAt = string | null

/**
 * チケットの共有範囲の上書き設定
 */
export type TicketForcedPublicType =
  (typeof TicketForcedPublicType)[keyof typeof TicketForcedPublicType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TicketForcedPublicType = {
  follow_workflow: 'follow_workflow',
  forced_public: 'forced_public',
  forced_private: 'forced_private',
} as const

/**
 * このチケットのワークフロー情報。チケットを一件だけ取得した場合のみ、セクションや共有ユーザーを含むより詳細なワークフロー情報が入ります。
 */
export type TicketWorkflow = Workflow | WorkflowInTicket

/**
 * チケット
 */
export interface Ticket {
  /** UUID */
  id: string
  /** チケット番号 */
  ticketNumber: TicketTicketNumber
  /** タイトル */
  title?: TicketTitle
  /** ステータス */
  status: TicketStatus
  /** サブステータス。処理中のみ値が入ります。 */
  subStatus?: TicketSubStatus
  /**
   * 現在のステップ。0が起票者、1が最初の承認ステップ。
   * @minimum 0
   */
  currentStep: number
  /** 申請者。代理申請の場合、代理人が入ります。外部ゲストの場合はnullになります。 */
  author: TicketAuthor
  /** 代理申請を依頼したユーザー。代理申請の場合のみ値が入ります。 */
  proxyClientUser: TicketProxyClientUser
  /** 作成日時 */
  createdAt: string
  /** 申請日時 */
  openedAt: TicketOpenedAt
  /** 完了日時 */
  completedAt: TicketCompletedAt
  /** アーカイブ日時 */
  archivedAt: TicketArchivedAt
  /** 更新日時 */
  updatedAt: string
  /** チケットがテナント全体に共有の場合true */
  publicStatus: boolean
  /** チケットの共有範囲の上書き設定 */
  forcedPublicType: TicketForcedPublicType
  /** このチケットのワークフロー情報。チケットを一件だけ取得した場合のみ、セクションや共有ユーザーを含むより詳細なワークフロー情報が入ります。 */
  workflow: TicketWorkflow
  /** チケットのラベルの配列 */
  labels: Label[]
}

export type TicketWithStepAllOf = {
  /** ステップの配列 */
  steps: TicketStep[]
}

export type TicketWithStep = Ticket & TicketWithStepAllOf

/**
 * 申請者の所属チーム. 外部ゲストの場合はnullになります。
 */
export type TicketDetailAllOfAuthorTeam = Team | null

/**
 * このチケットの承認経路。申請拒否状態の場合、nullになります。
 */
export type TicketDetailAllOfRoute = RouteDetail | null

/**
 * 元のチケット（パイプラインで作成されたときのみ値が入ります）
 */
export type TicketDetailAllOfTriggerTicket = Ticket | null

/**
 * クラウドサイン書類のステータス
 */
export type TicketDetailAllOfCloudSignDocumentAnyOfStatus =
  (typeof TicketDetailAllOfCloudSignDocumentAnyOfStatus)[keyof typeof TicketDetailAllOfCloudSignDocumentAnyOfStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TicketDetailAllOfCloudSignDocumentAnyOfStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
  template: 'template',
  imported: 'imported',
  completed: 'completed',
} as const

export type TicketDetailAllOfCloudSignDocumentAnyOf = {
  /** UUID */
  id: string
  /** クラウドサイン書類のID */
  documentId: string
  /** クラウドサイン書類のタイトル */
  documentTitle: string
  /** クラウドサイン書類のステータス */
  status: TicketDetailAllOfCloudSignDocumentAnyOfStatus
  /** クラウドサインがサンドボックス環境の場合true */
  sandbox: boolean
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
  /** クラウドサイン書類のURL */
  url: string
}

/**
 * 添付されたクラウドサインの書類
 */
export type TicketDetailAllOfCloudSignDocument =
  null | TicketDetailAllOfCloudSignDocumentAnyOf

export type TicketDetailAllOf = {
  /** 申請者の所属チーム. 外部ゲストの場合はnullになります。 */
  authorTeam: TicketDetailAllOfAuthorTeam
  /** このチケットの承認経路。申請拒否状態の場合、nullになります。 */
  route: TicketDetailAllOfRoute
  /** 元のチケット（パイプラインで作成されたときのみ値が入ります） */
  triggerTicket?: TicketDetailAllOfTriggerTicket
  /** 次のチケット（パイプラインで次のチケットを作成したときのみ値が入ります） */
  nextTickets?: Ticket[]
  /** 明細の入力 */
  slipItems: SlipItem[]
  /** セクションの配列 */
  ticketSections: TicketSection[]
  /** フォームの入力 */
  inputs: TicketInput[]
  /** 添付されたクラウドサインの書類 */
  cloudSignDocument: TicketDetailAllOfCloudSignDocument
  /** チケットのステップ */
  steps: TicketStep[]
}

/**
 * チケットの詳細
 */
export type TicketDetail = Ticket & TicketDetailAllOf

export type TicketInputValueAnyOf = string | null

export type TicketInputValueAnyOfTwo = unknown[] | null

export type TicketInputValueAnyOfThree = number | null

export type TicketInputValueAnyOfFour = number | null

/**
 * 入力値
フィールドの型が汎用マスタアイテム、ユーザー、チーム、チケットの場合、JSON Arrayがキャッシュとして保存されます。
 */
export type TicketInputValue =
  | TicketInputValueAnyOf
  | TicketInputValueAnyOfTwo
  | TicketInputValueAnyOfThree
  | TicketInputValueAnyOfFour

/**
 * チケットのフォーム入力
 */
export interface TicketInput {
  /** UUID */
  id: string
  /** 入力値
フィールドの型が汎用マスタアイテム、ユーザー、チーム、チケットの場合、JSON Arrayがキャッシュとして保存されます。 */
  value: TicketInputValue
  formField?: FormField
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
  /** ワークフローのセクションID */
  sectionId: string
  /** セクションの表示状態 */
  visible: boolean
  /** このセクションの入力の配列 */
  inputs: TicketInput[]
}

/**
 * 経路ステップのUUID。カスタムステップの場合、nullになります。
 */
export type TicketStepRouteStepId = string | null

/**
 * ステップのタイトル
 */
export type TicketStepTitle = string | null

/**
 * アクションタイプ。承認/差し戻しの場合approve、回覧（確認あり）の場合confirm、回覧（確認なし）の場合noneになります。
 */
export type TicketStepActionType =
  (typeof TicketStepActionType)[keyof typeof TicketStepActionType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TicketStepActionType = {
  approve: 'approve',
  confirm: 'confirm',
  none: 'none',
} as const

/**
 * フォールバックの結果
 */
export type TicketStepFallbackResult =
  | 'direct_manager'
  | 'higher_manager'
  | 'skip'
  | 'no_fallback'
  | 'higher_team'
  | null

/**
 * 承認ステップの作成者。カスタムステップの場合のみ、値が入ります。
 */
export type TicketStepAuthor = User | null

/**
 * ステップが完了した日時。過去のデータではnullを返します。
 */
export type TicketStepCompletedAt = string | null

/**
 * チケット承認ステップ
 */
export interface TicketStep {
  /** UUID */
  id: string
  /** 経路ステップのUUID。カスタムステップの場合、nullになります。 */
  routeStepId: TicketStepRouteStepId
  /** ステップのタイトル */
  title: TicketStepTitle
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
  author: TicketStepAuthor
  /** 承認者 */
  assignees: TicketAssignee[]
  /** ステップが完了している場合true */
  completed: boolean
  /** ステップが完了した日時。過去のデータではnullを返します。 */
  completedAt: TicketStepCompletedAt
}

/**
 * 承認日時。古いデータではnullを返します。
 */
export type TicketAssigneeCompletedAt = string | null

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
  /** 承認日時。古いデータではnullを返します。 */
  completedAt: TicketAssigneeCompletedAt
  /** 承認を保留中の場合true */
  pending: boolean
  user: User
}

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
 * 入力値

フィールドの型が汎用マスタアイテムの場合、JSON Arrayがキャッシュとして保存されます。
 */
export type SlipItemInputValue = string | unknown[] | number | number | null

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
  /** 入力値

フィールドの型が汎用マスタアイテムの場合、JSON Arrayがキャッシュとして保存されます。 */
  value: SlipItemInputValue
  /** 入力値: 汎用マスタアイテム */
  generalMasterItems: GeneralMasterItem[]
  /** 入力値: ユーザー */
  users?: User[]
  /** 入力値: チーム */
  teams?: Team[]
  /** 入力値: チケット */
  inputTickets?: Ticket[]
  /** 添付ファイル */
  attachments: Attachment[]
}

/**
 * 説明
 */
export type LabelDescription = string | null

/**
 * ラベル
 */
export interface Label {
  /** UUID */
  id: string
  /** 名前 */
  name: string
  /** 説明 */
  description: LabelDescription
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
 * 説明
 */
export type SubStatusNotes = string | null

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
  /** 説明 */
  notes: SubStatusNotes
  /** 作成日時 */
  createdAt: string
  /** 更新日時 */
  updatedAt: string
}

export type TicketViewerUser = User | null

export type TicketViewerTeam = Team | null

export type TicketViewerGrade = Grade | null

/**
 * チケットの共有ユーザー
 */
export interface TicketViewer {
  /** UUID */
  id: string
  user: TicketViewerUser
  team: TicketViewerTeam
  grade: TicketViewerGrade
  /** 下位のチームを含めるかどうか */
  descendants: boolean
}

/**
 * 削除日時
 */
export type CommentDeletedAt = string | null

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
  /** 削除日時 */
  deletedAt: CommentDeletedAt
  user: User
  /** メンションしたユーザーの配列 */
  mentionedUsers: User[]
}

/**
 * 操作ユーザー。システムによる操作の場合はnull。
 */
export type AuditLogUser = User | null

/**
 * 操作データ
 */
export type AuditLogDataAnyOf = { [key: string]: unknown }

/**
 * 操作データ
 */
export type AuditLogData = AuditLogDataAnyOf | null

/**
 * リモートIPアドレス
 */
export type AuditLogRemoteIp = string | null

/**
 * システムによる操作種別
 */
export type AuditLogSystemType = 'automation' | null

/**
 * 監査ログ
 */
export interface AuditLog {
  /** UUID */
  id: string
  /** 操作ユーザー。システムによる操作の場合はnull。 */
  user: AuditLogUser
  /** 操作種別 */
  action: string
  /** 操作データ */
  data: AuditLogData
  /** リモートIPアドレス */
  remoteIp: AuditLogRemoteIp
  /** システムによる操作種別 */
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
  ticket?: TicketWithStep
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
  /** フィールドへのマッピング設定 */
  mappings: KintoneAppSettingMappingsItem[]
}

/**
 * 絞り込み先のフィールドのタイプ
 */
export type GeneralMasterSearchFilterFieldType =
  (typeof GeneralMasterSearchFilterFieldType)[keyof typeof GeneralMasterSearchFilterFieldType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GeneralMasterSearchFilterFieldType = {
  free_word: 'free_word',
  name: 'name',
  code: 'code',
  description: 'description',
  custom_field: 'custom_field',
} as const

/**
 * fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID）
 */
export type GeneralMasterSearchFilterGeneralMasterFieldId = string | null

export interface GeneralMasterSearchFilter {
  /** UUID */
  id: string
  /** 絞り込みに使う汎用フィールドのID（UUID） */
  filterFormFieldId: string
  /** 絞り込み先のフィールドのタイプ */
  fieldType: GeneralMasterSearchFilterFieldType
  /** fieldType=custom_fieldの場合に絞り込み先の汎用マスタのカスタムフィールドのID（UUID） */
  generalMasterFieldId: GeneralMasterSearchFilterGeneralMasterFieldId
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
export type UnprocessableContentResponseAllOfErrors = {
  [key: string]: string[]
}

export type UnprocessableContentResponseAllOf = {
  /** バリデーションエラーの詳細 */
  errors?: UnprocessableContentResponseAllOfErrors
}

export type UnprocessableContentResponse = ErrorResponse &
  UnprocessableContentResponseAllOf

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

/**
 * 親フォルダのID
 */
export type CreateFolderBodyParentFolderId = string | null

export type CreateFolderBody = {
  /** 名前 */
  name: string
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** フォルダの説明 */
  description?: string
  /** 親フォルダのID */
  parentFolderId?: CreateFolderBodyParentFolderId
}

/**
 * 親フォルダのID
 */
export type UpdateFolderBodyParentFolderId = string | null

export type UpdateFolderBody = {
  /** 名前 */
  name?: string
  /** コード */
  code?: string
  /** フォルダの説明 */
  description?: string
  /** 親フォルダのID */
  parentFolderId?: UpdateFolderBodyParentFolderId
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
 * コード。未指定の場合、ランダムな英数字が自動的に設定されます。
 */
export type CreateGeneralMasterBodyCode = string | null

/**
 * 説明
 */
export type CreateGeneralMasterBodyDescription = string | null

/**
 * フィールドの説明
 */
export type CreateGeneralMasterBodyFieldsItemDescription = string | null

/**
 * フィールドの型
 */
export type CreateGeneralMasterBodyFieldsItemFieldType =
  (typeof CreateGeneralMasterBodyFieldsItemFieldType)[keyof typeof CreateGeneralMasterBodyFieldsItemFieldType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateGeneralMasterBodyFieldsItemFieldType = {
  text: 'text',
  text_long: 'text_long',
  number: 'number',
  integer: 'integer',
  checkbox: 'checkbox',
  pull_down: 'pull_down',
  date: 'date',
} as const

/**
 * 選択肢。fieldTypeがcheckboxまたはpull_downのとき必須。
 */
export type CreateGeneralMasterBodyFieldsItemOptions = string[] | null

export type CreateGeneralMasterBodyFieldsItem = {
  /** フィールド名 */
  title: string
  /** フィールドの説明 */
  description?: CreateGeneralMasterBodyFieldsItemDescription
  /** フィールドのコード */
  code: string
  /** 入力必須かどうか */
  required: boolean
  /** フィールドの型 */
  fieldType: CreateGeneralMasterBodyFieldsItemFieldType
  /** 選択肢。fieldTypeがcheckboxまたはpull_downのとき必須。 */
  options?: CreateGeneralMasterBodyFieldsItemOptions
  /** 管理者以外も閲覧可能な場合true */
  visible?: boolean
}

export type CreateGeneralMasterBody = {
  /** 名前 */
  name: string
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: CreateGeneralMasterBodyCode
  /** 説明 */
  description?: CreateGeneralMasterBodyDescription
  /** カスタムフィールドの配列 */
  fields?: CreateGeneralMasterBodyFieldsItem[]
}

/**
 * フィールドの説明
 */
export type UpdateGeneralMasterBodyFieldsItemDescription = string | null

/**
 * 選択肢。fieldTypeがcheckboxまたはpull_downのときのみ必須。
 */
export type UpdateGeneralMasterBodyFieldsItemOptions = string[] | null

export type UpdateGeneralMasterBodyFieldsItem = {
  /** フィールド名 */
  title?: string
  /** フィールドの説明 */
  description?: UpdateGeneralMasterBodyFieldsItemDescription
  /** フィールドのコード */
  code: string
  /** 入力必須かどうか */
  required?: boolean
  /** フィールドの型 */
  fieldType?: string
  /** 選択肢。fieldTypeがcheckboxまたはpull_downのときのみ必須。 */
  options?: UpdateGeneralMasterBodyFieldsItemOptions
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

/**
 * 有効期限の開始日
 */
export type CreateGeneralMasterItemBodyStartsOn = string | null

/**
 * 有効期限の終了日
 */
export type CreateGeneralMasterItemBodyEndsOn = string | null

export type CreateGeneralMasterItemBodyInputsItemValueOneOf = string | null

/**
 * 入力値。カスタムフィールドがcheckboxの場合は文字列の配列、それ以外は文字列。
 */
export type CreateGeneralMasterItemBodyInputsItemValue =
  | CreateGeneralMasterItemBodyInputsItemValueOneOf
  | string[]

export type CreateGeneralMasterItemBodyInputsItem = {
  /** フィールドのコード */
  code: string
  /** 入力値。カスタムフィールドがcheckboxの場合は文字列の配列、それ以外は文字列。 */
  value: CreateGeneralMasterItemBodyInputsItemValue
}

export type CreateGeneralMasterItemBody = {
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 名前 */
  name: string
  /** 説明 */
  description?: string
  /** 有効期限の開始日 */
  startsOn?: CreateGeneralMasterItemBodyStartsOn
  /** 有効期限の終了日 */
  endsOn?: CreateGeneralMasterItemBodyEndsOn
  /** カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。 */
  inputs: CreateGeneralMasterItemBodyInputsItem[]
}

/**
 * 有効期限の開始日
 */
export type UpdateGeneralMasterItemBodyStartsOn = string | null

/**
 * 有効期限の終了日
 */
export type UpdateGeneralMasterItemBodyEndsOn = string | null

export type UpdateGeneralMasterItemBodyInputsItemValueOneOf = string | null

/**
 * 入力値。カスタムフィールドがcheckboxの場合文字列の配列、それ以外の場合文字列。
 */
export type UpdateGeneralMasterItemBodyInputsItemValue =
  | UpdateGeneralMasterItemBodyInputsItemValueOneOf
  | string[]

export type UpdateGeneralMasterItemBodyInputsItem = {
  /** フィールドのコード */
  code: string
  /** 入力値。カスタムフィールドがcheckboxの場合文字列の配列、それ以外の場合文字列。 */
  value: UpdateGeneralMasterItemBodyInputsItemValue
}

export type UpdateGeneralMasterItemBody = {
  /** コード。未指定の場合、ランダムな英数字が自動的に設定されます。 */
  code?: string
  /** 名前 */
  name?: string
  /** 説明 */
  description?: string
  /** 有効期限の開始日 */
  startsOn?: UpdateGeneralMasterItemBodyStartsOn
  /** 有効期限の終了日 */
  endsOn?: UpdateGeneralMasterItemBodyEndsOn
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
    | ListTicketsStatusOneOfItem[]
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
   */
  stepTitle?: string
}

export type ListTicketsStatusOneOfItem =
  (typeof ListTicketsStatusOneOfItem)[keyof typeof ListTicketsStatusOneOfItem]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListTicketsStatusOneOfItem = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
  completed: 'completed',
  denied: 'denied',
  archived: 'archived',
} as const

export type ListTicketsAssigneeStatusItem =
  (typeof ListTicketsAssigneeStatusItem)[keyof typeof ListTicketsAssigneeStatusItem]

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateTicketBodyStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
} as const

/**
 * 依頼者となるユーザーのUUID。代理申請の場合のみ指定してください。
 */
export type CreateTicketBodyProxyClientUserId = string | null

/**
 * チケットのタイトル。ワークフローでtitleInputModeがinputのときのみ設定可能です。
 */
export type CreateTicketBodyTitle = string | null

/**
 * 明細セクションのUUID。
 */
export type CreateTicketBodySlipItemsItemSlipSectionId = string | null

/**
 * 明細フィールドのUUID。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
 */
export type CreateTicketBodySlipItemsItemInputsItemSlipFieldId = string | null

/**
 * 明細フィールドのコード。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
 */
export type CreateTicketBodySlipItemsItemInputsItemSlipFieldCode = string | null

export type CreateTicketBodySlipItemsItemInputsItemValueOneOf = string | null

/**
 * 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。
 */
export type CreateTicketBodySlipItemsItemInputsItemValue =
  | CreateTicketBodySlipItemsItemInputsItemValueOneOf
  | string[]

export type CreateTicketBodySlipItemsItemInputsItemGeneralMasterItemIdOneOf =
  | string
  | null

/**
 * 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。
 */
export type CreateTicketBodySlipItemsItemInputsItemGeneralMasterItemId =
  | CreateTicketBodySlipItemsItemInputsItemGeneralMasterItemIdOneOf
  | string[]

export type CreateTicketBodySlipItemsItemInputsItemUserIdOneOf = string | null

/**
 * ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。
 */
export type CreateTicketBodySlipItemsItemInputsItemUserId =
  | CreateTicketBodySlipItemsItemInputsItemUserIdOneOf
  | string[]

export type CreateTicketBodySlipItemsItemInputsItemTeamIdOneOf = string | null

/**
 * チームUUID。フィールドがチームタイプのときのみ指定してください。
 */
export type CreateTicketBodySlipItemsItemInputsItemTeamId =
  | CreateTicketBodySlipItemsItemInputsItemTeamIdOneOf
  | string[]

export type CreateTicketBodySlipItemsItemInputsItemTicketIdOneOf = string | null

/**
 * チケットUUID。フィールドがチケットタイプのときのみ指定してください。
 */
export type CreateTicketBodySlipItemsItemInputsItemTicketId =
  | CreateTicketBodySlipItemsItemInputsItemTicketIdOneOf
  | string[]

/**
 * 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。
 */
export type CreateTicketBodySlipItemsItemInputsItemFiles = string[] | null

/**
 * 明細アイテム入力
 */
export type CreateTicketBodySlipItemsItemInputsItem = {
  /** 明細フィールドのUUID。slipFieldIdまたはslipFieldCodeは片方のみ必須です。 */
  slipFieldId?: CreateTicketBodySlipItemsItemInputsItemSlipFieldId
  /** 明細フィールドのコード。slipFieldIdまたはslipFieldCodeは片方のみ必須です。 */
  slipFieldCode?: CreateTicketBodySlipItemsItemInputsItemSlipFieldCode
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: CreateTicketBodySlipItemsItemInputsItemValue
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: CreateTicketBodySlipItemsItemInputsItemGeneralMasterItemId
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: CreateTicketBodySlipItemsItemInputsItemUserId
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: CreateTicketBodySlipItemsItemInputsItemTeamId
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: CreateTicketBodySlipItemsItemInputsItemTicketId
  /** 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。 */
  files?: CreateTicketBodySlipItemsItemInputsItemFiles
}

/**
 * 明細アイテム
 */
export type CreateTicketBodySlipItemsItem = {
  /** 明細セクションのUUID。 */
  slipSectionId?: CreateTicketBodySlipItemsItemSlipSectionId
  /** 明細アイテム入力の配列 */
  inputs: CreateTicketBodySlipItemsItemInputsItem[]
}

/**
 * フォームフィールドのUUID。formFieldIdまたはformFieldCodeは片方のみ必須です。
 */
export type CreateTicketBodyInputsItemFormFieldId = string | null

/**
 * フォームフィールドのコード。formFieldIdまたはformFieldCodeは片方のみ必須です。
 */
export type CreateTicketBodyInputsItemFormFieldCode = string | null

export type CreateTicketBodyInputsItemValueOneOf = string | null

/**
 * 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。
 */
export type CreateTicketBodyInputsItemValue =
  | CreateTicketBodyInputsItemValueOneOf
  | string[]

export type CreateTicketBodyInputsItemGeneralMasterItemIdOneOf = string | null

/**
 * 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。
 */
export type CreateTicketBodyInputsItemGeneralMasterItemId =
  | CreateTicketBodyInputsItemGeneralMasterItemIdOneOf
  | string[]

export type CreateTicketBodyInputsItemUserIdOneOf = string | null

/**
 * ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。
 */
export type CreateTicketBodyInputsItemUserId =
  | CreateTicketBodyInputsItemUserIdOneOf
  | string[]

export type CreateTicketBodyInputsItemTeamIdOneOf = string | null

/**
 * チームUUID。フィールドがチームタイプのときのみ指定してください。
 */
export type CreateTicketBodyInputsItemTeamId =
  | CreateTicketBodyInputsItemTeamIdOneOf
  | string[]

export type CreateTicketBodyInputsItemTicketIdOneOf = string | null

/**
 * チケットUUID。フィールドがチケットタイプのときのみ指定してください。
 */
export type CreateTicketBodyInputsItemTicketId =
  | CreateTicketBodyInputsItemTicketIdOneOf
  | string[]

/**
 * 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。
 */
export type CreateTicketBodyInputsItemFiles = string[] | null

/**
 * フォームの入力
 */
export type CreateTicketBodyInputsItem = {
  /** フォームフィールドのUUID。formFieldIdまたはformFieldCodeは片方のみ必須です。 */
  formFieldId?: CreateTicketBodyInputsItemFormFieldId
  /** フォームフィールドのコード。formFieldIdまたはformFieldCodeは片方のみ必須です。 */
  formFieldCode?: CreateTicketBodyInputsItemFormFieldCode
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: CreateTicketBodyInputsItemValue
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: CreateTicketBodyInputsItemGeneralMasterItemId
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: CreateTicketBodyInputsItemUserId
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: CreateTicketBodyInputsItemTeamId
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: CreateTicketBodyInputsItemTicketId
  /** 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。 */
  files?: CreateTicketBodyInputsItemFiles
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

export type CreateTicketBodyApproversAnyOfItem = {
  /** 承認者を指定する経路ステップのコード */
  routeStepCode: string
  /** 承認者として指定するユーザーのUUID */
  userId: string[]
}

/**
 * 承認タイプが「申請者が指名」の経路ステップの承認者を指定する配列。
 */
export type CreateTicketBodyApprovers =
  | CreateTicketBodyApproversAnyOfItem[]
  | null

export type CreateTicketBody = {
  /** ステータス。作成ではdraftまたはin_progressのみ選択可能です。 */
  status: CreateTicketBodyStatus
  /** ワークフローのUUID */
  workflowId: string
  /** 申請チームのUUID */
  authorTeamId: string
  /** 依頼者となるユーザーのUUID。代理申請の場合のみ指定してください。 */
  proxyClientUserId?: CreateTicketBodyProxyClientUserId
  /** チケットのタイトル。ワークフローでtitleInputModeがinputのときのみ設定可能です。 */
  title?: CreateTicketBodyTitle
  /** 明細アイテムの配列。明細ワークフローの場合、このフィールドは必須です。 */
  slipItems?: CreateTicketBodySlipItemsItem[]
  /** フォームの入力の配列。ワークフローのすべてのフォームフィールドに対応する入力を入れてください。 */
  inputs: CreateTicketBodyInputsItem[]
  /** クラウドサイン書類。ワークフローでクラウドサイン連携が有効な場合のみ指定してください。 */
  cloudSignDocument?: CreateTicketBodyCloudSignDocument
  /** 承認タイプが「申請者が指名」の経路ステップの承認者を指定する配列。 */
  approvers?: CreateTicketBodyApprovers
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
   * ソート対象のフィールドと順序。指定可能なフィールド: createdAt, updatedAt
   * @pattern ^(createdAt|updatedAt)(-asc|-desc)?$
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
   * 現在の承認ステップ名
   */
  stepTitle?: string
  /**
 * 承認の保留状態でチケットを絞り込みます。
- true: 保留中のチケットのみを取得
- false: 保留されていないチケットのみを取得
 */
  pending?: ListTasksPending
}

export type ListTasksStatusItem =
  (typeof ListTasksStatusItem)[keyof typeof ListTasksStatusItem]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListTasksStatusItem = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
  completed: 'completed',
  deleted: 'deleted',
} as const

export type ListTasksPending =
  (typeof ListTasksPending)[keyof typeof ListTasksPending]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListTasksPending = {
  true: 'true',
  false: 'false',
} as const

/**
 * ステータス。更新ではdraft, in_progress, rejectedのみ選択可能です。
 */
export type UpdateTicketBodyStatus =
  (typeof UpdateTicketBodyStatus)[keyof typeof UpdateTicketBodyStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateTicketBodyStatus = {
  draft: 'draft',
  in_progress: 'in_progress',
  rejected: 'rejected',
} as const

/**
 * 明細フィールドのUUID。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
 */
export type UpdateTicketBodySlipItemsItemInputsItemSlipFieldId = string | null

/**
 * 明細フィールドのコード。slipFieldIdまたはslipFieldCodeは片方のみ必須です。
 */
export type UpdateTicketBodySlipItemsItemInputsItemSlipFieldCode = string | null

export type UpdateTicketBodySlipItemsItemInputsItemValueOneOf = string | null

/**
 * 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。
 */
export type UpdateTicketBodySlipItemsItemInputsItemValue =
  | UpdateTicketBodySlipItemsItemInputsItemValueOneOf
  | string[]

export type UpdateTicketBodySlipItemsItemInputsItemGeneralMasterItemIdOneOf =
  | string
  | null

/**
 * 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。
 */
export type UpdateTicketBodySlipItemsItemInputsItemGeneralMasterItemId =
  | UpdateTicketBodySlipItemsItemInputsItemGeneralMasterItemIdOneOf
  | string[]

export type UpdateTicketBodySlipItemsItemInputsItemUserIdOneOf = string | null

/**
 * ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。
 */
export type UpdateTicketBodySlipItemsItemInputsItemUserId =
  | UpdateTicketBodySlipItemsItemInputsItemUserIdOneOf
  | string[]

export type UpdateTicketBodySlipItemsItemInputsItemTeamIdOneOf = string | null

/**
 * チームUUID。フィールドがチームタイプのときのみ指定してください。
 */
export type UpdateTicketBodySlipItemsItemInputsItemTeamId =
  | UpdateTicketBodySlipItemsItemInputsItemTeamIdOneOf
  | string[]

export type UpdateTicketBodySlipItemsItemInputsItemTicketIdOneOf = string | null

/**
 * チケットUUID。フィールドがチケットタイプのときのみ指定してください。
 */
export type UpdateTicketBodySlipItemsItemInputsItemTicketId =
  | UpdateTicketBodySlipItemsItemInputsItemTicketIdOneOf
  | string[]

/**
 * 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。
 */
export type UpdateTicketBodySlipItemsItemInputsItemFiles = string[] | null

/**
 * 明細アイテム入力
 */
export type UpdateTicketBodySlipItemsItemInputsItem = {
  /** 明細フィールドのUUID。slipFieldIdまたはslipFieldCodeは片方のみ必須です。 */
  slipFieldId?: UpdateTicketBodySlipItemsItemInputsItemSlipFieldId
  /** 明細フィールドのコード。slipFieldIdまたはslipFieldCodeは片方のみ必須です。 */
  slipFieldCode?: UpdateTicketBodySlipItemsItemInputsItemSlipFieldCode
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: UpdateTicketBodySlipItemsItemInputsItemValue
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: UpdateTicketBodySlipItemsItemInputsItemGeneralMasterItemId
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: UpdateTicketBodySlipItemsItemInputsItemUserId
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: UpdateTicketBodySlipItemsItemInputsItemTeamId
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: UpdateTicketBodySlipItemsItemInputsItemTicketId
  /** 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。 */
  files?: UpdateTicketBodySlipItemsItemInputsItemFiles
}

/**
 * 明細アイテム
 */
export type UpdateTicketBodySlipItemsItem = {
  /** 明細アイテム入力の配列 */
  inputs: UpdateTicketBodySlipItemsItemInputsItem[]
}

/**
 * フォームフィールドのUUID。formFieldIdまたはformFieldCodeは片方のみ必須です。
 */
export type UpdateTicketBodyInputsItemFormFieldId = string | null

/**
 * フォームフィールドのコード。formFieldIdまたはformFieldCodeは片方のみ必須です。
 */
export type UpdateTicketBodyInputsItemFormFieldCode = string | null

export type UpdateTicketBodyInputsItemValueOneOf = string | null

/**
 * 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。
 */
export type UpdateTicketBodyInputsItemValue =
  | UpdateTicketBodyInputsItemValueOneOf
  | string[]

export type UpdateTicketBodyInputsItemGeneralMasterItemIdOneOf = string | null

/**
 * 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。
 */
export type UpdateTicketBodyInputsItemGeneralMasterItemId =
  | UpdateTicketBodyInputsItemGeneralMasterItemIdOneOf
  | string[]

export type UpdateTicketBodyInputsItemUserIdOneOf = string | null

/**
 * ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。
 */
export type UpdateTicketBodyInputsItemUserId =
  | UpdateTicketBodyInputsItemUserIdOneOf
  | string[]

export type UpdateTicketBodyInputsItemTeamIdOneOf = string | null

/**
 * チームUUID。フィールドがチームタイプのときのみ指定してください。
 */
export type UpdateTicketBodyInputsItemTeamId =
  | UpdateTicketBodyInputsItemTeamIdOneOf
  | string[]

export type UpdateTicketBodyInputsItemTicketIdOneOf = string | null

/**
 * チケットUUID。フィールドがチケットタイプのときのみ指定してください。
 */
export type UpdateTicketBodyInputsItemTicketId =
  | UpdateTicketBodyInputsItemTicketIdOneOf
  | string[]

/**
 * 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。
 */
export type UpdateTicketBodyInputsItemFiles = string[] | null

/**
 * フォームの入力
 */
export type UpdateTicketBodyInputsItem = {
  /** フォームフィールドのUUID。formFieldIdまたはformFieldCodeは片方のみ必須です。 */
  formFieldId?: UpdateTicketBodyInputsItemFormFieldId
  /** フォームフィールドのコード。formFieldIdまたはformFieldCodeは片方のみ必須です。 */
  formFieldCode?: UpdateTicketBodyInputsItemFormFieldCode
  /** 入力値。フィールドがチェックボックスタイプのときは配列で指定してください。 */
  value?: UpdateTicketBodyInputsItemValue
  /** 汎用マスタアイテムのUUID。フィールドが汎用マスタタイプのときのみ指定してください。 */
  generalMasterItemId?: UpdateTicketBodyInputsItemGeneralMasterItemId
  /** ユーザーUUID。フィールドがユーザータイプのときのみ指定してください。 */
  userId?: UpdateTicketBodyInputsItemUserId
  /** チームUUID。フィールドがチームタイプのときのみ指定してください。 */
  teamId?: UpdateTicketBodyInputsItemTeamId
  /** チケットUUID。フィールドがチケットタイプのときのみ指定してください。 */
  ticketId?: UpdateTicketBodyInputsItemTicketId
  /** 添付ファイルの署名済みID。
フィールドがファイルタイプのときのみ指定してください。 */
  files?: UpdateTicketBodyInputsItemFiles
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

export type UpdateTicketBodyApproversAnyOfItem = {
  /** 承認者を指定する経路ステップのコード */
  routeStepCode: string
  /** 承認者として指定するユーザーのUUID */
  userId: string[]
}

/**
 * 承認タイプが「申請者が指名」の経路ステップの承認者を指定する配列。
 */
export type UpdateTicketBodyApprovers =
  | UpdateTicketBodyApproversAnyOfItem[]
  | null

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
  /** フォームの入力の配列。
注意：申請者による更新時は、ワークフローのすべてのフォームフィールドに対応する入力を入れてください。
注意：承認者による更新時は、承認者用フィールドに対応する入力のみ入れてください。
注意：明細ワークフローの場合、slipItemsも同時にリクエストボディに入れてください。 */
  inputs?: UpdateTicketBodyInputsItem[]
  /** クラウドサイン書類。ワークフローでクラウドサイン連携が有効な場合のみ指定してください。 */
  cloudSignDocument?: UpdateTicketBodyCloudSignDocument
  /** 承認タイプが「申請者が指名」の経路ステップの承認者を指定する配列。 */
  approvers?: UpdateTicketBodyApprovers
}

export type RejectTicketBody = {
  /** 差し戻し先のステップ番号（0が起票者、1が最初の承認ステップ） */
  to: number
}

export type DenyTicketBody = { [key: string]: unknown }

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

/**
 * ユーザーのUUID。userIdとteamIdは片方のみ必須です。
 */
export type CreateViewerBodyUserId = string | string[] | null

/**
 * チームのUUID。userIdとteamIdは片方のみ必須です。
 */
export type CreateViewerBodyTeamId = string | string[] | null

/**
 * 役職のUUID。teamId指定時のみ、任意で指定できます。
 */
export type CreateViewerBodyGradeId = string | null

/**
 * 下位のチームを含めるかどうかをteamId指定時のみ指定できます。未指定時はfalse扱いです。
 */
export type CreateViewerBodyDescendants = boolean | null

export type CreateViewerBody = {
  /** ユーザーのUUID。userIdとteamIdは片方のみ必須です。 */
  userId?: CreateViewerBodyUserId
  /** チームのUUID。userIdとteamIdは片方のみ必須です。 */
  teamId?: CreateViewerBodyTeamId
  /** 役職のUUID。teamId指定時のみ、任意で指定できます。 */
  gradeId?: CreateViewerBodyGradeId
  /** 下位のチームを含めるかどうかをteamId指定時のみ指定できます。未指定時はfalse扱いです。 */
  descendants?: CreateViewerBodyDescendants
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

/**
 * 添付ファイルの署名済みID
 */
export type CreateCommentBodyFiles = string[] | null

export type CreateCommentBody = {
  /** 本文 */
  body: string
  /** 添付ファイルの署名済みID */
  files?: CreateCommentBodyFiles
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
   * ソート対象のフィールドと順序。指定可能なフィールド: email, code
   * @pattern ^(email|code)(-asc|-desc)?$
   */
  sortBy?: string
}

export type ListUsersStatusItem =
  (typeof ListUsersStatusItem)[keyof typeof ListUsersStatusItem]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListUsersStatusItem = {
  invited: 'invited',
  activated: 'activated',
  suspended: 'suspended',
  deactivated: 'deactivated',
} as const

/**
 * 社員番号
 * @maxLength 30
 */
export type CreateUserBodyEmployeeId = string | null

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
   */
  employeeId?: CreateUserBodyEmployeeId
}

/**
 * 社員番号
 * @maxLength 30
 */
export type UpdateUserBodyEmployeeId = string | null

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
   */
  employeeId?: UpdateUserBodyEmployeeId
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
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

/**
 * 開始日。nullの場合、すでに開始しているものとして扱います。
 */
export type CreateProxyApplicantBodyStartsOn = string | null

/**
 * 終了日。nullの場合、無期限のものとして扱います。
 */
export type CreateProxyApplicantBodyEndsOn = string | null

export type CreateProxyApplicantBody = {
  /** 代理されるユーザーID */
  userId: string
  /** 代理するユーザーID */
  proxyUserId: string
  /** 開始日。nullの場合、すでに開始しているものとして扱います。 */
  startsOn?: CreateProxyApplicantBodyStartsOn
  /** 終了日。nullの場合、無期限のものとして扱います。 */
  endsOn?: CreateProxyApplicantBodyEndsOn
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

/**
 * 開始日。nullの場合、すでに始まっているものとして扱います。
 */
export type CreateProxyApproverBodyStartsOn = string | null

/**
 * 終了日。nullの場合、無期限として扱います。
 */
export type CreateProxyApproverBodyEndsOn = string | null

export type CreateProxyApproverBody = {
  /** 代理されるユーザーID */
  userId: string
  /** 代理するユーザーID */
  proxyUserId: string
  /** 開始日。nullの場合、すでに始まっているものとして扱います。 */
  startsOn?: CreateProxyApproverBodyStartsOn
  /** 終了日。nullの場合、無期限として扱います。 */
  endsOn?: CreateProxyApproverBodyEndsOn
  /** 対象ワークフローのID */
  workflowIds?: string[]
}

export type UploadFileBody = {
  /** 添付ファイル */
  file?: Blob
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
