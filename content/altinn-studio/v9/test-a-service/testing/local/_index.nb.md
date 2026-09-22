---
draft: true
title: Teste appen lokalt
linktitle: Lokalt
description: Slik kjører og tester du appen på egen maskin med lokal testplattform
tags: [needsReview]

aliases:
- /nb/altinn-studio/v8/reference/testing/local/
---

Du kan teste appen på egen maskin uten å distribuere den til et testmiljø. `studioctl` starter appen og den lokale testplattformen, som erstatter plattformtjenestene appen bruker i et testmiljø.

## Kjøre appen lokalt

Følg [oppsettet for lokal utvikling](/nb/altinn-studio/v9/getting-started/development/localtest/local-dev/) for å installere verktøyene og hente app-repoet.

Start testplattformen:

```sh
studioctl env up
```

Kjør deretter denne kommandoen fra app-repoet:

```sh
studioctl run
```

Åpne [local.altinn.cloud:8000](http://local.altinn.cloud:8000), velg appen og en [testbruker](/nb/altinn-studio/v9/test-a-service/testing/local/testusers/), og gå videre til appen.

{{<children />}}
