# CLAUDE.md

- このファイルは、Claude Codeがkickflow-mcp-serverプロジェクトの開発において守るべきルールとガイドラインを提供します。
以下の内容に従って、プロジェクトの一貫性と品質を保つようにしてください。
- ユーザーの質問に対する回答には、常に日本語で回答してください。

## コーディングガイド

### 基本ルール

- 余計なコメントは書かないでください。

### アーキテクチャ

このMCPサーバーは、3つの汎用ツール（`discover_apis`、`get_api_info`、`call_api`）を提供し、kickflow APIの全機能に動的にアクセスできるようになっています。

#### 主要ファイル

- `src/kickflow-api/tools/discover-apis.ts` - API一覧を返すツール
- `src/kickflow-api/tools/get-api-info.ts` - API仕様をJSON Schemaで返すツール
- `src/kickflow-api/tools/call-api.ts` - APIを動的に実行するツール

#### 自動生成ファイル（編集禁止）

- `src/kickflow-api/generated/api-definitions.ts` - OpenAPIスキーマから生成されたAPI定義（operationId、summary、pathParams）
- `src/kickflow-api/generated/zod-schemas.ts` - 全カテゴリのZodスキーマを集約したインデックス
- `src/kickflow-api/generated/kickflowRESTAPIV1.ts` - Orvalで生成したAPIクライアント
- `src/kickflow-api/generated/[カテゴリ]/` - カテゴリ別のZodスキーマ

#### ユーティリティ

- `src/kickflow-api/schema-registry.ts` - operationIdからZodスキーマを動的に検索
- `src/kickflow-api/special-handlers.ts` - 特殊なAPI（ファイルアップロードなど）のハンドラ

### 特殊ハンドラの追加

ファイルアップロードなど、標準的なAPI呼び出しでは対応できないAPIは、`special-handlers.ts`にハンドラを追加します。

```ts
export const specialHandlers: Record<string, SpecialHandler> = {
  uploadFile: {
    schema: z.object({
      filePath: z.string().describe('アップロードするファイルのローカルパス'),
    }),
    handler: async (api, params) => {
      // 特殊な処理を実装
    },
  },
}
```

### APIクライアントの更新

```bash
# スキーマを最新化してAPIクライアントを再生成
npm run update-schema
npm run generate-api
```

`generate-api`実行時に`scripts/orval-hook.js`が自動的に`api-definitions.ts`と`zod-schemas.ts`を生成します。

## Git操作

- GitやGitHubの操作には、CLIを使用してください。
- 新たにブランチを作成するときは必ず `main` ブランチから別のブランチを切って作業を行ってください。
- `main` ブランチに対して直接コミット、プッシュは禁止です。

## Pull Request作成ルール

**IMPORTANT**: Pull Requestの作成には、必ずユーザーの明示的な指示が必要です。

- **勝手にPRを作成してはいけません**。コミット完了後、自動的にPRを作成することは絶対に禁止です。
- PRを作成する前に、必ずユーザーに「PRを作成しますか？」と確認してください。
- ユーザーから `/create-pr` コマンドなどの明示的な指示があった場合のみ、PRを作成してください。

