<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavigationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Евразия',
                'slug' => 'eurasia',
                'parent_id' => null,
            ],
            [
                'name' => 'Африка',
                'slug' => 'africa',
                'parent_id' => null,
            ],
            [
                'name' => 'Америка',
                'slug' => 'america',
                'parent_id' => null,
            ],
            [
                'name' => 'Австралия',
                'slug' => 'australia',
                'parent_id' => null,
            ],
            [
                'name' => 'Россия',
                'slug' => 'russia',
                'parent_id' => 1,
            ],
            [
                'name' => 'Москва',
                'slug' => 'moskow',
                'parent_id' => 5,
            ],
            [
                'name' => 'Сочи',
                'slug' => 'sochi',
                'parent_id' => 5,
            ],
            [
                'name' => 'Краснодар',
                'slug' => 'krasnodar',
                'parent_id' => 5,
            ],
            [
                'name' => 'Уфа',
                'slug' => 'ufa',
                'parent_id' => 5,
            ],
        ]);
    }
}
