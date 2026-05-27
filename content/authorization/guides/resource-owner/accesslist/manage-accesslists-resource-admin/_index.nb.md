---
title: Administrer tilgangslister i Altinn Studio
linktitle: Administrasjon av tilgangslister
description: I Altinn Studio kan du administrere tilgangslister for ressurser i Altinn Ressursregister.
toc: false
---

## Bakgrunn

For visse tjenester er det nødvendig å begrense tilgangen til bestemte organisasjoner. I Altinn 2 ble dette håndtert via Tjenesterettsregisteret (SRR).

I Altinn 3 håndteres denne funksjonaliteten av Ressursrettsregisteret (RRR) gjennom tilgangslister.

## Forutsetninger

- Administrasjonsrettigheter for Ressursregisteret
- Medlemskap i Tilgangsliste-gruppen for et spesifisert miljø

Se [Komme i gang med ressursadministrasjon](/nb/authorization/what-do-you-get/resourceadministration/) for mer informasjon.

## Opprette ny tilgangsliste

Naviger til ressursadministrasjonsdashbordet og klikk på lenken for administrasjon av tilgangslister.

![Access Lists](accesslist_0.png)

Dette tar deg til oversiktssiden for tilgangslister. Her ser du en liste over miljøer som er tilgjengelige for organisasjonen din.

![Access Lists](accesslist_1.png)

Velg et miljø for å vise tilgangslistene.

Klikk "Opprett ny tilgangsliste" og gi listen et unikt navn og ID.

![Access Lists](accesslist_1a.png)

Når listen er opprettet, kan du legge til en beskrivelse av listen din.

![Access Lists](accesslist_2.png)

## Legge til medlemmer i listen

Legg til organisasjoner som medlemmer i listen din.

I produksjonsmiljøer søker du etter navn eller organisasjonsnummer. I TT02 må du bruke testorganisasjonens nummer siden navn ikke vises.

![Access Lists](accesslist_3.png)

## Tildele tilgangsliste til ressurs

For å tildele listen din til en ressurs:

- Aktiver RRR for ressursen.
- Velg en eller flere lister som er autorisert som rapportører for ressursen.

![Access Lists](accesslist_5.png)

![Access Lists](accesslist_4.png)

Etter oppdateringen publiserer du ressursen til de ulike miljøene. Merk: Hvis du aktiverer RRR før listen er satt opp, mister alle brukere tilgangen.
