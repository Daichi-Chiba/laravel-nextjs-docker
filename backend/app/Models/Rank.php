<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rank extends Model
{
    protected $fillable = [
        'name',
        'min_points',
        'color',
        'icon',
    ];

    /**
     * Get the users for the rank.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
