---
title: Konkursbo
linktitle: Konkursbo
description: Denne tilgangspakken er relevant for alle virksomheter
weight: 124
---

Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-3/#oversikt-over-tilgangspakker)



![Konkursbo](konk.jpg "Konkursbo")
- **Fullmakter for konkursbo:** Denne tilgangspakken er relevant for alle konkurser, tvangsoppløsninger og tvangsavviklinger som har fått registrert et tilhørende konkursbo i Enhetsregisteret
	- **Konkursbo tilgangsstyring:** Denne fullmakten gir rettighet til å administrere konkursbo. Fullmakten er en engangsdelegering, og den gir ikke tilgang til noen tjenester.
	- **Konkursbo lesetilgang:**  Denne fullmakten delegeres til kreditorer og andre som skal ha lesetilgang til det enkelte konkursbo.
	- **Konkursbo skrivetilgang:** Denne fullmakten gir bostyrers medhjelper tilgang til å jobbe på vegne av bostyrer. Bostyrer delegerer denne fullmakten sammen med Konkursbo lesetilgang til medhjelper for hvert konkursbo.

## Egenskaper ved tilgangspakkene
|Navn tillgangspakke|Kan delegeres til ansatte?|Kan knytte tjenester til?|[ER rolle](/authorization/modules/accessgroups/register_er/#rolletyper-fra-enhetsregisteret) som får fullmakten|
|---|---|---|---|
|Fullmakter for konkursbo|nei|nei||
|Konkursbo tilgangsstyring|ja|ja|PRIV, BOBE|
|Konkursbo lesetilgang|ja|ja|BOBE|
|Konkursbo skrivetilgang|ja|ja|BOBE|

Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-3/#oversikt-over-tilgangspakker)