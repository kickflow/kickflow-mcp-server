# CLAUDE.md

- このファイルは、Claude Codeがkickflow-mcp-serverプロジェクトの開発において守るべきルールとガイドラインを提供します。
以下の内容に従って、プロジェクトの一貫性と品質を保つようにしてください。
- ユーザーの質問に対する回答には、常に日本語で回答してください。

## コーディングガイド

### 基本ルール

- 余計なコメントは書かないでください。

### APIクライアントの使い方

- src/kickflow-api/generated 以下に、Orvalで生成したAPIクライアントのコードがあります。
- APIが存在するかどうかは、src/kickflow-api/generated/kickflowRESTAPIV1.tsを見てください。
- src/kickflow-api/generated/[タグ] 以下には、リクエストボディやクエリパラメータの検証用のzodスキーマが定義されています。すべてのAPIについてzodスキーマが存在するわけではなので、APIの存在確認には使用しないでください。

### ツールの実装

- ツールはすべて以下のような書き方で統一して実装してください。

```ts
import { Tool } from '../../../types.js'
import { listCategoriesQueryParams } from '../../generated/category/category.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const listCategoriesTool: Tool = {
  name: 'list_categories',
  description: 'カテゴリの一覧を取得します',
  paramsSchema: listCategoriesQueryParams.shape,
  cb: createApiToolCallback(listCategoriesQueryParams, (api, validatedArgs) =>
    api.listCategories(validatedArgs),
  ),
}
export default listCategoriesTool
```

- パスパラメータはzodに定義がないので、以下のように自分で定義してください。

```ts
import { z } from 'zod'
import { Tool } from '../../../types.js'
import { updateCategoryBody } from '../../generated/category/category.zod.js'
import { createApiToolCallback } from '../../tool-utils.js'

const paramsSchema = z.object({
  categoryId: z.string().uuid().describe('更新するカテゴリのID'),
  ...updateCategoryBody.shape,
})

const updateCategoryTool: Tool = {
  name: 'update_category',
  description: '指定されたIDのカテゴリを更新します',
  paramsSchema: paramsSchema.shape,
  cb: createApiToolCallback(paramsSchema, (api, validatedArgs) => {
    const { categoryId, ...updateData } = validatedArgs
    return api.updateCategory(categoryId, updateData)
  }),
}
export default updateCategoryTool
```

## Git操作

- GitやGitHubの操作には、CLIを使用してください。
- 新たにブランチを作成するときは必ず `main` ブランチから別のブランチを切って作業を行ってください。
- `main` ブランチに対して直接コミット、プッシュは禁止です。

## Pull Request作成ルール

**IMPORTANT**: Pull Requestの作成には、必ずユーザーの明示的な指示が必要です。

- **勝手にPRを作成してはいけません**。コミット完了後、自動的にPRを作成することは絶対に禁止です。
- PRを作成する前に、必ずユーザーに「PRを作成しますか？」と確認してください。
- ユーザーから `/create-pr` コマンドなどの明示的な指示があった場合のみ、PRを作成してください。

