---
title: Sikkerhet og tillit
linktitle: Sikkerhet
description: Tillitsgrenser og sikkerhetsprinsipper i Altinn Autorisasjon.
weight: 7
toc: true
---

Autorisasjonssystemet behandler sikkerhetskritiske data og beslutninger. Sikkerheten avhenger av hele kjeden, ikke bare av PDP-algoritmen.

## Tillitsgrenser

- Mellom ekstern identitetsleverandør og Authentication.
- Mellom Authentication og konsumenter av identitetskontekst.
- Mellom PEP og PDP.
- Mellom Authorization og kilder for part, rolle, ressurs, policy og delegering.
- Mellom hendelsesprodusent, kø, prosessor og Audit Log-lager.

## Prinsipper

- Valider utsteder, signatur, målgruppe, levetid og nødvendige claims før identitet brukes.
- Ikke likestill innlogget identitet med parten det handles på vegne av.
- Bruk stabile identifikatorer for part og ressurs gjennom hele flyten.
- La PEP håndheve `Deny`, manglende beslutning og tekniske feil etter eksplisitt strategi; ikke fall åpent.
- Begrens sensitive data i logger, tokens og beslutningskontekst.
- Behandle policy-, rolle- og delegeringsendringer som sikkerhetsrelevante hendelser.
- Korreler kall uten å gjøre korrelasjons-ID til et autentiseringsbevis.

## Beslutning og håndheving

PDP vurderer informasjonen den får og returnerer et resultat. Korrekt sikkerhet krever at PEP sender tilstrekkelig kontekst, tolker resultatet riktig og håndhever det før den beskyttede handlingen utføres.

Konkrete trusselmodeller, nøkkelrotasjon, hemmelighetshåndtering, dataklassifisering og beredskapsprosedyrer bør dokumenteres nær komponenten og lenkes fra denne siden.
