---
headless: true
hidden: true
---

Legg til en ny mappe under `App/ui` for signeringssteget ditt. Kall den f.eks. `signing`.

I denne mappen, legg til en `layouts`-mappe og en `Settings.json`-fil.

Legg til en layout-fil kalt f.eks. `signing.json` i `layouts`-mappen.

Mappestrukturen skal se slik ut:

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts-code-01.en.md" %}}

Det finnes et sett med ferdige komponenter for å bygge opp layout for et signeringssteg. Vi anbefaler å bruke disse, men de er ikke obligatoriske.

- SigneeList:
  - Lister ut signatarer og tilhørende signeringsstatus. Les mer [her](/nb/altinn-studio/v8/reference/ux/components/signeelist/).
- SigningDocumentList:
  - Lister ut dataene som blir signert på. Feks. vedlegg, xml-data eller PDF-oppsummering fra tidligere steg. Les mer [her](/nb/altinn-studio/v8/reference/ux/components/signingdocumentlist/).
- SigningActions: 
  - Utleder status for signeringssteget og viser relevante knapper til sluttbruker, feks. "Signer"-knappen. Les mer [her](/nb/altinn-studio/v8/reference/ux/components/signingactions/).

Dersom du ikke benytter `SigningActions` for å vise "Signer"-knappen, så må du legge til en egen action button med action "sign", for å la sluttbruker signere. 

Eksempel på bruk av komponentene:

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts-code-02.en.md" %}}

Oppdater filen `App/ui/layout-sets.json` med ny sidegruppe, som har samme `id` som mappen du nettopp opprettet.

Din oppdaterte `layout-sets.json` kan se slik ut:

{{% insert "content/altinn-studio/v8/guides/development/signing/runtime-delegated-signing/backend-manual/configure-layouts-code-03.en.md" %}}