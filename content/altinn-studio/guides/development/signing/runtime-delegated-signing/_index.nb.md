---
title: Brukerstyrt signering
linktitle: Brukerstyrt
description: Følg disse stegene for å implementere brukerstyrt signering i din tjeneste.
tags: [signering]
weight: 50
aliases:
  - /nb/altinn-studio/guides/signing/runtime-delegated-signing
---

## Hva betyr brukerstyrt signering?

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/intro.nb.md" %}}

## Avhengigheter

Brukerstyrt signering avhenger av Meldingstjenesten (Correspondence) i Altinn, som krever eget oppsett.

Melding brukes for å gi beskjed til signatar om at de har blitt bedt om å signere et skjema i Altinn, og for å sende signeringskvittering til innboksen ders når signeringen er utført.

Se hvordan du kommer i gang med det i [denne guiden](/nb/correspondence/getting-started/).

## Eksempel på konfigurasjon

I følgende [repo](https://altinn.studio/repos/ttd/signering-brukerstyrt) ligger det eksempel på en applikasjon med brukerstyrt signering.

Hovedflyten i applikasjonen er:

1. Utfyller av skjema oppgir fødselsnummer og etternavn for personer eller organisasjonsnummer for organisasjoner som skal signere.
2. Når skjema er ferdig utfylt trykker utfyller "Til signering", som beveger prosessen til neste steg i prosessen, som er signeringssteget.
3. I det signeringssteget initialiseres kaller appen en implementasjon av interfacet `ISigneeProvider`, som dere må implementere, for å finne ut hvem som må få delegert tilgang til å signere.
4. Signatarene får delegert rettigheter og mottar notifikasjon om at de har en signeringsoppgave.
5. Signatarene finner skjemaet i sin innboks, åpner det, ser over data og trykker signer.
6. Innsender signerer også, dersom appen satt opp slik, og sender deretter inn skjemaet. Automatisk innsending er p.t. ikke søttet.

Nedenfor følger de viktiste konfigurasjonsstegene for å få satt opp en slik applikasjon.

## 1. Legg til en signeringsoppgave i appens prosess, med tilhørende konfigurasjon

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/add-process-task.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 2. Legg til layout-set for signering

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/configure-layouts.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 3. Valgfritt - Egendefinert validering

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/custom-validation.nb.md" %}}

## 4. Oppgi hvem som skal signere

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/signee-provider.nb.md" %}}
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
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 6. Valgfritt - skreddersy hvordan signatarene varsles

Legg merke til at `CommunicationConfig` er valgfritt. Her kan du overstyre standardtekster brukt i kommunikasjon med signatarene,
som beskrevet i forrige punkt. Du kan også overstyre e-post adresse og telefonnummer for signatarene. 

{{% notice info %}}
Dersom ikke overstyrt, vil en
melding sendes til signatarenes Altinn-innboks med en lenke til den relevante applikasjons­instansen, og en notifikasjon vil bli
sendt via e-post.
{{% /notice %}}

Om ikke overstyrt, vil e-postadressene og telefonnumrene populeres som beskrevet i [Recipient lookup](/notifications/explanation/recipient-lookup/) og [Address lookup](/notifications/explanation/address-lookup/).

Dette er de mulige overstyringskonfigurasjonene for kommunikasjon med signatarer:

| Property                                                      | Description                                         | Type                              |
| ------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- |
| CommunicationConfig                                           | Objektet for kommunikasjonskonfigurasjon            | Object                            |
| CommunicationConfig.InboxMessage                              | Objektet for innboksmeldingskonfigurasjon           | Object                            |
| CommunicationConfig.InboxMessage.TitleTextResourceKey         | Tekstressursnøkkelen for innboksmeldingstittel      | String                            |
| CommunicationConfig.InboxMessage.SummaryTextResourceKey       | Tekstressursnøkkelen for innboksmeldingssammendrag  | String                            |
| CommunicationConfig.InboxMessage.BodyTextResourceKey          | Tekstressursnøkkelen for innboksmeldingsinnhold     | String                            |
| CommunicationConfig.Notification                              | Objektet for varslingskonfigurasjon                 | Object                            |
| CommunicationConfig.Notification.Email                        | Objektet for e-postvarselingskonfigurasjon          | Object                            |
| CommunicationConfig.Notification.Email.EmailAddress           | Tekstressursnøkkelen for e-postadresse              | String                            |
| CommunicationConfig.Notification.Email.SubjectTextResourceKey | Tekstressursnøkkelen for e-postemne                 | String                            |
| CommunicationConfig.Notification.Email.BodyTextResourceKey    | Tekstressursnøkkelen for e-postinnhold              | String                            |
| CommunicationConfig.Notification.Sms                          | Objektet for SMS-varslingskonfigurasjon             | Object                            |
| CommunicationConfig.Notification.Sms.MobileNumber             | Tekstressursnøkkelen for mobilnummer                | String                            |
| CommunicationConfig.Notification.Sms.BodyTextResourceKey      | Tekstressursnøkkelen for SMS-innhold                | String                            |
| CommunicationConfig.Notification.NotificationChoice           | Varslingspreferansevalget                           | NotificationChoice enum (String)  |

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/communication-config.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/communication-config.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 7. Testing

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/test.nb.md" %}}
