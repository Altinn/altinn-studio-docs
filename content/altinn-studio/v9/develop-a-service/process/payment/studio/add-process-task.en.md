---
draft: true
hidden: true
tags: [Reviewed]
---

> You do the setup in this section on the **Prosess** page in Altinn Studio. Click **Prosess** in the top menu to get there.

### 1. Add a payment task

Add a payment task by dragging **Lag betalingsoppgave** from the menu on the left into the process.

Altinn Studio then automatically adds

- two data types for payment (one for payment data and one for the payment receipt)
- pages for the payment task, with one page already set up
- an access rule for the payment task, which you set up in the step 'Authorise the payer and the service owner'

### 2. Add a gateway after the payment task

The gateway must have two arrows (sequence flows) going out:

- One pointing forward in the process.
- One pointing back to the previous task in the process (before payment).

### 3. Set up rules for the arrows out of the gateway

**For the arrow going forward:**

1. Click the arrow going _forward_ in the process.
2. In the panel on the right, click **Lag en ny logikkregel**. The rule starts with the action **Avvise** (`reject`).
3. Click **Endre**, and change the action from **Avvise** to **Bekrefte**.
4. Click **Lagre og lukk** to save the rule.

**For the arrow going back:**

1. Click the arrow going _back_ in the process.
2. Repeat the steps above, but do not change the action. It should be **Avvise**.

![Process with the tasks Utfylling and Betaling, and a gateway that either continues to the end or goes back to Utfylling](./process-data-payment.png "Process with payment")
