---
title: Avpublisere apper
linktitle: Avpublisering
description: Forklarer hva er avpublisering er og hva som skjer når du avpubliserer en app.
toc: true
weight: 70
---

## Avpublisering av applikasjoner i Altinn Studio

Avpublisering av applikasjoner i Altinn Studio innebærer å gjøre applikasjonen utilgjengelig for brukere, med å ta den bort fra et miljø. Avpublisering kan være aktuelt når applikasjonen er utdatert, og ikke skal brukes lengre. I denne artikkelen går vi gjennom hva som skjer ved avpublisering, hva du bør vurdere før og etter prosessen, og hvilke alternative handlinger du kan vurdere.

### Hva skjer når du avpubliserer en app?

Når applikasjonen er avpublisert, vil den ikke være tilgjengelig for brukere. Dette påvirker både applikasjonens tilgjengelighet via brukergrensesnittet og API-endepunktene.

- **API-endepunktene blir utilgjengelige:**  
  Når appen er avpublisert, vil API-endepunktene til applikasjonen ikke lenger fungere. Dette betyr at eksterne systemer og brukere som prøver å kommunisere med appen via API-et, vil oppleve feil.

- **Aktive eksemplarer:**  
  Brukere som fortsatt har aktive eksemplarer av applikasjonen, vil ikke kunne interagere med disse om applikasjonen er avpublisert. Hvis eksemplarene ikke er fjernet før avpubliseringen, vil brukerne møte en feilside når de forsøker å åpne dem fra innboksen.

### Viktig å tenke på før du avpubliserer

Før du gjennomfører avpubliseringen, bør du vurdere hvordan aktive instanser og data skal håndteres:

1. **Håndtering av aktive eksemplarer:**  
   Hvis det finnes aktive eksemplarer (for eksempel i brukerens innboks) som fortsatt er i bruk, må du vurdere hva som skal skje med disse. Ønsker du å fjerne eksemplarene, kan dette gjøres via appens API-er før du avpubliserer.

2. **Datahåndtering etter avpublisering:**  
   Når appen er avpublisert, kan du fortsatt hente ut data, men dette kan kun gjøres via Storage API etter avpublisering. Appens egne API-er vil ikke være tilgjengelige.

### Alternative løsninger i stedet for å avpublisere

Hvis du ønsker å unngå å avpublisere appen, finnes det flere alternative metoder for å gjøre appen utilgjengelig:

- **Bytte til en tidligere versjon:**  
  Dersom den nåværende versjonen av appen har feil, kan du velge å rulle tilbake til en tidligere versjon som fungerer bedre.

- **Deaktivere appen i koden:**  
  Du kan fjerne tilgang til appen i koden, slik at den ikke er tilgjengelig uten å måtte avpublisere den helt.

- **Endre tilgangsinnstillinger:**  
  Ved å justere tilgangsinnstillingene kan du hindre at brukerne starter nye eksemplarer av applikasjonen.

- **Implementere validering før avpublisering:**  
  En annen tilnærming er å implementere validering i koden, som bestemmer når brukerne kan få tilgang til appen. Dette kan være nyttig dersom du ønsker å gi en overgangsperiode før appen blir helt utilgjengelig i miljøet.

### Hvordan avpublisere appen?

[Gå til guide som forklarer hvordan avpublisere en app](/nb/altinn-studio/guides/development/undeploy/).
