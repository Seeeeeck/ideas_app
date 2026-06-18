type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function IdeaForm({ value, onChange, onSubmit }: Props) {
  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
      <input
        type="text"
        placeholder="Escribe tu idea aquí..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        onClick={onSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        ✈ Publicar
      </button>
    </div>
  );
}
