---
title: Deduplisering av kontaktpunkter
description: "Altinn Varsel dedupliserer automatisk kontaktpunkter på tvers av flere datakilder for å sikre at mottakere kun får ett varsel per mobilnummer eller e-postadresse. Denne artikkelen forklarer hvordan dedupliseringsmekanismen fungerer og hvilke prinsipper som ligger til grunn."
weight: 30
---

## Hvorfor deduplisering er nødvendig

Når Altinn Varsel sender varsler knyttet til en ressurs til organisasjonsnummer, henter systemet kontaktinformasjon fra flere kilder:

- **Varslingsadresser for virksomheter** - offisielle kontaktpunkter registrert av organisasjonen
- **Personlige kontaktdetaljer for virksomheter** - individuelle kontaktpunkter registrert av autoriserte brukere

Uten deduplisering ville den samme mottageren få flere identiske varsler, dersom kontaktinformasjonen er registrert i flere av disse kildene.

## Hvordan deduplisering fungerer

{{% notice warning  %}}
Dedupliseringen gjelder kun innenfor samme varsel (bestilling) og varslingskanal (SMS eller e-post).

Flere separate bestillinger av varsel til samme mottager vil gi tilsvarende flere separate varsel.
{{% /notice %}}

Dedupliseringen utføres under adresseoppslaget før varslene sendes. Prosessen følger disse trinnene:

1. **Innsamling** - kontaktpunkter hentes fra datakildene
2. **Normalisering** - alle kontaktpunkter standardiseres til sammenlignbare formater
3. **Sammenligning** - kontaktpunkter som vurderes som identiske, blir redusert til ett enkelt innslag
5. **Levering** - det endelige settet med unike kontaktpunkter brukes for varselutsendelse


### Formatnormalisering

Før sammenligning normaliseres kontaktpunktene for å håndtere ulike formater:

#### Mobilnumre
- Internasjonale formater blir standardisert (f.eks. `+4799999999`, `004799999999`, og `99999999` behandles som identiske)

#### E-postadresser
- Store og små bokstaver behandles som identiske (`eksempel-1@default.digdir.no` og `Eksempel-1@default.digdir.no`)