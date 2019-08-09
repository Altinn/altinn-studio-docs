---
title: Loadbalancer
description: Information about loadbalancer
tags: [development, load-balancer]
weight: 100
---

# Loadbalancer

The loadbalancer config is stored as a configmap in our kubernetes cluster.
When the config needs to be changed, the changes should be done in the loadbalancer-configmap for the correct environment (dev/prod).

Apply the changes, and restart the pod:

Option 1: kill the pod and let the deployment spinn up a new pod.  
Option 2: open a shell into the pod `kubectl exec -it [POD_NAME] -- sh` and run the command `nginx -s reload`