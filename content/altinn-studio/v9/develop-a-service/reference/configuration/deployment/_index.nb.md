---
draft: true
title: Innstillinger for publisering
linktitle: Publisering
description: Oversikt over innstillingene i deployment/values.yaml som styrer hvordan appen kjører etter publisering
toc: true
weight: 600
tags: [needsReview]
---

Når du publiserer appen, kjører den i et Kubernetes-cluster. Altinn bruker et felles Helm-chart for alle apper. Et Helm-chart er en mal som beskriver hvordan appen skal kjøre, for eksempel hvor mange kopier av appen som kjører samtidig, og hvor mye CPU og minne hver kopi får.

Chartet har standardverdier som passer for de fleste apper. Du finner dem i
[`values.yaml` i altinn-studio-charts](https://github.com/Altinn/altinn-studio-charts/blob/main/charts/deployment/values.yaml).
Altinn velger hvilken versjon av chartet appen bruker når du publiserer den. Du trenger ikke oppgradere chartet selv.

## Endre innstillingene for appen

Du endrer innstillingene i filen `deployment/values.yaml` i app-repoet. Legg innstillingene under `deployment`. Det du skriver der, overstyrer standardverdien i chartet. Innstillinger du ikke skriver, beholder standardverdien.

{{% notice warning %}}
I chartet ligger innstillingene på toppnivå. I `values.yaml` i app-repoet legger du dem under `deployment`. Pass også på innrykkene: YAML krever mellomrom, ikke tabulator.
{{% /notice %}}

Appen kan ikke ha egne Helm-maler. Har app-repoet filer i mappen `deployment/templates`, feiler publiseringen.

## Skalering

### Autoskalering

Appen skalerer seg selv opp og ned etter hvor mye CPU den bruker. Kubernetes starter flere kopier når belastningen øker, og stopper kopier når den går ned.

Standardverdier i chartet:

{{< code-title >}}
altinn-studio-charts/charts/deployment/values.yaml
{{< /code-title >}}

```yaml
autoscaling:
  enabled: true
  replicas:
    min: 2
    max: 6
  avgCpuUtilization: 75
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Pods
          value: 1
          periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 1
          periodSeconds: 60
```

- `replicas.min` og `replicas.max` er det laveste og det høyeste antallet kopier appen kan ha.
- `avgCpuUtilization` er hvor mange prosent av CPU-reservasjonen (`resources.requests.cpu`) kopiene i snitt skal bruke før Kubernetes starter flere.
- `behavior` styrer hvor raskt antallet endrer seg. Med standardverdiene starter Kubernetes høyst én ny kopi hvert 15. sekund så lenge belastningen er høy. Når belastningen går ned, venter Kubernetes fem minutter og stopper deretter høyst én kopi i minuttet.

Det tar tid å starte en ny kopi, og enda lengre tid hvis clusteret må starte en ny maskin først. Sett derfor `avgCpuUtilization` så lavt at appen tåler belastningen til de nye kopiene er klare.

Slik setter du for eksempel det høyeste antallet kopier til 10:

{{< code-title >}}
App/deployment/values.yaml
{{< /code-title >}}

```yaml {hl_lines=["3-5"]}
deployment:

  autoscaling:
    replicas:
      max: 10
```

### Fast antall kopier

`replicaCount` bestemmer antallet kopier når autoskalering er slått av. Standardverdien er 2. Så lenge autoskalering er slått på, bruker Kubernetes ikke `replicaCount`.

{{< code-title >}}
App/deployment/values.yaml
{{< /code-title >}}

```yaml {hl_lines=["3-5"]}
deployment:

  autoscaling:
    enabled: false
  replicaCount: 3
```

## CPU og minne

`resources` bestemmer hvor mye CPU og minne hver kopi av appen får. Hva som passer, avhenger av hva appen gjør. Standardverdiene i chartet:

{{< code-title >}}
altinn-studio-charts/charts/deployment/values.yaml
{{< /code-title >}}

```yaml
resources:
  requests:
    cpu: 50m
    memory: 256Mi
```

`50m` betyr 50 milli-CPU, altså fem prosent av én CPU-kjerne. `256Mi` betyr 256 mebibyte, omtrent 268 megabyte.

Eksempel på egne verdier. Verdiene er bare et eksempel, ikke en anbefaling:

{{< code-title >}}
App/deployment/values.yaml
{{< /code-title >}}

```yaml
deployment:

  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 1000m
      memory: 512Mi
```

### `requests`: det appen får reservert

`requests` er CPU og minne som Kubernetes reserverer for hver kopi. Kubernetes bruker tallene til å bestemme hvilken maskin kopien skal kjøre på, og hvor mange kopier som får plass på hver maskin.

{{% expandsmall id="eksempel-requests" header="Eksempel" %}}
En maskin har 2 CPU-kjerner (2000m) og 4096Mi minne. Alle kopiene ber om 200m CPU og 256Mi minne:

- CPU gir plass til 2000 / 200 = 10 kopier.
- Minne gir plass til 4096 / 256 = 16 kopier.

Det er det minste tallet som gjelder, så maskinen har plass til 10 kopier.
{{% /expandsmall %}}

Autoskaleringen regner også ut fra `requests`. Se `avgCpuUtilization` over.

`requests` er ikke et tak. En kopi kan bruke mer hvis maskinen har ledig kapasitet. Men når maskinen får for lite ressurser, kan Kubernetes stoppe kopier som bruker mer enn de har reservert.

### `limits`: det meste appen kan bruke

`limits` er taket for hver kopi. Chartet setter ingen tak som standard.

- Bruker kopien mer CPU enn taket, går den tregere.
- Bruker kopien mer minne enn taket, stopper Kubernetes den med feilen Out Of Memory (OOM).

## Linkerd

Alle apper er med i [Linkerd](https://linkerd.io/), som krypterer trafikken mellom tjenestene i clusteret. Standardverdien i chartet er:

```yaml
linkerd:
  enabled: true
```

{{% notice warning %}}
Ikke slå av Linkerd. Det er Linkerd som krypterer trafikken mellom appen og de andre tjenestene i clusteret.
{{% /notice %}}

## Volumer

`volumes` og `volumeMounts` kobler filer og lagring til filsystemet i appen. `volumes` beskriver hva som skal kobles til, og `volumeMounts` sier hvor i filsystemet det havner.

`values.yaml` fra app-malen har allerede de to volumene appen trenger for å kommunisere med Altinn-plattformen, `datakeys` og `accesstoken`. Behold dem, og legg eventuelle nye volumer under dem.

Det vanligste du legger til volumer for, er hemmeligheter fra Azure Key Vault. Les mer på siden om [hemmeligheter]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/secrets" >}}).

## Port

`service` bestemmer hvilken port appen svarer på inne i clusteret. Standardverdiene i chartet er:

```yaml
service:
  type: ClusterIP
  externalPort: 80
  internalPort: 5005
```

App-malen svarer på port 5005. Har du endret porten i appen, setter du `internalPort` til samme port:

{{< code-title >}}
App/deployment/values.yaml
{{< /code-title >}}

```yaml
deployment:

  service:
    internalPort: 5007
```

{{% notice warning %}}
Ikke endre `externalPort`.
{{% /notice %}}

## Innstillinger Altinn setter ved publisering

Altinn setter disse innstillingene når du publiserer appen:

- `image`
- `ingressRoute`

Ikke endre dem i `values.yaml`.
