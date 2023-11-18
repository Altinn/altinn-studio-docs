---
title: Administrere tilganger
linktitle: Administrere tilganger
description: Denne fullmaktsgruppen er relevant for alle virksomheter. Det skal ikke knyttes tjenester til disse gruppene da de er rene administrasjonsgrupper.
weight: 111
---
Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-2/#oversikt-over-fullmaktsgrupper)


![Administrere tilganger](adm.jpg "Administrere tilganger")
- **Administrere tilganger** (ingen beskrivelse, fullmaktsgruppen kan ikke gis videre til andre)		
	- **Klientadminstrasjon for Regnskapsfører og Revisor:** Denne fullmakten gir bruker mulighet til å administrere tilgang til tjenester det er naturlig at regnskapsfører eller revisor utfører. Bruker kan administrere tilgang til tjenestene  til ansatte hos regnskapsfører eller revisor på vegne av deres kunder. 
	- **Tilgangsstyring:** Denne fullmakten gir bruker mulighet til å gi videre tilganger for virksomheten som man selv har mottatt
	- **Hovedadministrator:** Denne fullmakten gir bruker mulighet til å administrere alle tilganger for virksomheten
	- **Kundeadministrator:** Denne fullmakten gir bruker mulighet til å administrere tilganger man har mottatt for sine kunder til ansatte i egen virksomheten


## Egenskaper ved fullmaktsgruppene
|Navn fullmaktsgruppe|Kan delegeres til ansatte?|Kan knytte tjenester til?|[ER rolle](/authorization/modules/accessgroups/register_er/#rolletyper-fra-enhetsregisteret) som får fullmakten|
|---|---|---|---|
|Administrere tilganger| nei|nei||
|Klientadminstrasjon for Regnskapsfører og Revisor|ja|ja|DAGL, STYR, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Tilgangsstyring|ja|ja|DAGL, STYR, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Hovedadministrator|ja|ja|DAGL, STYR, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Kundeadministrator|ja|ja|DAGL, STYR, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|

{{% notice warning %}} Det er fortsatt uavklart hvilke fullmakter det vil være natulig å gi personer med rollen Forretningsførerer innenfor fullmaktsområdet "Administrere tilganger" {{% /notice %}}

Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-2/#oversikt-over-fullmaktsgrupper)
