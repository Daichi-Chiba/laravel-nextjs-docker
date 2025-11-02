<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'slug',
        'views_count',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $post->slug = Str::slug($post->title) . '-' . time();
        });
    }

    /**
     * Get the user that owns the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the answers for the post.
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Get the tags for the post.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
