---
title: Hva får du?
linktitle: Hva får du?
description: Overordnet oversikt og bekrivelse av nøkkelfunksjonalitetene og egenskapene til Altinn Formidling
tags: []
toc: false
weight: 20
---

### Ende-til-ende filoverføringer
Altinn Formidling tilbyr ende-til-ende filoverføringer, fra opprettelse, sending, mottak til sporing av fileoverføringer. Dette sikrer at alle deler av overføringsflyten håndteres effektivt og sikkert. 
 
### Støtte for store payloads
Et særegent trekk ved Altinn Formidling er evnen til å håndtere store datamengder (payloads). Systemet støtter filoverføring på opptil hele 1600 GB uten virusskanning (inntil 2 GB med virusskanning). Dette er løsningen for deg som trenger å overføre store mengder informasjon effektivt og sikkert. 

### Sikkerhet
Bruk av sikkerhetsmekanismer som beskytter innholdet, finn mer informasjon i denne artikkelen [Azure Storage-tjenestekryptering](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption)

### Logging 
Altinn Formidling sørger for at alle hendelser og prosesser blir nøye loggført, slik at det er enkelt å etterprøve hvem som har gjort hva og når.

### Varsling
- Automatisk varsling via e-post eller SMS til mottakere.
- Re-varsling etter 7 dager dersom filen ikke blir åpnet. 
- Tilpassede varslingsinnstillinger basert på brukerpreferanser. Dette innebærer varslingsmaler og egendefinerte varslingsadresser.

### Events (hendelsesabonnementer)
Du kan motta varsler om hendelser knyttet til sendte formidlingstjenester, ved å sette opp et abonnement for den aktuelle tjenesten. Du kan for eksempel se om filen er kommet frem til mottaker og om den er åpnet. 

### Tilgangsstyring
Systemet tilbyr avansert tilgangsstyring, slik at du kan være trygg på at kun autoriserte brukere får tilgang til bestemte filoverføringer.

### Støtte for ulike filformater 
Løsningen er fleksibel og støtter både strukturerte og ustrukturerte filer. Dette gjør det mulig å tilpasse løsningen til en rekke forskjellige bruksområder og dataformater. 

### Tilgjengelighet 
Avsender bestemmer hvor lenge filen vil kunne lastes ned av mottaker. Etter denne perioden vil filen bli utilgjengelig. 
- 'PurgeFileTransferAfterAllRecipientsConfirmed': Om filen slettes når alle mottakere har bekreftet.
- 'PurgeFileTransferGracePeriod': Hvis feltet over er "true", så sier dette parametret hvor lenge det skal være mulig å laste ned filen (default er 2 timer, maks er 24 timer).
- 'FileTransferTimeToLive': Hvor lenge en fil er tilgjengelig for nedlastning (default er 30 dager, maks er ett år).

### API-tilgang
Både avsender og mottaker får tilgang til alle funksjoner via API-er. Dette gir mulighet til å integrere Altinn Formidling i egne systemer, slik at du kan automatisere dine prosesser.

### Integrasjoner og sky-støtte 
Altinn Formidling søker å tilby mest mulig standardiserte integrasjoner mot andre fellesløsninger, noe som letter integrasjonen med eksisterende systemer. Løsningen tilbyr også mellomlagring for å håndtere store datamengder. Løsningen kan konfigureres til å bruke egen skyløsning for lagring, dersom dere har krav om dette. 

### Oversikt over eget forbruk
Altinn Formidling benytter Azure sky-løsning, som gir deg muligheten til å overvåke eget forbruk av skyressurser. Dette inkluderer overvåkning av databruk, prosesseringskapasitet, lagring og andre relevante ressurser. Dette sikrer at du holder seg innenfor budsjetterte rammer og kan optimalisere bruken av skyressurser for bedre kostnadseffektivitet.  
 

## Produktfunksjonalitet

Følgende diagram viser hovedfunksjonene som brukerhistorier på høyt nivå (epos).

![Høy-nivå brukerbehov for styrt filoverføring](high-level-user-needs-for-managed-file-transfer.nb.png "Høy-nivå brukerbehov for styrt filoverføring")

Eksempler på hvordan lese diagrammet:

* Som tjenesteeier trenger jeg (evnen til) å legge til rette for sikre og 
  brukervennlige løsninger for overføring av store filer.
* Som avsender trenger jeg (evnen til) å sende store filer til en eller flere mottakere.