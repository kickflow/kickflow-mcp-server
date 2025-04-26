# Kickflow MCP Server

Kickflow APIをModel Context Protocol (MCP)経由で利用するためのサーバーです。

## 機能

このMCPサーバーは、Kickflow APIを利用して以下の機能を提供します：

- `search_tickets`: チケットの検索
- `get_ticket`: 特定のチケットの取得

## 必要条件

- Node.js 18以上
- Kickflow APIトークン

## セットアップ

1. リポジトリをクローン
```
git clone [リポジトリURL]
cd kickflow-mcp-server
```

2. 依存パッケージのインストール
```
npm install
```

3. ビルド
```
npm run build
```

## 使い方

### 環境変数の設定

Kickflow APIトークンを環境変数に設定します：

```bash
export KICKFLOW_API_TOKEN="your-kickflow-api-token"
```

### サーバーの実行

```bash
npm start
```

または

```bash
node dist/index.js
```

### MCP設定ファイルへの追加

MCP設定ファイルに以下のような記述を追加します：

```json
{
  "mcpServers": {
    "kickflow": {
      "command": "node",
      "args": ["/path/to/kickflow-mcp-server/dist/index.js"],
      "env": {
        "KICKFLOW_API_TOKEN": "your-kickflow-api-token"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## ツールの使用例

### チケットの検索

```json
{
  "status": "in_progress",
  "page": 1,
  "perPage": 10
}
```

### 特定のチケットの取得

```json
{
  "ticketId": "your-ticket-uuid"
}
```

## 開発

### 開発サーバーの実行

```bash
npm run dev
```

### OpenAPI型定義の更新

Kickflow APIのスキーマから TypeScript の型定義を更新するには:

```bash
npm run generate-types
```

## ライセンス

MIT
