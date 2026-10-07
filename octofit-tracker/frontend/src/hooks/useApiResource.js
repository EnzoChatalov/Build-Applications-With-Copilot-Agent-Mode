import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

export default function useApiResource(endpoint, fetchImpl = fetch) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        setRecords(await fetchRecords(endpoint, controller.signal, fetchImpl))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadRecords()
    return () => controller.abort()
  }, [endpoint, fetchImpl])

  return { records, loading, error }
}
