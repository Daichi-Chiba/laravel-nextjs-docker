<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);

// GitHub OAuth routes
Route::get('auth/github/redirect', [AuthController::class, 'redirectToProvider']);
Route::get('auth/github/callback', [AuthController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/posts', [PostController::class, 'store']); // 質問投稿ルートを追加
});

