// æ, ø og å har ingen NFD-dekomponering, så de skal oversættes eksplicit —
// ellers bliver "Smøgmænd" til "sm-gm-nd".
const DANSKE = { æ: 'ae', ø: 'oe', å: 'aa' }

export const slug = s =>
  s
    .toLowerCase()
    .replace(/[æøå]/g, c => DANSKE[c])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30)
