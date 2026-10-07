function readField(record, path) {
  return path.split('.').reduce((value, key) => value?.[key], record)
}

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (Array.isArray(value)) {
    return value.length
  }
  if (typeof value === 'object') {
    return value.displayName ?? value.name ?? value.title ?? '—'
  }
  return value
}

export default function ResourcePage({
  endpoint,
  eyebrow,
  title,
  description,
  icon,
  columns,
  records,
  loading,
  error,
}) {
  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="heading-icon" aria-hidden="true">
          <i className={`bi ${icon}`} />
        </div>
      </div>

      <div className="resource-card">
        <div className="resource-card-heading">
          <div>
            <h2>{title} overview</h2>
            <p>Live data from your OctoFit community</p>
          </div>
          {!loading && !error && (
            <span className="record-count">
              {records.length} {records.length === 1 ? 'record' : 'records'}
            </span>
          )}
        </div>

        {loading && (
          <div className="resource-message" role="status">
            <span className="spinner-border spinner-border-sm text-success" aria-hidden="true" />
            <span>Loading {title.toLowerCase()}…</span>
          </div>
        )}

        {error && (
          <div className="alert alert-danger m-4" role="alert">
            <strong>Couldn’t load {title.toLowerCase()}.</strong> {error}
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="empty-state">
            <i className={`bi ${icon}`} aria-hidden="true" />
            <h3>No {title.toLowerCase()} yet</h3>
            <p>When your community adds data, it will show up here.</p>
          </div>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle mb-0 resource-table">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id ?? record.id ?? `${endpoint}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>{displayValue(readField(record, column.field))}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
