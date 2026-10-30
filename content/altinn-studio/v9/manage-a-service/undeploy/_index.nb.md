---
title: Avpublisere apper
linktitle: Avpublisering
description: Hva som skjer når du avpubliserer en app, og hva du bør tenke på før du gjør det.
toc: true
weight: 70
tags: [Reviewed]
---

## Avpublisere apper i Altinn Studio

Når du avpubliserer en app i Altinn Studio, gjør du appen utilgjengelig for brukere ved å ta den bort fra et miljø. 
Det kan være nyttig å avpublisere når en app er utdatert og ikke skal brukes lenger. I denne artikkelen går vi gjennom 
hva som skjer når du avpubliserer, hva du bør vurdere før og etter prosessen, og hva du eventuelt heller kan velge å gjøre. Se [veiledningen for å avpublisere en app]({{< relref "/altinn-studio/v9/manage-a-service/undeploy/how-to" >}}) for stegene i Altinn Studio.

### Hva skjer når du avpubliserer en app?

Når appen er avpublisert, er den ikke tilgjengelig for brukere, verken i brukergrensesnittet eller via API-endepunktene.

- **API-endepunktene blir utilgjengelige:**  
  Når appen er avpublisert, vil API-endepunktene til den ikke lenger fungere. Dette betyr at eksterne systemer og brukere som prøver å kommunisere med appen via API-et, vil oppleve feil.

- **Aktive instanser:**  
  Brukere som fortsatt har aktive instanser av en avpublisert app, kan ikke lenger gå inn på instansen sin for å gjøre noe. Når de prøver å åpne instansen fra innboksen, møter de en feilside.

### Viktig å tenke på før du avpubliserer

Før du gjennomfører avpubliseringen, bør du vurdere hvordan du vil håndtere aktive instanser og dataene fra dem:

1. **Håndtere aktive instanser:**  
   Hvis det finnes instanser som fortsatt er i bruk (for eksempel i brukerens innboks), må du vurdere hva som skal skje med dem. Hvis du vil fjerne instansene, kan du gjøre det via appens API-er før du avpubliserer.

2. **Håndtere data etter avpublisering:**  
   Når appen er avpublisert, kan du fortsatt hente ut data, men du må bruke Storage API etter avpubliseringen. Det er fordi appens egne API-er ikke lenger er tilgjengelige.
{.floating-bullet-numbers}

### Hva kan du gjøre i stedet for å avpublisere?

Hvis du ikke vil avpublisere appen, kan du gjøre appen utilgjengelig på flere andre måter:

- **Bytte til en tidligere versjon:**  
  Hvis den nåværende versjonen av appen har feil, kan du velge å rulle tilbake til en tidligere versjon som fungerer bedre.

- **Deaktivere appen i koden:**  
  Du kan fjerne tilgang til appen i koden, slik at den blir utilgjengelig på den måten. Da slipper du å avpublisere den helt.

- **Endre tilgangsinnstillinger:**  
  Du kan justere tilgangsinnstillingene slik at brukerne ikke kan starte nye instanser av appen.

- **Legge inn en kontroll før du avpubliserer:**  
  Hvis du legger inn en kontroll i koden, kan du bestemme når brukerne skal få tilgang til appen. Dette kan være nyttig hvis du vil gi brukerne en overgangsperiode før appen blir helt utilgjengelig i miljøet.
