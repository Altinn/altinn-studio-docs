---
title: Organisasjonsbibliotek
description: Hva er Altinn 3 bibliotekselementer?
weight: 10
---

Altinn Studio Designer organisasjonsbibliotek er et lager for publisering av ressurser som kan brukes av flere Altinn-applikasjoner. De publiserte ressursene
omtales som bibliotekselementer.

## Bibliotekselementer

Et bibliotekselement er et element som publiseres ved hjelp av Altinn Studio Designer organisasjonsbibliotek for å kunne brukes i Altinn-applikasjoner.
Elementene lagres i organisasjonsbiblioteket sitt repository og publiseres til tjenesteeierens område i Altinn Studio Designer organisasjonsbibliotek.

Bibliotekselementer bruker sekvensiell versjonering i tillegg til en "latest"-versjon.
Dette er for å støtte to brukstilfeller:

* Låse en versjon - for å sikre at applikasjonen ikke endres når en ny versjon publiseres.
* Bruke den nyeste versjonen. Ved å bruke "latest"-versjonen vil applikasjonens kjøretid automatisk hente det oppdaterte elementet uten at applikasjonen må omdistribueres.

### Når bør du bruke et bibliotekselement?

Hvis du vil gjenbruke et element mellom flere applikasjoner, er bibliotekselementer den foretrukne løsningen.

Hvis du vil håndtere et elements versjonering uavhengig av selve applikasjonen og foretrekker å publisere en ny versjon fremfor å omdistribuere applikasjonen, kan bruk av organisasjonsbiblioteket
med "latest"-versjonen i applikasjonen være noe å vurdere.

Se undersidene for elementer som for øyeblikket støttes i Altinn Studio Designer organisasjonsbibliotek.

{{<children />}}