import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIdeas, useCreateIdea, useDeleteIdea } from '../../services/ideaService';
import { createWrapper } from '../utils';
import { mockPaginated } from '../mocks/handlers';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

describe('useIdeas', () => {
  it('retorna la lista paginada de ideas', async () => {
    const { result } = renderHook(() => useIdeas(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.data).toEqual(mockPaginated.data);
    expect(result.current.data?.current_page).toBe(1);
    expect(result.current.data?.total).toBe(2);
  });

  it('maneja error del servidor', async () => {
    server.use(
      http.get('http://127.0.0.1:8000/api/ideas', () =>
        HttpResponse.json({ error: 'Error interno' }, { status: 500 }),
      ),
    );

    const { result } = renderHook(() => useIdeas(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useCreateIdea', () => {
  it('crea una idea exitosamente', async () => {
    const { result } = renderHook(() => useCreateIdea(), { wrapper: createWrapper() });

    result.current.mutate({ titulo: 'Nueva idea', fecha: '2026-06-23T12:00:00.000Z' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.titulo).toBe('Nueva idea');
    expect(result.current.data?.id).toBe(3);
  });

  it('maneja error al crear', async () => {
    server.use(
      http.post('http://127.0.0.1:8000/api/ideas', () =>
        HttpResponse.json({ error: 'Error al crear' }, { status: 422 }),
      ),
    );

    const { result } = renderHook(() => useCreateIdea(), { wrapper: createWrapper() });

    result.current.mutate({ titulo: '', fecha: '' });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useDeleteIdea', () => {
  it('elimina una idea exitosamente', async () => {
    const { result } = renderHook(() => useDeleteIdea(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('maneja error al eliminar una idea inexistente', async () => {
    server.use(
      http.delete('http://127.0.0.1:8000/api/ideas/:id', () =>
        HttpResponse.json({ error: 'No encontrado' }, { status: 404 }),
      ),
    );

    const { result } = renderHook(() => useDeleteIdea(), { wrapper: createWrapper() });

    result.current.mutate(999);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
