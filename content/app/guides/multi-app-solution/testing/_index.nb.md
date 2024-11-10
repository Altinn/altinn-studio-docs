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

Først og fremst lar Samarbeidsportalen deg opprettholde to forskjellige klienter; en for test, kalt `ver2`/`test`, og
en annen for
produksjon,
kalt `prod`. Du bør opprette begge klientene, men selvfølgelig bare bruke testklienten for testing og
produksjonsklienten for
produksjon. Hvilken klient du skal bruke i hvilken situasjon, avgjøres av forskjellige konfigurasjoner for
`appsettings.{env}.json`-filene. Det er forskjellige tilgangsregler for å opprette disse klientene, så sørg for at du er
klar over
disse begrensningene
beskrevet
på [Samarbeidsportalen](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#innlogging-og-tilgang).

For det andre, siden integrering av denne klienten med en Altinn-app avhenger av autorisasjon gjennom offentlige og
private nøkler (JWT)
lagret som Azure-sekretesser, trenger du tilgang til organisasjonens Azure Key vault.

## Hva kan gjøres i Studio

Støtten for utvikling av flerapp-løsninger i Studio er for øyeblikket svært begrenset. Derfor kan Studio bare gi hjelp
med allerede støttede konfigurasjoner for enkeltapper.
Dette betyr at du bare kan bygge de individuelle applikasjonene og visualisere utseendet deres i
forhåndsvisningsverktøyet.

## Hva kan gjøres i app-localtest

Når du kjører applikasjonen lokalt i app-localtest, kan du teste all logikken i applikasjon A til
punktet der opprettelsesforespørselen til applikasjon B utløses. Årsaken til dette er at AppClient prøver å få tilgang
til
Azure Key vault for å hente de nødvendige hemmelighetene for autorisasjon til Maskinporten. Men hemmelighetene som
trengs for å få
tillatelse til å få tilgang til Azure Key vault, er ikke tilgjengelige når du kjører i lokaltest.

Imidlertid er det en måte å omgå dette på, for testformål. Nøklene som trengs, `clientID` og `encodedJWT`, for å
autorisere forespørsler til Maskinporten kan kopieres fra din organisasjons Azure Key vault og *midlertidig* limes inn i
`appsettings.json`
filen.

{{% notice warning %}}
Vær veldig forsiktig med denne endringen, disse nøklene må ikke deles ved å laste dem opp til gitea.
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

Før du faktisk ruller ut applikasjonene i produksjon, bør skjemaene ha blitt testet fullt ut i tt02 med faktisk
bruk av Azure Key Vault og riktig variabel for envUrl. Dette betyr at begge applikasjonene bør testes mens de kjører i
tt02. Det er fortsatt mulig å teste med en testbruker fra Tenor som mottaker av instansen, men et alternativ
er å be om en testorganisasjon som kan motta disse skjemaene. Dette kan gjøres ved å sende en forespørsel til
servicedesk@altinn.no.