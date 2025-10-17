---
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

Dette bør du vite når du samhandler med Maskinporten i en applikasjon.

Samarbeidsportalen lar deg ha to forskjellige klienter: én for test, kalt `ver2`/`test`, og én for produksjon, kalt `prod`.
Du bør opprette begge klientene, men bare bruke testklienten for testing og produksjonsklienten for produksjon.
Hvilken klient du skal bruke i hvilken situasjon, bestemmes av forskjellige konfigurasjoner i `appsettings.{env}.json`-filene.
Det er forskjellige tilgangsregler for å opprette disse klientene, så sørg for at du kjenner til disse begrensningene som er beskrevet på
[Samarbeidsportalen](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

Du trenger også tilgang til organisasjonens Azure Key Vault, siden integreringen av denne klienten med en Altinn-app avhenger av autorisasjon gjennom offentlige og private nøkler (JWT) som er lagret som Azure-hemmeligheter.

## Teste i Studio

Støtten for utvikling av flerappsløsninger i Studio er for øyeblikket svært begrenset.
Studio kan bare hjelpe med allerede støttede konfigurasjoner for enkeltapper.
Dette betyr at du bare kan bygge de individuelle applikasjonene og se utseendet deres i forhåndsvisningsverktøyet.

## Teste i app-localtest

Når du kjører applikasjonen lokalt i app-localtest, kan du teste all logikken i applikasjon A til punktet der opprettelsesforespørselen til applikasjon B utløses.
Dette er fordi AppClient prøver å få tilgang til Azure Key Vault for å hente de nødvendige hemmelighetene for autorisasjon til Maskinporten.
Men hemmelighetene som trengs for å få tilgang til Azure Key Vault, er ikke tilgjengelige når du kjører i lokaltest.

Du kan omgå dette for testformål. Nøklene som trengs, `clientID` og `encodedJWT`, for å autorisere forespørsler til Maskinporten kan du kopiere fra organisasjonens Azure Key Vault og *midlertidig* lime inn i `appsettings.json`-filen.

{{% notice warning %}}
Vær svært forsiktig med denne endringen. Du må ikke dele disse nøklene ved å laste dem opp til Gitea.
{{% /notice %}}

Etter denne endringen er applikasjonen riktig satt opp med en klient som kan autoriseres med Maskinporten når opprettelsesforespørselen sendes til applikasjon B.
Denne forespørselen vil imidlertid ikke bli utført vellykket fordi applikasjon B ikke kjører.
App-localtest kan bare håndtere én kjørende applikasjon, men hvis applikasjon B kjører i miljøet, helst i tt02 under test, kan du endre forespørselen til å peke på dette miljøet i stedet for local.altinn.cloud.
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

Med mindre du vil injisere testdata fra applikasjon B i organisasjonens Altinn-innboks, bør du justere mottakeren av instansen som skal opprettes i instansetemplatet i applikasjon A.
Du gjør dette ved å bruke `PersonNumber` i stedet for `OrganisationNumber` i `InstanceOwner`-delen av malobjektet i `ProcessTaskEnd.End()`-metoden.
Vi anbefaler å bruke et personnummer for en testbruker fra Tenor-testdatabasen.
Når du tester om skjemaet fra applikasjon B har kommet gjennom, må du logge inn på
[tt02.altinn.no](https://tt02.altinn.no/)
med samme testbruker fra Tenor.

## Teste i tt02

Før du ruller ut applikasjonene i produksjon, bør du ha testet skjemaene fullt ut i tt02 med faktisk bruk av Azure Key Vault og riktig variabel for envUrl.
Dette betyr at du bør teste begge applikasjonene mens de kjører i tt02.
Du kan fortsatt teste med en testbruker fra Tenor som mottaker av instansen, men et alternativ er å be om en testorganisasjon som kan motta disse skjemaene.
Du gjør dette ved å sende en forespørsel til servicedesk@altinn.no.