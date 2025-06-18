---
title: 'Aktivitetslogg'
description: 'Lær om hvordan Dialogporten tilbyr en aktivitetslogg for hver dialog'
weight: 80
---

## Introduksjon

Aktivitetsloggen er en logg fylt ut av tjenesteeier med informasjon på høyt nivå om tidligere aktiviteter knyttet til en bestemt dialog.

## Bruk

Aktivitetsloggen er en uforanderlig liste over tidsstemplede oppføringer, hver av en bestemt type, som viser historikken til en bestemt dialogs levetid. De forskjellige typene definerer en bestemt aktivitet, som opprettelsen av dialogen, en melding som sendes fra tjenesteeier, data som sendes inn av parten, en signatur eller betaling som er gjort, en sending som er åpnet osv. For en uttømmende liste over de forskjellige aktivitetstypene, se den tekniske referansen.

Tjenesteeier er ansvarlig for å fylle ut aktivitetsloggen, og bør gjøre det i forhold til andre endringer som er gjort i dialogen. Aktivitetsloggoppføringer kan referere til en bestemt sending, f.eks. når den åpnes og/eller bekreftes lest.

{{<notice info>}}
Det å _legge til_ [sendinger]({{<relref "../dialogs#transmissions">}}) skal ikke ledsages av en aktivitetsloggoppføring, siden sendingslisten er uforanderlig og dermed fungerer som en logg i seg selv. Frontend bør aggregere aktivitetsloggen, sendingslisten og sett-loggen for å bygge en fullstendig kronologi over dialogens historie
{{</notice>}}

Aktivitetsloggen kan spørres via API, og kan brukes når du oppretter betingede [varslingsbestillinger]({{<ref "../../../notifications">}}), dvs. når du oppretter påminnelser.

**Les mer**
* [Teknisk referanse for aktivitetslogg-entiteten]({{<ref "../../reference/entities/activity">}})
* {{<link "../../user-guides/service-owners/creating-dialogs">}}
* [Produkt dokumentasjon for notifikasjoner]({{<ref "../../../notifications">}})

{{<children />}}