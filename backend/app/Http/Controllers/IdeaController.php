<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        try {
            $idea = Idea::create($request->only(['titulo', 'fecha']));

            return response()->json($idea, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear la idea'], 500);
        }
    }
}
