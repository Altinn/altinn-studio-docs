---
title: Maskinporten klient
linktitle: Maskinporten klient
description: Hvordan sette opp Maskinporten klient i selvbetjeningsportalen
tags: [Correspondence, guide, maskinporten]
toc: true
weight: 100
---

{{<children />}}

{{% insert "content/shared/maskinporten/maskinporten-client-create.nb.md" %}}

Du kan nå bruke din klient med din nøkkel for å hente Maskinporten tokens.
En detaljert beskrivelse av hvordan du autentiserer din klient med JWT Grant er beskrevet [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

Et Maskinporten token kan byttes mot et Altinn-token. [Dette er beskrevet her](/nb/authentication/what-do-you-get/).

Et Altinn-token er nødvendig for å autentisere mot Altinn API (som f.eks Correspondence API). Autentiseringen mot Altinn API krever også at du har de nødvendige scopes på klienten og at du bruker en ressurs hvor din organisasjon har tillatelse til disse scopesene.

Fra en [Altinn Studio](/nb/altinn-studio) app er Maskinporten-integrasjon tilgjengelig via den innebygde autentiseringsklienten. Følg [brukerveiledningen](/nb/altinn-studio/guides/integration/maskinporten) for å komme i gang.

For andre _.Net_ apper kan du bruke dette [frittstående biblioteket](https://github.com/Altinn/altinn-apiclient-maskinporten) for å håndtere autentisering. Biblioteket gir extension methods for å konfigurere HttpClients til å autentisere med Maskinporten basert på din oppgitte konfigurasjon.