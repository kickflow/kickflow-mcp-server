import * as zod from 'zod';


/**
 * カテゴリの一覧を取得します。
 * @summary カテゴリの一覧を取得
 */
export const listCategoriesQueryPageDefault = 1;

export const listCategoriesQueryPerPageDefault = 25;
export const listCategoriesQueryPerPageMax = 100;

export const listCategoriesQuerySortByRegExp = new RegExp('^(name|createdAt|updatedAt)(-asc|-desc)?$');


export const listCategoriesQueryParams = zod.object({
  "page": zod.number().min(1).default(listCategoriesQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listCategoriesQueryPerPageMax).default(listCategoriesQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listCategoriesQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: name, createdAt, updatedAt')
})

export const listCategoriesResponseNameMax = 100;



export const listCategoriesResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(listCategoriesResponseNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')
export const listCategoriesResponse = zod.array(listCategoriesResponseItem)

/**
 * カテゴリを作成します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを作成
 */
export const createCategoryBody = zod.object({
  "name": zod.string().describe('名前')
})

export const createCategoryResponseNameMax = 100;



export const createCategoryResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(createCategoryResponseNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')

/**
 * カテゴリを削除します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを削除
 */
export const deleteCategoryParams = zod.object({
  "categoryId": zod.uuid().describe('カテゴリのUUID')
})

/**
 * カテゴリを更新します。

このAPIの実行には、ワークフロー関連設定の管理権限が必要です。
 * @summary カテゴリを更新
 */
export const updateCategoryParams = zod.object({
  "categoryId": zod.uuid().describe('カテゴリのUUID')
})

export const updateCategoryBody = zod.object({
  "name": zod.string().describe('名前')
})

export const updateCategoryResponseNameMax = 100;



export const updateCategoryResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "name": zod.string().max(updateCategoryResponseNameMax).describe('名前'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('カテゴリ')

