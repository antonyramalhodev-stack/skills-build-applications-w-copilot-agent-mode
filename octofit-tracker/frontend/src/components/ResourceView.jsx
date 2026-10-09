export default function ResourceView({
  title,
  description,
  rows,
  columns,
  isLoading,
  error,
}) {
  return (
    <section className="resource-page" aria-busy={isLoading}>
      <header className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT <span>/</span> COMMUNITY</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count" aria-label={`${rows.length} records`}>
          <strong>{isLoading ? '--' : String(rows.length).padStart(2, '0')}</strong>
          <span>RECORDS</span>
        </div>
      </header>

      <section className="data-panel" aria-label={`${title} records`}>
        <div className="panel-heading">
          <div className="panel-title"><span className="live-dot" />{title.toUpperCase()}</div>
          <span className="panel-meta">LATEST FIRST</span>
        </div>

        {isLoading && <div className="message-state">Loading {title.toLowerCase()}...</div>}
        {!isLoading && error && <div className="message-state error-state" role="alert">{error}</div>}
        {!isLoading && !error && rows.length === 0 && (
          <div className="message-state">No records yet.</div>
        )}
        {!isLoading && !error && rows.length > 0 && (
          <div className="table-scroll">
            <table className="resource-table">
              <thead>
                <tr>{columns.map((column) => <th key={column.label}>{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row._id ?? row.id ?? `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>
                        {column.render ? column.render(row) : row[column.key] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}