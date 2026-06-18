<?php

namespace Tests\Http\IdeaController;

use App\Models\Idea;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListIdeaTest extends TestCase
{
    use RefreshDatabase;

    public function test_lista_ideas_sin_paginacion_cuando_hay_5_o_menos(): void
    {
        Idea::insert([
            ['titulo' => 'Idea uno',   'fecha' => '2026-06-18'],
            ['titulo' => 'Idea dos',   'fecha' => '2026-06-18'],
            ['titulo' => 'Idea tres',  'fecha' => '2026-06-18'],
        ]);

        $response = $this->getJson('/api/ideas');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_lista_ideas_paginadas_cuando_hay_mas_de_5(): void
    {
        Idea::insert([
            ['titulo' => 'Idea uno',   'fecha' => '2026-06-18'],
            ['titulo' => 'Idea dos',   'fecha' => '2026-06-18'],
            ['titulo' => 'Idea tres',  'fecha' => '2026-06-18'],
            ['titulo' => 'Idea cuatro','fecha' => '2026-06-18'],
            ['titulo' => 'Idea cinco', 'fecha' => '2026-06-18'],
            ['titulo' => 'Idea seis',  'fecha' => '2026-06-18'],
        ]);

        $response = $this->getJson('/api/ideas');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data', 'current_page', 'per_page', 'total'])
                 ->assertJsonPath('per_page', 5)
                 ->assertJsonPath('total', 6);
    }
}
