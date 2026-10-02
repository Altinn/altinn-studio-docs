---
title: "ALTINNAPP0002: feil i applicationmetadata.json"
tags: [needstranslation]
description: "applicationmetadata.json mangler, finnes i flere eksemplarer eller kan ikke leses"
weight: 2
---

Denne diagnostikken meldes når `applicationmetadata.json` ikke kan leses slik
analysen trenger den. Meldingen inneholder årsaken. Tilfellene som rapporteres er:

- filen finnes ikke (`No applicationmetadata.json file found`)
- filen finnes i flere eksemplarer (`Multiple applicationmetadata.json file found`)
- datamodellklassen som er oppgitt i filen finnes ikke i kompileringen
  (`Could not find class ... in the compilation`)

Strukturelle feil og ugyldig JSON rapporteres også her, og ikke av
deprecation-reglene, som er tause når filen ikke lar seg tolke.

Kategori `Metadata`, alvorlighetsgrad **advarsel**.

Rett filen slik at det finnes nøyaktig én `applicationmetadata.json`, at den er gyldig
JSON, og at klassen den viser til finnes i prosjektet.
