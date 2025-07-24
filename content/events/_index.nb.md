---
title: Events
description: Beskrivelse av Events-funksjonaliteten i Altinn 3.
toc: true
weight: 20
aliases:
 - /altinn-events/
---

## Designmål

Altinn Events ble utviklet for å gjøre det enklere for tjenesteutviklere å levere dynamiske og 
sømløse brukeropplevelser, basert på data fra flere systemer. 

Altinn Events gir utviklere en enkel måte å legge til hendelsesorientert arkitektur i eksisterende 
tjenesteorienterte applikasjoner. Sikker og skalerbar, Altinn Events bruker Publiser/Abonner-konsepter for å 
løsere koble sammen ulike systemer uten å være avhengig av kontinuerlig spørring eller databasereplikering.


## Hovedfordeler

Grunner til å vurdere bruk av Altinn Events

_For hendelsesutgivere_
1. Enkelt HTTP-grensesnitt å publisere hendelser til, når de oppstår. 
2. Sikkerhet, skalerbarhet, pålitelighet og revisjon innebygd.
3. Altinns autorisasjonstjenester tilgjengelige for å administrere tilgang til hendelser for abonnenter.

_For hendelsesabonnenter_
1. Ingen behov for kontinuerlig spørring etter oppdateringer.
2. Enkelt API for å opprette og administrere hendelsesabonnementer, inkludert støtte for attributtbasert filtrering.
3. Pålitelig levering med automatisk logikk for gjentatte leveringsforsøk betyr at hendelser vil bli bufret for deg i tilfelle webhook-en din er utilgjengelig i en periode.
4. Innebygd autorisasjonsregelutførelse sikrer at appen din ikke mottar irrelevante varslinger. 


{{% notice info %}}

#### _Pub/Sub vs Hendelsesstrømming_

Det er to hovedmodeller for hendelsesorientert arkitektur: 
[Pub/Sub og Hendelsesstrømming](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)

Altinn Events er basert på Pub/Sub-modellen som har enklere leveringsbegrensninger enn hendelsesstrømming. 
Spesielt garanterer ikke Altinn Events levering i riktig rekkefølge, eller nøyaktig én gang levering.

Følgelig bør utviklere gjøre alt de kan for å behandle hendelser idempotent og 
forutse muligheten for leveranse av meldinger i feil rekkefølge. 
 
{{% / %}}

## Begrensninger
{{% notice warning %}}

Noen ganger kan Altinn Apps som bruker opt-in hendelser-funksjonen ikke produsere hendelser som forventet.
Det finnes avbøtende tiltak på plass, og hendelser som påvirkes av dette problemet kan oppleve en forsinkelse på flere timer.
Se ovenfor om pub/sub om leveranser i feil rekkefølge. Det arbeides med å løse dette/redusere forsinkelsen.

{{% / %}}

#### Hendelser er ikke garantert å bli levert.

Push-hendelser har en fast plan for leveringsforsøk og backoff-timinger, før de går inn i en "dead letter"-tilstand (se [leveringsplan med gjentakelser](subscribe-to-events/#leveringsplan-med-gjentakelser)).

Hendelser utløper etter 90 dager uavhengig av leveringsstatus (se [publiser hendelser](publish-events/)).



## Terminologi
#### Hva er en hendelse?

En hendelse er en lett varslingsmelding som inneholder informasjon om en enkelt operasjon 
eller tilstandsendring for en spesifisert enhet. Hver hendelse publiseres av en enkelt opprinnelse, referert til
som *hendelsesutgiveren* eller *kilden*, på vegne av en enkelt person, organisasjon eller ressurs, kjent som *subjektet*. 
Operasjonen eller tilstandsendringen refereres til som *hendelsestypen*.

Teknisk sett er hendelser JSON-dokumenter som følger 
[Cloud Event v1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) spesifikasjonen.
Denne spesifikasjonen definerer et standard sett med egenskapsnavn, aksepterte verdiformat og 
en mekanisme for å innkapsle ytterligere meldingsinnhold, som XML eller binærkodede data.

Her er et eksempel på en typisk hendelse:

```json
{
    "id":"eae8d8a7-4659-43c0-83cd-42f673eff8cf",
    "source":"https://someservice.com/rest/path/object-id-1234",
    "specversion":"1.0",
    "type":"app.instance.created",
    "subject":"/party/50019855",
    "time": "2022-05-12T00:02:07.541482Z"
}
```

Her er et eksempel på en hendelse publisert gjennom Altinn: 

```json
{
    "id":"eae8d8a7-4659-43c0-83cd-42f673eff8cf",
    "source":"https://someservice.com/rest/path/object-id-1234",
    "specversion":"1.0",
    "type":"app.instance.created",
    "resource":"urn:altinn:resource:someservice.resource",
    "resourceinstance":"object-id-1234",
    "subject":"/party/50019855",
    "time": "2022-05-12T00:02:07.541482Z"
}
```
Merk de nye egenskapene _resource_ og _resourceinstance_.


I tillegg til å følge spesifikasjonen, må cloud events publisert gjennom Altinn Events inkludere
et sett med Altinn-spesifikke utvidelsesattributter som brukes til å muliggjøre autorisasjon av hendelser 
og støtte enklere filtrering av hendelser for abonnenter. 


#### Hva er et abonnement?

Altinn Events lar deg registrere en tilpasset webhook for å motta hendelser. 
Du kan definere ulike filtre, inkludert etter kilde, type og ressurs.

> Av sikkerhetsgrunner må webhook-endepunktet støtte HTTPS. 

Før aktivering av hendelsesviderekobling for et nytt abonnement, sender Altinn Events en tilpasset hendelse til den oppgitte webhook-URL-en for å sikre at den eksisterer. 

For mer informasjon, se denne [utviklerguiden](./subscribe-to-events/developer-guides/setup-subscription/)

## En merknad om standarder

#### Hvorfor Cloud Events?

Ved å basere vårt API på Cloud Event-standarden sikrer vi konsistent støtte på tvers av [programmeringsspråk](https://github.com/cloudevents/spec#sdks), operativsystemer og nettverksstakker. 
Denne samme standarden har blitt adoptert av mange skyleverandører og et økende antall uavhengige løsningsleverandører. 

Den offisielle spesifikasjonen definerer en skalerbar tilnærming til versjonering og utvidelser, og åpner muligheter for fremtidige evner på en bakoverkompatibel måte.

## Hvem kan bruke Altinn Events?

Publisering av _app_-hendelser er begrenset til Altinn-apper opprettet og distribuert med altinn.studio. Generiske, eller ikke-app hendelser kan publiseres av et applikasjonseier-system. Det hendelsesproduserende systemet må være registrert som en ressurs i ressursregisteret.

Abonnement på hendelser er åpent tilgjengelig for sluttbrukere, sluttbrukersystemer og applikasjonseiere. 
Når flere parter får tilgang til publisering, vil retten til å abonnere på hendelser publisert gjennom Altinn
være generelt tilgjengelig for offentligheten.*

Abonnementer må autoriseres av utgiveren, og Altinns vilkår og betingelser må være 
signert før tilgang gis. 

{{<children />}}