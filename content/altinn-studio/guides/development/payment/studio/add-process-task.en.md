---
hidden: true
---
> The setup in this section is done from the Process page in the app editor. Navigate there by clicking on "Process"
> in the top menu while in the app editor.

- Add a payment task to the process by dragging a payment task from the left menu in the process editor, and dropping it
  in the process. The following configurations are automatically set up when you do this:
  - 2 new data types related to payment are added (one for data about the payment, one for the payment receipt).
  - A new layout set used in the payment task is added, with a page configured to show payment information in the payment task.
  - A new rule for access management is added to the apps policy - this rule needs to be configured later.
- Add a Gateway after the payment task
  - The gateway should have two outgoing sequence flows:
    - One pointing forwards in the process
    - One pointing backwards to the task _before_ payment
  - Add rules to determine _when_ the two sequence flows should be used.
    - Select the sequence flow going _forward_ in the process
      - In the panel on the right hand side, click "Add new logic rule". This automatically sets up a new rule with 
        the action "Reject" (`reject`) as a starting point.
      - Click "Change" and change the action from "Reject" to "Confirm". Click "Save and close" to save the rule.
    - Select the sequence flow going _back_ in the process. Repeat the steps above, but leave the rule as-is this time - 
      the action should be "Reject".

    
![Eksempel på en prosess med utfylling etterfulgt av betaling](/altinn-studio/guides/development/payment/process-data-payment.png "Eksempel på en prosess med utfylling etterfulgt av betaling")
