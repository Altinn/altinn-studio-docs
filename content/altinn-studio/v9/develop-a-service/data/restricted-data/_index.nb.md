---
draft: true
title: Beskyttede data
description: Slik setter du opp ekstra databeskyttelse for en app
tags: [needsReview]

---

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger eller konfidensiell/klassifisert informasjon. Les mer om [konseptet beskyttede data](/nb/altinn-studio/v9/this-is-as/explanations/data-model/restricted-data/).

## Sett opp Maskinporten
Du må sette opp Maskinporten for at appen skal kunne utføre handlinger på vegne av tjenesteeier. Se [integrere en Altinn-app med Maskinporten](/nb/altinn-studio/v9/develop-a-service/reference/integration/maskinporten/).

## Sett opp datatyper
Filen `applicationmetadata.json` definerer alle [datatyper](/nb/api/models/app-metadata/#datatype) (kun på engelsk foreløpig) i en app. Her angir du hvilke [handlinger](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/#action-attributter) som kreves for den beskyttede datatypen.

I dette eksempelet setter du opp en ny datatype der du angir egenskapene `actionRequiredToRead` og `actionRequiredToWrite`, og deaktiverer `autoCreate`. Du bruker identifikatoren `restrictedDataModel`, men navnet i seg selv er ikke viktig.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
Du deaktiverer auto-create fordi den [oppdaterte autorisasjonspolicyen](#sett-opp-autorisasjonspolicy) ikke gir lese- eller skrivetilgang til brukere. Hvis du prøver å opprette et dataelement av typen `restrictedDataModel` med en brukers autorisasjonstoken, får du en 403-Forbidden-feil.
{{% /notice %}}

## Sett opp autorisasjonspolicy
Ta utgangspunkt i [standard policy.xml-fil](/nb/altinn-studio/v9/develop-a-service/reference/configuration/authorization/), og endre regel #2 for å gi tjenesteeieren tilgang til de nye handlingene.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Policy.xml.md" %}}

## Interaksjon med beskyttede data
Siden `restrictedDataModel` ikke opprettes automatisk eller er knyttet til brukerens normale dataflyt, må du skrive all relevant logikk manuelt.

I denne delen oppretter du en tjeneste som hjelper deg å samhandle med beskyttede data, før du ser hvordan du kan opprette, endre og lese beskyttede dataelementer i en vanlig prosessflyt.

### Lag en hjelpetjeneste
For å forenkle autorisasjon og samhandling med den beskyttede datamodellen, kan du opprette en hjelpetjeneste som håndterer denne kompleksiteten.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/RestrictedDataHelper.cs.md" %}}

Du kan registrere denne tjenesten i `Program.cs` og bruke den med [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) der du trenger den.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Program.cs.md" %}}

### Skriv data
Som nevnt tidligere, må du manuelt opprette dataelementet når appen går inn i prosessteget `Task_1`.

For å gjøre dette bruker du metoden `UpdateOrCreateData` fra [RestrictedDataHelper-tjenesten](#lag-en-hjelpetjeneste).

Eksempelet under bruker denne logikken i `IProcessTaskStart`-grensesnittet, der du henter informasjon fra et fiktivt API og lagrer det i den beskyttede datamodellen. Denne informasjonen er ikke tilgjengelig for brukeren, men appen kan hente den senere.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Les data
I koden under lager du en implementasjon av `IDataWriteProcessor`-grensesnittet, der du utfører en fiktiv skatteberegning. Denne beregningen krever informasjon du tidligere har lagret i den beskyttede datamodellen, så du bruker [RestrictedDataHelper.GetOrCreateData](#lag-en-hjelpetjeneste) for å hente den.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/DataWriteHandler.cs.md" %}}
  
