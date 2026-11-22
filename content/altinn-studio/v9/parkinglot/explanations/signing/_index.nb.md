---
title: Signering
description: Signering lar brukere bekrefte data med autentisert elektronisk signatur.
weight: 50
tags: [needsReview]
---

## Signering i Altinn Studio

Signering lar brukere bekrefte data med elektronisk signatur. I denne artikkelen forklarer vi hva signering er, hvordan det fungerer, og hva du må vite om personvern og lagring.

### Hva er elektronisk signatur?

Elektronisk signatur er knyttet til sporbarhet. Med sporbarhet kan du sannsynliggjøre at en handling ble gjennomført på et bestemt tidspunkt og knyttet til en bestemt identitet.

Signeringsløsningen i Altinn 3 er en autentisert signatur med mulighet for sikkerhetsnivå 3 eller 4. Du kan konfigurere autentiseringsnivået i den enkelte tjeneste, og du kan også velge lavere autentiseringsnivå enn 3 og 4.

**Avansert signatur:**
Hvis du ønsker avansert signatur, må du ta i bruk tredjepartsprodukter som [eSignering | Samarbeidsportalen (digdir.no)](https://samarbeid.digdir.no/esignering/esignering/22).

Som tjenesteeier må du vurdere hvilken elektronisk signatur du ønsker og har behov for i tjenestene dine. Dette ut fra hvilke krav som stilles til signatur og sporbarhet i regelverket du har ansvar for.

Du finner tekniske guider for oppsett av signering [her](/nb/altinn-studio/v8/guides/development/signing/).

### Hvordan fungerer signering?

#### Hva kan signeres?

Som tjenesteeier styrer du hvilke dataelementer brukeren skal signere. Du velger også hvilket autentiseringsnivå (identifikasjonsnivå) brukeren må logge inn med før signering (nivå 1–4). Du kan sette opp ett eller flere signeringssteg i sekvens.

#### Hva skjer når brukeren signerer?

Når brukeren signerer, skjer følgende:

1. **Appen logger signeringshandlingen**: Appen oppretter et signaturobjekt som representerer signaturen. Objektet inneholder informasjon om hvilke dataelementer som er signert.

2. **Appen lager en hash-kode**: Signaturobjektet inneholder en såkalt hash-kode av dataene. Hashing er en enveismatematisk algoritme som beregner en unik kode med utgangspunkt i dataene. Hvis bare ett tegn i dataene endres, blir hash-koden annerledes. Dette gjør det synlig hvis noen endrer data etter signering.

3. **Appen logger hendelsen**: Appen logger ID-en til den som signerte, sikkerhetsnivå for innloggingen, tidspunktet for handlingen, og hvilket steg i prosessen handlingen ble utført på.
{.floating-bullet-numbers}

Systemet lagrer loggdata knyttet til elektronisk signatur i Altinn 3 adskilt fra tjenestene i en sentral hendelsesloggdatabase.

### Personvern og lagring

#### Behandling av personopplysninger

For å sikre sporbarhet behandler systemet personopplysninger til loggformål. Systemet logger
- ID-en til den som signerte (kan kobles til fødselsnummer)
- sikkerhetsnivå for innloggingen
- hvilket steg i prosessen handlingen ble utført på
- tidspunktet for handlingen

Digdir er behandlingsansvarlig for behandling av disse personopplysningene til dette formålet.

Tjenesteeier er behandlingsansvarlig for behandling av personopplysninger i sine tjenester og skjema, og for det aktuelle signeringsobjekt og tilhørende data. I henhold til samarbeidsavtalen er Digdir databehandler for tjenesteeier.

#### Lagringstid

Etter at prosessen i Altinn 3 er gjennomført, kan du som tjenesteeier laste ned alle data inkludert signeringsobjektet. Brukeren mottar en kvittering (PDF).

Du kan konfigurere levetiden for lagring av instansen og dataene ved å konfigurere [Persistens](/nb/altinn-studio/v8/reference/data/persistence/). Hvis du ikke konfigurerer dette, gjelder følgende:

1. **Tjenesteeier kvitterer ut**: Du kvitterer ut at du har lastet ned signeringsobjekt og tilhørende data.

2. **Brukeren velger**: Brukeren kan velge å beholde eller å slette kvitteringen på signeringen i sin innboks.

3. **Hvis brukeren sletter**: Hvis brukeren sletter kvitteringen etter at du har lastet ned signeringsobjektet, sletter Digdir signeringsobjektet i våre systemer.

Du må derfor lagre signeringsobjektet og tilhørende data i dine egne systemer hvis du ønsker å arkivere signaturen.

Digdir logger at signeringshandlingen er utført. Det betyr at selv om signeringsobjektet er slettet, lagrer Digdir fortsatt loggen som viser at det er utført en signaturhandling. Vanlige applikasjonslogger (brukes til feilsøking) lagrer Digdir i 90 dager, mens hendelseslogger lagres i 13 måneder.

### Verifisering av signatur

Du lagrer signaturobjektet i ditt arkivsystem. Signaturobjektet inneholder en hash-kode av dataene som tilhører dataelementet. Hvis noen senere endrer signaturobjektet, kan du verifisere dette ved at hash-koden i signaturobjektet ikke lenger stemmer. Dette bidrar til sporbarhet for signaturobjektet.

Dette forutsetter at signaturen, det vil si hash-koden, også finnes på brukerens kvittering, slik at begge parter har hver sin kopi.

[Her kan du lese en teknisk beskrivelse for hvordan verifisering av signaturen gjøres.](/nb/altinn-studio/v8/reference/process/tasks/signing/#verifisering-av-sha256-hash)
