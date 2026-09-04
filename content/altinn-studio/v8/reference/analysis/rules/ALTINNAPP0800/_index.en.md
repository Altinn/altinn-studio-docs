---
title: "ALTINNAPP0800: tjenesteeier mangler nødvendig autorisasjon"
tags: [needstranslation]
description: "policy.xml gir ikke apporganisasjonen rettighetene appen bruker på egne vegne"
weight: 80
---

Denne diagnostikken meldes når `config/authorization/policy.xml` ikke gir
apporganisasjonen (org) de handlingene appen utfører mot Storage som tjenesteeier.

Appen lagrer instansdata og prosessoverganger som tjenesteeier, ikke som sluttbruker.
Storage autoriserer de kallene mot appens egen policy, med `urn:altinn:org` som subjekt.
En policy som bare gir sluttbrukeren rettigheter — den vanlige formen i v8 — gjør at appen
ikke får flyttet sin egen prosess videre. Feilen viser seg ellers først når en innbygger
sender inn.

Hvilke handlinger som kreves følger av oppgavetypene i prosessen: `write` for data,
`pay` eller `write` for betaling, `confirm` for bekreftelse, `sign` eller `write` for
signering, `complete` der en tjenesteoppgave markerer instansen som fullført, og `delete`
der instansen slettes ved prosessens slutt.

Kategori `Authorization`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi handlingene til org-subjektet i `config/authorization/policy.xml`, eller kjør
oppgraderingen fra v8 til v9, som setter inn regelen.

Se regelbiblioteket for hvordan en regel for org-subjektet skrives her: 
https://docs.altinn.studio/en/altinn-studio/v8/reference/configuration/authorization/rules/
