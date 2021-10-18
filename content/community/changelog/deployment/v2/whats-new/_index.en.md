---
title: What's new
description: Overview of changes introduced in v2 of deployment.
toc: true
---

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
