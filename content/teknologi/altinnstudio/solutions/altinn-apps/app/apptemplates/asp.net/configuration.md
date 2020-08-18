---
title: Configuration of Application
linktitle: Configuration
description: Description of the different configurations of an app. 
tags: [altinn-apps, todo]
---

## Configuring Process
The App process is controlled by a BPMN 2.0 process file located in the app repository. 

See architecture for supported types of steps.

## Configuration of Authorization Policy
The authorization policy is defined as a XACML 3.0 policy file. 


## Configuration of allowed data elements

TODO


## Configuration of Linkerd

Every app cluster has [linkerd](https://linkerd.io) installed as a service mesh. The app can be configured to use linkerd to encrypt the traffic between the ingress controller and the app. Configuration is done through the deployment files in the app repo. Older app templates are missing this configuration, but the deployment files can be copied from a new app template without modification.

Enabling/disabling linkerd is configured through linkerd.enabled property in the deployment/values.yaml file.