---
draft: true
title: Styr tilgang til applikasjonen
linktitle: Tilgangsstyring
description: I Altinn Studio designer kan applikasjonsutvikleren definere policyen for applikasjonen som er opprettet
tags: [needsReview, needsTranslation, needsLinks]
---

Tilgangsstyring i en Altinn app gjøres via Altinn Autorisasjon.
Du kan sette opp et sett med regler som definerer:
- HVA det gis tilgang til
- HVILKE rettigheter tilgangen gir
- HVEM som skal få tilgang

Dette gir mulighet til å sette opp forskjellige tilganger i forskjellige deler av appen. For ekesmpel at den som har
tilgang til å fylle ut skjema, ikke skal ha tilgang til å signere (og at den som signerer ikke har tilgang til å redigere
feltene i skjema).

[Les mer om Altinn Autorisasjon](/nb/authorization/about).

Hvis du i tillegg ønsker å styre hvem som kan bruke appens API-er, kan du sette opp tilpassede API-scopes som
lar deg definere API-nivå klienttilgang til applikasjonens instans-relaterte API-er. I kombinasjon med Altinn Autorisasjon 
lar dette deg styre
- hvilke klienter (systemer) som skal få lov til å bruke appens API'er i det hele tatt, og
- hvilke brukere som får lov til å interagere med appen (gjelder både via API og i portal).

{{% expandlarge id="about-altinn-authorization" header="Detaljert konsept - Altinn Autorisasjon" %}}

{{% insert "content/authorization/about/detailed.nb.md" 0 %}}

{{% /expandlarge%}}

{{<children />}}
