# Kickflow MCP Server

Kickflow APIをModel Context Protocol (MCP)経由で利用するためのサーバーです。

## 機能

このMCPサーバーは、Kickflow APIを利用して以下の機能を提供します：

- `get_tickets`: チケットの一覧を取得
- `get_ticket`: 特定のチケットの取得

---

## ユーザー向け

### 必要条件

- Node.js 18以上
- Kickflow アクセストークン

### インストール

#### npx経由でのインストール（推奨）

```bash
npx kickflow-mcp-server --kickflow-access-token="your-kickflow-access-token"
```

#### ソースコードからインストール

1.  リポジトリをクローン:
    ```bash
    git clone https://github.com/kickflow/kickflow-mcp-server.git
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

### 使い方

#### 環境変数の設定

Kickflow アクセストークンを環境変数に設定します：

```bash
export KICKFLOW_ACCESS_TOKEN="your-kickflow-access-token"
```

#### サーバーの実行

npx経由でインストールした場合、インストールコマンドがそのままサーバー実行コマンドになります。

ソースコードからインストールした場合：
プロジェクトディレクトリ内で以下のコマンドを実行します。

```bash
npm start
```

または

```bash
node dist/index.js
```

_(環境変数 `KICKFLOW_ACCESS_TOKEN` が設定されている必要があります)_

#### MCP設定ファイルへの追加

MCP設定ファイル (`claude_desktop_config.json` など) に以下のような記述を追加します：

**環境変数でトークンを設定する場合:**

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

**引数でトークンを渡す場合:**

```json
{
  "mcpServers": {
    "kickflow": {
      "command": "npx",
      "args": [
        "kickflow-mcp-server",
        "--kickflow-access-token=your-kickflow-access-token"
      ],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### ツール

#### get_tickets

- チケットの一覧を取得します。
  - `page`: ページ番号 (デフォルト: 1)
  - `perPage`: 1ページあたりのチケット数 (デフォルト: 25)

#### get_ticket

- 特定のチケットを取得します。
  - `ticketId`: チケットのID（必須）

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

#### OpenAPI型定義の更新

Kickflow APIのスキーマから TypeScript の型定義を更新するには:

```bash
npm run generate-api
```

---

## ライセンス

MIT
