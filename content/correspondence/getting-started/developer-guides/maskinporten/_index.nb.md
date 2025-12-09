---
title: Maskinporten
linktitle: Maskinporten
description: Hvordan sette opp en Maskinporten-klient i selvbetjeningsportalen
tags: [Correspondence, guide, maskinporten]
toc: true
weight: 100
---

{{<children />}}

{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}

Du kan nå bruke klienten din of tilhørende nøkkel for å hente et Maskinporten-token. En detaljert beskrivelse av hvordan du autentiserer din klient med JWT Grant er beskrevet [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

Dette Maskinporten-tokenet kan byttes mot et Altinn-token for bruk i Altinn sitt økosystem. [Dette er beskrevet her](/nb/authorization/what-do-you-get/authentication/).

Et Altinn-token er nødvendig for å autentisere mot Altinn API-er (som f.eks. Correspondence API), forutsatt at klienten din har tilgang til de nødvendige scopene for det aktuelle API-et.

{{% insert "content/shared/maskinporten/maskinporten-authentication-methods.nb.md" %}}