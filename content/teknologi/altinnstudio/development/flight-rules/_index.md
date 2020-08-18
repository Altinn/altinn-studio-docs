---
title: Flight Rules
description: Flight rules for Altinn Studio
toc: true
tags: [development]
---

{{% notice info %}}

**What are flight rules?**  
Flight rules is originally a compendium of step-by-step manuals, what to do when X occurs and why.  
Essentially, they are extremely detailed, scenario-specific standard operating procedures.

{{% /notice %}}

## Loadbalancer is responding with HTTP Error 502 - bad gateway

This occurs when the loadbalancer could not find any of the services in it's configuration.  
Can be triggerd by these issues:

* Some of the kubernetes services are not existing
* Some of the kubernetes pods are not existing
* Kubernetes mapping between deployments and services are incorrect.

## Loadbalancer is responding with HTTP Error 504 - timeout

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

## Sonarqube-code-analysis pipeline fails on pull request

This occurs when there exists double line shifts in the code that is being analyzed. This somehow crashes the sonarqube code analysis tool.
To solve this issue you need to identify and remove the double line shift is in the code:

* Navigate to the pipeline logs, open 'Run Code Analysis'
* Scroll to the bottom
* Look for error message looking like 'ERROR: 1 is not a valid line offset for pointer'
* The error should contain info at where the double line shift is
* Remove the double line shift and update PR


## Pod is stuck in status ContainerCreating and has warning "Unable to mount volumes for pod XXX: timeout expired waiting for volumes to attach or mount for pod XXX"

The storage we use today don't support two pods accessing it at the same time, 
so on deploy if the first pod don't release the storage before the other one tries to connect to it the second pod will get stuck in ContainerCreating status. 
If you then run kubectl get pods and get the name of the pod you can then run
```bash
kubectl describe [POD_NAME]
```
then you see the message "Unable to mount volumes for pod XXX: timeout expired waiting for volumes to attach or mount for pod XXX"

To fix this you need to delete the deployment to that pod and start a new release:

```bash
kubectl delete deployment [DEPLOYMENT_NAME]
```
To start a new release go to [release pipeline](https://dev.azure.com/brreg/altinn-studio/_release)


## I try to pull master from github and get error "Cannot lock ref"

This happens from time to time, still unsure why. To fix it run the command:

`git gc --prune=now`
