import { useEffect, useState } from 'react';
import { apiBaseUrl, extractRecords } from '../api.js';
import ResourceView from './ResourceView.jsx';

const columns = [
  { label: 'Activity', key: 'type' },
  { label: 'Member', render: (row) => String(row.user ?? '—').slice(-8) },
  { label: 'Duration', render: (row) => `${row.duration ?? 0} min` },
  { label: 'Points', key: 'points' },
  { label: 'Recorded', render: (row) => row.recordedAt ? new Date(row.recordedAt).toLocaleDateString() : '—' },
];

export default function Activities() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/activities/`, { signal: controller.signal })
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
      title="Activities"
      description="Every effort adds up. See the latest movement from your club."
      rows={rows}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
}