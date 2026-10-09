const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function extractRecords(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of ['results', 'items', 'records', 'data']) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
  }

  return payload.data && typeof payload.data === 'object'
    ? extractRecords(payload.data)
    : [];
}