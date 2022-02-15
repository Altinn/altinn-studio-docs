---
title: Receipt
description: The Receipt component in Altinn Platform presents a receipt for apps.
tags: [platform, register]
---

The Receipt component is built to present receipt for all apps. Since apps over time will be removed from Altinn Apps,
but the data will live forever, the Receipt component is responsible for presenting a generic receipt view.

The texts in the Receipt component can be overridden by the application by specifying the texts in the applications `config/texts/resource.xx.json` file.


{{%notice info%}}
Overriding any text in the receipt will have an effect on any receipt for the given application. This means that forms that are already submitted will also get the updated texts on the receipt. The PDF on the other hand will NOT get the updates, and will remain with the texts that were present when the PDF was generated.
{{% /notice%}}


These are the text id's that can be used to override the default platform texts:

```
receipt_platform.attachments
receipt_platform.date_sent
receipt_platform.helper_text
receipt_platform.is_sent
receipt_platform.receipt
receipt_platform.receiver
receipt_platform.reference_number
receipt_platform.sender
receipt_platform.sent_content

```

For example if you want to change the help text, you can add this to the `config/texts/resource.en.json` file in your application:

```json
{
  "language": "en",
  "resources": [
    {
      "id": "receipt_platform.helper_text",
      "value": "My custom help text"
    }
  ]
}
```
