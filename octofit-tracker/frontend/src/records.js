export function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'items', 'data']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
    for (const nestedKey of ['results', 'items']) {
      if (Array.isArray(payload?.[key]?.[nestedKey])) {
        return payload[key][nestedKey]
      }
    }
  }

  throw new Error('The API response did not contain a list of records.')
}
