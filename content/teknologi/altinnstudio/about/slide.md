---
title: Slides
description: En presentasjon om målsettinger og konsepter for Tjenester 3.0
type: slide
theme: beige # black, white, league, beige, sky, night, serif, simple, solarized
revealOptions:
  transition: convex # none, fade, slide, convex, concave, zoom
  controls: true
  progress: true
  history: true
  center: true
weight: 100
---
# Altinn Studio
Aka. "Tjenester 3.0"
--- 
## Dagens løsning
- Produksjonsatt sommeren 2010
- Basert på InfoPath og SharePoint
- 115.000.000 skjema fylt ut
- 404 aktive innsendingstjenester i 2018
---
## Bakgrunn og mål
- Behov har vært kjent lenge 
- POC utviklet i 2015 (men lagt på is grunnet manglende finansiering)
- Finansiering på Statsbudsjettet 2018
- Startet opp igjen våren 2018
___
![](/teknologi/altinnstudio/about/goals.png)
---
## Hva er målet med prosjektet?
- En modern utviklingsplattform
- Et effektivt utviklingsverktøy
- En moderne infrastruktur
- En plattform for gjenbruk
- En platform for deling av data og erfaringer
---
## En moderne utviklingsplattform
Altinn Studio er en åpen og modern utviklingsplattform 
- Versjonering og samarbeid via Git
- Støtte for distribuert utvikling
- All programvare som benyttes er åpen kildekode. Også selve 3.0-plattformen.
- Funksjonalitet i Altinn tilgjengelig via API’er
- Moderne og populær teknologi, f.eks. React og Visual Studio Code
- Full selvbetjening
Tekniske utviklere kan benytte best-of-breed utvikler-verktøy og teknologi, slik de er vant til.
___
![](/teknologi/altinnstudio/about/feature_git.png)
___
![](/teknologi/altinnstudio/about/feature_externaleditor.png)
___
![](/teknologi/altinnstudio/about/feature_opensource.png)
___
![](/teknologi/altinnstudio/about/products_logos.png)
---
## Et effektivt utviklingsverktøy
Altinn Studio tilbyr enkel, effektiv og 100% selvbetjent utvikling og forvaltning av tjenester, også for ikke-teknologer.
- Brukergrensesnitt (GUI)
- API’er
- Arbeidsflyt
- Logikk og dynamikk
- Datamodellering
- Konfigurasjon og tilgangsstyring
- Automatisert testing
…
---
## En moderne infrastruktur
Altinn Studio (og tjenester som lages der) vil kjøre på en moderne infrastruktur.

- Docker containers for applikasjoner
- Kubernetes for orkestrering av containers

Dette gir isolering mellom applikasjoner (microservices), enklere skalering og understøtter “DevOps”. 
___
![](/teknologi/altinnstudio/about/architecture_apps_deployment.png)
---
## Hva kan jeg gjøre med MVP?
___
Opprette bruker og logge inn i Altinn Studio
![](/teknologi/altinnstudio/about/feature_login.png)
___
Lage (og finne igjen) en tjeneste
![](/teknologi/altinnstudio/about/feature_newapp.png)
___
Finne tjenester fra andre organisasjoner
![](/teknologi/altinnstudio/about/feature_dashboardsearch.png)
___
Laste opp en datamodell som fungerer i tjenesten (Seres eller OR)
![](/teknologi/altinnstudio/about/feature_uploadxsd.png)
___
Lage et skjemadesign med drag and drop av elementer (begrenset utvalg av komponenter)
![](/teknologi/altinnstudio/about/feature_uxeditor.png)
___
Legge inn tekster/tekstnøkler for tjeneste
![](/teknologi/altinnstudio/about/feature_texteditor.png)
___
Legge inn regler for skjemalogikk (validering, kalkulering, dynamikk)
![](/teknologi/altinnstudio/about/feature_logiceditor.png)
___
Bruke API-oppslag i tjenesten (forutsetter Ajax kall kodet i GUI)
___
Endre på standardfil for arbeidsflyt
![](/teknologi/altinnstudio/about/feature_workfloweditor.png)
___
Endre på filer med versjonskontroll 
![](/teknologi/altinnstudio/about/feature_externaleditor.png)
___
Legge den ferdige tjenesten i test- og produksjonsmiljø
![](/teknologi/altinnstudio/about/feature_deploy.png)
---

## Tjenster 3.0 vs Tjenester 2.0
___
## Skjemaverktøy
- Egenutviklet vs InfoPath
- React vs SharPoint formserver
- Responsivt vs ikke responsivt
___
## Arbeidsflyt
- BPMN vs Custom
___
## Tjenester som API
- REST vs SOAP
- Individuell API vs Generelle
___
## Ressurser
- Isolerte vs delte
- Raskt skalerbar vs lang leveringstid
___
## Dataformat
- JSON/XML vs XML
___
## Kontroll på logikk
- Full kontroll på når ting skjer i plattformen i motsetning til Infopath 
___
## Shipment
- Inntil videre kun pull-basert nedlasting av skjemadata.

---
## Videre arbeid i MVP
- Fokus på infrastruktur
- Skyløsninger
- Sikkerhet
- Deploy av tjenester
- Integrasjon med tjenesteeier
- Understøtte piloter
---
## Detaljer løsning
 Tre nye løsninger
 - Altinn Studio
 - Altinn Apps
 - Altinn Platform

___
 ## Altinn Studio

___
## Altinn Apps

___
## Altinn Platform

---
## Status
Du kan følge utviklingen på [Github](https://github.com/Altinn/altinn-studio).
---
## Motivasjon
Se [Archimate arkitekturmodell](https://altinn.github.io/ark-2020/706502fc-f537-48f3-90d5-6f7943ff08e0/views/4ec9466c-f59c-4a3c-985d-bd9b826a8faf.html).
---

## The End

[Tilbake](../)