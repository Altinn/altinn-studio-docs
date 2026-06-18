---
title: Teste en flerappsløsning i Altinn
linktitle: Testing
description: Hvordan teste flerappsløasningen under utvikling
weight: 50
toc: true
aliases:

- /app/multi-app-solution/testing/

---

## Hvordan fungerer testing med Maskinporten

Når du samhandler med Maskinporten i en applikasjon, er det noen ting du bør være klar over.

Legg til nødvendige Maskinporten-scopes for appen i Altinn Studio før den publiseres til et runtime-miljø. Altinn Studio oppretter Maskinporten-klienten for miljøet under publisering og monterer genererte klientdetaljer i appen.

Brukeren som legger til scopes i Altinn Studio må ha tilgang til å administrere Maskinporten-klienter for tjenesteeierorganisasjonen. Se [veiledningen for Maskinporten-integrasjon](/nb/altinn-studio/v8/guides/integration/maskinporten/) for detaljer.

## Hva kan gjøres i Studio

Støtten for utvikling av flerapp-løsninger i Studio er for øyeblikket svært begrenset. Derfor kan Studio bare gi hjelp
med allerede støttede konfigurasjoner for enkeltapper.
Dette betyr at du bare kan bygge de individuelle applikasjonene og visualisere utseendet deres i
forhåndsvisningsverktøyet.

## Hva kan gjøres i app-localtest

Når du kjører applikasjonen lokalt i app-localtest, kan du teste all logikken i applikasjon A til
punktet der opprettelsesforespørselen til applikasjon B utløses. En lokal kjøring oppretter ikke runtime-secreten for Maskinporten-klienten som lages under publisering.

For lokal testing mot ekte Maskinporten-beskyttede API-er kan du bruke midlertidig lokal konfigurasjon eller user secrets som beskrevet i legacy-seksjonen i [veiledningen for Maskinporten-integrasjon](/nb/altinn-studio/v8/guides/integration/maskinporten/#eldre-manuelt-oppsett).

{{% notice warning %}}
Vær veldig forsiktig med denne endringen, disse nøklene må ikke deles ved å laste dem opp til Gitea.
{{% /notice %}}

Etter denne endringen er applikasjonen satt opp riktig med en klient som kan
autoriseres med Maskinporten når opprettelsesforespørselen sendes til applikasjon B. Imidlertid vil ikke
denne forespørselen bli utført vellykket fordi applikasjon B ikke kjører. App-localtest kan bare håndtere én
kjørende applikasjon, men hvis
applikasjon B kjører i
miljøet, helst i tt02 under test, kan du endre forespørselen til å peke på dette miljøet i stedet for
local.altinn.cloud. Dette kan gjøres ved å endre envUrl i `AppClient.CreateNewInstance()`-metoden.

Endre denne linjen:

```csharp
string envUrl = $"https://{org}.apps.{_settings.HostName}";
```

Til dette:

```csharp
string envUrl = $"https://{org}.apps.tt02";
```

_NB: Ikke endre variabelen HostName i appsettings.json, siden denne også brukes til andre kritiske formål._

Med mindre du har noe imot å injisere testdata fra applikasjon B i organisasjonen din sin Altinn Innboks, bør du
justere mottakeren av instansen som skal opprettes i instansetemplatet i applikasjon A. Dette gjøres
ved å bruke `PersonNumber` i stedet for `OrganisationNumber` i `InstanceOwner`-delen av malobjektet
i `ProcessTaskEnd.End()`-metoden. Det anbefales å bruke et personnummer for en testbruker fra Tenor-testdatabasen.
Når du tester om skjemaet fra applikasjon B har kommet gjennom, må du logge inn
på [tt02.altinn.no](https://tt02.altinn.no/)
med samme testbruker fra Tenor.

## Hva må gjøres i tt02

Før du faktisk ruller ut applikasjonene i produksjon, bør skjemaene ha blitt testet fullt ut i tt02 med publisert Maskinporten-oppsett og riktig variabel for envUrl. Dette betyr at begge applikasjonene bør testes mens de kjører i
tt02. Det er fortsatt mulig å teste med en testbruker fra Tenor som mottaker av instansen, men et alternativ
er å be om en testorganisasjon som kan motta disse skjemaene. Dette kan gjøres ved å sende en forespørsel til
servicedesk@altinn.no.
