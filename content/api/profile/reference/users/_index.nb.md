---
title: Brukere
description: Dette API-et gir tilgang til informasjon om brukere
weight: 50
---

## Datakilder
Profil-APIet kan ikke registrere en brukers folkeregistrerte adresse eller varslingsadresser. Dette gjøres i henholdsvis Folkeregisteret og Kontakt- og reservasjonsregisteret.
 Profil henter oppdateringer fra Kontakt- og reservasjonsregisteret hvert tiende minutt. Varslingsadressene blir deretter tilgjengelige for Altinns varslingskomponent.

## Brukerinnstillinger
En innlogget bruker kan endre innstillinger for visning i Altinns arbeidsflate, for eksempel språk og hvilke aktører som skal vises i aktørlisten.
API-et støtter både PUT (erstatter hele objektet) og PATCH (oppdaterer deler av objektet).

### Response model
```json
{
  "language": "nn",
  "preselectedPartyUuid": null,
  "doNotPromptForParty": true,
  "showClientUnits": false,
  "shouldShowSubEntities": true,
  "shouldShowDeletedEntities": false
}
```

* **language** (string) Brukerens språkvalg som en to-bokstavs kode. Gyldige alternativer: "no", "nn", "en".
* **preselectedPartyUuid** (GUID) Forhåndsvalgt aktør som partyUuid.
* **doNotPromptForParty** (bool) Et flagg for å indikere om brukeren skal bli spurt om aktør hver gang den starter utfylling av et nytt skjema.
* **showClientUnits** (bool) Et flagg for å indikere om klient-enheter skal vises i aktørlisten. Gjelder kun regnskapsførere og revisorer.
* **shouldShowSubEntities** (bool)  Et flagg for å indikere om underenheter skal vises i aktørlisten.
* **shouldShowDeletedEntities** (bool) Et flagg for å indikere om slettede enheter skal vises i aktørlisten.