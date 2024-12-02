<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NFLATCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Inserting data into the NFLATCategory table
        DB::table('nflatcategories')->insert([
            ['class' => '6', 'category' => 'Junior'],
            ['class' => '7', 'category' => 'Junior'],
            ['class' => '8', 'category' => 'Junior'],
            ['class' => '9', 'category' => 'Intermediate'],
            ['class' => '10', 'category' => 'Intermediate'],
            ['class' => '11', 'category' => 'Senior'],
            ['class' => '12', 'category' => 'Senior'],
        ]);
    }
}
