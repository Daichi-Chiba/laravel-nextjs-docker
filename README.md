# Laravel + Next.js Docker プロジェクト

Laravel（バックエンド）とNext.js（フロントエンド）を使用したフルスタックアプリケーション

## セットアップ

### 1. 環境の起動

```bash
docker compose up -d
```

これで以下のサービスが起動します：
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Database**: MySQL 8.0 (ポート: 3306)

### 2. データベースのマイグレーション

```bash
docker compose exec backend php artisan migrate
```

### 3. 開発環境でコードを編集

- `frontend/src/app/` - Next.js のページ
- `backend/app/` - Laravel のアプリケーションコード
- 変更は自動で反映されます（ホットリロード）

## 主な機能

### ユーザー認証

- ✅ 会員登録
- ✅ ログイン
- ✅ パスワードハッシュ化
- ✅ JWT トークン認証（Laravel Sanctum）

### ページ

- `/` - ホームページ
- `/login` - ログインページ
- `/register` - 会員登録ページ
- `/test` - テストページ
- `/test/about` - テスト詳細ページ

## API エンドポイント

### 認証

- `POST /api/register` - ユーザー登録
- `POST /api/login` - ログイン
- `POST /api/logout` - ログアウト
- `GET /api/me` - 現在のユーザー情報取得

## データベース接続（DBeaver）

詳細は `DBeaver_CONNECTION_GUIDE.md` を参照してください。

### 接続情報

```
ホスト: localhost
ポート: 3306
データベース: laravel
ユーザー名: root
パスワード: root
```

## 便利なコマンド

```bash
# 全サービスを起動
npm run dev

# ログを確認
npm run logs

# サービスを停止
npm run stop

# サービスを再起動
npm run restart

# データベースマイグレーション
docker compose exec backend php artisan migrate

# データベースリセット
docker compose exec backend php artisan migrate:fresh
```

## テクノロジースタック

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Laravel 11, PHP 8.2
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum

## 開発時の注意点

1. フロントエンドは `http://localhost:3000` で起動
2. バックエンドAPIは `http://localhost:8000/api` で利用可能
3. 開発サーバーは自動でホットリロードされます
4. データベースは Docker ボリュームで永続化されています

## トラブルシューティング

### ポートが使用中

```bash
docker compose down
docker compose up -d
```

### データベースに接続できない

```bash
docker compose logs db
docker compose restart db
```

### フロントエンドが起動しない

```bash
docker compose logs frontend
docker compose restart frontend
```

## ライセンス

MIT

