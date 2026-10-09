---
title: Lag ny kopi
linktitle: Lag kopi
description: Denne siden beskriver hvordan man konfigurerer lag ny kopi funksjonaliteten i en app.
weight: 200
---

## Beskrivelse
Hovedhensikten med **Lag ny kopi** funksjonaliteten er at det skal være enkelt for en bruker av portalen å starte på en ny innsending ved å kopiere en tidligere fullført innsending. Brukeren skal bare måtte navigere seg frem til instansen vedkommende ønsker å kopiere for så å klikke på linken Lag ny Kopi. Appen vil lage en kopi og åpne den i nettleseren klar for utfylling med felter ferdig utfylt med data fra orginalen.

{{%notice info%}}
Lag ny kopi funksjonaliteten ble introdusert i versjon 7.9.0 av nuget pakkene.
[Se hvordan du oppdaterer nugetreferanser for applikasjonen din her](/nb/altinn-studio/v8/guides/administration/maintainance/dependencies/).
{{% /notice%}}

## Konfigurasjon

{{% notice info  %}}
Konfigurasjonen har tilbakevirkende kraft på tidligere arkiverte instanser.
{{% /notice %}}

I tillegg til at funksjonaliteten kan skrues av og på, er det mulig å velge om vedlegg skal kopieres og å ekskludere datatyper og datafelter fra kopien.

| Navn                      | Beskrivelse                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| enabled                   | true/false for å indikere om funksjonaliteten er skrudd på eller ikke. Standardverdi er av (false).      |
| excludedDataTypes         | Liste med navn på datatyper som ikke skal kopieres over. Gjelder både skjemadata og vedlegg.             |
| excludedDataFields        | Liste med navn på felter som ikke skal kopieres over.                                                    |
| includeAttachments        | true/false for å indikere om vedlegg skal kopieres over. Standardverdi er av (false).                    |
| includeDueBefore          | true/false for å indikere om svarfristen (`dueBefore`) skal kopieres over. Standardverdi er av (false).  |
| includedDataValues        | Liste med nøkler i `dataValues` som skal kopieres over fra originalinstansen.                            |
| includedPresentationTexts | Liste med nøkler i `presentationTexts` som skal kopieres over fra originalinstansen.                     |

### Ekskludering av data typer

Det er mulig å angi en liste over datatyper man ikke ønsker at skal kopieres over i den nye instansen. Ekskluderingen gjelder både skjemadata og vedlegg. Alle datatyper som skal kopieres, må være knyttet til første steg i prosessen til appen.

### Kopiering av vedlegg

{{%notice warning%}}Kopiering av vedlegg krever versjon 8.7.0 eller nyere av `Altinn.App.Api`.{{% /notice%}}

Vedlegg kopieres bare når `includeAttachments` er satt til `true`. Hvis innstillingen er `false` eller utelatt, blir vedlegg ikke kopiert. Vedlegg med en datatype som er oppført i `excludedDataTypes`, blir heller ikke kopiert.

### Ekskludering av felter

I listen med ekskluderte felter kan man angi navnene på felter man ikke ønsker å kopiere over i ny instans. Hensikten med denne funksjonaliteten er å få tømt data i felter man vet må variere fra en innsending til en annen. Det kan for eksempel være et felt som indikerer hvilke kvartal i året den nye innsendingen skal gjelde for. Her må apputvikler vurdere behovene og hva slags type bruk som blir mest vanlig. Felter angis ved hjelp av dot-notasjon på samme måte som man gjør ved data binding i layout filer.

### Kopiere svarfrist, dataverdier og presentasjonstekster

{{%notice warning%}}Kopiering av svarfrist, dataverdier og presentasjonstekster krever versjon 8.12.12 eller nyere av `Altinn.App`-bibliotekene.{{% /notice%}}

Som standard får den nye instansen ingen svarfrist, og bare dataverdier og presentasjonstekster som er utledet fra `dataFields` og `presentationFields` i applikasjonsmetadataen blir satt på den nye instansen (de beregnes på nytt fra de kopierte skjemadataene).

Sett `includeDueBefore` til `true` for å kopiere `dueBefore` fra originalinstansen. Når en kopi lages gjennom det forenklede instansieringsendepunktet, har en `dueBefore` som er angitt eksplisitt i forespørselen forrang.

Bruk `includedDataValues` og `includedPresentationTexts` til å angi hvilke nøkler som skal kopieres fra originalinstansen til den nye instansen. Nøkler som ikke finnes på originalinstansen, blir ignorert. Hvis en nøkkel også er utledet fra `dataFields` eller `presentationFields`, brukes verdien som beregnes på nytt fra de kopierte skjemadataene. Dette er nyttig for dataverdier som settes av applikasjonskoden, for eksempel en verdi som `ICopyInstanceValidator` sjekker, og som ellers ville manglet når en kopi kopieres på nytt.

De kopierte presentasjonstekstene sendes til Storage når den nye instansen opprettes, og eldre versjoner av localtest ignorerer dem. Når du tester lokalt, starter du testplattformen på nytt med `studioctl env down` og `studioctl env up` for å få nyeste versjon av localtest. Hvis du fortsatt bruker det gamle app-localtest-repoet, henter du siste versjon og starter det på nytt.

### Referanse til originalinstansen

{{%notice warning%}}Referansen til originalinstansen krever versjon 8.12.12 eller nyere av `Altinn.App`-bibliotekene.{{% /notice%}}

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

Konfigurasjon for å skru på *Lag ny kopi* uten ekskluderinger. Disse endringene gjøres i applicationmetadata.json.

{{< code-title >}}
applicationmetadata.json
{{< /code-title >}}

```json
"copyInstanceSettings": {
    "enabled": true
}
```

Konfigurasjon hvor Lag ny kopi blir aktivert samtidig som det legges til ekskludering av to ulike felter fra to modeller i skjema.

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

## Programatiske endringer

Under kopiering av skjema vil logikken utføre metode kall mot **IInstantiationProcessor.DataCreation**. Dette skal gjøre det mulig å gjøre programatiske endringer i data som blir kopiert. [Programatisk prefill](/nb/altinn-studio/v8/guides/development/prefill/custom/).

## Validering

{{%notice warning%}}Validering krever versjon 8.12.2 eller nyere av `Altinn.App`-bibliotekene.{{% /notice%}}

Validering er nyttig hvis tjenesteeier ønsker å begrense når brukere kan kopiere instanser, for eksempel basert på tidsfrister eller endringer i applikasjonen.

`ICopyInstanceValidator` kan implementeres i applikasjonskoden for å legge til egendefinert validering som bare kjøres i tilfeller der man ønsker å kopiere fra instans. Interfacet tar inn en `IInstanceDataAccessor` basert på kildeinstansen som argument og returnerer en `InstantiationValidationResult`.

Hvis valideringen returnerer `Valid = false`, vil brukeren få en feilmelding og kopieringen avbrytes.

### Eksempler

Instansiering av kopi ikke tillatt dersom det har gått mer enn 10 dager siden fristen for innsending.

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

Instansiering av kopi ikke tillatt etter fastsatt dato.

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

Instansiering av kopi ikke tillatt dersom applikasjonsversjonen er forandret fra den som ble brukt for kildeinstansen.

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
