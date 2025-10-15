---
headless: true
hidden: true
---

If you wish to override the standard texts:

Add a [text resource file](/en/altinn-studio/v8/reference/ux/texts/) under 'App/config/texts' for each language you want to support.

Here you define text resources to be used in communication with the user.

With the `CommunicationConfig` property on the provided signee in your implementation of the `ISigneeProvider` interface, 
you may **override** the content sent to the Altinn inbox, in addition to notifications sent the signer of a signing task.
You can name these whatever you want and connect them to `CommunicationConfig` in the next step (step 4).

Example of text resources for notifications with custom texts for email, as well as receipt:

{{% notice warning %}}
Please note that the text resources related to the [correspondence](#correspondence) contains an `$instanceUrl$` placeholder.
This placeholder will be replaced with a link to the form instance, which is crucial in order for the user to access the correct form.
{{% /notice %}}

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources-code-01.en.md" %}}

Overriding the receipt is not possible on the signee level, but generally for all signees. Here the key of the text 
resources must match the following keys in order to take effect.

`signing.correspondence_receipt_title` - title
`signing.correspondence_receipt_summary` - summary
`signing.correspondence_receipt_body` - content

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/setup-text-resources-code-02.en.md" %}}