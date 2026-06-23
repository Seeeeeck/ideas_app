import { useState } from 'react';
import { toast } from 'react-toastify';
import { useIdeas, useDeleteIdea } from '../services/ideaService';

export default function IdeaTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useIdeas(page);
  const { mutate: deleteIdea } = useDeleteIdea();

  if (isLoading) return <p style={{ color: '#64748b' }}>Cargando ideas...</p>;
  if (isError) return <p style={{ color: '#ef4444' }}>Error al cargar las ideas.</p>;

  const ideas = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>TÍTULO</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>FECHA</th>
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => (
            <tr key={idea.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={tdStyle}>{idea.id}</td>
              <td style={tdStyle}>{idea.titulo}</td>
              <td style={{ ...tdStyle, textAlign: 'right', color: '#64748b' }}>
                📅 {idea.fecha}
              </td>
              <td style={{ ...tdStyle, textAlign: 'center', width: '48px' }}>
                <button
                  onClick={() => deleteIdea(idea.id, { onSuccess: () => toast.success('Idea eliminada') })}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#94a3b8',
                    fontSize: '16px',
                    lineHeight: 1,
                  }}
                  title="Eliminar idea"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {lastPage > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            style={btnStyle(page === 1)}
          >
            Anterior
          </button>
          <span style={{ fontSize: '14px', color: '#64748b', alignSelf: 'center' }}>
            {page} / {lastPage}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === lastPage}
            style={btnStyle(page === lastPage)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 700,
  color: '#94a3b8',
  letterSpacing: '0.05em',
};

const tdStyle: React.CSSProperties = {
  padding: '14px 12px',
  fontSize: '14px',
  color: '#1e293b',
};

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 600,
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: disabled ? '#f8fafc' : '#fff',
  color: disabled ? '#cbd5e1' : '#0f172a',
});
