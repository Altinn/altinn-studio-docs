---
title: Motta data
description: Slik tar du imot data fra en Altinn-app, og slik bekrefter du at du har mottatt dem.
weight: 50
tags: [needsReview]
---

Når brukerne har sendt inn, ligger dataene i Altinn til du henter dem. Du kan hente dem selv, eller la appen levere dem til fagsystemet ditt:

- Du henter instansene og dataene selv gjennom API-ene, enten ved å polle eller ved å abonnere på hendelser. Se [Motta data under Kom i gang]({{< relref "/altinn-studio/v9/getting-started/receive-data" >}}).
- Du lar en systemoppgave i prosessen levere dataene med [eFormidling]({{< relref "/altinn-studio/v9/receive-data/eFormidling" >}}) eller [Fiks Arkiv]({{< relref "/altinn-studio/v9/receive-data/fiks-arkiv" >}}).

Uansett hvilken vei du velger, skal instansen til slutt få en bekreftelse på at du har mottatt dataene.

## Bekrefte at dataene er mottatt {#bekrefte-mottak}

En instans er ikke ferdig for Altinn når prosessen er slutt. Den er ferdig når du som tjenesteeier har bekreftet at du har hentet det du trenger. Altinn lagrer bekreftelsen på instansen som en *complete confirmation*, med organisasjonen din i `stakeholderId` og tidspunktet i `confirmedOn`.

Bekreftelsen gjør to ting:

- **Den skiller nytt fra gammelt når du poller.** Spør du Storage med `excludeConfirmedBy={org}`, får du bare instanser du ikke har bekreftet ennå. Uten bekreftelsen må du selv holde rede på hva du har hentet.
- **Den lar Altinn slette instansen.** Når brukeren sletter en arkivert instans permanent fra meldingsboksen, eller appen sletter den med `autoDeleteOnProcessEnd`, fjerner Altinn dataene sju dager etter slettingen. Det skjer bare hvis du har bekreftet mottak. Bekrefter du aldri, blir dataene liggende.

### Bekrefte selv

Henter du dataene selv, kaller du `complete`-endepunktet på appen når du har hentet og kontrollert dataene:

```http
POST https://{org}.apps.{host}/api/v1/instances/{instanceOwnerPartyId}/{instanceGuid}/complete
```

Du kaller endepunktet med et Maskinporten-token for organisasjonen din, og uten body. Svaret er instansen med bekreftelsen lagt til. Du kan trygt kalle endepunktet flere ganger, for Altinn registrerer bare én bekreftelse per organisasjon.

Endepunktet svarer `409 Conflict` mens arbeidsflytmotoren jobber med instansen, for eksempel mens en systemoppgave kjører. Da prøver du igjen senere. Det svarer `403 Forbidden` hvis organisasjonen din mangler handlingen `complete` i `App/config/authorization/policy.xml`. App-malen gir organisasjonen denne handlingen, så det skjer bare hvis noen har fjernet den.

### La eFormidling eller Fiks Arkiv bekrefte for deg

eFormidling-oppgaven bekrefter når integrasjonspunktet melder at meldingen er levert. Fiks Arkiv-oppgaven bekrefter når arkivet har kvittert for saken, så lenge `MarkInstanceComplete` står på, og det gjør den som standard. Da trenger du ikke kalle endepunktet selv. Poller du i tillegg med `excludeConfirmedBy`, får du heller ikke disse instansene i svaret.

### Referanse

- [CompleteConfirmation i instansmodellen]({{< relref "/api/models/instance" >}}#completeconfirmation)
- [Complete instance i app-API-et]({{< relref "/api/apps/instances" >}}#complete-instance)
- [Spørringsparametre i Storage]({{< relref "/api/storage/instances" >}})

{{<children />}}
