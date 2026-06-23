import { useState } from 'react';
import { useCreateIdea } from '../services/ideaService';

export default function IdeaForm() {
  const [titulo, setTitulo] = useState('');
  const { mutate: createIdea, isPending } = useCreateIdea();

  function handleSubmit() {
    const trimmed = titulo.trim();
    if (!trimmed) return;

    createIdea(
      { titulo: trimmed, fecha: new Date().toISOString() },
      { onSuccess: () => setTitulo('') },
    );
  }

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
      <input
        type="text"
        placeholder="Escribe tu idea aquí..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        disabled={isPending}
        style={{
          flex: 1,
          padding: '12px 16px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          backgroundColor: isPending ? '#93c5fd' : '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        ✈ {isPending ? 'Publicando...' : 'Publicar'}
      </button>
    </div>
  );
}
