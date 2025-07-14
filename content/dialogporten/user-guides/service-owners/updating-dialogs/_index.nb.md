---
title: 'Oppdatere dialoger'
description: 'Hvordan oppdatere en dialog i Dialogporten'
weight: 30
---

## Introduksjon

Oppdatering av dialoger etter hvert som forretningsprosessen utvikler seg, eller hvis en relevant forretningshendelse inntreffer, er sentralt i Dialogporten-konseptet. Dette gjør det mulig for brukere å enkelt holde seg oppdatert på prosessen, og for sluttbrukersystem å umiddelbart reagere på enhver forretningshendelse definert av tjenesteeier, noe som gir mulighet for rike og ikke-poll-baserte integrasjoner til interne systemer.

De fleste feltene i dialogen kan endres etter [dialogopprettelse]({{<relref "../creating-dialogs">}}), med noen få bemerkelsesverdige unntak.

* Part og tjenesteressurs kan ikke endres
* Opprettet/oppdatert-felt kan ikke endres
* Aktiviteter og forsendelse er ikke-muterbare (dvs. eksisterende oppføringer kan ikke slettes eller endres)

### Innholdsoppdateringer

Dialogporten skiller mellom "innholdsoppdateringer" og alle andre oppdateringer. En innholdsoppdatering anses som enhver oppdatering av

- Status
- Utvidet status
- Alle innholdsfelt-medlemmer, dvs. `title`, `summary`, `additionalInfo`, `sendersName`, `extendedStatus` eller `mainContentReference`
- Vedlegg
- Handlinger (både GUI eller API)
- Forsendelse

Dialoger inneholder separate felt for tidsstempelet for den siste innholdsoppdateringen (`contentUpdatedAt`), og for enhver oppdatering (`updatedAt`).
Så endringer i f.eks. aktivitetslisten vil øke `updatedAt`-feltet, men _ikke_ `contentUpdatedAt`-feltet. Dette betyr at `contentUpdatedAt` kan
referere til et tidligere tidspunkt enn `updatedAt`. Den kan aldri være nyere enn `updatedAt`, da enhver endring vil øke `updatedAt`.

Sluttbrukersystem som viser lister over dialoger til brukere oppfordres til å [sortere]({{<relref "../../searching-for-dialogs#sortering">}}) etter `contentUpdatedAt` i synkende rekkefølge.

## Grunnleggende trinn

1. [Finn dialogen]({{<relref "../../searching-for-dialogs">}}) du vil oppdatere
2. Konstruer en forespørsels-body som inneholder feltene du vil oppdatere
3. Send en PUT- eller PATCH-forespørsel. Vellykkede forespørsler returnerer `204 No Content`, mens brukerfeil (4xx returkoder) returnerer en [RFC9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html) respons-body.

## Bruke PUT og fullstendige forespørsels-bodyer

Se [referansedokumentasjonen]({{<relref "../../../reference/entities/dialog/#oppdater-put">}}) for detaljer om forespørsels-bodyen. Felt som leveres
som ikke er tilstede i PUT DTO-definisjonen vil bli ignorert.

{{<notice warning>}}
Siden listen over forsendelse og aktiviteter er immutable, bør du IKKE oppgi de eksisterende oppføringene, men la arrayene være tomme eller utelat feltene
helt med mindre du har tenkt å legge til nye forsendelse og/eller aktiviteter.
{{</notice>}}

## Bruke PATCH for konsise oppdateringer

Dialogporten støtter også PATCH-operasjoner, som tillater en mer konsis forespørsel som bare inneholder feltene du vil endre. Dette kan resultere i mindre
forespørsels-bodyer, og kan i noen tilfeller eliminere behovet for å GET dialogen først for å konstruere PUT DTO.

Se [referansedokumentasjonen]({{<relref "../../../reference/entities/dialog/#oppdater-patch">}}) for detaljer og eksempler på hvordan du konstruerer en PATCH-forespørsel.

## Separate endepunkter for forsendelse og aktiviteter

For en gitt dialog er listen over forsendelse og aktiviteter tilgjengelig på separate ressursendepunkter:
* `/api/v1/serviceowner/dialogs/{dialogId}/transmissions`
* `/api/v1/serviceowner/dialogs/{dialogId}/activities`

Disse endepunktene støtter `POST` der individuelle forsendelse og aktiviteter kan legges til én om gangen. `POST`-forespørsler til disse endepunktene støtter også samtidighetshåndtering som beskrevet nedenfor.

Hver enkelt forsendelse/aktivitet er tilgjengelig ved å legge til forsendelse-id/aktivitet-id til endepunktene ovenfor. Bare `GET`-forespørsler støttes for disse endepunktene.

## Samtidighetshåndtering med betingede forespørsler

For å sikre datakonsistens ved oppdatering av dialoger, bruker Dialogporten optimistisk samtidighetshåndtering basert på `ETag`-headeren. `ETag`-verdien tilsvarer `revision`-feltet på dialogobjektet.

Når du utfører en oppdatering, inkluder `If-Match`-headeren i forespørselen din, og sett verdien til gjeldende `ETag` for dialogen. Dette sikrer at oppdateringen bare vil lykkes hvis dialogen ikke er endret siden du sist hentet den.

### Eksempel

1. Hent dialogen for å få dens nåværende `ETag`-verdi (finnes i `revision`-feltet).
2. Inkluder `If-Match`-headeren med `ETag`-verdien i din PUT- eller PATCH-forespørsel.

#### Eksempel på forespørsel med `If-Match`-header:
```http
PATCH /api/v1/serviceowner/dialogs/{dialogId}
Content-Type: application/json-patch+json
If-Match: "86ea8715-05f5-4a4e-8bf7-91840e06dee5"

[
    {
        "op": "replace",
        "path": "/status",
        "value": "Completed"
    }
]
```

Hvis verdien som er oppgitt i `If-Match`-headeren ikke samsvarer med gjeldende revisjons-id for den oppgitte dialogen, returneres et `412 Precondition Failed`-svar.

## Stille oppdateringer

I noen tilfeller, typisk ved retting av feil, er det ønskelig å utføre en ikke-forretningsprosessrelatert oppdatering av en dialog. Disse oppdateringene fungerer akkurat som normale oppdateringer, men
* Øker ikke `updatedAt` eller `contentUpdatedAt`
* Fører ikke til at Altinn Events produseres

Denne oppførselen kan aktiveres ved å legge til spørringsparameteren `?isSilentUpdate=true` til URL-en for POST/PUT/PATCH-forespørselen.

**Les mer**
- {{<link "../creating-dialogs">}}
- [If-Match header on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Match)

{{<children />}}