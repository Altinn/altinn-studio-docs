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

1. Påse at det er utforming for betalingssteget som vises på Utforming-siden. 
2. Klikk på "Legg til ny side".
3. I konfigurasjonspanelet for siden, åpne "PDF" og klikk på "Gjør om siden til PDF".
4. Legg til komponenten "Betaling", og ev. andre tekster og komponenter du ønsker på PDF-siden.
5. Forhåndsvis PDF-visning ved å klikke på "utviklerverktøy" knappen nederst til høyre i forhåndsvisningen ![Utviklerverktøy](./devtools.png)
   - Klikk på knappen "Forhåndsvis PDF"
