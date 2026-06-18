<?php

namespace Tests\Http\IdeaController;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreIdeaTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_crear_una_idea(): void
    {
        $response = $this->postJson('/api/ideas', [
            'titulo' => 'Mi primera idea',
            'fecha'  => '2026-06-18',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('ideas', ['titulo' => 'Mi primera idea']);
    }
}
