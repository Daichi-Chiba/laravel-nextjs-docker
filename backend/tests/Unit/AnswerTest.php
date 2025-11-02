<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class AnswerTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
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
