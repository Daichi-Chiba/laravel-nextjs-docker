<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Get comments for a post or answer.
     */
    public function index(Request $request, string $type, int $id)
    {
        $commentableType = $type === 'post' ? Post::class : Answer::class;
        
        $comments = Comment::where([
            'commentable_type' => $commentableType,
            'commentable_id' => $id,
        ])
        ->with('user:id,name')
        ->latest()
        ->get();

        return response()->json($comments);
    }

    /**
     * Store a new comment.
     */
    public function store(Request $request)
    {
        $request->validate([
            'commentable_type' => 'required|in:post,answer',
            'commentable_id' => 'required|integer',
            'content' => 'required|string|max:1000',
        ]);

        $commentableType = $request->commentable_type === 'post' ? Post::class : Answer::class;
        
        // Verify the commentable exists
        $commentableType::findOrFail($request->commentable_id);

        $comment = Comment::create([
            'user_id' => auth()->id(),
            'commentable_type' => $commentableType,
            'commentable_id' => $request->commentable_id,
            'content' => $request->content,
        ]);

        $comment->load('user:id,name');

        return response()->json($comment, 201);
    }

    /**
     * Delete a comment.
     */
    public function destroy(Request $request, Comment $comment)
    {
        // Only the comment author can delete it
        if ($comment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}
