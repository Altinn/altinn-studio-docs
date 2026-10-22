---
draft: true
title: Egenskaper og tekstnøkler for virusskanning
linktitle: Virusskanning
description: Oversikt over egenskapene og tekstnøklene som styrer virusskanning for vedlegg.
weight: 20
tags: [needsReview]
---

Du slår på virusskanning per datatype i filen `App/config/applicationmetadata.json`. Du finner fremgangsmåten i [Slik slår du på virusskanning]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/how-to/virusskanning" >}}).

## Egenskaper

| Egenskap                           | Hva den gjør                                                                                                           |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `enableFileScan`                   | Slår på virusskanning for datatypen. Finner skanningen virus før prosessen er ferdig, får brukeren en valideringsfeil. |
| `validationErrorOnPendingFileScan` | Gir en valideringsfeil så lenge skanningen ikke er ferdig. Brukeren kan da ikke sende inn før skanningen er ferdig.    |

## Tekstnøkler for feilmeldinger

Appen har ferdige meldinger på bokmål, nynorsk og engelsk. Vil du bruke egne tekster, legger du til en tekstressurs med riktig nøkkel:

| Situasjon                                                          | Tekstnøkkel                           |
| ------------------------------------------------------------------ | ------------------------------------- |
| Filen er infisert                                                  | `validation_errors.file_infected`     |
| Skanningen er ikke ferdig (med `validationErrorOnPendingFileScan`) | `validation_errors.file_scan_pending` |

Begge meldingene får filnavnet og datatypen som parametere.

{{% notice warning %}}
Nøklene har fått nye navn. I tidligere versjoner het de `DataElementFileInfected` og `DataElementFileScanPending`. De gamle navnene er fortsatt feilkodene i valideringsfeilene, men appen bruker dem ikke lenger som tekstnøkler. Har appen egne tekster med de gamle nøklene, må du bytte dem ut. Ellers viser appen standardmeldingene.
{{% /notice %}}
