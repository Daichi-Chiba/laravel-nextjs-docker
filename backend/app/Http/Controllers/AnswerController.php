<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Post;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Store a new answer.
     */
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $answer = Answer::create([
            'user_id' => auth()->id(),
            'post_id' => $post->id,
            'content' => $request->content,
        ]);

        $answer->load('user:id,name,rank_id', 'user.rank:id,name,color,icon');

        return response()->json($answer, 201);
    }

    /**
     * Update an answer.
     */
    public function update(Request $request, Answer $answer)
    {
        if ($answer->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|string',
        ]);

        $answer->update([
            'content' => $request->content,
        ]);

        return response()->json($answer);
    }

    /**
     * Delete an answer.
     */
    public function destroy(Request $request, Answer $answer)
    {
        if ($answer->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $answer->delete();

        return response()->json(['message' => 'Answer deleted']);
    }

    /**
     * Mark an answer as the best answer.
     */
    public function markAsBest(Request $request, Answer $answer)
    {
        // Only the post author can mark an answer as best
        if ($answer->post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $answer->markAsBest();

        return response()->json([
            'message' => 'Answer marked as best',
            'answer' => $answer->fresh(),
        ]);
    }
}
