---
title: Betaling
description: Det er mulig å konfigurere brukerbetaling for tjenester som er gebyrbelagte eller der det er tillatt å kreve betaling.
weight: 10
---

Betaling er et prosessteg som kan legges til applikasjonen. 
Ved inngang til betalingssteget omdirigeres brukeren til en ekstern betalingsleverandør, og returneres til tjenesten når betalingen er fullført.

Ordregrunnlag og detaljer om betalingen lagres i et dataelement som JSON (paymentInformation.json), og kan lastes ned via API etter insending av skjemaet.
Tjenesteleverandør må selv håndtere oppbevaring av betalingsinformasjon i henhold til bokføringsloven.

<object data="payment.drawio.svg" type="image/svg+xml" style="width: 100%;"></object>

## Nets Easy

Støtte for å bruke Nets Easy som betalingsleverandør følger med applikasjonen. Guide for oppsett av Nets Easy finner du [her](/nb/altinn-studio/guides/payment/).

Organisasjonen du lager appen for må ha en NETS Easy avtale.
Du finner informasjon om hvordan du oppretter avtalen her: [payments.nets.eu](https://payments.nets.eu/nb-NO/checkout).

## Flere betalingsleverandører

Man kan legge til flere betalingsleverandører ved hjelp av skreddersøm backend-kode. 
Flere betalingsleverandører kan benyttes side om side i samme tjeneste.
Ta kontakt dersom dette er aktuelt.