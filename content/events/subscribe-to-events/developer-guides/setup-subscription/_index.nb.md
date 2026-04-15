---
title: Hvordan sette opp et abonnement
linktitle: Sett opp abonnement
description: Hvordan-guide for å sette opp et abonnement for hendelser fra en spesifikk ressurs
weight: 10
toc: true
---


## Endepunkt

POST /subscriptions

{{% notice info %}}
Eksempel brukstilfelle: Bruk dette endepunktet når du vil legge til et abonnement på din Altinn Studio-apps hendelser.
Bruk filteregenskapene for å spesifisere hvilke hendelser du vil abonnere på.
{{% /notice %}}

## Autentisering og autorisasjon

Dette API-et krever en identitet med tilgang til de forespurte dataene. Hendelser publisert av Altinn Studio Apps kan 
aksesseres uten noen scopes, men hendelser fra andre kilder som Correspondence og Broker krever scopet 
__altinn:events.subscribe__. Scopet er offentlig tilgjengelig og kan brukes av både ID-porten- og Maskinporten-klienter.

Hvis du abonnerer på hendelser som tjenesteeier trenger du også scopet __altinn:serviceowner__. Dette gir deg tilgang 
til data på hendelseskildenivå fremfor for spesifikke aktører. Dette gjør altså subjektfilteret valgfritt. 
Scopet __altinn:serviceowner__ er kun tilgjengelig for registrerte tjenesteeiere som bruker en Maskinporten-klient.

