---
title: Administrere tilganger
linktitle: Administrere tilganger
description: Denne tilgangspakken er relevant for alle virksomheter. Det skal ikke knyttes tjenester til disse gruppene da de er rene administrasjonsgrupper.
weight: 111
---

Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-3/#oversikt-over-tilgangspakker)


![Administrere tilganger](adm.jpg "Administrere tilganger")
- **Administrere tilganger** (ingen beskrivelse, tilgangspakken kan ikke gis videre til andre)		
	- **Klientadminstrasjon for Regnskapsfører og Revisor:** Denne tilgangspakken gir bruker mulighet til å administrere tilgang til tjenester det er naturlig at regnskapsfører eller revisor utfører. Bruker kan administrere tilgang til tjenestene  til ansatte hos regnskapsfører eller revisor på vegne av deres kunder. **urn:altinn:accesspackage:klientadminstrasjonforregnskapsforerogtevisor** 
	- **Tilgangsstyring:** Denne tilgangspakken gir bruker mulighet til å gi videre tilganger for virksomheten som man selv har mottatt.  **urn:altinn:accesspackage:tilgangsstyring**
	- **Hovedadministrator:** Denne tilgangspakken gir bruker mulighet til å administrere alle tilganger for virksomheten. **urn:altinn:accesspackage:hovedadministrator**
	- **Kundeadministrator:** Denne tilgangspakken gir bruker mulighet til å administrere tilganger man har mottatt for sine kunder til ansatte i egen virksomheten. **urn:altinn:accesspackage:kundeadministrator**


## Egenskaper ved tilgangspakkene
|Navn tillgangspakke|Kan delegeres til ansatte?|Kan knytte tjenester til?|[ER rolle](/authorization/modules/accessgroups/register_er/#rolletyper-fra-enhetsregisteret) som får fullmakten|
|---|---|---|---|
|Administrere tilganger| nei|nei||
|Klientadminstrasjon for Regnskapsfører og Revisor|ja|ja|DAGL, STYR, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Tilgangsstyring|ja|ja|DAGL, LEDE, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Hovedadministrator|ja|ja|DAGL, LEDE, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|
|Kundeadministrator|ja|ja|DAGL, LEDE, INNH, DTPR, DTSO, KOMP, BEST, REPR, BOBE|

{{% notice warning %}} Det er fortsatt uavklart hvilke fullmakter det vil være natulig å gi personer med rollen Forretningsførerer innenfor fullmaktsområdet "Administrere tilganger" {{% /notice %}}

Tilbake til [hovedoversikt](/authorization/modules/accessgroups/type-accessgroups/versjon-3/#oversikt-over-tilgangspakker)
