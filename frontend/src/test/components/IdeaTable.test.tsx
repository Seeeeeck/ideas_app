import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import IdeaTable from '../../components/IdeaTable';
import { createWrapper } from '../utils';
import { server } from '../mocks/server';
import { mockPaginated } from '../mocks/handlers';

const renderTable = () => render(<IdeaTable />, { wrapper: createWrapper() });

describe('IdeaTable', () => {
  it('muestra el estado de carga inicialmente', () => {
    renderTable();

    expect(screen.getByText('Cargando ideas...')).toBeInTheDocument();
  });

  it('renderiza las ideas de la API', async () => {
    renderTable();

    await waitFor(() =>
      expect(screen.getByText('Idea uno')).toBeInTheDocument(),
    );

    expect(screen.getByText('Idea dos')).toBeInTheDocument();
    expect(screen.getAllByTitle('Eliminar idea')).toHaveLength(mockPaginated.data.length);
  });

  it('muestra error cuando la API falla', async () => {
    server.use(
      http.get('http://127.0.0.1:8000/api/ideas', () =>
        HttpResponse.json({ error: 'Error interno' }, { status: 500 }),
      ),
    );

    renderTable();

    await waitFor(() =>
      expect(screen.getByText('Error al cargar las ideas.')).toBeInTheDocument(),
    );
  });

  it('no muestra paginación cuando hay una sola página', async () => {
    renderTable();

    await waitFor(() => expect(screen.getByText('Idea uno')).toBeInTheDocument());

    expect(screen.queryByRole('button', { name: /anterior/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /siguiente/i })).not.toBeInTheDocument();
  });

  it('muestra paginación cuando hay más de una página', async () => {
    server.use(
      http.get('http://127.0.0.1:8000/api/ideas', () =>
        HttpResponse.json({ ...mockPaginated, last_page: 3, total: 15 }),
      ),
    );

    renderTable();

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument(),
    );

    expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('el botón eliminar llama a deleteIdea', async () => {
    let deleteWasCalled = false;
    server.use(
      http.delete('http://127.0.0.1:8000/api/ideas/:id', () => {
        deleteWasCalled = true;
        return new HttpResponse(null, { status: 204 });
      }),
    );

    renderTable();

    await waitFor(() => expect(screen.getByText('Idea uno')).toBeInTheDocument());

    fireEvent.click(screen.getAllByTitle('Eliminar idea')[0]);

    await waitFor(() => expect(deleteWasCalled).toBe(true));
  });
});
