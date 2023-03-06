---
title: Module 5
description: Add confirmation step
linktitle: Module 5
tags: [apps, training, process, policy, autorisasjon, confirmation, bekreftelsessteg, validering ]
weight: 20
---

In this module you are adding a process step in the application.

**Topics covered in this module:**
- Process
- Confirmation step
- Authorization rules
- Validation
- Replace standard texts

## Tasks

{{% expandlarge id="process_description" header="Expand process with a confirmation step" %}}

An Altinn App has a process flow that describes the different steps in the flow.
The standard flow for a newly created application consists of one task; one fill out step.

![Standard process flow illustrated](/app/app-dev-course/modul5/default-process.png)

Your task is to expand the standard process flow with a confirmation step as illustrated below.
The confirmation page is added automatically when the step is added to the BPMN file.

![Updated process flow illsutrated](/app/app-dev-course/modul5/updated-process.png)

{{% notice info %}}
[Standard process flow is available on GitHub](../../development/configuration/process).
Can you find the one that matches the flow we wish to achieve here?

If you want an extra challenge, you can edit the process flow manually or in a BPMN editor,
and rather use [the template on process flow with data and confirmation step](../../development/configuration/process/Data_Confirmation_Process.bpmn) as a solution.
{{% /notice %}} 

### Requirements from the municipality

At this point in the workflow, the user should be able to:
1. View an overview of the data entered
2. Exit the workflow without submitting the form
3. Exit the workflow and submit the form

### Useful documentation

- [Available process steps in an Altinn app](/app/development/configuration/process/#supported-process-task-types)
- [How to change the process flow of an application](/app/development/configuration/process/#change-the-process)
- [Online BMPN editor](https://demo.bpmn.io/)
- [BPMN standard](https://en.wikipedia.org/wiki/Business_Process_Model_and_Notation)

### Knowledge check
- Which Altinn-specific traits are on every process task?
- Which limitations would an external BPMN editor have when editing the process description of an Altinn app?
- Is it possible for the process flow to go both ways? From filling in to confirmation and from confirmation to filling in?
{{% /expandlarge %}}


{{% expandlarge id="authorization" header="Adding authorization rules for confirmation step" %}}

Your application's Policy file is adapted to a standard process flow.
Update the policy file so that it's authorization rules cover the new process step.

### Requirements from the municipality
- The same role requirements should apply to both fill out and confirm an instance.

### Useful documentation
- [Rule library](/app/development/configuration/authorization/rules/)
- [All roles in Altinn](https://www.altinn.no/en/help/forms/all-altinn-roles/)

### Knowledge check
- What will happen when the process flow proceeds to the confirmation step without the authorization rules being updated?
- What happens if you don't specify which roles are allowed to perform an action in an authorization rule?
{{% /expandlarge %}}

{{% expandlarge id="validation" header="Validation of submitter" %}}

### Requirements from the municipality
- It should only be possible for the user who owns the instance to submit the form, even if others may hold the necessary roles.

### Useful documentation
- [Custom validation](/app/development/logic/validation/#how-to-add-custom-validation)

### Knowledge check
- Which change would you suggest for the client to be able to meet this requirement without adding custom validation at this step?
{{% /expandlarge %}}


{{% expandlarge id="confirmation" header="Replace standard texts for confirmation page" %}}

### Requirements from the municipality

The user should be presented with the following text before submitting the form.

```rich
Du er nå klar for å sende inn melding om tilflytting til Sogndal kommune.

Ved å sende inn dette skjemaet samtykker du til at dataen du har fylt ut kan lagres og benyttes
til å tilpasse kommunens tilbud til deg de neste 18 månedene.

Før du sender inn vil vi anbefale å se over svarene dine. Du kan ikke endre svarene etter at du har sendt inn.
```

### Useful documentation
- [Customization of the confirmation page](/app/development/configuration/process/customize/#confirmation)

{{% /expandlarge %}}


## Summary

In this module you have expanded the application with a confirmation step, customized the view and implemented validation and authorization rules attached to the process step.

The service should be able to run on your local computer with local test
and you should be able to test the new process step and confirm that the view is as desired.

**Remember to _push_ your local changes, so that they are available in Altinn Studio when you're happy with them**

### Solution
If you did not manage to complete all the steps, we have an [example of a solution](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/5) that you can use as inspiration.

![Screenshot of confirmation page](/app/app-dev-course/modul5/bekreftelsesside-screenshot.png "Screenshot of confirmation page")