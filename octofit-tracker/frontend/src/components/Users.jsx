import { useEffect, useState } from 'react';
import { apiBaseUrl, extractRecords } from '../api.js';
import ResourceView from './ResourceView.jsx';

const columns = [
  { label: 'Member', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Profile', key: 'profile' },
];

export default function Users() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/users/`, { signal: controller.signal })
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
      title="Users"
      description="Meet the people building healthy habits across Octofit."
      rows={rows}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
}