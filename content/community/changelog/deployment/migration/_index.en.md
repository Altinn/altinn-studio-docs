---
title: Migration to versioned charts
linktitle: Migration
description: Migrating from helm template files to versioned helm dependency.
toc: true
---

To ease the upgrade process of deployment charts we have moved the files that earlier where located under the
folder `deployment/templates` to a centrally managed helm chart and pull those files in at deploy time using helm
dependencies.

This give us the ability to publish updates to the helm chart in one place and version them. Service owners then only
need to update the version of their helm dependency.

## Determine if your app is using the old deployment strategy
Open your app in gitea or pull the latest version to your computer using git.

If the deployment folder of your app is similar to this:
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
and the content of your `deployment/Chart.yaml` is similar to this:
```yaml
apiVersion: v1
description: A Helm chart for Kubernetes
# name can only be lowercase. It is used in the templates.
name: deployment
version: 1.1.0
```
Your app is using the old deployment strategy and you should follow the steps below to upgrade to the new deployment strategy, as described [here](#migrating-to-new-deployment-strategy).

If the deployment folder in your app is similar to this:
```
deployment
├── .helmignore
├── Chart.yaml
└── values.yaml
```
And your `deployment/Chart.yaml` is similar to this:
```yaml
apiVersion: v1
description: A Helm chart for Kubernetes
# name can only be lowercase. It is used in the templates.
name: deployment
version: 1.1.0

dependencies:
- name: deployment
  repository: https://charts.altinn.studio/
  version: 2.8.0
```

You are using the latest deployment strategy.

How to configure your deployment is documented [here](/altinn-studio/reference/configuration/deployment)

{{%notice info%}}
Newer version are available. If the new version is a major version please note that there could be breaking changes.
{{%/notice%}}
## Migrating to new deployment strategy

The migration is fairly simple and involves three changes in your deployment folder:

1. Delete the folder `templates` in the `deployment` folder.
2. Append the dependency of Altinns deployment chart to your Chart.yaml
    ```yaml
    dependencies:
    - name: deployment
      repository: https://charts.altinn.studio/
      version: 2.8.0
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
      version: 2.8.0
    ```
3. Add a new line at the top of your values.yaml containing the string `deployment:` and indent all the old lines with
   two spaces (yaml treats spaces and tab differently so check that you add spaces) <br><br>Given that your values.yaml
   looked like this:
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
    After you have made your changes it should look like this:
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

Commit and push your changes to gitea and your next deploy will use the new deployment strategy
