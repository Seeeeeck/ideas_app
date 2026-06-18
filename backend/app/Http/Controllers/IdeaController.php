<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIdeaRequest;
use App\Models\Idea;
use Illuminate\Http\JsonResponse;

class IdeaController extends Controller
{
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
