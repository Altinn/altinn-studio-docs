---
title: Custom senders for email and SMS
linktitle: Custom senders
description: "How to use custom senders in Altinn Notifications."
tags: [notifications, email, domain, DNS, SMS, sender]
weight: 40
---
{{% notice info %}}
**It is not necessary to use custom senders to send notifications through Altinn Notifications.**

If no other configuration exists, the following defaults apply:

* SMS sender: **Altinn** (**Altinn-test** for the test environment)
* Email sender: **noreply@altinn** (**noreply-tt02@altinn.no** for the test environment and **noreply@altinn.cloud** for the performance test environment)
{{% /notice %}}
 
## Using a custom sender for SMS

It is possible to send SMS with a custom sender by including the `sender` field in the `smsSettings` object in the API call for ordering notifications.

See the Bruno test [Fulfilling eForv. §8 - custom sender](https://github.com/Altinn/altinn-notifications/blob/main/test/bruno/v2%20(future)/create-notifications/fulfilling-eforv-paragraf8-custom-sender.bru) for usage examples.

### Important limitations and considerations for SMS senders

* The sender name is truncated to a maximum of 11 characters. For example, a `sender` value of "*Digitaliseringsdirektoratet*" will be shortened to "*Digitaliser*" as displayed on the user's phone.
* If the sender name is (or in the future becomes) protected by third-party products such as [SenderID](https://www.linkmobility.com/products/sms-sender-id), you must ensure that Altinn/Digitaliseringsdirektoratet is approved as a message producer.

## Using a custom domain as the email sender for Altinn Notifications

It is possible to send email with a custom sender by including the `senderEmailAddress` field in the `emailSettings` object in the API call for ordering notifications.

See the Bruno test [Fulfilling eForv. §8 - custom sender](https://github.com/Altinn/altinn-notifications/blob/main/test/bruno/v2%20(future)/create-notifications/fulfilling-eforv-paragraf8-custom-sender.bru) for usage examples.

Before a custom domain can be used as the sender address in API calls, it must go through several steps in a domain registration and verification process:

| Step | Action                                                        | Performed by  |
|------|---------------------------------------------------------------|---------------|
| 1    | Submit a request to register the domain/sender                | Service owner |
| 2    | Register the domain and issue verification keys               | Digdir        |
| 3    | Add DNS records (TXT, SPF, DKIM, DMARC)                       | Service owner |
| 4    | Verify DNS records and connect the domain                     | Digdir        |
| 5    | Use the domain in API calls                                   | Service owner |

### Submit a request to register the domain/sender

Send a support request to [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no) with information that you wish to use a custom sender for Altinn Notifications, and your desired sender address.

{{% notice info %}}
Access is granted to explicit addresses, *not* entire domains. You must specify the exact sender address you wish to use, for example `noreply@example.com`. It is possible to request multiple addresses.
{{% /notice %}}

### Add DNS records (TXT, SPF, DKIM, DMARC)

You will receive a **UUID** that must be added to the DNS configuration for the domain.

| Record | Type  | Name                                    | Value                                                 |                                                                                                                          |
|--------|-------|-----------------------------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
|        | TXT   |                                         | ms-domain-verification=**UUID**                       | *UUID* is unique per environment, so typically 2 records must be added here                                              |
| SPF    | TXT   |                                         | v=spf1 include:spf.protection.outlook.com -all        | Example — the actual configuration may vary based on existing configuration for other email providers                    |
| DKIM   | CNAME | selector1-azurecomm-prod-net._domainkey | selector1-azurecomm-prod-net._domainkey.azurecomm.net |                                                                                                                          |
| DKIM2  | CNAME | selector2-azurecomm-prod-net._domainkey | selector2-azurecomm-prod-net._domainkey.azurecomm.net |                                                                                                                          |

Consider setting up [DMARC](https://en.wikipedia.org/wiki/DMARC). If the domain already has a DMARC policy, verify that it is compatible with email sending from Altinn Notifications.

{{% notice info %}}
**Notify us once the DNS records have been added. Digdir must complete a validation process before the domain is connected and ready for use.**
{{% /notice %}}