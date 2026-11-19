---
title: Sjekksum
linktitle: Sjekksum
description: Valgfri sjekksum når du initialiserer en filoverføring i Altinn Formidling.
tags: []
toc: false
weight: 40
---

Du kan sende med en valgfri sjekksum når du [initialiserer](/nb/broker/getting-started/developer-guides/send-files/#operation-initialize-filetransfer) filoverføringen. 

| JSON-felt | Påkrevd | Verdier |
| --- | --- | --- |
| `checksumAlgorithm` | Nei | `MD5` eller `SHA256`. Hvis du utelater feltet, bruker Broker `MD5`. |
| `checksum` | Nei | Heksadesimal sjekksum av filbytene, med små bokstaver. MD5 er 32 tegn, SHA256 er 64. Tom eller utelatt verdi betyr at Broker beregner sjekksummen etter opplasting. |

For form-data heter feltene `Metadata.Checksum` og `Metadata.ChecksumAlgorithm`, ved siden av fildelen `FileTransfer`.

Du kan utelate sjekksummen, eller sende den med.

**Utelat den.** Utelat `checksum`. Etter opplastingen beregner Broker sjekksummen og lagrer den på filoverføringen. [Oversikt](/nb/broker/getting-started/developer-guides/send-files/#operation-get-filetransfer-overview) og [detaljer](/nb/broker/getting-started/developer-guides/send-files/#operation-get-filetransfer-details) returnerer `checksum` og `checksumAlgorithm`. Både avsender og mottaker kan lese dem. [Bruno-eksemplene](https://github.com/Altinn/altinn-broker/blob/main/.bruno/collection.bru) `File Transfer\Initialize` og `File Transfer\Initialize and upload (form-data)` gjør dette, og Broker beregner SHA256:

```json
{
  "checksumAlgorithm": "SHA256"
}
```

**Send den med.** Ta med `checksum` for filen, sammen med algoritmen. Broker sammenligner den med den opplastede filen. Hvis den ikke stemmer, feiler overføringen og Broker sletter filen.
