---
title: Brukerstyrt signering
linktitle: Brukerstyrt signering
description: Slik setter du opp brukerstyrt signering i tjenesten din.
tags: [signering]
weight: 50
aliases:
  - /nb/altinn-studio/guides/signing/runtime-delegated-signing
---

## Hva betyr brukerstyrt signering?

{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/intro.nb.md" %}}

## Avhengigheter

Brukerstyrt signering avhenger av Meldingstjenesten (Correspondence) i Altinn. Den må du sette opp utenom.

Meldingstjenesten brukes for å gi beskjed til de som skal signere om at de må signere et skjema i Altinn, og for å sende en kvittering til innboksen deres når de har signert.

[Slik kommer du i gang med meldingstjenesten](/nb/correspondence/getting-started/).

## Eksempel på konfigurasjon

I dette [repoet](https://altinn.studio/repos/ttd/signering-brukerstyrt) ligger det et eksempel på en app som har brukerstyrt signering.

Flyten i appen er slik:

1. Den som fyller ut skjemaet oppgir fødselsnummer og etternavn, eller eventuelt organisasjonsnummer hvis den som skal signere representerer en virksomhet.
2. Når skjemaet er ferdig utfylt, klikker den som fyller ut på "Til signering". Det beveger prosessen til neste steg, som er signeringssteget.
3. Når signeringssteget blir startet, kaller appen opp en implementering av grensensittet `ISigneeProvider`, som dere må implementere, for å finne ut hvem som må få tillatelse til å signere.
4. De som skal signere får delegert de rettighetene de trenger, og de blir varslet om at de har en signeringsoppgave.
5. Skjemaet de skal signere kommer i innboksen slik at de kan åpne det, se over informasjonen og signere.
6. Innsenderen signerer også, hvis appen er satt opp til det, og deretter blir skjemaet sendt inn. 

**Merk:** Vi støtter ikke automatisk innsending enda.

Under ser du de viktiste stegene for å få satt opp en slik app.

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

## 6. Test brukerstyrt signering

> **Obs!** Foreløpig er det ikke laget mocking av delegasjon i `localtest`, så du må i praksis teste i TT02-miljøet.

Det er caching i autorisasjonslaget som gjør at det kan ta tid før en bruker som har fått delegert tilgang til et skjema via brukerstyrt signering, ser selve skjemaet i sin Altinn-innboks.

Men dette skjer bare for

- de brukerne som er aktivt pålogget Altinn når et eksemplar/en instans blir delegert
- de som ikke allerede har annen tilgang for InstanceOwner

For at du skal slippe å oppleve problemer med dette mens du tester, kan du delegere til en person du ikke har brukt i testingen den siste timen.
