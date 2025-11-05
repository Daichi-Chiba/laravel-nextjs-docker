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
        Schema::create('ranks', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Beginner, Contributor, Expert, Guru
            $table->integer('min_points'); // Minimum points required for this rank
            $table->string('color')->nullable(); // Display color for UI
            $table->string('icon')->nullable(); // Icon name or path
            $table->timestamps();
        });

        // Add rank_id and points to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('rank_id')->nullable()->after('github_id')->constrained()->nullOnDelete();
            $table->integer('points')->default(0)->after('rank_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['rank_id']);
            $table->dropColumn(['rank_id', 'points']);
        });

        Schema::dropIfExists('ranks');
    }
};
