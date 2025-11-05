<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            // Language Badges
            [
                'name' => 'TypeScript Expert',
                'description' => 'Answered 10+ TypeScript questions with high votes',
                'category' => 'language',
                'icon' => 'code',
                'color' => '#3178C6',
            ],
            [
                'name' => 'JavaScript Master',
                'description' => 'Answered 10+ JavaScript questions with high votes',
                'category' => 'language',
                'icon' => 'code',
                'color' => '#F7DF1E',
            ],
            [
                'name' => 'Python Guru',
                'description' => 'Answered 10+ Python questions with high votes',
                'category' => 'language',
                'icon' => 'code',
                'color' => '#3776AB',
            ],
            [
                'name' => 'PHP Pro',
                'description' => 'Answered 10+ PHP questions with high votes',
                'category' => 'language',
                'icon' => 'code',
                'color' => '#777BB4',
            ],

            // Framework Badges
            [
                'name' => 'React Master',
                'description' => 'Answered 10+ React questions with high votes',
                'category' => 'framework',
                'icon' => 'component',
                'color' => '#61DAFB',
            ],
            [
                'name' => 'Next.js Expert',
                'description' => 'Answered 10+ Next.js questions with high votes',
                'category' => 'framework',
                'icon' => 'zap',
                'color' => '#000000',
            ],
            [
                'name' => 'Laravel Expert',
                'description' => 'Answered 10+ Laravel questions with high votes',
                'category' => 'framework',
                'icon' => 'server',
                'color' => '#FF2D20',
            ],
            [
                'name' => 'Vue.js Master',
                'description' => 'Answered 10+ Vue.js questions with high votes',
                'category' => 'framework',
                'icon' => 'component',
                'color' => '#4FC08D',
            ],

            // Achievement Badges
            [
                'name' => 'First Answer',
                'description' => 'Posted your first answer',
                'category' => 'achievement',
                'icon' => 'message-circle',
                'color' => '#10B981',
            ],
            [
                'name' => 'First Question',
                'description' => 'Posted your first question',
                'category' => 'achievement',
                'icon' => 'help-circle',
                'color' => '#10B981',
            ],
            [
                'name' => 'Best Answer',
                'description' => 'Received your first best answer',
                'category' => 'achievement',
                'icon' => 'check-circle',
                'color' => '#F59E0B',
            ],
            [
                'name' => 'Popular Question',
                'description' => 'Asked a question with 100+ views',
                'category' => 'achievement',
                'icon' => 'trending-up',
                'color' => '#8B5CF6',
            ],
            [
                'name' => 'Helpful',
                'description' => 'Received 100+ upvotes on answers',
                'category' => 'achievement',
                'icon' => 'thumbs-up',
                'color' => '#3B82F6',
            ],
            [
                'name' => 'Good Samaritan',
                'description' => 'Answered 50+ questions',
                'category' => 'achievement',
                'icon' => 'heart',
                'color' => '#EF4444',
            ],
            [
                'name' => 'Community Leader',
                'description' => 'Gained 100+ followers',
                'category' => 'achievement',
                'icon' => 'users',
                'color' => '#F59E0B',
            ],
        ];

        foreach ($badges as $badge) {
            Badge::create($badge);
        }
    }
}
