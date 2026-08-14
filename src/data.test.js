import { afterEach, describe, expect, it, vi } from 'vitest'
import { activeVenues, concerts, upcomingConcerts, venueById, venues } from './data'

afterEach(() => vi.useRealTimers())

const freeze = iso => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(`${iso}T09:00:00Z`))
}

describe('koncertdata', () => {
  it('parser hver linje til et komplet koncert-objekt', () => {
    expect(concerts.length).toBeGreaterThan(0)
    for (const c of concerts) {
      expect(c.id).toBeTruthy()
      expect(c.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(c.artist).toBeTruthy()
      expect(c.genre).toBeTruthy()
    }
  })

  it('giver hver koncert et unikt id', () => {
    expect(new Set(concerts.map(c => c.id)).size).toBe(concerts.length)
  })

  it('peger kun på spillesteder der findes', () => {
    for (const c of concerts) expect(venueById(c.venueId), c.venueId).toBeTruthy()
  })

  it('er sorteret kronologisk', () => {
    const dates = concerts.map(c => c.date)
    expect(dates).toEqual([...dates].sort())
  })
})

describe('upcomingConcerts', () => {
  it('fjerner koncerter der er overstået', () => {
    freeze('2026-10-01')
    const upcoming = upcomingConcerts()
    expect(upcoming.every(c => c.date >= '2026-10-01')).toBe(true)
    expect(upcoming.length).toBeLessThan(concerts.length)
  })

  it('tager dagens egne koncerter med', () => {
    const day = concerts[0].date
    freeze(day)
    expect(upcomingConcerts()[0].date).toBe(day)
  })

  it('er tom når hele sæsonen er spillet', () => {
    freeze('2030-01-01')
    expect(upcomingConcerts()).toEqual([])
  })
})

describe('activeVenues', () => {
  it('returnerer kun spillesteder der har koncerter i listen', () => {
    const subset = concerts.filter(c => c.venueId === 'rust')
    expect(activeVenues(subset).map(v => v.id)).toEqual(['rust'])
  })

  it('bevarer den oprindelige rækkefølge af spillesteder', () => {
    const active = activeVenues(concerts).map(v => v.id)
    expect(active).toEqual(venues.map(v => v.id).filter(id => active.includes(id)))
  })

  it('returnerer ingenting for en tom liste', () => {
    expect(activeVenues([])).toEqual([])
  })
})
