---
title: Publisering
description: Konfigurering av innstillinger for publisering og kjøretid
toc: true
weight: 600
---

#### Helm Chart

Altinn-applikasjoner publiseres til et Kubernetes-cluster og benytter seg av et såkalt 'deployment Helm chart'.
 Et Helm chart inneholder nødvendige ressurser for å kunne publisere en app, inkludert YAML konfigurasjonsfiler.

Basert på tester og erfaringer har vi satt noen standard verdier i et sentralt [Helm chart](https://github.com/Altinn/altinn-studio-charts/blob/main/charts/deployment/values.yaml) som utgangspunkt for publisering av Altinn-applikasjoner.
Disse verdiene kan endre seg etter hvert som vi får mer erfaring.

{{% notice info %}}
Fra versjon [2.0.0](/community/changelog/deployment/v2) av 'deployment Helm chart' er autoskalering tilgjengelig og aktivert som standard.
{{% /notice %}}

#### Egendefinerte verdier

Egne innstillinger konfigureres i filen `App/deployment/valus.yaml` ved å legge til ønsket egenskap under seksjonen `deployment`.
 Disse innstillingene vil overskrive tilsvarende innstillinger i Helm chart (for unntak, se [her](#innstillinger-som-blir-overskrevet-ved-publisering)).
 Se [Initiell skalering](#initiell-skalering) for et eksempel.

{{% notice warning %}}
Merk at formatet i `values.yaml` i det sentrale Helm chart skiller seg litt fra formatet i `values.yaml` i applikasjonen;
 i Helm chart ligger egenskapene på toppnivå, mens de i appen må legges under seksjonen `deployment`.
{{% /notice %}}

## Skalering

### Initiell skalering

Initiell skalering er definert av `replicaCount`. Merk at hvis autoskalering er aktivert vil denne overstyre `replicaCount`.

Standard innstilling i Helm chart:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
replicaCount: 2

...
```

For å overskrive verdien for din app legger du til `replicaCount` under `deployment` i `App/deployment/values.yaml`:

{{% code-title %}}
App/deployment/values.yaml
{{% /code-title %}}

```yaml{linenos=false,hl_lines="3"}
deployment:

  replicaCount: 3

...
```

### Autoskalering

Når man skal konfigurere hvordan autoskaleringen oppfører seg må man ta hensyn til følgende seksjoner:
1. `resources`: garantier og grenser for CPU og minnne for app pods under kjøring. Se [Konfigurasjon av ressurser](#konfigurasjon-av-ressurser).
2. `autoscaling`: innstilling for når applikasjonen skal skaleres opp eller ned.

Autoskalering benytter [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) 
for å automatisk skalere opp og ned en app basert på CPU-forbruk.

Seksjonen `autoscaling` konfigurerer når en applikasjon automatisk skal skaleres.

Standard innstillinger i Helm chart:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
...

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

...
```

#### `autoscaling.replicas`
  - `min`: Det laveste antall pods autoskaleringen har lov til å sette.
  - `max`: Det høyeste antall pods autoskalering har lov til å sette.

#### `autoscaling.avgCpuUtilization`

`avgCpuUtilization` setter terskelen for prosent av cpu request som er utnyttet før opp- eller nedskalering skal skje.

Oppskaleringen er ikke umiddelbar siden en ny pod trenger tid på å starte (1-2 min i de fleste tilfeller).
Hvis alle ressursene i et cluster er reservert må en ny node startes opp i azure (5-10 min i de fleste tilfeller).
Det er derfor lurt å ha en liten buffer sånn at applikasjonen kan håndtere lasten frem til kapasiteten er utvidet.

#### `autoscaling.behavior.stabilizationWindowSeconds`
Stabiliseringsvinduet brukes for å begrense flimringen av kopier når verdiene som brukes for skalering varierer.


- `scaleUp`: Antall sekunder kubernetes skal vente etter siste skalering før den gjør en ny evaluering om oppskalering.
- `scaleDown`: Antall sekunder kubernetes skal vente etter siste skalering før den gjør en ny evaluering om nedskalering.

Som standard vil en oppskalering skje så fort forbruket er over terskelverdiene. Nedskalering vil vente i to minutter.

## Konfigurasjon av ressurser

Hvilke innstillinger som er ideelle for ressurser (`resources`)  er avhengig av applikasjonens kode og oppgavene den utfører.
Vi har forsøkt å sette standard verdier som skal fungere for så mange av appene i Altinn som mulig, men det er ikke sikkert de passer for din app.

Standard verdier i Helm chart:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
...

resources:
  requests:
    cpu: 300m
    memory: 256Mi

...
```

Verdier som er mulige å konfigurere (verdiene under er kun som et eksempel og på ingen måte en fasit):

{{% code-title %}}
App/deployment/values.yaml
{{% /code-title %}}

```yaml
deplyoment:

  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 1000m
      memory: 512Mi

...
``` 

#### `deployment.resources.requests`

`requests` fastsetter ressursene som vil bli reservert for hver pod i appen og brukes når Kubernetes-planleggeren bestemmer hvilken node poden skal kjøre på.
 Basert på disse innstillingene beregnes maksimalt antall pods som kan kjøre på en node.
  Maks antall begrenses av den innstillingen som tillater færrest antall pods.

{{% expandsmall id="eksempel1" header="Eksempel" %}}

Gitt et cluster med noder som hver har 2 cores (2000 millicores) og 4Gi minne og hvor alle pods har requests satt til 200m (200 millicores) og 256Mi:
- Basert på CPU-request er antall pods som kan kjøre på hver node: _2000 / 200 = 10_
- Basert på minne-request er antall pods som kan kjøre på hver node: _4096Mi / 256Mi = 16_
  
*Maksimalt antall pods som kan kjøre på hver node, med eller uten last i løsningen, er da 10.*
{{% /expandsmall %}}

`requests` brukes også av Horizontal Pod Autoscaler for å avgjøre om appen skal skaleres opp eller ned.

`requests` begrenser ikke hvor mye CPU eller minne en applikasjon kan bruke dersom mer er tilgjengelig.
 En pod kan imidlertid blir "kastet ut" av noden dersom det er lite tilgjengelige ressurser og poden bruker mer enn angitt i `requests`.

#### `deployment.resources.limits`

`limits` definerer hvor mye ressurser en pod kan maksimalt bruke.

Hvis en pod forsøker å benytte mer CPU en det som er satt som limit vil denne bli strupet.

Hvis en pod forsøker å allokere mer minne en det som er satt som limit vil den bli terminert med en Out Of Memory (OOM) error.

## Linkerd
Alle applikasjoner som publiseres er som standard innlemmet i [Linkerd](https://linkerd.io/) sitt service mesh:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
...

linkerd:
  enabled: true

...
```

{{% notice warning %}}
Vi anbefaler på det sterkeste å ikke endre denne innstillingen da den legger til mutual TLS som krypterer all intern kommunikasjon mellom tjenester i clusteret før det forlater en maskin.
{{% /notice %}}

## Koble til volumer

`volumes` og `volumeMounts` definerer volumer koblet til applikasjonens filsystem.
 `volumes` beskriver innholdet i den tilkoblede ressursen og `volumeMounts` definerer hvor i applikasjonens filsystem innholdet skal kobles til. 

Det er to forhåndsdefinerte tilkoblede ressurser og tilkoblingspunkter i Helm chart som er nødvendig for standard funksjonalitet, blant annet for å kommunisere med Altinn Plattform:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
...

volumeMounts:
  - name: datakeys
    mountPath: /mnt/keys
  - name: accesstoken
    mountPath: "/accesstoken"

volumes:
  - name : datakeys
    persistentVolumeClaim:
      claimName: keys
  - name: accesstoken
    secret:
      secretName: accesstoken

...
```

Egendefinerte volumer kan legges til under `development` i `App/deployment/values.yaml`.

På gjeldende tidspunkt er det kun ett bruksområde for å legge til andre volumer: [Hente hemmeligheter fra Azure Key Vault](/nb/app/development/configuration/secrets/).

## Service

Konfigurasjon av `service` definerer hvilken port som eksponeres internt i clusteret og hvilken ekstern port denne skal mappes til.

Standard innstillinger i Helm chart:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
...

service:
  name: deployment
  type: ClusterIP
  externalPort: 80
  ## If your application is running on another port, change only the internal port.
  internalPort: 5005

...
```

Hvis din applikasjon kjører på annen port enn 5005 kan du konfigurere dette i applikasjonens `values.yaml` fil:

{{% code-title %}}
App/deployment/values.yaml
{{% /code-title %}}

```yaml
deployment:
...

  service:
    internalPort: 5007

...
```

{{% notice warning %}}
**NB!** Innstilling for `eksternalPort` må ikke endres.
{{% /notice %}}

## Innstillinger som blir overskrevet ved publisering

- `image`
- `ingressRoute`

Disse innstillingene blir overskrevet ved publisering så endringer her vil ikke ha noen effekt.
