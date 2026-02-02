---
draft: true
title: Validering
description: Slik legger du til logikk for å validere skjemadata.
toc: true
tags: [needsReview]
---

## Introduksjon

Valideringer sikrer at brukerens input er gyldig i henhold til datamodellen og eventuelle egendefinerte regler du setter opp for applikasjonen.
Du kan kjøre valideringer enten på klientsiden (i nettleseren) eller på serversiden.

Du kan også sette opp validering til å [kjøre ved sidebytte]({{< relref "/altinn-studio/v10/develop-a-service/reference/ux/pages/navigation/#angi-validering-ved-sidebytte" >}}).

## Klientside-validering

Klientside-validering kjører i nettleseren FØR data sendes til serveren for lagring. Dette gjør det mulig å gi raske tilbakemeldinger til brukeren underveis i utfyllingen.

Klientside-validering baserer seg på datamodellen som hører til skjemaet og bruker denne til å avgjøre hva som er gyldig input i et felt.
Konkret bruker valideringen JSON Schema-utgaven av datamodellen. Denne genereres automatisk når du laster opp XSD.
Du kan gjøre endringer i JSON Schema direkte for å tilpasse valideringen ved behov.

**Merk at hvis du gjør tilpasninger i JSON Schema manuelt og deretter oppdaterer XSD og laster inn på nytt, vil nytt
JSON Schema også genereres. Da må du gjøre alle manuelle tilpasninger på nytt. Vi anbefaler derfor å gjøre endringer i XSD og/eller datamodelleringsverktøyet
slik at endringene reflekteres i JSON Schema.**

Et eksempel på hvordan du kan definere et felt i JSON Schema datamodellen:

```json
"someField": {
  "type": "string",
  "maxLength": "4"
}
```

Input i dette feltet valideres mot begrensningene du har satt opp. En feilmelding vises hvis begrensningene ikke er oppfylt – i dette tilfellet hvis input er en tekst med mer enn fire tegn.

### Standard feilmeldinger

Det er satt opp standard feilmeldinger for alle valideringene som kjører på klientsiden:

| Regel     | Feilmelding bokmål            | Feilmelding nynorsk           | Feilmelding engelsk                   |
| --------- | ----------------------------- | ----------------------------- | ------------------------------------- |
| minimum   | 'Minste gyldig verdi er {0}'  | 'Minste gyldig verdi er {0}'  | 'Minimum valid value is {0}'          |
| maximum   | 'Største gyldig verdi er {0}' | 'Største gyldig verdi er {0}' | 'Maximum valid value is {0}'          |
| minLength | 'Bruk {0} eller flere tegn'   | 'Bruk {0} eller flere tegn'   | 'Use {0} or more characters'          |
| maxLength | 'Bruk {0} eller færre tegn'   | 'Bruk {0} eller færre tegn'   | 'Use {0} or fewer characters'         |
| length    | 'Antall tillatte tegn er {0}' | 'Antall tillatte tegn er {0}' | 'Number of characters allowed is {0}' |
| pattern   | 'Feil format eller verdi'     | 'Feil format eller verdi'     | 'Wrong format or value'               |
| required  | 'Du må fylle ut {0}'          | 'Du må fylle ut {0}'          | 'You have to fill out {0}'            |
| enum      | 'Kun verdiene {0} er tillatt' | 'Kun verdiene {0} er tillatt' | 'Only the values {0} are permitted'   |

### Standard feilmelding for påkrevde felter

