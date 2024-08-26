---
title: Forhåndsutfylling av data med konfigurasjon
linktitle: Konfigurasjon
description: Hvordan sette opp forhåndsutfylling av data via konfigurasjonsfil.
toc: false
weight: 200
---

Ved bruk av kun konfigurasjon støtter Altinn apps prefill med data fra Enhetsregisteret, Folkeregisteret og 
brukerprofil i Altinn.

Ved å følge beskrivelsen nedenfor vil man under oppstart av et eksemplar av skjema forhåndsutfylle datamodellen med
de definerte verdiene hentet fra Altinns database.

## Oppsett av forhåndsutfylling i appens repository

Opprett en ny json-fil i app repoet under `App/models`.
Navnet på filen skal starte med navnet på datamodellen og slutte med ".prefill.json".
Dersom datamodellen din heter _appModel_ skal du nå kunne finne disse tre filene i mappen:
_appModel.metadata.json_, _appModel.schema.json_, _appModel.prefill.json_

Lim inn innholdet nedenfor i filen.

```json
{
    "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
    "allowOverwrite": true,
    "ER": {
    },
    "DSF": {
    },
    "UserProfile": {
    }
}
```

## Konfigurering av _prefill.json_-filen

Under ønsket gruppe (DSF, ER eller UserProfile) 
i _prefill.json_-filen, legg inn en ny linje med nøkkel/verdi:

```json
"<nøkkel>": "<verdi>"
```

- Nøkkelen skal være feltet som data hentes _fra_.
- Verdien skal være feltet fra datamodellen.

Full oversikt over tilgjengelige felter finner du [her](../../../reference/data/prefill/#tilgjengelige-prefill-verdier).

### Eksempel: Felt fra Enhetsregisteret (ER)

Eksempelet nedenfor vil populere feltet _Datamodell.Organisasjon.Organisasjonsnummer_ med organisasjonsnummeret 
hentet fra enhetsregisteret.

```json
"ER": {
    "OrgNumber":"Datamodell.Organisasjon.Organisasjonsnummer"
}
```

### Eksempel: Felt fra Folkeregisteret (DSF)

Eksempelet nedenfor vil populere feltet _Datamodell.Person.Nummer_ med telefonnummer henter fra folkeregistret.

 ```json
"DSF": {
    "TelephoneNumber":"Datamodell.Person.Nummer"
}
```

### Eksempel: Felt fra brukerens profil i Altinn

Eksempelet nedenfor vil populere feltet _Datamodell.Bruker.Epost med epost hentet fra brukerens profil i Altinn.

```json
"UserProfile": {
    "Email":"Datamodell.Bruker.Epost"
}
```