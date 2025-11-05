<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Vote on a post or answer.
     */
    public function vote(Request $request)
    {
        $request->validate([
            'votable_type' => 'required|in:post,answer',
            'votable_id' => 'required|integer',
            'value' => 'required|in:-1,1',
        ]);

        $votableType = $request->votable_type === 'post' ? Post::class : Answer::class;
        $votable = $votableType::findOrFail($request->votable_id);

        // Find existing vote
        $vote = Vote::where([
            'user_id' => auth()->id(),
            'votable_type' => $votableType,
            'votable_id' => $request->votable_id,
        ])->first();

        if ($vote) {
            // If same value, remove vote (toggle)
            if ($vote->value == $request->value) {
                $vote->delete();
                $votable->decrement('votes_count', $request->value);
                
                return response()->json([
                    'message' => 'Vote removed',
                    'votes_count' => $votable->fresh()->votes_count,
                    'user_vote' => null,
                ]);
            }
            
            // Update vote value
            $oldValue = $vote->value;
            $vote->update(['value' => $request->value]);
            $votable->increment('votes_count', $request->value - $oldValue);
        } else {
            // Create new vote
            Vote::create([
                'user_id' => auth()->id(),
                'votable_type' => $votableType,
                'votable_id' => $request->votable_id,
                'value' => $request->value,
            ]);
            
            $votable->increment('votes_count', $request->value);
        }

        return response()->json([
            'message' => 'Vote recorded',
            'votes_count' => $votable->fresh()->votes_count,
            'user_vote' => $request->value,
        ]);
    }

    /**
     * Get vote status for a votable entity.
     */
    public function getVote(Request $request, string $type, int $id)
    {
        $votableType = $type === 'post' ? Post::class : Answer::class;
        
        $vote = Vote::where([
            'user_id' => auth()->id(),
            'votable_type' => $votableType,
            'votable_id' => $id,
        ])->first();

        return response()->json([
            'value' => $vote ? $vote->value : null,
        ]);
    }
}
