import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';

const renderPagination = (currentPage: number, totalPages: number, onPageChange = vi.fn()) =>
  render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

describe('Pagination', () => {
  it('renderiza los botones de página', () => {
    renderPagination(1, 3);

    expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('deshabilita Anterior en la primera página', () => {
    renderPagination(1, 3);

    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /siguiente/i })).not.toBeDisabled();
  });

  it('deshabilita Siguiente en la última página', () => {
    renderPagination(3, 3);

    expect(screen.getByRole('button', { name: /siguiente/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /anterior/i })).not.toBeDisabled();
  });

  it('llama onPageChange con la página anterior', () => {
    const onPageChange = vi.fn();
    renderPagination(2, 3, onPageChange);

    fireEvent.click(screen.getByRole('button', { name: /anterior/i }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('llama onPageChange con la página siguiente', () => {
    const onPageChange = vi.fn();
    renderPagination(2, 3, onPageChange);

    fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('llama onPageChange al hacer click en un número de página', () => {
    const onPageChange = vi.fn();
    renderPagination(1, 3, onPageChange);

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
