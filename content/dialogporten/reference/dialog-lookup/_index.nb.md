---
title: 'Referanseoppslag'
description: 'Referanseinformasjon om endepunktene for dialogoppslag'
weight: 12
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Introduksjon

Regeranseoppslag løser opp dialogmetadata fra en støttet `instanceRef` og lar klienter oversette mellom en dialog-ID og den kanoniske identifikatoren dialogen representerer.

Noen dialoger representerer en underliggende Altinn app-instans eller en enkelt Altinn Melding. For disse dialogene er den kanoniske identifikatoren den underliggende app-instansreferansen eller meldingsreferansen. For dialoger uten en slik underliggende entitet er dialog-ID-en selv den kanoniske identifikatoren.

Den nåværende implementasjonen støtter:

- `urn:altinn:instance-id:{partyId}/{uuid}`
- `urn:altinn:correspondence-id:{uuid}`
- `urn:altinn:dialog-id:{uuid}`

Hvis oppslaget starter med en dialog-ID, kan svaret returnere en annen `instanceRef`. Den returnerte verdien er den kanoniske identifikatoren Dialogporten knytter til dialogen. Den nåværende implementasjonen foretrekker:

1. app-instansreferanse
2. meldingsreferanse
3. dialogreferanse

Et viktig bruksområde er instansdelegering. I denne sammenhengen betyr instansdelegering delegering til én bestemt app-instans, melding eller dialog. Autorisasjonssystemet bruker den kanoniske identifikatoren for den entiteten, mens Dialogporten holder rede på koblingen mellom en dialog og den underliggende entiteten den representerer.

## Endepunkt for sluttbruker

Endepunkt:

- `GET /api/v1/enduser/dialoglookup`

Endepunktet for sluttbruker:

- ekskluderer slettede dialoger
- returnerer `authorizationEvidence`
- returnerer `title`, som kan løses til dialogens ikke-sensitive tittel når gjeldende autentiseringsnivå er lavere enn minimum autentiseringsnivå for tjenesteressursen

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialoglookup">}}

### Svaradferd for sluttbruker

{{<swaggerdisplayentity "V1CommonIdentifierLookup_EndUserIdentifierLookup">}}

## Endepunkt for tjenesteeier

Endepunktet for tjenesteeier:

- inkluderer slettede dialoger
- returnerer ikke `authorizationEvidence`
- returnerer `nonSensitiveTitle` separat når den finnes
- krever at den løste dialogen tilhører den autentiserte tjenesteeieren, med mindre kalleren har administratorrettigheter for tjenesteeier

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialoglookup">}}

### Svaradferd for tjenesteeier

Svarmodellen for tjenesteeier inneholder de samme grunnleggende oppslagsfeltene som sluttbrukersvaret, med disse forskjellene:

- `title` returneres alltid som den vanlige tittelen
- `nonSensitiveTitle` returneres separat når den finnes
- ingen autorisasjonsbevis er inkludert

{{<swaggerdisplayentity "V1CommonIdentifierLookup_ServiceOwnerIdentifierLookup">}}

## Lokaliserte felt

Begge REST-endepunktene aksepterer `Accept-Language`.

Når denne headeren er oppgitt, beskjærer Dialogporten lokaliserte felt i svaret til de foretrukne språkene. Dette gjelder:

- `title`
- `serviceResource.name`
- `serviceOwner.name`
- `nonSensitiveTitle` i tjenesteeiersvaret

## Merknader om responsfelter

- `serviceResource.id` returneres som ressursidentifikatoren, uten prefikset `urn:altinn:resource:`
- `serviceOwner.code` er tjenesteeierens kortkode
- `party` returneres som dialogens parti-URN

**Les mer**

- {{<link "../../user-guides/looking-up-dialogs">}}
- {{<link "../graphql">}}
