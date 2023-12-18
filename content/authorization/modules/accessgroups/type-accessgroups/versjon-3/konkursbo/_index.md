---
title: Konkursbo
linktitle: Konkursbo
description: Denne fullmaktsgruppen er relevant for alle virksomheter
weight: 124
---
Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-3/#oversikt-over-fullmaktsgrupper)


![Konkursbo](konk.jpg "Konkursbo")
- **Fullmakter for konkursbo:** Denne fullmaktsgruppen er relevant for alle konkurser, tvangsoppløsninger og tvangsavviklinger som har fått registrert et tilhørende konkursbo i Enhetsregisteret
	- **Konkursbo tilgangsstyring:** Denne fullmakten gir rettighet til å administrere konkursbo. Fullmakten er en engangsdelegering, og den gir ikke tilgang til noen tjenester.
	- **Konkursbo lesetilgang:**  Denne fullmakten delegeres til kreditorer og andre som skal ha lesetilgang til det enkelte konkursbo.
	- **Konkursbo skrivetilgang:** Denne fullmakten gir bostyrers medhjelper tilgang til å jobbe på vegne av bostyrer. Bostyrer delegerer denne fullmakten sammen med Konkursbo lesetilgang til medhjelper for hvert konkursbo.

## Egenskaper ved fullmaktsgruppene
|Navn fullmaktsgruppe|Kan delegeres til ansatte?|Kan knytte tjenester til?|[ER rolle](/authorization/modules/accessgroups/register_er/#rolletyper-fra-enhetsregisteret) som får fullmakten|
|---|---|---|---|
|Fullmakter for konkursbo|nei|nei||
|Konkursbo tilgangsstyring|ja|ja|PRIV, BOBE|
|Konkursbo lesetilgang|ja|ja|BOBE|
|Konkursbo skrivetilgang|ja|ja|BOBE|

Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-2/#oversikt-over-fullmaktsgrupper)