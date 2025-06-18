---
title: 'Hente dialogdetaljer'
description: 'Hvordan hente dialogdetaljer i Dialogporten'
weight: 30
---

## Introduksjon

Denne veiledningen viser hvordan et sluttbrukersystem kan få tilgang til spesifikke dialoger i Dialogporten ved hjelp av enten REST eller GraphQL APIer.

Merk at datastrukturen som returneres når du henter enkeltdialoger, er forskjellig fra den som returneres på [søkeendepunktet]({{<relref "../searching-for-dialogs">}}); dialogdetaljvisningen gir mer informasjon om dialogen og hva brukeren har tilgang til.

## Grunnleggende trinn (REST)

1. [Autentiser som en sluttbruker]({{<relref "../authenticating">}})
2. Finn dialog-IDen du vil ha tilgang til. For å søke etter tilgjengelige dialoger, se [søkeendepunktet]({{<relref "../searching-for-dialogs">}}). Dialog-IDer kan også [oppdages via hendelser]({{<relref "../detecting-changes">}}).
3. Utfør en GET-forespørsel til `/api/v1/enduser/dialogs/{dialogId}`.

## Returnert informasjon
Datastrukturen som returneres består av alle dataene som er tilgjengelige i søkeendepunktet, og i tillegg
* tittel, sammendrag og tilleggsinformasjon (tekst)
* [front channel embeds]({{<relref "../../getting-started/front-channel-embeds">}}) (dvs. referert innhold)
* [handlinger]({{<relref "../../getting-started/dialogs/#handlinger">}}) som kan utføres
* [aktivitetslogg]({{<relref "../../getting-started/activity-log">}})
* [forsendelser]({{<relref "../../getting-started/dialogs/#forsendelser">}})

For fullstendige detaljer, se [dialogdetaljenheten]({{<relref "../../reference/entities/dialog/">}}).

## Autorisasjon

Dialogporten vil utføre en autorisasjonssjekk mot Altinn Authorization for dialogen og dens komponenter, og sjekke om den autentiserte identiteten har tilgang til

* noen eller alle av de definerte handlingene
* noen eller alle av de definerte forsendelsene

Disse enhetene har et flagg, `isAuthorized`, som enten er `true` eller `false`. Hvis `false`, erstattes URLene som er knyttet til handlingen eller overføringen med en spesiell verdi, `urn:dialogporten:unauthorized`.

## Autentiseringsnivå

