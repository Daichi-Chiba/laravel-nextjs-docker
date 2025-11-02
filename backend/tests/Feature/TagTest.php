<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Tag;

class TagTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * 基本的な機能テスト
     */
    public function test_can_create_tag()
    {
        $data = [
            // TODO: モデルの属性を定義
        ];
        $Tag = Tag::create($data);
        $this->assertInstanceOf(Tag::class, $Tag);
    }
}
