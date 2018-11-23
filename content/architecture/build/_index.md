---
title: Build process
description: Altinn Studio Build Processes
weight: 100
tags: ["ci", "build", "devops", "pipeline", "pipelines"]
---

## Build Pipelines

### Quality Build

When creating a Pull Request, or commiting to a branch in Pull Request, a pipeline is building the applications, running tests and style check/linting.
TSLint, SonarCloud (for Typescript) and Stylecop (C#) is used for style check/linting.

Triggered by:

* Pull Request

### Altinn Studio and Runtime Docker Images

Separate pipelines will build and deploy the Altinn Studio Docker Image and the Runtime Docker Image to Azure Container Registry.
The different Altinn Studio applications (React Apps) is built in seperate Docker images to utilize Docker's cache technique and minimize unnecessary rebuilding.

*Docker-Compose is used when developing and running Altinn Studio locally, building several Docker images and using the same caching technique used in the Pipeline.*

Triggered by:

* Git Merge to Master

### Altinn Studio Release Build

When the build for either Altinn Studio or Runtime is successfully ran a release build will start.
The Release Build will update the Kubernetes cluster with the images created in the Altinn Studio and the Runtime build pipelines.

Triggered by:

* Successfull build of either/both Altinn Studio and Runtime.

### Altinn Service Deploy

{{<figure src="ServiceRuntime.svg?width=1000" title="Service Runtime docker image bundling process.">}}

Building the Altinn Service with "service specific" files from Gitea, creating a "Service Image", deploying to Azure Container Registry and telling Kubernetes to deploy service.

Build process (Pipeline):

_This process har more details in the Dockerfile. This is a summary._

* Downloading files from service repo in Gitea
* Building Docker base image with Dockerfile. This includes "Dotnet build" for C# files from Gitea. "Dotnet build" is executed on the Runtime Base Image reusing previous.
  * Docker Pull: Altinn/Runtime Base Image with SDK from ACR. This makes the AltinnService build faster.
  * Clone and build code from Gitea inside Altinn-Runtime Base Image.
  * Docker Pull: Microsoft/DotNet AspNetCore.
  * Copy Altinn Runtime, AltinnService Build files and Service Metadata/Resources from Gitea.
* Publish to ACR.

Triggered by:

* "Publish Service"-button in Altinn Studio.

## Generating Altinn Pipelines Images

### Summary

* The Altinn Azure Pipelines Image (image) is built with Packer. The Packer JSON configuration is based on the same configuration used by Microsoft to build their own Hosted Agent images.
* The image is built in Azure Pipelines passing in "secrets" to the Packer configuration with Environment Variables not visibly available during the build process.

### Usage

* Create a Virtual Machine in Azure using the pre built image found under "browse all images and disks".
* Create a username and password (should be stored in Azure Vault).

### Installing Agent Host

The script for installing the Agent Host is found at: Maintenance/azure-pipelines-image/scripts/agent/agent-install.sh (Currently a manual job)

A computer can have one or several Agent Hosts installed. Several Agents, on one or several servers, can connect to one Agent Pool.

### Creating Pipelines Image with Packer.io

The process of creating an Image with Packer is described here: https://docs.microsoft.com/en-us/azure/virtual-machines/linux/build-image-with-packer

Some steps might already be performed in Azure.

The repo for creating the Pipelines Image for Altinn is hosted in this branch: https://github.com/Altinn/altinn-studio/tree/Maintenance/azure-pipelines-image and is based on the Microsoft Packer scripts from this repo: https://github.com/Microsoft/azure-pipelines-image-generation

The variables used in the Packer JSON configuration file is passed in via hidden Pipelines environment variables.
 
#### Ubuntu1604-full

The "full" image contains components for building Dotnet and NodeJS applications, running JavaScript based headless tests and running Docker Images. See the JSON file for specifications.

#### Ubuntu1604-light

The "light" image only contains Git and Docker and is created for only running Docker images.

#### Clean-up

Packer creates Resource Groups in Azure keeping the image build for history and debuggind purposes. To remove this Resource Group run AZ Cli:

* az group delete -n PackerResourceGroup