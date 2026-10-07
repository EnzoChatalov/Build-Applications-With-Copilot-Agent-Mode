import ResourcePage from './ResourcePage.jsx'
import useApiResource from '../hooks/useApiResource.js'

const columns = [
  { label: 'Member', field: 'displayName' },
  { label: 'Username', field: 'username' },
  { label: 'Email', field: 'email' },
  { label: 'Team', field: 'team.name' },
  { label: 'About', field: 'bio' },
]

export default function Users() {
  const endpoint = '/api/users/'
  const { records, loading, error } = useApiResource(endpoint, fetch)
  return (
    <ResourcePage
      endpoint={endpoint}
      eyebrow="Your community"
      title="Members"
      description="Meet the people showing up, moving more, and making progress."
      icon="bi-people"
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
