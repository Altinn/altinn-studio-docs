---
title: Nginx routing
description: Information about routing with nginx
tags: [development, nginx, routing]
weight: 100
---

### Nginx routing

The router config is stored as a configmap in our kubernetes cluster, and mounted to the pod as a .conf file.
When the config needs to be changed, the changes should be done in the loadbalancer-configmap for the correct environment (dev/prod).

Apply the changes, and restart the pod:

Option 1: kill the pod and let the deployment spinn up a new pod.  
Option 2: open a shell into the pod `kubectl exec -it [POD_NAME] -- sh` and run the command `nginx -s reload`
