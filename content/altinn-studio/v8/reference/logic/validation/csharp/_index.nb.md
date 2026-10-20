---
title: Lage validatorer i C#
linktitle: Validatorer i C#
description: Slik skriver du egne valideringsregler i C# som appen kjører på serveren
toc: true
weight: 50
---

Denne siden er for utviklere som skriver egne valideringsregler i C#. Hvor og når brukeren ser meldingene, finner du på siden [Validering]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#når-brukeren-ser-valideringsmeldingene).

En validator er en klasse i C# som tar i bruk et av valideringsgrensesnittene til appen. Et grensesnitt er en fast oppskrift på hvilke metoder klassen skal ha, slik at appen vet hvordan den skal kalle den.

## Slik er valideringen bygget opp

Appen validerer på to måter:

- **Ved hver lagring** kjører appen bare validatorene som kan ha fått et nytt resultat. Nettleseren lagrer endringene fortløpende mens brukeren fyller ut, så dette skjer ofte. Vi kaller det _inkrementell validering_.
- **Når brukeren går videre i prosessen**, eller når et sluttbrukersystem ber om det, kjører appen alle validatorene for oppgaven.

Hver validator har en `ValidationSource`, som er et unikt navn på validatoren. Appen merker alle meldingene fra validatoren med dette navnet. Nettleseren holder en liste med meldinger for hver `ValidationSource`. Når en validator kjører på nytt, erstatter nettleseren hele listen fra den validatoren med de nye meldingene. Meldinger fra validatorer som ikke kjørte, beholder nettleseren som de var. Standardverdien er det fulle klassenavnet sammen med oppgaven eller datatypen, og den trenger du sjelden å endre. Har to validatorer samme `ValidationSource`, blander meldingene deres seg.

Ved hver lagring spør appen hver validator om den trenger å kjøre, med metoden `HasRelevantChanges`. Appen sender med endringene i lagringen. Svarer validatoren nei, kjører appen den ikke, og nettleseren beholder meldingene fra forrige gang.

