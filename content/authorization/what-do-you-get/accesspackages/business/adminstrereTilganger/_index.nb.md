---
title: Administrere tilganger
linktitle: Administrere tilganger
description: Dette fullmaktsområdet omfatter tilgangspakker knyttet til administrere tilganger.
toc: true
weight: 100
aliases:
  - /authorization/what-do-you-get/accessgroups/accessgroups/adminstreretilganger/
---

Dette fullmaktsområdet omfatter tilgangspakker knyttet til administrere tilganger.

| Tilgangspakke | Beskrivelse | URN | For tjenesteeiere | Innhold |
|---|---|---|---|---|
| Tilgangsstyrer | Gir mulighet til å gi videre tilganger for virksomheten som man selv har mottatt | `urn:altinn:accesspackage:tilgangsstyrer` | Nei | <a href="https://tjenesteoversikten.no/package/tilgangsstyrer" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Tilgangsstyrer">Se innhold ↗</a> |
| Tilgangsstyrer for enkeltmeldinger, -skjema og -dialoger | Gir tilgang til brukergrensesnitt i meldingsboksen, for å kunne gi andre brukere tilgang til enkeltmeldinger, -skjema og -dialoger, som mottakeren selv har tilgang til. | `urn:altinn:accesspackage:tilgangsstyring-enkeltinstanser` | Nei | <a href="https://tjenesteoversikten.no/package/tilgangsstyring-enkeltinstanser" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Tilgangsstyrer for enkeltmeldinger, -skjema og -dialoger">Se innhold ↗</a> |
| Klientadministrator | Gir mulighet til å administrere tilgang til tjenester videre til ansatte på vegne av deres kunder | `urn:altinn:accesspackage:klientadministrator` | Nei | <a href="https://tjenesteoversikten.no/package/klientadministrator" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Klientadministrator">Se innhold ↗</a> |
| Konkursbo administrator | Gir bruker mulighet til å administrere konkursbo | `urn:altinn:accesspackage:konkursbo-tilgangsstyrer` | Nei | <a href="https://tjenesteoversikten.no/package/konkursbo-tilgangsstyrer" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Konkursbo administrator">Se innhold ↗</a> |
| Hovedadministrator | Gir mulighet til å administrere alle tilganger for virksomheten | `urn:altinn:accesspackage:hovedadministrator` | Nei | <a href="https://tjenesteoversikten.no/package/hovedadministrator" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Hovedadministrator">Se innhold ↗</a> |
| Maskinporten administrator | Gir bruker mulighet til å administrere tilgang til maskinporten scopes | `urn:altinn:accesspackage:maskinporten-administrator` | Nei | <a href="https://tjenesteoversikten.no/package/maskinporten-administrator" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Maskinporten administrator">Se innhold ↗</a> |

Kilde: [Pakkedefinisjonene i Access Management](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs). Rollefordelingen er definert i [IngestRolePackage.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs).
