---
draft: false
headless: true
hidden: true
---

You can use the default validator as mentioned in step 2. It verifies that the number of signatures meets at least the
`minCount` set in the data model configuration. Custom validation can be set up by implementing the `IValidator` or `ITaskValidator`
interface as described in [How to add custom validation](/en/altinn-studio/v10/reference/logic/validation/#server-side-validation).

Note that if you configure the app to execute the sign action on the process next call, the [action will be done before the validation](/en/altinn-studio/v10/reference/logic/validation/#server-side-validation).

A fictitious example is a validator which verifies that at minimum one signature is done on behalf of an organisation:

{{% insert "content/altinn-studio/v10/develop-a-service/flow/signing/runtime-delegated-signing/backend-manual/custom-validation-code.en.md" %}}
