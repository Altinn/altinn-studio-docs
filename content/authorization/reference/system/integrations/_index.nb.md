---
title: Integrasjoner og avhengigheter
linktitle: Integrasjoner
description: Systemgrenser mot andre Altinn-team, fellesløsninger og datakilder.
weight: 6
toc: true
---

Denne siden beskriver hvorfor avhengighetene finnes og hvilken tillit som krysser systemgrensen. Den beskriver ikke hvordan eksterne konsumenter setter opp en integrasjon.

| Avhengighet | Bruk i systemet | Eierskap og grense |
|---|---|---|
| ID-porten | Identitetskontroll for interaktive brukere | Ekstern fellesløsning; Authentication er relying party |
| Maskinporten | Autentisering av virksomheter og klientsystemer | Ekstern fellesløsning; klientadministrasjon eies ikke av teamet |
| Altinn Access Token | Plattformens tokenformat/-tjeneste i relevante flyter | Eies av Team Platform |
| Altinn Studio/Apps | Policyadministrasjon og PEP nær appen | Andre komponent- og teameierskap; Authorization leverer beslutningsfunksjon |
| Eksterne rolle- og registerkilder | Grunnlag for part, roller, vergemål og representasjon | Data importeres eller slås opp; kildeautoritet ligger utenfor systemet |
| PostgreSQL | Persistens for flere autorisasjonskomponenter og Audit Log | Eget skjema og livssyklus per komponent må respekteres |
| Azure Storage Queue | Asynkron transport av audit-hendelser | Levering, duplikater og feilhåndtering må håndteres eksplisitt |

## Tillit til tokens

Et token er ikke i seg selv en autorisasjonsbeslutning. Authentication validerer beviset og etablerer identitetskontekst. Authorization kombinerer deretter identiteten med representasjon, ressurs, rettigheter og policy.

## Eierskap ved endringer

Endringer i kontrakter over en systemgrense må avklares med eier av den andre siden. Særlig gjelder dette token-claims, partsidentifikatorer, ressursidentifikatorer, hendelsesformater og semantikken i beslutningsforespørsler.
