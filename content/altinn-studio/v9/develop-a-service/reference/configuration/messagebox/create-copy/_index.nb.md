---
draft: true
title: Lage ny kopi
linktitle: Lag kopi
description: Slik lar du brukere kopiere en tidligere instans.
weight: 200
tags: [needsReview]
---

## Beskrivelse

Hovedhensikten med **Lag ny kopi**-funksjonaliteten er å gjøre det enkelt for brukeren å starte en ny instans ved å kopiere en tidligere fullført instans (et tidligere innsendt eksemplar). Brukeren må bare navigere frem til instansen som skal kopieres, og klikke på lenken **Lag ny kopi**. Appen lager en kopi og åpner den i nettleseren klar for utfylling, med felter ferdig utfylt med data fra originalen.

{{%notice info%}}
Lag ny kopi-funksjonaliteten ble introdusert i versjon 7.9.0 av nuget-pakkene.
[Les hvordan du oppdaterer nugetreferanser for appen din](/nb/altinn-studio/v9/manage-a-service/maintainance/dependencies/#nuget).
{{% /notice%}}

## Konfigurasjon

{{%notice info%}}
Konfigurasjonen har tilbakevirkende kraft på tidligere arkiverte instanser.
{{% /notice%}}

I tillegg til å slå funksjonaliteten av og på, er det mulig å velge om vedlegg skal kopieres og å ekskludere datatyper og datafelter fra kopien.

| Navn                      | Beskrivelse                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| enabled                   | true/false for å indikere om funksjonaliteten er slått på eller ikke. Standardverdi er av (false).       |
| excludedDataTypes         | Liste med navn på datatyper som ikke skal kopieres over. Gjelder både skjemadata og vedlegg.             |
| excludedDataFields        | Liste med navn på felter som ikke skal kopieres over.                                                    |
| includeAttachments        | true/false for å indikere om vedlegg skal kopieres over. Standardverdi er av (false).                    |
| includeDueBefore          | true/false for å indikere om svarfristen (`dueBefore`) skal kopieres over. Standardverdi er av (false).  |
| includedDataValues        | Liste med nøkler i `dataValues` som skal kopieres over fra originalinstansen.                            |
| includedPresentationTexts | Liste med nøkler i `presentationTexts` som skal kopieres over fra originalinstansen.                     |

### Ekskludere datatyper

Det er mulig å angi en liste over datatyper du ikke ønsker at skal kopieres over i den nye instansen. Ekskluderingen gjelder både skjemadata og vedlegg. Alle datatyper som skal kopieres, må være knyttet til første steg i prosessen til appen.

### Kopiere vedlegg

Vedlegg kopieres bare når `includeAttachments` er satt til `true`. Hvis innstillingen er `false` eller utelatt, blir vedlegg ikke kopiert. Vedlegg med en datatype som er oppført i `excludedDataTypes`, blir heller ikke kopiert.

### Ekskludere felter

I listen med ekskluderte felter kan du angi navnene på felter du ikke ønsker å kopiere over i ny instans. Hensikten med denne funksjonaliteten er å tømme data i felter du vet må variere fra en instans til en annen. Det kan for eksempel være et felt som indikerer hvilket kvartal i året den nye instansen skal gjelde for. Her må apputvikler vurdere behovene og hva slags type bruk som blir mest vanlig. Felter angis ved hjelp av dot-notasjon på samme måte som du gjør ved databinding i layoutfiler.

### Kopiere svarfrist, dataverdier og presentasjonstekster


Som standard får den nye instansen ingen svarfrist, og bare dataverdier og presentasjonstekster som er utledet fra `dataFields` og `presentationFields` i applikasjonsmetadataen blir satt på den nye instansen (de beregnes på nytt fra de kopierte skjemadataene).

Sett `includeDueBefore` til `true` for å kopiere `dueBefore` fra originalinstansen. Når en kopi lages gjennom det forenklede instansieringsendepunktet, har en `dueBefore` som er angitt eksplisitt i forespørselen forrang.

Bruk `includedDataValues` og `includedPresentationTexts` til å angi hvilke nøkler som skal kopieres fra originalinstansen til den nye instansen. Nøkler som ikke finnes på originalinstansen, blir ignorert. Hvis en nøkkel også er utledet fra `dataFields` eller `presentationFields`, brukes verdien som beregnes på nytt fra de kopierte skjemadataene. Dette er nyttig for dataverdier som settes av applikasjonskoden, for eksempel en verdi som `ICopyInstanceValidator` sjekker, og som ellers ville manglet når en kopi kopieres på nytt.

### Referanse til originalinstansen

{{%notice warning%}}Referansen til originalinstansen krever versjon 8.13.0 eller nyere av `Altinn.App`-bibliotekene.{{% /notice%}}

Den nye instansen får dataverdien `copy.sourceInstanceId` med id-en til instansen den ble kopiert fra, på formatet `{instanceOwnerPartyId}/{instanceGuid}`. I applikasjonskoden bruker du konstanten `DataValueKeys.CopySourceInstanceId` fra `Altinn.App.Core.Constants` i stedet for å skrive nøkkelen selv.

Når en kopi kopieres på nytt, peker verdien som standard på instansen som ble kopiert direkte. Hvis du legger til `copy.sourceInstanceId` i `includedDataValues`, kopieres verdien fra originalinstansen i stedet, slik at alle kopier i en kjede peker på den første instansen. Hvis originalinstansen ikke har en slik verdi, brukes id-en til originalinstansen.

```json
"copyInstanceSettings": {
    "enabled": true,
    "includedDataValues": [
        "copy.sourceInstanceId"
    ]
}
```

## Eksempler

Konfigurasjon for å slå på **Lag ny kopi** uten ekskluderinger. Disse endringene gjøres i `applicationmetadata.json`.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true
}
```

Konfigurasjon hvor **Lag ny kopi** blir aktivert og vedlegg blir kopiert til den nye instansen.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "includeAttachments": true
}
```

