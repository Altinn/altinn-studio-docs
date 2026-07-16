---
title: Velg riktig integrasjonsmåte
linktitle: Velg integrasjonsmåte
description: Slik velger du autentisering, representasjon og autorisasjon for tjenesten eller systemet ditt.
weight: 1
toc: true
---

Start med å avklare hvem som skal handle, hvem handlingen gjelder for, og om en person er til stede. Valget avgjør hvilke token, fullmakter og API-er du trenger.

## Velg ut fra situasjonen

| Situasjon | Start med | Dette løser valget |
|---|---|---|
| En person bruker systemet ditt og kan logge inn | [ID-porten](../authentication/id-porten/) | Bekrefter hvem personen er |
| Et system kaller et API som virksomheten selv | [Maskinporten](../authentication/maskinporten/) | Bekrefter hvilken virksomhet eller klient som kaller API-et |
| Et system skal handle med fullmakter fra en virksomhet | [Systembruker](../../guides/system-vendor/system-user/) | Knytter systemet til tilganger som virksomheten har godkjent |
| Et system skal arbeide for kunder eller klienter | [Systembruker for klientsystem](../../guides/system-vendor/system-user/#systembruker-for-klientsystem) | Knytter systemet til klientforhold og tilgangspakker |
| En datakonsument må få tillatelse til å hente bestemte data | [Samtykke](../consent/) | Dokumenterer hva personen eller virksomheten har samtykket til |
| Tjenesten skal avgjøre om en identitet kan utføre en handling | [Tilgangskontroll med PDP](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-pdp) | Kontrollerer identitet, ressurs, handling og parten handlingen gjelder for |

Du kan trenge flere av valgene samtidig. Systembruker bruker for eksempel Maskinporten til autentisering, mens tjenesteeieren bruker Altinn Autorisasjon til å kontrollere tilgangen.

## Skill autentisering fra autorisasjon

**Autentisering** bekrefter hvem personen eller systemet er. ID-porten og Maskinporten utsteder token som tjenesten kan kontrollere.

**Representasjon** beskriver hvem identiteten handler på vegne av. Det kan være personen selv, egen virksomhet eller en klient.

**Autorisasjon** avgjør om identiteten kan utføre en bestemt handling på en bestemt ressurs for den aktuelle parten. Et gyldig token er derfor ikke nok til å gi tilgang.

**Samtykke** gir en datakonsument tillatelse til å hente eller bruke bestemte data. Samtykket erstatter ikke autentisering eller tilgangskontroll.

## Hvis en person er til stede

Bruk ID-porten når personen skal logge inn og systemet skal utføre handlinger på vegne av den innloggede personen.

Avklar

- hvilke ID-porten-scopes systemet trenger
- hvordan access-tokenet skal veksles til et Altinn-token
- hvordan systemet finner partene personen kan representere
- hvordan tjenesten kontrollerer tilgang til hver handling

[Følg veiledningen for autentisering med ID-porten.](../authentication/id-porten/)

## Hvis systemet kjører uten en person

Bruk Maskinporten når et system kaller et API uten at en person er innlogget. Maskinporten bekrefter klienten og virksomheten, men gir ikke automatisk fullmakt til å utføre alle handlinger.

Bruk systembruker i tillegg når systemet trenger tilganger som en virksomhet har godkjent. Velg mellom

- systembruker for egen virksomhet
- systembruker for kunder eller klienter

[Følg hovedløpet for systemintegratorer.](../system-integrator/)

## Hvis du eier API-et

Tjenesten må håndheve tilgangen uavhengig av hvordan klienten autentiserer seg. Definer ressursen og handlingene, kontroller tokenet, bygg riktig beslutningsforespørsel og håndhev resultatet fra PDP.

[Følg hovedløpet for tjenesteeiere.](../service-owner/)

## Kontroller gjeldende status

Noen veiledninger beskriver overgang fra Altinn 2, funksjonalitet i test eller funksjonalitet som fortsatt utvikles. Før du velger løsning, må du kontrollere

- om funksjonen er tilgjengelig i miljøet du skal bruke
- om tjenesteeieren støtter den aktuelle identiteten
- hvilke scopes, tilgangspakker og ressurser som gjelder
- om veiledningen beskriver en overgangsløsning

[Se status og planlagte oppgaver for Altinn Autorisasjon.](../../reference/status/)