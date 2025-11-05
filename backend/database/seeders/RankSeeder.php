<?php

namespace Database\Seeders;

use App\Models\Rank;
use Illuminate\Database\Seeder;

class RankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ranks = [
            [
                'name' => 'Beginner',
                'min_points' => 0,
                'color' => '#9CA3AF',
                'icon' => 'user',
            ],
            [
                'name' => 'Contributor',
                'min_points' => 100,
                'color' => '#3B82F6',
                'icon' => 'user-check',
            ],
            [
                'name' => 'Expert',
                'min_points' => 500,
                'color' => '#8B5CF6',
                'icon' => 'award',
            ],
            [
                'name' => 'Guru',
                'min_points' => 1000,
                'color' => '#F59E0B',
                'icon' => 'crown',
            ],
        ];

        foreach ($ranks as $rank) {
            Rank::create($rank);
        }
    }
}
