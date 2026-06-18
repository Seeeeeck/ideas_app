<?php

namespace Tests\Http\IdeaController;

use App\Models\Idea;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DestroyIdeaTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_eliminar_una_idea(): void
    {
        $idea = Idea::create(['titulo' => 'Idea a eliminar', 'fecha' => '2026-06-18']);

        $response = $this->deleteJson("/api/ideas/{$idea->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('ideas', ['id' => $idea->id]);
    }

    public function test_retorna_error_al_eliminar_idea_inexistente(): void
    {
        $response = $this->deleteJson('/api/ideas/999');

        $response->assertStatus(500)
                 ->assertJson(['error' => 'Error al eliminar la idea']);
    }
}
