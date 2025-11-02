<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',
        ]);

        $post = new Post();
        $post->user_id = $request->user()->id;
        $post->title = $validated['title'];
        $post->content = $validated['content'];
        $post->slug = Str::slug($validated['title']) . '-' . time(); // ユニークなslugを生成
        $post->save();

        if (isset($validated['tags'])) {
            $tagIds = [];
            foreach ($validated['tags'] as $tagName) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                );
                $tagIds[] = $tag->id;
            }
            $post->tags()->sync($tagIds);
        }

        return response()->json($post->load('tags'), 201);
    }
}
