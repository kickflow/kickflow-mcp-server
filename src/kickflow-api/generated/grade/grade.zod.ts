/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * kickflow REST API v1
 * kickflowの開発者用REST API (v1)
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod';


/**
 * 役職の一覧を取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職の一覧を取得
 */
export const listGradesQueryPageDefault = 1;export const listGradesQueryPerPageDefault = 25;
export const listGradesQueryPerPageMax = 100;
export const listGradesQuerySortByRegExp = new RegExp('^(level|code)(-asc|-desc)?$');


export const listGradesQueryParams = zod.object({
  "page": zod.number().min(1).default(listGradesQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listGradesQueryPerPageMax).default(listGradesQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listGradesQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: level, code')
})

export const listGradesResponseNameMax = 255;
export const listGradesResponseLevelMin = 0;

export const listGradesResponseLevelMax = 255;
export const listGradesResponseCodeMax = 255;
export const listGradesResponseIsDefaultDefault = false;

export const listGradesResponseItem = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "name": zod.string().max(listGradesResponseNameMax).describe('名前'),
  "level": zod.number().min(listGradesResponseLevelMin).max(listGradesResponseLevelMax).describe('レベル'),
  "code": zod.string().max(listGradesResponseCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時')
}).describe('役職')
export const listGradesResponse = zod.array(listGradesResponseItem)

/**
 * 役職を作成します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を作成
 */
export const createGradeBodyNameMax = 255;
export const createGradeBodyLevelMin = 0;

export const createGradeBodyLevelMax = 255;
export const createGradeBodyCodeMax = 255;


export const createGradeBody = zod.object({
  "name": zod.string().max(createGradeBodyNameMax).describe('名前'),
  "level": zod.number().min(createGradeBodyLevelMin).max(createGradeBodyLevelMax).describe('レベル'),
  "code": zod.string().max(createGradeBodyCodeMax).optional().describe('コード。未指定の場合、ランダムな英数字がセットされます。')
}).describe('役職を作成するときのrequest body')

export const createGradeResponseNameMax = 255;
export const createGradeResponseLevelMin = 0;

export const createGradeResponseLevelMax = 255;
export const createGradeResponseCodeMax = 255;
export const createGradeResponseIsDefaultDefault = false;

export const createGradeResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "name": zod.string().max(createGradeResponseNameMax).describe('名前'),
  "level": zod.number().min(createGradeResponseLevelMin).max(createGradeResponseLevelMax).describe('レベル'),
  "code": zod.string().max(createGradeResponseCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時')
}).describe('役職')

/**
 * 役職を一件取得します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を取得
 */
export const getGradeResponseNameMax = 255;
export const getGradeResponseLevelMin = 0;

export const getGradeResponseLevelMax = 255;
export const getGradeResponseCodeMax = 255;
export const getGradeResponseIsDefaultDefault = false;

export const getGradeResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "name": zod.string().max(getGradeResponseNameMax).describe('名前'),
  "level": zod.number().min(getGradeResponseLevelMin).max(getGradeResponseLevelMax).describe('レベル'),
  "code": zod.string().max(getGradeResponseCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時')
}).describe('役職')

/**
 * 役職を更新します。

このAPIの実行には、ユーザーの管理権限が必要です。
 * @summary 役職を更新
 */
export const updateGradeBodyNameMax = 30;
export const updateGradeBodyLevelMin = 0;

export const updateGradeBodyLevelMax = 255;


export const updateGradeBody = zod.object({
  "name": zod.string().max(updateGradeBodyNameMax).optional().describe('名前'),
  "level": zod.number().min(updateGradeBodyLevelMin).max(updateGradeBodyLevelMax).optional().describe('レベル'),
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字がセットされます。')
}).describe('役職を更新するときのrequest body')

export const updateGradeResponseNameMax = 255;
export const updateGradeResponseLevelMin = 0;

export const updateGradeResponseLevelMax = 255;
export const updateGradeResponseCodeMax = 255;
export const updateGradeResponseIsDefaultDefault = false;

export const updateGradeResponse = zod.object({
  "id": zod.string().uuid().describe('UUID'),
  "name": zod.string().max(updateGradeResponseNameMax).describe('名前'),
  "level": zod.number().min(updateGradeResponseLevelMin).max(updateGradeResponseLevelMax).describe('レベル'),
  "code": zod.string().max(updateGradeResponseCodeMax).nullable().describe('コード'),
  "isDefault": zod.boolean().describe('デフォルトの役職かどうか'),
  "createdAt": zod.string().datetime({}).describe('作成日時'),
  "updatedAt": zod.string().datetime({}).describe('更新日時')
}).describe('役職')

