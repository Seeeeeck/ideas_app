import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import IdeaForm from '../../components/IdeaForm';
import { createWrapper } from '../utils';
import { server } from '../mocks/server';

const renderForm = () => render(<IdeaForm />, { wrapper: createWrapper() });

describe('IdeaForm', () => {
  it('renderiza el input y el botón Publicar', () => {
    renderForm();

    expect(screen.getByPlaceholderText('Escribe tu idea aquí...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /publicar/i })).toBeInTheDocument();
  });

  it('no envía si el input está vacío', async () => {
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: /publicar/i }));

    await waitFor(() =>
      expect(screen.queryByText(/publicando/i)).not.toBeInTheDocument(),
    );
  });

  it('limpia el input tras crear exitosamente', async () => {
    renderForm();

    const input = screen.getByPlaceholderText('Escribe tu idea aquí...');
    fireEvent.change(input, { target: { value: 'Mi nueva idea' } });
    fireEvent.click(screen.getByRole('button', { name: /publicar/i }));

    await waitFor(() => expect(input).toHaveValue(''));
  });

  it('envía al presionar Enter', async () => {
    renderForm();

    const input = screen.getByPlaceholderText('Escribe tu idea aquí...');
    fireEvent.change(input, { target: { value: 'Idea con Enter' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(input).toHaveValue(''));
  });

  it('muestra Publicando... mientras está pendiente', async () => {
    server.use(
      http.post('http://127.0.0.1:8000/api/ideas', async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return HttpResponse.json({ id: 3, titulo: 'test', fecha: '2026-06-23' }, { status: 201 });
      }),
    );

    renderForm();

    const input = screen.getByPlaceholderText('Escribe tu idea aquí...');
    fireEvent.change(input, { target: { value: 'Idea pendiente' } });
    fireEvent.click(screen.getByRole('button', { name: /publicar/i }));

    await waitFor(() => expect(screen.getByText(/publicando/i)).toBeInTheDocument());
  });
});
