---
title: Actions
description:
tags: [altinn-apps, process, bpmn, gateway, action, acitons]
weight: 30
toc: false
---

Actions are used to define what a user can do in a task. Actions are defined in the process file (BPMN) and have authorization rules attached to them defined in the policy file (XACML) to controll who can execute them. 

We have two types of actions:
1. **Server actions**  
  Arbitrary code that can be executed on the server as part of the process. These actions are typically used to help the user fill out the form by prefilling data, perform calculations, call external api's etc. They will typically update the data model, return the updated model to the client and update the UI. You can also tell the client what to do after a successful execution, for instance navigate to the next page.
1. **Process actions**  
   Process actions are somewhat similar to server actions, but they will move the process to the next step on successful execution. We have a number of predefined process actions, like "write", "confirm", "sign" and "reject". You can also define your own process actions.

{{<children />}}   