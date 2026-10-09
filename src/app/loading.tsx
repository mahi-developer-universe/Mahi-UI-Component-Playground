export default function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <div className="pulse-dot" style={{ width: '20px', height: '20px', background: 'var(--accent-primary)', borderRadius: '50%' }}></div>
      <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        Loading Mahi UI Playground...
      </p>
    </div>
  );
}
