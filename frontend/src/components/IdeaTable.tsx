type Idea = {
  id: number;
  titulo: string;
  fecha: string;
};

type Props = {
  ideas: Idea[];
  onDelete: (id: number) => void;
};

export default function IdeaTable({ ideas, onDelete }: Props) {
  return (
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
                onClick={() => onDelete(idea.id)}
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
