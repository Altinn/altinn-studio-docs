---
title: Teknisk oversikt
linktitle: Teknisk oversikt
description: Altinn 3 Formidling overgangsløsningen gjør det mulig for serviceeiere som eier Formidlings-tjenester i Altinn 2 å peke disse tjenestene mot Altinn 3 ved hjelp av en intern Altinn 2 bro.
tags: [arkitektur, løsning, formidling, overgang]
toc: false
weight: 1
---

## Om

"*Altinn 3 Broker Transition Service Bridge*" er en intern komponent i Altinn 2 som overfører Formidlings-forespørsler fra Altinn 2 til Altinn 3 for en gitt forespørsel, basert på "*ServiceCode*"/"*ServiceEdition*" kombinasjon av forespørselen.
Dette er en implementering av den myke overgang beskrevet [her](../../solution-architecture/#myk-overgang-fra-altinn-2-til-altinn-3).

## Teknisk oversikt

Altinn 2 lar sluttbrukere gjøre kall for spesifikke Formidlings-tjenester og overføre disse forespørslene til Altinn 3 basert på "*ServiceCode*"/"*ServiceEdition*" verdier i forespørselen.
Filer overført på denne måten vil være tilgjengelige for både Altinn 3 og Altinn 2 brukere.

1. Forespørsler som har muligheten til å spesifisere "*ServiceCode*"/"*ServiceEdition*".
I dette tilfellet vil Altinn umiddelbart avgjøre at forespørselen skal overføres til Altinn 3 via "*Altinn 3 Broker Bridge*".
I tilfeller der "*ServiceCode*/"*ServiceEdition"* kan spesifiseres, men ikke er spesifisert, vil ikke forespørsler bli overført til Altinn 3.
2. Forespørsler som ikke har muligheten til å spesifisere "*ServiceCode*"/"*ServiceEdition*".
I dette tilfellet vil det først bli bli gjort oppslag i Altinn 2 Formidlings datalager. Dersom ingenting blir funnet i Altinn 2, blir forespørsel overført til Altinn 3.
3. Filer i Altinn 3 kan ikke være større enn 1 GB, da dette er den maksimale fil størrelsen i Altinn 2. Ressursen Altinn 3 skal konfigureres med denne MaxFileSize begrensningen.
4. Fil data og metadata vil bli lagret i Altinn 3 datalager, mens Altinn 2 Formidlings-tjeneste kall blir overført til Altinn 3.
5. Kvitteringer vil ikke lenger bli lagret i Altinn 2, i stedet vil en pseudokvittering bli generert fra Altinn 3 metadata. Kvitterings-tjeneste i Altinn 2 vil ikke lenger brukes for overførte Formidlings-tjenester. Hvis du er avhengig av å bruke kvitteringer i sammenheng med Formidlings-tjeneste, kan du sende inn en funksjonsforespørsel.
6. Bruk av manifestfilen i innsendt fil data er ikke lenger støttet i Altinn 3 og overførte Formidlings-tjenester. Hvis dette er et kritisk krav, kan du sende inn en funksjonsforespørsel.

<img src="altinn3-broker-transition-flowchart.svg" />

## Overførte formidlings-tjenester - hva du kan forvente
Når Altinn 3 Overgangsløsning for Formidlings-tjeneste funksjonalitet er aktivert i Altinn 2, kan du forvente følgende:
1. Tjenesteeiere kan be om at Altinn 2 Formidlings-tjenester blir overført til Altinn 3 ressurser.
2. Sluttbrukere som bruker disse tjenestene vil deretter overføre data til Altinn 3 i stedet for Altinn 2 datalager.
3. Filer som var tilgjengelige i Altinn 2 for Formidlings-tjenesten vil ikke lenger være tilgjengelige.
4. Alle nye filer og statusendringer vil skje i Altinn 3 Formidlings-tjeneste løsningen.
5. Tjenesteeiere med overførte Formidlings-tjenester må administrere tilgangsrettigheter i både Altinn 3 og Altinn 2 samtidig, da disse ikke automatisk blir synkronisert.

{{<children />}}


