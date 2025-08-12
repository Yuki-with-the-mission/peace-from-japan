export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="card">
      <header className="mb-3">
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
