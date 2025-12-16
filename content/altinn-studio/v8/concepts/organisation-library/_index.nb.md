---
title: Organisasjonsbibliotek
description: Hva er organisasjonsbiblioteket og bibliotekselementer?
weight: 10
---

Organisasjonsbiblioteket i Altinn Studio Designer er et lager for deling av ressurser som kan brukes av flere Altinn-applikasjoner. Vi kaller disse ressursene bibliotekselementer.

## Publiserte bibliotekselementer

Når et bibliotekselement blir publisert, kan det brukes i Altinn-applikasjoner.
Det blir da tilgjengelig gjennom en åpen adresse på internett.

Publiserte bibliotekselementer bruker sekvensiell versjonering. Det vil si at første versjon er `1`, andre versjon er `2` og så videre. Det er også mulig å referere til nyeste versjon uten å spesifisere hvilket nummer den har.
Dette er for å støtte to brukstilfeller:

* Låse en versjon - for å sikre at applikasjonen ikke endres når en ny versjon publiseres.
* Bruke den nyeste versjonen. Ved å bruke "latest"-versjonen vil applikasjonen automatisk hente det oppdaterte elementet uten at applikasjonen må omdistribueres.

### Når bør du bruke et publisert bibliotekselement?

Hvis du vil gjenbruke et element mellom flere applikasjoner, er publiserte bibliotekselementer den foretrukne løsningen.

Hvis du ønsker at applikasjonen skal oppdateres automatisk når du oppdaterer et bibliotekselement, anbefaler vi å publisere elementet og henvise til den nyeste versjonen i applikasjonen.

Se undersidene for elementer som for øyeblikket støttes.

{{<children />}}