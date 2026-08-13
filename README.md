# Handoff: +1 — koncert-delingssite for København (design "Riso møder internettet")

## Overview
**+1** (arbejdstitel, tiltænkt plusen.dk) er et simpelt website hvor man kan se kommende koncerter i København og nærmeste omegn, markere sig som deltager ("+1 Jeg kommer!") eller give et blødt ja ("Måske…"), og bagefter rate koncerten. Kerneloopet: du sender ét link (fx `plusen.dk/jacob`) til dine venner; de ser hvad du skal se, og kobler sig på ("jeg tager sgu da lige med til Portishead").

## Om designfilerne
Filerne i denne pakke er **designreferencer bygget i HTML** — prototyper der viser tilsigtet udseende og adfærd, ikke produktionskode. Opgaven er at **genskabe designet i målkodebasens eksisterende miljø** (React, Vue, Svelte, native …) med dens etablerede mønstre og biblioteker. Findes der endnu ingen kodebase: vælg det mest passende framework til et lille socialt web-produkt (SSR-venligt, delbare URL'er er kernen) og implementér designet dér.

## Fidelity
**High-fidelity for forsiden**: `forside-1c.html` er den valgte visuelle retning — genskab pixel-tro (farver, typografi, borders, skygger, rotationer, animationer). Øvrige skærme (spillested, profil, koncert, login) er **endnu ikke designet**; byg dem i samme designsystem ud fra kravene og tokens herunder.

## Produktkrav
1. **Uden login**: alt indhold kan ses — koncertlister, spillesteder, andres profiler via delelink.
2. **Med login**: man kan markere koncerter og får en profil. Login-væg først i det øjeblik man trykker "+1" eller "Måske" som udlogget.
3. **To slags ja**: hårdt ja = "+1 Jeg kommer!" og blødt ja = "Måske…". Begge kan togles af/på og skiftes imellem.
4. **Spillestedssider**: åbn fx Store VEGA og se deres kommende koncerter; hurtig +1 direkte fra listen.
5. **Profil = delelinket** (`plusen.dk/<brugernavn>`): kommende koncerter (kommer/overvejer), historik (har set), og ratings. Dette er produktets primære delte artefakt.
6. **Rating efter afholdt koncert**: score **1–10** + **kort dom** (én linje, vises i »citationstegn«, fx `9/10 »svedigt«`). Kan kun gives af deltagere, efter koncertdatoen.
7. **Socialt lag**: på en koncert vises hvilke venner der kommer/overvejer ("3 venner kommer"). Venskab kan i v1 være envejs/følg-baseret — afklar med produktejer.

## Skærme

### 1. Forside (designet — se `forside-1c.html`)
- **Formål**: opdag kommende koncerter, hurtig +1, indgang til spillesteder og eget delelink.
- **Layout** (desktop, 1000px referencebredde; skal være responsiv, mobil er vigtigste delemål):
  - **Marquee-bånd** øverst: pink #FF48B0, 7px lodret padding, hvid tekst 13px, uendeligt scrollende (CSS keyframes `translateX(0 → -50%)`, 18s linear infinite, indholdet duplikeret ×2).
  - **Header**: logo "+1" (Bricolage Grotesque 800, 40px, blå #0078BF med text-shadow `3px 2px 0 #FF48B0`); nav (13px uppercase, aktivt punkt = sort baggrund/hvid tekst); "Log ind"-knap (gul #FFE800, 2.5px sort border, hård skygge `3px 3px 0 #221E1A`, roteret -1.5°). Bund-border 2.5px solid.
  - **Hero, 2 kolonner**: venstre H1 66px/1.0 Bricolage 800, letter-spacing -1.5px, "Se hvad dine venner *skal se.*" (sidste ord blåt); halftone-cirkel bag (radial-gradient prikker, 8px grid, pink 40%); underlinje 14px/1.7 maks 400px; to CTA'er (primær pink m. hård skygge, sekundær dashed border). Højre: **profil-delekort** 320px, roteret 2°, "tape"-strimmel øverst (gul, halvgennemsigtig), avatar-cirkel, "Jacobs liste", `plusen.dk/jacob`, statistik-linjer, sort "Kopiér dit link ⎘"-knap; 8-takket **spinnende stjerne-sticker** "DEL MIG!" i hjørnet (to kvadrater 92px, gul, keyframes 0→360° og 45→405°, 12s, teksten roterer IKKE med).
  - **Spillesteds-filterchips**: pill-form (radius 99px), 2px border; aktiv = sort fyldt. "Alle / Store VEGA / Pumpehuset / Loppen / Rust / Hotel Cecil / + 12 flere".
  - **Koncertliste**: rækker adskilt af 2.5px solid top-border. Kolonner: dato (92px, blå, 13px, format "FRE 21.08"), titel (Bricolage 800, 28px) + metadata-linje 12.5px ("Spillested · genre · pris kr" + evt. social linje i pink "3 venner kommer"), handlingsknapper til højre.
  - **Knaptilstande** (vigtigt):
    - +1 default: pink baggrund, hvid tekst, "+1 Jeg kommer!", let rotation ±1°, hård skygge.
    - +1 aktiv: blå baggrund, "✓ Du kommer!".
    - Måske default: dashed 2.5px border, transparent, "Måske…".
    - Måske aktiv: gul baggrund, solid border, "Måske ✓".
    - Afholdt koncert: titel gennemstreget (3px pink linje), datofelt viser "AFHOLDT" i pink, rating-badge i stedet for knapper: hvidt kort, `9/10` i Bricolage 18px + dom i »guillemets«.
  - **Footer**: top-border 2.5px, 12.5px, venstre "+1 · koncerter i KBH & omegn", højre blå "gratis at sige ja ✶ plusen.dk".

### 2. Spillested (ikke designet — samme system)
Hero med spillestedets navn (stor Bricolage 800), adresse/bydel, evt. halftone-dekoration i én accentfarve; derunder samme koncertliste-komponent som forsiden, filtreret til stedet. Hurtig +1 pr. række.

### 3. Profil / delelink `plusen.dk/<navn>` (ikke designet — samme system)
Offentlig side. Delekortet fra forsiden som hero (navn, avatar, statistik). Tre sektioner: **Kommer** (hårde ja), **Overvejer** (bløde ja), **Har set** (historik med ratings `score/10 »dom«`). Besøgende venner kan +1'e sig direkte på rækkerne (login-væg hvis udlogget). "Kopiér dit link"-knap for ejeren.

### 4. Koncertside (valgfri i v1)
Detaljer + deltagerliste (hvem kommer/overvejer). Kan i v1 være et udvidet listerække-panel.

### 5. Login
Simpelt (magic link eller social login). Prototypen viser kun knappen; flowet er frit, men skal være hurtigst muligt — login må aldrig koste mere end ét klik + e-mail.

## Interaktioner & adfærd
- +1 / Måske: optimistisk toggle, gensidigt eksklusive (et tryk på den ene rydder den anden). Udlogget tryk → login-væg → handlingen gennemføres efter login.
- Marquee: pauser ved `prefers-reduced-motion`. Samme gælder stjerne-spin.
- Hover på knapper/links: let opacity-dæmpning (.75) eller skygge-forskydning; ingen bløde fades over 150ms — universet er "hårdt".
- Rotationer (±0.8–2°) og hårde skygger er en del af identiteten — brug transform, aldrig billeder.
- Efter koncertdato: deltagerens række skifter til afholdt-tilstand og beder om rating (score 1–10 + dom, maks ~40 tegn).
- Responsivt: mobil stabler hero-kolonnerne (delekort under tekst), koncertrækker bryder til to linjer (dato+titel / meta+knapper). Touch-mål min. 44px.

## State & datamodel
- `User { id, username (unik, udgør delelink), displayName, avatarInitial/farve }`
- `Venue { id, navn, bydel, slug }`
- `Concert { id, artist, venueId, dato, genre, pris, status: kommende|afholdt }`
- `RSVP { userId, concertId, type: going|maybe, createdAt }`
- `Rating { userId, concertId, score 1–10, verdict string, createdAt }` — kræver RSVP type going + concert afholdt
- Følg/venner: `Follow { followerId, followedId }` (afklar omfang)
- Klient-state: aktiv filterchip, optimistiske RSVP-toggles, login-status.

## Design tokens
**Farver**
- Papir (baggrund): `#F6F2E8`
- Blæk (tekst/borders): `#221E1A`
- Pink (primær handling, socialt): `#FF48B0`
- Blå (sekundær, links, datoer, aktivt ja): `#0078BF`
- Gul (måske, stickers, log ind): `#FFE800`
- Kort-hvid: `#FFFDF6`
- Skygge-transparenter: `rgba(0,120,191,.35)` (blå), `rgba(255,72,176,.5)` (pink)

**Typografi**
- Display: **Bricolage Grotesque** 800 (Google Fonts) — H1 66px/1.0 (-1.5px), koncerttitler 28px/1.1, logo 40px, kort-tal 18px
- Brød/UI: **DM Mono** 400/500 (Google Fonts) — brød 14px/1.7, meta 12.5px, knapper/nav 13px, mikro 11.5px
- Ingen andre fonte. Uppercase i nav/marquee.

**Form**
- Border-radius: 0 overalt, undtagen pills (99px) og avatarer (50%)
- Borders: 2.5px solid blæk (primær), 2px på chips, dashed = blød/sekundær handling
- Skygger: hårde, ingen blur — `3px 3px 0`, `4px 4px 0` (knapper), `8px 8px 0` (kort)
- Rotationer: ±0.8–2° på knapper/kort/stickers
- Halftone: `radial-gradient(circle, <farve 40%> 1.6px, transparent 2px)`, background-size 8px
- Stjerne-sticker: to kvadrater oveni hinanden forskudt 45°, spinner (12s linear); tekstlag roterer ikke
- Marquee: keyframes `translateX(0 → -50%)`, indhold duplikeret, 16–20s

## Assets
Ingen billedfiler. Google Fonts (Bricolage Grotesque, DM Mono). Symboler er unicode-tegn: ✶ ⎘ ✓ » «. Artistnavne i referencen er opdigtede; spillesteder er ægte københavnske.

## Files
- `forside-1c.html` — high-fidelity designreference for forsiden (selvstændig fil, åbn i browser)
