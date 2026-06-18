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

    public function test_titulo_no_puede_tener_menos_de_3_caracteres(): void
    {
        $response = $this->postJson('/api/ideas', [
            'titulo' => 'ab',
            'fecha'  => '2026-06-18',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['titulo']);
    }

    public function test_titulo_no_puede_tener_mas_de_50_caracteres(): void
    {
        $response = $this->postJson('/api/ideas', [
            'titulo' => str_repeat('a', 51),
            'fecha'  => '2026-06-18',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['titulo']);
    }
}
