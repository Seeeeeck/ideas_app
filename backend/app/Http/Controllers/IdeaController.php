<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIdeaRequest;
use App\Models\Idea;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $total = Idea::count();

            if ($total > 5) {
                $ideas = Idea::paginate(5);
            } else {
                $ideas = Idea::all();
            }

            return response()->json($ideas);
        } catch (\Exception $e) {
            \Log::error('Error al listar las ideas: ' . $e->getMessage());
            return response()->json(['error' => 'Error al listar las ideas'], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $idea = Idea::findOrFail($id);
            $idea->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            \Log::error('Error al eliminar la idea: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar la idea'], 500);
        }
    }

    public function store(StoreIdeaRequest $request): JsonResponse
    {
        try {
            $idea = Idea::create($request->validated());

            return response()->json($idea, 201);
        } catch (\Exception $e) {
            \Log::error('Error al crear la idea: ' . $e->getMessage());
            return response()->json(['error' => 'Error al crear la idea'], 500);
        }
    }
}
