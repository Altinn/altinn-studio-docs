---
title: Godkjenne systemtilgang
description: Denne veiledningen viser deg hvordan du som sluttbruker kan godkjenne en systemtilgang du har fått fra en fagsystem-leverandør.
linktitle: Godkjenne
weight: 1
---

## Godkjenne systemtilgang for eget system

{{% notice warning%}} For å godkjenne en systemtilgang-forespørsel må innlogget bruker ha rollen Tilgangsstyrer i valgt organisasjon (f.eks har Daglig leder rollen Tilgangsstyrer), samt ha de forespurte fullmaktene.
{{% /notice %}}

1. Her godkjenner en sluttbruker en forespørsel om å opprette en Systemtilgang for eget system. I dette eksemplet mottar DRESS MINST, daglig leder i DISKRET NÆR TIGER AS, en forespørsel om systemtilgang for eget system fra leverandøren SmartCloud. Denne forespørselen må godkjennes i Altinn-portalen. ![Godkjenningsbilde egen systemtilgang](https://docs.altinn.studio/nb/authorization/guides/end-user/system-user/standard-request.png)
2. Etter at forespørselen er godkjent eller avvist, vil sluttbrukeren bli logget ut. Hvis leverandøren har satt opp en verifisert videresending i forespørselen, vil brukeren sendes til leverandørens kvitteringsside. Hvis ikke, blir sluttbrukeren sendt til Altinn sin utloggede side. ![Kvitteringsside egen systemtilgang](https://docs.altinn.studio/nb/authorization/guides/end-user/system-user/systemtilgang-receipt-vendor.png)
3. Etter godkjenning er systemtilgangen opprettet.

## Godkjenne systemtilgang for klienter

1. Her godkjenner en sluttbruker en forespørsel om å opprette en Systemtilgang for klienter. For å godkjenne en systemtilgang-forespørsel må innlogget bruker ha rollen Tilgangsstyrer i valgt organisasjon (f.eks har Daglig leder rollen Tilgangsstyrer), samt ha de forespurte fullmaktene. I dette eksemplet mottar DRESS MINST, daglig leder i DISKRET NÆR TIGER AS, en forespørsel om systemtilgang for klienter fra leverandøren SmartCloud. Denne forespørselen må godkjennes i Altinn-portalen. ![Godkjenningsbilde systemtilgang for klienter](https://docs.altinn.studio/nb/authorization/guides/end-user/system-user/agent-request.png)
2. Etter at forespørselen er godkjent eller avvist, vil sluttbrukeren bli logget ut. Hvis leverandøren har satt opp en verifisert videresending i forespørselen, vil brukeren sendes til leverandørens kvitteringsside. Hvis ikke, blir sluttbrukeren sendt til Altinn sin utloggede side. ![Kvitteringsside systemtilgang for klienter](https://docs.altinn.studio/nb/authorization/guides/end-user/system-user/systemtilgang-receipt-vendor.png)
3. Etter godkjenning er systemtilgangen opprettet. Nå kan [klienter legges til systemtilgangen](/nb/authorization/guides/end-user/system-user/delegate-clients/).

## Eskalere forespørsel

Hvis brukeren som åpner godkjenningslenken ikke har de nødvendige fullmaktene til å godkjenne opprettelsen, kan vedkommende videresende forespørselen til en bruker med nødvendige fullmakter.

1. Trykk **Ja, send videre** for å videresende forespørselen til en bruker med nødvendige fullmakter. ![Eskalere forespørsel ved å trykke på send videre-knappen](eskaler_1.png "Eskalere forespørsel ved å trykke på send videre-knappen")
2. Etter at forespørselen er videresendt, kan du avslutte og eventuelt varsle tilgangsstyreren om at forespørselen er videresendt. ![Avslutte etter å ha sendt forespørselen videre](eskaler_2.png "Avslutte etter å ha sendt forespørselen videre")
3. Tilgangsstyreren finner den eskalerte forespørselen under **Systemtilganger** i brukerflaten for tilgangsstyring i Altinn. ![Tilgangsstyrer finner eskalert forespørsel og godkjenner](eskaler_3.png "Tilgangsstyrer finner eskalert forespørsel og godkjenner")
