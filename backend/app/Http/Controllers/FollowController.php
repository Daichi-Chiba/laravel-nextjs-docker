<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Follow a user.
     */
    public function follow(Request $request, User $user)
    {
        if (auth()->id() === $user->id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        $request->user()->follow($user);

        return response()->json([
            'message' => 'User followed',
            'following' => true,
        ]);
    }

    /**
     * Unfollow a user.
     */
    public function unfollow(Request $request, User $user)
    {
        $request->user()->unfollow($user);

        return response()->json([
            'message' => 'User unfollowed',
            'following' => false,
        ]);
    }

    /**
     * Get user's followers.
     */
    public function followers(Request $request, User $user)
    {
        $followers = $user->followers()
            ->select('users.id', 'users.name', 'users.email', 'users.points', 'users.rank_id')
            ->with('rank:id,name,color,icon')
            ->get();

        return response()->json($followers);
    }

    /**
     * Get user's following.
     */
    public function following(Request $request, User $user)
    {
        $following = $user->following()
            ->select('users.id', 'users.name', 'users.email', 'users.points', 'users.rank_id')
            ->with('rank:id,name,color,icon')
            ->get();

        return response()->json($following);
    }

    /**
     * Check if the authenticated user is following another user.
     */
    public function check(Request $request, User $user)
    {
        $isFollowing = $request->user()->isFollowing($user);

        return response()->json(['following' => $isFollowing]);
    }
}
