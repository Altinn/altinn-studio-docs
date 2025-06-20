---
title: API
description: Appene som man utvikler i Altinn Studio kan eksponere både standard og egendefinerte API-er, og benytte seg av API-er. Her er veiledninger på hvordan man gjør det.
weight: 50
---

Appens APIer er dokumentert med OpenAPI. Det finnes to varianter av OpenAPI spesifikasjonen:

Generisk app API - eksponerer alle endepunkter uten hensyn til konkret konfigurasjon av appen
App-spesifikk API - eksponerer redusert sett APIer, hvor flere av de er relevante fra sluttbrukersystemer

Begge to er tilgjengelige på URL:

`https://<org>.apps.<env>.altinn.no/<org>/<app>/swagger`

{{% notice info %}}
Det finnes APIer som ikke er beskrevet i en OpenAPI spesifikasjon. Disse kan være ment til internt bruk og vi 
kan derfor gjøre ukommuniserte endringer på disse etter behov.
{{% /notice %}}

{{<children />}}
