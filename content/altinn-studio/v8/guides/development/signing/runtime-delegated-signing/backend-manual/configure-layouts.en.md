---
headless: true
hidden: true
---

Add a task layout folder under `App/ui` for your signing task. In the following examples, we will call this folder `signing`.

In the folder you created, add a `layouts` folder and a `Settings.json` file.

Add a new file called `signing.json` in the `layouts` folder.

The folder structure should look like this:

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts-code-01.en.md" %}}

There are standard components that can be used to build a layout set for a signing step. You are not required to use these components, but it's recommended.

- SigneeList:
  - Lists the signees and their signing status. Read more [here](/en/altinn-studio/v8/reference/ux/components/signeelist/).
- SigningDocumentList:
  - Lists the data being signed. For example attachments, xml-data or a PDF summary from an earlier step. Read more [here](/en/altinn-studio/v8/reference/ux/components/signingdocumentlist/).
- SigningActions: 
  - Determines the current status of the signing task and present relevant information and buttons to the end user, for instance the "Sign"-button. Read more [here](/en/altinn-studio/v8/reference/ux/components/signingactions/).

If you choose not to use the `SigningActions` to display the "Sign"-button, you must as a minimum add an action button with action `sign`, to allow the end user to sign.

Example of usage of the standard components:

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts-code-02.en.md" %}}

Update `App/ui/layout-sets.json` with the `id` of the task folder you just created.

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts-code-03.en.md" %}}