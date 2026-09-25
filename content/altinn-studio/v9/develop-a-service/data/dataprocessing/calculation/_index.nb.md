---
draft: true
title: Regne ut verdier med uttrykk
linktitle: Kalkulering med uttrykk
description: Slik regner du ut verdier i datamodellen automatisk med dynamiske uttrykk
toc: true
tags: [needsReview]
---

Med kalkulering med uttrykk regner appen ut verdien til et felt i datamodellen ut fra andre felt, for eksempel en sum eller en differanse. Du skriver reglene i en JSON-fil ved siden av datamodellen, og du trenger ikke å skrive C#-kode.

## Slik regner appen ut verdiene

- Appen regner ut verdiene på serveren hver gang brukeren lagrer, også mens hen fyller ut skjemaet. Brukeren ser de nye verdiene like etter at appen har lagret endringen.
- Appen regner ut alle skjemadataene i steget brukeren står i, ikke bare dataene brukeren endret.
- Appen regner også ut felt som er skjult, eller som ligger på en skjult side.
- Appen regner ikke ut verdiene når brukeren åpner skjemaet. Verdiene er derfor ikke oppdatert før brukeren har lagret første gang.
- Legger brukeren til en ny oppføring i et underskjema, regner appen ut verdiene i oppføringen første gang brukeren lagrer endringer i den.
- Stateless-apper lagrer ingen data og regner derfor ikke ut verdier med uttrykk.

Har appen også egne dataprosessorer i C#, regner appen ut uttrykkene etter at prosessorene har kjørt. Se [Slik kjører appen flere prosessorer]({{< relref "/altinn-studio/v9/develop-a-service/data/dataprocessing" >}}#slik-kjører-appen-flere-prosessorer).

## Sette opp kalkulering med uttrykk

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="Manuelt oppsett">}}
{{% insert "content/altinn-studio/v9/develop-a-service/data/dataprocessing/calculation/backend-manual/content.nb.md" %}}
{{</content-version-container>}}

{{<content-version-container version-label="Altinn Studio Designer">}}
{{% insert "content/altinn-studio/v9/develop-a-service/data/dataprocessing/calculation/studio/content.nb.md" %}}
{{</content-version-container>}}

{{</content-version-selector>}}
