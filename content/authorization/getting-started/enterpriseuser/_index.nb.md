---
title: Autentisering med Virksomhetsbrukere
linktitle: Virksomhetsbrukere
description: Konseptet med virksomhetsbrukere ble introdusert med Altinn 2.
toc: true
aliases:
  - /nb/api/authentication/enterpriseusers/
---

{{% notice warning%}} Virksomhetsbruker videreføres ikke i Altinn 3 og vil ha sin siste dag på jobben 19. juni 2026 <br /> Virksomhetsbruker vil erstattes av [Systembruker](/nb/authorization/what-do-you-get/systemuser/). {{% /notice %}}

## Oversikt

Virksomhetsbrukere muliggjør bruk av et virksomhetssertifikat kombinert med brukernavn og passord.

Disse brukerne må tildeles roller og/eller rettigheter av sin organisasjon. Når de er tildelt, kan de bruke disse rettighetene for maskin-til-maskin kommunikasjon med Altinn uten å trenge ytterligere autorisasjon fra organisasjonen.

## Virksomhetsbrukere i Altinn 3

I Altinn 3 kan virksomhetsbrukere brukes via API.

Dette innebærer en to-trinns prosess: først autentisere organisasjonen ved hjelp av Maskinporten. Deretter kombinere brukernavn og passord med maskinporten for sertifikatautentisering og bytte maskinport-token med brukernavn og passord.

Administrasjon av virksomhetsbrukere er dokumentert [her](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhetsbrukere/).

Innlogging og tokenutveksling er dokumentert [her](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten).

Et Postman-eksempel er tilgjengelig [her](https://github.com/Altinn/altinn-studio/blob/master/src/test/Postman/collections/Organization.postman_collection.json).

Videre bruk med Altinn App API og Platform API er lik bruk av en Altinn-token basert på en ID-port sesjon.

## Overgang til Systembrukere

Støtte for virksomhetsbrukere forventes å avsluttes i 2026 sammen med Altinn 2. [Systembrukere vil erstatte dette konseptet](/nb/authorization/getting-started/systemuser/).
