<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Answer;

class AnswerTest extends TestCase
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
    public function test_can_create_answer()
    {
        $data = [
            // TODO: モデルの属性を定義
        ];
        $Answer = Answer::create($data);
        $this->assertInstanceOf(Answer::class, $Answer);
    }
}
