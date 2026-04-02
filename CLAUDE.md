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

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp build`.

## Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## CI Integration

For GitHub Actions, consider using [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) to replace separate `actions/setup-node`, package-manager setup, cache, and install steps with a single action.

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    cache: true
- run: vp check
- run: vp test
```

## Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->
