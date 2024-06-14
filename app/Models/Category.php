<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $guarder = [];

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function categories(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function parent(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->with('categories');
    }

    public function children(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }
}
