---
title: 'Finne autoriserte parter'
description: 'Hvordan hente listen over parter som kan representeres'
weight: 15
toc: true
---

## Introduksjon

Dette viser hvordan du får en liste over [autoriserte parter]({{<relref "../../getting-started/authorization/parties#authorized-parties">}}) som den autentiserte brukeren kan representere.

## Grunnleggende trinn (REST)

1. [Autentiser som en sluttbruker]({{<relref "../authenticating#usage-for-end-user-systems">}})
2. Utfør en GET-forespørsel til `/api/v1/enduser/parties`

### Returnert informasjon

Datastrukturen som returneres består av alle partene som sluttbrukeren kan representere, som som et minimum vil inkludere dem selv. Dette inkluderer
* Navnet på parten (fullt navn for personer, eller organisasjonsnavn).
* Identifikatoren for parten, som kan brukes når du [søker etter dialoger]({{<relref "../searching-for-dialogs">}})
* Om parten er den nåværende brukeren
* Om brukeren har noen spesielle roller for parten

Merk at organisasjoner kan ha barn/foreldre-relasjoner (ett nivå). En sluttbruker kan ha tilgang til en underordnet organisasjon, men ikke dens forelder, men forelderen vil fortsatt være inkludert for visningsformål, men er flagget som kun tilstedeværende for å indikere hierarkiet.

Legg også merke til at slettede organisasjoner også vil bli inkludert. For fullstendige detaljer, se referanselenken nedenfor.

**Les mer**
* {{<link "../../reference/authorization/parties">}}
* {{<link "../searching-for-dialogs">}}

## Grunnleggende trinn (GraphQL)

{{<notyetwritten>}}

{{<children />}}