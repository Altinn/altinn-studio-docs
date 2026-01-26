---
draft: false
title: Prefill
description: Prefill allows you to fill in forms with data that already exists.
weight: 40
tags: [needsReview]
---

## Prefill in Altinn Studio

Prefill allows you to offer the user a form with fields that are already filled in with relevant information. In this article, we explain what prefill is, why it is useful, and how you can set it up.

### What Is Prefill?

With prefill, you can automatically fill in form fields with information that is already available. This saves the user time and reduces errors.

**Example:**
The tax return is prefilled every year with data from the Norwegian Tax Administration. The user therefore does not need to fill in information that the recipient already has. The purpose then becomes to ask the user to confirm the information, or possibly change it if it is incorrect.

<!--Det er viktig å alltid gjøre en vurdering av hvilke data som skal innhentes i et skjema, og om man har hjemmel til
å hente inn disse dataene. All data som hentes inn skal ha et formål.
> TODO: Få en jurist til å skrive noen linjer om hva som gjelder her mtp forhåndsutfylling.-->

### How Do You Set Up Prefill?

In Altinn Studio there are several ways to set up prefill:

#### 1. Via Configuration
For certain data from the National Population Register, the Central Coordinating Register for Legal Entities or the user's Altinn profile, you can set up prefill via configuration. This is the easiest way.

#### 2. Via External APIs
You can fetch data that is available via external APIs during start-up of an instance of the app. You then add this data to the form via code.

#### 3. At Start-Up via API
If you start an instance of an app via API, you can send (completely or partially) prefilled form data as a starting point.
