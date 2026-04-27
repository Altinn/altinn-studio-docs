# altinn-docs-astro

Astro-basert versjon av Altinn-dokumentasjonen. Erstatter Hugo-bygget i rot-repoet.

Designet som **multi-repo-komponering**: en `sources.config.yaml` peker på en eller flere kilder (lokale stier eller git-remotes), og hver kilde kan publisere flere versjoner ("snapshots") som tags eller branches. I MVP brukes kun `type: local` med dette repoet selv.

## Kom i gang

```bash
cd astro
npm install
npm run dev
```

Åpne http://localhost:4321/

## Scripts

- `npm run compose` — leser `sources.config.yaml`, kopierer markdown + assets fra kilder, transformerer Hugo-shortcodes til MDX, bygger nav-tree.json + versions.json.
- `npm run lint:links` — validerer interne lenker og cross-source-avhengigheter.
- `npm run dev` — kjører `compose` og starter Astro dev-server.
- `npm run build` — kjører `compose`, `lint:links`, bygger Astro, og indekserer med Pagefind.
- `npm run preview` — serverer `dist/` lokalt.

## Mappestruktur

```
astro/
├── sources.config.yaml      # Multi-repo config med snapshots
├── astro.config.mjs
├── scripts/                 # compose, transform, lint, postbuild
├── src/
│   ├── content/docs/        # Genereres av compose-content
│   ├── pages/
│   ├── layouts/
│   ├── components/
│   ├── lib/                 # sources, product-version, nav-tree, relref, i18n
│   ├── client/              # Vanilla TS for sticky-sidebar, scroll-spy, swagger
│   ├── styles/
│   └── i18n/
└── public/
```

## Versjonering

Hver kilde kan ha flere "snapshots". Tre modeller:

| Modell | Beskrivelse | Brukes nå |
|---|---|---|
| Mappestruktur | Versjoner som undermapper (`v8/`, `v10/`) | Ja (MVP) |
| Git-tag | Hver versjon er en tag i kildens repo | Senere |
| Git-branch | Hver versjon er en branch | Senere |

Se `sources.config.yaml` for eksempler.

## Hvorfor Astro?

- Kompileringstid-ferdig HTML, ingen runtime.
- MDX gir oss komponenter inline i markdown.
- Trivielt å mounte flere innholdskilder før bygg.
- Pagefind fungerer godt mot resulterende statiske filer.
