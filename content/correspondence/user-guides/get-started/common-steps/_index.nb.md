---
title: Felles steg for å komme i gang med Altinn Broker
linktitle: Felles steg
description: Hvordan komme i gang med Altinn 3 Broker, for både tjenesteeiere, avsendere og mottakere
tags: [Broker, guide]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
Dette avsnittet av dokumentasjonen er under arbeid.
Det er deler som mangler eller bare delvis er dokumentert.
Noen funksjoner representerer ikke den endelige produksjonsversjonen.
{{% /notice %}}

Dette er felles steg som alle roller (tjenesteeier, avsendere og mottakere) må gjennomføre for å begynne å bruke Altinn Broker-komponenten.

## 1. Skaff deg en Altinn API-nøkkel {#get-an-altinn-api-key}

For å bruke noen Altinn-API-er trenger du en abonnementsnøkkel for API-ene. Denne sendes som headeren `Ocp-Apim-Subscription-Key` i hvert forespørsel.

Hvis du ikke allerede har en API-nøkkel for Maskinporten-klient(er) du har tenkt å bruke mot Broker, kan du skaffe den ved å kontakte oss på [Altinn@Slack#produkt-formidling](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog).

## 2. Registrer Maskinporten-klienten din med riktige omfang {#register-your-maskinporten-client-with-correct-scopes}

Registrer Maskinporten-klienten(e) din for å autentisere mot Broker-API-en, tildel dem relevante omfang:

- `altinn:authorization:pdp` - Påkrevd for alle Broker-API-klienter for autorisasjonsadgang.
- `altinn:broker.write` - For klienter som sender filer.
- `altinn:broker.read` - For klienter som mottar filer.

Disse omfangene vedlikeholdes av Altinn og må være autorisert for de riktige API-operasjonene, og er derfor uavhengige av [tilgangen satt av tjenesteeiere](../service-owner#grant-access-to-senders-and-recipients-to-the-resource) for den spesifikke Broker-tjenesteressursen.

Bruk Samarbeidsportalen for selvbetjening for registrering. [Her er en detaljert guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#selvbetjening-som-api-konsument).

- [Testmiljøer](https://sjolvbetjening.test.samarbeid.digdir.no/)
- [Produksjonsmiljø](https://sjolvbetjening.samarbeid.digdir.no/)

## 3. Få tilgang til en bestemt ressurs {#get-access-to-specific-resource}

Kontakt tjenesteeieren for Broker-ressursen og be om tilgang til ressursen, og oppgi:

- Organisasjonsnummeret du vil representere
- Systembrukeren

{{% notice warning  %}}
Dette vil i fremtiden håndteres av Systembruker / Ressurssregister / Tilgangslister via GUI.
{{% /notice %}}

**Hvis du er en tjenesteeier som oppretter din første Broker-tjeneste; gå videre til [Tjenesteeier](../service-owner/) guiden.**

## 4. Integrer mot Broker-API-et {#integrate-against-broker-api}

Du er nå klar til å begynne å integrere mot Broker-API-ene, se [utviklerveiledningene](../../developer-guides/) for neste trinn.

## 5. Sett opp hendelsesabonnementer {#set-up-event-subscriptions}

For å bruke hendelser/webhooks for en Broker-ressurs, må du sette opp et abonnement for den gitte ressursen.

Se [utviklerveiledningen for events](../../developer-guides/events) for detaljerte instruksjoner.
