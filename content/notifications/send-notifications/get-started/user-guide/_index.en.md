---
title: User guide
linktitle: User guide
weight: 10
description: "A user guide for the notification service"
---

{{% notice info %}}
We are working on providing you with new and updated guidelines on usage of Altinn Notifications. 
In the meantime existing guidelines for sending notifications through Altinn 2 also apply to Altinn Notifications. 


[Please familiarize yourself with existing documentation and guidelines](https://altinn.github.io/docs/utviklingsguider/varsling/)
{{% /notice %}}

## Notification
### SMS
- The mobile number must contain the country code, preferably with "+", while "00" would also work (e.g., +47900XXXXX, 0047900XXXXX).
- SMS to 5-digit numbers is not supported.
- Norwegian mobile numbers must start with "4" or "9" after the country code "+47."
  - Valid Mobile Number Examples: +47400XXXXX, +47900XXXXX, 0047400XXXXX, 0047900XXXXX.
  - Invalid Mobile Number Examples: +47500XXXXX, +47600XXXXX, 0047500XXXXX, 0047600XXXXX.

#### International Mobile Number
- We also support international mobile numbers (outside of Norway) to send SMS as long as they are valid and provided with a country code.
- Notifications to 5-digit numbers aren't supported. Therefore, the mobile number must be more than 5 digits.
- Country code in the mobile numbers undergo validation against a comprehensive list of country codes.

<!---
{{% notice info %}}
TODO: say something about "varsel" vs "melding" or "beskjed". Kan brukes til begge deler. 
What is important to think about ? 
{{% /notice %}}
 
### Communication with private persons
[Kontakt- og reservasjonsregisteret](https://eid.difi.no/nb/kontakt-og-reservasjonsregisteret) 
(the common contact register) is used to retrieve contact information when an organisation sends a notification 
through Altinn to a private person without providing the contact details to use. 

In using this register both Altinn, and the sender of the notification,
must adhere to [eForvaltningsforskriften §29](https://lovdata.no/forskrift/2004-06-25-988/§29). 

We have summarized some of the information here, but encourage you to familiarize yourself with 
[Digitaliseringsdirektoratet's guidelines for using the register](https://samarbeid.digdir.no/kontaktregisteret/retningslinjer-bruk-av-kontakt-og-reservasjonsregisteret/143). 


Altinn Notifications should be used to support the execution of your organisations public authority. Meaning the use 
should be linked to your organisation's _social mission_ and not for
commercial purposes, marketing, or any other use that can be considered as private law.

Altinn Notifications should be used when the message communicated in the notification contains 
information that is important for the subject to receive and/or is important for the sending organisation 
that the recipient receives.

### Communication with persons as an entity of an organisation 

### What should a notification include
Varselet bør inneholde:
- beskrivelse av oppgaven,
- konkret hva den gjelder,
- hvem som er ansvarlig/kan løse oppgaven
- informer gjerne også om frist for oppgaven
-->
