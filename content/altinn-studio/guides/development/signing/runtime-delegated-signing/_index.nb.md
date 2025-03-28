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

## 3. Legg til tekstressurser

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manual setup">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/setup-text-resources.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 4. Oppgi hvem som skal signere

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/backend-manual/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/guides/development/signing/runtime-delegated-signing/studio/signee-provider.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}

## 5. Testing

> **Obs!** Foreløpig er det ikke laget mocking av delegasjon i localtest, så testing må i praksis utføres i TT02-miljøet.

Det er caching i autorisasjonslaget som gjør at det kan ta tid før en bruker som har fått delegert tilgang til et skjema via brukerstyrt signering ser skjemaet i sin Altinn innboks.

Men dette vil altså bare inntreffe for:

- De brukerne som er aktivt pålogget Altinn når instansdelegeringen skjer
- Ikke allerede har annen tilgang for InstanceOwner

For å unngå å oppleve dette under testing kan man delegere til en person man ikke har brukt i testing den siste timen.
