---
title: Brannmur og IP-konfigurasjon
description: Nettverkskonfigurasjon, IPv4/IPv6-støtte og utgående IP-adresser for Altinn-tjenester
weight: 24
---

## Nettverk og brannmurkonfigurasjon

### Støtte for IPv4 og IPv6

Altinn-tjenester støtter både **IPv4 og IPv6** for all applikasjonstrafikk, i henhold til [Forskrift om IT-standarder i offentlig forvaltning (FOR-2009-06-25-384)](https://lovdata.no/dokument/SF/forskrift/2013-04-05-959).

Både testmiljøet (TT02) og produksjonsmiljøet støtter dual-stack. Alle applikasjoner du distribuerer til Altinn-plattformen kjører på infrastruktur som håndterer trafikk over begge protokoller.

### Utgående IP-adresser for applikasjoner

Hver Altinn-applikasjon kommuniserer med eksterne systemer via et sett med **offentlige utgående IP-adresser**. Disse adressene kan være nødvendige å legge til i tillatelister i brannmurer eller for tilgangskontroll til API-er.

Du kan se gjeldende utgående IP-adresser for din applikasjon via følgende dashboards:

* **TT02 (test):**  
  `https://<org>.apps.tt02.altinn.no/monitor/`

* **Produksjon:**  
  `https://<org>.apps.altinn.no/monitor/`

Du trenger en [ai-dev bruker](https://docs.altinn.studio/nb/altinn-studio/guides/administration/access-management/apps/) for å få tilgang til dashboardene.

Gå til:
`Dashboards → Altinn → PublicIPs`

#### Navnekonvensjon for IP-adresser

Utgående IP-adresser for hver applikasjon følger dette navneskjemaet:

* `-prefix4`: IPv4-adresse  
* `-prefix6`: IPv6-adresse

Dette er de gjeldende aktive adressene etter at vi reetablerte infrastrukturen sent i 2024.

### Anbefalinger

Hvis deres systemer benytter IP-basert tilgangskontroll eller brannmurregler:

* Legg til både `-prefix4` og `-prefix6`-adresser i tillatelisten.

