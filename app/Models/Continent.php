<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Continent extends Model
{
    use HasFactory;

    protected $guarded = [];
    public function country()
    {
        return $this->hasMany(Country::class);
    }
}
