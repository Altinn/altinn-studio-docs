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

## 4. Valgfritt - Legg til tekstressurser

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

## 5. Oppgi hvem som skal signere

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 6. Varsle signatarene

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/custom-validation.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/custom-validation.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 7. Testing

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/test.nb.md" %}}
