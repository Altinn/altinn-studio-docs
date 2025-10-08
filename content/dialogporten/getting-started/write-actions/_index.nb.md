---
title: 'Skrivehandlinger'
description: 'Lær hvordan skrivehandlinger brukes for å gi en mer integrert brukeropplevelse'
weight: 50
---

## Introduksjon
Skrivehandlinger er en måte å tillate GUI-handlinger å utføre en tilstandsendrende operasjon direkte fra nettleserbaserte sluttbrukersystemer uten behov for en full side navigering, noe som gir en mer sammenhengende brukeropplevelse.

## Bakgrunn
Alle [handlinger](/nb/dialogporten/getting-started/write-actions/../dialogs#handlinger) definert på en dialog er effektivt URLer som peker til tjenesteeiers system som må forespørres på en eller annen måte av sluttbrukersystemet når brukeren indikerer at handlingen skal utføres. Mens tilpassede sluttbrukersystemer som implementerer [API-handlinger](/nb/dialogporten/getting-started/write-actions/../dialogs#api-handlinger) kan påkalle både lese- og skriveoperasjoner ved hjelp av alle tilgjengelige HTTP-metoder og input/output-modeller, er nettleserbaserte sluttbrukersystemer som implementerer [GUI-handlinger](/nb/dialogporten/getting-started/write-actions/../dialogs#gui-handlinger) som standard begrenset til leseoperasjoner (dvs. navigere til en side, eller laste ned en fil) ved hjelp av HTTP GET-metoder.

Navigering på tvers av ulike domener er kanskje den mest sentrale funksjonen på web, og er, i motsetning til "tilstandsendrende" operasjoner som HTTP POSTs, ikke begrenset av nettlesere av sikkerhetsmessige årsaker. Dette er det som gjør det mulig å implementere [single-sign-on](https://docs.digdir.no/docs/idporten/oidc/oidc_func_sso) mekanismer i ID-porten og sesjonsinitialisering (som alle involverer flere nettleseromdirigeringer) hos det eksterne tjenesteeiers system. Dette muliggjør sømløs dyp-lenking mellom nettleserbaserte sluttbrukersystemer (f.eks. Arbeidsflate) og de brukerrettede GUI-delene av tjenesteeiers systemer.

Det er imidlertid (både i moderne nettlesere og i ID-porten) ikke mulig å utføre en POST på tvers av domener, dvs. sende inn et skjema til et endepunkt på en annen server, samtidig som man stoler på de samme SSO- og sesjonsinitialiseringsmekanismene. Dette er med hensikt, og for å unngå sikkerhetsproblemer som stammer fra [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf).

{{<notice info>}}
Tilpassede sluttbrukersystemer som benytter API-handlingene og Maskinporten/systembrukerautentisering er ikke begrenset av dette, da dette er sikkerhetstiltak som er satt i verk av nettlesere, og ikke iboende begrensninger i HTTP-protokollen.
{{</notice>}}

Dette er vanligvis ikke et problem, da de fleste GUI-handlinger i Dialogporten er ment å være full-side navigasjoner, som for eksempel "Gå til utfylling av skjema", der alle tilstandsendrende operasjoner implementeres. Men noen handlinger krever ikke noe spesielt input, og det gir heller ikke noe spesielt interessant output. Handlinger som "Bekreft melding lest" eller "Avbryt prosess", vil med en vanlig GUI-handling kreve at brukeren 1) utfører en full side navigering til det eksterne systemet, 2) utfører den faktiske tilstandsendrende operasjonen der, og venter på en bekreftelse før 3) navigering tilbake til den (nå antagelig oppdaterte) dialogen.

Selv om dette fungerer, er det ikke en veldig sammenhengende brukeropplevelse, da det involverer mellomliggende trinn og navigasjoner, som fra et brukerperspektiv kan virke unødvendige.

## Løsningen

Som med [front channel embeds](/nb/dialogporten/getting-started/write-actions/../front-channel-embeds/), utnytter skrivehandlinger [dialog token](/nb/dialogporten/getting-started/write-actions/../authorization/dialog-tokens/)-mekanismen for å tillate nettleserbaserte sluttbrukersystemer å direkte påkalle URLen som er knyttet til handlingen i bakgrunnen, dvs. uten å utføre en full-side navigering. Mens forespørselen pågår, kan sluttbrukersystemet vise en spinner eller lignende fremdriftsindikator. Ved fullføring vil sluttbrukere bli presentert med den oppdaterte dialogvisningen. I tilfelle feil (enten tekniske eller forretningslogikk-relaterte), kan en feilmelding vises.

Dialogporten kjenner ikke semantikken knyttet til en handling, så for handlinger som involverer komplekse mutasjoner av dialogen, må tjenesteeier utføre endringen, oppdatere dialogen i bakgrunnen og deretter returnere et vellykket svar i forespørselen fra sluttbrukersystemet. Dette vil utløse at sluttbrukeren laster inn den (nå oppdaterte) dialogen fra Dialogporten, og viser den nye tilstanden til brukeren. Det finnes også mekanismer for å tillate at dialogendringen skjer asynkront (forsinket) og uavhengig av forespørselen fra sluttbrukersystemet, transparent for sluttbrukeren. Se referanseseksjonen for tekniske detaljer.

**Les mer**
* [Teknisk referanse for front-channel embeds](/nb/dialogporten/getting-started/write-actions/../../reference/front-end/front-channel-embeds/)

{{<children />}}