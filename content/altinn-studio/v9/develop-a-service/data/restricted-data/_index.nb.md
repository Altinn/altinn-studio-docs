---
draft: true
title: Beskyttede data
description: Slik setter du opp ekstra databeskyttelse for en app
tags: [needsReview]

---

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger om andre enn brukeren, eller konfidensiell informasjon. Appen kan lagre slike data i en egen datatype som brukeren ikke kan lese eller endre. Bare den som har tilgang til bestemte handlinger, vanligvis tjenesteeieren, kan lese og skrive dataene.

Prøver brukeren å lese eller skrive dataene uten tilgang til handlingen, avviser appen forespørselen med `403 Forbidden`.

Du setter dette opp i koden til appen. Altinn Studio Designer har ikke innstillinger for beskyttede data.

## Sett opp Maskinporten

Appen må kunne utføre handlinger på vegne av tjenesteeieren. Da må du sette opp Maskinporten. Se [integrere en Altinn-app med Maskinporten]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}).

## Sett opp datatyper

Filen `applicationmetadata.json` inneholder alle [datatypene](/nb/api/models/app-metadata/#datatype) (kun på engelsk foreløpig) i appen. Her angir du hvilke [handlinger]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/authorization#action-attributter" >}}) som kreves for å lese og skrive den beskyttede datatypen.

I eksempelet legger du til en ny datatype med egenskapene `actionRequiredToRead` og `actionRequiredToWrite`, og slår av `autoCreate`. Datatypen heter `restrictedDataModel`, men du kan velge et annet navn.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice warning %}}
Du slår av `autoCreate` fordi [autorisasjonspolicyen](#sett-opp-autorisasjonspolicy) ikke gir brukerne lese- eller skrivetilgang. Prøver appen å opprette et dataelement av typen `restrictedDataModel` med brukerens token, får den feilen `403 Forbidden`.
{{% /notice %}}

## Sett opp autorisasjonspolicy

Ta utgangspunkt i [standardfilen `policy.xml`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/authorization" >}}), og endre regel 2 slik at tjenesteeieren får tilgang til de nye handlingene.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Policy.xml.md" %}}

## Lese og skrive beskyttede data

Appen oppretter ikke `restrictedDataModel` automatisk, og datatypen er ikke en del av skjemaet brukeren fyller ut. Derfor må du skrive koden som leser og skriver dataene selv.

Appen bruker brukerens token som standard. For å lese og skrive den beskyttede datatypen kaller du `OverrideAuthenticationMethod` med `StorageAuthenticationMethod.ServiceOwner()`. Da bruker appen tjenesteeierens token for akkurat denne datatypen.

{{% notice warning %}}
Appen kan ikke lagre endringer med brukerens token og tjenesteeierens token samtidig. Endrer du både skjemadataene til brukeren og de beskyttede dataene i samme kode, får du en feil når appen lagrer. Les gjerne de beskyttede dataene når brukeren endrer skjemaet, men endre dem bare i kode som ikke samtidig endrer brukerens data, for eksempel når en oppgave starter.
{{% /notice %}}

### Skrive data

Eksempelet under lagrer data i den beskyttede datatypen når prosessen går inn i oppgaven `Task_1`. Det bruker en [prosess-hook]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/pre-post-hooks" >}}) som implementerer `IOnTaskStartingHandler`. Koden henter informasjon fra et tenkt API og lagrer den i `restrictedDataModel`. Brukeren kan ikke se informasjonen, men appen kan hente den senere.

Hooken kan kjøre flere ganger hvis noe feiler underveis. Derfor oppdaterer koden dataelementet hvis det allerede finnes, i stedet for å lage et nytt.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/RestrictedDataOnTaskStart.cs.md" %}}

### Lese data

Eksempelet under implementerer `IDataWriteProcessor` og gjør en tenkt skatteberegning når brukeren endrer inntekten i skjemaet. Beregningen trenger informasjon som appen har lagret i den beskyttede datatypen. Koden leser den med tjenesteeierens token, men endrer den ikke.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/DataWriteHandler.cs.md" %}}

### Registrere klassene

Til slutt registrerer du klassene i `Program.cs`.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Program.cs.md" %}}
