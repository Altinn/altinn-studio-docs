---
hidden: true
---

>Oppsettet i denne seksjonen gjøres fra Lage-siden i appens arbeidsflate. Naviger dit ved å trykke på "Lage" i toppmenyen
>fra appens arbeidsflate.

### Hvordan vise betalingsinformasjon i skjemaet

> Dette steget skal gjøres i sidegruppen som er tilknyttet selve skjemaet. Du kan bytte mellom sidegrupper i 
> nedtrekkslisten øverst til venstre på Lage-siden. Skjemaoppgaven som følger med appen når den opprettes er tilknyttet
> en sidegruppe som heter "form". Dersom du har lagt til andre skjemaoppgaver i prosessen, har sidegruppen samme ID som
> oppgaven i prosessen.

- Dra komponenten "Betalingsdetaljer" inn i skjemaet. Denne komponenten viser en tabell som viser elementene brukeren må betale for.
  - Komponenten ligger nederst i "Avansert" i komponentkolonnen til venstre på siden. 

  Du kan plassere denne komponenten hvor som helst i skjemaet ditt, men vi anbefaler å i det minste sette det på den siste 
  siden før brukeren blir bedt om å betale.

- For å få oppdatert ordrelinjene etter hvert som data som brukes til å beregne ordrelinjer endres, må du legge til en mapping til
datafeltene som brukes til å beregne ordrelinjene. Dette gjøres foreløpig manuelt, direkte i layout-filene:

```json
{
  "id": "paymentDetails",
  "type": "PaymentDetails",
  "textResourceBindings": {
    "title": "Oversikt over betaling",
    "description": "Her er en oversikt over hva du skal betale for."
  },
  "mapping": {
    "GoodsAndServicesProperties.Inventory.InventoryProperties": "paymentDetails"
  }
}
```

### Hvordan vise betalingsinformasjon i betalingsssteget
Dette er satt opp automatisk dersom du brukte Altinn Studio Designer og prosessverktøyet til å sette opp betalingssteget. 

### Hvordan sette opp egen visning for kvittering for betaling (valgfritt)
Dette steget er valgfritt. Dersom man ikke gjennomfører dette steget, vil oppsettet fra betalingssteget benyttes.

> Dette steget må foreløpig gjøres manuelt. Støtte for full konfigurasjon i Altinn Studio kommer i løpet av høsten 2024.
> Se "Manuelt oppsett"-fanen for denne seksjonen for veiledning.
