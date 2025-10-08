---
title: Helm
description: The Kubernetes Package Manager.
tags: [tech, containers]
toc: true
---

![Helm logo](helm.png "Helm logo")

## What is helm?

Helm is a kubernetes resource templating tool. Where all the defined kubernetes resources are deployed with combinations of templates and values. Therefore it is called the kubernetes package manager.

A helm-package, or a helm-chart is a folder with a set file-structure.

```text
+-- altinn-designer
|   +-- templates
|   |   +-- tests
|   |   |   +-- test-connection.yaml
|   |   +-- NOTES.txt
|   |   +-- _helpers.tpl
|   |   +-- deployment.yaml
|   |   +-- service.yaml
|   |   +-- ingress.yaml (deleted in altinn studio, since we don't use ingress. But an ingress template is included in a default helm-chart)
|   +-- .helmignore
|   +-- Chart.yaml
|   +-- values.yaml
```

The `Chart.yaml`-file contains information about the chart, like the name, version and maintainers. 
The `values.yaml`-file contains different values. These values are accessable in the templates. So different environment variables can be defined in the values. Values can also be overwritten when running a upgrade or install of the chart.

The files in the `templates`-folder becomes populated with the values, and sent to the kubernetes clusters as the name of the files. So `deployment.yaml` should create a deployment in kubernetes. The same fore `service.yaml` and `ingress.yaml`.

`_helpers.tpl` can be used to define functions to get release names, concatinated with other info.
`NOTES.txt` is the info printed in the cli after an install or upgrade of an release, usually used to give usefull commands the user can run to access the pods.

## Helm usage in Altinn Studio

We use helm to deploy our builds to the kubernetes cluster, both in development-, production- and SBL-cluster.
Azure Dev Ops pipelines have support for helm, so this makes deploying to development trigger everytime we merge some code into master.

## Links

- https://helm.sh
- https://github.com/helm/helm
