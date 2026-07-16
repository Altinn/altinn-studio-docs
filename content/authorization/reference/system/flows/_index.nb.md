---
title: Tekniske flyter
linktitle: Flyter
description: De viktigste flytene på tvers av komponentene i Altinn Autorisasjon.
weight: 6
toc: true
---

Flytene viser ansvarsovergangene mellom komponenter. [Følg en kjørbar autorisasjonsbeslutning ende til ende](./authorization-decision/) som hovedøvelse. Detaljerte API-kontrakter og integrasjonstrinn dokumenteres i API- og veiledningsseksjonene.

## Interaktiv autentisering

1. En nettleser starter innlogging hos Authentication.
2. Authentication videresender identitetskontrollen til en konfigurert identitetsleverandør, typisk ID-porten.
3. Etter vellykket innlogging etablerer Authentication sesjon og identitetskontekst.
4. Tjenesten bruker konteksten ved senere autorisasjonskontroll.

## Tokenutveksling for maskin-til-maskin

1. En klient presenterer et token fra en betrodd utsteder, typisk Maskinporten.
2. Authentication validerer utsteder, signatur, målgruppe, levetid og relevante claims.
3. Ekstern identitet og representasjon oversettes til Altinns identitetskontekst.
4. Altinn Access Token inngår i flyten som en plattformavhengighet eid av Team Platform.

## Autorisasjonsbeslutning

1. PEP bygger eller videresender en beslutningsforespørsel med subjekt, ressurs, handling og kontekst.
2. Authorization kompletterer konteksten med parts-, rolle- og ressursinformasjon når det er nødvendig.
3. Relevant policy og delegerte rettigheter hentes.
4. PDP evaluerer forespørselen og returnerer en beslutning.
5. PEP håndhever beslutningen. PDP utfører ikke den beskyttede handlingen.
6. Sikkerhetsrelevante hendelser kan sendes til Audit Log.

## Administrasjon av rettigheter

1. Brukerflaten eller en autorisert klient kaller Access Management.
2. Tjenesten validerer hvem som kan administrere rettigheten for den aktuelle parten og ressursen.
3. Tilgangsrelasjonen lagres og gjøres tilgjengelig i lesemodeller.
4. En senere PDP-forespørsel bruker denne relasjonen som del av beslutningsgrunnlaget.

## Systembruker

Systembruker binder et registrert leverandørsystem til en kundevirksomhet og et avgrenset sett rettigheter. Opprettelsesflyten og runtime-flyten er forskjellige: først etableres og godkjennes relasjonen; deretter kan et Maskinporten-autentisert system opptre på vegne av kunden innenfor de delegerte rettighetene.

## Samtykke

Samtykke bruker ressursdefinisjoner og metadata fra Resource Registry. Et samtykke etablerer en formåls- og ofte tidsavgrenset fullmakt. Ved validering må identitet, avgiver, mottaker, ressurs, handling, formål og gyldighet ses i sammenheng.
