<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->integer('votes_count')->default(0)->after('views_count');
        });

        Schema::table('answers', function (Blueprint $table) {
            $table->boolean('is_best')->default(false)->after('content');
            $table->integer('votes_count')->default(0)->after('is_best');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('votes_count');
        });

        Schema::table('answers', function (Blueprint $table) {
            $table->dropColumn(['is_best', 'votes_count']);
        });
    }
};
