---
title: CustomButton
linktitle: CustomButton
description: Oversikt over CustomButton-komponenten
tags: [actions, translate-to-english]
weight: 10 # Do not change, the components will be sorted alphabetically
toc: true
---

{{% panel theme="warning" %}}
⚠️ Tilpassede handlinger er under aktiv utvikling. Denne funksjonaliteten kan ikke konfigureres direkte i Altinn Studio
ennå, og må konfigureres manuelt i JSON-filene.
{{% /panel %}}

## Introduksjon

`CustomButton`-komponenten gir en måte å definere tilpasset oppførsel knyttet til å klikke på en knapp.
Komponenten lar deg definere en liste over handlinger som vil bli utført når knappen blir klikket. Disse handlingene
er delt inn i to typer: `ClientActions` og `ServerActions`. `ClientActions` utføres på klient-siden,
og har forhåndsdefinert funksjonalitet som å navigere til en ny side. `ServerActions` utføres på server-siden,
og har helt tilpasset funksjonalitet som du definerer selv. `ServerActions` kan også returnere en liste
over `ClientActions`
som utføres etter at server-siden handlingen er ferdig.

### Anatomi
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-2247&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A2247&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>
Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.


## ClientActions

Klienthandlinger er forhåndsdefinert funksjonalitet som kan utføres på klient-siden. De kalles ved å legge til
en handling til `actions`-egenskapen til `CustomButton`-komponenten. Det er viktig å spesifisere at handlingen
er en `ClientAction` ved å sette `type`-egenskapen til `ClientAction`.
Slik gjør du det:

```json
{
  "id": "custom-button",
  "type": "CustomButton",
  "textResourceBindings": {
    "title": "custom-button-title"
  },
  "dataModelBindings": {},
  "actions": [
    {
      "id": "nextPage",
      "type": "ClientAction"
    }
  ]
}
```

Klienthandlinger kan også motta parametere. Du kan sende en parameter til en klienthandling ved å bruke `metadata`
-egenskapen.
Objektet `metadata` vil bli sendt til funksjonen som et argument. Slik gjør du det:

```json
{
  "id": "custom-button",
  "type": "CustomButton",
  "textResourceBindings": {
    "title": "custom-button-title"
  },
  "dataModelBindings": {},
  "actions": [
    {
      "id": "navigateToPage",
      "type": "ClientAction",
      "metadata": {
        "page": "page-2"
      }
    }
  ]
}
```

Det finnes en klienthandling for å lukke et underskjema. Her er det valgfritt å validere underskjemadata før lukking.
Et vanlig oppsett vil ha to knapper, f.eks. **Lukk** og **Ferdig**, der **Lukk** ikke validerer. Det vil gi brukeren
muligheten til å gå ut av et underskjema uten å måtte fylle det ut først. Slik kan du legge til disse knappene:

```json
{
  "id": "knapp-underskjema-ferdig",
  "type": "CustomButton",
  "textResourceBindings": {
    "title": "custom-button-title"
  },
  "actions": [
    {
      "type": "ClientAction",
      "id": "closeSubform",
      // Validering er valgfritt
      "validation": {
        "page": "all",
        "show": ["All"]
      }
    }
  ]
}
```

Dette er de tilgjengelige `ClientActions`:

| Funksjonsnavn    | Parametere         | Oppførsel                                           |
| ---------------- | ------------------ | --------------------------------------------------- |
| `nextPage`       | -                  | Vil navigere til neste side, hvis den eksisterer    |
| `previousPage`   | -                  | Vil navigere til forrige side, hvis den eksisterer  |
| `navigateToPage` | `{ page: string }` | Navigerer til den angitte siden hvis den eksisterer |
| `closeSubform`   | valgfri validering | Lukker underskjema og returnerer til hovedskjema    |

## ServerActions

Serverhandlinger er kan konfigureres til å gjøre hva du vil. Slik definerer du en `ServerAction`:

1. Definer en tilpasset ServerAction som implementerer IUserAction-grensesnittet:

   ```C#
   using System.Collections.Generic;
   using System.Threading.Tasks;
   using Altinn.App.Core.Features;
   using Altinn.App.Core.Models.UserAction;

   namespace Altinn.App.Actions;

   public class FillAction : IUserAction
   {
      public string Id => "fill";

      public async Task<UserActionResult> HandleAction(UserActionContext context)
      {
          // Do whatever you want here

          // Return a UserActionResult:
          var userActionResult = UserActionResult.SuccessResult(new List<ClientAction>());

          // Return an updated datamodel if any fields have changed:
          userActionResult.AddUpdatedDataModel(dataId, data);
          return userActionResult;
      }
   }
   ```

2. Registrer din tilpassede serverhandling i Program.cs-klassen
   ```C#
   services.AddTransient<IUserAction, FillAction>();
   ```
3. Legg til serverhandlingen i actions-egenskapen til CustomButton-komponenten:
   ```json
   {
     "id": "custom-button",
     "type": "CustomButton",
     "textResourceBindings": {
       "title": "custom-button-title"
     },
     "dataModelBindings": {},
     "actions": [
       {
         "id": "fill",
         "type": "ServerAction"
       }
     ]
   }
   ```

### Returnere klienthandlinger

En ServerAction kan også returnere en liste med ClientActions som vil bli utført på klient-siden etter at
server-siden handlingen er ferdig. Dette er nyttig hvis du vil navigere til en ny side etter at server-siden
handlingen er ferdig. Slik gjør du det:

```C#
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.UserAction;

namespace Altinn.App.Actions;

public class FillAction : IUserAction
{
   public string Id => "fill";

   public async Task<UserActionResult> HandleAction(UserActionContext context)
   {
       var userActionResult = UserActionResult.SuccessResult(new List<ClientAction> { ClientAction.NextPage });

       return userActionResult;
   }
}
```

## Utførelsesrekkefølge:

Handlingene utføres i den rekkefølgen de er definert i actions-egenskapen til CustomButton-komponenten.
Hvis en ServerAction returnerer en liste med ClientActions, vil disse bli utført etter at server-siden
handlingen er ferdig, og før neste handling i listen utføres. Du kan lenke sammen så mange handlinger du vil.

## Instrukser for å legge til serverAction i ønsket prosesssteg

1. Legge til serverAction i process.bpmn-filen: Åpne process.bpmn-filen for å legge til serverAction i ønsket prosesssteg, for eksempel "Task_1":

   ```xml
    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>SequenceFlow_1n56yn5</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1oot28q</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
          <altinn:actions>
            <altinn:action type="serverAction">fill</altinn:action>
          </altinn:actions>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>
   ```

2. Legge til serverAction id i ønsket steg i policy.xml-filen:
   Gå til policy.xml-filen for å legge til serverAction id på ønsket steg, for eksempel "Task_1":

   ```xml
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">fill</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
          </xacml:Match>
        </xacml:AllOf>
   ```
