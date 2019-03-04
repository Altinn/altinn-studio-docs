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

When making changes to the react application for Runtime, these changes are not available when testing in Runtime even though the application has been built. 
This is because Runtime fetches the react-app directly from the service files. The react-app is copied over to the service repo when the service is created, but not after.
When making changes to the react application that affects Runtime, the bundle `react-app.js` must be manually copied over to the service folder each time it is built, in order to test changes in Runtime. To do this:

* Make any required changes in the ux-edior application
* Build the ux-editor application
  - Note that this is not done explicitly when running `gulp-develop` locally. To do this explicitly, navigate to the ux-editor folder and run
  
  ```bash
  npm run gulp-develop
  ```

  This will build the application in dev-mode, enabling redux dev tools.
  
* Copy `react-app.js` from the ux-editor `dist` folder into the service repo, replacing the old file
  - The old file is located in the `Resources` folder in the service repo. 
* Reload the manual testing page and start new/run existing instance from there
  - You can also copy the file directly into the Runtime copy of the service repo, located at `C:\AltinnRuntime`. This is useful if you already have a runtime instance up and running, then you can just refresh the page. NOTE that if you reload the ManualTesting page after this, all the files in the Runtime copy of the service repo will be overwritten with what's in the local service repo.