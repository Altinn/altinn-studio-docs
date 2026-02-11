---
draft: true
title: Beskyttede data
description: Hvordan sette opp ekstra databeskyttelse for en app
tags: [needsReview, needsTranslation]

---

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/style.css.md" %}}

{{% notice info %}}
Tilgjengelig fra [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Introduksjon
Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger eller konfidensiell/klassifisert informasjon.

Les mer om konseptet
[her](/nb/altinn-studio/v10/this-is-as/explanations/data-model/restricted-data/).

## Konfigurere Maskinporten
Du må konfigurere Maskinporten for at appen skal kunne utføre handlinger på vegne av tjenesteeier.

Finn en detaljert veiledning for oppsettet
[her](/nb/altinn-studio/v10/develop-a-service/reference/integration/maskinporten/).

## Konfigurere datatyper
[applicationmetadata.json-filen](https://github.com/Altinn/altinn-studio/blob/main/src/App/app-template-dotnet/src/App/config/applicationmetadata.json)
definerer alle [datatyper](/nb/api/models/app-metadata/#datatype) (kun på engelsk foreløpig) i en app. Her angir du hvilke
[handlinger](/nb/altinn-studio/v10/develop-a-service/reference/configuration/authorization/#action-attributter)
som kreves for din beskyttede datatype.

I dette eksempelet konfigurerer vi en ny datatype der vi spesifiserer egenskapene `actionRequiredToRead` og `actionRequiredToWrite`, og deaktiverer `autoCreate`. Vi bruker identifikatoren `restrictedDataModel`, men navnet i seg selv er ikke viktig.

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
Vi deaktiverer auto-create fordi vår [oppdaterte autorisasjonspolicy](#konfigurere-autorisasjonspolicy) ikke gir lese- eller skrivetilgang til brukere. Forsøk på å opprette et dataelement av typen `restrictedDataModel` med en brukers autorisasjonstoken vil resultere i en 403-Forbidden-feil.
{{% /notice %}}

## Konfigurere autorisasjonspolicy
Ta utgangspunkt i [standard policy.xml-fil](https://github.com/Altinn/altinn-studio/blob/main/src/App/app-template-dotnet/src/App/config/authorization/policy.xml), og endre regel #2 for å gi tjenesteeier tilgang til de nye handlingene.

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/Policy.xml.md" %}}

## Interaksjon med beskyttede data
Siden `restrictedDataModel` ikke opprettes automatisk eller er knyttet til brukerens normale dataflyt, må du implementere all relevant logikk manuelt.

I denne delen oppretter vi en tjeneste som hjelper oss å samhandle med beskyttede data, før vi viser hvordan vi kan opprette, endre og lese beskyttede dataelementer i en vanlig prosessflyt.

### Hjelpetjeneste
For å forenkle autorisasjon og interaksjon med den beskyttede datamodellen, kan du opprette en hjelpetjeneste som håndterer denne kompleksiteten.

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/RestrictedDataHelper.cs.md" %}}

Denne tjensten kan registreres i `Program.cs` og brukes med [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) der den behøves.

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/Program.cs.md" %}}

### Skrive data
Som nevnt tidligere, må du manuelt opprette dataelementet når appen går inn i prosessteget `Task_1`.

For å gjøre dette bruker du metoden `UpdateOrCreateData` fra [RestrictedDataHelper-tjenesten](#hjelpetjeneste).

Eksempelet under implementerer denne logikken i `IProcessTaskStart`-interfacet, der vi henter informasjon fra et fiktivt API og lagrer det i den beskyttede datamodellen. Denne informasjonen vil ikke være tilgjengelig for brukeren, men kan hentes senere av appen.

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Lese data
I koden under har vi laget en implementasjon av `IDataWriteProcessor`-interfacet, der vi utfører en fiktiv skatteberegning. Denne beregningen krever informasjon vi tidligere har lagret i den beskyttede datamodellen, så vi bruker [RestrictedDataHelper.GetOrCreateData](#hjelpetjeneste) for å hente den.

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/DataWriteHandler.cs.md" %}}
  
