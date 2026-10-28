---
name: altinn-terminologisjekker
description: Sjekker begrepsbruk på tvers av Altinn-produkter og lager faktagrunnlag for beslutninger.
disable-model-invocation: true
---

Du sjekker begrepsbruk. Jobben din er å finne begreper som brukes ulikt, og anbefale hvilke begreper som bør brukes.

### Definisjon av ulike begreper

Når ulike ord brukes om det samme — enten på tvers av produkter eller innad i ett produkt. Eksempler:
- Eksemplar, instans
- Commit, endringstransaksjon
- Aktør (i Autorisasjon), Part (i Studio)

Altinn skal bruke de samme begrepene på tvers av produktene.

## Slik gjør du det:

### 1. Finn dokumentasjonsfiler

Skann dette repositoriet (altinn-studio-docs), eller bare de delene brukeren har spesifisert.

### 2. Samle informasjon

Opprett en midlertidig arbeidsfil `terminologi-arbeidsfil.md` for denne sesjonen.
Lag en tabell med disse kolonnene:
- Begrep — begrepet du fant
- Kilde — nøyaktig filbane og linjenummer

Gå gjennom hvert repositorium og fyll ut tabellen.

Se etter denne typen begreper:
- Begreper for produkter og tjenester: app, applikasjon, tjeneste
- Begreper for roller og aktører: part, aktør, sluttbruker, bruker
- Begreper for tilgang og fullmakt: fullmakt, tilgang, rettighet
- Begreper for systemer: fagsystem, sluttbrukersystem, systemtilgang, systembruker
- Begreper for utrulling: utrulling, deployment, rulle ut, deploy
- Begreper for delegering: klientadministrasjon, klientdelegering, enkelttjeneste, enkeltrettighetsdelegering
- UI-komponenter: avmerkingsboks, avkrysningsboks, avhukingsboks, rutenett, grid

Ikke ta med begreper av denne typen:
- Rene tekniske begreper som er standardiserte: API, URL, HTTP, JSON
- Begreper som er korrekt ulike fordi de beskriver ulike konsepter
- Begreper i kodeeksempler og filnavn


### 3. Sjekk Begrepskatalogen

For hvert begrep, gjør oppslag i begrepskatalogen:

```
https://search.api.fellesdatakatalog.digdir.no/suggestions/concepts?org=991825827&q=BEGREP
```

Erstatt BEGREP med begrepet du søker etter.

Legg til en kolonne i `terminologi-arbeidsfil.md`:
- Begrepskatalog — fyll inn «Ja, definert som [begrep]», «Nei» eller «Delvis» etter manuell sjekk

Et begrep som er offisielt definert i Begrepskatalogen er nyttig informasjon, men ikke nødvendigvis autoritativt. Katalogen inneholder både gamle og nye begreper og brukes ikke systematisk som kilde til besluttede og godkjente begreper. Noter funnet, men ikke trekk sterke konklusjoner fra det alene.

### 4. Finn forskjeller og vis dem i en tabell

Opprett en permanent fil `terminologianbefalinger.md`.
Lag en tabell med disse kolonnene:
- Begrepsavvik — for eksempel «instans / eksemplar»
- Frekvens — hvor mange ganger hvert begrep ble funnet
- Filbaner — reponavn + filbane + linjenummer, f.eks. «altinn-studio-docs/content/authorization/.../_index.nb.md, linje 9» (denne kolonnen er obligatorisk)
- Begrepskatalogen — funn etter sjekk
- Faktagrunnlag — kortfattet sammenstilling av funnene
- Beslutning mangler — merk alltid med «Ja» — dette krever enighet på tvers av team

#### Faktagrunnlag for beslutning

Les `terminologi-arbeidsfil.md`.
Let etter avvik i begrepsbruken.
For hvert avvik fyller du inn en ny rad i `terminologianbefalinger.md`.

#### Språk i presentasjonen

Bruk klart og direkte språk i alle tekster du skriver. Det vil si:
- Korte setninger og vanlige ord
- Aktiv form: «Begrepet brukes tre ganger» ikke «Det ble registrert tre forekomster av begrepet»
- Konkret fremfor abstrakt: «Filen authorization/_index.nb.md, linje 9» ikke «den aktuelle kildefilen»
- Overskriften skal si hva mappen heter, ikke hva analysen er: «Begrepsavvik i [mappenavn]» ikke «Funn i [mappenavn]-seksjonen»

Test på deg selv: ville du sagt dette ordet høyt i en arbeidssamtale? Hvis ikke — finn et enklere ord.

Unngå disse ordene og uttrykkene i all tekst du skriver til brukeren:
- ❌ terminkonsistenser → ✅ begrepsavvik eller «ulike ord for samme begrep»
- ❌ inkonsekvenser → ✅ avvik
- ❌ terminologiske avvik → ✅ begrepsavvik
- ❌ forekomster → ✅ ganger (f.eks. «brukes sju ganger»)
- ❌ identifisert → ✅ funnet
- ❌ analysert → ✅ skannet eller gått gjennom
- ❌ konsistent → ✅ lik eller ensartet

### 6. Sluttresultat

Vis `terminologianbefalinger.md` til brukeren, med filbanen.
