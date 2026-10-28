---
draft: true
title: Sende brukeren tilbake til en bestemt side
linktitle: Tilbakelenke (returnUrl)
description: Slik bruker du returnUrl til å bestemme hvor knappen Tilbake sender brukeren.
toc: true
tags: [needsReview]
---

Med parameteret `returnUrl` i adressen til appen bestemmer du hvor knappen **Tilbake** øverst i appen sender brukeren. Det er nyttig når brukeren kommer til appen fra en annen side og skal tilbake dit. Uten `returnUrl` sender knappen vanligvis brukeren til innboksen i Altinn.

## Regler for returnUrl

- Verdien må være base64-kodet.
- Den dekodede verdien må være en gyldig URL.
- Adressen må slutte på samme domene som miljøet appen kjører i, for eksempel `tt02.altinn.no` i testmiljøet.

Hvis verdien ikke følger reglene, ignorerer appen den uten å gi beskjed til brukeren. Knappen oppfører seg da som om `returnUrl` ikke var satt.

## Eksempel

Vil du sende brukeren til `https://ttd.apps.tt02.altinn.no/ttd/annen-app/`, base64-koder du adressen og URL-koder resultatet:

```
https://ttd.apps.tt02.altinn.no/ttd/min-app?returnUrl=aHR0cHM6Ly90dGQuYXBwcy50dDAyLmFsdGlubi5uby90dGQvYW5uZW4tYXBwLw%3D%3D
```
