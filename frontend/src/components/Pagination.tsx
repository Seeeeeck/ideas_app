type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '24px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={btnStyle(false, currentPage === 1)}
      >
        ‹ Anterior
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={btnStyle(page === currentPage, false)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={btnStyle(false, currentPage === totalPages)}
      >
        Siguiente ›
      </button>
    </div>
  );
}

function btnStyle(active: boolean, disabled: boolean): React.CSSProperties {
  return {
    padding: '6px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: active ? '#3b82f6' : '#fff',
    color: active ? '#fff' : disabled ? '#cbd5e1' : '#475569',
    fontSize: '14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: active ? 600 : 400,
  };
}
