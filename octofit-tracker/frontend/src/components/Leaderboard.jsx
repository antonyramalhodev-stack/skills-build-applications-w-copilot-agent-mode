import { useEffect, useState } from 'react';
import { apiBaseUrl, extractRecords } from '../api.js';
import ResourceView from './ResourceView.jsx';

const columns = [
  { label: 'League', key: 'name' },
  { label: 'Member / Team', render: (row) => String(row.user ?? row.team ?? '—').slice(-8) },
  { label: 'Points', key: 'points' },
];

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/leaderboard/`, { signal: controller.signal })
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
      title="Leaderboard"
      description="A little friendly competition keeps the whole club moving."
      rows={rows}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
}