For en smidigere brukeropplevelse vises ikke feilmeldinger for manglende utfylling av påkrevde felter under
utfylling av et skjema, med mindre validering trigges [på et enkeltfelt](#enkeltfeltvalidering), ved lagring
av [en rad i en repeterende gruppe](#gruppevalidering) eller
[ved navigering til en annen side]({{< relref "/altinn-studio/v10/develop-a-service/reference/ux/pages/navigation/#angi-validering-ved-sidebytte" >}}).

Feilmeldingen for påkrevde felter er _"Du må fylle ut {0}"_. Her erstattes `{0}` med feltet som feilmeldingen gjelder for.
Dette skjer på følgende måte:

- Bruker feltets `shortName`-tekst. Dette er en tekst du kan sette opp per komponent på samme måte som ledetekst (`title`). _Denne teksten brukes foreløpig KUN i forbindelse med feilmeldingen for påkrevde felter._
- Hvis `shortName` ikke er definert, bruker systemet feltets `title`-tekst (ledeteksten for feltet). Teksten gjøres om til en tekst med liten forbokstav (med mindre teksten ser ut som en forkortelse).
- I noen spesialtilfeller (Adresse-komponenten) der det er flere felter i ett, brukes standardtekstene som er definert for feltene i komponenten.

#### Eksempel: Felt med kun `title`

```json
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": {
    "title": "tekst-fornavn"
  },
  ... //osv
}
```

Og tekster i ressursfil:

```json
...
{
  "id": "tekst-fornavn",
  "value": "Fornavn"
}
```

Da blir valideringsmeldingen `"Du må fylle ut Fornavn"`.

#### Eksempel: Felt med `shortName`

Hvis feltets ledetekst er lang eller ikke egner seg til bruk i valideringsmeldingen, kan du legge til en `shortName`-tekst som brukes i stedet.
_Merk at dette kun gjelder for denne spesifikke valideringsmeldingen – `shortName`-teksten brukes ikke ellers i løsningen._

```json
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": {
    "title": "tekst-fornavn",
    "shortName": "fornavn-kort"
  },
  ... //osv
}
```

Og tekster i ressursfil:

```json
...
{
  "id": "tekst-fornavn",
  "value": "Her kan du skrive ditt fornavn",
},
{
  "id": "fornavn-kort",
  "value": "fornavnet ditt",
}
```

Da blir valideringsmeldingen `"Du må fylle ut fornavnet ditt"`.

### Erstatte feilmelding for påkrevde felter helt

Hvis du ønsker å erstatte standardfeilmeldingen for obligatoriske felt fullstendig, kan du legge til
tekstnøkkelen `requiredValidation` i komponentens `textResourceBindings`-objekt. Dette erstatter standardfeilmeldingen
for obligatoriske felt. Teksten kan være en [tekstnøkkel for en tekst som er definert i ressursfilene]({{< relref "/altinn-studio/v10/develop-a-service/reference/ux/texts/" >}})
for flerspråklig støtte.

```json
{
  "id": "firstName",
  "type": "Input",
  "textResourceBindings": {
    "title": "text-firstName",
    "requiredValidation": "myCustomRequiredValidation"
  },
  ...
}
```

### Egendefinerte feilmeldinger

Du kan definere egne feilmeldinger som vises når et felt får valideringsfeil. Dette gjør du ved å legge på en parameter `errorMessage` der
feltet er definert i JSON Schema. JSON Schema-filen ligger i mappen `App/models` og følger navnestandarden `*.schema.json`.

Du kan for eksempel utvide eksempelet over:

```json {hl_lines=[4]}
"someField": {
  "type": "string",
  "maxLength": "4",
  "errorMessage": "myCustomError"
}
```

Du kan skrive ønsket tekst direkte inn her, eller bruke en tekstnøkkel for en [tekst definert i ressursfilene]({{< relref "/altinn-studio/v10/develop-a-service/reference/ux/texts/" >}}) for språkstøtte.

Legg merke til at hvis du har en referanse til en definisjon, må feilmeldingen ligge på `property`-feltet, ikke på referansen/definisjonen.
Eksempel:

```json {hl_lines=[5]}
{
  "properties": {
    "person": {
        "$ref" : "#/definitions/personDefinition",
        "errorMessage": "myCustomError",
    }
  },
  "definitions": {
    "personDefinition" : {
      "age": {
        "type": "number"
      },
      ...
  }
}
```

{{% notice warning %}}
Merk at ved XSD-endringer forsvinner eventuelle egendefinerte feilmeldinger fordi JSON Schema-filen genereres på nytt fra XSD. På sikt er det planlagt at
du skal kunne sette opp egendefinerte feilmeldinger via datamodelleringsverktøyet i Altinn Studio. Foreløpig må dette gjøres manuelt.
{{% /notice %}}

## Serverside-validering

Serverside-validering kan deles i to kategorier:

- **Valideringer mot datamodell** – Disse kjører automatisk når brukeren prøver å sende inn skjemadata.
- **Egendefinerte valideringer** – Disse skriver applikasjonsutvikleren selv.
  De kjører når brukeren prøver å sende inn skjemadata eller flytte prosessen til et nytt steg.

## Legge til egendefinert validering

Egendefinerte valideringer kan deles i to kategorier: task-validering og data-validering.

- Task-validering kjører hver gang validering trigges, enten manuelt fra applikasjonen eller når brukeren prøver å flytte seg fremover i prosessen.
- Data-validering kjører hvis brukeren står på et steg som har definerte dataelementer knyttet til seg.

Validering for flytting til et nytt steg kjører _etter_ eventuell handling som gjøres i flyttingen. Dette er fordi resultatet
av handlingen kan være avgjørende for at valideringen skal bli godkjent. Hvis validering hadde skjedd før handlingen, ville det
ført til en programlåsning (soft-lock).

Du skriver valideringer i C#. Avhengig av hvilken versjon av applikasjonsmalen og NuGet-pakkene du bruker, varierer implementeringen litt. I tidligere versjoner er det en forhåndsdefinert fil med metoder der du legger inn logikken. Fra versjon 7 og fremover implementerer du et grensesnitt i en klasse du selv velger. Grensesnittet er tilfeldigvis likt den forhåndsdefinerte filen. Eksemplene som refererer til metoder er derfor de samme for alle versjoner.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
I versjon 7 har vi endret måten du gjør preutfylling med egendefinert kode. Vi bruker nå _dependency injection_ i stedet for overstyring av metoder. Hvis du tidligere plasserte koden din i _ValidationHandler_ og _ValidateTask_-metodene i _ValidationHandler.cs_-klassen, vil du se at det er mer eller mindre det samme som nå gjøres.

1. Opprett en klasse som implementerer `IInstanceValidator`-grensesnittet som ligger i `Altinn.App.Core.Features.Validation`-navnerommet.
   Du kan navngi og plassere filene i den mappestrukturen du selv ønsker i prosjektet ditt. Vi anbefaler at du bruker meningsfulle navnerom som i et hvilket som helst annet .NET-prosjekt.
2. Registrer implementeringen din i _Program.cs_-klassen
   ```C#
   services.AddTransient<IInstanceValidator, InstanceValidator>();
   ```
   Dette sørger for at koden din er kjent for applikasjonen og at den kjører når den skal.
{{</content-version-container>}}

{{<content-version-container version-label="v4, v5, v6">}}
Legg til valideringer i `ValidationHandler.cs`-filen i applikasjonsmalen.
Du kan åpne og endre filen i Altinn Studio via logikkmenyen ved å velge _Rediger valideringer_,
eller direkte i applikasjonsrepoet der filen ligger i `logic/Validation`-mappen.
{{</content-version-container>}}

{{</content-version-selector>}}

Fra dette punktet er eksemplene de samme for alle versjoner.

Gjør endringer i `ValidateData`- og `ValidateTask`-metodene.
Førstnevnte får inn et dataobjekt og sistnevnte får inn instansen og taskId.
For å legge til en valideringsfeil bruker du `AddModelError`-metoden til `validationResults`-objektet som sendes med i begge metodene.

Et eksempel på en enkel data-validering som sjekker at feltet _FirstName_ ikke inneholder verdien _1337_, når rotelementet til modellen er `Skjema`:

```C# {hl_lines=[12]}
public void ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data.GetType() == typeof(Skjema))
    {
        // Cast instance data to model type
        Skjema model = (Skjema)data;

        // Get value to test - FirstName
        string firstName = Skjema?.Person?.FirstName;

        // Check if FirstName exists, and contains the value "1337"
        if (firstName != null && firstName.Contains("1337"))
        {
            // Add validation error, with error message and list
            // of affected fields (in this case Person.FirstName)
            validationResults.AddModelError(
            "Person.FirstName",
            "Error: First name cannot contain the value '1337'."
            );
        }
    }
}
```

Se kommentarer i koden over for en forklaring på hva de ulike delene gjør.

I det andre parameteret til metoden `AddModelError`, der det står "_Error: First name cannot contain the value '1337'_", kan du bruke en tekstnøkkel for en [tekst definert i ressursfilene]({{< relref "/altinn-studio/v10/develop-a-service/reference/ux/texts/" >}}) for språkstøtte.

Et eksempel på en enkel task-validering som sjekker hvor lang tid brukeren har brukt på Task_1 og returnerer en feil hvis det har tatt lenger enn tre dager:

```C# {hl_lines=["5-6"]}
public async Task ValidateTask(Instance instance, string taskId, ModelStateDictionary validationResults)
{
  if (taskId.Equals("Task_1"))
  {
    DateTime deadline = ((DateTime)instance.Created).AddDays(3);
    if (DateTime.UtcNow < deadline)
    {
      validationResults.AddModelError("Task_1", $"Ferdigstilling av Task_1 har tatt for lang tid. Vennligst start på nytt.");
    }
  }
}
```

## Enkeltfeltvalidering

Enkeltfeltvalidering vises umiddelbart når brukeren har fylt ut et felt.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

Ved å sette `showValidations`-egenskapen på en komponent gjør du valideringsfeil synlige umiddelbart når de oppstår.

```json {hl_lines=[6]}
{
  "id": "some-input-field",
  "type": "Input",
  "textResourceBindings": {...},
  "dataModelBindings": {...},
  "showValidations": ["AllExceptRequired"]
}
```

Hvor `showValidations` inneholder et sett med valideringstyper som skal sjekkes. Dette kan være én eller flere av:

- `Schema`
- `Component`
- `Expression`
- `CustomBackend`
- `Required`
- `AllExceptRequired`
- `All`

**NB**: `"showValidations": ["AllExceptRequired"]` brukes som standard hvis egenskapen ikke er satt.
For å unngå å vise noen valideringer umiddelbart kan du sette `showValidations` til en tom liste `[]`.
{{</content-version-container>}}
{{<content-version-container version-label="v3 (App Frontend)">}}

{{%notice warning%}}
**MERK**: Det er foreløpig ikke støtte for å sette opp trigger for validering av enkeltfelter for Stateless-apper.
{{%/notice%}}

Merk at i versjon 3 av app frontend kjører JSON Schema og komponentspesifikk validering automatisk som standard. Å legge til en valideringstrigger fører til at custom backend-validering kjører i tillegg.

```json {hl_lines=[6]}
{
  "id": "some-input-field",
  "type": "Input",
  "textResourceBindings": {...},
  "dataModelBindings": {...},
  "triggers": ["validation"]
}
```

Konfigurasjonen over fører til at din egendefinerte validering i `ValidationHandler.cs`
trigges hver gang feltet oppdaterer seg. Hvis du trenger å vite hvilket
felt som trigget valideringen, er denne tilgjengelig i HTTP-konteksten som en header på requesten ved navn _ValidationTriggerField_.

Et eksempel på en egendefinert validering der headerverdien hentes ut:

```csharp
 public async Task ValidateData(object data, ModelStateDictionary validationResults)
 {
    _httpContextAccessor.HttpContext
        .Request.Headers
        .TryGetValue("ValidationTriggerField", out StringValues triggerValues);

    string triggerField = triggerValues.FirstOrDefault(string.Empty);

    if (triggerField.Equals("kommune"))
    {
      // Cast instance data to model type
      flyttemelding model = (flyttemelding)data;

      // Get value to test - Kommune
      string kommune = model.kommune;

      if (!kommune.Equals("Oslo"))
      {
          validationResults.AddModelError(triggerField, "Dette er ikke en gyldig kommune.");
      }
    }

    await Task.CompletedTask;
 }
```

**OBS** Merk at du bør implementere validering av enkeltfelter slik at det kjører både på trigger og under generell validering.
Eksempelet som omhandler flere komplekse valideringer viser hvordan du kan implementere dette.

For å få denne kodesnutten til å kjøre har vi gjort følgende:

1. I _ValidationHandler.cs_ inkluderer vi `using Microsoft.Extensions.Primitives;` øverst i filen for å kunne ta i bruk `StringValues`.
2. I _App.cs_ inkluderer vi `using Microsoft.AspNetCore.Http;` øverst i filen for å kunne ta i bruk `IHttpContextAccessor`.
3. I _App.cs_ dependency-injecter vi `IHttpContextAccessor` i konstruktøren og sender den med videre til ValidationHandler.

```cs {hl_lines=[10, 14]}
public App(
            IAppResources appResourcesService,
            ILogger<App> logger,
            IData dataService,
            IProcess processService,
            IPDF pdfService,
            IProfile profileService,
            IRegister registerService,
            IPrefill prefillService,
            IHttpContextAccessor httpContextAccessor // <--- Add this line
            ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
        {
            _logger = logger;
            _validationHandler = new ValidationHandler(httpContextAccessor);  // <--- Include the new property here
            _calculationHandler = new CalculationHandler();
            _instantiationHandler = new InstantiationHandler(profileService, registerService);
        }
```

Hvis du har flere komplekse valideringer som er tidkrevende, anbefaler vi å implementere flere private metoder
for validering av disse og bruke ValidationTriggerField til å avgjøre hvilken privat metode som skal kjøre.
Du kan for eksempel bruke en _switch statement_ for å oppnå dette.

```cs
public async Task ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data is flyttemelding model)
    {
        _httpContextAccessor.HttpContext
            .Request.Headers
            .TryGetValue("ValidationTriggerField", out StringValues triggerValues);

        string triggerField = triggerValues.FirstOrDefault(string.Empty);

        switch (triggerField)
        {
            case "kommune":
                ValidateKommune(model, validationResults);
                break;
            case "boaddresse":
                ValidateBoAdresse(model, validationResults);
                break;
            default:
                ValidateKommune(model, validationResults);
                ValidateBoAdresse(model, validationResults);
                break;
        }
    }
}

private void ValidateKommune(flyttemelding model, ModelStateDictionary validationResults)
{
    if (model.kommune != null && !model.kommune.Equals("Oslo"))
    {
        validationResults.AddModelError(
            nameof(model.kommune),
            "Dette er ikke en gyldig kommune.");
    }
}
private void ValidateBoAdresse(flyttemelding model, ModelStateDictionary validationResults)
{
    if (model.boaddresse != null && model.boaddresse.Length > 150)
    {
        validationResults.AddModelError(
            nameof(model.boaddresse),
            "Boadresse kan ikke være lengere enn 150 tegn.");
    }
}
```

### Spesifisere at valideringsfeil er fikset

Når validering trigges av et enkelt felt, fjernes alle tidligere valideringer på dette feltet i påvente av svar fra den siste valideringen.
Hvis et felt trigger validering som oppdaterer/legger til feilmelding på flere felter på en gang, fjernes ikke disse selv om det ikke lenger er noen
feil i disse feltene. Dette er fordi systemet ikke har noen måte å vite hvilke felter som eventuelt er validert i forbindelse med en enkeltfeltvalidering.

For eksempel: Du har to felter – fornavn og etternavn. Begge feltene trigger enkeltfeltvalidering, og hvis begge feltene har verdi validerer du at fullt navn ikke
kan være lengre enn 50 tegn. Feilmelding settes da på begge feltene. Hvis du retter opp i dette ved å endre fornavn, vil feilmeldingen fra fornavn-feltet forsvinne,
men feilmeldingen som vises på etternavn-feltet vises fortsatt selv om valideringen ikke setter noen feilmeldinger på feltene.

```C#
private void ValidateFullName(Datamodell model, ModelStateDictionary validationResults)
{
  if (!string.isNullOrEmpty(model.fornavn) && !string.isNullOrEmpty(model.etternavn)
    && model.fornavn.Length + model.etternavn.Length > 50)
  {
    validationResults.addModelError(nameof(model.fornavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
    validationResults.addModelError(nameof(model.etternavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
  }
}
```

For å kunne fjerne gamle feilmeldinger i et slikt tilfelle har vi lagt til støtte for å kunne spesifisere at en valideringsfeil er **fikset**. Da
vil det aktuelle feltet kunne få beskjed om at en spesifikk feilmelding som det viser frem er fikset og skal skjules.

Dette gjør du ved å legge til en valideringsfeil i koden i det tilfellet der det ikke er noen feil i valideringen,
og sette `*FIXED*` foran selve feilmeldingen. Dette tilsvarer oppsettet for [myk validering](#myke-valideringer).
Denne prefiksen gjør at feilmeldingen som settes fjernes fra det aktuelle feltet, eller ignoreres (hvis det ikke er noen feilmelding på feltet fra før).

Du kan da utvide eksempelet over for å støtte dette:

```C# {hl_lines=[14,16]}
private void ValidateFullName(Datamodell model, ModelStateDictionary validationResults)
{
  if (!string.isNullOrEmpty(model.fornavn) && !string.isNullOrEmpty(model.etternavn)
    && model.fornavn.Length + model.etternavn.Length > 50)
  {
    validationResults.addModelError(nameof(model.fornavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
    validationResults.addModelError(nameof(model.etternavn),
      "Fullt navn kan ikke være lengre enn 50 tegn.");
  }
  else
  {
    validationResults.addModelError(nameof(model.fornavn),
      "*FIXED*Fullt navn kan ikke være lengre enn 50 tegn.");
    validationResults.addModelError(nameof(model.etternavn),
      "*FIXED*Fullt navn kan ikke være lengre enn 50 tegn.");
  }
}
```

Hvis du har problemer med å få dette til å fungere og ser valideringsmeldinger med `*FIXED*` foran meldingen i stedet for at meldingen forsvinner,
bør du dobbeltsjekke at du har `"FixedValidationPrefix": "*FIXED*"` satt under `GeneralSettings` i `appsettings.json`.
{{</content-version-container>}}
{{</content-version-selector>}}

## Myke valideringer

Myke valideringer er valideringsmeldinger som ikke stopper brukeren fra å sende inn eller gå videre til neste steg i prosessen, men som brukes til å gi brukeren ulike former for informasjon.
Denne typen valideringer kan du for eksempel bruke til å be brukeren om å verifisere input som virker feil eller rart, men som strengt tatt ikke er ugyldig, eller gi nyttig informasjon for videre utfylling.

Meldinger basert på myke valideringer vises én gang, men brukeren kan velge å klikke seg videre uten å utføre endringer.

Du legger til myke valideringer fra serversiden i valideringslogikken, på samme måte som vanlige valideringsfeil. Forskjellen er at valideringsmeldingen
må ha en prefiks med typen validering du ønsker å gi, for eksempel `*WARNING*`. Dette tolkes da som en myk validering. Prefiksen `*WARNING*` blir ikke synlig for sluttbruker.

De tilgjengelige typene myke valideringer er `WARNING`, `INFO` og `SUCCESS`.

**Kodeeksempel**

```csharp
public async Task ValidateData(object data, ModelStateDictionary modelState)
{
  if (data is TestModel testModel)
  {
      string firstName = testModel?.Person?.FirstName;
      if (firstName != null && firstName.Contains("1337"))
      {
        validationResults.AddModelError(
          "Person.FirstName",
          "*WARNING*Are you sure your first name contains 1337?");
      }

      if (firstName != null && firstname.Contains("Altinn"))
      {
        validationResults.AddModelError(
          "Person.FirstName",
          "*SUCCESS*Altinn is a great name!");
      }
  }

  await Task.CompletedTask;
}
```

Eksempler på visning av de ulike valideringene:

!["Informasjonsmelding"](./info-message.jpeg "Eksempel på informasjonsmelding (*INFO*-prefiks)")

!["Suksessmelding"](./success-message.jpeg "Eksempel på suksessmelding (*SUCCESS*-prefiks)")

!["Advarselsmelding"](./warning-message.jpeg "Eksempel på advarselsmelding (*WARNING*-prefiks)")

Du kan også overstyre tittelen på meldingene ved å legge til nøklene `soft_validation.info_title`, `soft_validation.warning_title` og `soft_validation.success_title` i tekstressursene hvis du ønsker å sette egendefinert tittel.

## Gruppevalidering

Du kan gjøre valideringer på en repeterende gruppe når brukeren ønsker å lagre en gitt rad.
Hvis det er valideringsfeil i raden, hindres brukeren fra å lukke raden til feilene er fikset.

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

```json {hl_lines=[7]}
{
  "id": "demo-gruppe",
  "type": "Group",
  "children": [...],
  "maxCount": 9,
  "dataModelBindings": {...},
  "validateOnSaveRow": ["All"],
}
```

Hvor `validateOnSaveRow` inneholder et sett med valideringstyper som skal sjekkes. Dette kan være én eller flere av:

- `Schema`
- `Component`
- `Expression`
- `CustomBackend`
- `Required`
- `AllExceptRequired`
- `All`
{{</content-version-container>}}
{{<content-version-container version-label="v3 (App Frontend)">}}

```json {hl_lines=[7]}
{
  "id": "demo-gruppe",
  "type": "Group",
  "children": [...],
  "maxCount": 9,
  "dataModelBindings": {...},
  "triggers": ["validateRow"]
}
```

Hvis du legger til validering på gruppe-komponenten, går det også et kall mot valideringen i backend med en header som spesifiserer hvilken komponent som trigget valideringen: `ComponentId`.
I tillegg er radindeksen for raden som blir lagret tilgjengelig i headeren `RowIndex`. Hvis gruppen er en nøstet gruppe, er verdien en kommaseparert liste med indekser, ellers er indeksen ett enkelt tall.
Du skriver valideringer i C#, i `ValidationHandler.cs`-filen i applikasjonsmalen. I valideringen kan du så hente ut komponent-ID-en og skreddersy eventuelle valideringer som skal gjøres i backend, eksempel:

```cs
public async Task ValidateData(object data, ModelStateDictionary validationResults)
{
    if (data is flyttemelding model)
    {
        _httpContextAccessor.HttpContext
            .Request.Headers
            .TryGetValue("ComponentId", out StringValues compIdValues);

        _httpContextAccessor.HttpContext
            .Request.Headers
            .TryGetValue("RowIndex", out StringValues rowIndexValues);

        string componentId = compIdValues.FirstOrDefault(string.Empty);

        switch (componentId)
        {
            case "top-level-group":
                // kjør valideringer spesifikke til gruppen

                // Hent rad-indeksen for en ikke-nøstet gruppe
                int rowIndex = int
                    .Parse(rowIndexValues.FirstOrDefault(string.Empty));

                break;
              case "nested-group":
                // Hent alle rad-indekser for en nøstet gruppe
                int[] rowIndices = rowIndexValues
                    .FirstOrDefault(string.Empty)
                    .Split(",", StringSplitOptions.RemoveEmptyEntries)
                    .Select(s => int.Parse(s))
                    .ToArray();

                break;
            default:
                // kjør valideringene i sin helhet
                break;
        }
    }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

For tips til hvordan du løser komplekse valideringer, se eksemplene under [enkeltfeltvalidering](#enkeltfeltvalidering).
