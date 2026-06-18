<?php

namespace Tests\Http\IdeaController;

use App\Models\Idea;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListIdeaFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_lista_ideas_de_recientes_a_antiguas(): void
    {
        Idea::insert([
            ['titulo' => 'Idea antigua', 'fecha' => '2026-01-01'],
            ['titulo' => 'Idea reciente', 'fecha' => '2026-06-18'],
        ]);

        $response = $this->getJson('/api/ideas?order=recent');

        $response->assertStatus(200);

        $ideas = $response->json();
        $this->assertEquals('Idea reciente', $ideas[0]['titulo']);
        $this->assertEquals('Idea antigua', $ideas[1]['titulo']);
    }

    public function test_lista_ideas_de_antiguas_a_recientes(): void
    {
        Idea::insert([
            ['titulo' => 'Idea antigua', 'fecha' => '2026-01-01'],
            ['titulo' => 'Idea reciente', 'fecha' => '2026-06-18'],
        ]);

        $response = $this->getJson('/api/ideas?order=last');

        $response->assertStatus(200);

        $ideas = $response->json();
        $this->assertEquals('Idea antigua', $ideas[0]['titulo']);
        $this->assertEquals('Idea reciente', $ideas[1]['titulo']);
    }

    public function test_sin_order_devuelve_recientes_primero(): void
    {
        Idea::insert([
            ['titulo' => 'Idea antigua', 'fecha' => '2026-01-01'],
            ['titulo' => 'Idea reciente', 'fecha' => '2026-06-18'],
        ]);

        $response = $this->getJson('/api/ideas');

        $response->assertStatus(200);

        $ideas = $response->json();
        $this->assertEquals('Idea reciente', $ideas[0]['titulo']);
    }
}
