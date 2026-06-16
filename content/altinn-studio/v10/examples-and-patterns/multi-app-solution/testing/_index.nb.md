---
draft: true
title: Teste en flerappsløsning i Altinn
linktitle: Testing
description: Slik tester du flerappsløsningen under utvikling
weight: 50
toc: true
tags: [needsReview]
aliases:

- /app/multi-app-solution/testing/

---

## Forstå testing med Maskinporten

Dette bør du vite når du samhandler med Maskinporten i en app.

Legg til nødvendige Maskinporten-scopes for appen i Altinn Studio før den publiseres til et runtime-miljø. Altinn Studio oppretter Maskinporten-klienten for miljøet under publisering og monterer genererte klientdetaljer i appen.

Brukeren som legger til scopes i Altinn Studio må ha tilgang til å administrere Maskinporten-klienter for tjenesteeierorganisasjonen. Se [veiledningen for Maskinporten-integrasjon](/nb/altinn-studio/v10/develop-a-service/integration/maskinporten/) for detaljer.

## Teste i Studio

Støtten for utvikling av flerappsløsninger i Studio er for øyeblikket svært begrenset.
Studio kan bare hjelpe med allerede støttede konfigurasjoner for enkeltapper.
Dette betyr at du bare kan bygge de individuelle appene og se utseendet deres i forhåndsvisningsverktøyet.

## Teste i app-localtest

Når du kjører appen lokalt i app-localtest, kan du teste all logikken i app A til punktet der opprettelsesforespørselen til app B utløses.
En lokal kjøring oppretter ikke runtime-secreten for Maskinporten-klienten som lages under publisering.

For lokal testing mot ekte Maskinporten-beskyttede API-er kan du bruke midlertidig lokal konfigurasjon eller user secrets som beskrevet i legacy-seksjonen i [veiledningen for Maskinporten-integrasjon](/nb/altinn-studio/v10/develop-a-service/integration/maskinporten/#eldre-manuelt-oppsett).

{{% notice warning %}}
Vær svært forsiktig med denne endringen. Du må ikke dele disse nøklene ved å laste dem opp til Gitea.
{{% /notice %}}

Etter denne endringen er appen riktig satt opp med en klient som kan autoriseres med Maskinporten når opprettelsesforespørselen sendes til app B.
Denne forespørselen vil imidlertid ikke bli utført vellykket fordi app B ikke kjører.
App-localtest kan bare håndtere én kjørende app, men hvis app B kjører i miljøet, helst i tt02 under test, kan du endre forespørselen til å peke på dette miljøet i stedet for local.altinn.cloud.
Du gjør dette ved å endre envUrl i `AppClient.CreateNewInstance()`-metoden.

Endre denne linjen:

```csharp
string envUrl = $"https://{org}.apps.{_settings.HostName}";
```

Til dette:

```csharp
string envUrl = $"https://{org}.apps.tt02";
```

_NB: Ikke endre variabelen HostName i appsettings.json, siden denne også brukes til andre kritiske formål._

Med mindre du vil injisere testdata fra app B i organisasjonens Altinn-innboks, bør du justere mottakeren av instansen som skal opprettes i instansetemplatet i app A.
Du gjør dette ved å bruke `PersonNumber` i stedet for `OrganisationNumber` i `InstanceOwner`-delen av malobjektet i `ProcessTaskEnd.End()`-metoden.
Vi anbefaler å bruke et personnummer for en testbruker fra Tenor-testdatabasen.
Når du tester om skjemaet fra app B har kommet gjennom, må du logge inn på
[tt02.altinn.no](https://tt02.altinn.no/)
med samme testbruker fra Tenor.

## Teste i tt02

Før du ruller ut appene i produksjon, bør du ha testet skjemaene fullt ut i tt02 med publisert Maskinporten-oppsett og riktig variabel for envUrl.
Dette betyr at du bør teste begge appene mens de kjører i tt02.
Du kan fortsatt teste med en testbruker fra Tenor som mottaker av instansen, men et alternativ er å be om en testorganisasjon som kan motta disse skjemaene.
Du gjør dette ved å sende en forespørsel til servicedesk@altinn.no.
