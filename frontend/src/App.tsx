import IdeaForm from './components/IdeaForm';
import IdeaTable from './components/IdeaTable';

export default function App() {
  return (
    <div style={{ maxWidth: '760px', margin: '40px auto', padding: '0 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <span style={{ fontSize: '22px' }}>💡</span>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>Ideas</h1>
      </div>
      <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#64748b' }}>
        Comparte tu idea con la comunidad
      </p>

      <IdeaForm />

      <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
        Listado de ideas
      </h2>

      <IdeaTable />
    </div>
  );
}
