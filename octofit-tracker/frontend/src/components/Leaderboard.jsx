import ResourcePage from './ResourcePage.jsx'
import useApiResource from '../hooks/useApiResource.js'

const columns = [
  { label: 'Member', field: 'user.displayName' },
  { label: 'Team', field: 'team.name' },
  { label: 'Period', field: 'period' },
  { label: 'Points', field: 'score' },
  { label: 'Activities', field: 'activitiesCompleted' },
]

export default function Leaderboard() {
  const endpoint = '/api/leaderboard/'
  const { records, loading, error } = useApiResource(endpoint, fetch)
  return (
    <ResourcePage
      endpoint={endpoint}
      eyebrow="Celebrate progress"
      title="Leaderboard"
      description="See the consistency and effort adding up across your teams."
      icon="bi-trophy"
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
