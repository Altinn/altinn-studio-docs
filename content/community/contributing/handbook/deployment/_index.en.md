---
title: Deployment
description: Guidelines for deploying
tags: [development, deploy]
weight: 100
---

### ci build devops pipeline pipelines
Build process
Build Pipelines
Quality Build
Building the docker image, running tests and checking code.
Triggered by:

### Git Push
Pull Request
Altinn Studio and Runtime Docker Images
Separate pipelines are made for Altinn Studio and Runtime. The pipeline will build and deploy the Altinn Studio Docker Image and the Runtime Docker Image to Azure Container Registry.

Triggered by:

### Git Merge to Master
Altinn Studio Release Build
When the build for either Altinn Studio or Runtime is successfully ran a release build will start. The release build will update the kubernetes cluster with the images created in the Altinn Studio and the Runtime builds

Triggered by:

Successfull build of either/both Altinn Studio and Runtime
Altinn Service Deploy

Service Runtime docker image bundling process.
Building the Altinn Service with “service specific” files from Gitea, creating a “Service Image”, deploying to Azure Container Registry and telling Kubernetes to deploy service.

Build process (Pipeline):

This process have more details in the Dockerfile. This is a summary.

### Downloading files from service repo in Gitea
Building Docker base image with Dockerfile. This includes “Dotnet build” for C\# files from Gitea. “Dotnet build” is executed on the Runtime Base Image reusing previous.
Docker Pull: Altinn/Runtime Base Image with SDK from ACR. This makes the AltinnService build faster.
Clone and build code from Gitea inside Altinn-Runtime Base Image.
Docker Pull: Microsoft/DotNet AspNetCore.
Copy Altinn Runtime, AltinnService Build files and Service Metadata/Resources from Gitea.
Publish to ACR.
Triggered by:

### “Publish Service”-button in Altinn Studio.
Generating Altinn Pipelines Images
Summary
The Altinn Azure Pipelines Image (image) is built with Packer. The Packer JSON configuration is based on the same configuration used by Microsoft to build their own Hosted Agent images.
The image is built in Azure Pipelines passing in “secrets” to the Packer configuration with Environment Variables not visibly available during the build process.
Usage
Create a Virtual Machine in Azure using the pre built image found under “browse all images and disks”.
Create a username and password (should be stored in Azure Vault).
Installing Agent Host
The script for installing the Agent Host is found at: Maintenance/azure-pipelines-image/scripts/agent/agent-install.sh (Currently a manual job)

A computer can have one or several Agent Hosts installed. Several Agents, on one or several servers, can connect to one Agent Pool.

### Creating Pipelines Image with Packer.io
The process of creating an Image with Packer is described [here](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/build-image-with-packer)

Some steps might already be performed in Azure.

The repo for creating the Pipelines Image for Altinn is hosted in this [branch](https://github.com/Altinn/altinn-studio/tree/Maintenance/azure-pipelines-image) and is based on the Microsoft Packer scripts from this [repo](https://github.com/Microsoft/azure-pipelines-image-generation)

The variables used in the Packer JSON configuration file is passed in via hidden Pipelines environment variables.

### Ubuntu1604-full
The “full” image contains components for building Dotnet and NodeJS applications, running JavaScript based headless tests and running Docker Images. See the JSON file for specifications.

### Ubuntu1604-light
The “light” image only contains Git and Docker and is created for only running Docker images.

### Clean-up
Packer creates Resource Groups in Azure keeping the image build for history and debuggind purposes. To remove this Resource Group run AZ Cli:

az group delete -n PackerResourceGroup

### Deleting build queue
If there is the need to delete builds in the Azure Devops pipelines queue, you can use the DELETE rest API found [here](https://docs.microsoft.com/en-us/rest/api/azure/devops/build/builds/delete?view=azure-devops-rest-5.1).
You can use PostMan. Rememember to copy the cookies from an authenticated browser.
