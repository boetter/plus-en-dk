import { describe, expect, it } from 'vitest'
import { slug } from './slug'

// Brugernavne skal matche databasens check: ^[a-z0-9][a-z0-9-]{1,30}$
const GYLDIGT = /^[a-z0-9][a-z0-9-]{1,30}$/

describe('slug', () => {
  it('oversætter æ, ø og å i stedet for at smide dem væk', () => {
    expect(slug('Smøgmænd')).toBe('smoegmaend')
    expect(slug('MØL')).toBe('moel')
    expect(slug('Jacob Bøtter')).toBe('jacob-boetter')
  })

  it('fjerner accenter der kan dekomponeres', () => {
    expect(slug('Rita Payés')).toBe('rita-payes')
    expect(slug('Donny Benét')).toBe('donny-benet')
  })

  it('samler tegnsætning og mellemrum til enkelte bindestreger', () => {
    expect(slug('Kurt Vile & The Violators')).toBe('kurt-vile-the-violators')
    expect(slug('  Anna  ')).toBe('anna')
  })

  it('beholder tal', () => {
    expect(slug('6LACK')).toBe('6lack')
  })

  it('holder sig inden for databasens længdegrænse', () => {
    const s = slug('En umådeligt lang koncerttitel som fortsætter og fortsætter')
    expect(s.length).toBeLessThanOrEqual(30)
    expect(s).toMatch(GYLDIGT)
  })

  it('producerer gyldige brugernavne for almindelige danske navne', () => {
    for (const n of ['Anna', 'Søren', 'Åse Møller', 'Jacob']) expect(slug(n)).toMatch(GYLDIGT)
  })
})
