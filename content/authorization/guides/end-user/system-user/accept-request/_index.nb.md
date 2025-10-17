---
title: Godkjenne systembruker
description:
linktitle: Godkjenne
weight: 1
---

## Godkjenning

Her godkjenner en sluttbruker en forespørsel om å opprette en Systembruker. I dette eksemplet mottar DRESs MINST en forespørsel om agentsystembruker og må godkjenne den i Altinn-portalen. Der oppretter DRESs MINST en systembruker, legger til sine kunder til systembrukeren, og gir dermed SmartCloud de nødvendige tilgangspakkene.

<img width="2177" height="1277" alt="image" src="https://docs.altinn.studio/nb/authorization/guides/end-user/system-user/systemtilgang-approve-1.png" />



Etter at forespørselen er behandlet, kan eventuelt sluttbrukeren bli sendt til leverandørens kvitteringsside, dersom de har satt opp en verifisert redirect i forespørselen. Hvis ikke, blir de stående på Altinn sin utloggede side.


<img width="2177" height="1277" alt="image" src="https://docs.altinn.studio/nb/authorization/guides/end-user/system-user/systemtilgang-receipt-vendor.png" />

Etter godkjenningen kan leverandøren bruke vanlig Systembruker. Dersom godkjenningen var for en Systembruker for klientforhold, samarbeidsforhold etc. Så må sluttbruker logge inn i Altinn for å delegere klienter eller samarbeidspartnere til Systembrukeren.
