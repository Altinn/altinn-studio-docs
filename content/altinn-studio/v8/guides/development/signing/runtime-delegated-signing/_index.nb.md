---
title: Brukerstyrt signering
linktitle: Brukerstyrt signering
description: Slik setter du opp brukerstyrt signering i tjenesten din.
tags: [signering]
weight: 50
aliases:
  - /nb/altinn-studio/guides/signing/runtime-delegated-signing
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}}

{{%notice info%}}
Tilgjengelig fra [v8.6.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v8.6.0)
{{%/notice%}}

## Hva betyr brukerstyrt signering?
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/intro.nb.md" %}}

## Avhengigheter

### Maskinporten
Maskinporten kreves av både [meldingstjenesten](#meldingstjenesten) og for interaksjon med [beskyttede data](/nb/altinn-studio/v8/guides/development/restricted-data/).

For brukerstyrt signering må Maskinporten-klienten din ha tilgang til følgende scopes:

- `altinn:correspondence.read`
- `altinn:correspondence.write`
- `altinn:serviceowner/instances.read`
- `altinn:serviceowner/instances.write`

Scopes for correspondence brukes når appen sender meldinger til signatarer som et kall til handling.
Tjenesteeier-scopes brukes for intern tilstands-føring i appen.

Hvis du trenger hjelp med oppsett av Maskinporten i din app, finner du all informasjonen du trenger i [denne guiden](/nb/altinn-studio/v8/guides/integration/maskinporten/).

### Meldingstjenesten
Brukerstyrt signering avhenger av Meldingstjenesten (Correspondence) i Altinn, som krever et separat oppsett.

Meldingstjenesten brukes for å gi beskjed til de som skal signere om at de må signere et skjema i Altinn, og for å sende en kvittering til innboksen deres når de har signert.

[Slik kommer du i gang med meldingstjenesten](/nb/correspondence/getting-started/).

## Eksempel på konfigurasjon
I dette [repoet](https://altinn.studio/repos/ttd/signering-brukerstyrt) ligger det et eksempel på en app som har brukerstyrt signering.

Flyten i appen er slik:

1. Den som fyller ut skjemaet oppgir fødselsnummer og etternavn, eller eventuelt organisasjonsnummer hvis den som skal signere representerer en virksomhet.
2. Når skjemaet er ferdig utfylt, klikker den som fyller ut på "Til signering". Det beveger prosessen til neste steg, som er signeringssteget.
3. Når signeringssteget blir startet, kaller appen opp en implementering av grensesnittet `ISigneeProvider` for å finne ut hvem som må få tillatelse til å signere.
4. De som skal signere får delegert de rettighetene de trenger, og de blir varslet om at de har en signeringsoppgave.
5. Skjemaet de skal signere kommer i innboksen slik at de kan åpne det, se over informasjonen og signere.
6. Innsenderen signerer også, hvis appen er satt opp til det, og deretter blir skjemaet sendt inn.

**Merk:** Vi støtter ikke automatisk innsending enda.

Følg trinnene under for å sette opp en slik app.

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Legg til layout-set for signering

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 3. Valgfritt - Egendefinert validering

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/custom-validation.nb.md" %}}

## 4. Oppgi hvem som skal signere

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 5. Valgfritt - Legg til tekstressurser

Denne seksjonen er kun relevant for deg dersom du ønsker å endre på standardtekstene i kommunikasjon med signatarer - de 
som skal signere.

Standardverdiene som brukes dersom kommunikasjonstekstene ikke overstyres er som følger:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Standardtekster bokmål">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Innboksmelding til signatar - tittel     | "{appName}: Oppgave til signering" |
| Innboksmelding til signatar - undertittel | "Din signatur ventes for {appName}." |
| Innboksmelding til signatar - innhold    | "Du har en oppgave som venter på din signatur. <a href=\"{instanceUrl}\">Klikk her for å åpne applikasjonen</a>.<br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
| Sms til signatar - innhold               | "Din signatur ventes for {appName}. Åpne Altinn-innboksen din for å fortsette." |
| E-post til signatar - emne               | "{appName}: Oppgave til signering" |
| E-post til signatar - innhold            | "Din signatur ventes for {appName}. Åpne Altinn-innboksen din for å fortsette.<br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
| Kvittering til signatar - tittel         | "{appName}: Signeringen er bekreftet" |
| Kvittering til signatar - undertittel     | "Du har signert for {appName}." |
| Kvittering til signatar - innhold        | "Dokumentene du har signert er vedlagt. Disse kan lastes ned om ønskelig. <br /><br />Hvis du lurer på noe, kan du kontakte {appOwner}." |
{{</content-version-container>}}
{{<content-version-container version-label="Standardtekster nynorsk">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Innboksmelding til signatar - tittel     | "{appName}: Oppgåve til signering" |
| Innboksmelding til signatar - undertittel | "Signaturen din vert venta for {appName}." |
| Innboksmelding til signatar - innhold    | "Du har ei oppgåve som ventar på signaturen din. <a href=\"{instanceUrl}\">Klikk her for å opne applikasjonen</a>.<br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
| Sms til signatar - innhold               | "Signaturen din vert venta for {appName}. Opne Altinn-innboksen din for å gå vidare." |
| E-post til signatar - emne               | "{appName}: Oppgåve til signering" |
| E-post til signatar - innhold            | "Signaturen din vert venta for {appName}. Opne Altinn-innboksen din for å gå vidare.<br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
| Kvittering til signatar - tittel         | "{appName}: Signeringa er stadfesta" |
| Kvittering til signatar - undertittel     | "Du har signert for {appName}." |
| Kvittering til signatar - innhold        | "Dokumenta du har signert er vedlagde. Dei kan lastast ned om ønskeleg. <br /><br />Om du lurer på noko, kan du kontakte {appOwner}." |
{{</content-version-container>}}
{{<content-version-container version-label="Standardtekster engelsk">}}
| Tekst                                    | StandardVerdi |
| ---------------------------------------- | ------------- |
| Innboksmelding til signatar - tittel     | "{appName}: Task for signing" |
| Innboksmelding til signatar - undertittel | "Your signature is requested for {appName}." |
| Innboksmelding til signatar - innhold    | "You have a task waiting for your signature. <a href=\"{instanceUrl}\">Click here to open the application</a>.<br /><br />If you have any questions, you can contact {appOwner}." |
| Sms til signatar - innhold               | "Your signature is requested for {appName}. Open your Altinn inbox to proceed." |
| E-post til signatar - emne               | "{appName}: Task for signing" |
| E-post til signatar - innhold            | "Your signature is requested for {appName}. Open your Altinn inbox to proceed.<br /><br />If you have any questions, you can contact {appOwner}." |
| Kvittering til signatar - tittel         | "{appName}: Signature confirmed" |
| Kvittering til signatar - undertittel     | "Your signature has been registered for {appName}." |
| Kvittering til signatar - innhold        | "The signed documents are attached. They may be downloaded. <br /><br />If you have any questions, you can contact {appOwner}." |
{{</content-version-container>}}
{{</content-version-selector>}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 6. Valgfritt - skreddersy hvordan signatarene varsles

Legg merke til at `CommunicationConfig` er valgfritt. Her kan du overstyre standardtekster brukt i kommunikasjon med signatarene,
som beskrevet i forrige punkt. Du kan også overstyre e-post adresse og telefonnummer for signatarene. 

{{% notice info %}}
Hvis `CommunicationConfig` ikke er satt, sendes en melding til innboksen i Altinn med en lenke til applikasjonsinstansen,
og et varsel sendes bare på e-post, med Altinns generiske varslingsmal.
{{% /notice %}}

{{% notice warning %}}
Vil du varsle på SMS, eller bruke standardtekstene for SMS og e-post fra forrige punkt, må du sette `CommunicationConfig.NotificationChoice`.
Hvis den ikke er satt, avgjøres kanalen av `Notification.Email.EmailAddress` og `Notification.Sms.MobileNumber`,
og når ingen av dem har verdi, sendes bare den generiske e-posten. Det holder å sette `NotificationChoice` for å bruke standardtekstene
og den registrerte kontaktinformasjonen.
{{% /notice %}}

Hvis du ikke endrer e-postadresser og telefonnumre, hentes de som beskrevet i [Recipient lookup](/nb/notifications/explanation/recipient-lookup/) og [Address lookup](/nb/notifications/explanation/address-lookup/).

Dette kan du endre i kommunikasjonen med de som skal signere:

| Property                                                      | Description                                                                                                  | Type                    |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------- |
| CommunicationConfig                                           | Objektet for kommunikasjonskonfigurasjon                                                                     | Object                  |
| CommunicationConfig.NotificationChoice                        | Hvilken kanal det varsles på: `Email`, `Sms`, `SmsAndEmail`, `SmsPreferred` eller `EmailPreferred`           | NotificationChoice enum |
| CommunicationConfig.InboxMessage                              | Objektet for innboksmeldingskonfigurasjon                                                                    | Object                  |
| CommunicationConfig.InboxMessage.TitleTextResourceKey         | Tekstressursnøkkelen for innboksmeldingstittel                                                               | String                  |
| CommunicationConfig.InboxMessage.SummaryTextResourceKey       | Tekstressursnøkkelen for innboksmeldingssammendrag                                                           | String                  |
| CommunicationConfig.InboxMessage.BodyTextResourceKey          | Tekstressursnøkkelen for innboksmeldingsinnhold                                                              | String                  |
| CommunicationConfig.Notification                              | Objektet for varslingskonfigurasjon                                                                          | Object                  |
| CommunicationConfig.Notification.Email                        | Objektet for e-postvarsling                                                                                  | Object                  |
| CommunicationConfig.Notification.Email.EmailAddress           | Overstyrer e-postadressen. Hvis den ikke er satt, brukes registrert kontaktinformasjon                       | String                  |
| CommunicationConfig.Notification.Email.SubjectTextResourceKey | Tekstressursnøkkelen for e-postemne                                                                          | String                  |
| CommunicationConfig.Notification.Email.BodyTextResourceKey    | Tekstressursnøkkelen for e-postinnhold                                                                       | String                  |
| CommunicationConfig.Notification.Sms                          | Objektet for SMS-varsling                                                                                    | Object                  |
| CommunicationConfig.Notification.Sms.MobileNumber             | Overstyrer mobilnummeret. Hvis det ikke er satt, brukes registrert kontaktinformasjon                        | String                  |
| CommunicationConfig.Notification.Sms.BodyTextResourceKey      | Tekstressursnøkkelen for SMS-innhold                                                                         | String                  |
| CommunicationConfig.ReminderNotification                      | Hvis satt, sendes en påminnelse til de som ikke har signert. Samme struktur som `Notification`, men bare tekstressursnøklene brukes | Object |

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/communication-config.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/studio/communication-config.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 7. Test brukerstyrt signering
{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/test.nb.md" %}}