Konfigurasjon hvor **Lag ny kopi** blir aktivert samtidig som det legges til ekskludering av to ulike felter fra to modeller i skjema.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "excludedDataFields": [
        "group1.felt2",
        "group23.felt21"
    ]
}
```

Konfigurasjon hvor svarfristen og utvalgte dataverdier og presentasjonstekster kopieres til den nye instansen.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true,
    "includeDueBefore": true,
    "includedDataValues": [
        "appVersion",
        "customerId"
    ],
    "includedPresentationTexts": [
        "name"
    ]
}
```

## Programmatiske endringer

Under kopiering av skjema utfører logikken metodekall mot **IInstantiationProcessor.DataCreation**. Dette gjør det mulig å gjøre programmatiske endringer i data som kopieres. [Les mer om egendefinert forhåndsutfylling]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/custom" >}}).

## Validering

{{%notice warning%}}Validering krever versjon 8.12.2 eller nyere av `Altinn.App`-bibliotekene.{{% /notice%}}

Validering er nyttig hvis du som tjenesteeier ønsker å begrense når brukere kan kopiere instanser, for eksempel basert på tidsfrister eller endringer i applikasjonen.

Du kan implementere `ICopyInstanceValidator` i applikasjonskoden for å legge til egendefinert validering som bare kjøres når noen ønsker å kopiere fra en instans. Grensesnittet tar imot en `IInstanceDataAccessor` basert på kildeinstansen som argument og returnerer en `InstantiationValidationResult`.

Hvis valideringen returnerer `Valid = false`, får brukeren en feilmelding og kopieringen avbrytes.

### Eksempler

Instansiering av kopi er ikke tillatt hvis det har gått mer enn 10 dager siden fristen for innsending.

```C# {hl_lines=[12]}
using System;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.models;

public class CopyInstanceValidator : ICopyInstanceValidator
{
    private const int NumberOfDaysAfterDueDate = 10;
    
    public async Task<InstantiationValidationResult> Validate(IInstanceDataAccessor sourceInstanceDataAccessor)
    {
        if (sourceInstanceDataAccessor.Instance.DueBefore.HasValue)
        {
            var deadline = sourceInstanceDataAccessor.Instance.DueBefore.Value.AddDays(NumberOfDaysAfterDueDate);
            if (DateTimeOffset.UtcNow > deadline)
            {
                return new InstantiationValidationResult
                {
                    Valid = false,
                    Message = "ERROR: Too long since due date"
                };
            }
        }

        return null;
    }
}
```

Instansiering av kopi er ikke tillatt etter en fastsatt dato.

```C# {hl_lines=[12]}
using System;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.models;

public class CopyInstanceValidator : ICopyInstanceValidator
{
    private static readonly DateTime CopiesNotAllowedAfter = new(2026, 6, 30);

    public async Task<InstantiationValidationResult> Validate(IInstanceDataAccessor sourceInstanceDataAccessor)
    {
        if (DateTime.UtcNow > CopiesNotAllowedAfter)
        {
            return new InstantiationValidationResult
            {
                Valid = false,
                Message = "ERROR: Not allowed to copy instances after 2026-06-30"
            };
        }

        return null;
    }
}
```

Instansiering av kopi er ikke tillatt hvis applikasjonsversjonen er endret siden kildeinstansen ble opprettet.

```C# {hl_lines=[12]}
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Internal.App;
using Altinn.App.Core.Models.Validation;

namespace Altinn.App.models;

public class CopyInstanceValidator(IAppMetadata appMetadata) : ICopyInstanceValidator
{
    public async Task<InstantiationValidationResult> Validate(IInstanceDataAccessor sourceInstanceDataAccessor)
    {
            var appVersionDataValue = sourceInstanceDataAccessor
                .Instance
                .DataValues
                .SingleOrDefault(x => x.Key == "appVersion");
            var application = await appMetadata.GetApplicationMetadata();
            if (appVersionDataValue != null && appVersionDataValue.Value.Equals(application.VersionId) == false)
            {
                return new InstantiationValidationResult
                {
                    Valid = false,
                    Message = "ERROR: Application version differs from the version that the source instance was created with"
                };
            }

            return null;
    }
}
```
