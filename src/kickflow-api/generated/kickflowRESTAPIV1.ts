import type {
  ActivateOrganizationChartBody,
  AuditLog,
  BadRequestResponse,
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
  ForbiddenResponse,
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
  NotFoundResponse,
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
  UnauthorizedResponse,
  UnprocessableContentResponse,
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

import { customFetchInstance } from '../custom-fetch-instance.js'

/**
 * カテゴリの一覧を取得します。
 * @summary カテゴリの一覧を取得
 */
export type listCategoriesResponse200 = {
  data: Category[]
  status: 200
}

export type listCategoriesResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listCategoriesResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listCategoriesResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listCategoriesResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listCategoriesResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listCategoriesResponseSuccess = listCategoriesResponse200 & {
  headers: Headers
}
export type listCategoriesResponseError = (
  | listCategoriesResponse400
  | listCategoriesResponse401
  | listCategoriesResponse403
  | listCategoriesResponse404
  | listCategoriesResponse422
) & {
  headers: Headers
}

export type listCategoriesResponse =
  | listCategoriesResponseSuccess
  | listCategoriesResponseError

export const getListCategoriesUrl = (params?: ListCategoriesParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/categories?${stringifiedParams}`
    : `/v1/categories`
}

export const listCategories = async (
  params?: ListCategoriesParams,
  options?: RequestInit,
): Promise<listCategoriesResponse> => {
  return customFetchInstance<listCategoriesResponse>(
    getListCategoriesUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * カテゴリを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを作成
 */
export type createCategoryResponse200 = {
  data: Category
  status: 200
}

export type createCategoryResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createCategoryResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createCategoryResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createCategoryResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createCategoryResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createCategoryResponseSuccess = createCategoryResponse200 & {
  headers: Headers
}
export type createCategoryResponseError = (
  | createCategoryResponse400
  | createCategoryResponse401
  | createCategoryResponse403
  | createCategoryResponse404
  | createCategoryResponse422
) & {
  headers: Headers
}

export type createCategoryResponse =
  | createCategoryResponseSuccess
  | createCategoryResponseError

export const getCreateCategoryUrl = () => {
  return `/v1/categories`
}

export const createCategory = async (
  createCategoryBody: CreateCategoryBody,
  options?: RequestInit,
): Promise<createCategoryResponse> => {
  return customFetchInstance<createCategoryResponse>(getCreateCategoryUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createCategoryBody),
  })
}

/**
 * カテゴリを削除します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを削除
 */
export type deleteCategoryResponse200 = {
  data: void
  status: 200
}

export type deleteCategoryResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteCategoryResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteCategoryResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteCategoryResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteCategoryResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteCategoryResponseSuccess = deleteCategoryResponse200 & {
  headers: Headers
}
export type deleteCategoryResponseError = (
  | deleteCategoryResponse400
  | deleteCategoryResponse401
  | deleteCategoryResponse403
  | deleteCategoryResponse404
  | deleteCategoryResponse422
) & {
  headers: Headers
}

export type deleteCategoryResponse =
  | deleteCategoryResponseSuccess
  | deleteCategoryResponseError

export const getDeleteCategoryUrl = (categoryId: string) => {
  return `/v1/categories/${categoryId}`
}

export const deleteCategory = async (
  categoryId: string,
  options?: RequestInit,
): Promise<deleteCategoryResponse> => {
  return customFetchInstance<deleteCategoryResponse>(
    getDeleteCategoryUrl(categoryId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * カテゴリを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを更新
 */
export type updateCategoryResponse200 = {
  data: Category
  status: 200
}

export type updateCategoryResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateCategoryResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateCategoryResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateCategoryResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateCategoryResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateCategoryResponseSuccess = updateCategoryResponse200 & {
  headers: Headers
}
export type updateCategoryResponseError = (
  | updateCategoryResponse400
  | updateCategoryResponse401
  | updateCategoryResponse403
  | updateCategoryResponse404
  | updateCategoryResponse422
) & {
  headers: Headers
}

export type updateCategoryResponse =
  | updateCategoryResponseSuccess
  | updateCategoryResponseError

export const getUpdateCategoryUrl = (categoryId: string) => {
  return `/v1/categories/${categoryId}`
}

export const updateCategory = async (
  categoryId: string,
  updateCategoryBody: UpdateCategoryBody,
  options?: RequestInit,
): Promise<updateCategoryResponse> => {
  return customFetchInstance<updateCategoryResponse>(
    getUpdateCategoryUrl(categoryId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateCategoryBody),
    },
  )
}

/**
 * フォルダの一覧を取得します。
 * @summary フォルダの一覧を取得
 */
export type listFoldersResponse200 = {
  data: Folder[]
  status: 200
}

export type listFoldersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listFoldersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listFoldersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listFoldersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listFoldersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listFoldersResponseSuccess = listFoldersResponse200 & {
  headers: Headers
}
export type listFoldersResponseError = (
  | listFoldersResponse400
  | listFoldersResponse401
  | listFoldersResponse403
  | listFoldersResponse404
  | listFoldersResponse422
) & {
  headers: Headers
}

export type listFoldersResponse =
  | listFoldersResponseSuccess
  | listFoldersResponseError

export const getListFoldersUrl = (params?: ListFoldersParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/folders?${stringifiedParams}`
    : `/v1/folders`
}

export const listFolders = async (
  params?: ListFoldersParams,
  options?: RequestInit,
): Promise<listFoldersResponse> => {
  return customFetchInstance<listFoldersResponse>(getListFoldersUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * フォルダを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを作成
 */
export type createFolderResponse200 = {
  data: FolderDetail
  status: 200
}

export type createFolderResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createFolderResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createFolderResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createFolderResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createFolderResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createFolderResponseSuccess = createFolderResponse200 & {
  headers: Headers
}
export type createFolderResponseError = (
  | createFolderResponse400
  | createFolderResponse401
  | createFolderResponse403
  | createFolderResponse404
  | createFolderResponse422
) & {
  headers: Headers
}

export type createFolderResponse =
  | createFolderResponseSuccess
  | createFolderResponseError

export const getCreateFolderUrl = () => {
  return `/v1/folders`
}

export const createFolder = async (
  createFolderBody: CreateFolderBody,
  options?: RequestInit,
): Promise<createFolderResponse> => {
  return customFetchInstance<createFolderResponse>(getCreateFolderUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createFolderBody),
  })
}

/**
 * フォルダを削除します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。

注意：このフォルダ以下のすべてのフォルダ・ワークフロー・経路・パイプラインも削除されます。
 * @summary フォルダを削除
 */
export type deleteFolderResponse200 = {
  data: void
  status: 200
}

export type deleteFolderResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteFolderResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteFolderResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteFolderResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteFolderResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteFolderResponseSuccess = deleteFolderResponse200 & {
  headers: Headers
}
export type deleteFolderResponseError = (
  | deleteFolderResponse400
  | deleteFolderResponse401
  | deleteFolderResponse403
  | deleteFolderResponse404
  | deleteFolderResponse422
) & {
  headers: Headers
}

export type deleteFolderResponse =
  | deleteFolderResponseSuccess
  | deleteFolderResponseError

export const getDeleteFolderUrl = (folderId: string) => {
  return `/v1/folders/${folderId}`
}

export const deleteFolder = async (
  folderId: string,
  options?: RequestInit,
): Promise<deleteFolderResponse> => {
  return customFetchInstance<deleteFolderResponse>(
    getDeleteFolderUrl(folderId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * フォルダを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを更新
 */
export type updateFolderResponse200 = {
  data: FolderDetail
  status: 200
}

export type updateFolderResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateFolderResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateFolderResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateFolderResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateFolderResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateFolderResponseSuccess = updateFolderResponse200 & {
  headers: Headers
}
export type updateFolderResponseError = (
  | updateFolderResponse400
  | updateFolderResponse401
  | updateFolderResponse403
  | updateFolderResponse404
  | updateFolderResponse422
) & {
  headers: Headers
}

export type updateFolderResponse =
  | updateFolderResponseSuccess
  | updateFolderResponseError

export const getUpdateFolderUrl = (folderId: string) => {
  return `/v1/folders/${folderId}`
}

export const updateFolder = async (
  folderId: string,
  updateFolderBody: UpdateFolderBody,
  options?: RequestInit,
): Promise<updateFolderResponse> => {
  return customFetchInstance<updateFolderResponse>(
    getUpdateFolderUrl(folderId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateFolderBody),
    },
  )
}

/**
 * フォルダを一件取得します。
 * @summary フォルダを取得
 */
export type getFolderResponse200 = {
  data: FolderDetail
  status: 200
}

export type getFolderResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getFolderResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getFolderResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getFolderResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getFolderResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getFolderResponseSuccess = getFolderResponse200 & {
  headers: Headers
}
export type getFolderResponseError = (
  | getFolderResponse400
  | getFolderResponse401
  | getFolderResponse403
  | getFolderResponse404
  | getFolderResponse422
) & {
  headers: Headers
}

export type getFolderResponse =
  | getFolderResponseSuccess
  | getFolderResponseError

export const getGetFolderUrl = (folderId: string) => {
  return `/v1/folders/${folderId}`
}

export const getFolder = async (
  folderId: string,
  options?: RequestInit,
): Promise<getFolderResponse> => {
  return customFetchInstance<getFolderResponse>(getGetFolderUrl(folderId), {
    ...options,
    method: 'GET',
  })
}

/**
 * 汎用マスタの一覧を取得します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタの一覧を取得
 */
export type listGeneralMastersResponse200 = {
  data: GeneralMaster[]
  status: 200
}

export type listGeneralMastersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listGeneralMastersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listGeneralMastersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listGeneralMastersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listGeneralMastersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listGeneralMastersResponseSuccess =
  listGeneralMastersResponse200 & {
    headers: Headers
  }
export type listGeneralMastersResponseError = (
  | listGeneralMastersResponse400
  | listGeneralMastersResponse401
  | listGeneralMastersResponse403
  | listGeneralMastersResponse404
  | listGeneralMastersResponse422
) & {
  headers: Headers
}

export type listGeneralMastersResponse =
  | listGeneralMastersResponseSuccess
  | listGeneralMastersResponseError

export const getListGeneralMastersUrl = (params?: ListGeneralMastersParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/generalMasters?${stringifiedParams}`
    : `/v1/generalMasters`
}

export const listGeneralMasters = async (
  params?: ListGeneralMastersParams,
  options?: RequestInit,
): Promise<listGeneralMastersResponse> => {
  return customFetchInstance<listGeneralMastersResponse>(
    getListGeneralMastersUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 汎用マスタを作成します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを作成
 */
export type createGeneralMasterResponse200 = {
  data: GeneralMaster
  status: 200
}

export type createGeneralMasterResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createGeneralMasterResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createGeneralMasterResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createGeneralMasterResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createGeneralMasterResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createGeneralMasterResponseSuccess =
  createGeneralMasterResponse200 & {
    headers: Headers
  }
export type createGeneralMasterResponseError = (
  | createGeneralMasterResponse400
  | createGeneralMasterResponse401
  | createGeneralMasterResponse403
  | createGeneralMasterResponse404
  | createGeneralMasterResponse422
) & {
  headers: Headers
}

export type createGeneralMasterResponse =
  | createGeneralMasterResponseSuccess
  | createGeneralMasterResponseError

export const getCreateGeneralMasterUrl = () => {
  return `/v1/generalMasters`
}

export const createGeneralMaster = async (
  createGeneralMasterBody: CreateGeneralMasterBody,
  options?: RequestInit,
): Promise<createGeneralMasterResponse> => {
  return customFetchInstance<createGeneralMasterResponse>(
    getCreateGeneralMasterUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createGeneralMasterBody),
    },
  )
}

/**
 * 汎用マスタを一件取得します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを取得
 */
export type getGeneralMasterResponse200 = {
  data: GeneralMaster
  status: 200
}

export type getGeneralMasterResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getGeneralMasterResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getGeneralMasterResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getGeneralMasterResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getGeneralMasterResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getGeneralMasterResponseSuccess = getGeneralMasterResponse200 & {
  headers: Headers
}
export type getGeneralMasterResponseError = (
  | getGeneralMasterResponse400
  | getGeneralMasterResponse401
  | getGeneralMasterResponse403
  | getGeneralMasterResponse404
  | getGeneralMasterResponse422
) & {
  headers: Headers
}

export type getGeneralMasterResponse =
  | getGeneralMasterResponseSuccess
  | getGeneralMasterResponseError

export const getGetGeneralMasterUrl = (generalMasterId: string) => {
  return `/v1/generalMasters/${generalMasterId}`
}

export const getGeneralMaster = async (
  generalMasterId: string,
  options?: RequestInit,
): Promise<getGeneralMasterResponse> => {
  return customFetchInstance<getGeneralMasterResponse>(
    getGetGeneralMasterUrl(generalMasterId),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 汎用マスタを更新します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを更新
 */
export type updateGeneralMasterResponse200 = {
  data: GeneralMaster
  status: 200
}

export type updateGeneralMasterResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateGeneralMasterResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateGeneralMasterResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateGeneralMasterResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateGeneralMasterResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateGeneralMasterResponseSuccess =
  updateGeneralMasterResponse200 & {
    headers: Headers
  }
export type updateGeneralMasterResponseError = (
  | updateGeneralMasterResponse400
  | updateGeneralMasterResponse401
  | updateGeneralMasterResponse403
  | updateGeneralMasterResponse404
  | updateGeneralMasterResponse422
) & {
  headers: Headers
}

export type updateGeneralMasterResponse =
  | updateGeneralMasterResponseSuccess
  | updateGeneralMasterResponseError

export const getUpdateGeneralMasterUrl = (generalMasterId: string) => {
  return `/v1/generalMasters/${generalMasterId}`
}

export const updateGeneralMaster = async (
  generalMasterId: string,
  updateGeneralMasterBody: UpdateGeneralMasterBody,
  options?: RequestInit,
): Promise<updateGeneralMasterResponse> => {
  return customFetchInstance<updateGeneralMasterResponse>(
    getUpdateGeneralMasterUrl(generalMasterId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateGeneralMasterBody),
    },
  )
}

/**
 * 汎用マスタを削除します。この汎用マスタのすべてのアイテムも同時に削除されます。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを削除
 */
export type deleteGeneralMasterResponse200 = {
  data: void
  status: 200
}

export type deleteGeneralMasterResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteGeneralMasterResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteGeneralMasterResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteGeneralMasterResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteGeneralMasterResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteGeneralMasterResponseSuccess =
  deleteGeneralMasterResponse200 & {
    headers: Headers
  }
export type deleteGeneralMasterResponseError = (
  | deleteGeneralMasterResponse400
  | deleteGeneralMasterResponse401
  | deleteGeneralMasterResponse403
  | deleteGeneralMasterResponse404
  | deleteGeneralMasterResponse422
) & {
  headers: Headers
}

export type deleteGeneralMasterResponse =
  | deleteGeneralMasterResponseSuccess
  | deleteGeneralMasterResponseError

export const getDeleteGeneralMasterUrl = (generalMasterId: string) => {
  return `/v1/generalMasters/${generalMasterId}`
}

export const deleteGeneralMaster = async (
  generalMasterId: string,
  options?: RequestInit,
): Promise<deleteGeneralMasterResponse> => {
  return customFetchInstance<deleteGeneralMasterResponse>(
    getDeleteGeneralMasterUrl(generalMasterId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * 汎用マスタアイテムの一覧を取得します。
 * @summary 汎用マスタアイテムの一覧を取得
 */
export type listGeneralMasterItemsResponse200 = {
  data: GeneralMasterItem[]
  status: 200
}

export type listGeneralMasterItemsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listGeneralMasterItemsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listGeneralMasterItemsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listGeneralMasterItemsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listGeneralMasterItemsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listGeneralMasterItemsResponseSuccess =
  listGeneralMasterItemsResponse200 & {
    headers: Headers
  }
export type listGeneralMasterItemsResponseError = (
  | listGeneralMasterItemsResponse400
  | listGeneralMasterItemsResponse401
  | listGeneralMasterItemsResponse403
  | listGeneralMasterItemsResponse404
  | listGeneralMasterItemsResponse422
) & {
  headers: Headers
}

export type listGeneralMasterItemsResponse =
  | listGeneralMasterItemsResponseSuccess
  | listGeneralMasterItemsResponseError

export const getListGeneralMasterItemsUrl = (
  generalMasterId: string,
  params?: ListGeneralMasterItemsParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/generalMasters/${generalMasterId}/items?${stringifiedParams}`
    : `/v1/generalMasters/${generalMasterId}/items`
}

export const listGeneralMasterItems = async (
  generalMasterId: string,
  params?: ListGeneralMasterItemsParams,
  options?: RequestInit,
): Promise<listGeneralMasterItemsResponse> => {
  return customFetchInstance<listGeneralMasterItemsResponse>(
    getListGeneralMasterItemsUrl(generalMasterId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 汎用マスタアイテムを作成します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを作成
 */
export type createGeneralMasterItemResponse200 = {
  data: GeneralMasterItem
  status: 200
}

export type createGeneralMasterItemResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createGeneralMasterItemResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createGeneralMasterItemResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createGeneralMasterItemResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createGeneralMasterItemResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createGeneralMasterItemResponseSuccess =
  createGeneralMasterItemResponse200 & {
    headers: Headers
  }
export type createGeneralMasterItemResponseError = (
  | createGeneralMasterItemResponse400
  | createGeneralMasterItemResponse401
  | createGeneralMasterItemResponse403
  | createGeneralMasterItemResponse404
  | createGeneralMasterItemResponse422
) & {
  headers: Headers
}

export type createGeneralMasterItemResponse =
  | createGeneralMasterItemResponseSuccess
  | createGeneralMasterItemResponseError

export const getCreateGeneralMasterItemUrl = (generalMasterId: string) => {
  return `/v1/generalMasters/${generalMasterId}/items`
}

export const createGeneralMasterItem = async (
  generalMasterId: string,
  createGeneralMasterItemBody: CreateGeneralMasterItemBody,
  options?: RequestInit,
): Promise<createGeneralMasterItemResponse> => {
  return customFetchInstance<createGeneralMasterItemResponse>(
    getCreateGeneralMasterItemUrl(generalMasterId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createGeneralMasterItemBody),
    },
  )
}

/**
 * 汎用マスタアイテムを一件取得します。
 * @summary 汎用マスタアイテムを取得
 */
export type getGeneralMasterItemResponse200 = {
  data: GeneralMasterItem
  status: 200
}

export type getGeneralMasterItemResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getGeneralMasterItemResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getGeneralMasterItemResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getGeneralMasterItemResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getGeneralMasterItemResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getGeneralMasterItemResponseSuccess =
  getGeneralMasterItemResponse200 & {
    headers: Headers
  }
export type getGeneralMasterItemResponseError = (
  | getGeneralMasterItemResponse400
  | getGeneralMasterItemResponse401
  | getGeneralMasterItemResponse403
  | getGeneralMasterItemResponse404
  | getGeneralMasterItemResponse422
) & {
  headers: Headers
}

export type getGeneralMasterItemResponse =
  | getGeneralMasterItemResponseSuccess
  | getGeneralMasterItemResponseError

export const getGetGeneralMasterItemUrl = (
  generalMasterId: string,
  itemId: string,
) => {
  return `/v1/generalMasters/${generalMasterId}/items/${itemId}`
}

export const getGeneralMasterItem = async (
  generalMasterId: string,
  itemId: string,
  options?: RequestInit,
): Promise<getGeneralMasterItemResponse> => {
  return customFetchInstance<getGeneralMasterItemResponse>(
    getGetGeneralMasterItemUrl(generalMasterId, itemId),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 汎用マスタアイテムを更新します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを更新
 */
export type updateGeneralMasterItemResponse200 = {
  data: GeneralMasterItem
  status: 200
}

export type updateGeneralMasterItemResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateGeneralMasterItemResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateGeneralMasterItemResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateGeneralMasterItemResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateGeneralMasterItemResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateGeneralMasterItemResponseSuccess =
  updateGeneralMasterItemResponse200 & {
    headers: Headers
  }
export type updateGeneralMasterItemResponseError = (
  | updateGeneralMasterItemResponse400
  | updateGeneralMasterItemResponse401
  | updateGeneralMasterItemResponse403
  | updateGeneralMasterItemResponse404
  | updateGeneralMasterItemResponse422
) & {
  headers: Headers
}

export type updateGeneralMasterItemResponse =
  | updateGeneralMasterItemResponseSuccess
  | updateGeneralMasterItemResponseError

export const getUpdateGeneralMasterItemUrl = (
  generalMasterId: string,
  itemId: string,
) => {
  return `/v1/generalMasters/${generalMasterId}/items/${itemId}`
}

export const updateGeneralMasterItem = async (
  generalMasterId: string,
  itemId: string,
  updateGeneralMasterItemBody: UpdateGeneralMasterItemBody,
  options?: RequestInit,
): Promise<updateGeneralMasterItemResponse> => {
  return customFetchInstance<updateGeneralMasterItemResponse>(
    getUpdateGeneralMasterItemUrl(generalMasterId, itemId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateGeneralMasterItemBody),
    },
  )
}

/**
 * 汎用マスタアイテムを削除します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを削除
 */
export type deleteGeneralMasterItemResponse200 = {
  data: void
  status: 200
}

export type deleteGeneralMasterItemResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteGeneralMasterItemResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteGeneralMasterItemResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteGeneralMasterItemResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteGeneralMasterItemResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteGeneralMasterItemResponseSuccess =
  deleteGeneralMasterItemResponse200 & {
    headers: Headers
  }
export type deleteGeneralMasterItemResponseError = (
  | deleteGeneralMasterItemResponse400
  | deleteGeneralMasterItemResponse401
  | deleteGeneralMasterItemResponse403
  | deleteGeneralMasterItemResponse404
  | deleteGeneralMasterItemResponse422
) & {
  headers: Headers
}

export type deleteGeneralMasterItemResponse =
  | deleteGeneralMasterItemResponseSuccess
  | deleteGeneralMasterItemResponseError

export const getDeleteGeneralMasterItemUrl = (
  generalMasterId: string,
  itemId: string,
) => {
  return `/v1/generalMasters/${generalMasterId}/items/${itemId}`
}

export const deleteGeneralMasterItem = async (
  generalMasterId: string,
  itemId: string,
  options?: RequestInit,
): Promise<deleteGeneralMasterItemResponse> => {
  return customFetchInstance<deleteGeneralMasterItemResponse>(
    getDeleteGeneralMasterItemUrl(generalMasterId, itemId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * 役職の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職の一覧を取得
 */
export type listGradesResponse200 = {
  data: Grade[]
  status: 200
}

export type listGradesResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listGradesResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listGradesResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listGradesResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listGradesResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listGradesResponseSuccess = listGradesResponse200 & {
  headers: Headers
}
export type listGradesResponseError = (
  | listGradesResponse400
  | listGradesResponse401
  | listGradesResponse403
  | listGradesResponse404
  | listGradesResponse422
) & {
  headers: Headers
}

export type listGradesResponse =
  | listGradesResponseSuccess
  | listGradesResponseError

export const getListGradesUrl = (params?: ListGradesParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/grades?${stringifiedParams}`
    : `/v1/grades`
}

export const listGrades = async (
  params?: ListGradesParams,
  options?: RequestInit,
): Promise<listGradesResponse> => {
  return customFetchInstance<listGradesResponse>(getListGradesUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * 役職を作成します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を作成
 */
export type createGradeResponse200 = {
  data: Grade
  status: 200
}

export type createGradeResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createGradeResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createGradeResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createGradeResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createGradeResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createGradeResponseSuccess = createGradeResponse200 & {
  headers: Headers
}
export type createGradeResponseError = (
  | createGradeResponse400
  | createGradeResponse401
  | createGradeResponse403
  | createGradeResponse404
  | createGradeResponse422
) & {
  headers: Headers
}

export type createGradeResponse =
  | createGradeResponseSuccess
  | createGradeResponseError

export const getCreateGradeUrl = () => {
  return `/v1/grades`
}

export const createGrade = async (
  gradeCreateBody: GradeCreateBody,
  options?: RequestInit,
): Promise<createGradeResponse> => {
  return customFetchInstance<createGradeResponse>(getCreateGradeUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(gradeCreateBody),
  })
}

/**
 * 役職を一件取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を取得
 */
export type getGradeResponse200 = {
  data: Grade
  status: 200
}

export type getGradeResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getGradeResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getGradeResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getGradeResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getGradeResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getGradeResponseSuccess = getGradeResponse200 & {
  headers: Headers
}
export type getGradeResponseError = (
  | getGradeResponse400
  | getGradeResponse401
  | getGradeResponse403
  | getGradeResponse404
  | getGradeResponse422
) & {
  headers: Headers
}

export type getGradeResponse = getGradeResponseSuccess | getGradeResponseError

export const getGetGradeUrl = (gradeId: string) => {
  return `/v1/grades/${gradeId}`
}

export const getGrade = async (
  gradeId: string,
  options?: RequestInit,
): Promise<getGradeResponse> => {
  return customFetchInstance<getGradeResponse>(getGetGradeUrl(gradeId), {
    ...options,
    method: 'GET',
  })
}

/**
 * 役職を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。

注意：この役職を使用しているユーザーがいる場合、エラーとなります。先にユーザーから対象の役職を外してください。
 * @summary 役職を削除
 */
export type deleteGradeResponse200 = {
  data: void
  status: 200
}

export type deleteGradeResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteGradeResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteGradeResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteGradeResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteGradeResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteGradeResponseSuccess = deleteGradeResponse200 & {
  headers: Headers
}
export type deleteGradeResponseError = (
  | deleteGradeResponse400
  | deleteGradeResponse401
  | deleteGradeResponse403
  | deleteGradeResponse404
  | deleteGradeResponse422
) & {
  headers: Headers
}

export type deleteGradeResponse =
  | deleteGradeResponseSuccess
  | deleteGradeResponseError

export const getDeleteGradeUrl = (gradeId: string) => {
  return `/v1/grades/${gradeId}`
}

export const deleteGrade = async (
  gradeId: string,
  options?: RequestInit,
): Promise<deleteGradeResponse> => {
  return customFetchInstance<deleteGradeResponse>(getDeleteGradeUrl(gradeId), {
    ...options,
    method: 'DELETE',
  })
}

/**
 * 役職を更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を更新
 */
export type updateGradeResponse200 = {
  data: Grade
  status: 200
}

export type updateGradeResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateGradeResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateGradeResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateGradeResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateGradeResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateGradeResponseSuccess = updateGradeResponse200 & {
  headers: Headers
}
export type updateGradeResponseError = (
  | updateGradeResponse400
  | updateGradeResponse401
  | updateGradeResponse403
  | updateGradeResponse404
  | updateGradeResponse422
) & {
  headers: Headers
}

export type updateGradeResponse =
  | updateGradeResponseSuccess
  | updateGradeResponseError

export const getUpdateGradeUrl = (gradeId: string) => {
  return `/v1/grades/${gradeId}`
}

export const updateGrade = async (
  gradeId: string,
  gradeUpdateBody: GradeUpdateBody,
  options?: RequestInit,
): Promise<updateGradeResponse> => {
  return customFetchInstance<updateGradeResponse>(getUpdateGradeUrl(gradeId), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(gradeUpdateBody),
  })
}

/**
 * 指定した役職をデフォルトにします。
同時に、これまでデフォルトだった役職は自動的にデフォルトではなくなります。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary デフォルトの役職を変更
 */
export type setDefaultGradeResponse200 = {
  data: void
  status: 200
}

export type setDefaultGradeResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type setDefaultGradeResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type setDefaultGradeResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type setDefaultGradeResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type setDefaultGradeResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type setDefaultGradeResponseSuccess = setDefaultGradeResponse200 & {
  headers: Headers
}
export type setDefaultGradeResponseError = (
  | setDefaultGradeResponse400
  | setDefaultGradeResponse401
  | setDefaultGradeResponse403
  | setDefaultGradeResponse404
  | setDefaultGradeResponse422
) & {
  headers: Headers
}

export type setDefaultGradeResponse =
  | setDefaultGradeResponseSuccess
  | setDefaultGradeResponseError

export const getSetDefaultGradeUrl = (gradeId: string) => {
  return `/v1/grades/${gradeId}/default`
}

export const setDefaultGrade = async (
  gradeId: string,
  options?: RequestInit,
): Promise<setDefaultGradeResponse> => {
  return customFetchInstance<setDefaultGradeResponse>(
    getSetDefaultGradeUrl(gradeId),
    {
      ...options,
      method: 'POST',
    },
  )
}

/**
 * 組織図の一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。

注意：パフォーマンス上の理由から、組織図の一覧取得時は組織図内のチームのリストがレスポンスに含まれません。
組織図のすべての情報を取得したい場合は、組織図を一件だけ取得するAPI経由で取得してください。
 * @summary 組織図の一覧を取得
 */
export type listOrganizationChartsResponse200 = {
  data: OrganizationChart[]
  status: 200
}

export type listOrganizationChartsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listOrganizationChartsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listOrganizationChartsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listOrganizationChartsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listOrganizationChartsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listOrganizationChartsResponseSuccess =
  listOrganizationChartsResponse200 & {
    headers: Headers
  }
export type listOrganizationChartsResponseError = (
  | listOrganizationChartsResponse400
  | listOrganizationChartsResponse401
  | listOrganizationChartsResponse403
  | listOrganizationChartsResponse404
  | listOrganizationChartsResponse422
) & {
  headers: Headers
}

export type listOrganizationChartsResponse =
  | listOrganizationChartsResponseSuccess
  | listOrganizationChartsResponseError

export const getListOrganizationChartsUrl = (
  params?: ListOrganizationChartsParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/organizationCharts?${stringifiedParams}`
    : `/v1/organizationCharts`
}

export const listOrganizationCharts = async (
  params?: ListOrganizationChartsParams,
  options?: RequestInit,
): Promise<listOrganizationChartsResponse> => {
  return customFetchInstance<listOrganizationChartsResponse>(
    getListOrganizationChartsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 組織図を作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を作成
 */
export type createOrganizationChartResponse200 = {
  data: OrganizationChartDetail
  status: 200
}

export type createOrganizationChartResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createOrganizationChartResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createOrganizationChartResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createOrganizationChartResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createOrganizationChartResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createOrganizationChartResponseSuccess =
  createOrganizationChartResponse200 & {
    headers: Headers
  }
export type createOrganizationChartResponseError = (
  | createOrganizationChartResponse400
  | createOrganizationChartResponse401
  | createOrganizationChartResponse403
  | createOrganizationChartResponse404
  | createOrganizationChartResponse422
) & {
  headers: Headers
}

export type createOrganizationChartResponse =
  | createOrganizationChartResponseSuccess
  | createOrganizationChartResponseError

export const getCreateOrganizationChartUrl = () => {
  return `/v1/organizationCharts`
}

export const createOrganizationChart = async (
  organizationChartBody: OrganizationChartBody,
  options?: RequestInit,
): Promise<createOrganizationChartResponse> => {
  return customFetchInstance<createOrganizationChartResponse>(
    getCreateOrganizationChartUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(organizationChartBody),
    },
  )
}

/**
 * 組織図を削除します。同時に、組織図内のチームや所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。

注意：現在有効な組織図は削除できません。
注意：組織図の削除は時間がかかることがあるため、削除は非同期で実行されます。削除の完了前にレスポンスを返すので注意してください。
 * @summary 組織図を削除
 */
export type deleteOrganizationChartResponse200 = {
  data: void
  status: 200
}

export type deleteOrganizationChartResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteOrganizationChartResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteOrganizationChartResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteOrganizationChartResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteOrganizationChartResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteOrganizationChartResponseSuccess =
  deleteOrganizationChartResponse200 & {
    headers: Headers
  }
export type deleteOrganizationChartResponseError = (
  | deleteOrganizationChartResponse400
  | deleteOrganizationChartResponse401
  | deleteOrganizationChartResponse403
  | deleteOrganizationChartResponse404
  | deleteOrganizationChartResponse422
) & {
  headers: Headers
}

export type deleteOrganizationChartResponse =
  | deleteOrganizationChartResponseSuccess
  | deleteOrganizationChartResponseError

export const getDeleteOrganizationChartUrl = (organizationChartId: string) => {
  return `/v1/organizationCharts/${organizationChartId}`
}

export const deleteOrganizationChart = async (
  organizationChartId: string,
  options?: RequestInit,
): Promise<deleteOrganizationChartResponse> => {
  return customFetchInstance<deleteOrganizationChartResponse>(
    getDeleteOrganizationChartUrl(organizationChartId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * 組織図を一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を取得
 */
export type getOrganizationChartResponse200 = {
  data: OrganizationChartDetail
  status: 200
}

export type getOrganizationChartResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getOrganizationChartResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getOrganizationChartResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getOrganizationChartResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getOrganizationChartResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getOrganizationChartResponseSuccess =
  getOrganizationChartResponse200 & {
    headers: Headers
  }
export type getOrganizationChartResponseError = (
  | getOrganizationChartResponse400
  | getOrganizationChartResponse401
  | getOrganizationChartResponse403
  | getOrganizationChartResponse404
  | getOrganizationChartResponse422
) & {
  headers: Headers
}

export type getOrganizationChartResponse =
  | getOrganizationChartResponseSuccess
  | getOrganizationChartResponseError

export const getGetOrganizationChartUrl = (organizationChartId: string) => {
  return `/v1/organizationCharts/${organizationChartId}`
}

export const getOrganizationChart = async (
  organizationChartId: string,
  options?: RequestInit,
): Promise<getOrganizationChartResponse> => {
  return customFetchInstance<getOrganizationChartResponse>(
    getGetOrganizationChartUrl(organizationChartId),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 組織図を更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を更新
 */
export type updateOrganizationChartResponse200 = {
  data: OrganizationChartDetail
  status: 200
}

export type updateOrganizationChartResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateOrganizationChartResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateOrganizationChartResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateOrganizationChartResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateOrganizationChartResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateOrganizationChartResponseSuccess =
  updateOrganizationChartResponse200 & {
    headers: Headers
  }
export type updateOrganizationChartResponseError = (
  | updateOrganizationChartResponse400
  | updateOrganizationChartResponse401
  | updateOrganizationChartResponse403
  | updateOrganizationChartResponse404
  | updateOrganizationChartResponse422
) & {
  headers: Headers
}

export type updateOrganizationChartResponse =
  | updateOrganizationChartResponseSuccess
  | updateOrganizationChartResponseError

export const getUpdateOrganizationChartUrl = (organizationChartId: string) => {
  return `/v1/organizationCharts/${organizationChartId}`
}

export const updateOrganizationChart = async (
  organizationChartId: string,
  organizationChartBody: OrganizationChartBody,
  options?: RequestInit,
): Promise<updateOrganizationChartResponse> => {
  return customFetchInstance<updateOrganizationChartResponse>(
    getUpdateOrganizationChartUrl(organizationChartId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(organizationChartBody),
    },
  )
}

/**
 * 現在有効になっている組織図を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 現在の組織図を取得
 */
export type getCurrentOrganizationChartResponse200 = {
  data: OrganizationChartDetail
  status: 200
}

export type getCurrentOrganizationChartResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getCurrentOrganizationChartResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getCurrentOrganizationChartResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getCurrentOrganizationChartResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getCurrentOrganizationChartResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getCurrentOrganizationChartResponseSuccess =
  getCurrentOrganizationChartResponse200 & {
    headers: Headers
  }
export type getCurrentOrganizationChartResponseError = (
  | getCurrentOrganizationChartResponse400
  | getCurrentOrganizationChartResponse401
  | getCurrentOrganizationChartResponse403
  | getCurrentOrganizationChartResponse404
  | getCurrentOrganizationChartResponse422
) & {
  headers: Headers
}

export type getCurrentOrganizationChartResponse =
  | getCurrentOrganizationChartResponseSuccess
  | getCurrentOrganizationChartResponseError

export const getGetCurrentOrganizationChartUrl = () => {
  return `/v1/organizationChart`
}

export const getCurrentOrganizationChart = async (
  options?: RequestInit,
): Promise<getCurrentOrganizationChartResponse> => {
  return customFetchInstance<getCurrentOrganizationChartResponse>(
    getGetCurrentOrganizationChartUrl(),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 指定した組織図を有効化し、ワークフローで使用する組織図を切り替えます。
他の組織図に有効化の予定がある場合、それらの予定は削除されます。

このAPIの実行には、チームの管理権限が必要です。

注意：組織図の有効化は時間がかかることがあるため、有効化は非同期で実行されます。有効化の完了前にレスポンスを返すので注意してください。
 * @summary 組織図を有効化
 */
export type activateOrganizationChartResponse200 = {
  data: OrganizationChartDetail
  status: 200
}

export type activateOrganizationChartResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type activateOrganizationChartResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type activateOrganizationChartResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type activateOrganizationChartResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type activateOrganizationChartResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type activateOrganizationChartResponseSuccess =
  activateOrganizationChartResponse200 & {
    headers: Headers
  }
export type activateOrganizationChartResponseError = (
  | activateOrganizationChartResponse400
  | activateOrganizationChartResponse401
  | activateOrganizationChartResponse403
  | activateOrganizationChartResponse404
  | activateOrganizationChartResponse422
) & {
  headers: Headers
}

export type activateOrganizationChartResponse =
  | activateOrganizationChartResponseSuccess
  | activateOrganizationChartResponseError

export const getActivateOrganizationChartUrl = (
  organizationChartId: string,
) => {
  return `/v1/organizationCharts/${organizationChartId}/activate`
}

export const activateOrganizationChart = async (
  organizationChartId: string,
  activateOrganizationChartBody: ActivateOrganizationChartBody,
  options?: RequestInit,
): Promise<activateOrganizationChartResponse> => {
  return customFetchInstance<activateOrganizationChartResponse>(
    getActivateOrganizationChartUrl(organizationChartId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(activateOrganizationChartBody),
    },
  )
}

/**
 * 指定した組織図内のチーム一覧を取得します。

parentIdを指定した場合は指定した親チームの配下チームの一覧を、parentIdを指定しない場合は組織図内のルートのチーム一覧を返します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チーム一覧を取得
 */
export type listTeamsResponse200 = {
  data: Team[]
  status: 200
}

export type listTeamsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listTeamsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listTeamsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listTeamsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listTeamsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listTeamsResponseSuccess = listTeamsResponse200 & {
  headers: Headers
}
export type listTeamsResponseError = (
  | listTeamsResponse400
  | listTeamsResponse401
  | listTeamsResponse403
  | listTeamsResponse404
  | listTeamsResponse422
) & {
  headers: Headers
}

export type listTeamsResponse =
  | listTeamsResponseSuccess
  | listTeamsResponseError

export const getListTeamsUrl = (
  organizationChartId: string,
  params?: ListTeamsParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/organizationCharts/${organizationChartId}/teams?${stringifiedParams}`
    : `/v1/organizationCharts/${organizationChartId}/teams`
}

export const listTeams = async (
  organizationChartId: string,
  params?: ListTeamsParams,
  options?: RequestInit,
): Promise<listTeamsResponse> => {
  return customFetchInstance<listTeamsResponse>(
    getListTeamsUrl(organizationChartId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 指定した組織図内にチームを作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを作成
 */
export type createTeamResponse200 = {
  data: TeamDetail
  status: 200
}

export type createTeamResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createTeamResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createTeamResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createTeamResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createTeamResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createTeamResponseSuccess = createTeamResponse200 & {
  headers: Headers
}
export type createTeamResponseError = (
  | createTeamResponse400
  | createTeamResponse401
  | createTeamResponse403
  | createTeamResponse404
  | createTeamResponse422
) & {
  headers: Headers
}

export type createTeamResponse =
  | createTeamResponseSuccess
  | createTeamResponseError

export const getCreateTeamUrl = (organizationChartId: string) => {
  return `/v1/organizationCharts/${organizationChartId}/teams`
}

export const createTeam = async (
  organizationChartId: string,
  teamCreateBody: TeamCreateBody,
  options?: RequestInit,
): Promise<createTeamResponse> => {
  return customFetchInstance<createTeamResponse>(
    getCreateTeamUrl(organizationChartId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(teamCreateBody),
    },
  )
}

/**
 * チームを一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを取得
 */
export type getTeamResponse200 = {
  data: TeamDetail
  status: 200
}

export type getTeamResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getTeamResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getTeamResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getTeamResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getTeamResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getTeamResponseSuccess = getTeamResponse200 & {
  headers: Headers
}
export type getTeamResponseError = (
  | getTeamResponse400
  | getTeamResponse401
  | getTeamResponse403
  | getTeamResponse404
  | getTeamResponse422
) & {
  headers: Headers
}

export type getTeamResponse = getTeamResponseSuccess | getTeamResponseError

export const getGetTeamUrl = (organizationChartId: string, teamId: string) => {
  return `/v1/organizationCharts/${organizationChartId}/teams/${teamId}`
}

export const getTeam = async (
  organizationChartId: string,
  teamId: string,
  options?: RequestInit,
): Promise<getTeamResponse> => {
  return customFetchInstance<getTeamResponse>(
    getGetTeamUrl(organizationChartId, teamId),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * チームを更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを編集
 */
export type updateTeamResponse200 = {
  data: TeamDetail
  status: 200
}

export type updateTeamResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateTeamResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateTeamResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateTeamResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateTeamResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateTeamResponseSuccess = updateTeamResponse200 & {
  headers: Headers
}
export type updateTeamResponseError = (
  | updateTeamResponse400
  | updateTeamResponse401
  | updateTeamResponse403
  | updateTeamResponse404
  | updateTeamResponse422
) & {
  headers: Headers
}

export type updateTeamResponse =
  | updateTeamResponseSuccess
  | updateTeamResponseError

export const getUpdateTeamUrl = (
  organizationChartId: string,
  teamId: string,
) => {
  return `/v1/organizationCharts/${organizationChartId}/teams/${teamId}`
}

export const updateTeam = async (
  organizationChartId: string,
  teamId: string,
  teamUpdateBody: TeamUpdateBody,
  options?: RequestInit,
): Promise<updateTeamResponse> => {
  return customFetchInstance<updateTeamResponse>(
    getUpdateTeamUrl(organizationChartId, teamId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(teamUpdateBody),
    },
  )
}

/**
 * チームを削除します。同時に、このチームの所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームを削除
 */
export type deleteTeamResponse200 = {
  data: void
  status: 200
}

export type deleteTeamResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteTeamResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteTeamResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteTeamResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteTeamResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteTeamResponseSuccess = deleteTeamResponse200 & {
  headers: Headers
}
export type deleteTeamResponseError = (
  | deleteTeamResponse400
  | deleteTeamResponse401
  | deleteTeamResponse403
  | deleteTeamResponse404
  | deleteTeamResponse422
) & {
  headers: Headers
}

export type deleteTeamResponse =
  | deleteTeamResponseSuccess
  | deleteTeamResponseError

export const getDeleteTeamUrl = (
  organizationChartId: string,
  teamId: string,
) => {
  return `/v1/organizationCharts/${organizationChartId}/teams/${teamId}`
}

export const deleteTeam = async (
  organizationChartId: string,
  teamId: string,
  options?: RequestInit,
): Promise<deleteTeamResponse> => {
  return customFetchInstance<deleteTeamResponse>(
    getDeleteTeamUrl(organizationChartId, teamId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * チームのメンバー一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary チームのメンバー一覧を取得
 */
export type listTeamMembersResponse200 = {
  data: MemberUser[]
  status: 200
}

export type listTeamMembersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listTeamMembersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listTeamMembersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listTeamMembersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listTeamMembersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listTeamMembersResponseSuccess = listTeamMembersResponse200 & {
  headers: Headers
}
export type listTeamMembersResponseError = (
  | listTeamMembersResponse400
  | listTeamMembersResponse401
  | listTeamMembersResponse403
  | listTeamMembersResponse404
  | listTeamMembersResponse422
) & {
  headers: Headers
}

export type listTeamMembersResponse =
  | listTeamMembersResponseSuccess
  | listTeamMembersResponseError

export const getListTeamMembersUrl = (
  organizationChartId: string,
  teamId: string,
  params?: ListTeamMembersParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships?${stringifiedParams}`
    : `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships`
}

export const listTeamMembers = async (
  organizationChartId: string,
  teamId: string,
  params?: ListTeamMembersParams,
  options?: RequestInit,
): Promise<listTeamMembersResponse> => {
  return customFetchInstance<listTeamMembersResponse>(
    getListTeamMembersUrl(organizationChartId, teamId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 指定したチームにメンバーを追加します。最大10人まで同時に追加可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームにメンバーを追加
 */
export type createTeamMembersResponse200 = {
  data: void
  status: 200
}

export type createTeamMembersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createTeamMembersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createTeamMembersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createTeamMembersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createTeamMembersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createTeamMembersResponseSuccess = createTeamMembersResponse200 & {
  headers: Headers
}
export type createTeamMembersResponseError = (
  | createTeamMembersResponse400
  | createTeamMembersResponse401
  | createTeamMembersResponse403
  | createTeamMembersResponse404
  | createTeamMembersResponse422
) & {
  headers: Headers
}

export type createTeamMembersResponse =
  | createTeamMembersResponseSuccess
  | createTeamMembersResponseError

export const getCreateTeamMembersUrl = (
  organizationChartId: string,
  teamId: string,
) => {
  return `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships`
}

export const createTeamMembers = async (
  organizationChartId: string,
  teamId: string,
  createTeamMembersBody: CreateTeamMembersBody,
  options?: RequestInit,
): Promise<createTeamMembersResponse> => {
  return customFetchInstance<createTeamMembersResponse>(
    getCreateTeamMembersUrl(organizationChartId, teamId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createTeamMembersBody),
    },
  )
}

/**
 * 指定したチームからメンバーを削除します。最大10人まで同時に削除可能です。

このAPIの実行には、チームの管理権限が必要です。

注意: 削除後もメンバーが残る場合、チームに上長は最低一人必要です。メンバー削除によって上長が不在になる場合、APIは422 Unprocessable Contentを返します。
 * @summary チームからメンバーを削除
 */
export type deleteTeamMembersResponse200 = {
  data: void
  status: 200
}

export type deleteTeamMembersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteTeamMembersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteTeamMembersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteTeamMembersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteTeamMembersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteTeamMembersResponseSuccess = deleteTeamMembersResponse200 & {
  headers: Headers
}
export type deleteTeamMembersResponseError = (
  | deleteTeamMembersResponse400
  | deleteTeamMembersResponse401
  | deleteTeamMembersResponse403
  | deleteTeamMembersResponse404
  | deleteTeamMembersResponse422
) & {
  headers: Headers
}

export type deleteTeamMembersResponse =
  | deleteTeamMembersResponseSuccess
  | deleteTeamMembersResponseError

export const getDeleteTeamMembersUrl = (
  organizationChartId: string,
  teamId: string,
) => {
  return `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships`
}

export const deleteTeamMembers = async (
  organizationChartId: string,
  teamId: string,
  deleteTeamMembersBody: DeleteTeamMembersBody,
  options?: RequestInit,
): Promise<deleteTeamMembersResponse> => {
  return customFetchInstance<deleteTeamMembersResponse>(
    getDeleteTeamMembersUrl(organizationChartId, teamId),
    {
      ...options,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(deleteTeamMembersBody),
    },
  )
}

/**
 * 指定したメンバーを更新します。

このAPIの実行には、チームの管理権限が必要です。

注意: チームに上長は最低一人は必要です。上長が不在の場合、APIは422 Unprocessable Contentを返します。
 * @summary チームのメンバーを更新
 */
export type updateTeamMemberResponse200 = {
  data: void
  status: 200
}

export type updateTeamMemberResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateTeamMemberResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateTeamMemberResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateTeamMemberResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateTeamMemberResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateTeamMemberResponseSuccess = updateTeamMemberResponse200 & {
  headers: Headers
}
export type updateTeamMemberResponseError = (
  | updateTeamMemberResponse400
  | updateTeamMemberResponse401
  | updateTeamMemberResponse403
  | updateTeamMemberResponse404
  | updateTeamMemberResponse422
) & {
  headers: Headers
}

export type updateTeamMemberResponse =
  | updateTeamMemberResponseSuccess
  | updateTeamMemberResponseError

export const getUpdateTeamMemberUrl = (
  organizationChartId: string,
  teamId: string,
  userId: string,
) => {
  return `/v1/organizationCharts/${organizationChartId}/teams/${teamId}/memberships/${userId}`
}

export const updateTeamMember = async (
  organizationChartId: string,
  teamId: string,
  userId: string,
  updateTeamMemberBody: UpdateTeamMemberBody,
  options?: RequestInit,
): Promise<updateTeamMemberResponse> => {
  return customFetchInstance<updateTeamMemberResponse>(
    getUpdateTeamMemberUrl(organizationChartId, teamId, userId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateTeamMemberBody),
    },
  )
}

/**
 * 管理者ロールの一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールの一覧を取得
 */
export type listRolesResponse200 = {
  data: Role[]
  status: 200
}

export type listRolesResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listRolesResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listRolesResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listRolesResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listRolesResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listRolesResponseSuccess = listRolesResponse200 & {
  headers: Headers
}
export type listRolesResponseError = (
  | listRolesResponse400
  | listRolesResponse401
  | listRolesResponse403
  | listRolesResponse404
  | listRolesResponse422
) & {
  headers: Headers
}

export type listRolesResponse =
  | listRolesResponseSuccess
  | listRolesResponseError

export const getListRolesUrl = (params?: ListRolesParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/roles?${stringifiedParams}`
    : `/v1/roles`
}

export const listRoles = async (
  params?: ListRolesParams,
  options?: RequestInit,
): Promise<listRolesResponse> => {
  return customFetchInstance<listRolesResponse>(getListRolesUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * 管理者ロールを作成します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを作成
 */
export type createRoleResponse200 = {
  data: RoleDetail
  status: 200
}

export type createRoleResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createRoleResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createRoleResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createRoleResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createRoleResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createRoleResponseSuccess = createRoleResponse200 & {
  headers: Headers
}
export type createRoleResponseError = (
  | createRoleResponse400
  | createRoleResponse401
  | createRoleResponse403
  | createRoleResponse404
  | createRoleResponse422
) & {
  headers: Headers
}

export type createRoleResponse =
  | createRoleResponseSuccess
  | createRoleResponseError

export const getCreateRoleUrl = () => {
  return `/v1/roles`
}

export const createRole = async (
  roleCreateBody: RoleCreateBody,
  options?: RequestInit,
): Promise<createRoleResponse> => {
  return customFetchInstance<createRoleResponse>(getCreateRoleUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(roleCreateBody),
  })
}

/**
 * 管理者ロールを一件取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを取得
 */
export type getRoleResponse200 = {
  data: RoleDetail
  status: 200
}

export type getRoleResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getRoleResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getRoleResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getRoleResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getRoleResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getRoleResponseSuccess = getRoleResponse200 & {
  headers: Headers
}
export type getRoleResponseError = (
  | getRoleResponse400
  | getRoleResponse401
  | getRoleResponse403
  | getRoleResponse404
  | getRoleResponse422
) & {
  headers: Headers
}

export type getRoleResponse = getRoleResponseSuccess | getRoleResponseError

export const getGetRoleUrl = (roleId: string) => {
  return `/v1/roles/${roleId}`
}

export const getRole = async (
  roleId: string,
  options?: RequestInit,
): Promise<getRoleResponse> => {
  return customFetchInstance<getRoleResponse>(getGetRoleUrl(roleId), {
    ...options,
    method: 'GET',
  })
}

/**
 * 管理者ロールを更新します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを更新
 */
export type updateRoleResponse200 = {
  data: RoleDetail
  status: 200
}

export type updateRoleResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateRoleResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateRoleResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateRoleResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateRoleResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateRoleResponseSuccess = updateRoleResponse200 & {
  headers: Headers
}
export type updateRoleResponseError = (
  | updateRoleResponse400
  | updateRoleResponse401
  | updateRoleResponse403
  | updateRoleResponse404
  | updateRoleResponse422
) & {
  headers: Headers
}

export type updateRoleResponse =
  | updateRoleResponseSuccess
  | updateRoleResponseError

export const getUpdateRoleUrl = (roleId: string) => {
  return `/v1/roles/${roleId}`
}

export const updateRole = async (
  roleId: string,
  roleUpdateBody: RoleUpdateBody,
  options?: RequestInit,
): Promise<updateRoleResponse> => {
  return customFetchInstance<updateRoleResponse>(getUpdateRoleUrl(roleId), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(roleUpdateBody),
  })
}

/**
 * 管理者ロールを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールを削除
 */
export type deleteRoleResponse200 = {
  data: void
  status: 200
}

export type deleteRoleResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteRoleResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteRoleResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteRoleResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteRoleResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteRoleResponseSuccess = deleteRoleResponse200 & {
  headers: Headers
}
export type deleteRoleResponseError = (
  | deleteRoleResponse400
  | deleteRoleResponse401
  | deleteRoleResponse403
  | deleteRoleResponse404
  | deleteRoleResponse422
) & {
  headers: Headers
}

export type deleteRoleResponse =
  | deleteRoleResponseSuccess
  | deleteRoleResponseError

export const getDeleteRoleUrl = (roleId: string) => {
  return `/v1/roles/${roleId}`
}

export const deleteRole = async (
  roleId: string,
  options?: RequestInit,
): Promise<deleteRoleResponse> => {
  return customFetchInstance<deleteRoleResponse>(getDeleteRoleUrl(roleId), {
    ...options,
    method: 'DELETE',
  })
}

/**
 * 管理者ロールにメンバーを追加します。最大10人まで複数のメンバーを同時に追加可能です。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールにメンバーを追加
 */
export type createRoleMembersResponse200 = {
  data: void
  status: 200
}

export type createRoleMembersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createRoleMembersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createRoleMembersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createRoleMembersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createRoleMembersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createRoleMembersResponseSuccess = createRoleMembersResponse200 & {
  headers: Headers
}
export type createRoleMembersResponseError = (
  | createRoleMembersResponse400
  | createRoleMembersResponse401
  | createRoleMembersResponse403
  | createRoleMembersResponse404
  | createRoleMembersResponse422
) & {
  headers: Headers
}

export type createRoleMembersResponse =
  | createRoleMembersResponseSuccess
  | createRoleMembersResponseError

export const getCreateRoleMembersUrl = (roleId: string) => {
  return `/v1/roles/${roleId}/memberships`
}

export const createRoleMembers = async (
  roleId: string,
  createRoleMembersBody: CreateRoleMembersBody,
  options?: RequestInit,
): Promise<createRoleMembersResponse> => {
  return customFetchInstance<createRoleMembersResponse>(
    getCreateRoleMembersUrl(roleId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createRoleMembersBody),
    },
  )
}

/**
 * 管理者ロールのメンバー一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールのメンバー一覧を取得
 */
export type listRoleMembersResponse200 = {
  data: User[]
  status: 200
}

export type listRoleMembersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listRoleMembersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listRoleMembersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listRoleMembersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listRoleMembersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listRoleMembersResponseSuccess = listRoleMembersResponse200 & {
  headers: Headers
}
export type listRoleMembersResponseError = (
  | listRoleMembersResponse400
  | listRoleMembersResponse401
  | listRoleMembersResponse403
  | listRoleMembersResponse404
  | listRoleMembersResponse422
) & {
  headers: Headers
}

export type listRoleMembersResponse =
  | listRoleMembersResponseSuccess
  | listRoleMembersResponseError

export const getListRoleMembersUrl = (
  roleId: string,
  params?: ListRoleMembersParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/roles/${roleId}/memberships?${stringifiedParams}`
    : `/v1/roles/${roleId}/memberships`
}

export const listRoleMembers = async (
  roleId: string,
  params?: ListRoleMembersParams,
  options?: RequestInit,
): Promise<listRoleMembersResponse> => {
  return customFetchInstance<listRoleMembersResponse>(
    getListRoleMembersUrl(roleId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 管理者ロールからメンバーを削除します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary 管理者ロールからメンバーを削除
 */
export type deleteRoleMemberResponse200 = {
  data: void
  status: 200
}

export type deleteRoleMemberResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteRoleMemberResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteRoleMemberResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteRoleMemberResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteRoleMemberResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteRoleMemberResponseSuccess = deleteRoleMemberResponse200 & {
  headers: Headers
}
export type deleteRoleMemberResponseError = (
  | deleteRoleMemberResponse400
  | deleteRoleMemberResponse401
  | deleteRoleMemberResponse403
  | deleteRoleMemberResponse404
  | deleteRoleMemberResponse422
) & {
  headers: Headers
}

export type deleteRoleMemberResponse =
  | deleteRoleMemberResponseSuccess
  | deleteRoleMemberResponseError

export const getDeleteRoleMemberUrl = (roleId: string, userId: string) => {
  return `/v1/roles/${roleId}/memberships/${userId}`
}

export const deleteRoleMember = async (
  roleId: string,
  userId: string,
  options?: RequestInit,
): Promise<deleteRoleMemberResponse> => {
  return customFetchInstance<deleteRoleMemberResponse>(
    getDeleteRoleMemberUrl(roleId, userId),
    {
      ...options,
      method: 'DELETE',
    },
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
export type listTicketsResponse200 = {
  data: TicketWithStep[]
  status: 200
}

export type listTicketsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listTicketsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listTicketsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listTicketsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listTicketsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listTicketsResponseSuccess = listTicketsResponse200 & {
  headers: Headers
}
export type listTicketsResponseError = (
  | listTicketsResponse400
  | listTicketsResponse401
  | listTicketsResponse403
  | listTicketsResponse404
  | listTicketsResponse422
) & {
  headers: Headers
}

export type listTicketsResponse =
  | listTicketsResponseSuccess
  | listTicketsResponseError

export const getListTicketsUrl = (params?: ListTicketsParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/tickets?${stringifiedParams}`
    : `/v1/tickets`
}

export const listTickets = async (
  params?: ListTicketsParams,
  options?: RequestInit,
): Promise<listTicketsResponse> => {
  return customFetchInstance<listTicketsResponse>(getListTicketsUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * チケットを作成します。
 * @summary チケットを作成
 */
export type createTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type createTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createTicketResponseSuccess = createTicketResponse200 & {
  headers: Headers
}
export type createTicketResponseError = (
  | createTicketResponse400
  | createTicketResponse401
  | createTicketResponse403
  | createTicketResponse404
  | createTicketResponse422
) & {
  headers: Headers
}

export type createTicketResponse =
  | createTicketResponseSuccess
  | createTicketResponseError

export const getCreateTicketUrl = () => {
  return `/v1/tickets`
}

export const createTicket = async (
  createTicketBody: CreateTicketBody,
  options?: RequestInit,
): Promise<createTicketResponse> => {
  return customFetchInstance<createTicketResponse>(getCreateTicketUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createTicketBody),
  })
}

/**
 * 現在のユーザーにアサインされている承認リクエストの一覧を取得します。複数の条件を組み合わせて、フィルタ可能です。

注意：パフォーマンス上の理由から、チケットの一覧取得ではフォームの入力や承認経路などはレスポンスに含まれません。
より詳細なチケット情報を取得したい場合は、チケットを一件だけ取得するAPIをで取得してください。
 * @summary 承認リクエスト一覧を取得
 */
export type listTasksResponse200 = {
  data: TicketWithStep[]
  status: 200
}

export type listTasksResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listTasksResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listTasksResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listTasksResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listTasksResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listTasksResponseSuccess = listTasksResponse200 & {
  headers: Headers
}
export type listTasksResponseError = (
  | listTasksResponse400
  | listTasksResponse401
  | listTasksResponse403
  | listTasksResponse404
  | listTasksResponse422
) & {
  headers: Headers
}

export type listTasksResponse =
  | listTasksResponseSuccess
  | listTasksResponseError

export const getListTasksUrl = (params?: ListTasksParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/tickets/tasks?${stringifiedParams}`
    : `/v1/tickets/tasks`
}

export const listTasks = async (
  params?: ListTasksParams,
  options?: RequestInit,
): Promise<listTasksResponse> => {
  return customFetchInstance<listTasksResponse>(getListTasksUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * チケットを一件取得します。フォームの入力や承認経路などを含む詳細なデータを返します。
 * @summary チケットを取得
 */
export type getTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type getTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getTicketResponseSuccess = getTicketResponse200 & {
  headers: Headers
}
export type getTicketResponseError = (
  | getTicketResponse400
  | getTicketResponse401
  | getTicketResponse403
  | getTicketResponse404
  | getTicketResponse422
) & {
  headers: Headers
}

export type getTicketResponse =
  | getTicketResponseSuccess
  | getTicketResponseError

export const getGetTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}`
}

export const getTicket = async (
  ticketId: string,
  options?: RequestInit,
): Promise<getTicketResponse> => {
  return customFetchInstance<getTicketResponse>(getGetTicketUrl(ticketId), {
    ...options,
    method: 'GET',
  })
}

/**
 * チケットを更新します。

注意1: チケットのステータスが下書きまたは差し戻しの場合、申請者が更新可能です。

注意2: チケットのステータスが処理中の場合、承認者が承認者用フィールドのみ更新可能です。リクエストボディにはslipItemsまたはinputsのみ設定してください（他のパラメータは無視されます）。

注意3: 明細ワークフローの場合、slipItemsは必須です。
 * @summary チケットを更新
 */
export type updateTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type updateTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateTicketResponseSuccess = updateTicketResponse200 & {
  headers: Headers
}
export type updateTicketResponseError = (
  | updateTicketResponse400
  | updateTicketResponse401
  | updateTicketResponse403
  | updateTicketResponse404
  | updateTicketResponse422
) & {
  headers: Headers
}

export type updateTicketResponse =
  | updateTicketResponseSuccess
  | updateTicketResponseError

export const getUpdateTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}`
}

export const updateTicket = async (
  ticketId: string,
  updateTicketBody: UpdateTicketBody,
  options?: RequestInit,
): Promise<updateTicketResponse> => {
  return customFetchInstance<updateTicketResponse>(
    getUpdateTicketUrl(ticketId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateTicketBody),
    },
  )
}

/**
 * 指定したチケットを承認もしくは確認します。
APIの実行ユーザーがチケットにアサインされていない場合、403 Forbiddenを返します。
 * @summary チケットを承認または確認する
 */
export type approveTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type approveTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type approveTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type approveTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type approveTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type approveTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type approveTicketResponseSuccess = approveTicketResponse200 & {
  headers: Headers
}
export type approveTicketResponseError = (
  | approveTicketResponse400
  | approveTicketResponse401
  | approveTicketResponse403
  | approveTicketResponse404
  | approveTicketResponse422
) & {
  headers: Headers
}

export type approveTicketResponse =
  | approveTicketResponseSuccess
  | approveTicketResponseError

export const getApproveTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/approve`
}

export const approveTicket = async (
  ticketId: string,
  options?: RequestInit,
): Promise<approveTicketResponse> => {
  return customFetchInstance<approveTicketResponse>(
    getApproveTicketUrl(ticketId),
    {
      ...options,
      method: 'POST',
    },
  )
}

/**
 * 指定したチケットを差し戻します。
APIの実行ユーザーがチケットにアサインされていない場合、403 Forbiddenを返します。
 * @summary チケットを差し戻す
 */
export type rejectTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type rejectTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type rejectTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type rejectTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type rejectTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type rejectTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type rejectTicketResponseSuccess = rejectTicketResponse200 & {
  headers: Headers
}
export type rejectTicketResponseError = (
  | rejectTicketResponse400
  | rejectTicketResponse401
  | rejectTicketResponse403
  | rejectTicketResponse404
  | rejectTicketResponse422
) & {
  headers: Headers
}

export type rejectTicketResponse =
  | rejectTicketResponseSuccess
  | rejectTicketResponseError

export const getRejectTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/reject`
}

export const rejectTicket = async (
  ticketId: string,
  rejectTicketBody: RejectTicketBody,
  options?: RequestInit,
): Promise<rejectTicketResponse> => {
  return customFetchInstance<rejectTicketResponse>(
    getRejectTicketUrl(ticketId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(rejectTicketBody),
    },
  )
}

/**
 * 指定したチケットを却下します。
APIの実行ユーザーがチケットにアサインされていない場合、403 Forbiddenを返します。
 * @summary チケットを却下する
 */
export type denyTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type denyTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type denyTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type denyTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type denyTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type denyTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type denyTicketResponseSuccess = denyTicketResponse200 & {
  headers: Headers
}
export type denyTicketResponseError = (
  | denyTicketResponse400
  | denyTicketResponse401
  | denyTicketResponse403
  | denyTicketResponse404
  | denyTicketResponse422
) & {
  headers: Headers
}

export type denyTicketResponse =
  | denyTicketResponseSuccess
  | denyTicketResponseError

export const getDenyTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/deny`
}

export const denyTicket = async (
  ticketId: string,
  denyTicketBody: DenyTicketBody,
  options?: RequestInit,
): Promise<denyTicketResponse> => {
  return customFetchInstance<denyTicketResponse>(getDenyTicketUrl(ticketId), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(denyTicketBody),
  })
}

/**
 * 自分が作成したチケットを取り下げます。
 * @summary チケットを取り下げる
 */
export type withdrawTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type withdrawTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type withdrawTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type withdrawTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type withdrawTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type withdrawTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type withdrawTicketResponseSuccess = withdrawTicketResponse200 & {
  headers: Headers
}
export type withdrawTicketResponseError = (
  | withdrawTicketResponse400
  | withdrawTicketResponse401
  | withdrawTicketResponse403
  | withdrawTicketResponse404
  | withdrawTicketResponse422
) & {
  headers: Headers
}

export type withdrawTicketResponse =
  | withdrawTicketResponseSuccess
  | withdrawTicketResponseError

export const getWithdrawTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/withdraw`
}

export const withdrawTicket = async (
  ticketId: string,
  options?: RequestInit,
): Promise<withdrawTicketResponse> => {
  return customFetchInstance<withdrawTicketResponse>(
    getWithdrawTicketUrl(ticketId),
    {
      ...options,
      method: 'POST',
    },
  )
}

/**
 * チケットをアーカイブします。チケットのステータスがアーカイブステータスに変わりますが、引き続きUIやAPIでチケットにはアクセス可能です。

注意：チケットをアーカイブ可能なユーザーはチケットのステータスによって異なります。詳しくは[ヘルプ](https://support.kickflow.com/hc/ja/articles/360058324973)をご覧ください。
 * @summary チケットをアーカイブ
 */
export type archiveTicketResponse200 = {
  data: TicketDetail
  status: 200
}

export type archiveTicketResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type archiveTicketResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type archiveTicketResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type archiveTicketResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type archiveTicketResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type archiveTicketResponseSuccess = archiveTicketResponse200 & {
  headers: Headers
}
export type archiveTicketResponseError = (
  | archiveTicketResponse400
  | archiveTicketResponse401
  | archiveTicketResponse403
  | archiveTicketResponse404
  | archiveTicketResponse422
) & {
  headers: Headers
}

export type archiveTicketResponse =
  | archiveTicketResponseSuccess
  | archiveTicketResponseError

export const getArchiveTicketUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/archive`
}

export const archiveTicket = async (
  ticketId: string,
  options?: RequestInit,
): Promise<archiveTicketResponse> => {
  return customFetchInstance<archiveTicketResponse>(
    getArchiveTicketUrl(ticketId),
    {
      ...options,
      method: 'POST',
    },
  )
}

/**
 * 指定したチケットの関連チケットを取得します。
 * @summary チケットの関連チケットを取得する
 */
export type listTicketLinksResponse200 = {
  data: Ticket[]
  status: 200
}

export type listTicketLinksResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listTicketLinksResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listTicketLinksResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listTicketLinksResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listTicketLinksResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listTicketLinksResponseSuccess = listTicketLinksResponse200 & {
  headers: Headers
}
export type listTicketLinksResponseError = (
  | listTicketLinksResponse400
  | listTicketLinksResponse401
  | listTicketLinksResponse403
  | listTicketLinksResponse404
  | listTicketLinksResponse422
) & {
  headers: Headers
}

export type listTicketLinksResponse =
  | listTicketLinksResponseSuccess
  | listTicketLinksResponseError

export const getListTicketLinksUrl = (
  ticketId: string,
  params?: ListTicketLinksParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/tickets/${ticketId}/links?${stringifiedParams}`
    : `/v1/tickets/${ticketId}/links`
}

export const listTicketLinks = async (
  ticketId: string,
  params?: ListTicketLinksParams,
  options?: RequestInit,
): Promise<listTicketLinksResponse> => {
  return customFetchInstance<listTicketLinksResponse>(
    getListTicketLinksUrl(ticketId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * チケットの共有ユーザー一覧を取得します。
 * @summary 共有ユーザーの一覧を取得
 */
export type listViewersResponse200 = {
  data: TicketViewer[]
  status: 200
}

export type listViewersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listViewersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listViewersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listViewersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listViewersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listViewersResponseSuccess = listViewersResponse200 & {
  headers: Headers
}
export type listViewersResponseError = (
  | listViewersResponse400
  | listViewersResponse401
  | listViewersResponse403
  | listViewersResponse404
  | listViewersResponse422
) & {
  headers: Headers
}

export type listViewersResponse =
  | listViewersResponseSuccess
  | listViewersResponseError

export const getListViewersUrl = (
  ticketId: string,
  params?: ListViewersParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/tickets/${ticketId}/viewers?${stringifiedParams}`
    : `/v1/tickets/${ticketId}/viewers`
}

export const listViewers = async (
  ticketId: string,
  params?: ListViewersParams,
  options?: RequestInit,
): Promise<listViewersResponse> => {
  return customFetchInstance<listViewersResponse>(
    getListViewersUrl(ticketId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * チケットに共有ユーザーを追加します。
 * @summary 共有ユーザーを追加
 */
export type createViewerResponse200 = {
  data: void
  status: 200
}

export type createViewerResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createViewerResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createViewerResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createViewerResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createViewerResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createViewerResponseSuccess = createViewerResponse200 & {
  headers: Headers
}
export type createViewerResponseError = (
  | createViewerResponse400
  | createViewerResponse401
  | createViewerResponse403
  | createViewerResponse404
  | createViewerResponse422
) & {
  headers: Headers
}

export type createViewerResponse =
  | createViewerResponseSuccess
  | createViewerResponseError

export const getCreateViewerUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/viewers`
}

export const createViewer = async (
  ticketId: string,
  createViewerBody: CreateViewerBody,
  options?: RequestInit,
): Promise<createViewerResponse> => {
  return customFetchInstance<createViewerResponse>(
    getCreateViewerUrl(ticketId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createViewerBody),
    },
  )
}

/**
 * チケットの共有ユーザーを削除します。
 * @summary 共有ユーザーを削除
 */
export type deleteViewerResponse200 = {
  data: void
  status: 200
}

export type deleteViewerResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteViewerResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteViewerResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteViewerResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteViewerResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteViewerResponseSuccess = deleteViewerResponse200 & {
  headers: Headers
}
export type deleteViewerResponseError = (
  | deleteViewerResponse400
  | deleteViewerResponse401
  | deleteViewerResponse403
  | deleteViewerResponse404
  | deleteViewerResponse422
) & {
  headers: Headers
}

export type deleteViewerResponse =
  | deleteViewerResponseSuccess
  | deleteViewerResponseError

export const getDeleteViewerUrl = (ticketId: string, viewerId: string) => {
  return `/v1/tickets/${ticketId}/viewers/${viewerId}`
}

export const deleteViewer = async (
  ticketId: string,
  viewerId: string,
  options?: RequestInit,
): Promise<deleteViewerResponse> => {
  return customFetchInstance<deleteViewerResponse>(
    getDeleteViewerUrl(ticketId, viewerId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * チケットのコメント一覧を取得します。
 * @summary コメントの一覧を取得
 */
export type listCommentsResponse200 = {
  data: Comment[]
  status: 200
}

export type listCommentsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listCommentsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listCommentsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listCommentsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listCommentsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listCommentsResponseSuccess = listCommentsResponse200 & {
  headers: Headers
}
export type listCommentsResponseError = (
  | listCommentsResponse400
  | listCommentsResponse401
  | listCommentsResponse403
  | listCommentsResponse404
  | listCommentsResponse422
) & {
  headers: Headers
}

export type listCommentsResponse =
  | listCommentsResponseSuccess
  | listCommentsResponseError

export const getListCommentsUrl = (
  ticketId: string,
  params?: ListCommentsParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/tickets/${ticketId}/comments?${stringifiedParams}`
    : `/v1/tickets/${ticketId}/comments`
}

export const listComments = async (
  ticketId: string,
  params?: ListCommentsParams,
  options?: RequestInit,
): Promise<listCommentsResponse> => {
  return customFetchInstance<listCommentsResponse>(
    getListCommentsUrl(ticketId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * チケットにコメントを投稿します。
 * @summary コメントを投稿
 */
export type createCommentResponse200 = {
  data: Comment
  status: 200
}

export type createCommentResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createCommentResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createCommentResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createCommentResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createCommentResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createCommentResponseSuccess = createCommentResponse200 & {
  headers: Headers
}
export type createCommentResponseError = (
  | createCommentResponse400
  | createCommentResponse401
  | createCommentResponse403
  | createCommentResponse404
  | createCommentResponse422
) & {
  headers: Headers
}

export type createCommentResponse =
  | createCommentResponseSuccess
  | createCommentResponseError

export const getCreateCommentUrl = (ticketId: string) => {
  return `/v1/tickets/${ticketId}/comments`
}

export const createComment = async (
  ticketId: string,
  createCommentBody: CreateCommentBody,
  options?: RequestInit,
): Promise<createCommentResponse> => {
  return customFetchInstance<createCommentResponse>(
    getCreateCommentUrl(ticketId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createCommentBody),
    },
  )
}

/**
 * チケットのコメントを取得します。
 * @summary コメントを取得
 */
export type getCommentResponse200 = {
  data: Comment
  status: 200
}

export type getCommentResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getCommentResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getCommentResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getCommentResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getCommentResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getCommentResponseSuccess = getCommentResponse200 & {
  headers: Headers
}
export type getCommentResponseError = (
  | getCommentResponse400
  | getCommentResponse401
  | getCommentResponse403
  | getCommentResponse404
  | getCommentResponse422
) & {
  headers: Headers
}

export type getCommentResponse =
  | getCommentResponseSuccess
  | getCommentResponseError

export const getGetCommentUrl = (ticketId: string, commentId: string) => {
  return `/v1/tickets/${ticketId}/comments/${commentId}`
}

export const getComment = async (
  ticketId: string,
  commentId: string,
  options?: RequestInit,
): Promise<getCommentResponse> => {
  return customFetchInstance<getCommentResponse>(
    getGetCommentUrl(ticketId, commentId),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * チケットのコメントを更新します。添付ファイルは更新できません。
 * @summary コメントを更新
 */
export type updateCommentResponse200 = {
  data: Comment
  status: 200
}

export type updateCommentResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateCommentResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateCommentResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateCommentResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateCommentResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateCommentResponseSuccess = updateCommentResponse200 & {
  headers: Headers
}
export type updateCommentResponseError = (
  | updateCommentResponse400
  | updateCommentResponse401
  | updateCommentResponse403
  | updateCommentResponse404
  | updateCommentResponse422
) & {
  headers: Headers
}

export type updateCommentResponse =
  | updateCommentResponseSuccess
  | updateCommentResponseError

export const getUpdateCommentUrl = (ticketId: string, commentId: string) => {
  return `/v1/tickets/${ticketId}/comments/${commentId}`
}

export const updateComment = async (
  ticketId: string,
  commentId: string,
  updateCommentBody: UpdateCommentBody,
  options?: RequestInit,
): Promise<updateCommentResponse> => {
  return customFetchInstance<updateCommentResponse>(
    getUpdateCommentUrl(ticketId, commentId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(updateCommentBody),
    },
  )
}

/**
 * チケットのコメントを削除します。
 * @summary コメントを削除
 */
export type deleteCommentResponse200 = {
  data: void
  status: 200
}

export type deleteCommentResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteCommentResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteCommentResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteCommentResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteCommentResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteCommentResponseSuccess = deleteCommentResponse200 & {
  headers: Headers
}
export type deleteCommentResponseError = (
  | deleteCommentResponse400
  | deleteCommentResponse401
  | deleteCommentResponse403
  | deleteCommentResponse404
  | deleteCommentResponse422
) & {
  headers: Headers
}

export type deleteCommentResponse =
  | deleteCommentResponseSuccess
  | deleteCommentResponseError

export const getDeleteCommentUrl = (ticketId: string, commentId: string) => {
  return `/v1/tickets/${ticketId}/comments/${commentId}`
}

export const deleteComment = async (
  ticketId: string,
  commentId: string,
  options?: RequestInit,
): Promise<deleteCommentResponse> => {
  return customFetchInstance<deleteCommentResponse>(
    getDeleteCommentUrl(ticketId, commentId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * 現在のユーザーを取得します。
 * @summary 現在のユーザーを取得
 */
export type getCurrentUserResponse200 = {
  data: UserDetail
  status: 200
}

export type getCurrentUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getCurrentUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getCurrentUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getCurrentUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getCurrentUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getCurrentUserResponseSuccess = getCurrentUserResponse200 & {
  headers: Headers
}
export type getCurrentUserResponseError = (
  | getCurrentUserResponse400
  | getCurrentUserResponse401
  | getCurrentUserResponse403
  | getCurrentUserResponse404
  | getCurrentUserResponse422
) & {
  headers: Headers
}

export type getCurrentUserResponse =
  | getCurrentUserResponseSuccess
  | getCurrentUserResponseError

export const getGetCurrentUserUrl = () => {
  return `/v1/user`
}

export const getCurrentUser = async (
  options?: RequestInit,
): Promise<getCurrentUserResponse> => {
  return customFetchInstance<getCurrentUserResponse>(getGetCurrentUserUrl(), {
    ...options,
    method: 'GET',
  })
}

/**
 * ユーザー一覧を取得します。
 * @summary ユーザー一覧を取得
 */
export type listUsersResponse200 = {
  data: User[]
  status: 200
}

export type listUsersResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listUsersResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listUsersResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listUsersResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listUsersResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listUsersResponseSuccess = listUsersResponse200 & {
  headers: Headers
}
export type listUsersResponseError = (
  | listUsersResponse400
  | listUsersResponse401
  | listUsersResponse403
  | listUsersResponse404
  | listUsersResponse422
) & {
  headers: Headers
}

export type listUsersResponse =
  | listUsersResponseSuccess
  | listUsersResponseError

export const getListUsersUrl = (params?: ListUsersParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/users?${stringifiedParams}`
    : `/v1/users`
}

export const listUsers = async (
  params?: ListUsersParams,
  options?: RequestInit,
): Promise<listUsersResponse> => {
  return customFetchInstance<listUsersResponse>(getListUsersUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * ユーザーを作成します。
作成されたユーザーは招待済みステータスとなり、招待メールが送信されます。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを作成（招待）
 */
export type createUserResponse200 = {
  data: UserDetail
  status: 200
}

export type createUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createUserResponseSuccess = createUserResponse200 & {
  headers: Headers
}
export type createUserResponseError = (
  | createUserResponse400
  | createUserResponse401
  | createUserResponse403
  | createUserResponse404
  | createUserResponse422
) & {
  headers: Headers
}

export type createUserResponse =
  | createUserResponseSuccess
  | createUserResponseError

export const getCreateUserUrl = () => {
  return `/v1/users`
}

export const createUser = async (
  createUserBody: CreateUserBody,
  options?: RequestInit,
): Promise<createUserResponse> => {
  return customFetchInstance<createUserResponse>(getCreateUserUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createUserBody),
  })
}

/**
 * ユーザーを一件取得します。
 * @summary ユーザーを取得
 */
export type getUserResponse200 = {
  data: UserDetail
  status: 200
}

export type getUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getUserResponseSuccess = getUserResponse200 & {
  headers: Headers
}
export type getUserResponseError = (
  | getUserResponse400
  | getUserResponse401
  | getUserResponse403
  | getUserResponse404
  | getUserResponse422
) & {
  headers: Headers
}

export type getUserResponse = getUserResponseSuccess | getUserResponseError

export const getGetUserUrl = (userId: string) => {
  return `/v1/users/${userId}`
}

export const getUser = async (
  userId: string,
  options?: RequestInit,
): Promise<getUserResponse> => {
  return customFetchInstance<getUserResponse>(getGetUserUrl(userId), {
    ...options,
    method: 'GET',
  })
}

/**
 * ユーザーを削除します（論理削除）。
削除されたユーザーは削除済ステータスとなりますが、引き続きユーザー情報にアクセス可能です。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを削除
 */
export type deleteUserResponse200 = {
  data: UserDetail
  status: 200
}

export type deleteUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteUserResponseSuccess = deleteUserResponse200 & {
  headers: Headers
}
export type deleteUserResponseError = (
  | deleteUserResponse400
  | deleteUserResponse401
  | deleteUserResponse403
  | deleteUserResponse404
  | deleteUserResponse422
) & {
  headers: Headers
}

export type deleteUserResponse =
  | deleteUserResponseSuccess
  | deleteUserResponseError

export const getDeleteUserUrl = (userId: string) => {
  return `/v1/users/${userId}`
}

export const deleteUser = async (
  userId: string,
  options?: RequestInit,
): Promise<deleteUserResponse> => {
  return customFetchInstance<deleteUserResponse>(getDeleteUserUrl(userId), {
    ...options,
    method: 'DELETE',
  })
}

/**
 * ユーザーを更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを更新
 */
export type updateUserResponse200 = {
  data: UserDetail
  status: 200
}

export type updateUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type updateUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type updateUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type updateUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type updateUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type updateUserResponseSuccess = updateUserResponse200 & {
  headers: Headers
}
export type updateUserResponseError = (
  | updateUserResponse400
  | updateUserResponse401
  | updateUserResponse403
  | updateUserResponse404
  | updateUserResponse422
) & {
  headers: Headers
}

export type updateUserResponse =
  | updateUserResponseSuccess
  | updateUserResponseError

export const getUpdateUserUrl = (userId: string) => {
  return `/v1/users/${userId}`
}

export const updateUser = async (
  userId: string,
  updateUserBody: UpdateUserBody,
  options?: RequestInit,
): Promise<updateUserResponse> => {
  return customFetchInstance<updateUserResponse>(getUpdateUserUrl(userId), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateUserBody),
  })
}

/**
 * メールアドレスからユーザーを取得します（完全一致）
※メールアドレスはURLエンコードしたものを送ってください。
 * @summary メールアドレスからユーザーを取得
 */
export type lookupUserByEmailResponse200 = {
  data: UserDetail
  status: 200
}

export type lookupUserByEmailResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type lookupUserByEmailResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type lookupUserByEmailResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type lookupUserByEmailResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type lookupUserByEmailResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type lookupUserByEmailResponseSuccess = lookupUserByEmailResponse200 & {
  headers: Headers
}
export type lookupUserByEmailResponseError = (
  | lookupUserByEmailResponse400
  | lookupUserByEmailResponse401
  | lookupUserByEmailResponse403
  | lookupUserByEmailResponse404
  | lookupUserByEmailResponse422
) & {
  headers: Headers
}

export type lookupUserByEmailResponse =
  | lookupUserByEmailResponseSuccess
  | lookupUserByEmailResponseError

export const getLookupUserByEmailUrl = (params: LookupUserByEmailParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/users/lookupByEmail?${stringifiedParams}`
    : `/v1/users/lookupByEmail`
}

export const lookupUserByEmail = async (
  params: LookupUserByEmailParams,
  options?: RequestInit,
): Promise<lookupUserByEmailResponse> => {
  return customFetchInstance<lookupUserByEmailResponse>(
    getLookupUserByEmailUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 削除されたユーザーを再び招待します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再招待
 */
export type reinviteUserResponse200 = {
  data: User
  status: 200
}

export type reinviteUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type reinviteUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type reinviteUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type reinviteUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type reinviteUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type reinviteUserResponseSuccess = reinviteUserResponse200 & {
  headers: Headers
}
export type reinviteUserResponseError = (
  | reinviteUserResponse400
  | reinviteUserResponse401
  | reinviteUserResponse403
  | reinviteUserResponse404
  | reinviteUserResponse422
) & {
  headers: Headers
}

export type reinviteUserResponse =
  | reinviteUserResponseSuccess
  | reinviteUserResponseError

export const getReinviteUserUrl = (userId: string) => {
  return `/v1/users/${userId}/reinvite`
}

export const reinviteUser = async (
  userId: string,
  options?: RequestInit,
): Promise<reinviteUserResponse> => {
  return customFetchInstance<reinviteUserResponse>(getReinviteUserUrl(userId), {
    ...options,
    method: 'POST',
  })
}

/**
 * 有効なユーザーを一時停止します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを一時停止
 */
export type suspendUserResponse200 = {
  data: User
  status: 200
}

export type suspendUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type suspendUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type suspendUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type suspendUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type suspendUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type suspendUserResponseSuccess = suspendUserResponse200 & {
  headers: Headers
}
export type suspendUserResponseError = (
  | suspendUserResponse400
  | suspendUserResponse401
  | suspendUserResponse403
  | suspendUserResponse404
  | suspendUserResponse422
) & {
  headers: Headers
}

export type suspendUserResponse =
  | suspendUserResponseSuccess
  | suspendUserResponseError

export const getSuspendUserUrl = (userId: string) => {
  return `/v1/users/${userId}/suspend`
}

export const suspendUser = async (
  userId: string,
  options?: RequestInit,
): Promise<suspendUserResponse> => {
  return customFetchInstance<suspendUserResponse>(getSuspendUserUrl(userId), {
    ...options,
    method: 'POST',
  })
}

/**
 * 一時停止中のユーザーを有効化します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary ユーザーを再有効化
 */
export type reactivateUserResponse200 = {
  data: User
  status: 200
}

export type reactivateUserResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type reactivateUserResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type reactivateUserResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type reactivateUserResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type reactivateUserResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type reactivateUserResponseSuccess = reactivateUserResponse200 & {
  headers: Headers
}
export type reactivateUserResponseError = (
  | reactivateUserResponse400
  | reactivateUserResponse401
  | reactivateUserResponse403
  | reactivateUserResponse404
  | reactivateUserResponse422
) & {
  headers: Headers
}

export type reactivateUserResponse =
  | reactivateUserResponseSuccess
  | reactivateUserResponseError

export const getReactivateUserUrl = (userId: string) => {
  return `/v1/users/${userId}/reactivate`
}

export const reactivateUser = async (
  userId: string,
  options?: RequestInit,
): Promise<reactivateUserResponse> => {
  return customFetchInstance<reactivateUserResponse>(
    getReactivateUserUrl(userId),
    {
      ...options,
      method: 'POST',
    },
  )
}

/**
 * ユーザーの所属チーム一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary ユーザーの所属チーム一覧を取得
 */
export type listUserTeamsResponse200 = {
  data: Team[]
  status: 200
}

export type listUserTeamsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listUserTeamsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listUserTeamsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listUserTeamsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listUserTeamsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listUserTeamsResponseSuccess = listUserTeamsResponse200 & {
  headers: Headers
}
export type listUserTeamsResponseError = (
  | listUserTeamsResponse400
  | listUserTeamsResponse401
  | listUserTeamsResponse403
  | listUserTeamsResponse404
  | listUserTeamsResponse422
) & {
  headers: Headers
}

export type listUserTeamsResponse =
  | listUserTeamsResponseSuccess
  | listUserTeamsResponseError

export const getListUserTeamsUrl = (
  userId: string,
  params?: ListUserTeamsParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/users/${userId}/teams?${stringifiedParams}`
    : `/v1/users/${userId}/teams`
}

export const listUserTeams = async (
  userId: string,
  params?: ListUserTeamsParams,
  options?: RequestInit,
): Promise<listUserTeamsResponse> => {
  return customFetchInstance<listUserTeamsResponse>(
    getListUserTeamsUrl(userId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * ユーザーの管理者ロール一覧を取得します。

このAPIの実行には、ロールの管理権限が必要です。
 * @summary ユーザーの管理者ロール一覧を取得
 */
export type listUserRolesResponse200 = {
  data: Role[]
  status: 200
}

export type listUserRolesResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listUserRolesResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listUserRolesResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listUserRolesResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listUserRolesResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listUserRolesResponseSuccess = listUserRolesResponse200 & {
  headers: Headers
}
export type listUserRolesResponseError = (
  | listUserRolesResponse400
  | listUserRolesResponse401
  | listUserRolesResponse403
  | listUserRolesResponse404
  | listUserRolesResponse422
) & {
  headers: Headers
}

export type listUserRolesResponse =
  | listUserRolesResponseSuccess
  | listUserRolesResponseError

export const getListUserRolesUrl = (
  userId: string,
  params?: ListUserRolesParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/users/${userId}/roles?${stringifiedParams}`
    : `/v1/users/${userId}/roles`
}

export const listUserRoles = async (
  userId: string,
  params?: ListUserRolesParams,
  options?: RequestInit,
): Promise<listUserRolesResponse> => {
  return customFetchInstance<listUserRolesResponse>(
    getListUserRolesUrl(userId, params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 経路の一覧を取得します。ステータスやフォルダによる絞り込みが可能です。
 * @summary 経路一覧を取得
 */
export type listRoutesResponse200 = {
  data: Route[]
  status: 200
}

export type listRoutesResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listRoutesResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listRoutesResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listRoutesResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listRoutesResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listRoutesResponseSuccess = listRoutesResponse200 & {
  headers: Headers
}
export type listRoutesResponseError = (
  | listRoutesResponse400
  | listRoutesResponse401
  | listRoutesResponse403
  | listRoutesResponse404
  | listRoutesResponse422
) & {
  headers: Headers
}

export type listRoutesResponse =
  | listRoutesResponseSuccess
  | listRoutesResponseError

export const getListRoutesUrl = (params?: ListRoutesParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/routes?${stringifiedParams}`
    : `/v1/routes`
}

export const listRoutes = async (
  params?: ListRoutesParams,
  options?: RequestInit,
): Promise<listRoutesResponse> => {
  return customFetchInstance<listRoutesResponse>(getListRoutesUrl(params), {
    ...options,
    method: 'GET',
  })
}

/**
 * 指定した経路を取得します。
 * @summary 経路を取得
 */
export type getRouteResponse200 = {
  data: RouteDetail
  status: 200
}

export type getRouteResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getRouteResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getRouteResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getRouteResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getRouteResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getRouteResponseSuccess = getRouteResponse200 & {
  headers: Headers
}
export type getRouteResponseError = (
  | getRouteResponse400
  | getRouteResponse401
  | getRouteResponse403
  | getRouteResponse404
  | getRouteResponse422
) & {
  headers: Headers
}

export type getRouteResponse = getRouteResponseSuccess | getRouteResponseError

export const getGetRouteUrl = (routeId: string) => {
  return `/v1/routes/${routeId}`
}

export const getRoute = async (
  routeId: string,
  options?: RequestInit,
): Promise<getRouteResponse> => {
  return customFetchInstance<getRouteResponse>(getGetRouteUrl(routeId), {
    ...options,
    method: 'GET',
  })
}

/**
 * ワークフローの一覧を取得します。ステータスによる絞り込みが可能です。
 * @summary ワークフロー一覧を取得
 */
export type listWorkflowsResponse200 = {
  data: Workflow[]
  status: 200
}

export type listWorkflowsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listWorkflowsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listWorkflowsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listWorkflowsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listWorkflowsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listWorkflowsResponseSuccess = listWorkflowsResponse200 & {
  headers: Headers
}
export type listWorkflowsResponseError = (
  | listWorkflowsResponse400
  | listWorkflowsResponse401
  | listWorkflowsResponse403
  | listWorkflowsResponse404
  | listWorkflowsResponse422
) & {
  headers: Headers
}

export type listWorkflowsResponse =
  | listWorkflowsResponseSuccess
  | listWorkflowsResponseError

export const getListWorkflowsUrl = (params?: ListWorkflowsParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/workflows?${stringifiedParams}`
    : `/v1/workflows`
}

export const listWorkflows = async (
  params?: ListWorkflowsParams,
  options?: RequestInit,
): Promise<listWorkflowsResponse> => {
  return customFetchInstance<listWorkflowsResponse>(
    getListWorkflowsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 指定したIDのワークフローを取得します。
 * @summary ワークフローを取得
 */
export type getWorkflowResponse200 = {
  data: WorkflowDetail
  status: 200
}

export type getWorkflowResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getWorkflowResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getWorkflowResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getWorkflowResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getWorkflowResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getWorkflowResponseSuccess = getWorkflowResponse200 & {
  headers: Headers
}
export type getWorkflowResponseError = (
  | getWorkflowResponse400
  | getWorkflowResponse401
  | getWorkflowResponse403
  | getWorkflowResponse404
  | getWorkflowResponse422
) & {
  headers: Headers
}

export type getWorkflowResponse =
  | getWorkflowResponseSuccess
  | getWorkflowResponseError

export const getGetWorkflowUrl = (workflowId: string) => {
  return `/v1/workflows/${workflowId}`
}

export const getWorkflow = async (
  workflowId: string,
  options?: RequestInit,
): Promise<getWorkflowResponse> => {
  return customFetchInstance<getWorkflowResponse>(
    getGetWorkflowUrl(workflowId),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * テナント内の代理申請の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理申請一覧を取得
 */
export type listProxyApplicantsResponse200 = {
  data: ProxyApplicant[]
  status: 200
}

export type listProxyApplicantsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listProxyApplicantsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listProxyApplicantsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listProxyApplicantsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listProxyApplicantsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listProxyApplicantsResponseSuccess =
  listProxyApplicantsResponse200 & {
    headers: Headers
  }
export type listProxyApplicantsResponseError = (
  | listProxyApplicantsResponse400
  | listProxyApplicantsResponse401
  | listProxyApplicantsResponse403
  | listProxyApplicantsResponse404
  | listProxyApplicantsResponse422
) & {
  headers: Headers
}

export type listProxyApplicantsResponse =
  | listProxyApplicantsResponseSuccess
  | listProxyApplicantsResponseError

export const getListProxyApplicantsUrl = (
  params?: ListProxyApplicantsParams,
) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/proxyApplicants?${stringifiedParams}`
    : `/v1/proxyApplicants`
}

export const listProxyApplicants = async (
  params?: ListProxyApplicantsParams,
  options?: RequestInit,
): Promise<listProxyApplicantsResponse> => {
  return customFetchInstance<listProxyApplicantsResponse>(
    getListProxyApplicantsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 代理申請を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を作成
 */
export type createProxyApplicantResponse200 = {
  data: ProxyApplicant
  status: 200
}

export type createProxyApplicantResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createProxyApplicantResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createProxyApplicantResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createProxyApplicantResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createProxyApplicantResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createProxyApplicantResponseSuccess =
  createProxyApplicantResponse200 & {
    headers: Headers
  }
export type createProxyApplicantResponseError = (
  | createProxyApplicantResponse400
  | createProxyApplicantResponse401
  | createProxyApplicantResponse403
  | createProxyApplicantResponse404
  | createProxyApplicantResponse422
) & {
  headers: Headers
}

export type createProxyApplicantResponse =
  | createProxyApplicantResponseSuccess
  | createProxyApplicantResponseError

export const getCreateProxyApplicantUrl = () => {
  return `/v1/proxyApplicants`
}

export const createProxyApplicant = async (
  createProxyApplicantBody: CreateProxyApplicantBody,
  options?: RequestInit,
): Promise<createProxyApplicantResponse> => {
  return customFetchInstance<createProxyApplicantResponse>(
    getCreateProxyApplicantUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createProxyApplicantBody),
    },
  )
}

/**
 * 指定した代理申請を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理申請の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理申請を削除
 */
export type deleteProxyApplicantResponse200 = {
  data: void
  status: 200
}

export type deleteProxyApplicantResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteProxyApplicantResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteProxyApplicantResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteProxyApplicantResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteProxyApplicantResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteProxyApplicantResponseSuccess =
  deleteProxyApplicantResponse200 & {
    headers: Headers
  }
export type deleteProxyApplicantResponseError = (
  | deleteProxyApplicantResponse400
  | deleteProxyApplicantResponse401
  | deleteProxyApplicantResponse403
  | deleteProxyApplicantResponse404
  | deleteProxyApplicantResponse422
) & {
  headers: Headers
}

export type deleteProxyApplicantResponse =
  | deleteProxyApplicantResponseSuccess
  | deleteProxyApplicantResponseError

export const getDeleteProxyApplicantUrl = (proxyApplicantId: string) => {
  return `/v1/proxyApplicants/${proxyApplicantId}`
}

export const deleteProxyApplicant = async (
  proxyApplicantId: string,
  options?: RequestInit,
): Promise<deleteProxyApplicantResponse> => {
  return customFetchInstance<deleteProxyApplicantResponse>(
    getDeleteProxyApplicantUrl(proxyApplicantId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * テナント内の代理承認の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 代理承認一覧を取得
 */
export type listProxyApproversResponse200 = {
  data: ProxyApprover[]
  status: 200
}

export type listProxyApproversResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listProxyApproversResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listProxyApproversResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listProxyApproversResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listProxyApproversResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listProxyApproversResponseSuccess =
  listProxyApproversResponse200 & {
    headers: Headers
  }
export type listProxyApproversResponseError = (
  | listProxyApproversResponse400
  | listProxyApproversResponse401
  | listProxyApproversResponse403
  | listProxyApproversResponse404
  | listProxyApproversResponse422
) & {
  headers: Headers
}

export type listProxyApproversResponse =
  | listProxyApproversResponseSuccess
  | listProxyApproversResponseError

export const getListProxyApproversUrl = (params?: ListProxyApproversParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/proxyApprovers?${stringifiedParams}`
    : `/v1/proxyApprovers`
}

export const listProxyApprovers = async (
  params?: ListProxyApproversParams,
  options?: RequestInit,
): Promise<listProxyApproversResponse> => {
  return customFetchInstance<listProxyApproversResponse>(
    getListProxyApproversUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}

/**
 * 代理承認を新規作成します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理承認の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理承認を作成
 */
export type createProxyApproverResponse200 = {
  data: ProxyApprover
  status: 200
}

export type createProxyApproverResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type createProxyApproverResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type createProxyApproverResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type createProxyApproverResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type createProxyApproverResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type createProxyApproverResponseSuccess =
  createProxyApproverResponse200 & {
    headers: Headers
  }
export type createProxyApproverResponseError = (
  | createProxyApproverResponse400
  | createProxyApproverResponse401
  | createProxyApproverResponse403
  | createProxyApproverResponse404
  | createProxyApproverResponse422
) & {
  headers: Headers
}

export type createProxyApproverResponse =
  | createProxyApproverResponseSuccess
  | createProxyApproverResponseError

export const getCreateProxyApproverUrl = () => {
  return `/v1/proxyApprovers`
}

export const createProxyApprover = async (
  createProxyApproverBody: CreateProxyApproverBody,
  options?: RequestInit,
): Promise<createProxyApproverResponse> => {
  return customFetchInstance<createProxyApproverResponse>(
    getCreateProxyApproverUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(createProxyApproverBody),
    },
  )
}

/**
 * 指定した代理承認を削除します。

このAPIの実行には、ユーザーの管理権限が必要です。ただし、自分の代理承認の設定をすべてのユーザーに許可している場合、管理権限は不要です。
 * @summary 代理承認を削除
 */
export type deleteProxyApproverResponse200 = {
  data: void
  status: 200
}

export type deleteProxyApproverResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type deleteProxyApproverResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type deleteProxyApproverResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type deleteProxyApproverResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type deleteProxyApproverResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type deleteProxyApproverResponseSuccess =
  deleteProxyApproverResponse200 & {
    headers: Headers
  }
export type deleteProxyApproverResponseError = (
  | deleteProxyApproverResponse400
  | deleteProxyApproverResponse401
  | deleteProxyApproverResponse403
  | deleteProxyApproverResponse404
  | deleteProxyApproverResponse422
) & {
  headers: Headers
}

export type deleteProxyApproverResponse =
  | deleteProxyApproverResponseSuccess
  | deleteProxyApproverResponseError

export const getDeleteProxyApproverUrl = (proxyApproverId: string) => {
  return `/v1/proxyApprovers/${proxyApproverId}`
}

export const deleteProxyApprover = async (
  proxyApproverId: string,
  options?: RequestInit,
): Promise<deleteProxyApproverResponse> => {
  return customFetchInstance<deleteProxyApproverResponse>(
    getDeleteProxyApproverUrl(proxyApproverId),
    {
      ...options,
      method: 'DELETE',
    },
  )
}

/**
 * 添付ファイルをアップロードします。最大2MBまでのファイルをアップロード可能です。

注意：このAPIはエンタープライズプランのお客様のみ利用可能です。

注意：アップロードしたファイルはすみやかにチケット作成などで使用してください。チケットなどから参照されていないファイルは最短24時間経過後に自動的に削除されます。
 * @summary 添付ファイルをアップロード
 */
export type uploadFileResponse200 = {
  data: UploadFile200
  status: 200
}

export type uploadFileResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type uploadFileResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type uploadFileResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type uploadFileResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type uploadFileResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type uploadFileResponseSuccess = uploadFileResponse200 & {
  headers: Headers
}
export type uploadFileResponseError = (
  | uploadFileResponse400
  | uploadFileResponse401
  | uploadFileResponse403
  | uploadFileResponse404
  | uploadFileResponse422
) & {
  headers: Headers
}

export type uploadFileResponse =
  | uploadFileResponseSuccess
  | uploadFileResponseError

export const getUploadFileUrl = () => {
  return `/v1/files`
}

export const uploadFile = async (
  uploadFileBody: UploadFileBody,
  options?: RequestInit,
): Promise<uploadFileResponse> => {
  const formData = new FormData()
  if (uploadFileBody.file !== undefined) {
    formData.append(`file`, uploadFileBody.file)
  }

  return customFetchInstance<uploadFileResponse>(getUploadFileUrl(), {
    ...options,
    method: 'POST',
    body: formData,
  })
}

/**
 * 添付ファイルのAmazon S3上のURLを含む情報を取得します。

注意: このAPIが返すURLは、5分間で失効します。

注意: チケットに添付されていないファイルはURLを取得できません。先にチケットに添付してください。
 * @summary 添付ファイルの情報を取得
 */
export type getFileResponse200 = {
  data: GetFile200
  status: 200
}

export type getFileResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getFileResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type getFileResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type getFileResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getFileResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type getFileResponseSuccess = getFileResponse200 & {
  headers: Headers
}
export type getFileResponseError = (
  | getFileResponse400
  | getFileResponse401
  | getFileResponse403
  | getFileResponse404
  | getFileResponse422
) & {
  headers: Headers
}

export type getFileResponse = getFileResponseSuccess | getFileResponseError

export const getGetFileUrl = (signedId: string) => {
  return `/v1/files/${signedId}`
}

export const getFile = async (
  signedId: string,
  options?: RequestInit,
): Promise<getFileResponse> => {
  return customFetchInstance<getFileResponse>(getGetFileUrl(signedId), {
    ...options,
    method: 'GET',
  })
}

/**
 * 監査ログの一覧を取得します。
 * @summary 監査ログ一覧を取得
 */
export type listAuditLogsResponse200 = {
  data: AuditLog[]
  status: 200
}

export type listAuditLogsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type listAuditLogsResponse401 = {
  data: UnauthorizedResponse
  status: 401
}

export type listAuditLogsResponse403 = {
  data: ForbiddenResponse
  status: 403
}

export type listAuditLogsResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type listAuditLogsResponse422 = {
  data: UnprocessableContentResponse
  status: 422
}

export type listAuditLogsResponseSuccess = listAuditLogsResponse200 & {
  headers: Headers
}
export type listAuditLogsResponseError = (
  | listAuditLogsResponse400
  | listAuditLogsResponse401
  | listAuditLogsResponse403
  | listAuditLogsResponse404
  | listAuditLogsResponse422
) & {
  headers: Headers
}

export type listAuditLogsResponse =
  | listAuditLogsResponseSuccess
  | listAuditLogsResponseError

export const getListAuditLogsUrl = (params?: ListAuditLogsParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0
    ? `/v1/auditLogs?${stringifiedParams}`
    : `/v1/auditLogs`
}

export const listAuditLogs = async (
  params?: ListAuditLogsParams,
  options?: RequestInit,
): Promise<listAuditLogsResponse> => {
  return customFetchInstance<listAuditLogsResponse>(
    getListAuditLogsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  )
}
