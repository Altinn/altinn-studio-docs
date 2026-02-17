---
title: Systembruker og dialogporten API
description: Denne veiledningen forklarer hvordan man benytter systembruker mot Dialogporten API.
linktitle: Systembruker og dialogporten API
toc: false
---

Et vanlig bruksområde er å sette opp en systembruker som skal overvåke innboksen til én eller flere virksomheter i Dialogporten.
Dette gjøres via søke APIET til dialogporten. Dette er beskrevet [her](https://docs.altinn.studio/nb/dialogporten/user-guides/searching-for-dialogs/)

For å kunne kalle Dialogporten API kreves det riktige OAuth-scopes. Følgende scopes må benyttes:

- digdir:dialogporten
- altinn:correspondence.read

Dette gir grunnleggende tilgang til API-et.

Dette i seg selv gir likevel **ikke rett til å lese data fra Dialogporten**. Dialogporten returnerer kun dialoger som en systembruker har blitt delegert tilgang til.

Det betyr at systembrukeren må ha fått delegert enten tilgangspakkene som gir tilgang til dialogene som skal leses, eller enkelttjenesten(e) som dialogene består av.
Enkeltjenestedelegering er kun mulig for systembruker i egen virksomhet.

**Uten slike rettigheter vil listen fra Dialogporten alltid være tom.**

Dette er tilsvarende hvis man som sluttbruker logger inn i Altinn og velger en innboks hvor man ikke har rettighet til noe av innholdet i innboksen.

## Hvordan finner jeg ut hvilke tilgangspakker jeg trenger?

I utgangspunktet er det tjenesteeierne for dialogtjenestene som vises i Dialogporten som definerer hvilke tilgangspakker som er knyttet til tjenestene.

Denne informasjonen vil normalt tjenesteeier dele sammen med øvrig dokumentasjon om tjenestene.

For regnskapsfører- og revisorscenarier vil man typisk knytte tjenestene til eksisterende tilgangspakker. Da blir de automatisk inkludert i resultatene fra Dialogporten, dersom revisor-/regnskapsførerpakkene er delegert til systembrukeren.

For andre scenarier kan det være aktuelt å opprette helt nye tilgangspakker for et nytt område. Da må disse tilgangspakkene også legges til systembrukeren.

### Eksempel: Meldingstjenester

Det er en rekke dialoger som opprettes hos virksomheter som er meldingstjenester.
Eksempel på slike meldingstjenester er

- dfo-ld-meldingstjeneste
- ldir-correspondence
- aarsregnskap-correspondence
- politi-virksomhet-standard-melding

Hvis man som virksomhet forventer å få meldinger knyttet til disse meldingstjenestene må man sikre 
at systembrukern er delegert. 

## Finnes det API for å ha oversikten?

Altinn eksponerer et Metadata API. Her finner du oversikt over hvilke tilgangspakker som finnes, og hvilke tjenester som er knyttet til den enkelte tilgangspakke.

Ved å overvåke dette API-et kan du til enhver tid være informert om nye tjenester som kan være aktuelle å gi systembrukeren rettigheter til, slik at de inkluderes når systembrukeren kaller Dialogporten.

En visuell oversikt over metadata finner du i [Altinn Access Manager](https://altinnaccessmanager.azurewebsites.net/) (demoapplikasjon).

Se også mer informasjon om systembrukere hos Digdir [her](https://samarbeid.digdir.no/altinn/systembruker/2542).





