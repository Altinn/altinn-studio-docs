---
title: Planer for modernisering og migrering av API i Altinn
linktitle: Flytte API
description: Siden er under konstruksjon - Her finner du foreløpig plan for hva som skjer med autorisasjons API i overgangen mellom Altinn 2 og Altinn 3. Planen vil bli endret underveis. 
toc: true
weight: 200
tags: [architecture, plan, authorizaton]

---
*Siden er under konstruksjon*

### Endringslogg



### Innledning
På disse sidene vil du finne oversikt over alle API-tjenestene knyttet til autorisering og autentisering som finnes i Altinn 2 i dag. 
Vi har delt API opp i to ulike brukergrupper og du finner migreringsstrategi for de ulike API-enedpunktene der: 
- Tjenester for sluttbrukersystem
- Tjenester for tjenesteeiere i Altinn
## Ulike migrerings strategier for ulike API
Som en hovedregel så vil alle eksisterende API i Altinn 2 fortsette å fungere så lenge Altinn 2 plattformen er i drift. 
Disse APIene vil som en hovedregel kun ha tilgang til informasjon fra Altinn 2 plattformen. Etterhvert som tjenesteeier flytter sine [ulike tjenester](/authorization/migration/servicemigrationplan/) ut fra Altinn 2, så vil det være begrenset om man 
får ut nødvendig informasjon fra APIene ettersom tjenestene forsvinner fra Altinn 2. 

For API finnes 2 hovedstrategier i overgang mellom Altinn 2 og Altinn 3:

1. API tjenesten videreføres ikke i den form den er og nye API  må tas i bruk når tjenester som system er avhengig av flyttes fra Altinn 2 til Altinn 3
2. Det tilbys proxy for Altinn 2 API-tjeneste som igjen kaller nye API i Altinn 3. Disse vil være tilgjengelig i en overgangsfase og slås av på senere tidspunkt. Disse APIene vil som en hovedregel kunne hente ut informasjon om tjenester fra både Altinn 2 eller Altinn 3 plattformen. Proxyer kan f eks kreve at konsument må åpne brannmurer eller endrer adresse for kall som gjøres mot API.


{{% notice warning %}}Noen nye API vil være forholdsvis enkelt å ta i bruk og vil kreve lite endring i systemer som bruker APIene. 
Men det vil også være tilfeller hvor nye API-tjenester endres mye og hvor det kreves større tilpasninger i systemer som konsumerer API.
I disse tilfellene vil vil beskrive hva endringene går ut på under beskrivelse av strategi for de ulike API-tjenestene.{{% /notice %}}

## SOAP tjenester videreføres ikke
Altinn 2 tilbyr i dag API på både SOAP og REST. Det er besluttet at man som en hovedregel ikke vil videreføre SOAP grensesnitt på Altinn 3 plattformen. 
Alle som i dag benytter SOAP må derfor forberede seg på at de er nødt til å gå over til REST. 

Vi anbefaler de som i dag benytter SOAP å vente med å ta i bruk REST til nye REST-API er tilgjengelig i Altinn 3.

## Autentisering via Maskinporten blir innført for alle API i Altinn 3
Alle REST-api i Altinn 3 vil benytte Maskinporten som autentiseringsmekanisme. Det vil ikke være mulig å benytte virksomhetssertifikatpålogging direkte mot Altinn 3 REST-api, slik man har mulighet til i Altinn 2.

## Hva skjer med REST api for Sluttbrukersystem?
Disse APIene kan benyttes for å integrere fagsystemer mot Altinn som benyttes hos sluttbrukere.
Disse fagsysteme kan typisk være regnskapssystem, HR system, landbrukssystem, post/arkiv system eller lignende. 

For å benytte disse APIene trengs en pålogget bruker som gir fagsystemet tilgang til å hente data på deres vegene i Altinn.
  [Her finner du migreringsplaner for sluttbrukersystem-API](/authorization/migration/api-migration/sbs-api/). 

## Hva skjer med REST api for Tjenesteeier?
Disse APIene kan kun benyttes av offentlige virksomheter som har avtale om bruk av Altinn. 

Det er tjenesteeier som autentiseres i kall mot API og kan hente ut informasjon om brukers fullmakter. 
Tjenesteeier kan kun hente ut informasjon om bruker som er nødvendig for å kunne utføre offentlig myndighetsutøvelse/tjenesteyting. 
  [Her finner du migreringsplaner for tjenesteeeier-API](/authorization/migration/api-migration/te-api/). 
  



