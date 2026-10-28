---
title: Når en virksomhet har en rolle for en annen virksomhet
linktitle: Virksomhetsknytninger
description: Slik kan en rolle fra Enhetsregisteret føre tilgang videre gjennom en tilknyttet virksomhet
tags: [architecture, security, authorization]
toc: true
weight: 1
hidden: true
aliases:
  - /authorization/what-do-you-get/accessgroups/register_er/knytning_org/
---

En rolle i Enhetsregisteret kan innehas av en person eller en virksomhet. Når en virksomhet har rollen, kan personer som representerer den tilknyttede virksomheten i enkelte tilfeller handle på vegne av virksomheten som ga rollen.

Dette brukes blant annet når en virksomhet har en annen virksomhet som regnskapsfører, revisor eller forretningsfører.

## Slik virker koblingen

Eksempel:

- Fjordhandel AS har registrert Regnskapspartner AS som regnskapsfører.
- Kari representerer Regnskapspartner AS med en rolle som gir de aktuelle regnskapstilgangene.
- Kari kan bruke de forhåndstildelte regnskapspakkene på vegne av Fjordhandel AS.

Kari får ikke alle tilgangene til Fjordhandel AS. Hun får bare tilgangene som følger av regnskapsførerrollen og de tilhørende tilgangspakkene.

## Rollen i hver ende har betydning

Altinn vurderer både

- rollen som knytter virksomhetene sammen
- rollen eller tilgangen personen har i den tilknyttede virksomheten
- hvilke tilgangspakker som er koblet til rollen
- hvilke handlinger tjenesteeieren har lagt i pakkene gjennom policyen for tjenesten

En tilknytning mellom to virksomheter er derfor ikke i seg selv en generell fullmakt.

## Tilgangen føres ikke ubegrenset videre

Virksomhetsknytninger skal ikke forstås som en kjede der tilgangen automatisk går gjennom et vilkårlig antall virksomheter.

Hvis Bergen AS har registrert Trondheim AS som daglig leder, og Oslo AS igjen er daglig leder for Trondheim AS, betyr det ikke automatisk at en representant for Oslo AS kan handle på vegne av Bergen AS. Kontroller den faktiske tilgangen i Altinn når flere virksomheter inngår i kjeden.

## Underenheter

En underenhet er knyttet til én eller flere hovedenheter i Register. Roller registreres normalt på hovedenheten. Tilgangen til en underenhet må derfor vurderes ut fra koblingen til hovedenheten og reglene for den aktuelle tjenesten.

Tjenesteeiere bør teste både hovedenheten og underenheten hvis tjenesten kan brukes av underenheter.

## Enkeltpersonforetak

Et enkeltpersonforetak og innehaveren er tett knyttet, men de er forskjellige aktører i Altinn. Ikke legg til grunn at en tilgang for foretaket alltid gjelder innehaveren som privatperson, eller omvendt. Tjenestens policy og den konkrete rollekoblingen avgjør hvem som får tilgang.

## Slik undersøker du en konkret tilgang

1. Finn rollen som er registrert mellom virksomhetene.
2. Finn hvilke tilgangspakker rollen gir.
3. Kontroller om personen har tilgang til å bruke eller administrere pakken gjennom den tilknyttede virksomheten.
4. Kontroller hvilke tjenester og handlinger som inngår i pakken.
5. Test med representativ testdata før tjenesten tas i bruk.

[Les hvordan roller fra Enhetsregisteret kobles til tilgangspakker](../).

<a href="https://tjenesteoversikten.no/packages" target="_blank" rel="noopener noreferrer">Undersøk innholdet i tilgangspakkene i Tjenesteoversikten (åpnes i ny fane)</a>. Tjenesteoversikten er et uoffisielt innsynsverktøy.

## Kilder og vedlikehold

- [Register-koden som importerer og lagrer roller fra Enhetsregisteret](https://github.com/Altinn/altinn-register/tree/main/src/apps/Altinn.Register)
- [Rolledefinisjonene i Access Management](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/RoleConstants.cs)
- [Koblingene mellom roller og tilgangspakker](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs)
