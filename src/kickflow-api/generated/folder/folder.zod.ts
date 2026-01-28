import * as zod from 'zod';


/**
 * フォルダの一覧を取得します。
 * @summary フォルダの一覧を取得
 */
export const listFoldersQueryPageDefault = 1;

export const listFoldersQueryPerPageDefault = 25;
export const listFoldersQueryPerPageMax = 100;

export const listFoldersQuerySortByRegExp = new RegExp('^(createdAt|name|fullName)(-asc|-desc)?$');


export const listFoldersQueryParams = zod.object({
  "page": zod.number().min(1).default(listFoldersQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listFoldersQueryPerPageMax).default(listFoldersQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listFoldersQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name, fullName')
})

export const listFoldersResponseNameMax = 300;

export const listFoldersResponseCodeMax = 100;

export const listFoldersResponseWorkflowsCountMin = 0;

export const listFoldersResponseRoutesCountMin = 0;

export const listFoldersResponsePipelinesCountMin = 0;



export const listFoldersResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listFoldersResponseNameMax).describe('名前'),
  "code": zod.string().max(listFoldersResponseCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(listFoldersResponseWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(listFoldersResponseRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(listFoldersResponsePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')
export const listFoldersResponse = zod.array(listFoldersResponseItem)

/**
 * フォルダを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを作成
 */
export const createFolderBody = zod.object({
  "name": zod.string().describe('名前'),
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "description": zod.string().optional().describe('フォルダの説明'),
  "parentFolderId": zod.string().nullish().describe('親フォルダのID')
})

export const createFolderResponseNameMax = 300;

export const createFolderResponseCodeMax = 100;

export const createFolderResponseWorkflowsCountMin = 0;

export const createFolderResponseRoutesCountMin = 0;

export const createFolderResponsePipelinesCountMin = 0;

export const createFolderResponseAncestorsItemNameMax = 300;

export const createFolderResponseAncestorsItemCodeMax = 100;

export const createFolderResponseAncestorsItemWorkflowsCountMin = 0;

export const createFolderResponseAncestorsItemRoutesCountMin = 0;

export const createFolderResponseAncestorsItemPipelinesCountMin = 0;

export const createFolderResponseChildrenItemNameMax = 300;

export const createFolderResponseChildrenItemCodeMax = 100;

export const createFolderResponseChildrenItemWorkflowsCountMin = 0;

export const createFolderResponseChildrenItemRoutesCountMin = 0;

export const createFolderResponseChildrenItemPipelinesCountMin = 0;



export const createFolderResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createFolderResponseNameMax).describe('名前'),
  "code": zod.string().max(createFolderResponseCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createFolderResponseWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createFolderResponseRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createFolderResponsePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').and(zod.object({
  "ancestors": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createFolderResponseAncestorsItemNameMax).describe('名前'),
  "code": zod.string().max(createFolderResponseAncestorsItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createFolderResponseAncestorsItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createFolderResponseAncestorsItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createFolderResponseAncestorsItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('親フォルダからルートフォルダまでの配列'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createFolderResponseChildrenItemNameMax).describe('名前'),
  "code": zod.string().max(createFolderResponseChildrenItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createFolderResponseChildrenItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createFolderResponseChildrenItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createFolderResponseChildrenItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('子フォルダ')
})).describe('フォルダの詳細')

/**
 * フォルダを削除します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。

注意：このフォルダ以下のすべてのフォルダ・ワークフロー・経路・パイプラインも削除されます。
 * @summary フォルダを削除
 */
export const deleteFolderPathFolderIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const deleteFolderParams = zod.object({
  "folderId": zod.string().regex(deleteFolderPathFolderIdRegExp).describe('フォルダのUUIDまたはコード')
})

/**
 * フォルダを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを更新
 */
export const updateFolderPathFolderIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const updateFolderParams = zod.object({
  "folderId": zod.string().regex(updateFolderPathFolderIdRegExp).describe('フォルダのUUIDまたはコード')
})

export const updateFolderBody = zod.object({
  "name": zod.string().optional().describe('名前'),
  "code": zod.string().optional().describe('コード'),
  "description": zod.string().optional().describe('フォルダの説明'),
  "parentFolderId": zod.string().nullish().describe('親フォルダのID')
})

export const updateFolderResponseNameMax = 300;

export const updateFolderResponseCodeMax = 100;

export const updateFolderResponseWorkflowsCountMin = 0;

export const updateFolderResponseRoutesCountMin = 0;

export const updateFolderResponsePipelinesCountMin = 0;

export const updateFolderResponseAncestorsItemNameMax = 300;

export const updateFolderResponseAncestorsItemCodeMax = 100;

export const updateFolderResponseAncestorsItemWorkflowsCountMin = 0;

export const updateFolderResponseAncestorsItemRoutesCountMin = 0;

export const updateFolderResponseAncestorsItemPipelinesCountMin = 0;

export const updateFolderResponseChildrenItemNameMax = 300;

export const updateFolderResponseChildrenItemCodeMax = 100;

export const updateFolderResponseChildrenItemWorkflowsCountMin = 0;

export const updateFolderResponseChildrenItemRoutesCountMin = 0;

export const updateFolderResponseChildrenItemPipelinesCountMin = 0;



export const updateFolderResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateFolderResponseNameMax).describe('名前'),
  "code": zod.string().max(updateFolderResponseCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateFolderResponseWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateFolderResponseRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateFolderResponsePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').and(zod.object({
  "ancestors": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateFolderResponseAncestorsItemNameMax).describe('名前'),
  "code": zod.string().max(updateFolderResponseAncestorsItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateFolderResponseAncestorsItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateFolderResponseAncestorsItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateFolderResponseAncestorsItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('親フォルダからルートフォルダまでの配列'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateFolderResponseChildrenItemNameMax).describe('名前'),
  "code": zod.string().max(updateFolderResponseChildrenItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateFolderResponseChildrenItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateFolderResponseChildrenItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateFolderResponseChildrenItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('子フォルダ')
})).describe('フォルダの詳細')

