---
title: Authenticate with ID-porten
linktitle: ID-porten
description: Description of how systems can use ID-porten to get access to APIs in Altinn 3.
toc: true
weight: 200
tags: [translate-to-english]
---

Systemer for sluttbrukere kan autentisere brukere via ID-porten.
Dette for å kunne benytte API fra applikasjoner kjørende i Altinn Apps og enkelte funksjoner i Altinn Platform på vegne av sluttbruker.

Det er i hoveddsak to typer systemer hvor dette er aktuelt. Dette er webbaserte løsninger og tykke klienter.

Felles for begge løsninger er at sluttbruker vil logge inn via nettleser i ID-porten med den autentiseringsmekanismen de ønsker.

Dette er for eksempel:

- Min-ID
- BankID på mobil
- BankId

Systemet må forespøre et sett med scopes i ID-porten som sluttbruker må akseptere at systemet kan utføre på vegne av sluttbruker.

Det er disse scopene som tildels avgrenser hva systemet kan utføre på vegne av sluttbruker.

Scopene som er definert og relevant for Altinn 3 er:

- **altinn:instances.meta** - Se oversikt over innboks og arkiv i Altinn
- **altinn:instances.read** - Lese innholdet i innboks og arkiv i Altinn for alle elementer som sluttbruker er autorisert for
- **altinn:instances.write** - Fylle ut, signere og sende inn skjema i Altinn for alle elementer sluttbruker er autorisert for
- **altinn:lookup** - Benytte innsynstjenester i Altinn
- **altinn:reportees** - Se hvem du kan representere i Altinn

Bildet nedenfor viser hvordan sluttbruker må bekrefte tilgangen.

![Håndtere systemer](scopeidporten.png "Håndtere systemer")

For detaljer om scope og opplisting av alle scopes tilgjengelig se [dokumentasjon fra ID-porten](https://docs.digdir.no/oidc_protocol_scope.html).

Det er disse scopene som avgjør hva sluttbruker kan utføre. Bildet nedenfor viser hvordan sluttbruker må bekrefte
tilgangen.

![Håndtere systemer](scopeidporten.png "Håndtere systemer")

Når pålogging er gjennomført vil systemet ha tilgang til et ID-token, refresh token og et access token.

Dette access tokenet har begrenset levetid, men kan fornyes med ved hjelp av refresh token.

## Web baserte systemer

Webbaserte systemer består av løsninger med en webbasert frontend som kjører i nettleser, samt serverside kode.

[Se detaljer hos ID-porten](https://docs.digdir.no/oidc_guide_idporten.html).


## Tykke klienter

Med tykke klienter mener vi applikasjoner som installeres og kjøres lokalt på en datamaskin og ikke i nettleser.  
Disse må likevel benytte seg av nettleser for å logge inn.

[Se detaljer hos ID porten](https://docs.digdir.no/oidc_auth_sbs.html).


## Veksling av access token til Altinn token

Access-tokenet som utstedes fra ID-porten må veksles inn i et Altinn-token før det kan benyttes mot Altinns API'er.

Dette Altinn-tokenet vil ha samme levetid som access-tokenet.

Flytdiagrammet nedenfor viser hvordan tokenet veksles inn.

![Innveksling av token](eus_login_process_updated.svg "Innveksling av token")

Se detaljer i [Altinns API dokumentasjon](../../authentication/spec) under metoden `GET /exchange/{tokenProvider}`.

Sluttbrukere har i Altinn mulighet til å få oversikt over alle systemer og hvilke tilganger de har.

På denne måten kan man trekke langvarige tilganger. Systemet vil da bli avvist neste gang det prøver å refresehe access-token.

Bildet nedenfor viser hvordan dette vil bli i Altinn (ikke satt i produksjon enda).

![Håndtere systemtilganger](scopemanagement.png "Håndtere systemtilganger")

Et system som har fått tilgang til et token fra ID-porten vil kunne utføre handlinger som bruker er autorisert kun begrenset av bruksområdet til scope.
Det betyr at hvis system har fått scope for innsending av skjema så vil systemet kunne sende inn alle skjema for alle avgivere som sluttbruker er autorisert for.
Det er derfor viktig at sluttbruker kan stole på systemet.
