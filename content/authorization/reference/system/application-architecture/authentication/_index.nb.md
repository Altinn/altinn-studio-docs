---
title: Authentication
linktitle: Authentication
description: Applikasjonsarkitekturen og hoved-API-ene i Altinn Authentication.
weight: 1
toc: true
---

Authentication håndterer nettleserbasert innlogging, tokenutveksling og System User. Skissen viser hoved-API-ene, de viktigste applikasjonstjenestene og grensene mot kjernelogikk, integrasjoner og lagring.

Klikk på en blå API-boks for å åpne controlleren på GitHub. De grønne tjenesteboksene lenker til sentrale applikasjonstjenester.

<object data="authentication-application.svg" type="image/svg+xml" aria-label="Applikasjonsarkitektur for Authentication med klikkbare lenker til kildekoden" style="width:100%;height:auto;min-height:760px;display:block;"></object>

## Hovedområder

- **Identitet og token** håndterer innlogging, OIDC, tokenutveksling, introspeksjon, utlogging og selvregistrerte brukere.
- **Systemregister** beskriver systemene som systemleverandører tilbyr.
- **System User** håndterer forespørsler, godkjenning, endringer og klientdelegering.
- **Felles lag** inneholder domenemodeller, integrasjoner og persistens som API-ene bruker.

Skissen viser logiske kodegrenser. Boksene representerer ikke nødvendigvis egne prosesser eller deploybare enheter.

Les mer om [arkitekturmønstrene i komponenten](./patterns/).
