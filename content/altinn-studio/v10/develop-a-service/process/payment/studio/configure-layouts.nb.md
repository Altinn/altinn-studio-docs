---
draft: true
hidden: true
tags: [needsReview, needsTranslation]
---

>Du gjør oppsettet i denne seksjonen fra **Utforming**-siden i appens arbeidsflate. Naviger dit ved å klikke på **Utforming** i toppmenyen fra appens arbeidsflate.

### Slik viser du betalingsinformasjon i skjemaet

> Du skal gjøre dette steget i sidegruppen som er tilknyttet selve skjemaet. Du kan bytte mellom sidegrupper i nedtrekkslisten øverst til venstre på **Utforming**-siden. Skjemaoppgaven som følger med appen når du oppretter den, er tilknyttet en sidegruppe som heter "form". Hvis du har lagt til andre skjemaoppgaver i prosessen, har sidegruppen samme ID som oppgaven i prosessen.

- Dra komponenten **Betalingsdetaljer** inn i skjemaet. Denne komponenten viser en tabell som viser elementene brukeren må betale for.
  - Komponenten ligger nederst i **Avansert** i komponentkolonnen til venstre på siden.

  Du kan plassere denne komponenten hvor som helst i skjemaet ditt, men vi anbefaler å sette den på den siste siden før brukeren blir bedt om å betale.

- For å oppdatere ordrelinjene etter hvert som data som systemet bruker til å beregne ordrelinjer endres, må du legge til en mapping til datafeltene som systemet bruker til å beregne ordrelinjene. Du gjør dette foreløpig manuelt, direkte i layout-filene:

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

### Slik viser du betalingsinformasjon i betalingssteget
Systemet setter dette opp automatisk hvis du brukte Altinn Studio Designer og prosessverktøyet til å sette opp betalingssteget.

### Slik setter du opp egen visning for kvittering for betaling (valgfritt)
Dette steget er valgfritt. Hvis du ikke gjennomfører dette steget, brukes oppsettet fra betalingssteget.

1. Sjekk at det er utforming for betalingssteget som vises på **Utforming**-siden.
2. Klikk på **Legg til ny side**.
3. I konfigurasjonspanelet for siden åpner du **PDF** og klikker på **Gjør om siden til PDF**.
4. Legg til komponenten **Betaling**, og eventuelt andre tekster og komponenter du ønsker på PDF-siden.
5. Forhåndsvis PDF-visning ved å klikke på **utviklerverktøy**-knappen nederst til høyre i forhåndsvisningen ![Utviklerverktøy](../devtools.png)
   - Klikk på knappen **Forhåndsvis PDF**.
