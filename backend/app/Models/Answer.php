<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'post_id',
        'content',
        'is_best',
        'votes_count',
    ];

    protected $casts = [
        'is_best' => 'boolean',
    ];

    /**
     * Get the user that owns the answer.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the post that owns the answer.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Get the votes for the answer.
     */
    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    /**
     * Get the comments for the answer.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    /**
     * Get the bookmarks for the answer.
     */
    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }

    /**
     * Mark this answer as the best answer.
     */
    public function markAsBest(): void
    {
        // Unmark other answers for the same post
        $this->post->answers()->where('id', '!=', $this->id)->update(['is_best' => false]);
        
        // Mark this answer as best
        $this->update(['is_best' => true]);
    }

    /**
     * Get the vote value for a specific user.
     */
    public function userVote(?int $userId): ?int
    {
        if (!$userId) {
            return null;
        }

        $vote = $this->votes()->where('user_id', $userId)->first();
        return $vote ? $vote->value : null;
    }
}
