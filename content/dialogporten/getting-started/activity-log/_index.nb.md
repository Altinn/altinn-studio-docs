---
title: 'Aktivitetslogg'
description: 'Lær hvordan Dialogporten tilbyr en aktivitetslogg for hver dialog'
weight: 80
---

## Introduksjon

Aktivitetsloggen er en logg som tjenesteeieren fyller ut med informasjon om tidligere aktiviteter knyttet til en bestemt dialog.

## Bruk

Aktivitetsloggen er en uforanderlig liste over tidsstemplede oppføringer, hver av en bestemt type, som viser historikken gjennom en bestemt dialogs levetid. De forskjellige typene definerer bestemte aktiviteter, som opprettelsen av dialogen, en melding som sendes fra tjenesteeieren, data som sendes inn av parten, en signatur eller betaling som gjennomføres, eller en forsendelse som åpnes. For en uttømmende liste over de forskjellige aktivitetstypene, se den tekniske referansen.

Tjenesteeieren er ansvarlig for å fylle ut aktivitetsloggen, og bør gjøre det i forbindelse med andre endringer som gjøres i dialogen. Aktivitetsloggoppføringer kan referere til en bestemt forsendelse, f.eks. når den åpnes og/eller bekreftes lest.

{{<notice info>}}
Det å _legge til_ [forsendelser](/nb/dialogporten/getting-started/activity-log/../dialogs#forsendelser) skal ikke ledsages av en aktivitetsloggoppføring, siden forsendelseslisten er uforanderlig og dermed fungerer som en logg i seg selv. Frontend bør aggregere aktivitetsloggen, forsendelseslisten og sett-loggen for å bygge en fullstendig kronologi over dialogens historie.
{{</notice>}}

Aktivitetsloggen kan hentes via API, og kan brukes når du oppretter betingede [varslingsbestillinger]({{<ref "../../../notifications">}}), dvs. når du oppretter påminnelser.

**Les mer**
* [Teknisk referanse for aktivitetslogg-entiteten]({{<ref "../../reference/entities/activity">}})
* {{<link "../../user-guides/service-owners/creating-dialogs">}}
* [Produktdokumentasjon for notifikasjoner]({{<ref "../../../notifications">}})

{{<children />}}
