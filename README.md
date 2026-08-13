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
```

## Netlify

Forbind repository'et til Netlify. `netlify.toml` sætter build-kommando og SPA redirect. Tilføj `VITE_SUPABASE_URL` og `VITE_SUPABASE_ANON_KEY` under **Site configuration → Environment variables**. Buildet er rent statisk; alle vedvarende data sendes direkte til Supabase og beskyttes af Row Level Security.

## Datasikkerhed

Den public anon key må gerne ligge i browseren. SQL-politikkerne gør profiler og koncertsvar offentligt læsbare, fordi listerne skal kunne deles, men en bruger kan kun oprette, ændre og slette sin egen profil og sine egne svar.
