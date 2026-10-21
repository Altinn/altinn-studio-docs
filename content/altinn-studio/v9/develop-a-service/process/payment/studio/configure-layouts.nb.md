---
draft: true
hidden: true
tags: [Reviewed]
---

> Du gjør det meste av oppsettet i denne delen på siden **Utforming** i Altinn Studio. Klikk på **Utforming** i toppmenyen for å komme dit. Noe av oppsettet gjør du manuelt i layoutfilene, som beskrevet nedenfor.

### Slik viser du betalingsinformasjon i skjemaet

> Du gjør dette steget i skjemaoppgaven. Layoutfilene til oppgaven ligger i `App/ui/{taskId}/layouts/`. Skjemaoppgaven som følger med appen når du oppretter den, har ID-en `Task_1`. Hvis du har lagt til andre skjemaoppgaver i arbeidsflyten, bruker du mappen med samme ID som oppgaven.

- Legg til en komponent av typen `PaymentDetails` i layoutfilen til siden der brukeren skal se betalingen. Komponenten viser en tabell over det brukeren skal betale for. I Altinn Studio heter den **Betalingsdetaljer**, men du finner den ikke i **Velg komponent**, så du legger den til manuelt, som i eksempelet nedenfor.

  Du kan plassere komponenten hvor som helst i skjemaet, men vi anbefaler å sette den på den siste siden før brukeren skal betale.

- Appen beregner ordrelinjene ut fra data i skjemaet. Når brukeren endrer disse dataene, må appen hente ordrelinjene på nytt. Derfor legger du til datafeltene som appen bruker i beregningen, i `refetchDependencies`. Hver verdi er et uttrykk som peker på et felt i datamodellen. Du kan velge navnet på nøkkelen fritt, og appen sender ikke verdiene til serveren. Du legger dem inn i layoutfilen, som i eksempelet nedenfor:

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "paymentDetails",
  "type": "PaymentDetails",
  "textResourceBindings": {
    "title": "Oversikt over betaling",
    "description": "Her er en oversikt over hva du skal betale for."
  },
  "refetchDependencies": {
    "inventory": ["dataModel", "GoodsAndServicesProperties.Inventory.InventoryProperties"]
  }
}
```

### Slik viser du betalingsinformasjon i betalingsoppgaven
Altinn Studio setter dette opp automatisk når du legger til betalingsoppgaven i **Arbeidsflyt**.

### Slik lager du en egen kvittering for betalingen (valgfritt)
Hvis du hopper over dette steget, bruker appen oppsettet fra betalingsoppgaven i kvitteringen.

1. Klikk på **Utforming** i toppmenyen, og klikk på **Utform** på kortet **Oppgave: Betaling**. Hvis du allerede står i en oppgave, klikker du først på **Oversikt** øverst på siden for å komme tilbake til kortene.
2. Klikk på **Legg til ny side**.
3. I panelet til høyre åpner du **PDF** og klikker på **Gjør om siden til PDF**.
4. Legg til komponenten **Betaling**, og eventuelt andre tekster og komponenter du vil ha på PDF-siden.
5. Åpne utviklerverktøyet i forhåndsvisningen med knappen nederst til høyre, eller med hurtigtasten **Ctrl+Shift+K** (**⌘+Shift+K** på Mac). Klikk deretter på **Generer PDF** under **Forhåndsvis PDF**.

   ![Knappen for å åpne utviklerverktøyet nederst til høyre i forhåndsvisningen](./devtools.png "Åpne utviklerverktøyet")
