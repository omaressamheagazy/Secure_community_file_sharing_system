<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;


class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_get_user_after_login(): void
    {   
        $user = User::factory()->create([
            'name' => 'user1',
            'email' => 'oma1r@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('admin123'),
        ]);

        Sanctum::actingAs($user);
        $response = $this->getJson('/api/user');
        $response->assertStatus(200);
    }
}
