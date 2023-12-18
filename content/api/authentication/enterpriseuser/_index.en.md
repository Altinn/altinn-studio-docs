---
title: Authentication with enterprise users
linktitle: Enterprise users
description: Description how to use enterprise users in Altinn 3
toc: true
weight: 100
---


## Overall description

Enterprise users is a concept where you can use a enterprise certificate 
in combination with a username and password.

Enterprise users must be assigned roles and / or rights
from the organization to which they belong, but the user can then use these
the rights in machine to machine communication with Altinn without that
someone in the business needs to be involved in authorization.

## Enterprise users in Altinn 3

Enterprise users in Altinn 3 can be used via regular business user login on Altinn.no with a certificate stored in a
browser but is most relevant in connection with API use.

This is done in a 2 step process. First you authenticate the organization using Maskinporten
and than you add username and password together

the machine port for the actual authentication of the certificate, as well as an exchange of the machine port token
together with the username and password.

Administration of Enterprise users is documented [here](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhetsbrukere/).

Login and exchange of tokens are documents here [here](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten)

Postman example can be found [here](https://github.com/Altinn/altinn-studio/blob/master/src/test/Postman/collections/Organization.postman_collection.json).

Further use against the Altinn App API and Platform API is similar to having an Altinn token based on an ID port session.


