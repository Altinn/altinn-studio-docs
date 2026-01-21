---
title: Button (Knapp)
linktitle: Button (Knapp)
description: Knapper lar brukere utføre handlinger og navigere gjennom skjemaer.
schemaname: Button # Komponentens schema-navn, brukes for å automatisk generere liste med egenskaper fra komponentens JSON schema (erstatt med riktig navn i henhold til schema)
weight: 10 # Ikke endre, komponentene sorteres alfabetisk
toc: true
---

{{% notice warning %}}
🚧 Denne dokumentasjonen er under oppdatering.
{{% /notice %}}

---

## Button

`Button`-komponenten er standardknappen som brukes for skjemainnsending og generelle handlinger.

### Bruk

- Det skal kun være en hovedknapp per side. Sekundærvalg kan legges til som sekundærknapper, de ser ut som lenker.
- Teksten på knappen skal være tydelig.
- På siste steg i skjemaet (innsending) skal hovedknappen være grønn.

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="270" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=113-7797&viewport=621%2C1853%2C0.97&scaling=contain&content-scaling=responsive&starting-point-node-id=113%3A7797&embed-host=share" allowfullscreen></iframe>
Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

## Button Egenskaper

Følgende er en automatisk generert liste over egenskapene som er tilgjengelige for `Button` basert på komponentens JSON schema-fil (se lenke nedenfor).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter, og listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

{{% component-props %}}

## Button Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio Designer med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her, og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/v8/getting-started/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          // Basic component (required properties)
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

---

## ActionButton

`ActionButton`-komponenten gir en måte å utløse spesifikke handlinger på.

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=113-7787&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=113%3A7787&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

## ActionButton Egenskaper

Følgende er en automatisk generert liste over egenskapene som er tilgjengelige for `ActionButton` basert på komponentens JSON schema-fil (se lenke nedenfor).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter, og listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

{{% component-props "ActionButton" %}}

## ActionButton Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio Designer med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her, og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/v8/getting-started/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "action-button",
          "type": "ActionButton"
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

---

## CustomButton

`CustomButton`-komponenten gir en måte å definere tilpasset oppførsel knyttet til klikking på en knapp.

{{% panel theme="warning" %}}
⚠️ Tilpassede handlinger er under aktiv utvikling. Denne funksjonaliteten er ikke konfigurerbar direkte i Altinn Studio
ennå, og må konfigureres manuelt i JSON-filene.
{{% /panel %}}

### Introduksjon

Komponenten lar deg definere en liste over handlinger som vil bli utført når knappen klikkes. Disse handlingene
er separert i to typer: `ClientActions` og `ServerActions`. `ClientActions` utføres på klientsiden,
og har forhåndsdefinert funksjonalitet som å navigere til en ny side. `ServerActions` utføres på serversiden,
og har helt tilpasset funksjonalitet som du definerer selv. `ServerActions` kan også returnere en liste over `ClientActions`
som utføres etter at serverhandlingen er ferdig.

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=113-7792&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=113%3A7792&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

### ClientActions

Klienthandlinger er forhåndsdefinert funksjonalitet som kan utføres på klientsiden. De kalles ved å legge til
en handling til `actions`-egenskapen til `CustomButton`-komponenten. Det er viktig å spesifisere at handlingen
er en `ClientAction` ved å sette `type`-egenskapen til `ClientAction`.
Dette er hvordan du gjør det:

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

Klienthandlinger kan også motta parametere. Du kan sende en parameter til en klienthandling ved å bruke `metadata`-egenskapen.
Objektet `metadata` vil bli sendt til funksjonen som et argument. Dette er hvordan du gjør det:

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

En klienthandling eksisterer for formålet med å lukke et underskjema. Du kan legge til alternativet for å validere før avslutning. Et standard
bruksområde vil være å ha to knapper i underskjemaet, f.eks. **Avslutt** og **Ferdig**, hvor **Avslutt** ikke vil validere. Dette
vil tillate brukeren å returnere til hovedskjemaet uten å måtte fylle ut underskjemaet. Dette er hvordan du vil legge til en knapp
med denne handlingen:

```json
{
  "id": "close-subform-done",
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

| Funksjonsnavn    | Parametere          | Oppførsel                                         |
| ---------------- | ------------------- | ------------------------------------------------ |
| `nextPage`       | -                   | Vil navigere til neste side, hvis den eksisterer     |
| `previousPage`   | -                   | Vil navigere til forrige side, hvis den eksisterer |
| `navigateToPage` | `{ page: string }`  | Navigerer til den spesifiserte siden hvis den eksisterer     |
| `closeSubform`   | valgfri validering | Lukker underskjemaet og returnerer til hovedskjemaet  |

### ServerActions

Serverhandlinger er helt tilpasset, og kan konfigureres til å gjøre hva du vil. Dette er hvordan du definerer
en `ServerAction`:

1. Definer en tilpasset ServerAction som implementerer `IUserAction`-grensesnittet:

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
          // Gjør hva du vil her

          // Returner en UserActionResult:
          var userActionResult = UserActionResult.SuccessResult(new List<ClientAction>());

          // Returner en oppdatert datamodell hvis noen felt har endret seg:
          userActionResult.AddUpdatedDataModel(dataId, data);
          return userActionResult;
      }
   }
   ```

2. Registrer din tilpassede serverhandling i _Program.cs_-klassen
   ```C#
   services.AddTransient<IUserAction, FillAction>();
   ```
3. Legg til serverhandlingen til `actions`-egenskapen til `CustomButton`-komponenten:
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

En `ServerAction` kan også returnere en liste over `ClientAction`s som vil bli utført på klientsiden
etter at serverhandlingen er ferdig. Dette er nyttig hvis du vil navigere til en ny side etter
at serverhandlingen er ferdig. Dette er hvordan du gjør det:

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

