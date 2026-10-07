import ResourcePage from './ResourcePage.jsx'
import useApiResource from '../hooks/useApiResource.js'

const columns = [
  { label: 'Member', field: 'user.displayName' },
  { label: 'Activity', field: 'activityType' },
  { label: 'Duration', field: 'durationMinutes' },
  { label: 'Distance (km)', field: 'distanceKilometers' },
  { label: 'Calories', field: 'caloriesBurned' },
  { label: 'Completed', field: 'completedAt' },
]

export default function Activities() {
  const endpoint = '/api/activities/'
  const { records, loading, error } = useApiResource(endpoint, fetch)
  return (
    <ResourcePage
      endpoint={endpoint}
      eyebrow="Move every day"
      title="Activities"
      description="See the workouts and movement your community has logged."
      icon="bi-activity"
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
