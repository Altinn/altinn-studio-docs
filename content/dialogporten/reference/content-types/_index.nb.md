---
title: 'Innholdstyper'
description: 'Referanseinformasjon om innholdstypene for dialog og sending'
weight: 50
---

## Introduksjon

Nedenfor finner du attributtene for de forskjellige innholdstypene som kan angis i en dialog eller sendinger i den.

## Innholdstyper

For informasjon om hvordan du bruker disse, se [brukerhåndboken for å opprette dialoger](/nb/dialogporten/reference/content-types/../../user-guides/service-owners/creating-dialogs/).

### Tittel

| Attributt              |        Verdi |
| ---------------------- | ------------:|
| Feltnavn             |      `title` |
| Påkrevd               |          Ja |
| Maks lengde             |          255 |
| Tillatte formater        | `text/plain` |
| Brukes i liste?          |          Ja |
| Brukes i sendinger? |          Ja |

### Ikke-sensitiv tittel

| Attributt              |               Verdi |
| ---------------------- | -------------------:|
| Feltnavn             | `nonSensitiveTitle` |
| Påkrevd               |                  Nei |
| Maks lengde             |                 255 |
| Tillatte formater        |        `text/plain` |
| Brukes i liste?          |                 Ja |
| Brukes i sendinger? |                  Nei |

### Sammendrag

| Attributt              |        Verdi |
| ---------------------- | ------------:|
| Feltnavn             |    `summary` |
| Påkrevd               |          Ja |
| Maks lengde             |          255 |
| Tillatte formater        | `text/plain` |
| Brukes i liste?          |          Ja |
| Brukes i sendinger? |          Ja |

### Ikke-sensitivt sammendrag

| Attributt              |                 Verdi |
| ---------------------- | ---------------------:|
| Feltnavn             | `nonSensitiveSummary` |
| Påkrevd               |                    Nei |
| Maks lengde             |                   255 |
| Tillatte formater        |          `text/plain` |
| Brukes i liste?          |                   Ja |
| Brukes i sendinger? |                    Nei |

### Tilleggsinformasjon

| Attributt              |                         Verdi |
| ---------------------- | -----------------------------:|
| Feltnavn             |              `additionalInfo` |
| Påkrevd               |                            Nei |
| Maks lengde             |                          1023 |
| Tillatte formater        | `text/plain`, `text/markdown`{{<footnote "`text/html` is available for selected legacy systems">}} |
| Brukes i liste?          |                            Nei |
| Brukes i sendinger? |                            Nei |

{{<displayFootnotes>}}

### Avsendernavn

| Attributt              |        Verdi |
| ---------------------- | ------------:|
| Feltnavn             | `senderName` |
| Påkrevd               |           Nei |
| Maks lengde             |          255 |
| Tillatte formater        | `text/plain` |
| Brukes i liste?          |          Ja |
| Brukes i sendinger? |           Nei |

### Utvidet status

| Attributt              |            Verdi |
| ---------------------- | ----------------:|
| Feltnavn             | `extendedStatus` |
| Påkrevd               |               Nei |
| Maks lengde             |               20 |
| Tillatte formater        |     `text/plain` |
| Brukes i liste?          |              Ja |
| Brukes i sendinger? |               Nei |

### Innholdsreferanse

| Attributt              |                                                                   Verdi |
| ---------------------- | -----------------------------------------------------------------------:|
| Feltnavn             |    `mainContentReference`{{<footnote "Use `contentReference` in transmissions">}} |
| Påkrevd               |                                                                      Nei |
| Maks lengde             |                                                                     1023 |
| Tillatte formater        | `application/vnd.dialogporten.frontchannelembed-url;type=text/markdown`{{<footnote "`application/vnd.dialogporten.frontchannelembed-url;type=text/html` is supported for selected legacy systems.">}} |
| Brukes i liste?          |                                                                     Nei |
| Brukes i sendinger? |                                                                      Ja |

{{<displayFootnotes>}}