---
title: 'Skrivehandlinger'
description: 'Lær hvordan skrivehandlinger brukes for å gi en mer integrert brukeropplevelse'
weight: 50
---

## Introduksjon
Skrivehandlinger gjør det mulig for GUI-handlinger å utføre tilstandsendrende operasjoner direkte fra nettleserbaserte sluttbrukersystemer uten behov for full sidenavigering, noe som gir en mer sammenhengende brukeropplevelse.

## Bakgrunn
Alle [handlinger](../dialogs/#handlinger) definert på en dialog er i praksis URL-er som peker til tjenesteeiers system, og som må forespørres på en eller annen måte av sluttbrukersystemet når brukeren indikerer at en handling skal utføres. Mens tilpassede sluttbrukersystemer som implementerer [API-handlinger](../dialogs/#api-handlinger) kan påkalle både lese- og skriveoperasjoner ved hjelp av alle tilgjengelige HTTP-metoder og input/output-modeller, er nettleserbaserte sluttbrukersystemer som implementerer [GUI-handlinger](../dialogs/#gui-handlinger) som standard begrenset til leseoperasjoner, dvs. å navigere til en side eller laste ned en fil, ved hjelp av HTTP GET-metoder.

Navigering på tvers av ulike domener er kanskje den mest sentrale funksjonen på weben, og er, i motsetning til tilstandsendrende operasjoner som HTTP POST-forespørsler, ikke begrenset av nettlesere av sikkerhetsmessige årsaker. Dette er det som gjør det mulig å implementere [single-sign-on](https://docs.digdir.no/docs/idporten/oidc/oidc_func_sso)-mekanismer i ID-porten og sesjonsinitialisering, som alle involverer flere nettleseromdirigeringer, hos det eksterne tjenesteeiersystemet. Dette muliggjør sømløs dyp-lenking mellom nettleserbaserte sluttbrukersystemer, f.eks. Arbeidsflate, og de brukerrettede GUI-delene av tjenesteeiers systemer.

Det er imidlertid ikke mulig, verken i moderne nettlesere eller i ID-porten, å utføre en POST på tvers av domener, dvs. sende inn et skjema til et endepunkt på en annen server, samtidig som man stoler på de samme SSO- og sesjonsinitialiseringsmekanismene. Dette er med hensikt, for å unngå sikkerhetsproblemer som stammer fra [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf).

{{<notice info>}}
Tilpassede sluttbrukersystemer som benytter API-handlingene og Maskinporten/systembrukerautentisering er ikke begrenset av dette, da dette er sikkerhetstiltak som er satt i verk av nettlesere, og ikke iboende begrensninger i HTTP-protokollen.
{{</notice>}}

Dette er vanligvis ikke et problem, da de fleste GUI-handlinger i Dialogporten er ment å være fullsidenavigasjoner, som for eksempel "Gå til utfylling av skjema", der alle tilstandsendrende operasjoner implementeres. Men noen handlinger krever ikke noe spesielt input, og de gir heller ikke noe spesielt interessant output. Handlinger som "Bekreft melding lest" eller "Avbryt prosess" vil med en vanlig GUI-handling kreve at brukeren 1) utfører en full sidenavigering til det eksterne systemet, 2) utfører den faktiske tilstandsendrende operasjonen der og venter på en bekreftelse, og deretter 3) navigerer tilbake til den nå antatt oppdaterte dialogen.

Selv om dette fungerer, er det ikke en særlig sammenhengende brukeropplevelse, da det involverer mellomliggende trinn og navigasjoner som kan virke unødvendige fra brukerens perspektiv.

## Løsningen

Som med [front channel embeds](../front-channel-embeds/) bruker skrivehandlinger [dialogtoken](../authorization/dialog-tokens/)-mekanismen for å tillate nettleserbaserte sluttbrukersystemer å påkalle URL-en som er knyttet til handlingen direkte i bakgrunnen, dvs. uten å utføre en fullsidenavigering. Mens forespørselen pågår, kan sluttbrukersystemet vise en spinner eller en lignende fremdriftsindikator. Ved fullføring vil sluttbrukerne få presentert den oppdaterte dialogvisningen. Ved feil, enten tekniske eller relatert til forretningslogikk, kan en feilmelding vises.

Dialogporten kjenner ikke semantikken knyttet til en handling, så for handlinger som involverer komplekse mutasjoner av dialogen, må tjenesteeieren utføre endringen, oppdatere dialogen i bakgrunnen og deretter returnere et vellykket svar på forespørselen fra sluttbrukersystemet. Dette vil utløse at sluttbrukeren laster inn den oppdaterte dialogen fra Dialogporten og viser den nye tilstanden for brukeren. Det finnes også mekanismer som gjør det mulig at dialogendringen skjer asynkront, dvs. forsinket og uavhengig av forespørselen fra sluttbrukersystemet, på en måte som er transparent for sluttbrukeren. Se referanseseksjonen for tekniske detaljer.

**Les mer**
* [Teknisk referanse for front-channel embeds](../../reference/front-end/front-channel-embeds/)

{{<children />}}
