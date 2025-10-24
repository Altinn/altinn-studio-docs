---
title: Ordliste for administrasjon og overvåking
linktitle: Ordliste
description: Forklaringer av tekniske ord og begreper som brukes i dokumentasjonen om administrasjon og overvåking av Altinn-tjenester.
weight: 10
tags: [needsReview]
---

Denne siden inneholder forklaringer av tekniske ord og begreper som brukes i dokumentasjonen om administrasjon og overvåking av Altinn-tjenester. Ordene er sortert alfabetisk.

## A

### Alarmering

Alarmering er å reagere automatisk på den overvåkede informasjonen, eller mønstre i dataen. Du kan sette opp regler som varsler deg når noe uvanlig skjer.

**Eksempel:** Du får en e-post eller SMS hvis feilraten i appen din plutselig øker til over 5 % av alle forespørsler.

### Application Insights

Se **Azure Application Insights**.

### ASP.NET Core-dashbord

Viser standard målinger for webapplikasjoner, som antall forespørsler, feilrater og responstider.

### authLevel (autentiseringsnivå)

Hvor høyt sikkerhetsnivå brukeren har logget inn med (nivå 3 eller 4).

### Avhengighet (dependency)

En ekstern tjeneste eller database som appen din kaller. Hvis en forespørsel er treg, kan det skyldes at en av disse avhengighetene bruker lang tid på å svare.

### Azure Application Insights (AI)

En utvidelse av Azure Monitor og verktøyet vi bruker i Altinn for å tilby overvåkingsfunksjonalitet for apper. Application Insights kan gi deg som apputvikler verdifull innsikt i helse, ytelse og bruk av appen din.

### Azure Monitor

Microsofts overvåkingsplattform i skyen, mens Application Insights er den delen som er spesielt laget for å overvåke applikasjoner.

## B

### Backend

Et system eller en tjeneste som kjører på en server og håndterer databehandling og lagring, i motsetning til frontend som brukeren ser og samhandler med.

**Eksempel:** Når du sender inn et skjema, sendes dataene til en backend som behandler og lagrer dem.

### Berikelse (enrichment)

Å legge til ekstra informasjon i telemetrien for å gjøre den mer nyttig.

**Eksempel:** Du kan automatisk legge til miljønavn (test/produksjon) eller organisasjonsnummer på all telemetri som sendes ut.

## C

### customDimensions

Et felt i Application Insights hvor du kan legge til egendefinerte data som er spesifikke for din app.

**Eksempel:** Du kan bruke `customDimensions["userId"]` for å hente ut bruker-ID fra telemetridata.

## D

### Dataelement

En del av dataene i en instans, for eksempel selve skjemautfyllingen eller et vedlegg.

### Dependency

Se **Avhengighet**.

## E

### Enrichment

Se **Berikelse**.

### Exception

En feil som oppstår når programmet kjører, for eksempel når det prøver å dele på null eller lese en fil som ikke finnes.

## G

### Grafana

Et åpen kildekode-verktøy for å lage grafer og dashbord. Det er mer fleksibelt enn Application Insights for å lage egendefinerte visualiseringer.

## H

### Histogram

En målingstype som viser fordelingen av verdier over tid. Brukes til å måle varigheter og størrelser.

**Eksempel:** I stedet for å bare vite gjennomsnittlig varighet, kan du se at 90 % av instansene tar under 10 sekunder, mens 10 % tar over 1 minutt.

## I

### Instans (også kalt eksemplar)

En enkelt utfylling av et skjema eller en prosess i Altinn. Hver gang en bruker starter en ny utfylling, opprettes en ny instans – et nytt eksemplar av skjemaet.

### instanceId

En unik ID for en spesifikk utfylling av et skjema eller en prosess i Altinn. Hver gang en bruker starter en ny utfylling, får den en egen instanceId.

### Instrumentering

Instrumentering betyr at programvaren din forteller hva den gjør mens den kjører. Dette er som å legge til måleinstrumenter i et system for å kunne se hva som skjer.

**Eksempel:** Når en bruker sender inn et skjema, kan appen registrere hvor lang tid det tok å behandle innsendingen og om det oppstod noen feil underveis.

## K

### Key vault

Et sikkert lagringssted for hemmeligheter som passord og API-nøkler.

### KQL (Kusto Query Language)

Et spørrespråk som ligner litt på SQL. Du bruker det til å søke, filtrere og analysere data i Application Insights.

**Eksempel på KQL-spørring:**
```
requests
| where timestamp > ago(1h)
| where resultCode != 200
| summarize count() by resultCode
```
Denne spørringen viser alle forespørsler den siste timen som ikke var vellykket, gruppert etter responskode.

### Kubernetes-cluster

Et system som kjører og administrerer containerbaserte apper.

## L

### Local-test

Det lokale utviklingsmiljøet der du kan teste appen din på egen maskin før du publiserer den.

### Logger (logs)

Tekstmeldinger som programmet skriver ut mens det kjører, for å dokumentere hva som skjer. Nyttig for feilsøking og forståelse av appens oppførsel.

