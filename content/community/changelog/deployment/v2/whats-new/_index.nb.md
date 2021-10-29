---
title: Hva er nytt
description: Oversikt over endringer som ble introdusert i v2 av deployment.
toc: true
---

## 2.0.0

{{%notice warning%}}
Oppgradering til 2.0.0 fra 1.x.x vil føre til en kort nedetid ved første deploy. Påfølgende deployments vil gå som normalt
{{% /notice%}}

Hvis din apps _deployment_ mappe fortsatt har undermappen _templates_ vennligst følg [migrerings guiden](../../migration)

### Changes introduced

* Deployment objektet får nytt navn <gammelt-navn>-v2 dette på grunn av nødvendig endring på selector som ikke kan endre på et objekt. ***ADVARSEL*** fører til nedetid ved førstegangs deploy
* Alle applikasjoner får satt resource requests
* Horizontal pod autoscaler er påskrudd som default (automatisk skalering av applikasjon)
* Labels and selectors oppdaterte for de fleste kubernetes objekter
* Standard initial skalering er endret fra 1 til 2

### Nye valgfrie felter med standard verdier tilgjengelig for overstyring i values.yaml
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
  resources:
    requests:
      cpu: 300m
      memory: 256Mi
```

Gjennomgang

__3.__ Aktiver eller deaktiver autoskalering for denne applikasjonen.

__5.__ Nedre grense for antall pods som kan settes av autoskaleringen.

__6.__ Øvre grense for antall pods som kan settes av autoskaleringen.

__7.__ Grensen for gjennomsnittlig CPU utnyttelse (målt i prosent av request CPU) over alle pods for når skalering skal inntreffe.

__9.__ Stabiliseringsvinduet brukes for å begrense unødvendige endringer i antall replikaer av applikasjonen.

__10.__ Antall sekunder gjennomsnittlig CPU forbruk over alle pods er over terskelverdi (cpuAvgCpuUtilization) før oppskalering starter.

__11.__ Antall sekunder gjennomsnittlig CPU forbruk over alle pods er under terskelverdi (cpuAvgCpuUtilization) før nedskalering starter.

__14.__ CPU millicores reservert av kubelet for hver pod/replica av denne applikasjonen. Benyttet av HPA for å kalkulere skalering. Pods kan bruke mer CPU enn dette hvis det er tilgjengelig.

__15.__ Minne reservert av kubelet for hver pod/replica av denne applikasjonen. Pods kan bruke mer minne enn dette hvis det er tilgjengelig.


### Nye valgfrie felter uten standard verdier tilgjengelig for overstyring i values.yaml
```yaml {linenos=table}
deployment:
  resources:
    limits:
      cpu: 1000m
      memoty: 512Mi
```

Lines walkthrough

__4.__ Øvre grense for CPU millicores en pod kan benytte. Forsøk på bruk utover dette vil føre til CPU throttling.

__5.__ Øvre grense for minne en pod kan benytte. Pods som forsøker å allokere mer minne en dette vil termineres med en "Out of memory (OOM)" error.

### Pull requests merged

* [Horizontal Pod Autoscaler (PR #3)](https://github.com/Altinn/altinn-studio-charts/pull/3)
