---
title: Goals
description: Goals for the Altinn Studio platform
aliases:
 - /no/altinncore/goals.html
weight: 10
---

This summarizes the high level goals for Altinn Studio

## Userfriendly and responsive services

- User interface that is userfriendly, effective and modern.
- Support for Responsive Design both for forms and the development tool.
- Built in accessability with support for [WCAG 2](https://www.w3.org/Translations/WCAG20-no/)
- Good performance and low response time

## Effective and self-service service development

- As a service developer you can do everthing yourself (including deployment to production) whenever you want, without need for orders, training ++. Bottlenecks is eliminated.
- Effective and real testing, where unit test works like in a test environment and produiction. 
- Support for creating automated tests of services
- Rules and logic is defined once for all channels (portal/web service / rest), and are more robust than current plattform
- Built inn data modelling in web based tool (and support for XSD import from external tools like [SERES](https://altinnett.brreg.no/no/SERES/), [OR](https://w2.brreg.no/oppgaveregisteret/spesifikasjon_etatsliste.jsp), etc. )
- Not nescessery with Citrix for access to Altinn Studio Service Development  Ikke nødvendig med Citrix for tilgang til utviklingsmiljø

## Simple for non-technical developers, flexible for technical developers

- Fagpersoner har tilgang til nødvendig funksjonalitet [direkte i nettleser](../dev-in-browser)
- You can reuse good and testet components/widgets
- It is easy to do call against API's in other systems (retrieve data, run external logic)
- Techincal skilled deveopers can configure all aspect of the service, as an example make a reusable widhets, stylesheets,  f.eks. lage gjenbrukbare widgets, stilark, etc.
- Gjenbruk av tekster og andre ressurser på det nivået som man ønsker (plattform, tjenesteeier, tjeneste), samt vilkårlig språkstøtte
- Git (versjonskontroll) benyttes for lagring av tjenestene som utvikles, både fra nettleser og kode-editor.

## Åpen kildekode, cross-platform

- Tjenester 3.0 skal baseres på [åpen kildekode](https://en.wikipedia.org/wiki/Free_and_open-source_software)
- Tjenester 3.0 skal også deles som åpen kildekode
- Dette betyr at alle kan bidra til å forbedre plattformen. Altinn-organisasjonen blir mao. ikke flaskehals for utvikling.
- Kan kjøres lokalt på egen maskin, på egne servere og på både Windows, macOS eller Linux
- Alt baseres på åpne [web-standarder](https://en.wikipedia.org/wiki/Web_standards) og vanlig utviklerkompetanse (ingen "sære" eller proprietære verktøy innføres)
