# Kickflow MCP Server

Kickflow APIをModel Context Protocol (MCP)経由で利用するためのサーバーです。

## 機能

このMCPサーバーは、Kickflow APIを利用して以下の機能を提供します：

- `get_tickets`: チケットの一覧を取得
- `get_ticket`: 特定のチケットの取得

## 必要条件

- Node.js 18以上
- Kickflow アクセストークン

## インストール

### npx経由でのインストール（推奨）

```bash
npx kickflow-mcp-server --kickflow-access-token="your-kickflow-access-token"
```

### グローバルインストール

```bash
npm install -g kickflow-mcp-server
```

使用時：

```bash
KICKFLOW_ACCESS_TOKEN="your-kickflow-access-token" kickflow-mcp-server
```

### 開発者向けセットアップ

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

Kickflow アクセストークンを環境変数に設定します：

```bash
export KICKFLOW_ACCESS_TOKEN="your-kickflow-access-token"
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
      "command": "npx",
      "args": ["kickflow-mcp-server"],
      "env": {
        "KICKFLOW_ACCESS_TOKEN": "your-kickflow-access-token"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

または、引数でアクセストークンを渡す場合：

```json
{
  "mcpServers": {
    "kickflow": {
      "command": "npx",
      "args": ["kickflow-mcp-server", "--kickflow-access-token=your-kickflow-access-token"],
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
