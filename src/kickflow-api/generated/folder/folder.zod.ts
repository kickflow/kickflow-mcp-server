import * as zod from 'zod';


/**
 * フォルダの一覧を取得します。
 * @summary フォルダの一覧を取得
 */
export const listFoldersQueryPageDefault = 1;

export const listFoldersQueryPerPageDefault = 25;
export const listFoldersQueryPerPageMax = 100;

export const listFoldersQuerySortByRegExp = new RegExp('^(createdAt|name|fullName)(-asc|-desc)?$');


export const ListFoldersQueryParams = zod.object({
  "page": zod.number().min(1).default(listFoldersQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listFoldersQueryPerPageMax).default(listFoldersQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listFoldersQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, name, fullName')
})

export const listFoldersResponseNameMax = 300;

export const listFoldersResponseCodeMax = 100;

export const listFoldersResponseWorkflowsCountMin = 0;

export const listFoldersResponseRoutesCountMin = 0;

export const listFoldersResponsePipelinesCountMin = 0;



export const ListFoldersResponseItem = zod.object({
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
export const ListFoldersResponse = zod.array(ListFoldersResponseItem)

/**
 * フォルダを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを作成
 */
export const CreateFolderBody = zod.object({
  "name": zod.string().describe('名前'),
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "description": zod.string().optional().describe('フォルダの説明'),
  "parentFolderId": zod.string().nullish().describe('親フォルダのID')
})

export const createFolderResponseOneNameMax = 300;

export const createFolderResponseOneCodeMax = 100;

export const createFolderResponseOneWorkflowsCountMin = 0;

export const createFolderResponseOneRoutesCountMin = 0;

export const createFolderResponseOnePipelinesCountMin = 0;

export const createFolderResponseTwoAncestorsItemNameMax = 300;

export const createFolderResponseTwoAncestorsItemCodeMax = 100;

export const createFolderResponseTwoAncestorsItemWorkflowsCountMin = 0;

export const createFolderResponseTwoAncestorsItemRoutesCountMin = 0;

export const createFolderResponseTwoAncestorsItemPipelinesCountMin = 0;

export const createFolderResponseTwoChildrenItemNameMax = 300;

export const createFolderResponseTwoChildrenItemCodeMax = 100;

export const createFolderResponseTwoChildrenItemWorkflowsCountMin = 0;

export const createFolderResponseTwoChildrenItemRoutesCountMin = 0;

export const createFolderResponseTwoChildrenItemPipelinesCountMin = 0;



export const CreateFolderResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createFolderResponseOneNameMax).describe('名前'),
  "code": zod.string().max(createFolderResponseOneCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createFolderResponseOneWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createFolderResponseOneRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createFolderResponseOnePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').and(zod.object({
  "ancestors": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createFolderResponseTwoAncestorsItemNameMax).describe('名前'),
  "code": zod.string().max(createFolderResponseTwoAncestorsItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createFolderResponseTwoAncestorsItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createFolderResponseTwoAncestorsItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createFolderResponseTwoAncestorsItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('親フォルダからルートフォルダまでの配列'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createFolderResponseTwoChildrenItemNameMax).describe('名前'),
  "code": zod.string().max(createFolderResponseTwoChildrenItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(createFolderResponseTwoChildrenItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(createFolderResponseTwoChildrenItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(createFolderResponseTwoChildrenItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
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


export const DeleteFolderParams = zod.object({
  "folderId": zod.string().regex(deleteFolderPathFolderIdRegExp).describe('フォルダのUUIDまたはコード')
})

/**
 * フォルダを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary フォルダを更新
 */
export const updateFolderPathFolderIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const UpdateFolderParams = zod.object({
  "folderId": zod.string().regex(updateFolderPathFolderIdRegExp).describe('フォルダのUUIDまたはコード')
})

export const UpdateFolderBody = zod.object({
  "name": zod.string().optional().describe('名前'),
  "code": zod.string().optional().describe('コード'),
  "description": zod.string().optional().describe('フォルダの説明'),
  "parentFolderId": zod.string().nullish().describe('親フォルダのID')
})

export const updateFolderResponseOneNameMax = 300;

export const updateFolderResponseOneCodeMax = 100;

export const updateFolderResponseOneWorkflowsCountMin = 0;

export const updateFolderResponseOneRoutesCountMin = 0;

export const updateFolderResponseOnePipelinesCountMin = 0;

export const updateFolderResponseTwoAncestorsItemNameMax = 300;

export const updateFolderResponseTwoAncestorsItemCodeMax = 100;

export const updateFolderResponseTwoAncestorsItemWorkflowsCountMin = 0;

export const updateFolderResponseTwoAncestorsItemRoutesCountMin = 0;

export const updateFolderResponseTwoAncestorsItemPipelinesCountMin = 0;

export const updateFolderResponseTwoChildrenItemNameMax = 300;

export const updateFolderResponseTwoChildrenItemCodeMax = 100;

export const updateFolderResponseTwoChildrenItemWorkflowsCountMin = 0;

export const updateFolderResponseTwoChildrenItemRoutesCountMin = 0;

export const updateFolderResponseTwoChildrenItemPipelinesCountMin = 0;



export const UpdateFolderResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateFolderResponseOneNameMax).describe('名前'),
  "code": zod.string().max(updateFolderResponseOneCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateFolderResponseOneWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateFolderResponseOneRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateFolderResponseOnePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').and(zod.object({
  "ancestors": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateFolderResponseTwoAncestorsItemNameMax).describe('名前'),
  "code": zod.string().max(updateFolderResponseTwoAncestorsItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateFolderResponseTwoAncestorsItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateFolderResponseTwoAncestorsItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateFolderResponseTwoAncestorsItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('親フォルダからルートフォルダまでの配列'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateFolderResponseTwoChildrenItemNameMax).describe('名前'),
  "code": zod.string().max(updateFolderResponseTwoChildrenItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(updateFolderResponseTwoChildrenItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(updateFolderResponseTwoChildrenItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(updateFolderResponseTwoChildrenItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('子フォルダ')
})).describe('フォルダの詳細')

/**
 * フォルダを一件取得します。
 * @summary フォルダを取得
 */
export const getFolderPathFolderIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const GetFolderParams = zod.object({
  "folderId": zod.string().regex(getFolderPathFolderIdRegExp).describe('フォルダのUUIDまたはコード')
})

export const getFolderResponseOneNameMax = 300;

export const getFolderResponseOneCodeMax = 100;

export const getFolderResponseOneWorkflowsCountMin = 0;

export const getFolderResponseOneRoutesCountMin = 0;

export const getFolderResponseOnePipelinesCountMin = 0;

export const getFolderResponseTwoAncestorsItemNameMax = 300;

export const getFolderResponseTwoAncestorsItemCodeMax = 100;

export const getFolderResponseTwoAncestorsItemWorkflowsCountMin = 0;

export const getFolderResponseTwoAncestorsItemRoutesCountMin = 0;

export const getFolderResponseTwoAncestorsItemPipelinesCountMin = 0;

export const getFolderResponseTwoChildrenItemNameMax = 300;

export const getFolderResponseTwoChildrenItemCodeMax = 100;

export const getFolderResponseTwoChildrenItemWorkflowsCountMin = 0;

export const getFolderResponseTwoChildrenItemRoutesCountMin = 0;

export const getFolderResponseTwoChildrenItemPipelinesCountMin = 0;



export const GetFolderResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getFolderResponseOneNameMax).describe('名前'),
  "code": zod.string().max(getFolderResponseOneCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getFolderResponseOneWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getFolderResponseOneRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getFolderResponseOnePipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ').and(zod.object({
  "ancestors": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getFolderResponseTwoAncestorsItemNameMax).describe('名前'),
  "code": zod.string().max(getFolderResponseTwoAncestorsItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getFolderResponseTwoAncestorsItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getFolderResponseTwoAncestorsItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getFolderResponseTwoAncestorsItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('親フォルダからルートフォルダまでの配列'),
  "children": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(getFolderResponseTwoChildrenItemNameMax).describe('名前'),
  "code": zod.string().max(getFolderResponseTwoChildrenItemCodeMax).describe('コード'),
  "description": zod.string().nullish().describe('説明'),
  "workflowsCount": zod.number().min(getFolderResponseTwoChildrenItemWorkflowsCountMin).describe('フォルダ内のワークフロー数'),
  "routesCount": zod.number().min(getFolderResponseTwoChildrenItemRoutesCountMin).describe('フォルダ内の経路数'),
  "pipelinesCount": zod.number().min(getFolderResponseTwoChildrenItemPipelinesCountMin).describe('フォルダ内のパイプライン数'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('フォルダ')).optional().describe('子フォルダ')
})).describe('フォルダの詳細')

