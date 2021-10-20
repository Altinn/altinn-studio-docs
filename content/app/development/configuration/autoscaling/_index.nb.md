---
title: Autoskalering
description: Konfigurering av automatisk skalering av app basert på observert CPU benyttelse.
toc: true
weight: 600
---

Fra versjon [2.0.0](/community/changelog/deployment/v2) av deployment helm-charten er autoskalering tilgjengelig og aktivert som standard.

Autoskalering benytter [Horizontal Pod Autoscaler)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) 
for å automatisk skalere opp og ned en app basert på CPU forbruk.

Når man skal konfigurere hvordan autoskaleringen oppfører seg må man ta hensyn til to seksjoner i _deployment/values.yaml_.
1. _resources_ ressursene som din applikasjon får tildelt i clusteret.
2. _autoscaling_ konfigurerer når din applikasjon skal skaleres opp eller ned.

Vi setter noen standard verdier basert på tester vi har utført og erfaringer vi har gjort oss, disse kan endre seg etterhvert som vi får mer erfaringer over tid.

## Resources konfigurasjon
For å sette gode requests og eventuelt limits er kjennskap til appen viktig da koden og oppgavene applikasjonen utfører har stor innvirkning på dette.
Vi forsøker å sette kode standard verdier som fungerer for så mange av alle appene i Altinn som mulig, men det er ikke sikkert de passer for din app.

Standard verdier hvis de ikke blir overskrevet i _deployment/values.yaml_
```yaml
deplyoment:
  resources:
    requests:
      cpu: 300m
      memory: 256Mi
```

Verdier som er mulige å konfigurere (verdiene under er kun som et eksempel og på ingen måte en fasit)
```yaml
deplyoment:
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 1000m
      memory: 512Mi
``` 

#### deployment.resources.requests
Denne seksjonen i values.yaml definerer ressursene som din app vil få reservert av kubelet i clusteret.

Requests er brukt av kubernetes sin skedulerer for å finne noden den skal plassere appen sine pods på. Dette vil begrense hvor mange pods en node kan kjøre før den er full.

Requests er også brukt av Horizontal Pod autoscaler for å avgjøre om det skal skalere opp eller ned antall replikaer av appen.

Gitt et cluster med noder som har 2 cores (2000 millicores) og 4Gi minne hvor alle pods har requests satt til 200m (200 millicores) og 256Mi.

Antall pods en node kan kjøre basert på CPU request er: _2000 / 200 = 10_

Antall pods en node kan kjøre basert på minne request er: _4096Mi / 256Mi = 16_

Antall pods en node kan kjøre, med eller uten last i løsningen er da: 10.

Requests begrenser ikke hvor mye CPU eller minne en applikasjon kan bruke dersom mer er tilgjengelig, men blir det lite ressurser og en pod bruker mer enn requests kan denne blir "kastet ut" av noden.

#### deployment.resources.limits
Denne seksjonen i values.yaml definerer hvor mye en pod kan maksimalt bruke.

Hvis en pod forsøker å benytte mer CPU en det som er satt som limit vil denne bli strupet.

Hvis en pod forsøker å allokere mer minne en det som er satt som limit vil den bli terminert med en Out Of Memory (OOM) error.

## Autoscaling konfigurasjon
Autoscaling seksjonen konfigurerer når en applikasjon automatisk skal skaleres. Dette er håndtert av Horizontal Pod Autoscaler i kubernetes.

For å lese mer og Horizontal Pod Autoscaler kan du lese kubernetes sin dokumentasjon [her](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

Standard verdier hvis ikke overstyrt i _deployment/values.yaml_
```yaml {linenos=table}
deployment:
  autoscaling:
    enabled: true
    replicas:
      min: 2
      max: 10
    avgCpuUtilization: 70
    behavior:
      stabilizationWindowSeconds:
        scaleUp: 0
        scaleDown: 120
```

#### deployment.autoscaling.replicas
__min__: Det laveste antall pods autoskaleringen har lov til å sette.
__max__: Det høyeste antall pods autoskalering har lov til å sette.

#### deployment.autoscaling.avgCpuUtilization
Terskelen for prosent av cpu request som er utnyttet før opp eller ned skalering skal skje.

Oppskaleringen er ikke umiddelbar siden en ny pod trenger tid på å starte (1-2 min i de fleste tilfeller).
Hvis alle ressursene i et cluster er reservert må en ny node startes opp i azure (5-10 min i de fleste tilfeller).
Det er derfor lurt å ha en liten buffer sånn at applikasjonen kan håndtere lasten frem til kapasiteten er utvidet.

#### deployment.autoscaling.behavior.stabilizationWindowSeconds
Stabiliserings vindu er benyttet for å begrense blafring av replikaer når metrikkene som er brukt for skalering svinger.

Som standard vil en oppskalering skje så fort forbruket er over terskelverdiene. Nedskalering vil vente i to minutter.

__scaleUp__: Antall sekunder kubernetes skal vente etter siste skalering før den gjør en ny evaluering om oppskalering.
__scaleDown__: Antall sekunder kubernetes skal vente etter siste skalering før den gjør en ny evaluering om nedskalering.
