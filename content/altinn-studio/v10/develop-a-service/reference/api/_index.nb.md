---
title: API
description: Oversikt over API-er som apper i Altinn Studio kan eksponere og bruke
weight: 50
tags: [needsReview]
---

Apper i Altinn Studio er dokumentert med OpenAPI. Det finnes to varianter av OpenAPI-spesifikasjonen:

- **Generisk app-API** – eksponerer alle endepunkter uten hensyn til konkret konfigurasjon av appen.
- **App-spesifikk API** – eksponerer et redusert sett API-er, der flere er relevante fra sluttbrukersystemer (tilgjengelig siden v8.6).

Begge er tilgjengelige på URL-en:

`https://<org>.apps.<env>.altinn.no/<org>/<app>/swagger`

{{% notice info %}}
Noen API-er er ikke beskrevet i en OpenAPI-spesifikasjon. Disse er ment til intern bruk, og vi kan endre dem uten varsel.
{{% /notice %}}

{{<children />}}
