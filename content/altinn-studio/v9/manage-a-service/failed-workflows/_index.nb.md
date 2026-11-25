---
title: Starte en arbeidsflyt som har feilet, på nytt
linktitle: Arbeidsflyter som feiler
description: Slik finner du instanser der en arbeidsflyt har feilet, og starter arbeidsflyten på nytt i Altinn Studio.
toc: true
weight: 80
---

Har en arbeidsflyt i appen feilet, starter du den på nytt på siden **Publiserte apper** i Altinn Studio.

I v9 kjører appen hver overgang i prosessen som en arbeidsflyt i arbeidsflytmotoren, for eksempel når brukeren sender inn, eller når en systemoppgave lager en PDF. Feiler et steg, prøver plattformen som regel på nytt en stund. Når den gir opp, eller feilen er varig, blir arbeidsflyten stående som feilet til noen starter den på nytt.

## Når du trenger dette

Har en systemoppgave feilet, kan brukeren ofte prøve igjen selv. Se [Hva brukeren ser mens en systemoppgave kjører]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/visning" >}}). I disse tilfellene må noen hos tjenesteeieren starte arbeidsflyten på nytt:

- Brukeren har ikke tilgang til å prøve igjen, eller kommer ikke tilbake til instansen.
- Feilen er av en type brukeren ikke kan prøve på nytt. Da ser brukeren siden «Noe gikk galt» med referanser til brukerservice, uten knapper.
- Feilen kom etter at prosessen var avsluttet, for eksempel i `IOnProcessEndedHandler` eller da appen skulle [bekrefte mottak]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/process/confirm-on-process-end" >}}). Da ser verken brukeren eller et system som leser prosessen, feilen.
- En sideflyt har feilet. Sideflyter sender for eksempel hendelser uten at prosessen venter på dem. Prosessen går videre, så brukeren merker ingenting.

## Dette trenger du

Du må være med i teamet for miljøet i organisasjonen din i Altinn Studio, **Admin-TT02** eller **Admin-Production**. Eierne av organisasjonen legger til medlemmer. Se [hva teamene Admin-TT02 og Admin-Production gir tilgang til]({{< relref "/altinn-studio/v9/develop-a-service/reference/administration/access-management/studio" >}}#admin-tt02-og-admin-production).

## Finne instansene

Du finner siden under menypunktet **Publiserte apper** øverst i Altinn Studio, eller på
`https://altinn.studio/admin/{org}` (erstatt `{org}` med organisasjonskoden din).

1. Åpne appen i miljøet det gjelder.
2. Velg fanen **Instanser med problemer**. Den viser instansene der minst én arbeidsflyt har feilet.
3. Åpne instansen.

Fanen **Instanser med problemer** finnes bare for apper som bruker arbeidsflytmotoren, altså apper på v9. Med **Type feil** kan du vise bare hovedflyter eller bare sideflyter som har feilet.

## Starte arbeidsflyten på nytt

Rett først årsaken til feilen hvis den ligger i appen eller oppsettet, for eksempel en tilgang som mangler i `policy.xml`. Deretter gjør du slik:

1. Finn arbeidsflyten som har feilet, under **Arbeidsflyter** på siden for instansen.
2. Klikk på **Prøv på nytt**.
3. Klikk på **Prøv arbeidsflyten på nytt** for å bekrefte.

Arbeidsflytmotoren legger arbeidsflyten i kø igjen, og den fortsetter fra steget som feilet. Arbeidsflyter som stoppet fordi denne feilet, starter på nytt sammen med den.

Var den siste feilen varig, sier dialogen fra om det. Plattformen prøver ikke en varig feil på nytt av seg selv, så arbeidsflyten feiler igjen hvis du ikke har rettet årsaken.

Start arbeidsflyten på nytt så snart du har rettet feilen. Arbeidsflytmotoren sletter arbeidsflyter som har feilet, når oppbevaringstiden er ute, og etter det kan ingen starte dem på nytt.
