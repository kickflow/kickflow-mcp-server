# kickflow MCP Server

[kickflow API](https://developer.kickflow.com/) をModel Context Protocol (MCP)経由で利用するためのサーバーです。

## 機能

このMCPサーバーは、kickflow APIを利用して以下の機能を提供します：

- `list_tickets`: チケットの一覧を取得
- `get_ticket`: 特定のチケットの取得

---

## ユーザー向け

### 必要条件

- Node.js 18以上
- kickflow アクセストークン
  - [アクセストークンの取得方法](https://support.kickflow.com/hc/ja/articles/360047613534)

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

kickflow アクセストークンを環境変数に設定します：

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

このMCPサーバーは以下のツールをカテゴリ別に提供します:

#### Audit Logs

- `list_audit_logs`: 監査ログの一覧を取得します。

#### Categories

- `list_categories`: カテゴリの一覧を取得します
- `create_category`: カテゴリを作成します
- `delete_category`: カテゴリを削除します
- `update_category`: カテゴリを更新します

#### Comments

- `list_comments`: チケットのコメント一覧を取得します
- `create_comment`: チケットにコメントを投稿します
- `get_comment`: チケットのコメントを取得します
- `update_comment`: チケットのコメントを更新します
- `delete_comment`: チケットのコメントを削除します

#### Folders

- `list_folders`: フォルダの一覧を取得します
- `create_folder`: フォルダを作成します
- `delete_folder`: フォルダを削除します
- `update_folder`: フォルダを更新します
- `get_folder`: フォルダを一件取得します

#### General Master Items

- `list_general_master_items`: 汎用マスタアイテムの一覧を取得します
- `create_general_master_item`: 汎用マスタアイテムを作成します
- `get_general_master_item`: 汎用マスタアイテムを一件取得します
- `update_general_master_item`: 汎用マスタアイテムを更新します
- `delete_general_master_item`: 汎用マスタアイテムを削除します

#### General Masters

- `list_general_masters`: 汎用マスタの一覧を取得します
- `create_general_master`: 汎用マスタを作成します
- `get_general_master`: 汎用マスタを一件取得します
- `update_general_master`: 汎用マスタを更新します
- `delete_general_master`: 汎用マスタを削除します

#### Grades

- `list_grades`: 役職の一覧を取得します
- `create_grade`: 役職を作成します
- `get_grade`: 役職を一件取得します
- `delete_grade`: 役職を削除します
- `update_grade`: 役職を更新します
- `set_default_grade`: 指定した役職をデフォルトにします

#### Organization Charts

- `list_organization_charts`: 組織図の一覧を取得します
- `create_organization_chart`: 組織図を作成します
- `delete_organization_chart`: 組織図を削除します
- `get_organization_chart`: 組織図を一件取得します
- `update_organization_chart`: 組織図を更新します
- `get_current_organization_chart`: 現在有効になっている組織図を取得します
- `activate_organization_chart`: 指定した組織図を有効化します

#### Proxy Applicants

- `list_proxy_applicants`: 代理申請の一覧を取得します
- `create_proxy_applicant`: 代理申請を作成します
- `delete_proxy_applicant`: 指定した代理申請を削除します

#### Proxy Approvers

- `list_proxy_approvers`: 代理承認の一覧を取得します
- `create_proxy_approver`: 代理承認を作成します
- `delete_proxy_approver`: 指定した代理承認を削除します

#### Roles

- `list_roles`: 管理者ロールの一覧を取得します
- `create_role`: 管理者ロールを作成します
- `get_role`: 管理者ロールを一件取得します
- `update_role`: 管理者ロールを更新します
- `delete_role`: 管理者ロールを削除します
- `create_role_members`: 管理者ロールにメンバーを追加します
- `list_role_members`: 管理者ロールのメンバー一覧を取得します
- `delete_role_member`: 管理者ロールからメンバーを削除します

#### Routes

- `list_routes`: 経路の一覧を取得します
- `get_route`: 指定した経路を取得します

#### Teams

- `list_teams`: 指定した組織図内のチーム一覧を取得します
- `create_team`: 指定した組織図内にチームを作成します
- `get_team`: チームを一件取得します
- `update_team`: チームを編集します
- `delete_team`: チームを削除します
- `list_team_members`: チームのメンバー一覧を取得します
- `create_team_members`: 指定したチームにメンバーを追加します
- `delete_team_members`: 指定したチームからメンバーを削除します
- `update_team_member`: チームのメンバーを更新します

#### Ticket Links

- `list_ticket_links`: 指定したチケットの関連チケットを取得します

#### Tickets

- `get_ticket`: 指定したチケットの詳細情報を取得します
- `list_tickets`: チケットの一覧を取得します
- `approve_ticket`: チケットを承認または確認します
- `reject_ticket`: チケットを差し戻します
- `deny_ticket`: チケットを却下します
- `withdraw_ticket`: 自分が作成したチケットを取り下げます
- `archive_ticket`: チケットをアーカイブします
- `list_tasks`: 承認リクエスト一覧を取得します

#### Users

- `get_current_user`: 現在のユーザーを取得します
- `list_users`: ユーザー一覧を取得します
- `create_user`: ユーザーを作成（招待）します
- `get_user`: ユーザーを一件取得します
- `delete_user`: ユーザーを削除します
- `update_user`: ユーザーを更新します
- `lookup_user_by_email`: メールアドレスからユーザーを取得します
- `reinvite_user`: 削除されたユーザーを再び招待します
- `suspend_user`: 有効なユーザーを一時停止します
- `reactivate_user`: 一時停止中のユーザーを有効化します
- `list_user_teams`: ユーザーの所属チーム一覧を取得します
- `list_user_roles`: ユーザーの管理者ロール一覧を取得します

#### Viewers

- `list_viewers`: チケットの共有ユーザー一覧を取得します
- `create_viewer`: チケットに共有ユーザーを追加します
- `delete_viewer`: チケットの共有ユーザーを削除します

#### Workflows

- `list_workflows`: ワークフローの一覧を取得します
- `get_workflow`: 指定したワークフローを取得します

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
