---
hidden: true
---

If you wish to override the standard texts:

Add a [text resource file](/altinn-studio/reference/ux/texts/) under 'App/config/texts' for each language you want to support.

Here you define text resources to be used in communication with the user.

With the `CommunicationConfig` property on the provided signee in your implementation of the `ISigneeProvider` interface, 
you may **override** the content sent to the Altinn inbox, in addition to notifications sent the signer of a signing task.
You can name these whatever you want and connect them to `CommunicationConfig` in the next step (step 4).

Example of text resources for notifications with custom texts for email, as well as receipt:

```
{
  "id": "signing.correspondence_title_common",
  "value": "Task - Sign founding documents"
},
{
  "id": "signing.correspondence_summary_stifter_person",
  "value": "You have been added as a signer."
},
{
  "id": "signing.correspondence_summary_stifter_organisation",
  "value": "Organisjonen har blitt lagt til som signatar."
},
{
  "id": "signing.correspondence_body_stifter_person",
  "value": "You have been added as a signer for founding documents. <br /> $instanceUrl$ <br /><br />"
},
{
  "id": "signing.correspondence_body_stifter_organisation",
  "value": "Your organisation has been added as a signer for founding documents. <br /> $instanceUrl$ <br /><br />"
},
{
  "id": "signing.notification_content",
  "value": "Hello $correspondenceRecipientName$,\n\nYou have received founding documents for signing in Altinn. Log in to Altinn to sign the documents.\n\nBest regards,\nBrønnøysund Register Centre"
},
{
  "id": "signing.email_subject",
  "value": "Founding documents received for signing in Altinn. Go to Altinn inbox to sign."
},
```

Overriding the receipt is not possible on the signee level, but generally for all signees. Here the key of the text 
resources must match the following keys in order to take effect.

`signing.correspondence_receipt_title` - title
`signing.correspondence_receipt_summary` - summary
`signing.correspondence_receipt_body` - content

```
{
  "id": "signing.correspondence_receipt_title",
  "value": "Receipt: Signing of founding documents"
},
{
  "id": "signing.correspondence_receipt_summary",
  "value": "You have signed the founding documents"
},
{
  "id": "signing.correspondence_receipt_body",
  "value": "The documents you have signed are attached. These can be downloaded if desired. <br /><br />If you have any questions, contact the Brønnøysund Register Centre at phone 75 00 75 00."
},
```