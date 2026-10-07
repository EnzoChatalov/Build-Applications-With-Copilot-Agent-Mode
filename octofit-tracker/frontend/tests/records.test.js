import assert from 'node:assert/strict'
import test from 'node:test'
import { getRecords } from '../src/records.js'

test('accepts a plain array response', () => {
  const records = [{ id: 'member-1' }]
  assert.equal(getRecords(records), records)
})

test('accepts common paginated response shapes', () => {
  const records = [{ id: 'member-1' }]
  for (const payload of [
    { count: 1, results: records },
    { items: records, total: 1 },
    { data: records },
    { data: { results: records } },
    { data: { items: records } },
  ]) {
    assert.equal(getRecords(payload), records)
  }
})

test('reports a malformed response instead of treating it as empty', () => {
  assert.throws(() => getRecords({ results: null }), /did not contain a list/)
})
