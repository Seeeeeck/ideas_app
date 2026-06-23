import { http, HttpResponse } from 'msw';
import { Idea, PaginatedIdeas } from '../../services/ideaService';

const BASE = 'http://127.0.0.1:8000/api';

export const mockIdeas: Idea[] = [
  { id: 1, titulo: 'Idea uno', fecha: '2026-06-23' },
  { id: 2, titulo: 'Idea dos', fecha: '2026-06-22' },
];

export const mockPaginated: PaginatedIdeas = {
  data: mockIdeas,
  current_page: 1,
  last_page: 1,
  total: 2,
};

export const handlers = [
  http.get(`${BASE}/ideas`, () => HttpResponse.json(mockPaginated)),

  http.post(`${BASE}/ideas`, async ({ request }) => {
    const body = await request.json() as { titulo: string; fecha: string };
    const newIdea: Idea = { id: 3, titulo: body.titulo, fecha: body.fecha };
    return HttpResponse.json(newIdea, { status: 201 });
  }),

  http.delete(`${BASE}/ideas/:id`, () => new HttpResponse(null, { status: 204 })),
];
