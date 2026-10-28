---
title: Integrasjoner
linktitle: Integrasjoner
description: Dette fullmaktsområdet omfatter tilgangspakker knyttet til integrasjoner.
toc: true
weight: 100
aliases:
  - /authorization/what-do-you-get/accessgroups/accessgroups/integrasjoner/
---

Dette fullmaktsområdet omfatter tilgangspakker knyttet til integrasjoner.

| Tilgangspakke | Beskrivelse | URN | For tjenesteeiere | Innhold |
|---|---|---|---|---|
| Delegerbare Maskinporten scopes | Denne tilgangspakken gir fullmakter til data og programmeringsgrensenitt (API) som benytter Maskinporten eller tilsvarende løsninger for APIsikring. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir. | `urn:altinn:accesspackage:maskinporten-scopes` | Ja | <a href="https://tjenesteoversikten.no/package/maskinporten-scopes" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Delegerbare Maskinporten scopes">Se innhold ↗</a> |
| Delegerbare Maskinporten scopes - NUF | Denne tilgangspakken gir fullmakter til data og programmeringsgrensenitt (API) som benytter Maskinporten eller tilsvarende løsninger for APIsikring på vegne av norskregistrerte utenlandske foretak (NUF). Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir. | `urn:altinn:accesspackage:maskinporten-scopes-nuf` | Ja | <a href="https://tjenesteoversikten.no/package/maskinporten-scopes-nuf" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Delegerbare Maskinporten scopes - NUF">Se innhold ↗</a> |
| Maskinlesbare hendelser | Denne tilgangspakken gir fullmakter til å administrere tilgang til maskinlesbare hendelser. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmakten gir. | `urn:altinn:accesspackage:maskinlesbare-hendelser` | Ja | <a href="https://tjenesteoversikten.no/package/maskinlesbare-hendelser" target="_blank" rel="noopener noreferrer" aria-label="Se innholdet i Tjenesteoversikten for Maskinlesbare hendelser">Se innhold ↗</a> |

Kilde: [Pakkedefinisjonene i Access Management](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Constants/PackageConstants.cs). Rollefordelingen er definert i [IngestRolePackage.cs](https://github.com/Altinn/altinn-authorization-tmp/blob/main/src/apps/Altinn.AccessManagement/src/Altinn.AccessMgmt.PersistenceEF/Data/IngestRolePackage.cs).
