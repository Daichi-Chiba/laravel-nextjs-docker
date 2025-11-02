# Laravel テストガイド

このドキュメントでは、プロジェクトのテスト実行方法と設定について説明します。

## 目次

1. [テストの実行方法](#テストの実行方法)
2. [テストの種類](#テストの種類)
3. [テストの自動生成](#テストの自動生成)
4. [テスト環境の設定](#テスト環境の設定)
5. [よくあるテストパターン](#よくあるテストパターン)

## テストの実行方法

### 基本的なテストコマンド

```bash
# すべてのテストを実行
php artisan test

# 特定のテストファイルを実行
php artisan test tests/Feature/UserTest.php

# 特定のテストメソッドを実行
php artisan test --filter test_method_name

# 詳細な出力を表示
php artisan test -v

# テストが失敗したら即座に停止
php artisan test --stop-on-failure

# パラレルでテストを実行
php artisan test --parallel
```

### テストスイートの指定

```bash
# Unitテストのみ実行
php artisan test --testsuite=Unit

# Featureテストのみ実行
php artisan test --testsuite=Feature
```

## テストの種類

1. **Unitテスト** (`tests/Unit/`)
   - 個別のクラスや関数の振る舞いをテスト
   - データベースやその他の外部サービスに依存しない
   - 高速に実行可能

2. **Featureテスト** (`tests/Feature/`)
   - アプリケーションの機能全体をテスト
   - HTTP リクエスト/レスポンスのテスト
   - データベースの操作を含むテスト
   - 複数のコンポーネントの連携をテスト

## テストの自動生成

プロジェクトでは、以下のコマンドを実行すると対応するテストファイルが自動的に生成されます：

```bash
# モデルのテストを生成（FeatureとUnitの両方）
php artisan make:model ModelName

# コントローラーのテストを生成（Feature）
php artisan make:controller ControllerName

# ミドルウェアのテストを生成（Unit）
php artisan make:middleware MiddlewareName

# ジョブのテストを生成（Unit）
php artisan make:job JobName

# フォームリクエストのテストを生成（Unit）
php artisan make:request RequestName

# APIリソースのテストを生成（Unit）
php artisan make:resource ResourceName
```

## テスト環境の設定

### 環境設定

テストは `.env.testing` の設定を使用して実行されます。主な設定項目：

```env
APP_ENV=testing
DB_CONNECTION=sqlite
DB_DATABASE=:memory:
```

### データベース設定

テスト用のデータベース設定は `phpunit.xml` で管理されています：

```xml
<php>
    <env name="DB_CONNECTION" value="sqlite"/>
    <env name="DB_DATABASE" value=":memory:"/>
</php>
```

### テストデータの準備

1. **ファクトリーの使用**
```php
// テストデータの作成
$user = User::factory()->create();
$users = User::factory()->count(3)->create();
```

2. **シーダーの実行**
```bash
php artisan db:seed --class=TestDatabaseSeeder
```

## よくあるテストパターン

### HTTP テスト

```php
// GETリクエストのテスト
$response = $this->get('/api/users');
$response->assertStatus(200);

// POSTリクエストのテスト
$response = $this->post('/api/users', [
    'name' => 'Test User',
    'email' => 'test@example.com'
]);
$response->assertStatus(201);

// 認証が必要なエンドポイントのテスト
$user = User::factory()->create();
$response = $this->actingAs($user)
    ->get('/api/profile');
```

### データベーステスト

```php
// データベースのアサーション
$this->assertDatabaseHas('users', [
    'email' => 'test@example.com'
]);

// データベーストランザクション
use RefreshDatabase;
```

### モック/スタブの使用

```php
// サービスのモック
$this->mock(UserService::class)
    ->shouldReceive('create')
    ->once()
    ->andReturn(new User());

// イベントのアサーション
Event::fake();
// アクションの実行
Event::assertDispatched(UserCreated::class);
```

## トラブルシューティング

1. テストが失敗する場合：
   - エラーメッセージを確認
   - テスト環境の設定を確認
   - データベースのマイグレーションが実行されているか確認

2. テストが遅い場合：
   - パラレルテストの使用を検討
   - データベーストランザクションの使用を確認
   - 不要なシードデータを削除

## 参考リンク

- [Laravel 公式ドキュメント - テスト](https://laravel.com/docs/testing)
- [PHPUnit ドキュメント](https://phpunit.de/documentation.html)