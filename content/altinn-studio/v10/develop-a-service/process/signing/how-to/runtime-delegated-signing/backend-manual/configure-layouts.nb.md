---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

1. Legg til en ny mappe under `App/ui` for signeringssteget. Kall den for eksempel `signing`.

2. I denne mappen legger du til en `layouts`-mappe og en `Settings.json`-fil.

3. Legg til en layout-fil kalt for eksempel `signing.json` i `layouts`-mappen.

   Mappestrukturen skal se slik ut:

   {{% insert "content/altinn-studio/v10/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/configure-layouts-code-01.en.md" %}}

4. Legg til innhold i layout-filen.

   Det finnes et sett med ferdige komponenter for å bygge opp layout for et signeringssteg. Vi anbefaler å bruke disse, men de er ikke obligatoriske:

   - **SigneeList**: Lister ut de som skal signere og tilhørende signeringsstatus. [Les om SigneeList-komponenten](/nb/altinn-studio/v10/reference/ux/components/signeelist/).
   - **SigningDocumentList**: Lister ut dataene som blir signert på, for eksempel vedlegg, xml-data eller PDF-oppsummering fra tidligere steg. [Les om SigningDocumentList-komponenten](/nb/altinn-studio/v10/reference/ux/components/signingdocumentlist/).
   - **SigningActions**: Sjekker status for signeringssteget og viser relevante knapper til sluttbruker, for eksempel **Signer**-knappen. [Les om SigningActions-komponenten](/nb/altinn-studio/v10/reference/ux/components/signingactions/).

   Hvis du ikke bruker `SigningActions` for å vise **Signer**-knappen, må du legge til en egen action button med action "sign" for å la sluttbruker signere.

   Eksempel på bruk av komponentene:

   {{% insert "content/altinn-studio/v10/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/configure-layouts-code-02.en.md" %}}

5. Oppdater filen `App/ui/layout-sets.json` med ny sidegruppe som har samme `id` som mappen du opprettet i steg 1.

   Den oppdaterte `layout-sets.json` kan se slik ut:

   {{% insert "content/altinn-studio/v10/develop-a-service/process/signing/how-to/runtime-delegated-signing/backend-manual/configure-layouts-code-03.en.md" %}}
