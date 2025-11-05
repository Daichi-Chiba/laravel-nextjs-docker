# Tech Stack Overflow (T.S.O) 実装ガイド

## 📋 実装内容

このドキュメントは、T.S.O統合仕様書に基づいた実装内容と、セットアップ手順を記載しています。

---

## 🎯 実装完了機能

### バックエンド (Laravel)

#### 1. データベース設計

新しく追加されたテーブル:

- **votes** - 投票機能（Upvote/Downvote）
- **comments** - コメント機能
- **bookmarks** - ブックマーク機能
- **follows** - フォロー・フォロワー機能
- **notifications** - 通知機能
- **ranks** - ユーザーランクシステム
- **badges** / **user_badges** - バッジシステム
- **tag_subscriptions** - タグ購読機能

#### 2. モデルとリレーションシップ

実装済みモデル:
- `Vote` - ポリモーフィック関係でPostとAnswerに投票
- `Comment` - ポリモーフィック関係でPostとAnswerにコメント
- `Bookmark` - ポリモーフィック関係でPostとAnswerをブックマーク
- `Notification` - ユーザーへの通知
- `Rank` - ユーザーランク（Beginner, Contributor, Expert, Guru）
- `Badge` - バッジ（技術スタック別、実績別）

#### 3. API エンドポイント

**質問 (Posts)**
- `GET /api/posts` - 質問一覧（検索、フィルター、ソート対応）
- `GET /api/posts/{slug}` - 質問詳細
- `POST /api/posts` - 質問投稿（認証必須）
- `PUT /api/posts/{post}` - 質問更新（認証必須）
- `DELETE /api/posts/{post}` - 質問削除（認証必須）

**回答 (Answers)**
- `POST /api/posts/{post}/answers` - 回答投稿
- `PUT /api/answers/{answer}` - 回答更新
- `DELETE /api/answers/{answer}` - 回答削除
- `POST /api/answers/{answer}/best` - ベストアンサー設定

**投票 (Votes)**
- `POST /api/votes` - 投票（Upvote/Downvote）
- `GET /api/votes/{type}/{id}` - 投票状態取得

**コメント (Comments)**
- `GET /api/comments/{type}/{id}` - コメント一覧
- `POST /api/comments` - コメント投稿
- `DELETE /api/comments/{comment}` - コメント削除

**ブックマーク (Bookmarks)**
- `GET /api/bookmarks` - ブックマーク一覧
- `POST /api/bookmarks/toggle` - ブックマーク追加/削除
- `GET /api/bookmarks/{type}/{id}` - ブックマーク状態確認

**フォロー (Follows)**
- `POST /api/users/{user}/follow` - ユーザーフォロー
- `DELETE /api/users/{user}/follow` - フォロー解除
- `GET /api/users/{user}/followers` - フォロワー一覧
- `GET /api/users/{user}/following` - フォロー中一覧
- `GET /api/users/{user}/follow/check` - フォロー状態確認

### フロントエンド (Next.js 16)

#### 1. 質問一覧ページ (`/questions`)
- **ISR対応**: 60秒ごとに再検証
- ソート機能（Latest, Popular, Most Voted, Unanswered）
- タグフィルター
- ページネーション

#### 2. 質問詳細ページ (`/questions/[slug]`)
- **SSR対応**: リアルタイムデータ取得
- Markdown表示対応
- 回答一覧表示（ベストアンサー優先表示）
- 投票UI（未認証時は無効化）
- ユーザーランク・バッジ表示

---

## 🚀 セットアップ手順

### 1. データベースのマイグレーション

```bash
# バックエンドコンテナに入る
docker compose exec backend bash

# マイグレーションを実行
php artisan migrate

# ランクとバッジのシードデータを投入
php artisan db:seed --class=RankSeeder
php artisan db:seed --class=BadgeSeeder
```

### 2. 環境変数の設定

#### フロントエンド (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

#### バックエンド (`.env`)

既存の設定に加えて、必要に応じて以下を確認:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root
```

### 3. サービスの起動

```bash
# すべてのサービスを起動
docker compose up -d

# ログを確認
docker compose logs -f
```

---

## 📊 データベース構造

### 主要テーブル

#### users
- `id`, `name`, `email`, `password`
- `github_id` - GitHubアカウント連携
- `rank_id` - ランクID（外部キー）
- `points` - ポイント数

#### posts
- `id`, `user_id`, `title`, `content`, `slug`
- `views_count` - 閲覧数
- `votes_count` - 投票数

#### answers
- `id`, `user_id`, `post_id`, `content`
- `is_best` - ベストアンサーフラグ
- `votes_count` - 投票数

#### votes
- `id`, `user_id`, `votable_type`, `votable_id`
- `value` - 投票値（1: Upvote, -1: Downvote）

#### ranks
- `id`, `name`, `min_points`, `color`, `icon`

#### badges
- `id`, `name`, `description`, `category`, `icon`, `color`

---

## 🎨 UI/UX 特徴

### デザイン原則

1. **モダンなカードベースUI** - 質問・回答をカード形式で表示
2. **レスポンシブデザイン** - PC、タブレット、スマホ対応
3. **視覚的なフィードバック** - ホバーエフェクト、トランジション
4. **色分けされた情報** - ランク、バッジ、投票数を色で区別

### カラーパレット

- **Primary**: `#0070f3` (リンク、ボタン)
- **Success**: `#0e7c3d` (ベストアンサー、承認アクション)
- **Tag**: `#e1ecf7` / `#0969da` (タグ背景/文字)

---

## 🔜 次の実装ステップ

### 優先度: 高

1. **認証済みユーザー向け機能**
   - 回答投稿フォーム
   - リアルタイム投票機能
   - ブックマーク機能

2. **インタラクティブ機能**
   - コメント表示・投稿
   - フォロー/フォロワー機能
   - パーソナライズドフィード

### 優先度: 中

3. **ゲーミフィケーション**
   - ポイント自動計算ロジック
   - ランク自動昇格システム
   - バッジ自動授与システム

4. **通知機能**
   - リアルタイム通知（WebSocket）
   - 通知一覧ページ
   - メール通知

### 優先度: 低

5. **高度な機能**
   - AI自動タグ提案
   - AI質問要約
   - 検索機能の強化（Elasticsearch等）
   - ダークモード
   - 国際化 (i18n)

---

## 🧪 テスト

### バックエンド

```bash
# PHPUnitテスト実行
docker compose exec backend php artisan test
```

### フロントエンド

```bash
# Jestテスト実行
cd frontend
npm run test
```

---

## 📝 メモ

- Lintエラー（Intelephense）について: `auth()->id()` などのLaravelヘルパー関数は静的解析で誤検出されますが、実行時には正常に動作します。
- Next.js 16のApp Routerを使用しており、Server Componentsによる高速レンダリングを実現しています。
- ISRとSSRを適切に使い分けることで、パフォーマンスとリアルタイム性のバランスを取っています。

---

## 🤝 コントリビューション

新機能の追加やバグ修正は、以下の手順で行ってください:

1. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
2. 変更をコミット (`git commit -m 'feat: Add amazing feature'`)
3. ブランチをプッシュ (`git push origin feature/amazing-feature`)
4. プルリクエストを作成

---

## 📄 ライセンス

MIT License
