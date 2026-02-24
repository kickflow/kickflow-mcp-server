import * as zod from 'zod';


/**
 * 汎用マスタの一覧を取得します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタの一覧を取得
 */
export const listGeneralMastersQueryPageDefault = 1;

export const listGeneralMastersQueryPerPageDefault = 25;
export const listGeneralMastersQueryPerPageMax = 100;

export const listGeneralMastersQuerySortByRegExp = new RegExp('^(createdAt|code|name)(-asc|-desc)?$');


export const listGeneralMastersQueryParams = zod.object({
  "page": zod.number().min(1).default(listGeneralMastersQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listGeneralMastersQueryPerPageMax).default(listGeneralMastersQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listGeneralMastersQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, code, name')
})

export const listGeneralMastersResponseCodeMax = 100;

export const listGeneralMastersResponseNameMax = 300;

export const listGeneralMastersResponseFieldsItemTitleMax = 300;

export const listGeneralMastersResponseFieldsItemCodeMax = 100;



export const listGeneralMastersResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(listGeneralMastersResponseCodeMax).describe('コード'),
  "name": zod.string().max(listGeneralMastersResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(listGeneralMastersResponseFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(listGeneralMastersResponseFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')
export const listGeneralMastersResponse = zod.array(listGeneralMastersResponseItem)

/**
 * 汎用マスタを作成します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを作成
 */
export const createGeneralMasterBody = zod.object({
  "name": zod.string().describe('名前'),
  "code": zod.string().nullish().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "description": zod.string().nullish().describe('説明'),
  "fields": zod.array(zod.object({
  "title": zod.string().describe('フィールド名'),
  "description": zod.string().nullish().describe('フィールドの説明'),
  "code": zod.string().describe('フィールドのコード'),
  "required": zod.boolean().describe('入力必須かどうか'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "options": zod.array(zod.string()).nullish().describe('選択肢。fieldTypeがcheckboxまたはpull_downのとき必須。'),
  "visible": zod.boolean().optional().describe('管理者以外も閲覧可能な場合true')
})).optional().describe('カスタムフィールドの配列')
})

export const createGeneralMasterResponseCodeMax = 100;

export const createGeneralMasterResponseNameMax = 300;

export const createGeneralMasterResponseFieldsItemTitleMax = 300;

export const createGeneralMasterResponseFieldsItemCodeMax = 100;



export const createGeneralMasterResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(createGeneralMasterResponseCodeMax).describe('コード'),
  "name": zod.string().max(createGeneralMasterResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(createGeneralMasterResponseFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(createGeneralMasterResponseFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')

/**
 * 汎用マスタを一件取得します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを取得
 */
export const getGeneralMasterPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const getGeneralMasterParams = zod.object({
  "generalMasterId": zod.string().regex(getGeneralMasterPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード')
})

export const getGeneralMasterResponseCodeMax = 100;

export const getGeneralMasterResponseNameMax = 300;

export const getGeneralMasterResponseFieldsItemTitleMax = 300;

export const getGeneralMasterResponseFieldsItemCodeMax = 100;



export const getGeneralMasterResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getGeneralMasterResponseCodeMax).describe('コード'),
  "name": zod.string().max(getGeneralMasterResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getGeneralMasterResponseFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getGeneralMasterResponseFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')

/**
 * 汎用マスタを更新します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを更新
 */
export const updateGeneralMasterPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const updateGeneralMasterParams = zod.object({
  "generalMasterId": zod.string().regex(updateGeneralMasterPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード')
})

export const updateGeneralMasterBody = zod.object({
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "name": zod.string().optional().describe('名前'),
  "description": zod.string().optional().describe('説明'),
  "fields": zod.array(zod.object({
  "title": zod.string().optional().describe('フィールド名'),
  "description": zod.string().nullish().describe('フィールドの説明'),
  "code": zod.string().describe('フィールドのコード'),
  "required": zod.boolean().optional().describe('入力必須かどうか'),
  "fieldType": zod.string().optional().describe('フィールドの型'),
  "options": zod.array(zod.string()).nullish().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ必須。'),
  "visible": zod.boolean().optional().describe('管理者以外も閲覧可能な場合true')
})).optional().describe('カスタムフィールドの配列')
})

export const updateGeneralMasterResponseCodeMax = 100;

export const updateGeneralMasterResponseNameMax = 300;

export const updateGeneralMasterResponseFieldsItemTitleMax = 300;

export const updateGeneralMasterResponseFieldsItemCodeMax = 100;



export const updateGeneralMasterResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(updateGeneralMasterResponseCodeMax).describe('コード'),
  "name": zod.string().max(updateGeneralMasterResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "fields": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(updateGeneralMasterResponseFieldsItemTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(updateGeneralMasterResponseFieldsItemCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')).describe('カスタムフィールドの配列')
}).describe('汎用マスタ')

/**
 * 汎用マスタを削除します。この汎用マスタのすべてのアイテムも同時に削除されます。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタを削除
 */
export const deleteGeneralMasterPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const deleteGeneralMasterParams = zod.object({
  "generalMasterId": zod.string().regex(deleteGeneralMasterPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード')
})

/**
 * 汎用マスタアイテムの一覧を取得します。
 * @summary 汎用マスタアイテムの一覧を取得
 */
export const listGeneralMasterItemsPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const listGeneralMasterItemsParams = zod.object({
  "generalMasterId": zod.string().regex(listGeneralMasterItemsPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード')
})

export const listGeneralMasterItemsQueryPageDefault = 1;

export const listGeneralMasterItemsQueryPerPageDefault = 25;
export const listGeneralMasterItemsQueryPerPageMax = 100;

export const listGeneralMasterItemsQuerySortByRegExp = new RegExp('^(createdAt|code|name)(-asc|-desc)?$');


export const listGeneralMasterItemsQueryParams = zod.object({
  "page": zod.number().min(1).default(listGeneralMasterItemsQueryPageDefault).describe('ページ'),
  "perPage": zod.number().min(1).max(listGeneralMasterItemsQueryPerPageMax).default(listGeneralMasterItemsQueryPerPageDefault).describe('1ページあたりの件数'),
  "sortBy": zod.string().regex(listGeneralMasterItemsQuerySortByRegExp).optional().describe('ソート対象のフィールドと順序。指定可能なフィールド: createdAt, code, name')
})

export const listGeneralMasterItemsResponseCodeMax = 100;

export const listGeneralMasterItemsResponseNameMax = 100;

export const listGeneralMasterItemsResponseInputsItemFieldTitleMax = 300;

export const listGeneralMasterItemsResponseInputsItemFieldCodeMax = 100;



export const listGeneralMasterItemsResponseItem = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(listGeneralMasterItemsResponseCodeMax).describe('コード'),
  "name": zod.string().max(listGeneralMasterItemsResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(listGeneralMasterItemsResponseInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(listGeneralMasterItemsResponseInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム')
export const listGeneralMasterItemsResponse = zod.array(listGeneralMasterItemsResponseItem)

/**
 * 汎用マスタアイテムを作成します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを作成
 */
export const createGeneralMasterItemPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const createGeneralMasterItemParams = zod.object({
  "generalMasterId": zod.string().regex(createGeneralMasterItemPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード')
})

export const createGeneralMasterItemBody = zod.object({
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "name": zod.string().describe('名前'),
  "description": zod.string().optional().describe('説明'),
  "startsOn": zod.iso.date().nullish().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullish().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "code": zod.string().describe('フィールドのコード'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値。カスタムフィールドがcheckboxの場合は文字列の配列、それ以外は文字列。')
})).describe('カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。')
})

export const createGeneralMasterItemResponseCodeMax = 100;

export const createGeneralMasterItemResponseNameMax = 100;

export const createGeneralMasterItemResponseInputsItemFieldTitleMax = 300;

export const createGeneralMasterItemResponseInputsItemFieldCodeMax = 100;



export const createGeneralMasterItemResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(createGeneralMasterItemResponseCodeMax).describe('コード'),
  "name": zod.string().max(createGeneralMasterItemResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(createGeneralMasterItemResponseInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(createGeneralMasterItemResponseInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム')

/**
 * 汎用マスタアイテムを一件取得します。
 * @summary 汎用マスタアイテムを取得
 */
export const getGeneralMasterItemPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const getGeneralMasterItemParams = zod.object({
  "generalMasterId": zod.string().regex(getGeneralMasterItemPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード'),
  "itemId": zod.string().describe('汎用マスタアイテムのUUIDまたはコード')
})

export const getGeneralMasterItemResponseCodeMax = 100;

export const getGeneralMasterItemResponseNameMax = 100;

export const getGeneralMasterItemResponseInputsItemFieldTitleMax = 300;

export const getGeneralMasterItemResponseInputsItemFieldCodeMax = 100;



export const getGeneralMasterItemResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(getGeneralMasterItemResponseCodeMax).describe('コード'),
  "name": zod.string().max(getGeneralMasterItemResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(getGeneralMasterItemResponseInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(getGeneralMasterItemResponseInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム')

/**
 * 汎用マスタアイテムを更新します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを更新
 */
export const updateGeneralMasterItemPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const updateGeneralMasterItemParams = zod.object({
  "generalMasterId": zod.string().regex(updateGeneralMasterItemPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード'),
  "itemId": zod.string().describe('汎用マスタアイテムのUUIDまたはコード')
})

export const updateGeneralMasterItemBody = zod.object({
  "code": zod.string().optional().describe('コード。未指定の場合、ランダムな英数字が自動的に設定されます。'),
  "name": zod.string().optional().describe('名前'),
  "description": zod.string().optional().describe('説明'),
  "startsOn": zod.iso.date().nullish().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullish().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "code": zod.string().describe('フィールドのコード'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値。カスタムフィールドがcheckboxの場合文字列の配列、それ以外の場合文字列。')
})).optional().describe('カスタムフィールドの入力。必須ではないカスタムフィールドを含む、すべてのカスタムフィールドに対して入力する必要があります。')
})

export const updateGeneralMasterItemResponseCodeMax = 100;

export const updateGeneralMasterItemResponseNameMax = 100;

export const updateGeneralMasterItemResponseInputsItemFieldTitleMax = 300;

export const updateGeneralMasterItemResponseInputsItemFieldCodeMax = 100;



export const updateGeneralMasterItemResponse = zod.object({
  "id": zod.uuid().describe('UUID'),
  "code": zod.string().max(updateGeneralMasterItemResponseCodeMax).describe('コード'),
  "name": zod.string().max(updateGeneralMasterItemResponseNameMax).describe('名前'),
  "description": zod.string().nullable().describe('説明'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "startsOn": zod.iso.date().nullable().describe('有効期限の開始日'),
  "endsOn": zod.iso.date().nullable().describe('有効期限の終了日'),
  "inputs": zod.array(zod.object({
  "id": zod.uuid().describe('UUID'),
  "value": zod.union([zod.string().nullable(),zod.array(zod.string())]).describe('入力値'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時'),
  "field": zod.object({
  "id": zod.uuid().describe('UUID'),
  "title": zod.string().max(updateGeneralMasterItemResponseInputsItemFieldTitleMax).describe('フィールド名'),
  "description": zod.string().nullable().describe('フィールドの説明'),
  "code": zod.string().max(updateGeneralMasterItemResponseInputsItemFieldCodeMax).describe('フィールドのコード'),
  "fieldType": zod.enum(['text', 'text_long', 'number', 'integer', 'checkbox', 'pull_down', 'date']).describe('フィールドの型'),
  "required": zod.boolean().describe('必須項目かどうか'),
  "visible": zod.boolean().describe('管理者以外も閲覧可能な場合true'),
  "options": zod.array(zod.string()).nullable().describe('選択肢。fieldTypeがcheckboxまたはpull_downのときのみ。'),
  "createdAt": zod.iso.datetime({}).describe('作成日時'),
  "updatedAt": zod.iso.datetime({}).describe('更新日時')
}).describe('汎用マスタのカスタムフィールド')
})).describe('カスタムフィールドの入力の配列')
}).describe('汎用マスタのアイテム')

/**
 * 汎用マスタアイテムを削除します。

このAPIの実行には、汎用マスタの管理権限が必要です。
 * @summary 汎用マスタアイテムを削除
 */
export const deleteGeneralMasterItemPathGeneralMasterIdRegExp = new RegExp('^[a-zA-Z0-9_-]+$');


export const deleteGeneralMasterItemParams = zod.object({
  "generalMasterId": zod.string().regex(deleteGeneralMasterItemPathGeneralMasterIdRegExp).describe('汎用マスタのUUIDまたはコード'),
  "itemId": zod.string().describe('汎用マスタアイテムのUUIDまたはコード')
})

