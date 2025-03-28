---
title: Avpublisere apper
linktitle: Avpublisering
description: Forklarer hva er avpublisering er og hva som skjer når du avpubliserer en app.
toc: true
weight: 70
---

## Avpublisere apper i Altinn Studio

Når du avpubliserer apper i Altinn Studio, gjør du appene utilgjengelig for brukere, ved å ta appen bort fra et miljø. Det kan være nyttig å avpublisere når en app er utdatert og ikke skal brukes lengre. I denne artikkelen går vi gjennom hva som skjer når du  avpubliserer, hva du bør vurdere før og etter prosessen, og hva du eventuelt heller kan velge å gjøre.

### Hva skjer når du avpubliserer en app?

Når appen er avpublisert er den  ikke tilgjengelig for brukere, verken i brukergrensesnittet eller via API-endepunktene.

- **API-endepunktene blir utilgjengelige:**  
  Når appen er avpublisert, vil API-endepunktene til den ikke lenger fungere. Dette betyr at eksterne systemer og brukere som prøver å kommunisere med appen via API-et, vil oppleve feil.

- **Aktive eksemplarer:**  
  Brukere som fortsatt har aktive eksemplarer av en avpublisert app, kan ikke lenger gå inn på eksemplaret sitt å gjøre noe. Når de prøver å åpne eksemplaret fra innboksen, møter de  en feilside.

### Viktig å tenke på før du avpubliserer

Før du gjennomfører avpubliseringen, bør du vurdere hvordan du vil håndtere aktive eksemplarer og dataene fra dem:

1. **Håndtere aktive eksemplarer:**  
   Hvis det finnes eksemplarer som fortsatt er i bruk (for eksempel i brukerens innboks), må du vurdere hva som skal skje med disse. Hvis du vil fjerne eksemplarene, kan du gjøre det via appens API-er før du avpubliserer.

2. **Håndtere data etter avpublisering:**  
   Når appen er avpublisert, kan du fortsatt hente ut data, men du må bruke Storage API etter avpubliseringen. Det er fordi appens egne API-er ikke lenger er tilgjengelige.

### Hva kan du gjøre i stedet for å avpublisere?

Hvis du ikke vil avpublisere appen, kan du  gjøre appen utilgjengelig på flere andre måter:

- **Bytte til en tidligere versjon:**  
  Hvis den nåværende versjonen av appen har feil, kan du velge å rulle tilbake til en tidligere versjon som fungerer bedre.

- **Deaktivere appen i koden:**  
  Du kan fjerne tilgang til appen i koden, slik at den blir utilgjengelig på den måten. Da slipper du å avpublisere den helt.

- **Endre tilgangsinnstillinger:**  
  Du kan  justere tilgangsinnstillingene slik at brukerne ikke kan starte nye eksemplarer av applikasjonen.

- **Legge inn en validering før du avpubliserer:**  
  Hvis du legger inn en validering i koden, kan du bestemme når brukerne skal få tilgang til appen. Dette kan være nyttig hvis du vil gi brukerne en overgangsperiode før appen blir helt utilgjengelig i miljøet.

### Hvordan avpubliserer jeg en app?

[Gå til veiledningen for å avpublisere apper](/nb/altinn-studio/guides/development/undeploy/).
