---
draft: true
title: Payment
description: Payment is a process step that allows users to pay for services or fees in the app.
weight: 20
tags: [needsReview]
---

## Payment in Altinn Studio

Payment is a process step you can add to your app when users need to pay fees or other charges. In this article, we explain how payment works, what is stored, and which payment providers you can use.

### How Does Payment Work?

When the user reaches the payment step in the app, the following happens:

1. The app redirects the user to an external payment provider
2. The user completes the payment at the payment provider
3. The app returns the user to the service when the payment is completed

<object data="payment.drawio.svg" type="image/svg+xml" style="width: 100%;"></object>

### What Is Stored About the Payment?

The app stores the order basis and details about the payment in a data element as JSON (paymentInformation.json). You can download this information via API after the user has submitted the form. The app also generates a PDF receipt.

As a service owner, you must handle the storage of payment information in accordance with the Norwegian Bookkeeping Act (bokføringsloven).

### Nets Easy

Support for Nets Easy as a payment provider comes with the application. You can find a guide for setting up Nets Easy [here](/en/altinn-studio/v8/guides/development/payment/).

To use Nets Easy, the service owner must have an agreement with Nets Easy. You can find information about how to create the agreement here:
[payments.nets.eu](https://payments.nets.eu/en-GB/checkout).

### Multiple Payment Providers

You can add multiple payment providers using custom backend code. Multiple payment providers can be used side by side in the same service. Get in touch if this is relevant for you.
