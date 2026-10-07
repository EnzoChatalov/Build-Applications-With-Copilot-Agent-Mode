import ResourcePage from './ResourcePage.jsx'
import useApiResource from '../hooks/useApiResource.js'

const columns = [
  { label: 'Workout', field: 'title' },
  { label: 'Difficulty', field: 'difficulty' },
  { label: 'Duration (min)', field: 'durationMinutes' },
  { label: 'About', field: 'description' },
  { label: 'Exercises', field: 'exercises' },
]

export default function Workouts() {
  const endpoint = '/api/workouts/'
  const { records, loading, error } = useApiResource(endpoint, fetch)
  return (
    <ResourcePage
      endpoint={endpoint}
      eyebrow="Find your next session"
      title="Workouts"
      description="Choose a session that feels right for your goals and energy."
      icon="bi-lightning-charge"
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
