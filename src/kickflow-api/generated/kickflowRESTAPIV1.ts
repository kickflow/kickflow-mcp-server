import type {
  ActivateOrganizationChartBody,
  AuditLog,
  Category,
  Comment,
  CreateCategoryBody,
  CreateCommentBody,
  CreateFolderBody,
  CreateGeneralMasterBody,
  CreateGeneralMasterItemBody,
  CreateProxyApplicantBody,
  CreateProxyApproverBody,
  CreateRoleMembersBody,
  CreateTeamMembersBody,
  CreateTicketBody,
  CreateUserBody,
  CreateViewerBody,
  DeleteTeamMembersBody,
  DenyTicketBody,
  Folder,
  FolderDetail,
  GeneralMaster,
  GeneralMasterItem,
  GetFile200,
  Grade,
  GradeCreateBody,
  GradeUpdateBody,
  ListAuditLogsParams,
  ListCategoriesParams,
  ListCommentsParams,
  ListFoldersParams,
  ListGeneralMasterItemsParams,
  ListGeneralMastersParams,
  ListGradesParams,
  ListOrganizationChartsParams,
  ListProxyApplicantsParams,
  ListProxyApproversParams,
  ListRoleMembersParams,
  ListRolesParams,
  ListRoutesParams,
  ListTasksParams,
  ListTeamMembersParams,
  ListTeamsParams,
  ListTicketLinksParams,
  ListTicketsParams,
  ListUserRolesParams,
  ListUserTeamsParams,
  ListUsersParams,
  ListViewersParams,
  ListWorkflowsParams,
  LookupUserByEmailParams,
  MemberUser,
  OrganizationChart,
  OrganizationChartBody,
  OrganizationChartDetail,
  ProxyApplicant,
  ProxyApprover,
  RejectTicketBody,
  Role,
  RoleCreateBody,
  RoleDetail,
  RoleUpdateBody,
  Route,
  RouteDetail,
  Team,
  TeamCreateBody,
  TeamDetail,
  TeamUpdateBody,
  Ticket,
  TicketDetail,
  TicketViewer,
  TicketWithStep,
  UpdateCategoryBody,
  UpdateCommentBody,
  UpdateFolderBody,
  UpdateGeneralMasterBody,
  UpdateGeneralMasterItemBody,
  UpdateTeamMemberBody,
  UpdateTicketBody,
  UpdateUserBody,
  UploadFile200,
  UploadFileBody,
  User,
  UserDetail,
  Workflow,
  WorkflowDetail,
} from './kickflowRESTAPIV1.schemas'

import { customAxiosInstance } from '../custom-axios-instance.js'
import type { BodyType } from '../custom-axios-instance.js'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

