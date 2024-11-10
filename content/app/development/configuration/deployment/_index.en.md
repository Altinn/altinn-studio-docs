---
title: Deployment
description: Configuring settings for deployment and runtime behavior
toc: true
weight: 600
---

#### Helm Chart

Altinn applications are published to a Kubernetes cluster using a deployment Helm chart. A Helm chart contains the necessary resources to publish an app, including YAML configuration files.

Based on tests and experiences, we have set some default values in a central [Helm chart](https://github.com/Altinn/altinn-studio-charts/blob/main/charts/deployment/values.yaml) as a starting point for publishing Altinn applications. These values may change as we gain more experience.

{{% notice info %}}
Starting from version [2.0.0](/community/changelog/deployment/v2) of the 'deployment Helm chart,' autoscaling is available and enabled by default.
{{% /notice %}}

#### Custom settings

Custom settings are configured in the `App/deployment/values.yaml` file by adding the desired property under
the `deployment` section.
These will override corresponding settings in the Helm chart (for exceptions,
see [here](#settings-overridden-at-deploy-time)).
See [Initial Scaling](#initial-scaling) for an example.

{{% notice warning %}}
Please note that the format in `values.yaml` in the central Helm chart differs slightly from `values.yaml` in the
application; in the Helm chart, the properties are at the top level, while in the app, they must be placed under
the `deployment` section.
{{% /notice %}}

## Scaling

### Initial scaling

The initial scaling is defined by `replicaCount`. If autoscaling is enabled, the autoscaler will override this value.

Standard settings in the Helm chart:

{{% code-title %}}
altinn-studio-charts/charts/deployment/values.yaml
{{% /code-title %}}

```yaml
replicaCount: 2

...
```

To override the settings in your app, you can add `replicaCount` under `deployment` i `App/deployment/values.yaml`:

{{% code-title %}}
App/deployment/values.yaml
{{% /code-title %}}

```yaml{linenos=false,hl_lines="3"}
deployment:

  replicaCount: 3

...
```

### Autoscaling

When configuring how autoscaling behaves, you need to consider the following sections:

1. `resources`: Guarantees and limits for CPU and memory for app pods during runtime. See [Resource Configuration](#resources-configuration).
2. `autoscaling`: Settings for when the application should scale up or down.

Autoscaling utilizes the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) to automatically scale an app up and down based on CPU usage.

The `autoscaling` section configures when an application should automatically scale.

Default settings in the Helm chart:

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
- `min`: The lowest number of pods the autoscaler is allowed to scale down to.
- `max`: The highest number of pods the autoscaler is allowed to scale up to.

#### `autoscaling.avgCpuUtilization`
`avgCpuUtilization` sets the threshold for the percentage of CPU requests utilized before scaling up or down.

Scaling up is not immediate, as a new pod takes time to start (1-2 minutes in most cases).
 If all resources in a cluster are reserved, a new node must be started in Azure (5-10 minutes in most cases).
 It is, therefore, wise to have a small buffer so that the application can handle the load until the capacity is expanded.

#### `autoscaling.behavior.stabilizationWindowSeconds`
The stabilization window limits the flickering of replicas when the values used for scaling vary.

- `scaleUp`: The number of seconds Kubernetes should wait after the last scaling before performing a new scaling-up evaluation.
- `scaleDown`: The number of seconds Kubernetes should wait after the last scaling before it performs a new evaluation for scaling down.

With standard settings, scaling up will happen once the consumption exceeds the threshold values. Scaling down will wait for two minutes.

## Resources configuration
The ideal settings for `resources` depend on the application's code and tasks. We have tried to set default values that should work for as many of the apps in Altinn as possible, but they may not be suitable for your app.

Default values in the Helm chart:

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

Values that are possible to configure (the values below are just an example and by no means definitive):

{{% code-title %}}
App/deployment/values.yaml
{{% /code-title %}}

```yaml
deployment:

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
The `requests` property defines the resources reserved for each pod in the app and are used when the Kubernetes scheduler determines which node the pod should run on.
 Based on these settings, the maximum number of pods that can run on a node is calculated.
  The maximum number is limited by the setting allowing the fewest pods.

{{% expandsmall id="example1" header="Example" %}}

Given a cluster with nodes, each having 2 cores (2000 milliCores) and 4Gi memory, and where all pods have requests set to 200m (200 milliCores) and 256Mi:
- Based on CPU requests, the number of pods that can run on each node is: _2000 / 200 = 10_
- Based on memory requests, the number of pods that can run on each node is: _4096Mi / 256Mi = 16_

*The maximum number of pods that can run on each node, with or without load in the solution, is 10.*
{{% /expandsmall %}}

`requests` are also used by the Horizontal Pod Autoscaler to determine whether the app should scale up or down.

The `requests` settings do not limit how much CPU or memory an application can use if there are available resources.
 However, a pod may be "evicted" from the node if there are few available resources and the pod uses more than specified in `requests`.

#### `deployment.resources.limits`
`limits` define how much of a resource a pod can use at most.

If a pod tries to use more CPU than what is set as a limit, it will be throttled.

If a pod attempts to allocate more memory than what is set as a limit, it will be terminated with an Out Of Memory (OOM) error.
## Linkerd
By default, all services are add to the [Linkerd](https://linkerd.io/) service mesh:

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
We strongly recommend not changing this setting as it adds mutual TLS and other security features to all communication between services in the cluster.
{{% /notice %}}

## Mounting of volumes
`volumes` and `volumeMounts` define volumes mounted to the application's filesystem. `Volumes` describe the content of the mounted resource, and `volumeMounts` specify where in the application's filesystem the content should be mounted.

There are two predefined mounted resources and mounting points in the Helm chart that are necessary for standard functionality, including communication with the Altinn Platform:

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

Custom volumes can be added under the `development` section in `App/deployment/values.yaml`.

At the moment, there is only one use case for adding other volumes: [Fetching secrets from Azure Key Vault](/app/development/configuration/secrets/).

## Service

The `service` configuration defines which port is exposed internally in the cluster and which external port it should be mapped to.

Default settings in the Helm chart:

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

If your application is running on a different port than 5005, you can configure `deployment.service.internalPort` in the application's `values.yaml` file:

```yaml
deployment:
...

  service:
    internalPort: 5007

...
```

{{% notice warning %}}
**Note:** Settings for `externalPort` must not be changed.
{{% /notice %}}

## Settings overridden at deploy time

- `image`
- `ingressRoute`

These settings are overridden during publishing, so changes here will have no effect.