---
draft: true
title: Vedlegg og virusskanning
linktitle: Vedlegg
description: Oversikt over hvordan appen tar imot vedlegg fra brukere og systemer, og hvordan virusskanning fungerer.
tags: [needsReview]
---

Et vedlegg er en fil som en bruker eller et system laster opp til en instans, for eksempel en attest, et bilde eller en PDF. Du kan ta imot vedlegg på to måter:

- Brukerne laster opp filer i skjemaet med komponenten [`FileUpload`]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/FileUpload" >}}).
- Systemer laster opp filer via API, uten at brukerne ser det i skjemaet.

Du kan bruke begge måtene i samme app. Det er ingen grense for hvor mange vedleggstyper appen kan ha.

Hver vedleggstype er en datatype i filen `App/config/applicationmetadata.json`. Datatypen bestemmer blant annet hvilke filtyper appen godtar, hvor store filene kan være og hvor mange filer brukeren kan laste opp. Skal brukerne laste opp i skjemaet, lager Altinn Studio Designer datatypen for deg når du legger til komponenten.

Altinn kan også skanne vedleggene for virus.

Hvordan appen kontrollerer filtyper, filstørrelser og innholdet i filene, står på siden [Utvidet filvalidering]({{< relref "/altinn-studio/v9/develop-a-service/data/validation/files" >}}).

{{<children />}}

## Spørsmål du kan stille utviklerne

- Hvilke vedleggstyper har tjenesten, og er filtyper, filstørrelser og antall filer riktige for hver av dem?
- Hvilke systemer skal laste opp via API, og står de i `allowedContributors`?
- Er virusskanning slått på for alle vedleggstypene, også de vi har laget uten Designer?
- Skal brukerne vente til skanningen er ferdig før de kan sende inn (`validationErrorOnPendingFileScan`)?
- Er opplasting obligatorisk der den skal være det? Bruker vi `minNumberOfAttachments`, ikke `required`?
