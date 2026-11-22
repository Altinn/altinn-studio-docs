---
title: Teste appen lokalt
linktitle: Lokalt
description: Slik kjører og tester du appen på maskinen din med den lokale testplattformen.
tags: [Reviewed]

aliases:
- /nb/altinn-studio/v8/reference/testing/local/
---

Du kan teste appen på maskinen din uten å publisere den i et testmiljø. `studioctl` starter appen og den lokale testplattformen, som erstatter plattformtjenestene appen bruker i et testmiljø.

## Kjøre appen lokalt

Følg [oppsettet for lokal utvikling]({{< relref "/altinn-studio/v9/getting-started/development/localtest/local-dev" >}}) for å installere verktøyene og hente app-repoet.

Start testplattformen:

```bash
studioctl env up
```

Kjør deretter denne kommandoen fra app-repoet:

```bash
studioctl run
```

Åpne [local.altinn.cloud:8000](http://local.altinn.cloud:8000). Velg appen under **Select app to test** og en [testbruker]({{< relref "/altinn-studio/v9/test-a-service/testing/local/testusers" >}}) under **Select test users**, og klikk på **Proceed to app**.

{{<children />}}
