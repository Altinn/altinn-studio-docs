---
draft: true
title: Payment
description: Payment is a process step that allows users to pay for services or fees in the app.
weight: 20
tags: [needsReview]
---

## Payment in Altinn Studio

Payment is a process step you can add to your app when users need to pay fees or other charges. In this article, we explain how payment works, what is stored, and which payment providers you can use.

### How does payment work?

When the user reaches the payment step in the app, the following happens:

1. The app redirects the user to an external payment provider
2. The user completes the payment at the payment provider
3. The app returns the user to the service when the payment is completed

<object data="payment.drawio.svg" type="image/svg+xml" style="width: 100%;"></object>

### What is stored about the payment?

The app stores the order basis and details about the payment in a JSON data element. You can download this information via API after the user has submitted the form. When the payment is completed, the app also creates a PDF receipt named `Betalingskvittering.pdf`.

As a service owner, you must handle the storage of payment information in accordance with the Norwegian Bookkeeping Act (bokføringsloven).

### Nets Easy

Support for Nets Easy as a payment provider comes with the application. See the [payment setup guide]({{< relref "../../../develop-a-service/process/payment" >}}).

To use Nets Easy, the service owner must have an agreement with Nets Easy. You can find information about how to create the agreement here:
[payments.nets.eu](https://payments.nets.eu/en-GB/checkout).

### Multiple payment providers

You can add multiple payment providers using custom backend code. Multiple payment providers can be used side by side in the same service. Get in touch if this is relevant for you.
