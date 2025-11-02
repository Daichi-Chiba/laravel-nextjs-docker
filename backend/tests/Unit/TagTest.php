<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class TagTest extends TestCase
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
    public function test_can_create_tag()
    {
        $data = [
            // TODO: モデルの属性を定義
        ];
        $Tag = Tag::create($data);
        $this->assertInstanceOf(Tag::class, $Tag);
    }
}
