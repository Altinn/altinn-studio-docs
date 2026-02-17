---
title: Systembruker og dialogporten API
description: Denne veiledningen forklarer hvordan man benytter systembruker mot Dialogporten API.
linktitle: Systembruker og dialogporten API
toc: false
---

Et vanlig bruksområde er å sette opp en systembruker som skal overvåke innboksen til én eller flere virksomheter i Dialogporten.

For å kunne kalle Dialogporten API kreves det riktige OAuth-scopes. Følgende scopes må benyttes:

- digdir:dialogporten
- altinn:correspondence.read

Dette gir grunnleggende tilgang til API-et.

Dette i seg selv gir likevel ikke rett til å lese data i Dialogporten. Dialogporten returnerer kun dialoger som en systembruker har blitt delegert tilgang til.

Det betyr at systembrukeren må ha fått delegert enten tilgangspakkene som gir tilgang til dialogene som skal leses, eller enkelttjenesten(e) som dialogene består av.
Enkeltjenestedelegering er kun mulig for systembruker i egen virksomhet.

Uten rettigheter vil listen fra dialogporten alltid være tom.

## Hvordan finner jeg ut hvilke tilgangspakker jeg trenger?

I utgangspunktet er det tjenesteeierne for dialogtjenestene som vises i Dialogporten som definerer hvilke tilgangspakker som er knyttet til tjenestene.

Denne informasjonen vil normalt tjenesteeier dele sammen med øvrig dokumentasjon om tjenestene.

For regnskapsfører- og revisorscenarier vil man typisk knytte tjenestene til eksisterende tilgangspakker. Da blir de automatisk inkludert i resultat fra Dialogporten hvis revisor/regnskapsfører pakkene er delegert til systembruker.

For andre scenarier kan det være aktuelt å opprette helt nye tilgangspakker for et nytt område. Da må disse tilgangspakkene også legges til systembrukeren.

## Finnes det API for å ha oversikten?

Altinn eksponerer et Metadata API. Her finner du oversikt over hvilke tilgangspakker som finnes, og hvilke tjenester som er knyttet til den enkelte tilgangspakke.

Ved å overvåke dette API-et kan du til enhver tid være informert om nye tjenester som kan være aktuelle å gi systembrukeren rettigheter til, slik at de inkluderes når systembrukeren kaller Dialogporten.

En visuell ovesikt over Metadata kan du finner i [Altinn Access Manager](https://altinnaccessmanager.azurewebsites.net/) (demo applikasjon.)


Se også mer detaljert [dokumentasjon for Dialogporten hos Digdir](https://www.digdir.no/media/5750/download).



