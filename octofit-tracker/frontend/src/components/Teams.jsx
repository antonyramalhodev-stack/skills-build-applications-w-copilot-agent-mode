import { useEffect, useState } from 'react';
import { apiBaseUrl, extractRecords } from '../api.js';
import ResourceView from './ResourceView.jsx';

const columns = [
  { label: 'Team', key: 'name' },
  { label: 'Members', render: (row) => row.members?.length ?? 0 },
  { label: 'Created', render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—' },
];

export default function Teams() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/teams/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((payload) => setRows(extractRecords(payload)))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <ResourceView
      title="Teams"
      description="Find your crew and celebrate the progress you make together."
      rows={rows}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
}