Se [Autentisering og autorisasjon](/nb/events/api/#autentisering-og-autorisasjon) for mer informasjon.

## Forespørsel {#request}

### Content-Type
application/json

### Forespørselstekst

{{% notice info %}}
Listen over påkrevde egenskaper nedenfor viser hva som generelt kreves. Kravene varierer basert på hvem abonnenten er
og hvilken type ressurs abonnementet retter seg mot. Bruk dokumentasjonen nedenfor som veiledning og se problemdetaljene 
hvis abonnementsforespørselen din ikke blir akseptert.
{{% /notice %}}

### Påkrevde egenskaper for abonnementsforespørsel

#### endPoint

Webhook-URL for å motta HTTP POST-forespørsel fra Altinn Events.

{{% notice warning %}}
HTTPS-endepunkter må bruke offentlig gyldige TLS-sertifikater. Selvsignerte sertifikater støttes ikke og vil føre til 
feil ved validering av abonnement.
{{% /notice %}}

Endepunktet bør svare med en HTTP-responskode i 2xx-området hvis forespørselen ble behandlet vellykket. Alle andre 
responser vil bli behandlet som mislykkede. API-et må akseptere valideringshendelsen (nedenfor) i tillegg til alle 
normale hendelser.

```json
{
    "id": "694caa35-8b25-4cd7-b800-f6eeb93c56ed",
    "source": "https://platform.altinn.no/events/api/v1/subscriptions/1234",
    "type": "platform.events.validatesubscription",
    "specversion": "1.0"
}
```
_Eksempel på valideringshendelse_

#### resourceFilter
Filter for hendelseskilden. Resource-feltet i en hendelse er en utvidelse av CloudEvent-spesifikasjonen som Altinn Events 
bruker for å identifisere hendelseskilden i stedet for å bruke source-feltet direkte.

Ressursfilterfeltet er påkrevd, men Altinn Events kan fylle det ut automatisk basert på source-verdien hvis det er en 
gyldig URL til en Altinn Studio App. Dette gjøres for bakoverkompatibilitet med eldre klienter.

Verdien må være et eksakt treff med ressursen satt på de genererte hendelsene. F.eks: `urn:altinn:resource:app_digdir_demoapp`.

#### subjectFilter
Filter for cloud event-subjektet. Altinn Events utfører en eksakt treff-sammenligning.

Feltet er påkrevd med mindre du er tjenesteeier. Tjenesteeiere kan utelate feltet og abonnere på alle hendelser på 
tvers av alle parter/subjekter.

##### Mulige subjektfilterverdier for app-hendelser:
- /party/{partyid} – Hvis party-ID-en for aktøren din er ukjent så kan man bruke alternativt subjektfilter i stedet.

##### Mulige subjektfilterverdier for andre hendelseskilder:
- urn:altinn:organization:identifier-no:{organisasjonsnummer}
- urn:altinn:person:identifier-no:{fødselsnummer}

{{% notice warning %}}
Å sette verdien til en tom streng (`""`) vil føre til at abonnementet stille feiler med å levere hendelser.
{{% /notice %}}


### Valgfrie egenskaper for abonnementsforespørsel

#### sourceFilter
Filter for cloud event-kilden. Dette filteret kan brukes i stedet for ressursfilter for hendelser publisert av apper. 
Feltet beholdes for bakoverkompatibilitet med eldre klienter.

Verdien må være en URL. For eksempel en link til digdir sin demoapp i produksjon: `https://digdir.apps.altinn.no/digdir/demoapp`.

#### alternativeSubjectFilter
Filter for cloud event-alternativsubjektet. Alternativt subjekt er en utvidelse av CloudEvent-spesifikasjonen som
Altinn Events bruker for å gjøre subjektet i en hendelse menneskelig lesbart. Feltet brukes når subjektfeltet er fylt
ut med en party-ID.

{{% notice info %}}
Altinn Events lagrer ikke verdien for alternativt subjektfilter, men bruker den til å generere en tilsvarende
subjektfilterverdi. Dette er grunnen til at du ikke ser verdien hvis du henter eksisterende abonnementer.
{{% /notice %}}

##### Mulige alternativsubjektverdier for app-hendelser:
- /org/{organisasjonsnummer}
- /person/{fødselsnummer}


#### typeFilter
Filtrer hendelser ved hjelp av cloud event-typeverdien. Altinn Events utfører et eksakt treff-søk for abonnementer med 
et typefilter. Det er ingen støtte for jokertegn eller arrays per nå. Du kan utelate dette feltet og filtrere for 
hendelsene systemet ditt er interessert i på din side når hendelser postes til systemendepunktet ditt.

##### Typiske app-hendelser:
- app.instance.created
- app.instance.process.movedTo.Task_2
- app.instance.process.completed

##### Eksempler fra andre kilder:
- no.altinn.broker.published
- no.altinn.correspondence.correspondencepublished
- dialogporten.dialog.created.v1

Altinn Events dikterer ikke hvilke typer hendelser ulike hendelseskilder bruker. Du må se på dokumentasjonen for hver 
kilde for nøyaktig informasjon.

{{% notice warning %}}
Å sette `typeFilter` til en tom streng (`""`) vil føre til at abonnementet stille feiler med å matche hendelser. Dette
 er en vanlig feilkilde som er vanskelig å feilsøke, siden ingen valideringsfeil returneres.
{{% /notice %}}

#### includeSubunits
Lar hendelser der subjektet er en underenhet bli fanget opp av et abonnement på hovedenheten. Dette gjør det mulig 
for en organisasjon med underenheter (hierarki av organisasjoner) å opprette ett enkelt abonnement som kan fange opp
 alle hendelser med subjekter på tvers av organisasjonshierarkiet.

Verdien vil kun ha effekt hvis subjektfilterverdien er den faktiske hovedenheten i organisasjonen.

Standardverdi er: False.

## Respons

En vellykket abonnementsregistrering bør resultere i en 201 created-respons med
[abonnementet](https://raw.githubusercontent.com/Altinn/altinn-events/main/src/Events/Models/Subscription.cs)
serialisert som en JSON-streng i responsteksten.

201-responskoden indikerer ikke om abonnementet har blitt validert eller ikke.
Altinn vil kun begynne å pushe hendelser til et abonnementsendepunkt når abonnementsendepunktet har blitt validert.
Du kan hente abonnementet ditt ved å bruke abonnements-ID-en for å sikre at abonnementet ditt har blitt validert ok.


### Content-Type
- application/json

### Responskoder
- 201 Created: Abonnementet har blitt registrert med suksess.
- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader, eller at forbrukeren ikke har tillatelse
  til å abonnere på hendelser fra denne ressursen basert på filterparametere
- 403 Forbidden: Indikerer manglende påkrevd scope eller autorisasjon. Sjekk brukerroller eller tilgangspakker mot
  retningslinjene for hendelseskilden.

## Eksempler

### Forespørsel

Merk at et Altinn Token må inkluderes i autorisasjonsheaderen.

```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/subscriptions' \
--header 'Accept: application/xml' \
--header 'Authorization: Bearer {insert Altinn token}' \
--header 'Content-Type: application/json' \
--data '{
  "sourceFilter": "https://digdir.apps.altinn.no/digdir/demoapp",
  "endpoint":"https://webhook.site/"
  }'
```

### Respons

#### 201 Created
```json
{
    "id": 1619,
    "endPoint": "https://webhook.site/43cec4b7-b20b-4cbd-9b47-592750bf06d1",
    "sourceFilter": "https://digdir.apps.at22.altinn.cloud/digdir/demoapp",
    "consumer": "/org/digdir",
    "createdBy": "/org/digdir",
    "created": "2023-04-05T13:57:11.234994Z",
    "validated": false,
    "includeSubunits": false
}
```

#### 400 Bad Request
```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-3755bd55cf6d4e1ebdf7ed49b6f3d3be-154ebd2ad01de860-00",
    "errors": {
        "$": [
            "The JSON object contains a trailing comma at the end which is not supported in this mode. Change the reader options. Path: $ | LineNumber: 2 | BytePositionInLine: 2."
        ]
    }
}
```

#### 401 Unauthorized
```json
"Not authorized to create a subscription with subject /organisation/989271156"
```