## M

### Målinger (metrics)

Tall og statistikk som automatisk samles inn mens appen kjører. De gir deg oversikt over hva som skjer i appen din.

**Eksempel:** I stedet for å måtte lese gjennom tusenvis av loggmeldinger, kan du se en enkel måling som viser at 150 instanser ble opprettet i dag, og at 5 av dem feilet.

## N

### .NET runtime-dashbord

Viser hvordan appen bruker systemressurser som minne, CPU og garbage collection.

## O

### OpenTelemetry (OTel)

En leverandøruavhengig standard for å samle inn og eksportere telemetri fra applikasjoner. Gjør det mulig å bruke ulike overvåkingsverktøy uten å måtte endre koden.

### orgNumber (organisasjonsnummer)

Organisasjonsnummeret til virksomheten som utfører handlingen i Altinn.

### Overvåking (monitorering)

Å motta telemetri fra instrumenteringen og gjøre den synlig, for eksempel gjennom grafer, tabeller eller dashbord.

**Eksempel:** I Azure Application Insights kan du se en graf som viser hvor mange brukere som har logget inn i løpet av den siste uken.

### Overordnet steg (parent span)

I distribuert sporing, det steget som kalte det nåværende steget. Brukes for å forstå sammenhengen mellom ulike deler av en forespørsel.

## P

### partyId

En unik ID for brukeren eller organisasjonen i Altinn.

### Pod

En kjørende instans av en app i Kubernetes.

### Prosess

Hele flyten fra start til slutt for en instans, inkludert alle stegene brukeren må gjennom.

### Pull

En metode for å hente telemetri hvor noe spør appen om informasjon (for eksempel en overvåkingstjeneste som jevnlig henter data).

### Push

En metode for å sende telemetri hvor appen aktivt sender meldinger til en mottaker.

## R

### Responskode

Et tall som serveren sender tilbake for å indikere om forespørselen var vellykket eller ikke. For eksempel betyr 200 "OK", mens 404 betyr "ikke funnet" og 500 betyr "serverfeil".

### Rollenavn (cloud role name)

Brukes for å skille mellom ulike apper i samme Azure-miljø. Dette gjør at du kan se data bare for din app, selv om det er mange apper i samme Application Insights-ressurs.

**Eksempel:** Rollenavnet for appen din er appnavnet ditt (dvs. repo-navnet i Altinn Studio).

## S

### Sampling

Se **Utvalgsmetode**.

### Span

Se **Steg**.

### Spor (trace)

En samling av steg (spans) som viser hele reisen til en forespørsel gjennom systemet, fra start til slutt.

**Eksempel:** Når en bruker sender inn et skjema, kan sporet vise alle kallene som ble gjort: fra frontend til backend, til databasen, til eksterne API-er, og tilbake igjen.

### Sporingsdata (traces)

Detaljert informasjon om hvordan en forespørsel flyter gjennom systemet. Viser hvilke tjenester som ble kalt, hvor lang tid hver del tok, og om det oppstod feil.

### Stack trace

En detaljert oversikt over hvilke funksjoner som ble kalt da feilen oppstod, som hjelper deg å finne ut nøyaktig hvor problemet ligger.

### Steg (span)

En enkelt operasjon i et spor (trace). Hvert steg representerer en aktivitet som tar tid, for eksempel et API-kall eller en databasespørring.

**Eksempel:** I et spor som viser behandlingen av et skjema, kan ett steg være "validere skjemadata" og et annet steg være "lagre til database".

## T

### Teller (counter)

En målingstype som bare øker. Brukes til å telle hendelser, for eksempel antall opprettede instanser.

**Eksempel:** Hvis 5 instanser opprettes, går telleren fra 0 til 5. Den går aldri ned.

### Telemetri

Informasjonen som samles inn fra instrumenteringen. Denne informasjonen kan hentes ut på to måter: Pull (noe spør appen om informasjon) eller Push (appen sender aktivt meldinger til en mottaker).

**Eksempel:** Appen din sender løpende informasjon om antall innlogginger per time til Azure Application Insights.

### Trace

Se **Spor**.

## U

### userId

En unik ID for personen som er logget inn i Altinn.

### Utvalgsmetode (sampling)

Å velge ut bare en del av telemetrien som skal samles inn. Dette kan redusere kostnader og datamengde.

**Eksempel:** I stedet for å lagre informasjon om hver eneste forespørsel, lagrer du kun hver tiende forespørsel, eller bare forespørsler som tar over 1 sekund.

## V

### Videreføring (propagation)

Måten sporingsdata sendes videre mellom ulike tjenester i et distribuert system, slik at hele kjeden av forespørsler kan spores.

**Forklaring:** W3C Trace-Context er en standard som gjør at ulike systemer kan dele sporingsdata og forstå sammenhengen mellom forespørsler som går på tvers av flere tjenester.

## W

### W3C Trace-Context

En standard som gjør at ulike systemer kan dele sporingsdata og forstå sammenhengen mellom forespørsler som går på tvers av flere tjenester.
