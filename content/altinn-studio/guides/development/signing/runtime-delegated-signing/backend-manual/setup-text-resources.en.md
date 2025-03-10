---
hidden: true
---

Add a [text resource file](/altinn-studio/reference/ux/texts/) under 'App/config/texts' for each language you want to support.

Here you define text resources to be used in communication with the user.

Text resource IDs for the signing flow are set up to **override** the content in messages sent to the Altinn inbox.

`signing.correspondence_cta_title` - title of notification message to signer </br>
`signing.correspondence_cta_summary` - subtitle of notification message to signer </br>
`signing.correspondence_cta_body` - content of notification message to signer

`signing.correspondence_receipt_title` - title of receipt message
`signing.correspondence_receipt_summary` - subtitle of receipt message
`signing.correspondence_receipt_body` - content of receipt message

You can also set up text resources to **override** the content in SMS and email sent to notify the signer of a signing task.
You can name these whatever you want and connect them to the notification implementation in the next step (step 4).

Example of text resources for notifications with custom texts for email, as well as receipt:

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
{
  "id": "signing.correspondence_cta_title",
  "value": "Task - Sign founding documents"
},
{
  "id": "signing.correspondence_cta_summary",
  "value": "You have been added as a signer."
},
{
  "id": "signing.correspondence_cta_body",
  "value": "You have been added as a signer for founding documents. <br /> $InstanceUrl <br /><br />"
},
{
  "id": "signing.notification_content",
  "value": "Hello {0},\n\nYou have received founding documents for signing in Altinn. Log in to Altinn to sign the documents.\n\nBest regards,\nBrønnøysund Register Centre"
},
{
  "id": "signing.email_subject",
  "value": "Founding documents received for signing in Altinn. Go to Altinn inbox to sign."
},
```
