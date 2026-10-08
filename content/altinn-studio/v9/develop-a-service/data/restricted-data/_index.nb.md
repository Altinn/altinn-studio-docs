---
draft: true
title: Beskyttede data
description: Slik setter du opp ekstra databeskyttelse for en app
tags: [needsReview]

---

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger eller konfidensiell/klassifisert informasjon. Les mer om [konseptet beskyttede data](/nb/altinn-studio/v9/this-is-as/explanations/data-model/restricted-data/).

## Tilgang som tjenesteeier
Appen leser og skriver de beskyttede dataene som tjenesteeier, med appens innebygde Maskinporten-identitet. Alle v9-apper får standardscopene for tjenesteeier automatisk, så du trenger ikke sette opp noe ekstra for dette eksempelet. Les mer i [veiledningen for å integrere en Altinn-app med Maskinporten](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/).

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

Du leser og skriver dataene gjennom `IInstanceDataMutator`, som appen gir deg i både prosess-hooks og `IDataWriteProcessor`. Endringer du gjør gjennom mutatoren, lagres automatisk.

### Skriv data
Du må selv opprette dataelementet når appen går inn i prosessteget `Task_1`.

Eksempelet under gjør dette i en [prosess-hook](/nb/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks/) som implementerer `IOnTaskStartingHandler`. Hooken henter informasjon fra et fiktivt API og lagrer den i den beskyttede datamodellen. Brukeren har ikke tilgang til informasjonen, men appen kan hente den senere.

Prosess-hooks kjører som tjenesteeier i arbeidsflytmotoren. Mutatoren har derfor allerede tilgang til de beskyttede dataene.

Hooken kan bli kjørt på nytt hvis noe feiler. Derfor oppdaterer eksempelet dataelementet hvis det finnes fra før, i stedet for å opprette et nytt.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/ProcessTaskStartHandler.cs.md" %}}

### Les data
I koden under implementerer du `IDataWriteProcessor` og gjør en fiktiv skatteberegning. Beregningen trenger informasjon du tidligere har lagret i den beskyttede datamodellen.

`IDataWriteProcessor` kjører når brukeren lagrer, og da bruker mutatoren brukerens tilgang. Derfor bruker du `OverrideAuthenticationMethod`, slik at mutatoren leser den beskyttede datatypen som tjenesteeier.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/DataWriteHandler.cs.md" %}}

### Registrer klassene
Registrer begge klassene i `Program.cs`.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Program.cs.md" %}}
  
