---
title: Assistant
description: How to use the AI assistant in Studio
hidden: true
---

{{% notice info %}}
The assistant is in closed beta and only available to a few service owners. Would your organisation like to join the beta too? [Contact us](https://altinn.studio/info/contact).
{{% /notice %}}

The assistant is an AI agent that can help you build apps in Altinn Studio. Among other things, it can help you

- generate an app from an existing PDF form
- translate the app into other languages
- set up dynamic visibility of elements
- find and fix errors in the app

Give it an instruction and enable **Tillat endringer i appen** to get started. The assistant has access to the Studio documentation and can also answer questions about form setup, access control and other features in the tool.

{{% notice warning %}}
The assistant is specially adapted for Altinn and app development, and is not suited to other uses. It can give answers that are not always precise, so always check the changes before you publish the app.
{{% /notice %}}

## Asking questions

When **Tillat endringer i appen** is off, the assistant works as a chatbot and answers based on the Altinn documentation.

## Changing the app

When **Tillat endringer i appen** is on, the assistant makes changes to the app based on your instructions. The clearer your instructions are, the better the result.

The assistant saves all changes to a separate branch. You must merge the branch into the `master` branch before you can publish the changes. Read more about [how to work with branches in Altinn Studio]({{< relref "../branching" >}}).

## Threads

Threads let you start new conversations without context from old messages. We recommend using one thread per topic and creating new threads often. Inactive threads are deleted automatically after 90 days.

## Privacy

Do not send personal or sensitive information to the assistant. We store messages for 90 days and use the data to debug and improve the assistant. We also use it for billing, but not to train AI models.

## Data and AI models

The assistant uses language models through Microsoft Azure. During the beta, the data may be processed outside the EU. We will move to processing strictly within the EU during the beta period.

## Cost

The assistant is free to use during the closed beta. Afterwards, use may incur costs for service owners.

## Give feedback

We would like to hear what you think. Use the feedback feature under each assistant message to tell us how it works for you. Do you have a suggestion for improvement? Create an issue in the [altinn-studio repository on GitHub](https://github.com/Altinn/altinn-studio/issues).
