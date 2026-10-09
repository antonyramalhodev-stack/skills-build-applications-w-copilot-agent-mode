import { useEffect, useState } from 'react';
import { apiBaseUrl, extractRecords } from '../api.js';
import ResourceView from './ResourceView.jsx';

const columns = [
  { label: 'Workout', key: 'name' },
  { label: 'Focus', key: 'target' },
  { label: 'Level', key: 'difficulty' },
  { label: 'Duration', render: (row) => row.duration ? `${row.duration} min` : '—' },
  { label: 'Details', key: 'description' },
];

export default function Workouts() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/workouts/`, { signal: controller.signal })
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
      title="Workouts"
      description="Choose a session that fits your goals and your day."
      rows={rows}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
}