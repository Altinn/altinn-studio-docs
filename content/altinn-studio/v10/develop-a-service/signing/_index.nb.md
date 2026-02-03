---
draft: true
title: Signering
linktitle: Signering
description: Slik setter du opp signering i Altinn-appen din.
tags: [signering, needsReview, translate]
weight: 130
aliases:
- /nb/altinn-studio/guides/signing/
- /nb/altinn-studio/v8/concepts/signing/
---

## Hva er signering?

### Autentisert elektronisk signatur

Elektronisk signatur handler om sporbarhet. Det vil si at du i ettertid kan dokumentere at en bestemt person utførte en bestemt handling på et bestemt tidspunkt.

Altinn tilbyr autentisert elektronisk signatur. Dette gjør det mulig for deg som tjenesteeier å dokumentere at en identifisert person bekreftet noe på et bestemt tidspunkt. For eksempel kan sluttbruker signere for å bekrefte at opplysninger i et skjema er riktige.

#### Altinn støtter sikkerhetsnivå 3 og 4

Signeringsløsningen i Altinn støtter sikkerhetsnivå 3 eller 4. Du velger selv hvilket sikkerhetsnivå tjenesten din skal kreve. Du kan også velge lavere sikkerhetsnivå hvis du har behov for det.

#### Avansert signatur krever eksterne produkter

Altinn tilbyr autentisert signatur. Trenger du avansert signatur (med sertifikat), må du bruke eksterne produkter som 
[eSignering fra Digdir](https://samarbeid.digdir.no/esignering/esignering/22).

#### Du må vurdere hvilken signatur tjenesten din trenger

Du må vurdere hvilken type elektronisk signatur tjenesten din trenger. Vurderingen bør ta utgangspunkt i hvilke krav regelverket ditt stiller til signatur og sporbarhet.

### Slik fungerer signering i Altinn

#### Hva signeres det på?

Du velger hvilke dataelementer sluttbruker skal signere på. Du velger også hvilket sikkerhetsnivå (identifikasjonsnivå) sluttbruker må bruke når de logger inn for å signere. Tjenesten din kan ha ett eller flere signeringssteg etter hverandre.

#### Altinn oppretter et signaturobjekt når noen signerer

Når en bruker signerer, oppretter Altinn et signaturobjekt. Dette objektet inneholder

- hvilke dataelementer som ble signert
- en hash-kode av dataene

#### Hash-koden gjør det mulig å oppdage endringer

En hash-kode er en unik kode som beregnes ut fra innholdet i dataene. Hvis bare ett tegn i dataene endres, blir hash-koden en annen. Dette gjør at du kan oppdage om noen har endret dataene etter at de ble signert.

#### Altinn logger alle signeringer

Altinn logger alle signeringer. Loggen inneholder

- hvem som signerte (ID som kan kobles til fødselsnummer)
- hvilket sikkerhetsnivå personen brukte da de logget inn
- når signeringen skjedde
- hvilket steg i prosessen signeringen skjedde på

Altinn lagrer disse loggdataene adskilt fra tjenestene i en sentral database.

### Slik behandles personopplysninger ved signering

#### Altinn logger disse personopplysningene

For å sikre sporbarhet logger Altinn disse personopplysningene:

- ID til den som signerte (kan kobles til fødselsnummer)
- sikkerhetsnivå for innloggingen
- hvilket steg i prosessen signeringen skjedde på
- når signeringen skjedde

Digdir er behandlingsansvarlig for denne loggingen.

#### Du er ansvarlig for personopplysninger i tjenesten din

Du er behandlingsansvarlig for behandling av personopplysninger i tjenestene dine og skjema. Dette inkluderer signaturobjektet og tilhørende data, som inneholder ID og fødselsnummer til den som signerte. I henhold til samarbeidsavtalen er Digdir databehandler for deg.

### Slik lagres data fra signering

#### Du kan laste ned data når prosessen er ferdig

Når prosessen i Altinn er gjennomført, kan du laste ned alle data inkludert signaturobjektet. Sluttbruker får en kvittering (PDF).

#### Du kan konfigurere hvor lenge data skal lagres

Du kan konfigurere hvor lenge Altinn skal lagre instansen og dataene. Hvis du ikke konfigurerer dette, gjelder følgende:

#### Sluttbruker kan slette sin kvittering

Du kvitterer ut at du har lastet ned signaturobjektet og tilhørende data. Sluttbruker kan velge å beholde eller slette sin kvittering i innboksen.

Hvis sluttbruker sletter kvitteringen etter at du har lastet ned signaturobjektet, sletter Digdir signaturobjektet i våre systemer. Du må derfor lagre signaturobjektet og tilhørende data i egne systemer hvis du vil arkivere signaturen.

#### Altinn lagrer loggen uansett

Digdir logger at signeringen ble utført. Selv om signaturobjektet blir slettet, lagrer Digdir fortsatt loggen som viser at noen signerte.

Altinn lagrer vanlige applikasjonslogger (for feilsøking) i 90 dager. Hendelseslogger lagres i 13 måneder.

### Slik verifiserer du signaturen

#### Lagre signaturobjektet i arkivsystemet ditt

Du lagrer signaturobjektet i arkivsystemet ditt. Signaturobjektet inneholder en hash-kode av dataene.

#### Sjekk hash-koden for å oppdage endringer

Hvis noen endrer signaturobjektet i ettertid, kan du oppdage det ved å sjekke hash-koden. Hvis hash-koden ikke stemmer, betyr det at noen har endret dataene etter at de ble signert.

#### Både du og sluttbruker må ha hash-koden

For at dette skal fungere, må både du og sluttbruker ha en kopi av hash-koden. Sluttbruker får hash-koden på sin kvittering.

[Her kan du kan lese en teknisk beskrivelse for hvordan verifisering av signaturen gjøres.]({{< relref "../reference/process/tasks/signing#verifisering-av-sha256-hash" >}})

---

{{% insert "content/altinn-studio/v10/develop-a-service/signing/_setup.nb.md" %}}
