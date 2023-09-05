---
title: Integrasjoner og API-er
linktitle: Integrasjoner
description: Denne fullmaktsgruppen er relevant for alle virksomheter som har dataintegrasjoner mot og benytter API
weight: 110
---
Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-2/#oversikt-over-fullmaktsgrupper)


![Integrasjoner og API-er](iapi.jpg "Integrasjoner og API-er")
- **Integrasjoner og API-er:** Denne fullmakten gir tilgang til å sette opp og administrere dataintegrasjoner og API som tilbys. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir.
	- **Programmeringsgrensesnitt (API):** Denne fullmakten gir tilgang til alle tjenester for å administrere tilgang til data og programmeringsgrensenitt (API) hos offentlige etater. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir.
	- **Opptre for virksomhetens kunder":** Denne fullmakten benyttes når en leverandørvirksomhet skal utføre tjenester på vegne av en kunde via et programmeringsgrensesnitt (API). Fullmakten kan gis til til virksomhetsbruker som er knyttet til leverandørens organisasjonsnummer. Men denne fullmakten vil virksomhetsbrukeren kunne utføre alle tjenester som leverandøren har tilgang til å utføre på vegne av alle sine kunder/klienter. Fullmakten gir ikke virksomhetsbruker tilgang til å utføre tjenester på vegne av leverandøren selv, bare kunder av leverandøren. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir.
	- **Maskinlesbare hendelser:** Denne fullmakten gir tilgang til alle tjenester for å administrere tilgang til maskinlesbare hendelser. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir.


## Egenskaper ved fullmaktsgruppene
|Navn fullmaktsgruppe|Kan delegeres til ansatte?|Kan knytte tjenester til?|[ER rolle](/authorization/modules/accessgroups/register_er/#rolletyper-fra-enhetsregisteret) som får fullmakten|
|---|---|---|---|
|Integrasjoner og API-er| ja|nei|DAGL, STYR,INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Programmeringsgrensesnitt (API)|ja|ja|DAGL, STYR,INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Opptre for virksomhetens kunder|ja|ja|DAGL, STYR,INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Maskinlesbare hendelser|ja|ja|DAGL, STYR,INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|


Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-2/#oversikt-over-fullmaktsgrupper)