/**
 * フォルダを一件取得します。
 * @summary フォルダを取得
 */
export const getFolderPathFolderIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const getFolderParams = zod.object({
  "folderId": zod.string().regex(getFolderPathFolderIdRegExp).describe('フォルダのUUIDまたはコード')
})

export const getFolderResponseNameMax = 300;

export const getFolderResponseCodeMax = 100;

export const getFolderResponseWorkflowsCountMin = 0;

export const getFolderResponseRoutesCountMin = 0;

export const getFolderResponsePipelinesCountMin = 0;

export const getFolderResponseAncestorsItemNameMax = 300;

export const getFolderResponseAncestorsItemCodeMax = 100;

export const getFolderResponseAncestorsItemWorkflowsCountMin = 0;

export const getFolderResponseAncestorsItemRoutesCountMin = 0;

export const getFolderResponseAncestorsItemPipelinesCountMin = 0;

export const getFolderResponseChildrenItemNameMax = 300;

export const getFolderResponseChildrenItemCodeMax = 100;

export const getFolderResponseChildrenItemWorkflowsCountMin = 0;

export const getFolderResponseChildrenItemRoutesCountMin = 0;

export const getFolderResponseChildrenItemPipelinesCountMin = 0;



export const getFolderResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getFolderResponseNameMax).describe('名前'),
  "code": zod.string().max(getFolderResponseCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getFolderResponseWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getFolderResponseRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getFolderResponsePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').and(zod.object({
  "ancestors": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getFolderResponseAncestorsItemNameMax).describe('名前'),
  "code": zod.string().max(getFolderResponseAncestorsItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getFolderResponseAncestorsItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getFolderResponseAncestorsItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getFolderResponseAncestorsItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('親フォルダからルートフォルダまでの配列'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getFolderResponseChildrenItemNameMax).describe('名前'),
  "code": zod.string().max(getFolderResponseChildrenItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getFolderResponseChildrenItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getFolderResponseChildrenItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getFolderResponseChildrenItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('子フォルダ')
})).describe('フォルダの詳細')

