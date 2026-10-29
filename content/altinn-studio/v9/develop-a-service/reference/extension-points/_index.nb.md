---
title: Grensesnitt for egen kode
linktitle: Egen kode
description: Oversikt over grensesnittene appen kan implementere for å kjøre egen kode, og hvor de er beskrevet.
toc: true
tags: [needsReview]
---

Appen kjører egen kode gjennom grensesnitt i applikasjonsbibliotekene. Du lager en klasse som implementerer grensesnittet, og registrerer den i `Program.cs`. Tabellene under viser alle grensesnittene, gruppert etter hva de gjelder. Navnet lenker til siden som beskriver grensesnittet, eller til kildekoden når det ikke finnes en egen side.

## Prosess

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IOnTaskStartingHandler`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}#kjøre-kode-når-en-oppgave-starter) | kjøre kode når en oppgave starter |
| [`IOnTaskEndingHandler`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}#kjøre-kode-når-en-oppgave-avsluttes) | kjøre kode når en oppgave avsluttes, før prosessen går videre |
| [`IOnTaskAbandoningHandler`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}#kjøre-kode-når-en-oppgave-avbrytes) | kjøre kode når en oppgave avbrytes |
| [`IOnProcessEndedHandler`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}#kjøre-kode-etter-at-prosessen-er-avsluttet) | kjøre kode etter at prosessen er avsluttet og lagret |
| [`IProcessExclusiveGateway`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/exclusive-gateways" >}}) | avgjøre hvilken vei prosessen tar ut av en gateway |
| [`IServiceTask`]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}) | lage en systemoppgave, enten en som gjør én ting eller [en med flere arbeidssteg]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}), for eksempel en som sender noe og venter på svar |
| [`IProcessTask`]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/flere-steg" >}}#arbeidssteg-når-en-oppgave-starter-avsluttes-eller-avbrytes) | lage en egen oppgavetype for brukeren, med arbeidssteg som kjører når den starter, avsluttes og avbrytes |
| [`IUserAction`]({{< relref "/altinn-studio/v9/develop-a-service/reference/process/actions/serveraction" >}}) | kjøre kode når brukeren trykker på en knapp med en serverhandling |
| [`IUserActionAuthorizer`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IUserActionAuthorizer.cs) | stille egne krav før brukeren får utføre en handling, i tillegg til policyen |

Hookene kjører i arbeidsflytmotoren, og det samme gjør systemoppgavene. De kan bli kjørt flere ganger, så koden må tåle det.

## Opprette instanser

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IInstantiationProcessor`]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/custom" >}}) | fylle ut data når en instans blir opprettet |
| [`IInstantiationValidator`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/instantiation-validation" >}}) | avgjøre om en instans kan opprettes |
| [`IValidateQueryParamPrefill`]({{< relref "/altinn-studio/v9/develop-a-service/data/prefill/how-to/query-params" >}}) | kontrollere verdier som skal fylles ut fra spørringsparametere |
| [`ICopyInstanceValidator`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/messagebox/create-copy" >}}) | avgjøre om brukeren kan lage en kopi av en instans |

## Data

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IDataWriteProcessor`]({{< relref "/altinn-studio/v9/develop-a-service/data/dataprocessing" >}}) | endre data når brukeren lagrer |
| [`IDataProcessor`]({{< relref "/altinn-studio/v9/develop-a-service/data/dataprocessing" >}}) | endre data når appen henter dem, før brukeren ser dem |
| [`IExternalApiClient`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/ExternalApi/IExternalApiClient.cs) | hente data fra et eksternt API gjennom appen |

## Validering

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IFormDataValidator`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IFormDataValidator.cs) | validere skjemadataene i én datatype, også mens brukeren fyller ut |
| [`IDataElementValidator`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IDataElementValidator.cs) | validere dataelementer av én datatype, for eksempel vedlegg |
| [`ITaskValidator`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/ITaskValidator.cs) | validere en oppgave før den kan avsluttes |
| [`IValidator`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IValidator.cs) | validere hele instansen, også på tvers av datatyper |
| [`IFileAnalyzer`]({{< relref "/altinn-studio/v9/develop-a-service/data/validation/files" >}}) | analysere innholdet i en opplastet fil |
| [`IFileValidator`]({{< relref "/altinn-studio/v9/develop-a-service/data/validation/files" >}}) | validere en opplastet fil ut fra analysen |

## Kodelister og datalister

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IAppOptionsProvider`]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/options/sources/dynamic" >}}) | lage en kodeliste i kode |
| [`IInstanceAppOptionsProvider`]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/options/sources/dynamic" >}}) | lage en kodeliste ut fra dataene i instansen |
| [`IAppOptionsFileHandler`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/Options/IAppOptionsFileHandler.cs) | endre hvordan appen leser kodelister fra filer |
| [`IDataListProvider`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IDataListProvider.cs) | lage en dataliste i kode |
| [`IInstanceDataListProvider`](https://github.com/Altinn/altinn-studio/blob/main/src/App/backend/src/Altinn.App.Core/Features/IInstanceDataListProvider.cs) | lage en dataliste ut fra dataene i instansen |

## Betaling og signering

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IOrderDetailsCalculator`]({{< relref "/altinn-studio/v9/develop-a-service/process/payment/backend-manual/calculate-payment" >}}) | regne ut hva brukeren skal betale |
| [`IPaymentProcessor`]({{< relref "/altinn-studio/v9/develop-a-service/process/payment/backend-manual/calculate-payment" >}}) | bruke en annen betalingsløsning enn Nets Easy |
| [`ISigneeProvider`]({{< relref "/altinn-studio/v9/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/signee-provider" >}}) | bestemme hvem som skal signere |

## Sende data til andre systemer

| Grensesnitt | Bruk det til |
| --- | --- |
| [`IEFormidlingMetadata`]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}) | lage metadataene som sendes med eFormidling |
| [`IEFormidlingReceivers`]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}) | bestemme mottakerne av en eFormidling-forsendelse |
| [`IFiksArkivPayloadGenerator`]({{< relref "/altinn-studio/v9/receive-data/fiks-arkiv" >}}) | lage innholdet i meldingen til Fiks Arkiv |
| [`IFiksArkivMessageHandler`]({{< relref "/altinn-studio/v9/receive-data/fiks-arkiv" >}}) | behandle svarene arkivet sender tilbake |
