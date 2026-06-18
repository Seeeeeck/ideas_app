import { useState } from 'react';
import IdeaForm from './components/IdeaForm';
import IdeaTable from './components/IdeaTable';
import Pagination from './components/Pagination';

const INITIAL_IDEAS = [
  { id: 101, titulo: 'Implementar modo oscuro en la plataforma', fecha: '24/05/2025 14:32' },
  { id: 102, titulo: 'Notificaciones por correo para nuevas actividades', fecha: '24/05/2025 11:08' },
  { id: 103, titulo: 'Exportar ideas en formato PDF', fecha: '24/05/2025 09:41' },
  { id: 104, titulo: 'Agregar etiquetas para filtrar ideas', fecha: '23/05/2025 18:20' },
  { id: 105, titulo: 'Mejorar la búsqueda de ideas', fecha: '23/05/2025 10:15' },
];

const PAGE_SIZE = 5;

export default function App() {
  const [input, setInput] = useState('');
  const [ideas, setIdeas] = useState(INITIAL_IDEAS);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ideas.length / PAGE_SIZE);
  const pagedIdeas = ideas.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSubmit() {
    setInput('');
  }

  function handleDelete(id: number) {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  }

  return (
    <div style={{ maxWidth: '760px', margin: '40px auto', padding: '0 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <span style={{ fontSize: '22px' }}>💡</span>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>Ideas</h1>
      </div>
      <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#64748b' }}>
        Comparte tu idea con la comunidad
      </p>

      <IdeaForm value={input} onChange={setInput} onSubmit={handleSubmit} />

      <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
        Listado de ideas
      </h2>

      <IdeaTable ideas={pagedIdeas} onDelete={handleDelete} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
