---
title: Flight Rules
description: Flight rules for Altinn Studio
tags: ["flight","rules",  "altinn", "studio"]
weight: 100
---

{{% notice info %}}

**What are flight rules?**  
Flight rules is originally a compendium of step-by-step manuals, what to do when X occurs and why.  
Essentially, they are extremely detailed, scenario-specific standard operating procedures

{{% /notice %}}

### Loadbalancer is responding with HTTP Error 502 - bad gateway

This occurs when the loadbalancer could not find any of the services in it's configuration.  
Can be triggerd by these issues:

* Some of the kubernetes services are not existing
* Some of the kubernetes pods are not existing
* Kubernetes mapping between deployments and services are incorrect.

### Loadbalancer is responding with HTTP Error 504 - timeout

This occurs when the loadbalancer is not getting a response from the other services running in kubernetes.
Because the loadbalancer is not updated when the deployment of new versions or altinn-designer, altinn-runtime or altinn-repositories.
To delete a pod, first find the name of the running pod:  

```bash
kubectl get pods
```

Then use the whole name, and run the following command:  

```bash
kubectl delete pod [POD_NAME]
```
