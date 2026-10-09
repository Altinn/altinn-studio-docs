---
draft: true
title: "ALTINNAPP0800: tjenesteeier mangler nødvendig autorisasjon"
description: "policy.xml gir ikke apporganisasjonen rettighetene appen bruker på egne vegne"
weight: 80
---

Denne diagnostikken meldes når `config/authorization/policy.xml` ikke gir
apporganisasjonen (org) de handlingene appen utfører mot Storage som tjenesteeier.

Appen leser og skriver instansdata som tjenesteeier når den flytter prosessen videre, ikke
som sluttbruker. Storage autoriserer de kallene mot appens egen policy, med `urn:altinn:org`
som subjekt.
En policy som bare gir sluttbrukeren rettigheter — den vanlige formen i v8 — gjør at appen
ikke får flyttet sin egen prosess videre. Feilen viser seg ellers først når en innbygger
sender inn.

Apporganisasjonen trenger alltid `read` og `write`. I tillegg trenger den `complete` der en
systemoppgave markerer instansen som fullført, og `delete` der instansen slettes ved
prosessens slutt. Den trenger ingen handling knyttet til en oppgavetype, som `confirm`,
`reject` eller navnet på en egendefinert oppgavetype: Storage lar alltid apporganisasjonen
lagre en prosessovergang.

Kategori `Authorization`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi handlingene til org-subjektet i `config/authorization/policy.xml`, eller kjør
oppgraderingen fra v8 til v9, som setter inn regelen.

Se [regelbiblioteket]({{< relref "/altinn-studio/v9/develop-a-service/reference/configuration/authorization/rules" >}}) for hvordan du skriver en regel for org-subjektet.
