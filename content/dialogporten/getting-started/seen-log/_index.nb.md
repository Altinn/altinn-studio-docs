---
title: 'Sett-logg'
description: 'Lær om hvordan Dialogporten automatisk fyller ut en sett-logg'
weight: 70
---

## Introduksjon

Sett-loggen inneholder tidsstemplet informasjon om hvem som har "sett" en dialog ved en bestemt revisjon. "Sett" i denne sammenhengen betyr har forespurt en bestemt dialog-ID fra API-et. Bruk av søke/liste-API-et fører ikke til at sett-loggen fylles ut.

## Bruk

Sett-loggen fylles ut automatisk av Dialogporten, og kan ikke endres av verken tjenesteeiere eller sluttbrukere. Denne informasjonen kan brukes til å gi hint om hvilke brukere som har tilgang til en bestemt dialog, men gir ikke informasjon om hvorvidt innhold i dialogen er lest og forstått, vedlegg lastet ned eller om det er utført noen handlinger. For denne typen informasjon, se [aktivitetsloggen]({{<ref "../activity-log">}}).

Sett-loggoppføringer registreres per bruker per endring. Dette betyr at for en bestemt revisjon av dialogen, registreres kun den første tilgangen for en gitt bruker. Hvis dialogen oppdateres av tjenesteeier, vil en ny oppføring for samme bruker opprettes når/hvis dialogen deretter åpnes.

GUI-er vil normalt bruke sett-loggoppføringene som er gjort etter den siste oppdateringen. En fullstendig sett-logg er imidlertid også tilgjengelig, noe som gjør det mulig å korrelere (den uforanderlige) aktivitetsloggen/transmisjonsoppføringene med sett-loggoppføringer.

## Forhold til hendelser

Hver gang en sett-loggoppføring opprettes, produseres en hendelse og gjøres tilgjengelig for alle autoriserte hendelseskonsumenter. Se den tekniske referansen for mer informasjon om hendelsestype og informasjon som er gjort tilgjengelig i hendelsens brødtekst.

**Les mer**

* [Lær om aktivitetsloggen]({{<ref "../activity-log">}})
* [Teknisk referanse for sett-logg entiteten](<{{<ref "../../reference/entities/seen">}}>)

{{<children />}}