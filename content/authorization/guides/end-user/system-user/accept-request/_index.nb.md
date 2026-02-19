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

Dersom den som åpner godkjenningslinken ikke har nødvendige fullmakter til å kunne godkjenne opprettelse er det mulig å "videresende" denne til bruker med nødvidige fullmakter

Dette gjøres med ved å trykke "Ja, send videre" (bildet 1). Etter man har sendt forespørselen videre kan man avslutte (bilde 2) og/eller varsle tilgangsstyrer om at forespørselen er videresendt.
Forespøslen vil da dukke opp ved valg av menypunktet Systemtilganger i brukerflaten for tilgangsstyring i Altinn (bilde 3)

![Bilde 1:Eskalere forespørsel ved å trykke send videre kanpp](eskaler_1.png "Eskalere forespørsel ved å trykke send videre kanpp")

![Bilde 2: Avsklutter etter å ha sendt videre](eskaler_2.png "Avsklutter etter å ha sendt videre")

![Bilde 3: Tilgangsstyrer finner eskalert forespørsel og godkjener](eskaler_3.png "Tilgangsstyrer finner eskalert forespørsel og godkjener")
