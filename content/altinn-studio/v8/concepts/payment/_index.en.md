---
title: Payment
description: It is possible to configure user payment for services that are fee-based or where it is allowed to charge a fee.
weight: 10
---

Payment is a process step that can be added to the application.
When entering the payment step, the user is redirected to an external payment provider, and is returned to the service once the payment is completed.

The order details and payment information are stored in a data element as JSON (paymentInformation.json), and can be downloaded via API after the form is submitted. A PDF receipt is also generated. 
The service owner is responsible for handling the retention of payment information in accordance with the Norwegian bookkeeping laws (Bokføringsloven).

<object data="payment.drawio.svg" type="image/svg+xml" style="width: 100%;"></object>

## Nets Easy

Support for using Nets Easy as a payment provider comes with the application. Guidance on setting up Nets Easy can be found [here](/en/altinn-studio/v8/guides/development/payment/).

The service owner must have a Nets Easy agreement.
You can find information on how to create the agreement here: [payments.nets.eu](https://payments.nets.eu/en-GB/checkout).

## Additional Payment Processors

You can add more payment processors using custom backend code.
Multiple payment processors can be used side by side in the same service.
Contact us if this is relevant for you.