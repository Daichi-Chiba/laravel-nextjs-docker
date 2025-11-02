<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite; // Socialiteをインポート
use Illuminate\Support\Str; // Strをインポート

class AuthController extends Controller
{
    /**
     * ユーザー登録
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);


        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * ログイン
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * GitHub認証ページへリダイレクト
     */
    public function redirectToProvider()
    {
        session()->forget('state'); // Socialiteのstateパラメータを明示的に無視
        return Socialite::driver('github')->stateless()->redirect();
    }

    /**
     * GitHubからのコールバックを処理
     */
    public function handleProviderCallback()
    {
        try {
            $githubUser = Socialite::driver('github')->user();
        } catch (\Exception $e) {
            return response()->json(['error' => 'GitHub認証に失敗しました。'], 500);
        }

        $user = User::where('github_id', $githubUser->getId())
                    ->orWhere('email', $githubUser->getEmail())
                    ->first();

        if ($user) {
            // 既存ユーザーの場合
            if (empty($user->github_id)) {
                $user->github_id = $githubUser->getId();
                $user->save();
            }
        } else {
            // 新規ユーザーの場合
            $user = User::create([
                'name' => $githubUser->getName() ?? $githubUser->getNickname(),
                'email' => $githubUser->getEmail(),
                'github_id' => $githubUser->getId(),
                'password' => Hash::make(Str::random(24)), // パスワードはランダム生成
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * ログアウト
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * 現在のユーザー情報を取得
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
