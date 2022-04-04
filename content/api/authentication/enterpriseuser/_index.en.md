---
title: Autentication with enterprise users
linktitle: Enterprise users
description: Description how to use enterprise users in Altinn 3
toc: true
weight: 100
--

## Overall description

Business users is a concept where you can use a business certificate in combination with a username / password.

This provides users who are associated with a business that may have delegated access management roles.

## Business users in Altinn 3

Business users in Altinn 3 can be used via regular business user login on Altinn.no with a certificate stored in a browser, but is most relevant in connection with API use.

This is done by combining the machine port for the actual authentication of the certificate, as well as an exchange of the machine port token together with the username / password.

Administration of business users is documented [here] (https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhetsbrukere/).

Login and exchange of tokens are documents here [here] (https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-maskinporten)

Postman example can be found [here] (https://github.com/Altinn/altinn-studio/blob/master/src/test/Postman/collections/Organization.postman_collection.json).

Further use against the Altinn App API and Platform API is similar to having an Altinn token based on an ID port session.



