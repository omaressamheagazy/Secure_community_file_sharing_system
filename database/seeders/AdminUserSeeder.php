<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.s
     */
    public function run(): void
    {
        User::create([
            'name' => Str::random(10),
            'email' => 'omar'.'@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt("e7dc03340a6164921df446332dbee60012cca6aa87fce104b2202f80819f2584"),
        ]);
    }
}
