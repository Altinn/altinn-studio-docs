---
title: Sette opp en formidlingstjeneste for nettleseren
linktitle: Tjenesteeier
description: Slik setter du opp en formidlingstjeneste slik at avsendere og mottakere kan bruke den i nettleseren.
tags: [Broker, guide, Formidling]
toc: true
weight: 10
---

Denne veiledningen er for deg som er tjenesteeier og vil at andre virksomheter skal sende og motta filer i nettleseren.

Virksomheten din må være tjenesteeier i Altinn. Nye virksomheter følger [Bli tjenesteeier i Altinn](https://samarbeid.digdir.no/altinn/bli-tjenesteeier-i-altinn/2819/).

Skal systemer kalle API-et, følger du i tillegg [Kom i gang som tjenesteeier](/nb/broker/getting-started/service-owner/). Systembruker og Maskinporten hører til det sporet.

## Sette opp tjenesten

Gjør stegene i denne rekkefølgen. Du må publisere ressursen til et miljø før du kan legge på tilgangsliste.

1. Opprett en ressurs av typen **Formidlingstjeneste** i [Altinn Studio](https://studio.altinn.no). I ressursfilen heter typen `BrokerService`. Gi tjenesten et navn som avsendere og mottakere kjenner igjen. Sett tilgangsregler som tillater `write` for avsendere og `read` for mottakere. `write` gir rett til å sende. `read` gir rett til å laste ned. Se [Ressursadministrasjon](/nb/authorization/what-do-you-get/resourceadministration/).
2. Publiser ressursen til miljøet der den skal brukes, for eksempel TT02. Se [Opprette og publisere ressurser i Altinn Studio](/nb/authorization/guides/resource-owner/create-resource-resource-admin/).
3. Legg tilgangsliste på ressursen i det samme miljøet. Dette kan du først gjøre etter publiseringen i steg 2. Legg inn organisasjonsnummeret til hver virksomhet som skal sende eller motta. Se [Administrer tilgangslister i Altinn Studio](/nb/authorization/guides/resource-owner/accesslist/manage-accesslists-resource-admin/).
4. Logg inn på [ab.tt02.altinn.no](https://ab.tt02.altinn.no) som en person som har tilgangspakken [Delegerbare Maskinporten scopes](https://tjenesteoversikten.no/package/maskinporten-scopes) for tjenesteeieren. Velg tjenesteeieren som avgiver øverst på siden.
5. Åpne **Dine formidlingstjenester** og finn tjenesten under **Formidlingstjenester [virksomheten] kan konfigurere**. Slå på **Rediger oppsett**, endre feltene og klikk på **Lagre**. Her setter du blant annet maks filstørrelse og levetid. Formidling viser et standardoppsett til du lagrer egne verdier.
6. Brukere som har `read` eller `write` etter reglene fra steg 1, og som velger en avgiver som står på tilgangslisten, kan nå sende og motta filer på [ab.tt02.altinn.no](https://ab.tt02.altinn.no).

Er **Rediger oppsett** avslått, står forklaringen under bryteren. Da har du valgt feil avgiver, eller du mangler tilgangspakken for tjenesteeieren.

Tjenesteeieren ser egne tjenester under **kan konfigurere** uten å stå på tilgangslisten. Avsendere og mottakere må stå på listen.

## Slik vises tjenesten

Under **Dine formidlingstjenester** ser du inntil tre lister:

- **Formidlingstjenester [virksomheten] kan sende med** viser tjenester der virksomheten står på tilgangslisten og har `write`.
- **Andre formidlingstjenester [virksomheten] er delaktig i** viser tjenester der virksomheten bare har `read`. De kan laste ned, men ikke sende. På tjenesten står det **Du er ikke autorisert for å sende på denne tjenesten.**
- **Formidlingstjenester [virksomheten] kan konfigurere** viser tjenester som virksomheten eier. Du ser listen når du har valgt tjenesteeieren som avgiver og har tilgangspakken fra steg 4.

Har avsender `write`, men ingen å sende til, står det **Tjenesten har ingen mottakere du kan sende til.** Da mangler mottakerne på tilgangslisten, eller de har ikke `read`.
