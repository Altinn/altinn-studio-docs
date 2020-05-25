---
title: Cheat Sheet
description: Qucik guide for different commands
tags: [development, todo]
weight: 100
---

## GIT

git clone repourl

git 


## Docker

```docker ps``` to list all running docker containers.

## AKS

``` kubectl get pods ``` list all pods in current cluster

``` kubectl -n default logs -f deployment/altinn-storage --all-containers=True ``` - get logs for all components of the same deployment

``` kubectl describe pod [pod name] ``` describes current state and lists environment variables for a given pod

``` kubectl delete pod [pod name] ``` deletes a pod and a new pod of the same deployment will start

``` kubectl set env [deployment] [key]=[value] ``` update or insert new enviornment variable for a deployment

More useful kubectl commands can be found in [Kubernetes' own documentation](https://kubernetes.io/docs/reference/kubectl/cheatsheet/).

## HELM

``` helm uninstall [deployment] ``` deletes a helm release. Running pods in AKS cluster will also be deleted.

## Markdown


## Azure CLI