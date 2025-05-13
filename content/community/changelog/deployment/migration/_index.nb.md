---
title: Migrering til versjonerte charts
linktitle: Migrering
description: Migrering fra helm template filer til versjonert helm dependency.
toc: true
---
For å forenkle oppraderings prosessen av deployment charts har vi flyttet template filene ut et sentralt repository på github. Fra her publiseres helm charts som igjen draes inn i apps repoene som avhengigheter.

Dette gir oss muligheten til å oppdatere standard måte for deploy til altinn3 i et sentralt repository og forenkler jobben for tjenesteiere ved oppgradering.

## Hvordan avdekke om din app bruker gammel deployment stretegi
Åpne opp appen din i gitea eller hent siste versjon ned til din datamaskin med git.

Hvis mappen som heter deployment ser ut som nedenfor:
```
deployment
├── .helmignore
├── Chart.yaml
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── horizontalPodAutoscaler.yaml
│   ├── ingressRoute.yaml
│   ├── middleware.yaml
│   └── service.yaml
└── values.yaml

```
og innholdet i filen `deployment/Chart.yaml` er lignende dette:
```yaml
apiVersion: v1
description: A Helm chart for Kubernetes
# name can only be lowercase. It is used in the templats.
name: deployment
version: 1.1.0
```
Benytter din applikasjon gammel deployment strategi og du kan følte guiden for hvordan du skal oppgradere til ny [her](#migrere-til-ny-deployment-strategi).

Hvis mappen deployment ser sut som nedenfor: 
```
deployment
├── .helmignore
├── Chart.yaml
└── values.yaml
```
og innholdet i `deployment/Chart.yaml er lignende dette:
```yaml
apiVersion: v1
description: A Helm chart for Kubernetes
# name can only be lowercase. It is used in the templats.
name: deployment
version: 1.1.0

dependencies:
- name: deployment
  repository: https://charts.altinn.studio/
  version: 3.2.0
```

Benytter din applikasjon siste deployment strategi.

Hvordan du konfigurerer din deployment er dokumentert [her](/nb/altinn-studio/reference/configuration/deployment)

{{%notice info%}}
Nye  versjoner er tilgjengelige. Hvis det er ny major versjon må du være obs på breaking changes.
{{%/notice%}}

## Migrere til ny deployment strategi

Migreringen er rimelig enkel og involverer bare tre endringer i mappen `deployment`:
1. Slett mappen `templates`.
2. Definer avhengigheten til den sentralt vedlikeholde helm-charten i din `Chart.yaml`.
    ```yaml
    dependencies:
    - name: deployment
      repository: https://charts.altinn.studio/
      version: 3.2.0
    ```
    Your Chart.yaml should now look like this:
    ```yaml
    apiVersion: v1
    description: A Helm chart for Kubernetes
    # name can only be lowercase. It is used in the templats.
    name: deployment
    version: 1.1.0

    dependencies:
    - name: deployment
      repository: https://charts.altinn.studio/
      version: 3.2.0
    ```
3. Legg til en ny linje i toppen av values.yaml og skriv inn `deployment:` på denne linjen. Legg til to space først på hver linje etter dette (yaml behandler tab og mellomrom forskjellig så forsikre deg om at det er mellomrom). <br><br>Gitt at din values.yaml ser ut som det her:
    ```yaml
    replicaCount: 3

    image:
    # Set "repository" name of your image for manual Helm install and upgrade.
      repository:
      tag: latest
      pullPolicy: Always
      pullSecrets:
        # Change this to the name of your pull secret
        - name: acr-secret

    service:
    name: deployment
    type: ClusterIP
    externalPort: 80
    # If your application is running on another port, change only the internal port.
    internalPort: 5005

    linkerd:
      enabled: true

    ingressRoute:
      name: Will be inserted during deploy
      entryPoints:
        - http
        - https
      routes:
        - match: Will be inserted during deploy
          kind: Rule
          services:
            - name: Will be inserted during deploy
              port: 80
          middlewares:
            - name: hsts-header
      tls:
        options:
          name: tls-options
        secretName: ssl-cert

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
    ```
    Etter at du har gjort dine migrerings endringer bør denne se ut som følger:
    ```yaml
    deployment:
      replicaCount: 3
  
      image:
        # Set "repository" name of your image for manual Helm install and upgrade.
        repository:
        tag: latest
        pullPolicy: Always
        pullSecrets:
        # Change this to the name of your pull secret
          - name: acr-secret

      service:
        name: deployment
        type: ClusterIP
        externalPort: 80
        # If your application is running on another port, change only the internal port.
        internalPort: 5005

      linkerd:
        enabled: true

      ingressRoute:
        name: Will be inserted during deploy
        entryPoints:
          - http
          - https
        routes:
          - match: Will be inserted during deploy
            kind: Rule
            services:
              - name: Will be inserted during deploy
                port: 80
            middlewares:
              - name: hsts-header
        tls:
          options:
            name: tls-options
          secretName: ssl-cert

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
    ```

Commit og Push dine endringer til gitea og neste deploy av din applikasjon vil være med ny deployment strategi