export const getKickflowRESTAPIV1 = () => {
  /**
   * カテゴリの一覧を取得します。
   * @summary カテゴリの一覧を取得
   */
  const listCategories = (
    params?: ListCategoriesParams,
    options?: SecondParameter<typeof customAxiosInstance<Category[]>>,
  ) => {
    return customAxiosInstance<Category[]>(
      { url: `/v1/categories`, method: 'GET', params },
      options,
    )
  }

  /**
 * カテゴリを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを作成
 */
  const createCategory = (
    createCategoryBody: BodyType<CreateCategoryBody>,
    options?: SecondParameter<typeof customAxiosInstance<Category>>,
  ) => {
    return customAxiosInstance<Category>(
      {
        url: `/v1/categories`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createCategoryBody,
      },
      options,
    )
  }

  /**
 * カテゴリを削除します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを削除
 */
  const deleteCategory = (
    categoryId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/categories/${categoryId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * カテゴリを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを更新
 */
  const updateCategory = (
    categoryId: string,
    updateCategoryBody: BodyType<UpdateCategoryBody>,
    options?: SecondParameter<typeof customAxiosInstance<Category>>,
  ) => {
    return customAxiosInstance<Category>(
      {
        url: `/v1/categories/${categoryId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateCategoryBody,
      },
      options,
    )
  }

  /**
   * フォルダの一覧を取得します。
   * @summary フォルダの一覧を取得
   */
  const listFolders = (
    params?: ListFoldersParams,
    options?: SecondParameter<typeof customAxiosInstance<Folder[]>>,
  ) => {
    return customAxiosInstance<Folder[]>(
      { url: `/v1/folders`, method: 'GET', params },
      options,
    )
  }

  /**
 * フォルダを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを作成
 */
  const createFolder = (
    createFolderBody: BodyType<CreateFolderBody>,
    options?: SecondParameter<typeof customAxiosInstance<FolderDetail>>,
  ) => {
    return customAxiosInstance<FolderDetail>(
      {
        url: `/v1/folders`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createFolderBody,
      },
      options,
    )
  }

  /**
 * フォルダを削除します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。

注意：このフォルダ以下のすべてのフォルダ・ワークフロー・経路・パイプラインも削除されます。
 * @summary フォルダを削除
 */
  const deleteFolder = (
    folderId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/folders/${folderId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * フォルダを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを更新
 */
  const updateFolder = (
    folderId: string,
    updateFolderBody: BodyType<UpdateFolderBody>,
    options?: SecondParameter<typeof customAxiosInstance<FolderDetail>>,
  ) => {
    return customAxiosInstance<FolderDetail>(
      {
        url: `/v1/folders/${folderId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateFolderBody,
      },
      options,
    )
  }

  /**
   * フォルダを一件取得します。
   * @summary フォルダを取得
   */
  const getFolder = (
    folderId: string,
    options?: SecondParameter<typeof customAxiosInstance<FolderDetail>>,
  ) => {
    return customAxiosInstance<FolderDetail>(
      { url: `/v1/folders/${folderId}`, method: 'GET' },
      options,
    )
  }

  /**
 * 汎用マスタの一覧を取得します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタの一覧を取得
 */
  const listGeneralMasters = (
    params?: ListGeneralMastersParams,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMaster[]>>,
  ) => {
    return customAxiosInstance<GeneralMaster[]>(
      { url: `/v1/generalMasters`, method: 'GET', params },
      options,
    )
  }

  /**
 * 汎用マスタを作成します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを作成
 */
  const createGeneralMaster = (
    createGeneralMasterBody: BodyType<CreateGeneralMasterBody>,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMaster>>,
  ) => {
    return customAxiosInstance<GeneralMaster>(
      {
        url: `/v1/generalMasters`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createGeneralMasterBody,
      },
      options,
    )
  }

  /**
 * 汎用マスタを一件取得します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを取得
 */
  const getGeneralMaster = (
    generalMasterId: string,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMaster>>,
  ) => {
    return customAxiosInstance<GeneralMaster>(
      { url: `/v1/generalMasters/${generalMasterId}`, method: 'GET' },
      options,
    )
  }

  /**
 * 汎用マスタを更新します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを更新
 */
  const updateGeneralMaster = (
    generalMasterId: string,
    updateGeneralMasterBody: BodyType<UpdateGeneralMasterBody>,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMaster>>,
  ) => {
    return customAxiosInstance<GeneralMaster>(
      {
        url: `/v1/generalMasters/${generalMasterId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateGeneralMasterBody,
      },
      options,
    )
  }

  /**
 * 汎用マスタを削除します。この汎用マスタのすべてのアイテムも同時に削除されます。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを削除
 */
  const deleteGeneralMaster = (
    generalMasterId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/generalMasters/${generalMasterId}`, method: 'DELETE' },
      options,
    )
  }

  /**
   * 汎用マスタアイテムの一覧を取得します。
   * @summary 汎用マスタアイテムの一覧を取得
   */
  const listGeneralMasterItems = (
    generalMasterId: string,
    params?: ListGeneralMasterItemsParams,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMasterItem[]>>,
  ) => {
    return customAxiosInstance<GeneralMasterItem[]>(
      {
        url: `/v1/generalMasters/${generalMasterId}/items`,
        method: 'GET',
        params,
      },
      options,
    )
  }

  /**
 * 汎用マスタアイテムを作成します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを作成
 */
  const createGeneralMasterItem = (
    generalMasterId: string,
    createGeneralMasterItemBody: BodyType<CreateGeneralMasterItemBody>,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMasterItem>>,
  ) => {
    return customAxiosInstance<GeneralMasterItem>(
      {
        url: `/v1/generalMasters/${generalMasterId}/items`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createGeneralMasterItemBody,
      },
      options,
    )
  }

  /**
   * 汎用マスタアイテムを一件取得します。
   * @summary 汎用マスタアイテムを取得
   */
  const getGeneralMasterItem = (
    generalMasterId: string,
    itemId: string,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMasterItem>>,
  ) => {
    return customAxiosInstance<GeneralMasterItem>(
      {
        url: `/v1/generalMasters/${generalMasterId}/items/${itemId}`,
        method: 'GET',
      },
      options,
    )
  }

  /**
 * 汎用マスタアイテムを更新します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを更新
 */
  const updateGeneralMasterItem = (
    generalMasterId: string,
    itemId: string,
    updateGeneralMasterItemBody: BodyType<UpdateGeneralMasterItemBody>,
    options?: SecondParameter<typeof customAxiosInstance<GeneralMasterItem>>,
  ) => {
    return customAxiosInstance<GeneralMasterItem>(
      {
        url: `/v1/generalMasters/${generalMasterId}/items/${itemId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateGeneralMasterItemBody,
      },
      options,
    )
  }

  /**
 * 汎用マスタアイテムを削除します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを削除
 */
  const deleteGeneralMasterItem = (
    generalMasterId: string,
    itemId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/generalMasters/${generalMasterId}/items/${itemId}`,
        method: 'DELETE',
      },
      options,
    )
  }

  /**
 * 役職の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職の一覧を取得
 */
  const listGrades = (
    params?: ListGradesParams,
    options?: SecondParameter<typeof customAxiosInstance<Grade[]>>,
  ) => {
    return customAxiosInstance<Grade[]>(
      { url: `/v1/grades`, method: 'GET', params },
      options,
    )
  }

  /**
 * 役職を作成します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を作成
 */
  const createGrade = (
    gradeCreateBody: BodyType<GradeCreateBody>,
    options?: SecondParameter<typeof customAxiosInstance<Grade>>,
  ) => {
    return customAxiosInstance<Grade>(
      {
        url: `/v1/grades`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: gradeCreateBody,
      },
      options,
    )
  }

  /**
 * 役職を一件取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を取得
 */
  const getGrade = (
    gradeId: string,
    options?: SecondParameter<typeof customAxiosInstance<Grade>>,
  ) => {
    return customAxiosInstance<Grade>(
      { url: `/v1/grades/${gradeId}`, method: 'GET' },
      options,
    )
  }

  /**
 * 役職を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。

注意：この役職を使用しているユーザーがいる場合、エラーとなります。先にユーザーから対象の役職を外してください。
 * @summary 役職を削除
 */
  const deleteGrade = (
    gradeId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/grades/${gradeId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * 役職を更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を更新
 */
  const updateGrade = (
    gradeId: string,
    gradeUpdateBody: BodyType<GradeUpdateBody>,
    options?: SecondParameter<typeof customAxiosInstance<Grade>>,
  ) => {
    return customAxiosInstance<Grade>(
      {
        url: `/v1/grades/${gradeId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: gradeUpdateBody,
      },
      options,
    )
  }

  /**
 * 指定した役職をデフォルトにします。
同時に、これまでデフォルトだった役職は自動的にデフォルトではなくなります。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary デフォルトの役職を変更
 */
  const setDefaultGrade = (
    gradeId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/grades/${gradeId}/default`, method: 'POST' },
      options,
    )
  }

  /**
 * 組織図の一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。

注意：パフォーマンス上の理由から、組織図の一覧取得時は組織図内のチームのリストがレスポンスに含まれません。
組織図のすべての情報を取得したい場合は、組織図を一件だけ取得するAPI経由で取得してください。
 * @summary 組織図の一覧を取得
 */
  const listOrganizationCharts = (
    params?: ListOrganizationChartsParams,
    options?: SecondParameter<typeof customAxiosInstance<OrganizationChart[]>>,
  ) => {
    return customAxiosInstance<OrganizationChart[]>(
      { url: `/v1/organizationCharts`, method: 'GET', params },
      options,
    )
  }

  /**
 * 組織図を作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を作成
 */
  const createOrganizationChart = (
    organizationChartBody: BodyType<OrganizationChartBody>,
    options?: SecondParameter<
      typeof customAxiosInstance<OrganizationChartDetail>
    >,
  ) => {
    return customAxiosInstance<OrganizationChartDetail>(
      {
        url: `/v1/organizationCharts`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: organizationChartBody,
      },
      options,
    )
  }

  /**
 * 組織図を削除します。同時に、組織図内のチームや所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。

注意：現在有効な組織図は削除できません。
注意：組織図の削除は時間がかかることがあるため、削除は非同期で実行されます。削除の完了前にレスポンスを返すので注意してください。
 * @summary 組織図を削除
 */
  const deleteOrganizationChart = (
    organizationChartId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/organizationCharts/${organizationChartId}`,
        method: 'DELETE',
      },
      options,
    )
  }

  /**
 * 組織図を一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を取得
 */
  const getOrganizationChart = (
    organizationChartId: string,
    options?: SecondParameter<
      typeof customAxiosInstance<OrganizationChartDetail>
    >,
  ) => {
    return customAxiosInstance<OrganizationChartDetail>(
      { url: `/v1/organizationCharts/${organizationChartId}`, method: 'GET' },
      options,
    )
  }

  /**
 * 組織図を更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を更新
 */
  const updateOrganizationChart = (
    organizationChartId: string,
    organizationChartBody: BodyType<OrganizationChartBody>,
    options?: SecondParameter<
      typeof customAxiosInstance<OrganizationChartDetail>
    >,
  ) => {
    return customAxiosInstance<OrganizationChartDetail>(
      {
        url: `/v1/organizationCharts/${organizationChartId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: organizationChartBody,
      },
      options,
    )
  }

  /**
 * 現在有効になっている組織図を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 現在の組織図を取得
 */
  const getCurrentOrganizationChart = (
    options?: SecondParameter<
      typeof customAxiosInstance<OrganizationChartDetail>
    >,
  ) => {
    return customAxiosInstance<OrganizationChartDetail>(
      { url: `/v1/organizationChart`, method: 'GET' },
      options,
    )
  }

  /**
 * 指定した組織図を有効化し、ワークフローで使用する組織図を切り替えます。
他の組織図に有効化の予定がある場合、それらの予定は削除されます。

このAPIの実行には、チームの管理権限が必要です。

注意：組織図の有効化は時間がかかることがあるため、有効化は非同期で実行されます。有効化の完了前にレスポンスを返すので注意してください。
 * @summary 組織図を有効化
 */
  const activateOrganizationChart = (
    organizationChartId: string,
    activateOrganizationChartBody: BodyType<ActivateOrganizationChartBody>,
    options?: SecondParameter<
      typeof customAxiosInstance<OrganizationChartDetail>
    >,
  ) => {
    return customAxiosInstance<OrganizationChartDetail>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/activate`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: activateOrganizationChartBody,
      },
      options,
    )
  }

  /**
 * 指定した組織図内のチーム一覧を取得します。

parentIdを指定した場合は指定した親チームの配下チームの一覧を、parentIdを指定しない場合は組織図内のルートのチーム一覧を返します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チーム一覧を取得
 */
  const listTeams = (
    organizationChartId: string,
    params?: ListTeamsParams,
    options?: SecondParameter<typeof customAxiosInstance<Team[]>>,
  ) => {
    return customAxiosInstance<Team[]>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams`,
        method: 'GET',
        params,
      },
      options,
    )
  }

  /**
 * 指定した組織図内にチームを作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを作成
 */
  const createTeam = (
    organizationChartId: string,
    teamCreateBody: BodyType<TeamCreateBody>,
    options?: SecondParameter<typeof customAxiosInstance<TeamDetail>>,
  ) => {
    return customAxiosInstance<TeamDetail>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: teamCreateBody,
      },
      options,
    )
  }

  /**
 * チームを一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを取得
 */
  const getTeam = (
    organizationChartId: string,
    teamId: string,
    options?: SecondParameter<typeof customAxiosInstance<TeamDetail>>,
  ) => {
    return customAxiosInstance<TeamDetail>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}`,
        method: 'GET',
      },
      options,
    )
  }

  /**
 * チームを更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを編集
 */
  const updateTeam = (
    organizationChartId: string,
    teamId: string,
    teamUpdateBody: BodyType<TeamUpdateBody>,
    options?: SecondParameter<typeof customAxiosInstance<TeamDetail>>,
  ) => {
    return customAxiosInstance<TeamDetail>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: teamUpdateBody,
      },
      options,
    )
  }

  /**
 * チームを削除します。同時に、このチームの所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを削除
 */
  const deleteTeam = (
    organizationChartId: string,
    teamId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}`,
        method: 'DELETE',
      },
      options,
    )
  }

  /**
 * チームのメンバー一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームのメンバー一覧を取得
 */
  const listTeamMembers = (
    organizationChartId: string,
    teamId: string,
    params?: ListTeamMembersParams,
    options?: SecondParameter<typeof customAxiosInstance<MemberUser[]>>,
  ) => {
    return customAxiosInstance<MemberUser[]>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships`,
        method: 'GET',
        params,
      },
      options,
    )
  }

  /**
 * 指定したチームにメンバーを追加します。最大10人まで同時に追加可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームにメンバーを追加
 */
  const createTeamMembers = (
    organizationChartId: string,
    teamId: string,
    createTeamMembersBody: BodyType<CreateTeamMembersBody>,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createTeamMembersBody,
      },
      options,
    )
  }

  /**
 * 指定したチームからメンバーを削除します。最大10人まで同時に削除可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: 削除後もメンバーが残る場合、チームに上長は最低一人必要です。メンバー削除によって上長が不在になる場合、APIは422 Unprocessable Contentを返します。
 * @summary チームからメンバーを削除
 */
  const deleteTeamMembers = (
    organizationChartId: string,
    teamId: string,
    deleteTeamMembersBody: BodyType<DeleteTeamMembersBody>,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        data: deleteTeamMembersBody,
      },
      options,
    )
  }

  /**
 * 指定したメンバーを更新します。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人は必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームのメンバーを更新
 */
  const updateTeamMember = (
    organizationChartId: string,
    teamId: string,
    userId: string,
    updateTeamMemberBody: BodyType<UpdateTeamMemberBody>,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships/${userId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateTeamMemberBody,
      },
      options,
    )
  }

  /**
 * 管理者ロールの一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールの一覧を取得
 */
  const listRoles = (
    params?: ListRolesParams,
    options?: SecondParameter<typeof customAxiosInstance<Role[]>>,
  ) => {
    return customAxiosInstance<Role[]>(
      { url: `/v1/roles`, method: 'GET', params },
      options,
    )
  }

  /**
 * 管理者ロールを作成します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを作成
 */
  const createRole = (
    roleCreateBody: BodyType<RoleCreateBody>,
    options?: SecondParameter<typeof customAxiosInstance<RoleDetail>>,
  ) => {
    return customAxiosInstance<RoleDetail>(
      {
        url: `/v1/roles`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: roleCreateBody,
      },
      options,
    )
  }

  /**
 * 管理者ロールを一件取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを取得
 */
  const getRole = (
    roleId: string,
    options?: SecondParameter<typeof customAxiosInstance<RoleDetail>>,
  ) => {
    return customAxiosInstance<RoleDetail>(
      { url: `/v1/roles/${roleId}`, method: 'GET' },
      options,
    )
  }

  /**
 * 管理者ロールを更新します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを更新
 */
  const updateRole = (
    roleId: string,
    roleUpdateBody: BodyType<RoleUpdateBody>,
    options?: SecondParameter<typeof customAxiosInstance<RoleDetail>>,
  ) => {
    return customAxiosInstance<RoleDetail>(
      {
        url: `/v1/roles/${roleId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: roleUpdateBody,
      },
      options,
    )
  }

  /**
 * 管理者ロールを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを削除
 */
  const deleteRole = (
    roleId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/roles/${roleId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * 管理者ロールにメンバーを追加します。最大10人まで複数のメンバーを同時に追加可能です。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールにメンバーを追加
 */
  const createRoleMembers = (
    roleId: string,
    createRoleMembersBody: BodyType<CreateRoleMembersBody>,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/roles/${roleId}/memberships`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createRoleMembersBody,
      },
      options,
    )
  }

  /**
 * 管理者ロールのメンバー一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールのメンバー一覧を取得
 */
  const listRoleMembers = (
    roleId: string,
    params?: ListRoleMembersParams,
    options?: SecondParameter<typeof customAxiosInstance<User[]>>,
  ) => {
    return customAxiosInstance<User[]>(
      { url: `/v1/roles/${roleId}/memberships`, method: 'GET', params },
      options,
    )
  }

  /**
 * 管理者ロールからメンバーを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールからメンバーを削除
 */
  const deleteRoleMember = (
    roleId: string,
    userId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/roles/${roleId}/memberships/${userId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * チケットの一覧を取得します。複数の条件を組み合わせて、フィルタ可能です。

注意1：パフォーマンス上の理由から、チケットの一覧取得ではフォームの入力や承認経路などはレスポンスに含まれません。
より詳細なチケット情報を取得したい場合は、チケットを一件だけ取得するAPIをで取得してください。

注意2：APIを実行するユーザーが閲覧可能なチケットのみ取得可能です。
テナント内のすべてのチケットを対象としたい場合、APIを実行するユーザーがチケットの管理権限（閲覧）を持っている必要があります。
 * @summary チケット一覧を取得
 */
  const listTickets = (
    params?: ListTicketsParams,
    options?: SecondParameter<typeof customAxiosInstance<TicketWithStep[]>>,
  ) => {
    return customAxiosInstance<TicketWithStep[]>(
      { url: `/v1/tickets`, method: 'GET', params },
      options,
    )
  }

  /**
   * チケットを作成します。
   * @summary チケットを作成
   */
  const createTicket = (
    createTicketBody: BodyType<CreateTicketBody>,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      {
        url: `/v1/tickets`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createTicketBody,
      },
      options,
    )
  }

  /**
 * 現在のユーザーにアサインされている承認リクエストの一覧を取得します。複数の条件を組み合わせて、フィルタ可能です。

注意：パフォーマンス上の理由から、チケットの一覧取得ではフォームの入力や承認経路などはレスポンスに含まれません。
より詳細なチケット情報を取得したい場合は、チケットを一件だけ取得するAPIをで取得してください。
 * @summary 承認リクエスト一覧を取得
 */
  const listTasks = (
    params?: ListTasksParams,
    options?: SecondParameter<typeof customAxiosInstance<TicketWithStep[]>>,
  ) => {
    return customAxiosInstance<TicketWithStep[]>(
      { url: `/v1/tickets/tasks`, method: 'GET', params },
      options,
    )
  }

  /**
   * チケットを一件取得します。フォームの入力や承認経路などを含む詳細なデータを返します。
   * @summary チケットを取得
   */
  const getTicket = (
    ticketId: string,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      { url: `/v1/tickets/${ticketId}`, method: 'GET' },
      options,
    )
  }

  /**
 * チケットを更新します。

注意1: チケットのステータスが下書きまたは差し戻しの場合、申請者が更新可能です。

注意2: チケットのステータスが処理中の場合、承認者が承認者用フィールドのみ更新可能です。リクエストボディにはslipItemsまたはinputsのみ設定してください（他のパラメータは無視されます）。

注意3: 明細ワークフローの場合、slipItemsは必須です。
 * @summary チケットを更新
 */
  const updateTicket = (
    ticketId: string,
    updateTicketBody: BodyType<UpdateTicketBody>,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      {
        url: `/v1/tickets/${ticketId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateTicketBody,
      },
      options,
    )
  }

  /**
 * 指定したチケットを承認もしくは確認します。
APIの実行ユーザーがチケットにアサインされていない場合、403 Forbiddenを返します。
 * @summary チケットを承認または確認する
 */
  const approveTicket = (
    ticketId: string,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      { url: `/v1/tickets/${ticketId}/approve`, method: 'POST' },
      options,
    )
  }

  /**
 * 指定したチケットを差し戻します。
APIの実行ユーザーがチケットにアサインされていない場合、403 Forbiddenを返します。
 * @summary チケットを差し戻す
 */
  const rejectTicket = (
    ticketId: string,
    rejectTicketBody: BodyType<RejectTicketBody>,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      {
        url: `/v1/tickets/${ticketId}/reject`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: rejectTicketBody,
      },
      options,
    )
  }

  /**
 * 指定したチケットを却下します。
APIの実行ユーザーがチケットにアサインされていない場合、403 Forbiddenを返します。
 * @summary チケットを却下する
 */
  const denyTicket = (
    ticketId: string,
    denyTicketBody: BodyType<DenyTicketBody>,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      {
        url: `/v1/tickets/${ticketId}/deny`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: denyTicketBody,
      },
      options,
    )
  }

  /**
   * 自分が作成したチケットを取り下げます。
   * @summary チケットを取り下げる
   */
  const withdrawTicket = (
    ticketId: string,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      { url: `/v1/tickets/${ticketId}/withdraw`, method: 'POST' },
      options,
    )
  }

  /**
 * チケットをアーカイブします。チケットのステータスがアーカイブステータスに変わりますが、引き続きUIやAPIでチケットにはアクセス可能です。

注意：チケットをアーカイブ可能なユーザーはチケットのステータスによって異なります。詳しくは[ヘルプ](https://support.kickflow.com/hc/ja/articles/360058324973)をご覧ください。
 * @summary チケットをアーカイブ
 */
  const archiveTicket = (
    ticketId: string,
    options?: SecondParameter<typeof customAxiosInstance<TicketDetail>>,
  ) => {
    return customAxiosInstance<TicketDetail>(
      { url: `/v1/tickets/${ticketId}/archive`, method: 'POST' },
      options,
    )
  }

  /**
   * 指定したチケットの関連チケットを取得します。
   * @summary チケットの関連チケットを取得する
   */
  const listTicketLinks = (
    ticketId: string,
    params?: ListTicketLinksParams,
    options?: SecondParameter<typeof customAxiosInstance<Ticket[]>>,
  ) => {
    return customAxiosInstance<Ticket[]>(
      { url: `/v1/tickets/${ticketId}/links`, method: 'GET', params },
      options,
    )
  }

  /**
   * チケットの共有ユーザー一覧を取得します。
   * @summary 共有ユーザーの一覧を取得
   */
  const listViewers = (
    ticketId: string,
    params?: ListViewersParams,
    options?: SecondParameter<typeof customAxiosInstance<TicketViewer[]>>,
  ) => {
    return customAxiosInstance<TicketViewer[]>(
      { url: `/v1/tickets/${ticketId}/viewers`, method: 'GET', params },
      options,
    )
  }

  /**
   * チケットに共有ユーザーを追加します。
   * @summary 共有ユーザーを追加
   */
  const createViewer = (
    ticketId: string,
    createViewerBody: BodyType<CreateViewerBody>,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/tickets/${ticketId}/viewers`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createViewerBody,
      },
      options,
    )
  }

  /**
   * チケットの共有ユーザーを削除します。
   * @summary 共有ユーザーを削除
   */
  const deleteViewer = (
    ticketId: string,
    viewerId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/tickets/${ticketId}/viewers/${viewerId}`, method: 'DELETE' },
      options,
    )
  }

  /**
   * チケットのコメント一覧を取得します。
   * @summary コメントの一覧を取得
   */
  const listComments = (
    ticketId: string,
    params?: ListCommentsParams,
    options?: SecondParameter<typeof customAxiosInstance<Comment[]>>,
  ) => {
    return customAxiosInstance<Comment[]>(
      { url: `/v1/tickets/${ticketId}/comments`, method: 'GET', params },
      options,
    )
  }

  /**
   * チケットにコメントを投稿します。
   * @summary コメントを投稿
   */
  const createComment = (
    ticketId: string,
    createCommentBody: BodyType<CreateCommentBody>,
    options?: SecondParameter<typeof customAxiosInstance<Comment>>,
  ) => {
    return customAxiosInstance<Comment>(
      {
        url: `/v1/tickets/${ticketId}/comments`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createCommentBody,
      },
      options,
    )
  }

  /**
   * チケットのコメントを取得します。
   * @summary コメントを取得
   */
  const getComment = (
    ticketId: string,
    commentId: string,
    options?: SecondParameter<typeof customAxiosInstance<Comment>>,
  ) => {
    return customAxiosInstance<Comment>(
      { url: `/v1/tickets/${ticketId}/comments/${commentId}`, method: 'GET' },
      options,
    )
  }

  /**
   * チケットのコメントを更新します。添付ファイルは更新できません。
   * @summary コメントを更新
   */
  const updateComment = (
    ticketId: string,
    commentId: string,
    updateCommentBody: BodyType<UpdateCommentBody>,
    options?: SecondParameter<typeof customAxiosInstance<Comment>>,
  ) => {
    return customAxiosInstance<Comment>(
      {
        url: `/v1/tickets/${ticketId}/comments/${commentId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateCommentBody,
      },
      options,
    )
  }

  /**
   * チケットのコメントを削除します。
   * @summary コメントを削除
   */
  const deleteComment = (
    ticketId: string,
    commentId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      {
        url: `/v1/tickets/${ticketId}/comments/${commentId}`,
        method: 'DELETE',
      },
      options,
    )
  }

  /**
   * 現在のユーザーを取得します。
   * @summary 現在のユーザーを取得
   */
  const getCurrentUser = (
    options?: SecondParameter<typeof customAxiosInstance<UserDetail>>,
  ) => {
    return customAxiosInstance<UserDetail>(
      { url: `/v1/user`, method: 'GET' },
      options,
    )
  }

  /**
   * ユーザー一覧を取得します。
   * @summary ユーザー一覧を取得
   */
  const listUsers = (
    params?: ListUsersParams,
    options?: SecondParameter<typeof customAxiosInstance<User[]>>,
  ) => {
    return customAxiosInstance<User[]>(
      { url: `/v1/users`, method: 'GET', params },
      options,
    )
  }

  /**
 * ユーザーを作成します。
作成されたユーザーは招待済みステータスとなり、招待メールが送信されます。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを作成（招待）
 */
  const createUser = (
    createUserBody: BodyType<CreateUserBody>,
    options?: SecondParameter<typeof customAxiosInstance<UserDetail>>,
  ) => {
    return customAxiosInstance<UserDetail>(
      {
        url: `/v1/users`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createUserBody,
      },
      options,
    )
  }

  /**
   * ユーザーを一件取得します。
   * @summary ユーザーを取得
   */
  const getUser = (
    userId: string,
    options?: SecondParameter<typeof customAxiosInstance<UserDetail>>,
  ) => {
    return customAxiosInstance<UserDetail>(
      { url: `/v1/users/${userId}`, method: 'GET' },
      options,
    )
  }

  /**
 * ユーザーを削除します（論理削除）。
削除されたユーザーは削除済ステータスとなりますが、引き続きユーザー情報にアクセス可能です。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを削除
 */
  const deleteUser = (
    userId: string,
    options?: SecondParameter<typeof customAxiosInstance<UserDetail>>,
  ) => {
    return customAxiosInstance<UserDetail>(
      { url: `/v1/users/${userId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * ユーザーを更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを更新
 */
  const updateUser = (
    userId: string,
    updateUserBody: BodyType<UpdateUserBody>,
    options?: SecondParameter<typeof customAxiosInstance<UserDetail>>,
  ) => {
    return customAxiosInstance<UserDetail>(
      {
        url: `/v1/users/${userId}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        data: updateUserBody,
      },
      options,
    )
  }

  /**
 * メールアドレスからユーザーを取得します（完全一致）
※メールアドレスはURLエンコードしたものを送ってください。
 * @summary メールアドレスからユーザーを取得
 */
  const lookupUserByEmail = (
    params: LookupUserByEmailParams,
    options?: SecondParameter<typeof customAxiosInstance<UserDetail>>,
  ) => {
    return customAxiosInstance<UserDetail>(
      { url: `/v1/users/lookupByEmail`, method: 'GET', params },
      options,
    )
  }

  /**
 * 削除されたユーザーを再び招待します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再招待
 */
  const reinviteUser = (
    userId: string,
    options?: SecondParameter<typeof customAxiosInstance<User>>,
  ) => {
    return customAxiosInstance<User>(
      { url: `/v1/users/${userId}/reinvite`, method: 'POST' },
      options,
    )
  }

  /**
 * 有効なユーザーを一時停止します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを一時停止
 */
  const suspendUser = (
    userId: string,
    options?: SecondParameter<typeof customAxiosInstance<User>>,
  ) => {
    return customAxiosInstance<User>(
      { url: `/v1/users/${userId}/suspend`, method: 'POST' },
      options,
    )
  }

  /**
 * 一時停止中のユーザーを有効化します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再有効化
 */
  const reactivateUser = (
    userId: string,
    options?: SecondParameter<typeof customAxiosInstance<User>>,
  ) => {
    return customAxiosInstance<User>(
      { url: `/v1/users/${userId}/reactivate`, method: 'POST' },
      options,
    )
  }

  /**
 * ユーザーの所属チーム一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary ユーザーの所属チーム一覧を取得
 */
  const listUserTeams = (
    userId: string,
    params?: ListUserTeamsParams,
    options?: SecondParameter<typeof customAxiosInstance<Team[]>>,
  ) => {
    return customAxiosInstance<Team[]>(
      { url: `/v1/users/${userId}/teams`, method: 'GET', params },
      options,
    )
  }

  /**
 * ユーザーの管理者ロール一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary ユーザーの管理者ロール一覧を取得
 */
  const listUserRoles = (
    userId: string,
    params?: ListUserRolesParams,
    options?: SecondParameter<typeof customAxiosInstance<Role[]>>,
  ) => {
    return customAxiosInstance<Role[]>(
      { url: `/v1/users/${userId}/roles`, method: 'GET', params },
      options,
    )
  }

  /**
   * 経路の一覧を取得します。ステータスやフォルダによる絞り込みが可能です。
   * @summary 経路一覧を取得
   */
  const listRoutes = (
    params?: ListRoutesParams,
    options?: SecondParameter<typeof customAxiosInstance<Route[]>>,
  ) => {
    return customAxiosInstance<Route[]>(
      { url: `/v1/routes`, method: 'GET', params },
      options,
    )
  }

  /**
   * 指定した経路を取得します。
   * @summary 経路を取得
   */
  const getRoute = (
    routeId: string,
    options?: SecondParameter<typeof customAxiosInstance<RouteDetail>>,
  ) => {
    return customAxiosInstance<RouteDetail>(
      { url: `/v1/routes/${routeId}`, method: 'GET' },
      options,
    )
  }

  /**
   * ワークフローの一覧を取得します。ステータスによる絞り込みが可能です。
   * @summary ワークフロー一覧を取得
   */
  const listWorkflows = (
    params?: ListWorkflowsParams,
    options?: SecondParameter<typeof customAxiosInstance<Workflow[]>>,
  ) => {
    return customAxiosInstance<Workflow[]>(
      { url: `/v1/workflows`, method: 'GET', params },
      options,
    )
  }

  /**
   * 指定したIDのワークフローを取得します。
   * @summary ワークフローを取得
   */
  const getWorkflow = (
    workflowId: string,
    options?: SecondParameter<typeof customAxiosInstance<WorkflowDetail>>,
  ) => {
    return customAxiosInstance<WorkflowDetail>(
      { url: `/v1/workflows/${workflowId}`, method: 'GET' },
      options,
    )
  }

  /**
 * テナント内の代理申請の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理申請一覧を取得
 */
  const listProxyApplicants = (
    params?: ListProxyApplicantsParams,
    options?: SecondParameter<typeof customAxiosInstance<ProxyApplicant[]>>,
  ) => {
    return customAxiosInstance<ProxyApplicant[]>(
      { url: `/v1/proxyApplicants`, method: 'GET', params },
      options,
    )
  }

  /**
 * 代理申請を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を作成
 */
  const createProxyApplicant = (
    createProxyApplicantBody: BodyType<CreateProxyApplicantBody>,
    options?: SecondParameter<typeof customAxiosInstance<ProxyApplicant>>,
  ) => {
    return customAxiosInstance<ProxyApplicant>(
      {
        url: `/v1/proxyApplicants`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createProxyApplicantBody,
      },
      options,
    )
  }

  /**
 * 指定した代理申請を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を削除
 */
  const deleteProxyApplicant = (
    proxyApplicantId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/proxyApplicants/${proxyApplicantId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * テナント内の代理承認の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理承認一覧を取得
 */
  const listProxyApprovers = (
    params?: ListProxyApproversParams,
    options?: SecondParameter<typeof customAxiosInstance<ProxyApprover[]>>,
  ) => {
    return customAxiosInstance<ProxyApprover[]>(
      { url: `/v1/proxyApprovers`, method: 'GET', params },
      options,
    )
  }

  /**
 * 代理承認を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理承認の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理承認を作成
 */
  const createProxyApprover = (
    createProxyApproverBody: BodyType<CreateProxyApproverBody>,
    options?: SecondParameter<typeof customAxiosInstance<ProxyApprover>>,
  ) => {
    return customAxiosInstance<ProxyApprover>(
      {
        url: `/v1/proxyApprovers`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: createProxyApproverBody,
      },
      options,
    )
  }

  /**
 * 指定した代理承認を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理承認の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理承認を削除
 */
  const deleteProxyApprover = (
    proxyApproverId: string,
    options?: SecondParameter<typeof customAxiosInstance<void>>,
  ) => {
    return customAxiosInstance<void>(
      { url: `/v1/proxyApprovers/${proxyApproverId}`, method: 'DELETE' },
      options,
    )
  }

  /**
 * 添付ファイルをアップロードします。最大2MBまでのファイルをアップロード可能です。

注意：このAPIはエンタープライズプランのお客様のみ利用可能です。

注意：アップロードしたファイルはすみやかにチケット作成などで使用してください。チケットなどから参照されていないファイルは最短24時間経過後に自動的に削除されます。
 * @summary 添付ファイルをアップロード
 */
  const uploadFile = (
    uploadFileBody: BodyType<UploadFileBody>,
    options?: SecondParameter<typeof customAxiosInstance<UploadFile200>>,
  ) => {
    const formData = new FormData()
    if (uploadFileBody.file !== undefined) {
      formData.append(`file`, uploadFileBody.file)
    }

    return customAxiosInstance<UploadFile200>(
      {
        url: `/v1/files`,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      },
      options,
    )
  }

  /**
 * 添付ファイルのAmazon S3上のURLを含む情報を取得します。

注意: このAPIが返すURLは、5分間で失効します。

注意: チケットに添付されていないファイルはURLを取得できません。先にチケットに添付してください。
 * @summary 添付ファイルの情報を取得
 */
  const getFile = (
    signedId: string,
    options?: SecondParameter<typeof customAxiosInstance<GetFile200>>,
  ) => {
    return customAxiosInstance<GetFile200>(
      { url: `/v1/files/${signedId}`, method: 'GET' },
      options,
    )
  }

  /**
   * 監査ログの一覧を取得します。
   * @summary 監査ログ一覧を取得
   */
  const listAuditLogs = (
    params?: ListAuditLogsParams,
    options?: SecondParameter<typeof customAxiosInstance<AuditLog[]>>,
  ) => {
    return customAxiosInstance<AuditLog[]>(
      { url: `/v1/auditLogs`, method: 'GET', params },
      options,
    )
  }

  return {
    listCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    listFolders,
    createFolder,
    deleteFolder,
    updateFolder,
    getFolder,
    listGeneralMasters,
    createGeneralMaster,
    getGeneralMaster,
    updateGeneralMaster,
    deleteGeneralMaster,
    listGeneralMasterItems,
    createGeneralMasterItem,
    getGeneralMasterItem,
    updateGeneralMasterItem,
    deleteGeneralMasterItem,
    listGrades,
    createGrade,
    getGrade,
    deleteGrade,
    updateGrade,
    setDefaultGrade,
    listOrganizationCharts,
    createOrganizationChart,
    deleteOrganizationChart,
    getOrganizationChart,
    updateOrganizationChart,
    getCurrentOrganizationChart,
    activateOrganizationChart,
    listTeams,
    createTeam,
    getTeam,
    updateTeam,
    deleteTeam,
    listTeamMembers,
    createTeamMembers,
    deleteTeamMembers,
    updateTeamMember,
    listRoles,
    createRole,
    getRole,
    updateRole,
    deleteRole,
    createRoleMembers,
    listRoleMembers,
    deleteRoleMember,
    listTickets,
    createTicket,
    listTasks,
    getTicket,
    updateTicket,
    approveTicket,
    rejectTicket,
    denyTicket,
    withdrawTicket,
    archiveTicket,
    listTicketLinks,
    listViewers,
    createViewer,
    deleteViewer,
    listComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
    getCurrentUser,
    listUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser,
    lookupUserByEmail,
    reinviteUser,
    suspendUser,
    reactivateUser,
    listUserTeams,
    listUserRoles,
    listRoutes,
    getRoute,
    listWorkflows,
    getWorkflow,
    listProxyApplicants,
    createProxyApplicant,
    deleteProxyApplicant,
    listProxyApprovers,
    createProxyApprover,
    deleteProxyApprover,
    uploadFile,
    getFile,
    listAuditLogs,
  }
}
export type ListCategoriesResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listCategories']>>
>
export type CreateCategoryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createCategory']>>
>
export type DeleteCategoryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteCategory']>>
>
export type UpdateCategoryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateCategory']>>
>
export type ListFoldersResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listFolders']>>
>
export type CreateFolderResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createFolder']>>
>
export type DeleteFolderResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteFolder']>>
>
export type UpdateFolderResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateFolder']>>
>
export type GetFolderResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getFolder']>>
>
export type ListGeneralMastersResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listGeneralMasters']>
  >
>
export type CreateGeneralMasterResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createGeneralMaster']>
  >
>
export type GetGeneralMasterResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getGeneralMaster']>
  >
>
export type UpdateGeneralMasterResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateGeneralMaster']>
  >
>
export type DeleteGeneralMasterResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteGeneralMaster']>
  >
>
export type ListGeneralMasterItemsResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['listGeneralMasterItems']
    >
  >
>
export type CreateGeneralMasterItemResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['createGeneralMasterItem']
    >
  >
>
export type GetGeneralMasterItemResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getGeneralMasterItem']>
  >
>
export type UpdateGeneralMasterItemResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['updateGeneralMasterItem']
    >
  >
>
export type DeleteGeneralMasterItemResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['deleteGeneralMasterItem']
    >
  >
>
export type ListGradesResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listGrades']>>
>
export type CreateGradeResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createGrade']>>
>
export type GetGradeResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getGrade']>>
>
export type DeleteGradeResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteGrade']>>
>
export type UpdateGradeResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateGrade']>>
>
export type SetDefaultGradeResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['setDefaultGrade']>
  >
>
export type ListOrganizationChartsResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['listOrganizationCharts']
    >
  >
>
export type CreateOrganizationChartResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['createOrganizationChart']
    >
  >
>
export type DeleteOrganizationChartResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['deleteOrganizationChart']
    >
  >
>
export type GetOrganizationChartResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getOrganizationChart']>
  >
>
export type UpdateOrganizationChartResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['updateOrganizationChart']
    >
  >
>
export type GetCurrentOrganizationChartResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['getCurrentOrganizationChart']
    >
  >
>
export type ActivateOrganizationChartResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getKickflowRESTAPIV1>['activateOrganizationChart']
    >
  >
>
export type ListTeamsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listTeams']>>
>
export type CreateTeamResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createTeam']>>
>
export type GetTeamResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getTeam']>>
>
export type UpdateTeamResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateTeam']>>
>
export type DeleteTeamResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteTeam']>>
>
export type ListTeamMembersResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listTeamMembers']>
  >
>
export type CreateTeamMembersResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createTeamMembers']>
  >
>
export type DeleteTeamMembersResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteTeamMembers']>
  >
>
export type UpdateTeamMemberResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateTeamMember']>
  >
>
export type ListRolesResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listRoles']>>
>
export type CreateRoleResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createRole']>>
>
export type GetRoleResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getRole']>>
>
export type UpdateRoleResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateRole']>>
>
export type DeleteRoleResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteRole']>>
>
export type CreateRoleMembersResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createRoleMembers']>
  >
>
export type ListRoleMembersResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listRoleMembers']>
  >
>
export type DeleteRoleMemberResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteRoleMember']>
  >
>
export type ListTicketsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listTickets']>>
>
export type CreateTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createTicket']>>
>
export type ListTasksResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listTasks']>>
>
export type GetTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getTicket']>>
>
export type UpdateTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateTicket']>>
>
export type ApproveTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['approveTicket']>>
>
export type RejectTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['rejectTicket']>>
>
export type DenyTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['denyTicket']>>
>
export type WithdrawTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['withdrawTicket']>>
>
export type ArchiveTicketResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['archiveTicket']>>
>
export type ListTicketLinksResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listTicketLinks']>
  >
>
export type ListViewersResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listViewers']>>
>
export type CreateViewerResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createViewer']>>
>
export type DeleteViewerResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteViewer']>>
>
export type ListCommentsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listComments']>>
>
export type CreateCommentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createComment']>>
>
export type GetCommentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getComment']>>
>
export type UpdateCommentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateComment']>>
>
export type DeleteCommentResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteComment']>>
>
export type GetCurrentUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getCurrentUser']>>
>
export type ListUsersResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listUsers']>>
>
export type CreateUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createUser']>>
>
export type GetUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getUser']>>
>
export type DeleteUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteUser']>>
>
export type UpdateUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['updateUser']>>
>
export type LookupUserByEmailResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['lookupUserByEmail']>
  >
>
export type ReinviteUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['reinviteUser']>>
>
export type SuspendUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['suspendUser']>>
>
export type ReactivateUserResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['reactivateUser']>>
>
export type ListUserTeamsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listUserTeams']>>
>
export type ListUserRolesResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listUserRoles']>>
>
export type ListRoutesResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listRoutes']>>
>
export type GetRouteResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getRoute']>>
>
export type ListWorkflowsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listWorkflows']>>
>
export type GetWorkflowResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getWorkflow']>>
>
export type ListProxyApplicantsResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listProxyApplicants']>
  >
>
export type CreateProxyApplicantResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createProxyApplicant']>
  >
>
export type DeleteProxyApplicantResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteProxyApplicant']>
  >
>
export type ListProxyApproversResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listProxyApprovers']>
  >
>
export type CreateProxyApproverResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['createProxyApprover']>
  >
>
export type DeleteProxyApproverResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['deleteProxyApprover']>
  >
>
export type UploadFileResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['uploadFile']>>
>
export type GetFileResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['getFile']>>
>
export type ListAuditLogsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getKickflowRESTAPIV1>['listAuditLogs']>>
>
