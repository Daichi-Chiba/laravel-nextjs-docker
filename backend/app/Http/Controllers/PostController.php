<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of posts.
     */
    public function index(Request $request)
    {
        $query = Post::with([
            'user:id,name,rank_id,points',
            'user.rank:id,name,color,icon',
            'tags:id,name,slug',
        ])
        ->withCount(['answers', 'votes']);

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Filter by tag
        if ($request->has('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        // Sort
        $sort = $request->get('sort', 'latest');
        switch ($sort) {
            case 'popular':
                $query->orderBy('views_count', 'desc');
                break;
            case 'votes':
                $query->orderBy('votes_count', 'desc');
                break;
            case 'unanswered':
                $query->has('answers', '=', 0);
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $posts = $query->paginate(20);

        return response()->json($posts);
    }

    /**
     * Store a newly created post.
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

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        $post->incrementViews();

        $post->load([
            'user:id,name,rank_id,points',
            'user.rank:id,name,color,icon',
            'user.badges:id,name,icon,color',
            'tags:id,name,slug',
            'answers' => function ($query) {
                $query->with([
                    'user:id,name,rank_id,points',
                    'user.rank:id,name,color,icon',
                ])
                ->withCount('votes')
                ->orderBy('is_best', 'desc')
                ->orderBy('votes_count', 'desc');
            },
        ])
        ->loadCount(['answers', 'votes']);

        // Add user vote if authenticated
        if (auth()->check()) {
            $post->user_vote = $post->userVote(auth()->id());
        }

        return response()->json($post);
    }

    /**
     * Update the specified post.
     */
    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',
        ]);

        $post->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

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

        return response()->json([
            'message' => 'Question updated successfully',
            'post' => $post->fresh(['user', 'tags'])
        ]);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Question deleted successfully']);
    }
}