Ressurser i Altinn Authorization kan inneholde en policy som legger til et krav om et minimumsnivå for autentisering for å få tilgang til den ressursen. Altinn støtter [fire sikkerhetsnivåer](https://info.altinn.no/en/help/logging-in/miscellaneous-about-logging-in/sikkerhetsniva/).

I ID-porten bruker autentiseringsmetoder [eIDAS Levels of Assurance (LoA)](https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eIDAS+Levels+of+Assurance) for å indikere sikkerhetsnivåer. Det er tre nivåer, "low", "substantial" og "high"; men ID-porten støtter for øyeblikket bare autentiseringsmetoder som gir "substantial" eller "high" sikkerhetsnivåer. Disse er kartlagt til Altinn sikkerhetsnivå 3 og 4, henholdsvis.

Forsøk på å få tilgang til dialogdetaljer med en token med utilstrekkelig autentiseringsnivå vil resultere i en `403 Forbidden`-feil.

### Om systembrukere

Mens eIDAS LoA ikke definerer autentiseringsnivåer for ikke-interaktive, enterprise-autentiseringer som Maskinporten, så kartlegger Altinn av historiske årsaker disse autentiseringene - som i praksis involverer systembrukere - til nivå 3.

{{<notice warning>}}
eIDAS krever at både "substantial" og "high" sikkerhetsnivåer bare kan oppnås ved autentisering på flere nivåer (MFA). Så selv om man kan anta at "substantial" kartlegges til "nivå 3" og "high" kartlegges til "nivå 4", er det motsatte ikke nødvendigvis sant.
{{</notice>}}


## Arbeide med dialogdetaljer

Dataene som returneres vil se omtrent ut som strukturen nedenfor.

{{<notice warning>}}
Dette er en forkortet og forenklet modell der noen obligatoriske felt er utelatt/endret for korthets skyld
{{</notice>}}

```jsonc
{
    "id": "01945fca-3189-7159-b3e6-d6ff8f9cca0c",
    "org": "ttd",
    "serviceResource": "urn:altinn:resource:some-service",
    "party": "urn:altinn:person:identifier-no:08895699684",
    "content": {
        "title": "Melding fra TTD",
        "summary":  "Et sammendrag på inntil 250 tegn her.",
        "mainContentReference": { 
            "value": "https://externalsite.com/fce/e859b33d54ca",
            "mediaType": "application/vnd.dialogporten.frontchannelembed-url;type=text/markdown"
        }
    },
    "dialogToken": "eyJhbGciOiJ..snip..RwLXN0YWdpbmctMjQ",
    "attachments": [
        {
            "displayName": "Vedleggsnavn.pdf",
            "urls": [ 
                { 
                    "url": "https://externalsite.com/attch/vedlegg.pdf", 
                    "consumerType": "Gui" 
                }
            ]
        }
    ],
    "guiActions": [
        {
            "url": "https://externalsite.com/gui/formfill",
            "priority": "Primary",
            "title": "Gå til utfylling"
        }
    ],
    "apiActions": [
        {
            "version": "20250215",
            "url": "https://externalsite.com/api/formpost",
            "httpMethod": "POST",
            "requestSchema": "https://externalsite.com/schemas/20250215",
            "responseSchema": "https://externalsite.com/schemas/response"
        }
    ]
}
```

Merk at datastrukturen inneholder faktisk innhold - den inneholder i stedet referanser til innhold via enten front channel embeds eller vedlegg, som begge refererer til endepunkter eksternt til Dialogporten.

Ytterligere forespørsler må utføres for å hente disse ressursene. Sluttbrukersystemet bør forvente at alle disse endepunktene krever autentisering, og at den samme autorisasjonen håndheves som på selve dialogen, handlingen eller vedlegget. Vanligvis vil endepunktene kreve at den samme typen token (ID-porten eller Maskinporten med systembruker) leveres, men med et separat omfang. For Altinn-baserte tjenester, se dokumentasjonen for Altinn Correspondence og Altinn APps.

**Les mer**
* [Referanseinformasjon om dialogdetaljenheten]({{<relref "../../reference/entities/dialog/#detaljer">}})

## Håndtering av front channel embeds

Det kan være flere front channel embeds (FCEer) i en dialog:
* En (eller null) på et dialognivå
* En (eller null) per transmission (det kan være flere transmissions)

De grunnleggende trinnene for å håndtere front channel embeds er:

1. Utfør en GET-forespørsel til den angitte URLen, og oppgi [dialogtokenet]({{<relref "../../getting-started/authorization/dialog-tokens">}}) i en `Authorization: Bearer`-header
2. Basert på den angitte medietypen, analyser svaret (vanligvis markdown) og konverter til presentasjonsformatet (vanligvis HTML)
3. Injiser de konverterte dataene i GUIen

Endepunktene forventes å støtte [CORS-protokollen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) fullt ut, inkludert pre-flight, noe som muliggjør bruk av [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) og lignende APIer i et begrenset nettlesermiljø.

**Les mer**
* {{<link "../../getting-started/front-channel-embeds">}}
* {{<link "../../getting-started/authorization/dialog-tokens">}}
* {{<link "../../reference/front-end/front-channel-embeds">}}
* {{<link "../../reference/authorization/dialog-tokens/">}}


## Seen log updates

**Les mer**
* {{<link "../../getting-started/seen-log">}}
* {{<link "../../reference/entities/seen">}}