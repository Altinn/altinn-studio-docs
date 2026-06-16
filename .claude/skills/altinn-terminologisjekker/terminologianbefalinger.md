# Terminologianbefalinger

**Scope:** `content/altinn-studio/v10/develop-a-service/configuration/`  
**Dato:** 2026-06-16  
**Repositorium:** altinn-studio-docs

---

## Avvik funnet

| Termforskjell | Frekvens | Kilder (fil:linje) | Begrepskatalogen | Faktagrunnlag | Beslutning mangler |
|---------------|----------|--------------------|------------------|---------------|-------------------|
| **app** vs **applikasjon** | app: 7 forekomster, applikasjon: 4 forekomster | `authorization/_index.nb.md` l.5, 9, 12, 14, 27, 31, 32, 100 | Ikke sjekket (JS-app) | Begge termer brukes om det samme konseptet (det som bygges i Altinn Studio) – i samme fil og til dels i samme setning: «Applikasjonsutvikleren definerer autorisasjonsreglene for en app» (l.9). «applikasjonsmal» og «applikasjonen» bruker den ene formen; all annen omtale bruker «app»/«appen». | Ja |
| **app** vs **tjeneste** | app/appen: 6 forekomster, tjeneste/tjenesten: 4 forekomster | `tjenestebeskrivelser/index.nb.md` l.4, 7, 9, 13, 15, 23, 25, 30, 35, 45 | Ikke sjekket (JS-app) | Begge termer brukes om det som tjenesteeieren lager i Altinn Studio. «Appen» brukes om det tekniske Altinn-artefaktet («Navn på appen», «hva appen gjør»), mens «tjenesten» brukes når man snakker om det brukerne møter («beskriver tjenesten din», «lurer på noe om tjenesten»). Skillinga er ikke konsekvent forklart og kan virke vilkårlig for leserne. | Ja |
| **fullmakt** vs **tilgang** | fullmakt: 2 forekomster, tilgang: 2 forekomster | `tjenestebeskrivelser/index.nb.md` l.11, 35 (fullmakt); l.40 (tilgang); `authorization/_index.nb.md` indirekte | Ikke sjekket (JS-app) | «Fullmakt» brukes om delegering («gi fullmakt til noen andre», «fullmakt til enkelttjenester») og «tilgang» om den faktiske tilgangen til å utføre handlinger («tilgang til å lese, fylle ut og sende inn»). Termene er delvis overlappende i brukerens perspektiv. Dokumentet forklarer ikke skillet mellom fullmakt (delegering) og tilgang (resultat av delegering). | Ja |

---

## Merknader

- **Begrepskatalogen** (data.norge.no) er en JavaScript-app og lot seg ikke hente automatisk. Manuell sjekk anbefales på:  
  https://data.norge.no/concepts?orgPath=%2FSTAT%2F932384469%2F991825827  
  Søk på: «app», «tjeneste», «fullmakt», «tilgang».

- **lesetillatelser / skrivetillatelser** i `authorization/_index.nb.md:22` er ikke tatt med som avvik. Disse beskriver rettigheter til kildekodelageret (git), ikke Altinn-autorisasjonsbegreper, og er korrekte tekniske termer i den konteksten.

- Alle tre avvik krever enighet på tvers av team – ingen er markert som åpenbare feil. Særlig skilget mellom «app» og «tjeneste» er et kjent diskusjonstema i Altinn-dokumentasjon.
