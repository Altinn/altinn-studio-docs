---
draft: true
title: Endre skjemadata automatisk
linktitle: Dataprosessering
description: Slik regner du ut verdier og endrer skjemadata automatisk på serveren
tags: [needsReview]
toc: true
---

Med dataprosessering endrer appen skjemadataene automatisk på serveren, uten at brukeren gjør noe. Du kan bruke dataprosessering til å

- regne ut summer og andre verdier fra det brukeren har fylt inn
- kopiere verdier mellom felt
- hente opplysninger fra andre systemer, for eksempel poststed ut fra postnummer

Brukeren ser endringene i skjemaet like etter at appen har lagret dem.

Dataprosessering krever at du eller utvikleren din skriver en regel eller litt C#-kode. Du kan ikke sette det opp i Altinn Studio Designer.

## Velge fremgangsmåte

Du har tre måter å endre dataene på. Hvilken du velger, avhenger av hva appen skal gjøre og når den skal gjøre det.

| Når skal appen endre dataene? | Fremgangsmåte | Trenger du C#? |
| --- | --- | --- |
| Når brukeren lagrer, og du kan regne ut verdien fra andre felt i datamodellen | [Kalkulering med uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/data/dataprocessing/calculation" >}}) i `calculation.json` | Nei |
| Når brukeren lagrer, og du trenger mer enn et uttrykk, for eksempel oppslag i andre systemer | `IDataWriteProcessor` | Ja |
| Når appen henter dataene, før brukeren ser dem | `IDataProcessor` | Ja |

Kan du løse oppgaven med kalkulering med uttrykk, er det det tryggeste valget. Du slipper å skrive og vedlikeholde kode, og reglene ligger samlet i én fil.

## Dette bør du avklare med utviklerne

Dataprosessering endrer data som brukeren har fylt inn, eller som brukeren skal se. Som tjenesteeier bør du vite hvilke felt appen endrer, og hvorfor. Spør gjerne utviklerne om dette:

- Hvilke felt fyller eller endrer appen selv, og kan brukeren overskrive dem?
- Henter appen opplysninger fra andre systemer? Hva skjer hvis systemet ikke svarer?
- Kan to regler endre det samme feltet?
- Har dere testet at utregningene stemmer, også i repeterende grupper og når brukeren sletter en rad?
- Forstår brukeren hvorfor et felt endrer seg, for eksempel gjennom en ledetekst eller hjelpetekst?

## Regne ut verdier uten kode

Kan du uttrykke regelen med verdier som allerede finnes i datamodellen, skriver du den som et [dynamisk uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/expressions" >}}) i filen `[datatype-ID].calculation.json`. Appen kjører reglene hver gang brukeren lagrer.

[Slik setter du opp kalkulering med uttrykk]({{< relref "/altinn-studio/v9/develop-a-service/data/dataprocessing/calculation" >}}).

## Endre data når brukeren lagrer

Trenger du mer enn et uttrykk, skriver du en klasse som tar i bruk grensesnittet `IDataWriteProcessor`. Et grensesnitt er en fast oppskrift på hvilke metoder klassen skal ha, slik at appen vet hvordan den skal kalle den. Appen kaller klassen én gang hver gang den lagrer, med alle endringene brukeren har gjort.

```csharp
Task ProcessDataWrite(
    IInstanceDataMutator instanceDataMutator,
    string taskId,
    DataElementChanges changes,
    string? language);
```

Se [`IDataWriteProcessor` i kildekoden](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IDataWriteProcessor.cs).

### Når appen kjører prosessoren

Appen kjører `IDataWriteProcessor` når

- brukeren endrer skjemadata mens hen fyller ut skjemaet
- brukeren legger til eller sletter en oppføring i et [underskjema]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform" >}})
- brukeren laster opp eller sletter et vedlegg
- et annet system oppretter en instans og laster opp skjemadata eller vedlegg i samme forespørsel
- et annet system lagrer skjemadata gjennom API-et til appen

Appen kjører den ikke når

- brukeren går videre til neste steg i prosessen
- brukeren klikker på en knapp som kjører en [serverhandling]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/actions/serveraction" >}})
- appen lager PDF
- appen fyller ut data på forhånd med [forhåndsutfylling]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill" >}}) når et steg i prosessen starter

Trenger du å endre data i disse tilfellene, legger du logikken der det skjer, for eksempel i serverhandlingen.

Legger brukeren til en oppføring i et underskjema, eller oppretter et annet system en instans med data, fyller appen ut dataene på forhånd før prosessoren kjører. Prosessoren ser da de forhåndsutfylte verdiene.

### Dette får prosessoren

- `instanceDataMutator` gir deg tilgang til alle dataelementene i instansen. En instans er én utfylling av skjemaet, og dataelementene er skjemadataene og vedleggene som hører til den. Du kan hente, legge til og fjerne dataelementer, og du kan stoppe hele lagringen med `AbandonAllChanges`.
- `taskId` er ID-en til steget i prosessen som instansen står i.
- `changes` inneholder endringene i lagringen:
  - `FormDataChanges` gjelder skjemadata. `CurrentFormData` er dataene etter endringen, og `PreviousFormData` er dataene før.
  - `BinaryDataChanges` gjelder vedlegg. Her finner du blant annet `FileName`, `ContentType` og innholdet i `CurrentBinaryData`.
  - Hver endring har en `Type`, som er `Created`, `Updated` eller `Deleted`.
- `language` er språket brukeren har valgt, hvis appen kjenner det.

### Lage prosessoren

Eksempelet under slår opp poststedet når brukeren endrer postnummeret. Ved å sammenligne `CurrentFormData` med `PreviousFormData` slår appen bare opp når postnummeret faktisk er endret.

`IPoststedOppslag` er en tjeneste du lager selv, for eksempel en klient mot et eksternt API.

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Models;
using Altinn.App.Models.Soknad; // Navnerommet til datamodellen din

namespace Altinn.App.Logic;

public class PoststedProsessor(IPoststedOppslag poststedOppslag) : IDataWriteProcessor
{
    public async Task ProcessDataWrite(
        IInstanceDataMutator instanceDataMutator,
        string taskId,
        DataElementChanges changes,
        string? language)
    {
        foreach (var change in changes.FormDataChanges)
        {
            if (change.Type == ChangeType.Deleted
                || change.CurrentFormData is not Soknad soknad
                || change.PreviousFormData is not Soknad forrige)
            {
                continue;
            }

            if (soknad.Postnummer == forrige.Postnummer)
            {
                continue;
            }

            soknad.Poststed = string.IsNullOrEmpty(soknad.Postnummer)
                ? null
                : await poststedOppslag.HentPoststed(soknad.Postnummer);
        }
    }
}
```

Du endrer modellobjektet direkte. Metoden returnerer ingenting, og appen finner selv ut hva du har endret.

Du bestemmer selv hva klassen skal hete og hvor filen skal ligge i prosjektet. Vi anbefaler mappen `App/logic` og et navnerom som beskriver hva klassen gjør.

### Registrere prosessoren

Registrer prosessoren og eventuelle tjenester den trenger, i `RegisterCustomAppServices` i `App/Program.cs`:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddTransient<IPoststedOppslag, PoststedOppslag>();
    services.AddTransient<IDataWriteProcessor, PoststedProsessor>();
}
```

## Stoppe en lagring

Noen ganger vil du at appen ikke skal lagre det brukeren har sendt inn, for eksempel et vedlegg som ikke oppfyller kravene dine. Da kaller du `AbandonAllChanges` med én eller flere valideringsfeil. Appen lagrer ingenting, og brukeren ser feilene ved opplastingen.

Eksempelet under avviser vedlegg med filnavn som er lengre enn 100 tegn:

```csharp
using Altinn.App.Core.Features;
using Altinn.App.Core.Models;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.Logic;

public class VedleggsProsessor : IDataWriteProcessor
{
    public Task ProcessDataWrite(
        IInstanceDataMutator instanceDataMutator,
        string taskId,
        DataElementChanges changes,
        string? language)
    {
        foreach (var vedlegg in changes.BinaryDataChanges)
        {
            if (vedlegg.Type == ChangeType.Created && vedlegg.FileName?.Length > 100)
            {
                instanceDataMutator.AbandonAllChanges(
                [
                    new ValidationIssue
                    {
                        Code = "for-langt-filnavn",
                        Description = "Filnavnet kan ikke være lengre enn 100 tegn.",
                        Severity = ValidationIssueSeverity.Error,
                    },
                ]);
                break;
            }
        }

        return Task.CompletedTask;
    }
}
```

Dette bør du vite om `AbandonAllChanges`:

- Du må sende med minst én valideringsfeil. Er listen tom, stopper appen med en feil.
- Gi hver feil en `Severity` og en `Description` som forklarer brukeren hva som er galt. `Code` er valgfri og gjør feilen lettere å kjenne igjen i koden.
- Brukeren ser feilene bare når hen laster opp et vedlegg. Stopper du lagringen når brukeren endrer skjemadata, lagrer ikke appen endringene, men brukeren får ingen forklaring. Vil du si fra om feil i skjemadata, bruker du [validering]({{< relref "/altinn-studio/v9/develop-a-service/data/validation" >}}) i stedet.

Kaster prosessoren et unntak, avbryter appen lagringen uten å forklare brukeren hva som gikk galt. Bruk derfor unntak bare for feil som brukeren ikke kan rette selv.

## Endre data når appen henter dem

Skal brukeren se oppdaterte data når hen åpner skjemaet, bruker du `IDataProcessor.ProcessDataRead`. Appen kjører metoden hver gang den henter skjemadata for å vise dem, altså når

- brukeren åpner skjemaet
- et annet system henter skjemadata gjennom API-et til appen
- appen lager PDF
- brukeren endrer noe i skjemaet i en stateless app

Endrer metoden dataene, lagrer appen dem. Appen lagrer ikke hvis

- dataelementet er låst
- brukeren ikke har skrivetilgang
- prosessen er opptatt, for eksempel på vei til neste steg
- appen henter dataene for å lage PDF

`IDataProcessor` har også metoden `ProcessDataWrite`. Den kjører bare når brukeren endrer skjemadata som finnes fra før, og ikke når brukeren legger til eller sletter dataelementer eller vedlegg. Bruk `IDataWriteProcessor` for logikk som skal kjøre når brukeren lagrer, og la `ProcessDataWrite` i `IDataProcessor` stå tom.

Se [`IDataProcessor` i kildekoden](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IDataProcessor.cs).

### Lage prosessoren

Arv fra `GenericDataProcessor<TModel>`. Appen kaller prosessoren for hver datamodell den henter, og basisklassen sørger for at metodene bare kjører for datamodellen du oppgir.

Eksempelet under fyller ut navnet til avsenderen når brukeren åpner skjemaet, hvis feltet er tomt:

```csharp
using Altinn.App.Core.Features.DataProcessing;
using Altinn.App.Core.Internal.Registers;
using Altinn.App.Models.Soknad; // Navnerommet til datamodellen din
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic;

public class AvsenderProsessor(IAltinnPartyClient partyClient) : GenericDataProcessor<Soknad>
{
    public override async Task ProcessDataRead(
        Instance instance,
        Guid? dataId,
        Soknad model,
        string? language)
    {
        if (!string.IsNullOrEmpty(model.Avsender))
        {
            return;
        }

        // Mangler i apper som tillater anonyme brukere
        if (instance.InstanceOwner?.PartyId is not { } partyId)
        {
            return;
        }

        var party = await partyClient.GetParty(int.Parse(partyId));
        model.Avsender = party?.Name;
    }

    public override Task ProcessDataWrite(
        Instance instance,
        Guid? dataId,
        Soknad model,
        Soknad? previousModel,
        string? language) => Task.CompletedTask;
}
```

### Registrere prosessoren

Registrer prosessoren i `RegisterCustomAppServices` i `App/Program.cs`:

```csharp
services.AddTransient<IDataProcessor, AvsenderProsessor>();
```

### Slik virker det i stateless-apper

En [stateless app]({{< relref "/altinn-studio/v9/develop-a-service/process/stateless" >}}) viser skjemaet uten å lagre data, for eksempel en kalkulator eller et oppslag. Der er `ProcessDataRead` den eneste dataprosesseringen som kjører. Appen lagrer ingenting, så skriveprosessorer og kalkulering med uttrykk kjører aldri.

Hver gang brukeren endrer noe i skjemaet, sender nettleseren alle dataene til appen. Appen kjører `ProcessDataRead` og sender de oppdaterte dataene tilbake uten å lagre dem.

Instansen i en stateless app er ikke lagret noe sted. Den har ingen `Id`, bare opplysninger om hvem som eier den (`InstanceOwner`), og `dataId` er `null`. Tillater appen anonyme brukere, mangler også `InstanceOwner`.

## Slik kjører appen flere prosessorer

Når brukeren lagrer, kjører appen prosessorene i denne rekkefølgen:

1. Appen kjører `ProcessDataWrite` i alle `IDataProcessor`.
2. Appen kjører alle `IDataWriteProcessor` som du har laget selv.
3. Appen regner ut uttrykkene i `calculation.json`.

Har du flere prosessorer av samme type, kjører appen dem i den rekkefølgen du registrerte dem i `Program.cs`.

Alle prosessorene jobber på det samme modellobjektet. En prosessor ser derfor endringene fra prosessorene som kjørte før den. Siden kalkulering med uttrykk kjører sist, overskriver den felt som prosessorene dine har satt, hvis feltet også har en regel i `calculation.json`. Prosessorene dine ser dessuten verdiene fra forrige utregning, ikke de nye. La derfor bare én regel eller prosessor endre hvert felt.

## Slik finner appen endringene dine

Du trenger ikke å gi beskjed om hva prosessoren har endret. Appen sammenligner dataene før og etter at prosessorene har kjørt, og sender de endrede dataene tilbake til nettleseren. Brukeren ser endringene i skjemaet med en gang.
