---
draft: true
title: Brukerstyrt signering
linktitle: Brukerstyrt signering
description: Slik setter du opp brukerstyrt signering i tjenesten din.
tags: [signering, needsReview, translate]

aliases:
  - /nb/altinn-studio/guides/signing/runtime-delegated-signing
---

{{% insert "content/altinn-studio/v10/develop-a-service/data/restricted-data/shared/style.css.md" %}}

{{%notice info%}}
Tilgjengelig fra [v8.6.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.6.0)
{{%/notice%}}

## Slik fungerer brukerstyrt signering
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/intro.nb.md" %}}

## Avhengigheter

### Maskinporten
Du trenger Maskinporten både for [meldingstjenesten](#meldingstjenesten) og for å jobbe med [beskyttede data](/nb/altinn-studio/v10/develop-a-service/data/restricted-data/).

Hvis du trenger hjelp med å sette opp Maskinporten i appen din, finner du det du trenger i [denne veiledningen](/nb/altinn-studio/v10/develop-a-service/reference/integration/maskinporten/).

### Meldingstjenesten
Brukerstyrt signering bruker meldingstjenesten (Correspondence) i Altinn. Den må du sette opp separat.

Meldingstjenesten sender beskjed til de som skal signere om at de må signere et skjema i Altinn. Den sender også en kvittering til innboksen når de har signert.

[Slik kommer du i gang med meldingstjenesten](/nb/correspondence/getting-started/).

## Eksempel på konfigurasjon
I dette [repositoriet](https://altinn.studio/repos/ttd/signering-brukerstyrt) ligger et eksempel på en app som har brukerstyrt signering.

Flyten i appen er slik:

1. Brukeren som fyller ut skjemaet oppgir fødselsnummer og etternavn til de som skal signere. Hvis noen skal signere på vegne av en virksomhet, oppgir brukeren organisasjonsnummer.
2. Når skjemaet er ferdig utfylt, klikker brukeren på **Til signering**. Det flytter prosessen til signeringssteget.
3. Når signeringssteget starter, sjekker appen hvem som må få tillatelse til å signere (via grensesnittet `ISigneeProvider`).
4. De som skal signere får de rettighetene de trenger og varsel om at de har en signeringsoppgave.
5. Skjemaet de skal signere kommer i innboksen. De kan åpne det, se over informasjonen og signere.
6. Brukeren som sendte inn signerer også, hvis appen er satt opp til det. Deretter sendes skjemaet inn.

**Merk:** Vi støtter ikke automatisk innsending ennå.

Følg trinnene under for å sette opp en slik app.

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Legg til layout-set for signering

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 3. Valgfritt - Egendefinert validering

{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/custom-validation.nb.md" %}}

## 4. Oppgi hvem som skal signere

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/studio/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 5. Valgfritt - Legg til tekstressurser

Denne seksjonen er bare relevant hvis du vil endre standardtekstene som brukes når vi kommuniserer med de som skal signere.

Disse standardverdiene brukes hvis du ikke endrer kommunikasjonstekstene:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Standardtekster bokmål">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Innboksmelding til den som signerer - tittel     | "{appName}: Oppgave til signering" |
| Innboksmelding til den som signerer - undertittel | "Din signatur ventes for {appName}." |
| Innboksmelding til den som signerer - innhold    | "Du har en oppgave som venter på din signatur. <a href=\"{instanceUrl}\">Klikk her for å åpne applikasjonen</a>.<br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
| Sms til den som signerer - innhold               | "Din signatur ventes for {appName}. Åpne Altinn-innboksen din for å fortsette." |
| E-post til den som signerer - emne               | "{appName}: Oppgave til signering" |
| E-post til den som signerer - innhold            | "Din signatur ventes for {appName}. Åpne Altinn-innboksen din for å fortsette.<br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
| Kvittering til den som signerer - tittel         | "{appName}: Signeringen er bekreftet" |
| Kvittering til den som signerer - undertittel     | "Du har signert for {appName}." |
| Kvittering til den som signerer - innhold        | "Dokumentene du har signert er vedlagt. Disse kan lastes ned om ønskelig. <br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
{{</content-version-container>}}
{{<content-version-container version-label="Standardtekster nynorsk">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Innboksmelding til den som signerer - tittel     | "{appName}: Oppgåve til signering" |
| Innboksmelding til den som signerer - undertittel | "Signaturen din vert venta for {appName}." |
| Innboksmelding til den som signerer - innhold    | "Du har ei oppgåve som ventar på signaturen din. <a href=\"{instanceUrl}\">Klikk her for å opne applikasjonen</a>.<br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
| Sms til den som signerer - innhold               | "Signaturen din vert venta for {appName}. Opne Altinn-innboksen din for å gå vidare." |
| E-post til den som signerer - emne               | "{appName}: Oppgåve til signering" |
| E-post til den som signerer - innhold            | "Signaturen din vert venta for {appName}. Opne Altinn-innboksen din for å gå vidare.<br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
| Kvittering til den som signerer - tittel         | "{appName}: Signeringa er stadfesta" |
| Kvittering til den som signerer - undertittel     | "Du har signert for {appName}." |
| Kvittering til den som signerer - innhold        | "Dokumenta du har signert er vedlagde. Dei kan lastast ned om ønskeleg. <br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
{{</content-version-container>}}
{{<content-version-container version-label="Standardtekster engelsk">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Innboksmelding til den som signerer - tittel     | "{appName}: Task for signing" |
| Innboksmelding til den som signerer - undertittel | "Your signature is requested for {appName}." |
| Innboksmelding til den som signerer - innhold    | "You have a task waiting for your signature. <a href=\"{instanceUrl}\">Click here to open the application</a>.<br /><br />If you have any questions, you can contact {appOwner}." |
| Sms til den som signerer - innhold               | "Your signature is requested for {appName}. Open your Altinn inbox to proceed." |
| E-post til den som signerer - emne               | "{appName}: Task for signing" |
| E-post til den som signerer - innhold            | "Your signature is requested for {appName}. Open your Altinn inbox to proceed.<br /><br />If you have any questions, you can contact {appOwner}." |
| Kvittering til den som signerer - tittel         | "{appName}: Signature confirmed" |
| Kvittering til den som signerer - undertittel     | "Your signature has been registered for {appName}." |
| Kvittering til den som signerer - innhold        | "The signed documents are attached. They may be downloaded. <br /><br />If you have any questions, you can contact {appOwner}." |
{{</content-version-container>}}
{{</content-version-selector>}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/studio/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 6. Valgfritt - Tilpass hvordan de som skal signere varsles

`CommunicationConfig` er valgfritt. Her kan du endre standardtekstene som brukes i kommunikasjon med de som skal signere, som beskrevet i forrige punkt. Du kan også endre e-postadresse og telefonnummer for de som skal signere.

{{% notice info %}}
Hvis du ikke endrer disse innstillingene, sendes en melding til innboksen i Altinn med en lenke til applikasjonsinstansen. En notifikasjon sendes også på e-postadresse.
{{% /notice %}}

Hvis du ikke endrer e-postadresser og telefonnumre, hentes de som beskrevet i [Recipient lookup](/nb/notifications/explanation/recipient-lookup/) og [Address lookup](/nb/notifications/explanation/address-lookup/).

Dette kan du endre i kommunikasjonen med de som skal signere:

| Property                                                      | Description                                         | Type                              |
| ------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- |
| CommunicationConfig                                           | Objektet for kommunikasjonskonfigurasjon            | Object                            |
| CommunicationConfig.InboxMessage                              | Objektet for innboksmeldingskonfigurasjon           | Object                            |
| CommunicationConfig.InboxMessage.TitleTextResourceKey         | Tekstressursnøkkelen for innboksmeldingstittel      | String                            |
| CommunicationConfig.InboxMessage.SummaryTextResourceKey       | Tekstressursnøkkelen for innboksmeldingssammendrag  | String                            |
| CommunicationConfig.InboxMessage.BodyTextResourceKey          | Tekstressursnøkkelen for innboksmeldingsinnhold     | String                            |
| CommunicationConfig.Notification                              | Objektet for varslingskonfigurasjon                 | Object                            |
| CommunicationConfig.Notification.Email                        | Objektet for e-postmeldingsvarsling                 | Object                            |
| CommunicationConfig.Notification.Email.EmailAddress           | Tekstressursnøkkelen for e-postadresse              | String                            |
| CommunicationConfig.Notification.Email.SubjectTextResourceKey | Tekstressursnøkkelen for e-postemne                 | String                            |
| CommunicationConfig.Notification.Email.BodyTextResourceKey    | Tekstressursnøkkelen for e-postinnhold              | String                            |
| CommunicationConfig.Notification.Sms                          | Objektet for SMS-varslingskonfigurasjon             | Object                            |
| CommunicationConfig.Notification.Sms.MobileNumber             | Tekstressursnøkkelen for mobilnummer                | String                            |
| CommunicationConfig.Notification.Sms.BodyTextResourceKey      | Tekstressursnøkkelen for SMS-innhold                | String                            |
| CommunicationConfig.Notification.NotificationChoice           | Varslingspreferansevalget                           | NotificationChoice enum (String)  |

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/backend-manual/communication-config.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/studio/communication-config.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 7. Test brukerstyrt signering
{{% insert "content/altinn-studio/v10/develop-a-service/process/signing/runtime-delegated-signing/test.nb.md" %}}
