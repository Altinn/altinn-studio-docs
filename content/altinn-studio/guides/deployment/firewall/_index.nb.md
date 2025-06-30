---
title: Brannmur og IP konfigurasjon
description: Brannmur og IP konfigurasjon
weight: 24
---

## Nettverk og brannmurkonfigurasjon

### Støtte for IPv4 og IPv6

I henhold til [Forskrift om IT-standarder i offentlig forvaltning (FOR-2009-06-25-384)](https://lovdata.no/dokument/SF/forskrift/2013-04-05-959) støtter Altinn-tjenester både **IPv4 og IPv6** for all applikasjonstrafikk.

Denne dual-stack-støtten er implementert i både testmiljøet (TT02) og produksjonsmiljøet. Alle applikasjoner som distribueres til Altinn-plattformen kjører nå på infrastruktur som håndterer trafikk over begge protokoller.

### Utgående IP-adresser for applikasjoner

Hver Altinn-applikasjon kommuniserer med eksterne systemer via et sett med **offentlige utgående IP-adresser**. Disse adressene kan være nødvendige å hviteliste i brannmurer eller for tilgangskontroll til API-er.

Du kan se gjeldende utgående IP-adresser for din applikasjon via følgende dashboards:

* **TT02 (test):**  
  `https://<org>.apps.tt02.altinn.no/monitor/`

* **Produksjon:**  
  `https://<org>.apps.altinn.no/monitor/`

En [ai-dev bruker](https://docs.altinn.studio/nb/altinn-studio/guides/administration/access-management/apps/) kreves for å få tilgang til dashboardene.

➡️ Naviger til:  
`Dashboards → Altinn → PublicIPs`

#### Navnekonvensjon for IP-adresser

Utgående IP-adresser for hver applikasjon følger dette navneskjemaet:

* `-prefix4`: IPv4-adresse  
* `-prefix6`: IPv6-adresse

Dette er de gjeldende aktive adressene etter reetableringen av infrastrukturen som ble gjennomført sent i 2024.

### Anbefalinger

Hvis deres systemer benytter IP-basert tilgangskontroll eller brannmurregler:

* Sørg for at både `-prefix4` og `-prefix6` adresser er hvitelistet.
* Verifiser jevnlig deres utgående IP-adresser gjennom de oppgitte dashboardene.
* Unngå å hardkode gamle statiske IP-adresser – bruk dashboardene som kilde til sannhet.

