---
title: CustomButton
linktitle: CustomButton
description: Oversikt over CustomButton-komponenten
tags: [ actions, translate-to-english ]
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

Dette er de tilgjengelige `ClientActions`:

| Funksjonsnavn    | Parametere         | Oppførsel                                           |
|------------------|--------------------|-----------------------------------------------------|
| `nextPage`       | -                  | Vil navigere til neste side, hvis den eksisterer    |
| `previousPage`   | -                  | Vil navigere til forrige side, hvis den eksisterer  |
| `navigateToPage` | `{ page: string }` | Navigerer til den angitte siden hvis den eksisterer |

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
   