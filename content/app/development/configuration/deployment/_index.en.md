---
title: Deployment
description: Configuring settings for deployment and runtime behavior
toc: true
weight: 600
---

#### Helm Chart

Altinn applications are published to a Kubernetes cluster using a 'deployment Helm chart'. A Helm chart contains the necessary resources to publish an app, including YAML configuration files.

Based on tests and experiences, we have set some default values in a central [Helm chart](https://github.com/Altinn/altinn-studio-charts/blob/main/charts/deployment/values.yaml) as a starting point for publishing Altinn applications. These values may change as we gain more experience.

{{% notice info %}}
Starting from version [2.0.0](/community/changelog/deployment/v2) of the 'deployment Helm chart,' autoscaling is available and enabled by default.
{{% /notice %}}

The values.yaml in the centralized chart defines _replicaCount_ at the root as follows:
```yaml
replicaCount: 2
...
```

To override this in your _deployment/values.yaml_ you add it as a child to the deployment section:
```yaml
deployment:
  replicaCount: 3
```
{{%notice warning%}}
Note the addition of "deployment:" and that the "replicaCount" is indented with two spaces (yaml-indents are spaces and not tab, your yaml will not be valid with tab indents!)
{{% /notice %}}

## Scale
### Initial scale
The initial scale is controlled by the field `replicaCount`. If autoscaling is enabled the autoscaler will override this value.
Example where initial scale is set to 2:
```yaml
deployment:
  replicaCount: 2
```
### Autoscaling configuration

From version [2.0.0](/community/changelog/deployment/v2) of the deployment helm-chart autoscaling is available and enabled by default.

Autoscaling leverages [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) 
to automatically scale your application based on CPU utilization.

When configuring how the autoscaling of your app behaves, there are two sections in the values that affect it.
1. _resources_ cpu/memory guarantees and limits for the app pods at runtime, see: [Resources Configuration](#resources-configuration)
2. _autoscaling_ when and how the autoscaling should happen

Defaults if not overridden in _deployment/values.yaml_
```yaml
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
__min__: The lowest number of pods the autoscaler is allowed to scale down to.
__max__: The highest number of pods the autoscaler is allowed to scale up to.

#### deployment.autoscaling.avgCpuUtilization
Average percentage of CPU request that is utilized.

Scale up is not instant as the new pod needs some time to start (1-2 min in most cases).
If all the resources in the cluster is consumed azure also need to start a new node (5-10 min in most cases).
Leave some resources that can handle the load while the extra capacity is provisioned.

#### deployment.autoscaling.behavior.stabilizationWindowSeconds
The stabilization window is used to restrict the flapping of replicas when the metrics used for scaling keep fluctuating.

By default, apps initiate scale up as soon as the average utilization is above the threshold and wait two minutes before we start a scaledown.

__scaleUp__: Number of seconds to wait from the last scale-event to a new scaleUp is evaluated.
__scaleDown__: Number of seconds to wait from the last scale-event to a new scaleDown is evaluated.

## Resources configuration
Setting good requests and limits you need to know the app well, e.g. what tasks is it meant to perform and how it does it. 
We try to set sane defaults, but they might not be suited for your workloads.

Defaults if not overridden in _deployment/values.yaml_
```yaml
deplyoment:
  resources:
    requests:
      cpu: 300m
      memory: 256Mi
```

All values available, the values are only provided as an example.
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
This section in the yaml defines the resources that will be reserved by the kubelet for each pod of the app. 

Requests are used when the kubernetes scheduler decides what node the pod should run on. This will limit the number of pods that can run on a node.

Requests are also used by the Horizontal Pod Autoscaler to determine if the app should scale up or down.

Given a cluster with 2 cores (2000 millicores) and 4Gi of memory and all the pods requesting 200m (200 millicores) and 256Mi.

The number of pods a node can run based on the CPU request is: _2000 / 200 = 10_

The number of pods a node can run based on the memory request is: _4096Mi / 256Mi = 16_

The number of pods a node can run, with or without actual load, is then 10.

Requests does not limit how much CPU or memory a pod can use when there are available resources, but if resources are scarce pods exceeding their request can be evicted from the node.

#### deployment.resources.limits
This section in the yaml defines the maximum of resources a pod of this app is allowed to use. 

If a pod tries to use more CPU than the limit it is throttled.

If a pod tries to allocate more memory than the limit it is terminated with an Out Of Memory (OOM) error
## Linkerd
By default all services are add to the Linkerd service mesh.

We strongly recommend not changing this setting as it add mutual TLS and other security features to all communication between services in the cluster.

```yaml
deployment:
...
  linkerd:
    enabled: true
...
```

## Volumes and VolumeMounts
This section defines volumes mounted into folders available to the application.
There are some default mounts the default functionality needs to communicate with Altinn Platform.

```yaml
deployment:
...
  volumes:
    - name : datakeys
      persistentVolumeClaim:
        claimName: keys
    - name: accesstoken
      secret:
        secretName: accesstoken
```

At the time of writing there is one case for adding other Volumes: [Secrets loaded from Azure Key Vault](../secrets)

## Service
In the service definition you can change the port forwarding rules to your application, most likely this is something you do not need to change.

If your application runs on a different port than 5005, set deployment.service.internalPort to the port your app is running on.

Defaults are:
```yaml {hl_lines=[8]}
deployment:
...
  service:
    name: deployment
    type: ClusterIP
    externalPort: 80
    ## If your application is running on another port, change only the internal port.
    internalPort: 5005
...
```

## Sections overridden at deploytime

* image
* ingressRoute

These sections are overridden at deploytime so changes have no affect.