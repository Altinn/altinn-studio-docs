---
title: What's new
description: Overview of changes introduced in v2 of deployment.
toc: true
---

## 2.3.0

### Changes introduced

* Upgraded HorizontalPodAutoscaler from version _autoscaling/v2beta2_ to _autoscaling/v2_

{{%notice warning%}}
autoscaling/v2beta2 is deprecated in version 1.23+ of kubernetes and removed in version 1.26+
Apps clusters will eventually be upgraded and deployment of apps using old chart versions will fail once cluster is upgraded to version 1.26+. 

[AKS release calendar](https://docs.microsoft.com/en-us/azure/aks/supported-kubernetes-versions?tabs=azure-cli#aks-kubernetes-release-calendar)
{{% /notice%}}

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-2.3.0)

## 2.2.0

### Changes introduced

* Make it possible to at custom annotations to pods in values.yaml
 

### How to add pod annotations in values.yaml

```yaml
deployment:
  podAnnotations:
    key1: value1
    key2: value2
```

[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-2.2.0)

## 2.1.0

{{%notice warning%}}
Enabling of liveness and/or readiness probe requires that your application is running 
version 4.30.0 or higher of the Altinn.App.* nuget packages.
{{% /notice%}}

### Changes introduced

* Default CPU og memory requested per pod is reduced to 50m and 128Mi, respectively.
* Configurable liveness and readiness probes are available. Default behavior is that this is disabled.
 

### New optional fields with default values available in values.yaml 

```yaml {linenos=table}
deployment:
  readiness:
    enabled: false
    path: /health
    initialDelaySeconds: 30
    failureThreshold: 3
    periodSeconds: 3
    timeoutSeconds: 1
  liveness:
    enabled: false
    path: /health
    initialDelaySeconds: 3
    failureThreshold: 3
    periodSeconds: 10
```

Walkthrough: 

__3.__ Enable or disable readiness probe for this application.

__4.__ The path to the liveness endpoint in the application.

__5.__ Number of seconds after the container has started before readiness probes are initiated.

__6.__ Minimum consecutive failures for the probe to be considered failed after having succeeded.

__7.__ How often (in seconds) to perform the probe

__8.__ Number of seconds after which the probe times out. 

__10.__ Enable or disable liveness probe for this application.

__11.__ The path to the liveness endpoint in the application.

__12.__ Number of seconds after the container has started before liveness probes are initiated.

__13.__ Minimum consecutive failures for the probe to be considered failed after having succeeded.

__14.__ How often (in seconds) to perform the probe


[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-2.1.0)

## 2.0.0

{{%notice warning%}}
Upgrading to 2.0.0 from 1.x.x leads to a short downtime during deployment. Subsequent deployments will run as normal.
{{% /notice%}}

If your apps _deployment_ folder contains the _templates_ folder please follow the [migration guide](../../migration).

### Changes introduced

* Deployment renamed to <old-name>-v2 due to changes in selector fields (field is immutable) ***WARNING*** leads to downtime during first deploy
* Add resource requests to all deployments
* Horizontal pod autoscaler enabled by default for all deployments (automatic scaling of application)
* Labels and selectors updated for most kubernetes objects
* Default initial replicaCount changed from 1 to 2

### New optional fields with default values available in values.yaml 
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

Walkthrough

__3.__ Enable or disable autoscaling for this application

__5.__ The lower limit for the number of pods that can be set by the autoscaler.

__6.__ The upper limit for the number of pods that can be set by the autoscaler.

__7.__ The target average CPU utilization (represented as a percent of requested CPU) over all the pods for when scaling should occur.

__9.__ The stabilization window is used to restrict the flapping of replicas when the metrics used for scaling keep fluctuating.

__10.__ Number of seconds the average CPU utilization for all pods are above the threshold (avgCpuUtilization) before scaleUp starts.

__11.__ Number of seconds the average CPU utilization for all pods are below the threshold (avgCpuUtilization) before scaleDown starts.

__14.__ CPU millicores reserved by the kubelet for each pod of this application. Used by HPA to calculate scale. Pods are allowed to consume more than this if it's available.

__15.__ Memory reserved by the kubelet for each pod of this application. Pods are allowed to consume more than this if it's available


[View release on Github](https://github.com/Altinn/altinn-studio-charts/releases/tag/deployment-2.0.0)

### New optional field without default values available in values.yaml
```yaml {linenos=table}
deployment:
  resources:
    limits:
      cpu: 1000m
      memoty: 512Mi
```

Walkthrough

__4.__ Upper limit of CPU millicores a pod is allowed to consume. Pods hitting the limit will be throttled

__5.__ Upper limit of memory a pod is allowed to consume. Pods exceeding this limit will be terminated by the system with an out of memory (OOM) error.

### Pull requests merged

* [Horizontal Pod Autoscaler (PR #3)](https://github.com/Altinn/altinn-studio-charts/pull/3)
