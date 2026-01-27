import * as zod from 'zod';


/**
 * 組織図の一覧を取得します。

このAPIの実行には、チームの管理権限が必要です。

注意：パフォーマンス上の理由から、組織図の一覧取得時は組織図内のチームのリストがレスポンスに含まれません。
組織図のすべての情報を取得したい場合は、組織図を一件だけ取得するAPI経由で取得してください。
 * @summary 組織図の一覧を取得
 */
export const listOrganizationChartsQueryPageDefault = 1;

export const listOrganizationChartsQueryPerPageDefault = 25;
export const listOrganizationChartsQueryPerPageMax = 100;

export const listOrganizationChartsQuerySortByRegExp = new RegExp('^(createdAt|name)(-asc|-desc)?$');


export const listOrganizationChartsQueryParams = zod.object({
  "page": zod.number().min(1).default(listOrganizationChartsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listOrganizationChartsQueryPerPageMax).default(listOrganizationChartsQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listOrganizationChartsQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name')
})

export const listOrganizationChartsResponseNameMax = 300;



export const listOrganizationChartsResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listOrganizationChartsResponseNameMax).describe('名前'),
  "current": zod.boolean().describe('現在有効な組織図かどうか'),
  "teamsCount": zod.number().describe('チーム数'),
  "membershipsCount": zod.number().describe('所属数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "activationPlan": zod.object({
  "id": zod.string().describe('UUID'),
  "dueOn": zod.iso.date().describe('有効化の予定日'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).nullable().describe('有効化の予定')
}).describe('組織図')
export const listOrganizationChartsResponse = zod.array(listOrganizationChartsResponseItem)

/**
 * 組織図を作成します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を作成
 */
export const createOrganizationChartBody = zod.object({
  "name": zod.string().describe('名前')
}).describe('組織図を作成・更新するときのrequest body')

export const createOrganizationChartResponseNameMax = 300;



export const createOrganizationChartResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createOrganizationChartResponseNameMax).describe('名前'),
  "current": zod.boolean().describe('現在有効な組織図かどうか'),
  "teamsCount": zod.number().describe('チーム数'),
  "membershipsCount": zod.number().describe('所属数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "activationPlan": zod.object({
  "id": zod.string().describe('UUID'),
  "dueOn": zod.iso.date().describe('有効化の予定日'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).nullable().describe('有効化の予定')
}).describe('組織図').describe('組織図の詳細')

/**
 * 組織図を削除します。同時に、組織図内のチームや所属もすべて削除されます。

このAPIの実行には、チームの管理権限が必要です。

注意：現在有効な組織図は削除できません。
注意：組織図の削除は時間がかかることがあるため、削除は非同期で実行されます。削除の完了前にレスポンスを返すので注意してください。
 * @summary 組織図を削除
 */
export const deleteOrganizationChartParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID')
})

/**
 * 組織図を一件取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を取得
 */
export const getOrganizationChartParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID')
})

export const getOrganizationChartResponseNameMax = 300;



export const getOrganizationChartResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getOrganizationChartResponseNameMax).describe('名前'),
  "current": zod.boolean().describe('現在有効な組織図かどうか'),
  "teamsCount": zod.number().describe('チーム数'),
  "membershipsCount": zod.number().describe('所属数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "activationPlan": zod.object({
  "id": zod.string().describe('UUID'),
  "dueOn": zod.iso.date().describe('有効化の予定日'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).nullable().describe('有効化の予定')
}).describe('組織図').describe('組織図の詳細')

/**
 * 組織図を更新します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 組織図を更新
 */
export const updateOrganizationChartParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID')
})

export const updateOrganizationChartBody = zod.object({
  "name": zod.string().describe('名前')
}).describe('組織図を作成・更新するときのrequest body')

export const updateOrganizationChartResponseNameMax = 300;



export const updateOrganizationChartResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateOrganizationChartResponseNameMax).describe('名前'),
  "current": zod.boolean().describe('現在有効な組織図かどうか'),
  "teamsCount": zod.number().describe('チーム数'),
  "membershipsCount": zod.number().describe('所属数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "activationPlan": zod.object({
  "id": zod.string().describe('UUID'),
  "dueOn": zod.iso.date().describe('有効化の予定日'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).nullable().describe('有効化の予定')
}).describe('組織図').describe('組織図の詳細')

/**
 * 現在有効になっている組織図を取得します。

このAPIの実行には、チームの管理権限が必要です。
 * @summary 現在の組織図を取得
 */
export const getCurrentOrganizationChartResponseNameMax = 300;



export const getCurrentOrganizationChartResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getCurrentOrganizationChartResponseNameMax).describe('名前'),
  "current": zod.boolean().describe('現在有効な組織図かどうか'),
  "teamsCount": zod.number().describe('チーム数'),
  "membershipsCount": zod.number().describe('所属数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "activationPlan": zod.object({
  "id": zod.string().describe('UUID'),
  "dueOn": zod.iso.date().describe('有効化の予定日'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).nullable().describe('有効化の予定')
}).describe('組織図').describe('組織図の詳細')

/**
 * 指定した組織図を有効化し、ワークフローで使用する組織図を切り替えます。
他の組織図に有効化の予定がある場合、それらの予定は削除されます。

このAPIの実行には、チームの管理権限が必要です。

注意：組織図の有効化は時間がかかることがあるため、有効化は非同期で実行されます。有効化の完了前にレスポンスを返すので注意してください。
 * @summary 組織図を有効化
 */
export const activateOrganizationChartParams = zod.object({
  "organizationChartId": zod.uuid().describe('組織図のUUID')
})

export const activateOrganizationChartBody = zod.object({
  "dueOn": zod.iso.date().optional().describe('有効化する日付。nullの場合、即時で有効化します。')
})

export const activateOrganizationChartResponseNameMax = 300;



export const activateOrganizationChartResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(activateOrganizationChartResponseNameMax).describe('名前'),
  "current": zod.boolean().describe('現在有効な組織図かどうか'),
  "teamsCount": zod.number().describe('チーム数'),
  "membershipsCount": zod.number().describe('所属数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "activationPlan": zod.object({
  "id": zod.string().describe('UUID'),
  "dueOn": zod.iso.date().describe('有効化の予定日'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).nullable().describe('有効化の予定')
}).describe('組織図').describe('組織図の詳細')

