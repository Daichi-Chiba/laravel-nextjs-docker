<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Bookmark;
use App\Models\Post;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    /**
     * Get user's bookmarks.
     */
    public function index(Request $request)
    {
        $bookmarks = $request->user()->bookmarks()
            ->with(['bookmarkable'])
            ->latest()
            ->get()
            ->map(function ($bookmark) {
                return [
                    'id' => $bookmark->id,
                    'type' => class_basename($bookmark->bookmarkable_type),
                    'bookmarkable' => $bookmark->bookmarkable,
                    'created_at' => $bookmark->created_at,
                ];
            });

        return response()->json($bookmarks);
    }

    /**
     * Toggle bookmark on a post or answer.
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'bookmarkable_type' => 'required|in:post,answer',
            'bookmarkable_id' => 'required|integer',
        ]);

        $bookmarkableType = $request->bookmarkable_type === 'post' ? Post::class : Answer::class;
        
        // Verify the bookmarkable exists
        $bookmarkableType::findOrFail($request->bookmarkable_id);

        $bookmark = Bookmark::where([
            'user_id' => auth()->id(),
            'bookmarkable_type' => $bookmarkableType,
            'bookmarkable_id' => $request->bookmarkable_id,
        ])->first();

        if ($bookmark) {
            $bookmark->delete();
            return response()->json(['message' => 'Bookmark removed', 'bookmarked' => false]);
        }

        Bookmark::create([
            'user_id' => auth()->id(),
            'bookmarkable_type' => $bookmarkableType,
            'bookmarkable_id' => $request->bookmarkable_id,
        ]);

        return response()->json(['message' => 'Bookmark added', 'bookmarked' => true]);
    }

    /**
     * Check if a post or answer is bookmarked.
     */
    public function check(Request $request, string $type, int $id)
    {
        $bookmarkableType = $type === 'post' ? Post::class : Answer::class;
        
        $bookmarked = Bookmark::where([
            'user_id' => auth()->id(),
            'bookmarkable_type' => $bookmarkableType,
            'bookmarkable_id' => $id,
        ])->exists();

        return response()->json(['bookmarked' => $bookmarked]);
    }
}
