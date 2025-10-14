---
title: Beskyttede data
description: Hvordan sette opp ekstra databeskyttelse for en app
weight: 50
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}} 

{{% notice info %}}
Tilgjengelig fra [v8.7.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.7.0)
{{% /notice %}}

## Introduksjon
Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger eller konfidensiell/klassifisert informasjon.

Du kan lese mer om konseptet [her](/nb/altinn-studio/v8/concepts/data-model/restricted-data/).

## Konfigurasjon av Maskinporten
Du må konfigurere Maskinporten for at appen skal kunne utføre handlinger på vegne av tjenesteeier.

Du finner en detaljert veiledning for oppsettet [her](/nb/altinn-studio/v8/guides/integration/maskinporten/).

## Konfigurasjon av datatyper
[applicationmetadata.json-filen](https://github.com/Altinn/altinn-studio/blob/main/src/App/app-template-dotnet/src/App/config/applicationmetadata.json) definerer alle [datatyper](/nb/api/models/app-metadata/#datatype) i en applikasjon. Her angir du hvilke [handlinger](/nb/altinn-studio/v8/reference/configuration/authorization/#action-attributter) som kreves for din beskyttede datatype.

I dette eksempelet konfigurerer vi en ny datatype, hvor vi spesifiserer egenskapene `actionRequiredToRead` og `actionRequiredToWrite`, og deaktiverer `autoCreate`. Vi bruker identifikatoren `restrictedDataModel`, men navnet i seg selv er ikke viktig.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
Vi deaktiverer auto-create fordi vår [oppdaterte autorisasjonspolicy](#konfigurasjon-av-autorisasjonspolicy) ikke gir lese- eller skrivetilgang til sluttbrukere. Forsøk på å opprette et dataelement av typen `restrictedDataModel` med en brukers autorisasjonstoken vil resultere i en 403-Forbidden feil.
{{% /notice %}}

## Konfigurasjon av autorisasjonspolicy
Ta utgangspunkt i [standard policy.xml fil](https://github.com/Altinn/altinn-studio/blob/main/src/App/app-template-dotnet/src/App/config/authorization/policy.xml), og endre regel #2 for å gi tjenesteeier tilgang til de nye handlingene.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/Policy.xml.md" %}}

## Interaksjon med beskyttede data
Siden `restrictedDataModel` ikke opprettes automatisk eller er knyttet til brukerens normale dataflyt, må du implementere all relevant logikk manuelt.

I denne delen oppretter vi en tjeneste som hjelper oss å samhandle med beskyttede data, før vi viser hvordan vi kan opprette, endre og lese beskyttede dataelementer i en vanlig prosessflyt.

### Hjelpetjeneste
For å forenkle autorisasjon og interaksjon med den beskyttede datamodellen, kan vi opprette en hjelpetjeneste som håndterer denne kompleksiteten.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/RestrictedDataHelper.cs.md" %}}

Denne tjensten kan registreres i `Program.cs` og brukes med [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) der den behøves.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/Program.cs.md" %}}

### Skriving av data
Som nevnt tidligere, må vi manuelt opprette dataelementet når applikasjonen går inn i prosessteget `Task_1`.

For å gjøre dette bruker du metoden `UpdateOrCreateData` fra [RestrictedDataHelper-tjenesten](#hjelpetjeneste).

Eksempelet under implementerer denne logikken i `IProcessTaskStart`-interfacet, hvor vi henter informasjon fra et fiktivt API og lagrer det i den beskyttede datamodellen. Denne informasjonen vil ikke være tilgjengelig for brukeren, men kan hentes senere av appen.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Lesing av data
I koden under har vi laget en implementasjon av `IDataWriteProcessor`-interfacet, hvor vi utfører en fiktiv skatteberegning. Denne beregningen krever informasjon vi tidligere har lagret i den beskyttede datamodellen, så vi bruker [RestrictedDataHelper.GetOrCreateData](#hjelpetjeneste) for å hente den.

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/DataWriteHandler.cs.md" %}}
  