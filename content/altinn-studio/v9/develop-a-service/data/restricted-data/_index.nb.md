---
draft: true
title: Beskyttede data
description: Slik setter du opp ekstra databeskyttelse for en app
tags: [needsReview]

---

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Beskyttede data er informasjon som krever ekstra tilgangskontroll, for eksempel personopplysninger om andre enn brukeren, eller konfidensiell informasjon. Appen kan lagre slike data i en egen datatype som brukeren ikke kan lese eller endre. Bare den som har tilgang til bestemte handlinger, vanligvis tjenesteeieren, kan lese og skrive dataene.

Prøver brukeren å lese eller skrive dataene uten tilgang til handlingene, avviser appen forespørselen med `403 Forbidden`.

Du setter dette opp i koden til appen. Altinn Studio Designer har ikke innstillinger for beskyttede data.

Appen leser og skriver de beskyttede dataene med tjenesteeierens token. For å hente tokenet trenger appen standardscopene for tjenesteeieren i Maskinporten. Altinn Studio legger dem til automatisk når du bygger en v9-app, så du trenger ikke å sette opp Maskinporten selv. Les mer om [hvordan du integrerer en Altinn-app med Maskinporten]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}).

## Sette opp datatypene

Filen `applicationmetadata.json` inneholder alle datatypene i appen ([les om datatyper i app-metadata]({{< relref "/api/models/app-metadata#datatype" >}}), kun på engelsk). Her angir du hvilke [handlinger]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/authorization#action-attributter" >}}) brukeren eller tjenesteeieren må ha tilgang til for å lese og skrive den beskyttede datatypen.

I eksempelet legger du til en ny datatype med egenskapene `actionRequiredToRead` og `actionRequiredToWrite`, og slår av `autoCreate`. Datatypen heter `restrictedDataModel`, men du kan velge et annet navn.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Applicationmetadata.json.md" %}}

{{% notice info %}}
Du slår av `autoCreate` fordi koden i eksempelet under oppretter dataelementet selv, med riktig innhold. Når `autoCreate` er slått av, har koden din ansvaret for å opprette dataelementet.
{{% /notice %}}

## Sette opp autorisasjonspolicyen

Ta utgangspunkt i [standardfilen `policy.xml`]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/authorization" >}}), og endre regel 2 slik at tjenesteeieren får tilgang til de nye handlingene.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Policy.xml.md" %}}

## Lese og skrive beskyttede data

Appen oppretter ikke `restrictedDataModel` automatisk, og datatypen er ikke en del av skjemaet brukeren fyller ut. Derfor må du skrive koden som leser og skriver dataene selv.

Hvilket token appen bruker, avhenger av hvor koden kjører:

- I kode som kjører når brukeren gjør noe, for eksempel endrer skjemaet, bruker appen brukerens token. Her kaller du `OverrideAuthenticationMethod` med `StorageAuthenticationMethod.ServiceOwner()`. Da bruker appen tjenesteeierens token for akkurat denne datatypen.
- I hooker som kjører i prosessen, for eksempel `IOnTaskStartingHandler`, bruker appen allerede tjenesteeierens token for alle datatyper. Her trenger du ikke å kalle `OverrideAuthenticationMethod`.

{{% notice warning %}}
Appen kan ikke lagre endringer med brukerens token og tjenesteeierens token samtidig. Når brukeren endrer skjemaet, lagrer appen endringene i skjemadataene med brukerens token. Derfor kan du aldri endre de beskyttede dataene i `IDataWriteProcessor`. Gjør du det, får du en feil når appen lagrer. Du kan bare lese de beskyttede dataene der. Vil du endre dem, gjør du det i en hook i prosessen, der appen bruker tjenesteeierens token for alle datatyper.
{{% /notice %}}

{{% notice warning %}}
Har du slått på XSD-validering (`XsdValidation` under `AppSettings`), og finnes det en XSD-fil for `restrictedDataModel`, leser valideringen også de beskyttede dataene med brukerens token. Da kan brukeren få feilen `403 Forbidden`.
{{% /notice %}}

### Skrive data

Eksempelet under lagrer data i den beskyttede datatypen når prosessen går inn i oppgaven `Task_1`. Koden er en hook i prosessen som bruker grensesnittet `IOnTaskStartingHandler`. Les mer om `IOnTaskStartingHandler` i [veiledningen for å oppgradere fra v8 til v9]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}#vi-har-flyttet-egendefinerte-oppgave-hooker-og-de-har-fått-ny-funksjonsmåte). Koden henter informasjon fra et tenkt API og lagrer den i `restrictedDataModel`. Brukeren kan ikke se informasjonen, men appen kan hente den senere.

Hooken må tåle å kjøre flere ganger, for eksempel når prosessen går tilbake til oppgaven. Derfor oppdaterer koden dataelementet hvis det allerede finnes, i stedet for å lage et nytt.

{{% notice warning %}}
Du kan bare ha én `IOnTaskStartingHandler` per oppgave. Har appen allerede en slik hook for `Task_1`, legger du koden inn i den.
{{% /notice %}}

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/RestrictedDataOnTaskStart.cs.md" %}}

### Lese data

Eksempelet under bruker grensesnittet `IDataWriteProcessor` og gjør en tenkt skatteberegning når brukeren endrer inntekten i skjemaet. Beregningen trenger informasjon som appen har lagret i den beskyttede datatypen. Koden kjører når brukeren endrer skjemaet, og må derfor kalle `OverrideAuthenticationMethod` for å lese dataene med tjenesteeierens token. Koden endrer ikke de beskyttede dataene.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/DataWriteHandler.cs.md" %}}

### Registrere klassene

Til slutt registrerer du klassene i `Program.cs`.

{{% insert "content/altinn-studio/v9/develop-a-service/data/restricted-data/shared/Program.cs.md" %}}