### Rekkefølge på utførelse

Handlingene utføres i den rekkefølgen de er definert i `actions`-egenskapen til `CustomButton`-komponenten.
Hvis en `ServerAction` returnerer en liste over `ClientAction`s, vil disse bli utført etter at serverhandlingen er ferdig,
og før neste handling i listen utføres. Du kan koble sammen så mange handlinger du vil.

### Instruksjoner for å legge til serverAction til ønsket prosesssteg

1. Legge til serverAction til "Task_1" i process.bpmn-filen:
   Åpne process.bpmn-filen og legg til serverAction til ønsket prosesssteg, som "Task_1":

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

2. Legge til serverAction id til ønsket steg i policy.xml-filen:
   Naviger til policy.xml-filen for å legge til serverAction id til ønsket steg, som "Task_1":

   ```xml
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">fill</xacml:AttributeValue>
            <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
          </xacml:Match>
        </xacml:AllOf>
   ```

---

## InstantiationButton

`InstantiationButton`-komponenten brukes til å starte en ny instans av en applikasjon.

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="270" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=547-7668&viewport=-2831%2C817%2C1.04&scaling=contain&content-scaling=responsive&starting-point-node-id=547%3A7668&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

## InstantiationButton Egenskaper

Følgende er en automatisk generert liste over egenskapene som er tilgjengelige for `InstantiationButton` basert på komponentens JSON schema-fil (se lenke nedenfor).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter, og listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

{{% component-props "InstantiationButton" %}}

## InstantiationButton Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio Designer med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her, og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/v8/getting-started/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "instantiation-button",
          "type": "InstantiationButton"
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

---

## NavigationButtons

`NavigationButtons`-komponenten gir navigasjonskontroller for å bevege seg mellom sider i et skjema.

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=538-7640&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=538%3A7640&embed-host=share" allowfullscreen></iframe>

Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

## NavigationButtons Egenskaper

Følgende er en automatisk generert liste over egenskapene som er tilgjengelige for `NavigationButtons` basert på komponentens JSON schema-fil (se lenke nedenfor).

{{% notice warning %}}
Vi oppdaterer for øyeblikket hvordan vi implementerer komponenter, og listen over egenskaper kan derfor være noe unøyaktig.
{{% /notice %}}

{{% component-props "NavigationButtons" %}}

## NavigationButtons Konfigurering

{{% notice warning %}}
Vi oppdaterer for øyeblikket Altinn Studio Designer med flere muligheter for innstillinger!
 Dokumentasjonen oppdateres fortløpende, men det kan være flere innstillinger tilgjengelig enn det som beskrives her, og noen innstillinger kan være i betaversjon.
{{% /notice %}}

### Legg til komponent

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

Du kan legge til en komponent i [Altinn Studio Designer](/nb/altinn-studio/v8/getting-started/) ved å dra den fra komponent-listen til sideområdet.
Når du velger komponenten, vises innstillingspanelet for den.

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

Grunnleggende komponent:

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="6-"}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  {
    "data": {
      "layout": [
        {
          "id": "navigation-buttons",
          "type": "NavigationButtons"
        }
      ]
    }
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

---

## PrintButton

`PrintButton`-komponenten lar brukeren skrive ut den nåværende skjemasiden.

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=238-7624&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=238%3A7624&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>

Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

`PrintButton`-komponenten kan legges til i form layout der du vil gi en mulighet til å åpne utskriftsdialogen til nettleseren.
Når knappen klikkes vil utskriftsdialogen åpne seg. Vanligvis er det en mulighet til å "Skrive ut som PDF" om ønskelig.

### Eksempel

`FormLayout.json` eksempel:

```json
{
  "id": "printButtonInfo",
  "type": "PrintButton"
}
```

Standardteksten på PrintButton er "Print / Lagre PDF".
Teksten kan bli overstyrt ved å endre tekstresurs-nøkkelen:
```json
{
  "id": "general.print_button_text",
  "value": "Skriv ut"
}
```

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="200" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=238-7624&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=238%3A7624&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

---

## ButtonGroup

`ButtonGroup`-komponenten lar deg arrangere ulike typer knapp-komponenter horisontalt.

### Bruk

### Anatomi

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="280" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=1-2244&viewport=-814%2C659%2C1.32&scaling=contain&content-scaling=responsive&starting-point-node-id=1%3A2244&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

Dette eksemplet er hentet fra <a href="https://www.figma.com/community/file/1344307804742953785/altinn-studio-komponenter" target="_blank">Altinn Studio Komponenter</a>. Merk at eksempelet ikke er identisk med den faktiske koden, men er tilpasset for å lage prototyper i Figma.

### Eksempel

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "button-group1",
        "type": "ButtonGroup",
        "children": [
          "nav-buttons",
          "submit-button"
        ]
      },
      {
        "id": "nav-buttons",
        "type": "NavigationButtons",
        "textResourceBindings": {
          "next": "Neste",
          "back": "Forrige"
        },
        "showBackButton": true
      },
      {
        "id": "submit-button",
        "type": "Button",
        "textResourceBindings": {
          "title": "Send inn"
        }
      }
    ]
  }
}
```

## ButtonGroup Konfigurering

For å konfigurere en knappegruppe, legg til en ny komponent med typen `ButtonGroup` i layout-filen før knappene du vil gruppere sammen.
Du spesifiserer hvilke knappekomponenter som skal inkluderes i knappegruppen ved å legge til ID-ene deres i knappegruppens `children`-egenskap.
Følgende komponenttyper kan legges til i en knappegruppe:

- `Button` (Send inn-knapp)
- `NavigationButtons`
- `PrintButton`
- `InstantiationButton`
<!-- - `ActionButton` -->
