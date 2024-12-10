---
title: Migrering av lenketjenester til ressursregister
linktitle: Migrering lenketjenester
description: Ressursregisteret er sentralt for de som ønsker å benytte Altinn autorisasjon til tilgangsstyring og kontroll for tjenester de drifter utenfor Altinn.
tags: [architecture, security, authorization, xacml]
weight: 1
---

I ressursregisteret kan man opprette helt nye ressurser eller basere ressurser på Altinn 2 lenketjenester.

{{% notice warning %}}
Altinn 2 lenketjenester hvor Altinn tilbyr oppstartskontroll vil ikke videreføres.

Det betyr at de som i dag bruker oppstartskontroll må selv implementere dette i sine løsninger og lenke brukeren direkte til sin løsning, for eksempel fra Altinn tjenestekatalog.
{{% /notice %}}

### Import fra Altinn 2 lenketjenester

Hvis man har eksisterende lenketjenester i Altinn 2 som benyttes for ekstern autorisasjon, må disse flyttes over til ressursregisteret i Altinn 3-plattformen.

I Altinn Studio kan man velge å opprette nye ressurser basert på eksisterende lenketjenester. 

**Denne funksjonen er essensiell hvis man ønsker å migrere eksisterende delegeringer for eksisterende Altinn 2-tjeneste slik at de også gjelder for ny ressurs i Altinn 3.**

Velg "Importer ressurs".

![Migration](/authorization/what-do-you-get/resourceregistry/migration/migrationstep1.png "Migration")

Gi ID som skal benyttes i Altinn ressursregisteret. Denne ID vil være sentral.

![Migration](/authorization/what-do-you-get/resourceregistry/migration/migrationstep2.png "Migration")

Når man trykker "Import", opprettes det en ny ressurs i Altinn Studio i organisasjonens repository.

Da ressursregisteret krever mer komplette data enn hva som var mulig å sette i Altinn 2, må du fylle ut ekstra verdier:

- Tittel på Bokmål, Nynorsk og Engelsk
- Delegeringstekst på Bokmål, Nynorsk og Engelsk
- Beskrivelse på Bokmål, Nynorsk og Engelsk
- Kontaktinformasjon for tjenesten (vil kunne vises i tjenestekatalog)

![Migration](migrationstep3.png "Migration")

#### Tilgangsregler

Ved import opprettes det tilgangsregler lik de som var i Altinn 2.

Det bør også legges til relevante tilgangspakker for å gjøre tjenesten klar for overgang til tilgangspakker fra Altinn roller.

![Migration](migrationstep4.png "Migration")

{{% notice warning %}}
For at migrering av delegering skal fungere, er det viktig at policy inneholder de reglene som finnes i Altinn 2. Man kan for eksempel ikke fjerne signeringsregel hvis dette var en del av tjenesten i Altinn 2.
{{% /notice %}}

#### Publisering

Når egenskaper med ressursen er komplett, kan den publiseres til testmiljø eller produksjon.

#### Endring av API-integrasjon

For å gjøre tilgangskontroll på brukere i eksterne tjenester, må tjenesteeier gjøre kall mot Altinn tilgangskontroll (PDP) for å sjekke tilgang. Dette gjøres via et API basert på XACML-standarden.

Forespørselen inneholder:

- Informasjon om hvem som ønsker å utføre forespørselen
- Hvilken type ressurs det er snakk om og hvem som er part for den ressursen
- Hvilken operasjon sluttbruker ønsker å utføre

I en forespørsel kan man spørre om flere ting samtidig ved behov.

#### Migrering av delegeringer

For de fleste lenketjenester finnes det [aktive delegeringer i Altinn 2](https://github.com/Altinn/altinn-access-management/issues/579). Dette er rettigheter som er gitt fra en aktør til en person eller organisasjon.

For at disse brukerne skal ha fortsatt tilgang etter en overgang til ressursregisteret, må rettighetene migreres over.

I Altinn Studio kan man på tjenester som er laget **basert på en importert ressurs fra Altinn 2** starte en batch som:

- Deaktiverer Altinn 2-tjenesten slik at ingen endring på delegering kan utføres.
- Kopierer over delegeringene til ny ressurs i Altinn 3.

Foreløpig er denne funksjonen gjemt bak et feature flag i Altinn Studio.

```javascript
localStorage.setItem('featureFlags', "[\"resourceMigration\"]")
```

Kjør kommandoen over i konsollen på nettleseren (tilgjengelig via utviklerverktøy).

Ved å starte batchjobben vil det ta ca. 10 minutter før jobben starter. Det første jobben gjør er å deaktivere tjenesten før den kjører migreringen til Altinn 3.

Tjenesten må være migrert til det miljøet du skal migrere delegeringer i. Vi anbefaler på det sterkeste å teste dette i TT02 før jobben kjøres i Altinn 3.

![Migrate](migrationstep5.png "Migreringsvalg i Altinn Studio")

![Migrate](migrationstep6.png "Migreringsvalg i Altinn Studio")

I etterkant av kjøringen vil delegeringene være overført. Dette må foreløpig sjekkes manuelt da telling ikke er tilgjengelig enda.

Her håper vi på tilbakemeldinger fra tjenesteeiere for å tilpasse prosessen.

##### Opprette referanse til Altinn 2-tjeneste

Hvis man har opprettet en ressurs i Altinn 3 ressursregister uten å bruke importfunksjonaliteten, kan man legge på referanse manuelt.

Dette kan gjøres ved følgende fremgangsmåter:

**Endre ressursfil i Gitea**

Formatet på det som må legges til er som følger:

```json
"resourceReferences": [
    {
        "referenceSource": "Altinn2",
        "reference": "5600",
        "referenceType": "ServiceCode"
    },
    {
        "referenceSource": "Altinn2",
        "reference": "100",
        "referenceType": "ServiceEditionCode"
    },
    {
        "referenceSource": "Altinn2",
        "reference": "https://test.landbruksdirektoratet.no/disko/soker",
        "referenceType": "Uri"
    }
]
```

Dette kan legges til ved å redigere ressursen i Gitea. Husk å bruke riktig tjenestekoder og URL.
