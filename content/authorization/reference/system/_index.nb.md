---
title: Systemdokumentasjon
linktitle: System
description: Teknisk dokumentasjon av hvordan Altinn Autorisasjon er bygd og hvordan komponentene virker sammen.
weight: 1
toc: false
---

Systemdokumentasjonen beskriver hvordan Altinn Autorisasjon er bygd. Målgruppen er utviklere og arkitekter i teamet, og andre som vil forstå løsningens oppbygning, ansvar og tekniske sammenhenger.

Dokumentasjonen handler om systemet, ikke om hvordan en systemleverandør eller tjenesteeier integrerer med Altinn. For integrasjon og bruk av API-er, se [kom i gang](/nb/authorization/getting-started/), [veiledninger](/nb/authorization/guides/) og [API-dokumentasjonen](/nb/api/).

## Systemet i én setning

Altinn Autorisasjon knytter sammen identitet, part, ressurs, rettighet og kontekst for å avgjøre om en handling er tillatt, og for å gjøre beslutningen etterprøvbar.

## Leseguide

- [Arkitektur](architecture/) beskriver systemkontekst, ansvar og overordnet oppbygning.
- [Applikasjonsarkitektur](application-architecture/) beskriver intern oppbygning, teknologier og dataeierskap.
- [Komponenter](components/) forklarer hva hver komponent eier og hvordan komponentene samarbeider.
- [Tekniske flyter](flows/) følger de viktigste kallene gjennom systemet.
- [Integrasjoner og avhengigheter](integrations/) beskriver systemgrensene mot andre Altinn-team og eksterne fellesløsninger.
- [Sikkerhet og tillit](security/) beskriver tillitsgrenser og sentrale sikkerhetsprinsipper.
- [Drift og observabilitet](operations/) beskriver runtime, hendelser og feilsøking på tvers av komponentene.

{{<children />}}
