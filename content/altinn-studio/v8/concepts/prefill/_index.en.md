---
title: Prefill
description: What is prefilling of data?
weight: 10
---

Prefilling data allows you to provide the end user with a form where relevant fields are already populated with 
available data. 
An example of this concept is the Norwegian tax returns. Each year an individuals tax return is prefilled with 
all the details the Norwegian Tax Administration already have about the individual. The user can then review the 
information and either confirm or make necessary changes.

<!--Det er viktig å alltid gjøre en vurdering av hvilke data som skal innhentes i et skjema, og om man har hjemmel til
å hente inn disse dataene. All data som hentes inn skal ha et formål.
> TODO: Få en jurist til å skrive noen linjer om hva som gjelder her mtp forhåndsutfylling.-->


In Altinn Studio there are several ways to prefill a form.
- To show data from the National Population Register (DSF), the Central Coordinating Register (ER) or the users profile
  in Altinn, you can set up prefill via static configuration files.
- Data that is available via external API's can be fetched during startup of a new instance of an app, and added
  to the form via backend code.
- An app can be started directly via API's, and it is then possible to include (complete or partial) form data as part
  of the request. 
