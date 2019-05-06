---
title: Flight Rules
description: Flight rules for Altinn Studio
tags: [development]
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

### sonarqube-code-analysis pipeline fails on pull request

This occurs when there exists double line shifts in the code that is being analyzed. This somehow crashes the sonarqube code analysis tool.
To solve this issue you need to identify and remove the double line shift is in the code:

* Navigate to the pipeline logs, open 'Run Code Analysis'
* Scroll to the bottom
* Look for error message looking like 'ERROR: 1 is not a valid line offset for pointer'
* The error should contain info at where the double line shift is
* Remove the double line shift and update PR


### react-app not updating in Runtime when testing locally

The react application for Runtime is fetched from Runtime/wwwroot/runtime/js/react. To see these changes locally one has to:

* Make any required changes in the runtime application

* Build the runtime application. This can be done either of the following ways:

    - By running

        ```bash
        npm run gulp-develop
        npm run gulp copy-files
        ```
        from `./src/AltinnCore/Runtime` folder, which will build and run the Runtime back end and build the runtime  `runtime.js` when it detects that changes have been made. The copy is necessary to copy the files to the wwwroot folder so changes can be visible in runtime
    - or, by running

        ```bash
        npm run gulp
        ```
        from `./src/AltinnCore/Runtime` folder, which will build the Runtime back end and build the runtime  `runtime.js` and copy the files to the wwwroot folder so changes can be visible in runtime
    - or, you could trigger a build of the runtime react app manually by running

        ```bash
        npm run build-develop
        ```
        from `.src/react-apps/applications/runtime` folder. This will build the runtime `runtime.js` but you will still need to copy the files to the wwwroot folder in runtime, for this you can do:
        ```bash
        npm run gulp copy-files
        ```
        from `./src/AltinnCore/Runtime` folder,

Manual Copy is done the following way: 

* Copy `runtime.js` (and `runtime.css` if you have made changes to css styling) from the runtime dist folder (`./src/react-apps/applications/runtime/dist`) into the the wwwroot folder of runtime (`./src/AltinCore/Runtime/wwwroot/runtime`).
The `runtime.js` file should be placed under `/js/runtime.js` and the `runtime.css` is placed under `/css/runtime.css`

--> Reload the manual testing page and start new/run existing instance from there

### Pod is stuck in status ContainerCreating and has warning "Unable to mount volumes for pod XXX: timeout expired waiting for volumes to attach or mount for pod XXX"

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

### I got assigned to update altinn.studio with new kode
Prerequirements: you need build rights to our [release pipeline](https://dev.azure.com/brreg/altinn-studio/_release)
To deploy latest code to altinn.studio do the following:

* To start a new release go to [release pipeline](https://dev.azure.com/brreg/altinn-studio/_release)
* Locate and click on `Deploy to production`
* Click `Create a new release`
* Select versions of the different solutions to deploy (latest is preselected)
* Click on `Create`
* A green info message will appear with the link to the release just create, click on the link
* Click Deploy and select deploy multiple
* Select which of the pods to deploy and click `Deploy`

--> A deploy to production has been started use kubectl get pods -w on the altinn.studio cluster to see if pods are updated correctly

### multiple compilation errors for a newly generated app without form components
![Runtime-Compilation-Error ](runtime-compilation-error.png?width=150)

Two different causes have resulted in this error. 

The first cause and resolution of the .NET code not compiling is that the incorrect version of the SDK is being used. Either the wrong version is installed, or the project is referencing the SDK in your user directory rather than the one installed in program files.

There are two steps to solving this issue

1. Make sure you have the following versions of the .NET SDK and Runtime installed:
    - Runtime 2.1.0
    - SDK 2.1.300
2. Ensure that the path of all .NET Core references in the Visual Studio solution are in the `C:\Program Files\dotnet` directory. 
This can be checked by going to Dependencies -> NuGet / SDK for each project in the AltinnCore solution. If this is not the case, remove the reference and re-install it using NuGet package manager or a tool of your own choice.

The second cause and resolution of the .NET code not compiling is that the application user in Altinn Studio has a hyphen in it's username. The username is included as a part of the namespace for all code files related to the project, and .NET does not accept hyphens in namespace declarations. The solution is to create an organization under the application user and creating the application with the organization as the app owner. 

### I try to pull master from github and get error "Cannot lock ref"

This happens from time to time, still unsure why. To fix it run the command:

`git gc --prune=now`