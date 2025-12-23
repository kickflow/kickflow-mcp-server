# kickflow MCP Server

[kickflow API](https://developer.kickflow.com/) をModel Context Protocol (MCP)経由で利用するためのサーバーです。

---

## ユーザー向け

### 必要条件

- Node.js 22以上
- kickflow アクセストークン
  - [アクセストークンの取得方法](https://support.kickflow.com/hc/ja/articles/360047613534)

### インストール

MCPクライアント（Claude Desktop, Cursor, Clineなど）の構成ファイル (`claude_desktop_config.json` など) に、以下のような記述を追加してください。
`KICKFLOW_ACCESS_TOKEN` には、取得したアクセストークンを設定してください。

#### MacOS/Linux

```json
{
  "mcpServers": {
    "kickflow": {
      "command": "npx",
      "args": ["-y", "@kickflow/mcp-server"],
      "env": {
        "KICKFLOW_ACCESS_TOKEN": "your-kickflow-access-token"
      }
    }
  }
}
```

#### Windows

```json
{
  "mcpServers": {
    "kickflow": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@kickflow/mcp-server"],
      "env": {
        "KICKFLOW_ACCESS_TOKEN": "your-kickflow-access-token"
      }
    }
  }
}
```

### 機能一覧

このMCPサーバーは3つの汎用ツールを提供し、kickflow APIのすべての機能にアクセスできます。

#### discover_apis

利用可能なKickflow APIの一覧を表示します。`get_api_info`、`call_api`で使用する`operationId`を確認できます。

#### get_api_info

指定した`operationId`のAPI情報をJSON Schemaで取得します。`call_api`を呼ぶ前に必要なパラメータを確認できます。

#### call_api

Kickflow APIを実行します。`operationId`、`pathParams`、`queryParams`、`requestBody`をそれぞれ個別に指定してAPIを呼び出します。

### 使用例

#### 1. discover_apis でAPIの一覧を確認

結果例:
```
listCategories: カテゴリの一覧を取得
createCategory: カテゴリを作成
getTicket: チケットを取得
...
```

#### 2. get_api_info で必要なパラメータを確認

入力例:
```json
{
  "operationId": "getTicket"
}
```

結果例:
```json
{
  "pathParams": {
    "type": "object",
    "properties": {
      "ticketId": { "type": "string", "format": "uuid" }
    },
    "required": ["ticketId"]
  }
}
```

#### 3. call_api でAPIを実行

パラメータなしの例:
```json
{
  "operationId": "listCategories"
}
```

パスパラメータありの例:
```json
{
  "operationId": "getTicket",
  "pathParams": {
    "ticketId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

クエリパラメータありの例:
```json
{
  "operationId": "listTickets",
  "queryParams": {
    "page": 1,
    "perPage": 25
  }
}
```

リクエストボディありの例:
```json
{
  "operationId": "createCategory",
  "requestBody": {
    "name": "新しいカテゴリ"
  }
}
```

---

## 開発者向け

### セットアップ

1.  リポジトリをクローン:
    ```bash
    git clone [リポジトリURL]
    cd kickflow-mcp-server
    ```
2.  依存パッケージのインストール:
    ```bash
    npm install
    ```
3.  ビルド:
    ```bash
    npm run build
    ```

### 開発

#### 開発サーバーの実行

変更を監視し、自動的に再ビルドしてサーバーを再起動します。

```bash
npm run dev
```

_(開発時も `KICKFLOW_ACCESS_TOKEN` 環境変数の設定が必要です)_

#### テストの実行

```bash
# ユニットテストを実行
npm run test

# ウォッチモードでテストを実行（ファイル変更時に自動再実行）
npm run test:watch

# MCP Inspector でサーバーをデバッグ
npm run test:inspector
```

#### Lint と型チェック

```bash
# ESLint によるコードチェック
npm run lint

# TypeScript の型チェック
npm run typecheck
```

#### OpenAPI型定義の更新

kickflow APIのスキーマから TypeScript の型定義を更新するには:

```bash
# 公開されている最新版のスキーマを取得
npm run update-schema

# Orvalを使って型定義を生成
npm run generate-api
```

---

## ライセンス

MIT
