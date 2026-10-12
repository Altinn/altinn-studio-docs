---
draft: true
hidden: true
tags: [needsReview]
---

> You do the setup in this section on the **Arbeidsflyt** page in the app workspace. Go there by clicking **Arbeidsflyt** in the top menu.

### 1. Add a payment task

Add a payment task to the process by selecting the payment task in the menu on the left in the process editor and dragging it into the process.

Altinn Studio then sets up the following automatically:

- Altinn Studio adds two data types related to payment (one for data about the payment, one for the payment receipt).
- Altinn Studio adds pages for the payment task, with one page already set up.
- Altinn Studio adds a new access rule for the payment task. You must complete this rule later.

### 2. Add a gateway after the payment task

The gateway should have two outgoing sequence flows:

- One pointing forwards in the process.
- One pointing back to the previous task in the process (before payment).

### 3. Set up rules for the sequence flows

**For the sequence flow going forwards:**

1. Click the sequence flow going _forwards_ in the process.
2. In the panel on the right, click **Lag en ny logikkregel**. Altinn Studio then sets up the rule with the action **Avvise** (`reject`) as a starting point.
3. Click **Endre** and change the action from **Avvise** to **Bekrefte** (`confirm`).
4. Click **Lagre og lukk** to save the rule.

**For the sequence flow going back:**

1. Click the sequence flow going _back_ in the process.
2. Repeat the steps above, but this time keep the rule as Altinn Studio sets it up. The action should be **Avvise**.


![Example of a process with form filling followed by payment](./process-data-payment.png "Example of a process with form filling followed by payment")
