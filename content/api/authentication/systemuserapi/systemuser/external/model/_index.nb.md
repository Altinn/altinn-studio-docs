---
title: Modell for systembruker
linktitle: Modell
description: Modell for systembruker informasjon
toc: true
---
## Model

#### id
En unik identifikator generert av Altinn når systembrukeren blir opprettet.

#### integrationtitle
Et brukervennlig navn som leverandøren oppgir ved oppretting av systembrukeren. Hvis det opprettes via portalen, blir det automatisk satt til systemnavnet.

#### systemid
Den unike identifikatoren for systemet.

#### productname
Et brukervennlig navn gitt av leverandøren for systemet.

#### systeminternalid
En unik identifikator for systemet, generert av Altinn når systemet blir opprettet.

#### partyid
Partyid for organisasjonen som eier systembrukeren.

#### reporteeorgno
Organisasjonsnummeret til organisasjonen som eier systembrukeren.

#### created
Datoen systembrukeren ble opprettet.

#### isDeleted
Indikerer om systembrukeren er slettet. True betyr at brukeren er slettet, og False betyr at brukeren ikke er slettet.

#### suppliername
Navnet på systemleverandøren.

#### supplierorgno
Organisasjonsnummeret til systemleverandøren.

#### externalref
Dette er en valgfri referanse satt av leverandøren for systembrukerforespørselen. Hvis den ikke er oppgitt, vil den automatisk settes til partyOrgNo. Hvis den er spesifisert, må denne verdien brukes i token-forespørselen til Maskinporten.

#### usertype
Indikerer typen systembruker. Standardbrukere er typiske systembrukere, mens agentbrukere brukes for klientdelegasjon.

