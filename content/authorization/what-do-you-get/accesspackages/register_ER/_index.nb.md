---
title: Roller fra Enhetsregisteret
linktitle: Fra Enhetsregisteret
description: Slik gir roller fra Enhetsregisteret tilgangspakker og mulighet til å handle på vegne av en virksomhet
tags: [architecture, security, authorization]
toc: true
weight: 200
hidden: true
aliases:
  - /authorization/what-do-you-get/accessgroups/register_er/
---

Altinn henter opplysninger om roller i virksomheter fra Enhetsregisteret. En rolle kan gi innehaveren fullmakt til tilgangspakker og mulighet til å gi fullmakt videre på vegne av virksomheten.

Hvilke roller en virksomhet kan registrere, avhenger av organisasjonsformen. Brønnøysundregistrene bestemmer hvem som har rollen. Altinn bestemmer hvilke tilgangspakker rollen gir.

## Slik blir en rolle til tilgang

1. Virksomheten registrerer en person eller en annen virksomhet i en rolle i Enhetsregisteret.
2. Altinn Register henter rolleknytningen.
3. Altinn Access Management kobler rollen til én eller flere tilgangspakker.
4. Tjenesteeieren knytter handlingene i tjenesten til en tilgangspakke gjennom policyen for tjenesten.

Rollen alene inneholder derfor ikke en fast liste over tjenester. Tilgangen følger av kombinasjonen av rollen, koblingen til tilgangspakken og policyen som tjenesteeieren har satt for tjenesten.

## Skille mellom tilgang og administrasjon

En rollekobling kan gi ulike muligheter:

- **Har tilgang** betyr at rolleinnehaveren kan bruke tjenester som inngår i pakken.
- **Kan gi fullmakt** betyr at rolleinnehaveren kan gi andre fullmakt til pakken.
- **Kan tildele** brukes for enkelte administrative koblinger og betyr at rolleinnehaveren kan tildele tilgang innenfor det aktuelle området.

Disse mulighetene følger ikke alltid hverandre. En regnskapsfører kan for eksempel få fullmakt til regnskapspakker uten å kunne gi fullmakten videre.

## Eksempler på roller og forhåndstildelte pakker

Tabellen viser sentrale eksempler. Koblingene kan endres når pakker eller tjenester endres.

| Rolle fra Enhetsregisteret | Eksempler på pakker | Kan gi fullmakt til eksempelpakkene? |
|---|---|---|
| Daglig leder, styrets leder og innehaver | Klientadministrator, tilgangsstyring, hovedadministrator og Maskinporten administrator | Ja |
| Regnskapsfører | Regnskapsfører med signeringsrettighet, regnskapsfører uten signeringsrettighet og regnskapsfører lønn | Nei |
| Revisor | Ansvarlig revisor og revisormedarbeider | Nei |
| Forretningsfører for borettslag og eierseksjonssameie | Forretningsfører eiendom | Nei |
| Bostyrer | Konkursbo lesetilgang og konkursbo skrivetilgang | Ja |
| Kontaktperson for NUF og norsk representant for utenlandsk enhet | Tjenester for NUF og enkelte administrative pakker | Ja |

<a href="https://tjenesteoversikten.no/packages" target="_blank" rel="noopener noreferrer">Se hvilke tjenester som inngår i tilgangspakkene i Tjenesteoversikten (åpnes i ny fane)</a>. Tjenesteoversikten er et uoffisielt innsynsverktøy som team Autorisasjon har laget med åpne API-er.

## Roller uten forhåndstildelte pakker

At en person er registrert med en rolle i Enhetsregisteret, betyr ikke at rollen automatisk gir tilgang i Altinn. Roller som styremedlem, varamedlem og kontaktperson er eksempler på roller som ikke nødvendigvis har forhåndstildelte tilgangspakker.

Personen kan likevel få fullmakt hvis noen som kan administrere fullmakter, gir personen fullmakt til en tilgangspakke eller en enkelttjeneste.

## Organisasjonsformen påvirker resultatet

Ikke alle roller kan registreres for alle organisasjonsformer. Enkelte koblinger gjelder bare bestemte organisasjonsformer. Forretningsfører får for eksempel pakken for eiendomsforvaltning når virksomheten er et borettslag eller et eierseksjonssameie.

En rolle kan også innehas av en annen virksomhet. Da kan Altinn i enkelte tilfeller føre tilgangen videre til personer i den tilknyttede virksomheten. [Les hvordan virksomhetsknytninger virker](./knytning_org/).

## Dette må tjenesteeieren ta hensyn til

- Velg en tilgangspakke som dekker oppgaven brukeren skal utføre, ikke en bestemt stillingstittel.
- Kontroller at pakken ikke gir bredere tilgang enn tjenesten krever.
- Ikke legg til grunn at alle personer med en registrert rolle kan gi fullmakten videre.
- Test med de organisasjonsformene og rollene som målgruppen faktisk bruker.
- Beskriv eventuelle tilleggskrav i veiledningen for tjenesten.

## Kilder og vedlikehold

Den tekniske fasiten ligger i Access Management-koden:

- [Rolledefinisjonene i RoleConstants.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/RoleConstants.cs)
- [Koblingene mellom roller og tilgangspakker i IngestRolePackage.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs)
- [Definisjonene av tilgangspakkene i PackageConstants.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs)

[Brønnøysundregistrene beskriver Enhetsregisteret og hvilke opplysninger registeret inneholder](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/).
