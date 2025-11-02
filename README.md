<p align="center"># Laravel + Next.js Docker Project# Laravel + Next.js Docker プロジェクト

  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">

  <img src="https://raw.githubusercontent.com/vercel/next.js/canary/docs/public/images/next.svg" width="300" alt="Next.js Logo">

</p>

このプロジェクトは、LaravelバックエンドとNext.jsフロントエンドをDockerで構築した現代的なウェブアプリケーションです。Laravel（バックエンド）とNext.js（フロントエンド）を使用したフルスタックアプリケーション

<p align="center">

  <a href="https://github.com/Daichi-Chiba/laravel-nextjs-docker/actions">

    <img src="https://github.com/Daichi-Chiba/laravel-nextjs-docker/workflows/tests/badge.svg" alt="Build Status">

  </a>## プロジェクト構成## セットアップ

  <a href="https://opensource.org/licenses/MIT">

    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">

  </a>

  <a href="https://www.php.net">```### 1. 環境の起動

    <img src="https://img.shields.io/badge/PHP-8.2%2B-purple.svg" alt="PHP Version">

  </a>laravel-nextjs-docker/

  <a href="https://nodejs.org">

    <img src="https://img.shields.io/badge/Node.js-18%2B-green.svg" alt="Node.js Version">├── backend/          # Laravel バックエンド```bash

  </a>

</p>├── frontend/         # Next.js フロントエンドdocker compose up -d



<h1 align="center">Laravel + Next.js Docker Project</h1>└── docker-compose.yml```



<p align="center">```

  モダンなウェブアプリケーション開発のためのLaravelバックエンド + Next.jsフロントエンドのDockerベース開発環境

</p>これで以下のサービスが起動します：



## 📑 目次## 環境構築- **Frontend**: http://localhost:3000



