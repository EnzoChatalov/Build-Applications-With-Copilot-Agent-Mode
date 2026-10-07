import { getRecords } from './records.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

if (codespaceName && !/^[a-zA-Z0-9-]+$/.test(codespaceName)) {
  throw new Error('VITE_CODESPACE_NAME may contain only letters, numbers, and hyphens.')
}

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export { getRecords }

export async function fetchRecords(endpoint, signal, fetchImpl = fetch) {
  const response = await fetchImpl(`${apiBaseUrl}${endpoint}`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText}).`)
  }

  return getRecords(await response.json())
}