Er validatoren treg, for eksempel fordi den kaller andre systemer, er det viktig at `HasRelevantChanges` er så presis som mulig. Da slipper appen å kjøre validatoren når resultatet ikke kan ha endret seg. Gjør validatoren bare enkle sjekker, kan `HasRelevantChanges` godt alltid svare ja. I `GenericFormDataValidator<T>` ser det slik ut. I `IValidator` har metoden en annen signatur, som du ser i eksempelet under [Bruke IValidator](#bruke-ivalidator):

```csharp
protected override bool HasRelevantChanges(Soknad current, Soknad previous) => true;
```

`HasRelevantChanges` må aldri svare nei når meldingene kan ha endret seg. Da ser brukeren gamle meldinger.

Noen egenskaper på validatoren styrer hvordan appen kjører den:

| Egenskap | Standard | Betydning |
| --- | --- | --- |
| `TaskId` eller `DataType` | Ingen | Hvilken oppgave eller hvilken datatype validatoren gjelder. Med `"*"` gjelder den alle. |
| `NoIncrementalValidation` | `false` | Med `true` kjører appen ikke validatoren ved lagring, bare når brukeren går videre eller et sluttbrukersystem ber om validering. Brukeren ser da feilene først når brukeren prøver å sende inn. |
| `ShouldRunAfterRemovingHiddenData` | `false` | Med `true` får validatoren dataene uten felt som er skjult for brukeren. Da stopper ikke skjulte felt innsendingen. |

Som standard validerer appen også felt som er skjult for brukeren. Vil du at validatoren bare skal se synlige data, overstyrer du `ShouldRunAfterRemovingHiddenData`:

```csharp
// I GenericFormDataValidator<T>:
public override bool ShouldRunAfterRemovingHiddenData => true;

// I IValidator:
public bool ShouldRunAfterRemovingHiddenData => true;
```

Appen kjører validatorene samtidig. En validator skal bare lese dataene, ikke endre dem. Trenger du å endre data, bruker du en [dataprosessor]({{< relref "/altinn-studio/v8/reference/logic/dataprocessing" >}}). Kaster en validator et unntak, feiler hele lagringen eller innsendingen. Fang derfor feil fra andre systemer i validatoren.

## Velge grensesnitt

Du har to valg:

- `IValidator` er hovedgrensesnittet for validering. Validatoren får tilgang til alle dataene i oppgaven, og du bestemmer selv hvilke endringer som gjør at den skal kjøre. Bruk den når regelen trenger data fra flere datamodeller, eller når du vil ha full kontroll.
- `GenericFormDataValidator<T>` er en ferdig klasse som gjør det enklere å validere én datamodell. Appen gir deg dataene som riktig modelltype og lager feltstien til meldingene for deg.

Appen har også eldre grensesnitt som fortsatt virker. Se [Eldre valideringsgrensesnitt](#eldre-valideringsgrensesnitt).

## Bruke IValidator

`IValidator` får tilgang til alle dataene i instansen gjennom `dataAccessor`.

Eksempelet under sjekker at summen i budsjettet ikke er høyere enn beløpet brukeren søker om. Budsjettet og søknaden er to datatyper i samme oppgave:

{{% notice info %}}
I v9 har app-malen implisitte `using`-direktiver og nullable slått på. Da trenger du ikke `using`-linjene for `System`-navnerommene, og `language` er `string?`.
{{% /notice %}}

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models;
using Altinn.App.Core.Models.Validation;
using Altinn.App.Models.Budsjett; // Navnerommene til datamodellene dine
using Altinn.App.Models.Soknad;

namespace Altinn.App.Logic.Validation;

public class BudsjettValidator : IValidator
{
    // ID-en til oppgaven validatoren skal kjøre i. Bruk "*" for å kjøre i alle oppgaver.
    public string TaskId => "Task_1";

    // language er språket brukeren har valgt. Du trenger den bare hvis du lager
    // meldingsteksten selv i stedet for å bruke CustomTextKey.
    public async Task<List<ValidationIssue>> Validate(
        IInstanceDataAccessor dataAccessor,
        string taskId,
        string language)
    {
        // Sjekk at det finnes nøyaktig ett dataelement av hver datatype. Mangler et av dem,
        // gir validatoren ingen meldinger i stedet for å kaste et unntak.
        if (dataAccessor.GetDataElementsForType("soknad").ToList() is not [var soknadElement]
            || dataAccessor.GetDataElementsForType("budsjett").ToList() is not [var budsjettElement])
        {
            return [];
        }

        var soknad = await dataAccessor.GetFormData<Soknad>(soknadElement);
        var budsjett = await dataAccessor.GetFormData<Budsjett>(budsjettElement);

        // Er Sum eller SoktBelop tom (null), blir sammenligningen alltid false.
        // Da gir validatoren ingen melding, og required på komponentene sjekker
        // om feltene er fylt ut.
        if (budsjett.Sum > soknad.SoktBelop)
        {
            return
            [
                new ValidationIssue
                {
                    Severity = ValidationIssueSeverity.Error,
                    // Uten DataElementId knytter appen meldingen til datamodellen som er
                    // standard for oppgaven. Sett den alltid, så havner meldingen ved riktig felt.
                    DataElementId = budsjettElement.Id,
                    // Stien til feltet, slik den står i dataModelBindings.
                    Field = "Sum",
                    CustomTextKey = "validering.budsjett.over-sokt-belop",
                },
            ];
        }

        return [];
    }

    // Kjør validatoren bare når brukeren har endret søknaden eller budsjettet.
    public Task<bool> HasRelevantChanges(
        IInstanceDataAccessor dataAccessor,
        string taskId,
        DataElementChanges changes) =>
        Task.FromResult(changes.FormDataChanges.Any(change =>
            change.DataType.Id is "soknad" or "budsjett"));
}
```

## Bruke GenericFormDataValidator

Skal regelen bare se på én datamodell, er `GenericFormDataValidator<T>` enklere. Eksempelet under sjekker at sluttdatoen kommer etter startdatoen i datamodellen `Soknad`, som hører til datatypen `soknad`. Denne regelen kan du også løse med [validering med uttrykk]({{< relref "/altinn-studio/v8/reference/logic/validation/expression-validation" >}}), men den viser hvordan klassen er bygget opp:

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features.Validation;
using Altinn.App.Core.Models.Validation;
using Altinn.App.Models.Soknad; // Navnerommet til datamodellen din
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Validation;

// "soknad" er ID-en til datatypen i applicationmetadata.json.
// Validatoren kjører bare i oppgaven datatypen hører til.
public class PeriodeValidator() : GenericFormDataValidator<Soknad>("soknad")
{
    // Sjekken er rask, så validatoren kan kjøre ved hver lagring.
    protected override bool HasRelevantChanges(Soknad current, Soknad previous) => true;

    protected override Task ValidateFormData(
        Instance instance,
        DataElement dataElement,
        Soknad data,
        string language)
    {
        // Feltene er nullbare, slik de vanligvis er i datamodeller som er laget fra XSD.
        // Er en av datoene tom, sjekker ikke validatoren noe. Det er required på
        // komponenten som sjekker om feltet er fylt ut.
        if (data.Periode?.Start is { } start
            && data.Periode?.Slutt is { } slutt
            && slutt <= start)
        {
            // Det første argumentet peker på feltet, og appen lager feltstien for deg.
            // Det andre argumentet er tekstnøkkelen til feilmeldingen.
            // Vil du gi en advarsel i stedet, sender du med ValidationIssueSeverity.Warning
            // som tredje argument.
            CreateValidationIssue(
                soknad => soknad.Periode.Slutt,
                "validering.periode.slutt-for-start");
        }

        return Task.CompletedTask;
    }
}
```

Vanligvis lar du validatoren godta tomme verdier, altså `null` og tom tekst (`""`), og lar `required` på komponenten sjekke om feltet er fylt ut. Feil fra validatoren viser appen med en gang, så en validator som slår til på tomme verdier, viser feil for felt brukeren ikke har kommet til ennå. Se [Mens brukeren fyller ut]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#mens-brukeren-fyller-ut) og [Lage valideringsmeldinger](#lage-valideringsmeldinger).

## Registrere validatoren

Registrer validatoren i `RegisterCustomAppServices` i `App/Program.cs`. Legg til `using`-linjene øverst i filen:

{{< code-title >}}
App/Program.cs
{{< /code-title >}}

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Logic.Validation;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Registrer hver validator bare én gang. To registreringer av samme klasse gir
    // samme ValidationSource, og da blandes meldingene.
    services.AddTransient<IValidator, BudsjettValidator>();

    // GenericFormDataValidator<T> tar i bruk IFormDataValidator, så du registrerer den som det.
    services.AddTransient<IFormDataValidator, PeriodeValidator>();
}
```

Du bestemmer selv hva klassene skal hete, og hvor filene skal ligge. Vi anbefaler mappen `App/logic/Validation`.

## Lage valideringsmeldinger

En valideringsmelding er et `ValidationIssue`-objekt. Disse egenskapene er de viktigste:

| Egenskap | Beskrivelse |
| --- | --- |
| `Severity` | Alvorlighetsgraden. Påkrevd. |
| `CustomTextKey` | Tekstnøkkelen til meldingen brukeren ser |
| `CustomTextParameters` | Verdier du vil sette inn i teksten |
| `Field` | Feltstien i datamodellen som meldingen gjelder |
| `DataElementId` | ID-en til dataelementet som meldingen gjelder |
| `Code` | En kort, fast kode for typen feil, for eksempel `FristUtlopt`. Brukeren ser den ikke. |
| `Description` | En tekst som appen bruker hvis du ikke har satt `CustomTextKey` (om den ikke settes, brukes oversettelsessystemet automatisk) |

Appen setter `Source` selv. Du skal ikke sette den.

### Alvorlighetsgrad

| `Severity` | Brukeren ser | Stopper innsending? |
| --- | --- | --- |
| `Error` | En feilmelding | Ja |
| `Warning` | En advarsel | Nei |
| `Informational` | En informasjonsmelding | Nei |
| `Success` | En bekreftelse | Nei |

Advarsler, informasjon og bekreftelser er [_myke valideringer_]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#myke-valideringer). Bruk dem for å be brukeren kontrollere en verdi som virker feil, men som ikke er ugyldig. Appen viser myke valideringer bare ved et felt, så de må ha `Field`.

### Knytte meldingen til et felt

For at appen skal vise meldingen ved riktig komponent, må `Field` være nøyaktig den samme stien som komponenten bruker i `dataModelBindings`. Det betyr at

- du bruker punktum mellom nivåene, for eksempel `Person.Adresse.Postnummer`
- du skriver radnummeret i repeterende grupper med hakeparenteser, for eksempel `Personer[2].Fornavn` (første rad er `0`)
- store og små bokstaver må stemme
- du bruker navnene fra `dataModelBindings`, ikke navnene på C#-egenskapene, hvis de er forskjellige

Med `GenericFormDataValidator<T>` og `CreateValidationIssue` lager appen stien for deg. Med `IValidator` bør du også sette `DataElementId`. Uten den knytter appen meldingen til datamodellen som er standard for oppgaven.

{{% notice info %}}
I v9 viser ikke appen meldinger som har `Field`, men mangler `DataElementId`. Sett derfor alltid `DataElementId` i `IValidator`, så virker validatoren også etter oppgradering.
{{% /notice %}}

Feil uten `Field`, eller med et felt som ikke har noen synlig komponent, ser brukeren bare i feiloppsummeringen etter et mislykket forsøk på å gå videre. Gjelder feltet en skjult komponent, stopper feilen likevel innsendingen. Se [Slik er valideringen bygget opp](#slik-er-valideringen-bygget-opp).

### Tekster og flere språk

Legg meldingen i [tekstressursene]({{< relref "/altinn-studio/v8/reference/ux/texts" >}}) og sett tekstnøkkelen i `CustomTextKey`. Appen viser da teksten på språket brukeren har valgt.

{{< code-title >}}
App/config/texts/resource.nb.json
{{< /code-title >}}

```json
{
  "id": "validering.budsjett.over-sokt-belop",
  "value": "Budsjettet er høyere enn beløpet du søker om."
}
```

Vil du sette inn verdier i teksten, legger du dem i `CustomTextParameters` og bruker `variables` med `"dataSource": "customTextParameters"` i tekstressursen. Variablene setter du inn med `{0}`, `{1}` og så videre, i samme rekkefølge som i `variables`:

```csharp
CustomTextKey = "validering.budsjett.over-sokt-belop",
CustomTextParameters = new() { ["belop"] = $"{soknad.SoktBelop}" },
```

```json
{
  "id": "validering.budsjett.over-sokt-belop",
  "value": "Budsjettet er høyere enn {0} kroner, som er beløpet du søker om.",
  "variables": [
    { "key": "belop", "dataSource": "customTextParameters" }
  ]
}
```

Hvilke datakilder (`dataSource`) som er støttet, kan variere med stedet teksten vises. `Description` blir automatisk oversatt, om du ikke selv har satt den til noe annet enn `null`.

## Når appen kjører validatorene

### Mens brukeren fyller ut

Når brukeren åpner skjemaet, kjører appen de samme validatorene som ved lagring, slik at brukeren ser meldingene med en gang.

Påkrevde felt, validering med uttrykk og datamodellen sjekker nettleseren selv mens brukeren fyller ut, så ved lagring hopper serveren over dem. Serveren kjører dem når brukeren går videre i prosessen. Gir nettleseren og serveren ulikt svar, kan brukeren få en feil ved innsending som brukeren ikke så under utfyllingen.

### Når brukeren går videre i prosessen

Når brukeren går til neste oppgave, kjører appen alle validatorene for oppgaven. Hvis minst én validator gir en feil med alvorlighetsgrad `Error`, får ikke brukeren gå videre.

Appen hopper over valideringen når

- brukeren avviser oppgaven med handlingen `reject`, og avvisning er tillatt for oppgaven i prosessen
- prosessen er i en [systemoppgave]({{< relref "/altinn-studio/v8/guides/development/service-tasks" >}}) som appen kjører uten bruker

Appen kjører valideringen _etter_ en eventuell handling brukeren har valgt, for eksempel `sign` eller `confirm`, fordi resultatet av handlingen kan avgjøre om valideringen går gjennom. Feiler valideringen, har handlingen likevel skjedd. Brukeren har for eksempel signert, men kommer ikke videre før brukeren har rettet feilene.

### Når sluttbrukersystemer bruker API-et

For enkelte skjema vil regnskapssystem eller annen programvare ha utviklet en direkte integrasjon for å kunne sende inn skjema på vegne av bruker. Et slikt sluttbrukersystem kan be appen om å validere instansen med [validerings-API-et]({{< relref "/api/apps/validation" >}}). Appen kjører da alle validatorene for oppgaven instansen står i. Når sluttbrukersystemet ber appen gå videre i prosessen, validerer appen på samme måte som når en bruker gjør det.

Når sluttbrukersystemet lagrer data, får det ikke alltid valideringsresultatet tilbake. Bruk validerings-API-et for å få alle meldingene.

## Eldre valideringsgrensesnitt

Appen støtter fortsatt grensesnittene `IDataElementValidator` og `ITaskValidator`, og du kan bruke `IFormDataValidator` direkte uten `GenericFormDataValidator<T>`. Alt du kan gjøre med dem, kan du også gjøre med `IValidator`, så vi anbefaler `IValidator` for nye validatorer.

| Grensesnitt | Får | Slik gjør du det samme med `IValidator` |
| --- | --- | --- |
| `IDataElementValidator` | Ett dataelement om gangen, med metadata som filnavn, filtype og merker | Gå gjennom dataelementene i `dataAccessor.Instance.Data` |
| `ITaskValidator` | Instansen, uten skjemadata | Returner meldinger uten `Field` |
| `IFormDataValidator` | Én datamodell som `object` | Bruk `GenericFormDataValidator<T>`, eller hent dataene med `dataAccessor` |

Du registrerer dem på samme måte som andre validatorer, med grensesnittet som type, for eksempel `services.AddTransient<ITaskValidator, FristValidator>();`. Appen setter `DataElementId` for deg i `IDataElementValidator` og `IFormDataValidator`, men ikke i `IValidator`.

`IDataElementValidator` og `ITaskValidator` har `NoIncrementalValidation` satt til `true` som standard. Appen kjører dem da ikke ved lagring, bare når brukeren går videre i prosessen eller et sluttbrukersystem ber om validering, og brukeren ser feilene først når brukeren prøver å sende inn. Du kan overstyre egenskapen i klassen din:

```csharp
public bool NoIncrementalValidation => false;
```

Da kjører appen validatoren ved hver lagring, og brukeren ser meldinger med `Field` ved feltet med en gang. Meldinger uten `Field` viser appen uansett ikke før brukeren prøver å sende inn. Disse grensesnittene har ingen `HasRelevantChanges`, så appen kjører validatoren hver gang, uansett hva brukeren har endret. Gjør den derfor bare dette for validatorer som er raske.

## Gå over fra IInstanceValidator

`IInstanceValidator` er utdatert, men appen kjører den fortsatt. Appen kjører `ValidateData` ved hver lagring, uansett hva brukeren har endret, og `ValidateTask` når brukeren går videre i prosessen. Vi anbefaler at du flytter reglene over til de nye grensesnittene:

| Med `IInstanceValidator` | Bruk i stedet |
| --- | --- |
| `ValidateData` | `GenericFormDataValidator<T>` eller `IValidator` |
| `ValidateTask` | `IValidator` med meldinger uten `Field`, og `NoIncrementalValidation = true` |
| `validationResults.AddModelError(felt, melding)` | Returner et `ValidationIssue` med `Field` og `CustomTextKey`. `Field` må være stien fra `dataModelBindings`, ikke C#-navnet. `CreateValidationIssue` lager stien for deg. |
| Prefiksene `*WARNING*`, `*INFO*` og `*SUCCESS*` foran meldingen | `Severity = Warning`, `Informational` eller `Success` |
| Prefikset `*FIXED*` | Ingenting. Appen kjører alle valideringene på nytt, så du trenger ikke å melde fra om at en feil er rettet. |

Prefiksene virker ikke i de nye grensesnittene. Står et prefiks i teksten, ser brukeren det som en del av meldingen.

Tekstnøklene `soft_validation.info_title`, `soft_validation.warning_title` og `soft_validation.success_title` er ikke lenger i bruk.

## Feilsøke

| Problem | Mulig årsak |
| --- | --- |
| Validatoren kjører ikke | Validatoren er ikke registrert i `Program.cs`, eller den er registrert uten grensesnittet som type. Appen finner bare validatorer som er registrert med grensesnittet.<br>Feil: `services.AddTransient<BudsjettValidator>();`<br>Riktig: `services.AddTransient<IValidator, BudsjettValidator>();`<br>Feil: `services.AddTransient<PeriodeValidator>();`<br>Riktig: `services.AddTransient<IFormDataValidator, PeriodeValidator>();` |
| Validatoren kjører ikke i oppgaven brukeren står i | `TaskId` eller `DataType` hører til en annen oppgave |
| Appen svarer med en serverfeil når brukeren lagrer eller sender inn | `DataType` på validatoren finnes ikke i `applicationmetadata.json`, eller validatoren kaster et unntak |
| Meldingen vises ikke ved feltet | `Field` stemmer ikke nøyaktig med `dataModelBindings`, eller `DataElementId` mangler og feltet ligger i en annen datamodell enn den som er standard for oppgaven |
| Meldingen vises først når brukeren prøver å sende inn | Validatoren har `NoIncrementalValidation = true`, som er standard for de eldre grensesnittene `ITaskValidator` og `IDataElementValidator`, eller meldingen mangler `Field` |
| Brukeren ser tekstnøkkelen i stedet for teksten | Tekstnøkkelen mangler i tekstressursene for språket brukeren har valgt |
| Meldingen begynner med `*WARNING*` eller et annet prefiks | Prefiksene virker bare i `IInstanceValidator`. Sett `Severity` i stedet. |
| Brukeren ser feil for felt brukeren ikke har fylt ut ennå | En validator slår til på tomme verdier. Vanligvis lar du validatoren godta `null` og `""`, og bruker `required` for å sjekke at feltet er fylt ut. |
| Meldinger fra to validatorer blander seg eller forsvinner | To validatorer har samme `ValidationSource`, for eksempel fordi samme klasse er registrert to ganger |
| En skjult komponent stopper innsendingen | Validatoren sjekker skjulte felt. Se [Slik er valideringen bygget opp](#slik-er-valideringen-bygget-opp). |
