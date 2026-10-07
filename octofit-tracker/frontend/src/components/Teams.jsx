import ResourcePage from './ResourcePage.jsx'
import useApiResource from '../hooks/useApiResource.js'

const columns = [
  { label: 'Team', field: 'name' },
  { label: 'About', field: 'description' },
  { label: 'Members', field: 'members' },
]

export default function Teams() {
  const endpoint = '/api/teams/'
  const { records, loading, error } = useApiResource(endpoint, fetch)
  return (
    <ResourcePage
      endpoint={endpoint}
      eyebrow="Better together"
      title="Teams"
      description="Find your crew and cheer each other on."
      icon="bi-flag"
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
