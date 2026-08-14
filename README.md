# +1 — koncerter i København

En React/Vite-app, hvor man finder koncerter, svarer **Jeg kommer** eller **Måske**, og deler sin offentlige koncertliste. Profiler og RSVP'er ligger i Supabase; appen bruger ikke Netlify Functions eller Netlify Blobs.

## Lokal udvikling

1. Opret et gratis Supabase-projekt.
2. Kør [`supabase/schema.sql`](supabase/schema.sql) i projektets SQL Editor.
3. Aktivér **Anonymous sign-ins** under Authentication → Providers → Anonymous.
4. Kopiér `.env.example` til `.env` og indsæt projektets URL og public anon key.
5. Kør `npm install` og `npm run dev`.

```bash
cp .env.example .env
npm install
npm run dev
npm test        # tester datalaget
npm run build   # produktionsbuild i dist/
```

Uden Supabase-variabler kører appen stadig: forsiden, spillestederne og søgningen virker, og en gul banner fortæller, at cloud-delen mangler opsætning.

## Netlify

Forbind repository'et til Netlify. `netlify.toml` sætter build-kommando, Node-version, SPA-redirect og cache-headers. Tilføj `VITE_SUPABASE_URL` og `VITE_SUPABASE_ANON_KEY` under **Site configuration → Environment variables**. Buildet er rent statisk; alle vedvarende data sendes direkte til Supabase og beskyttes af Row Level Security.

## Delelinks

En liste deles som `<værtsnavn>/<brugernavn>` — `plusen.dk/anna` i produktion, `dit-site.netlify.app/anna` under udvikling. Værtsnavnet læses fra browseren, så delekortet altid viser det link, knappen rent faktisk kopierer. SPA-redirect'et i `netlify.toml` sender ruten til `index.html`, og appen slår brugernavnet op i Supabase. Ældre links på formen `?u=<brugernavn>` virker fortsat.

## Datasikkerhed

Den public anon key må gerne ligge i browseren. SQL-politikkerne gør profiler og koncertsvar offentligt læsbare, fordi listerne skal kunne deles, men en bruger kan kun oprette, ændre og slette sin egen profil og sine egne svar.

## Projektstruktur

| Sti | Indhold |
| --- | --- |
| `src/main.jsx` | Hele UI'et — sider, komponenter og app-state |
| `src/data.js` | Spillesteder og koncertliste (statisk) + filtrering af overståede koncerter |
| `src/supabase.js` | Klient, profiler og RSVP'er |
| `src/styles.css` | Designsystemet |
| `supabase/schema.sql` | Tabeller, RLS-politikker og indeks |
| `docs/handoff-design.md` | Den oprindelige designbrief med produktkrav og tokens |
| `docs/forside-1c.html` | HTML-prototypen af forsiden (designreference, ikke en del af buildet) |

Koncertlisten i `src/data.js` er statisk og skal opdateres i hånden. `upcomingConcerts()` filtrerer automatisk afholdte koncerter fra, så listen ikke rådner mellem opdateringer.
