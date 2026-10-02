---
title: Integrere Altinn-app med Varsling
linktitle: Varsling
description: Slik publiserer du varsler til brukere fra en Altinn-app.
draft: true
weight: 110
toc: true
tags: [needsReview]
---

En app kan varsle brukerne gjennom [Altinn Varsling](/nb/notifications), på to måter:

- Du ber om varsel i selve instansieringsforespørselen. Da varsler Altinn instanseieren når appen oppretter instansen, og du trenger ingen egen kode i appen.
- Du bestiller varsler fra appkoden. `Altinn.App.Core` har ferdigbygde grensesnitt for e-post og SMS.

{{<children />}}