- [📋 概要](#-概要)- **Backend**: http://localhost:8000

- [🚀 環境構築](#-環境構築)

- [💻 開発環境](#-開発環境)### 必要要件- **Database**: MySQL 8.0 (ポート: 3306)

- [🧪 テストガイド](#-テストガイド)

- [📦 デプロイメント](#-デプロイメント)

- [🛠 開発ガイドライン](#-開発ガイドライン)

- [💡 トラブルシューティング](#-トラブルシューティング)- Docker### 2. データベースのマイグレーション

- [📝 ライセンス](#-ライセンス)

- Docker Compose

## 📋 概要

- Node.js (v18以上)```bash

### プロジェクト構成

- PHP 8.2以上docker compose exec backend php artisan migrate

```

laravel-nextjs-docker/```

├── 🗂 backend/          # Laravel バックエンド

├── 🗂 frontend/         # Next.js フロントエンド### セットアップ手順

└── 📄 docker-compose.yml

```### 3. 開発環境でコードを編集



### 主な機能1. リポジトリのクローン:



#### バックエンド (Laravel)```bash- `frontend/src/app/` - Next.js のページ

- 🔐 Laravel Sanctum による認証

- 🎯 RESTful API の実装git clone https://github.com/Daichi-Chiba/laravel-nextjs-docker.git- `backend/app/` - Laravel のアプリケーションコード

- 📊 MySQL データベース統合

- 💾 Redis キャッシュ対応cd laravel-nextjs-docker- 変更は自動で反映されます（ホットリロード）



#### フロントエンド (Next.js)```

- 📱 レスポンシブデザイン

- 🎨 TailwindCSS によるスタイリング## 主な機能

- ✨ TypeScript サポート

- 🔍 ESLint + Prettier による品質管理2. 環境変数の設定:



## 🚀 環境構築```bash### ユーザー認証



### 必要要件# バックエンド



- 🐳 Docker & Docker Composecp backend/.env.example backend/.env- ✅ 会員登録

- 💻 Node.js (v18以上)

- 🔧 PHP 8.2以上- ✅ ログイン



### セットアップ手順# フロントエンド- ✅ パスワードハッシュ化



1. **リポジトリのクローン**cp frontend/.env.example frontend/.env- ✅ JWT トークン認証（Laravel Sanctum）

```bash

git clone https://github.com/Daichi-Chiba/laravel-nextjs-docker.git```

cd laravel-nextjs-docker

```### ページ



2. **環境変数の設定**3. Dockerコンテナの起動:

```bash

# バックエンド```bash- `/` - ホームページ

cp backend/.env.example backend/.env

docker-compose up -d- `/login` - ログインページ

# フロントエンド

cp frontend/.env.example frontend/.env```- `/register` - 会員登録ページ

```

- `/test` - テストページ

3. **Dockerコンテナの起動**

```bash4. バックエンドのセットアップ:- `/test/about` - テスト詳細ページ

docker-compose up -d

``````bash



4. **バックエンドのセットアップ**# コンテナ内で実行## API エンドポイント

```bash

docker-compose exec backend composer installdocker-compose exec backend composer install

docker-compose exec backend php artisan key:generate

docker-compose exec backend php artisan migratedocker-compose exec backend php artisan key:generate### 認証

```

docker-compose exec backend php artisan migrate

5. **フロントエンドのセットアップ**

```bash```- `POST /api/register` - ユーザー登録

cd frontend

npm install- `POST /api/login` - ログイン

npm run dev

```5. フロントエンドのセットアップ:- `POST /api/logout` - ログアウト



## 💻 開発環境```bash- `GET /api/me` - 現在のユーザー情報取得



### バックエンド開発cd frontend



- 🌐 開発サーバー: http://localhost:8000npm install## データベース接続（DBeaver）

- 🔌 API エンドポイント: http://localhost:8000/api

npm run dev

#### 開発コマンド

```詳細は `DBeaver_CONNECTION_GUIDE.md` を参照してください。

```bash

# マイグレーション

docker-compose exec backend php artisan migrate

## 開発環境### 接続情報

# シーディング

docker-compose exec backend php artisan db:seed



# キャッシュクリア### バックエンド (Laravel)```

docker-compose exec backend php artisan cache:clear

```ホスト: localhost



### フロントエンド開発- URL: http://localhost:8000ポート: 3306



- 🌐 開発サーバー: http://localhost:3000- APIエンドポイント: http://localhost:8000/apiデータベース: laravel



#### 開発コマンドユーザー名: root



```bash#### 主な機能パスワード: root

# 開発サーバー起動

npm run dev```



# ビルド- REST API

npm run build

- データベース: MySQL## 便利なコマンド

# 本番モード起動

npm run start- キャッシュ: Redis

```

- 認証: Laravel Sanctum```bash

## 🧪 テストガイド

# 全サービスを起動

### バックエンドテスト

#### 開発コマンドnpm run dev

#### テスト実行コマンド



```bash

# すべてのテストを実行```bash# ログを確認

docker-compose exec backend php artisan test

# マイグレーションnpm run logs

# 特定のテストファイルを実行

docker-compose exec backend php artisan test tests/Feature/UserTest.phpdocker-compose exec backend php artisan migrate



# 特定のテストメソッドを実行# サービスを停止

docker-compose exec backend php artisan test --filter test_method_name

```# シーディングnpm run stop



#### テストの種類docker-compose exec backend php artisan db:seed



1. **Unitテスト** (`tests/Unit/`)# サービスを再起動

   - 個別のクラスや関数のテスト

   - データベースに依存しない# キャッシュクリアnpm run restart

   - 高速な実行

docker-compose exec backend php artisan cache:clear

2. **Featureテスト** (`tests/Feature/`)

   - エンドポイントの統合テスト```# データベースマイグレーション

   - データベース操作を含む

   - 複数コンポーネントの連携テストdocker compose exec backend php artisan migrate



#### テストの自動生成### フロントエンド (Next.js)



```bash# データベースリセット

# モデルのテストを生成（FeatureとUnit）

php artisan make:model ModelName- URL: http://localhost:3000docker compose exec backend php artisan migrate:fresh



# コントローラーのテストを生成（Feature）```

php artisan make:controller ControllerName

#### 主な機能

# その他のコンポーネントテスト

php artisan make:test TestName --unit  # Unitテスト## テクノロジースタック

php artisan make:test TestName        # Featureテスト

```- TypeScript



### フロントエンドテスト- ESLint- **Frontend**: Next.js 16, React 19, TypeScript



```bash- Prettier- **Backend**: Laravel 11, PHP 8.2

# すべてのテストを実行

npm run test- TailwindCSS- **Database**: MySQL 8.0



# テストの監視モード- **Authentication**: Laravel Sanctum

npm run test:watch

#### 開発コマンド

# カバレッジレポート生成

npm run test:coverage## 開発時の注意点

```

```bash

## 📦 デプロイメント

# 開発サーバー起動1. フロントエンドは `http://localhost:3000` で起動

### 本番環境の要件

cd frontend2. バックエンドAPIは `http://localhost:8000/api` で利用可能

- 🔧 PHP 8.2以上

- 💻 Node.js 18以上npm run dev3. 開発サーバーは自動でホットリロードされます

- 📊 MySQL 8.0以上

- 💾 Redis (オプション)4. データベースは Docker ボリュームで永続化されています



### デプロイ手順# ビルド



1. **バックエンドのデプロイ**npm run build## トラブルシューティング

```bash

cd backend

composer install --optimize-autoloader --no-dev

php artisan config:cache# 本番モード起動### ポートが使用中

php artisan route:cache

php artisan view:cachenpm run start

```

``````bash

2. **フロントエンドのデプロイ**

```bashdocker compose down

cd frontend

npm install## テストdocker compose up -d

npm run build

``````



## 🛠 開発ガイドライン### バックエンドテスト



### コーディング規約### データベースに接続できない



- 📝 PSR-12（PHP）詳細なテストガイドは[TESTING.md](backend/TESTING.md)を参照してください。

- 🎨 Prettier（JavaScript/TypeScript）

- ✨ ESLint設定準拠```bash



### Git運用ルール```bashdocker compose logs db



#### ブランチ戦略# すべてのテストを実行docker compose restart db



- `master`: 本番環境用docker-compose exec backend php artisan test```

- `develop`: 開発環境用

- `feature/*`: 機能開発用

- `hotfix/*`: 緊急バグ修正用

# 特定のテストを実行### フロントエンドが起動しない

#### コミットメッセージ規約

docker-compose exec backend php artisan test --filter TestName

```

type: 概要``````bash



詳細な説明docker compose logs frontend

```

### フロントエンドテストdocker compose restart frontend

**type の種類**:

- `feat`: 新機能```

- `fix`: バグ修正

- `docs`: ドキュメント更新```bash

- `style`: コードスタイル修正

- `refactor`: リファクタリングcd frontend## ライセンス

- `test`: テストコード修正

- `chore`: ビルド・補助ツール更新npm run test



## 💡 トラブルシューティング```MIT



### よくある問題と解決方法



#### 1. Dockerコンテナの問題## デプロイメント

```bash

# ログの確認### 本番環境の要件

docker-compose logs

- PHP 8.2以上

# コンテナの再起動- Node.js 18以上

docker-compose down- MySQL 8.0以上

docker-compose up -d- Redis (オプション)

```

### デプロイ手順

#### 2. データベース接続エラー

```bash1. バックエンドのデプロイ:

# DBの状態確認```bash

docker-compose exec db mysql -u root -pcd backend

```composer install --optimize-autoloader --no-dev

php artisan config:cache

#### 3. キャッシュの問題php artisan route:cache

```bashphp artisan view:cache

# バックエンド```

docker-compose exec backend php artisan cache:clear

docker-compose exec backend php artisan config:clear2. フロントエンドのデプロイ:

```bash

# フロントエンドcd frontend

cd frontendnpm install

rm -rf .nextnpm run build

``````



## 📝 ライセンス## データベース接続



本プロジェクトは[MIT license](https://opensource.org/licenses/MIT)の下で公開されています。データベース接続の詳細については、[DBeaver_CONNECTION_GUIDE.md](DBeaver_CONNECTION_GUIDE.md)を参照してください。

## 開発ガイドライン

### コーディング規約

- PSR-12（PHP）
- Prettier（JavaScript/TypeScript）
- ESLint設定に従うこと

### ブランチ戦略

- `master`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発
- `hotfix/*`: 緊急バグ修正

### コミットメッセージ

以下の形式に従ってください：
```
type: 概要

詳細な説明
```

type:
- feat: 新機能
- fix: バグ修正
- docs: ドキュメントのみの変更
- style: コードの動作に影響しない変更（空白、フォーマット等）
- refactor: リファクタリング
- test: テストコードの追加・修正
- chore: ビルドプロセスやツールの変更

## トラブルシューティング

### よくある問題と解決方法

1. コンテナが起動しない場合:
```bash
# ログの確認
docker-compose logs

# コンテナの再起動
docker-compose down
docker-compose up -d
```

2. データベース接続エラー:
```bash
# データベースの状態確認
docker-compose exec db mysql -u root -p
```

3. キャッシュ関連の問題:
```bash
# バックエンドキャッシュクリア
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear

# フロントエンドキャッシュクリア
cd frontend
rm -rf .next
```

## ライセンス

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).