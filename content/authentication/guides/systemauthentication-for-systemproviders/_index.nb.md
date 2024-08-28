---
title: Ta i bruk systembruker for systemleverandører
linktitle: Systembruker for SBS
description: Systembruker er et nytt konsept for API autentisering. Denne guiden beskriver hvordan man som systemleverandør kan benytte seg av dette.
toc: false
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

## Bakgrunn

Bakgrunnen til systembruker konsept kan leses om her.

##  Forutsetninger

Forutsetninger for at man systemleverandør kan benytte seg systembruker er.

- Avtale med maskinporten som klient
- Avtale med Digdir som gir tilgang til systemregister

## Sette opp maskinporten integrasjon

For å konsumere offentlige API med systembrukere trenger man å registrere minst en MaskinPorten integrasjon. 
Dette kan gjøres i [sammarbeidsportalen](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#opprette-klient-for-%C3%A5-konsumere-api) eller via [API](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#registrere-klient).

## Registrere system

Første steg etter man har fått tilgang til systemregisteret er å registrere systemet.

Systemet er da typisk en nettbasert programvare som er tilgjengelig i markedet som sluttkunder (virksomheter) kan
benytte seg av for kommunukasjon med det offentlige. 

Systemet må beskrives med følgende egenskaper

### SystemTypeId

Dette er en unik ID som vil benyttes for å identifisere programvaren. Gyldige tegn er a-z 0-9 og _

### KlientId

Dette er klientidene for integrasjonen som er opprettet i Maskinporten. 
Det er kun pålogginger med Maskinportenintegrasjoner som er knyttet mot oppgitte klientider.

```json
{
 "SystemTypeId": "visma_supertax",
 "SystemVendor": "978234522",
 "Name": {
      "en": "Visma Super Tax",
     "nb" : "Visma superskatt"
  "Description": {
     "en": "Visma Super Tax allows for .........",
     "nb":  "Visma superskatt gir deg mulighet...."
  }
  },
  "AccessGroupNeeds": ["MVA", "SKATT"],
  "ResourceNeeds": ["urn:altinn:resource:skd/mva"],.
  "ClientId":["123123","234534552345"]
}
```

## Maskinporten autentisering

Når system skal autentisere seg som systembrukeren til kunden må JWT grant forespørselen til maskinporten inneholde informasjon om kunden


### JWT Grant

```json
{
  "aud" : "https://maskinporten.no",
  "sub" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "authorization_details" : [ {
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:310385980"
    },
    "type" : "urn:altinn:systemuser"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "exp" : 1718124835,
  "iat" : 1718124715,
  "jti" : "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}

```


### JWT Token


```json
{
  "authorization_details" : [ {
    "type" : "urn:altinn:systemuser",
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "id" : "0192:314168267"
    },
    "systemuser_id" : [ "ebe4a681-0a8c-429e-a36f-8f9ca942b59f" ],
    "system_id" : "matrix_test"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "https://test.maskinporten.no/",
  "client_amr" : "private_key_jwt",
  "token_type" : "Bearer",
  "exp" : 1718175135,
  "iat" : 1718175015,
  "client_id" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti" : "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:314330897"
  }
}

```
Se også dokumentasjon hos [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker). 


## Bruk av systembrukertoken mot API

Tokenet man får fra maskinporten legges ved som et bearer token mot de API man skal kalle. 

## Test av systembruker i TT02

For å teste systembruker i TT02 kreves følgende

 - Systemleverandør opprettet i maskinporten. Gjøres via servicedesk@digdir.no
 - Systemleverandør opprettet i Altinn. Gjøres vie servicedesk@altinn.no
 - Systemintegrasjon opprettet i maskinporten test.

For opprettelse av systembrukere kan testbrukere/organisasjoner fra Tenor benyttes

### Bruk av systembrukertoken mot API

Tokenet man får fra Maskinporten legges ved som et Bearer Token mot de API-ene man skal kalle.

### Test av systembruker i TT02

For å teste systembruker i TT02 kreves følgende:

- Systemleverandør opprettet i Maskinporten. Dette gjøres via servicedesk@digdir.no.
- Systemleverandør opprettet i Altinn. Dette gjøres via servicedesk@altinn.no.
- Systemintegrasjon opprettet i Maskinporten test.

For opprettelse av systembrukere kan testbrukere/organisasjoner fra Tenor benyttes.

### Referanseimplementasjon og oppsett

Det er utviklet en referanseimplementasjon for å demonstrere bruk av systembruker. Den er utviklet i C# og kan kjøres som en konsollapplikasjon. 
Den gjør følgende:

1. Oppretter token basert på konfigurert JSON Web Key, client ID, scope og organisasjonsnummer til den som har opprettet systembruker.
2. Basert på tokenet den får, gjør den kall mot referanse-API som krever systembruker.

Se kode med dokumentasjon [her](https://github.com/TheTechArch/altinn-systemuser).

### Sette opp referanseimplementasjon med egen konfigurasjon

Det er utviklet en referanseimplementasjon for å demonstrere bruk av systembruker. Den er utviklet i C# og kan kjøres som en konsollapplikasjon.

Den gjør følgende:

1. Oppretter token basert på konfigurert JSON Web Key, client ID, scope og organisasjonsnummer til den som har opprettet systembruker.
2. Basert på tokenet den får, gjør den kall mot referanse-API som krever systembruker.

Se kode med dokumentasjon [her](https://github.com/TheTechArch/altinn-systemuser).

### Sette opp referanseimplementasjon med egen konfigurasjon

I repoet ligger nødvendig testsertifikat for å kjøre applikasjonen. Følgende må gjøres for å sette opp egen integrasjon som systemleverandør:

1. Logg inn på [onboarding Maskinporten](https://onboarding.test.maskinporten.no/). Her kan du bruke en test-ID som er daglig leder for en testenhet.

    ![Onboarding](onboarding1.png "Forenklet onboarding")

    ![Onboarding](onboarding2.png "Velg enhet")

    ![Onboarding](onboarding3.png "Oversikt over integrasjoner i Maskinporten. Her kan du legge til nye")

    ![Onboarding](onboarding4.png "Opprett integrasjon, søk etter scope som kreves")

    ![Onboarding](onboarding5.png "Legg til eventuell ekstra scope og beskriv integrasjon")

    ![Onboarding](onboarding6.png "Last ned nøkler som genereres")

    ![Onboarding](onboarding7.png "Integrasjon opprettet")

2. Få opprettet system i Systemregister med riktig client ID og knytning mot nødvendige ressurser/tilgangspakker.

3. Logg inn med testbruker i tt02.altinn.no. Brukeren må ha tilgangsstyringsrollen i Altinn for en testorganisasjon og gå til siden [https://authn.ui.tt02.altinn.no/authfront/ui/auth/creation](https://authn.ui.tt02.altinn.no/authfront/ui/auth/creation).

    ![Onboarding](delegering1.png "10. Velg system")

    ![Onboarding](delegering2.png "11. Aksepter opprettelse av systembruker med rettigheter til den")

    ![Onboarding](delegering3.png "12. Oversikt systembrukere for testorganisasjon")

4. Konfigurer key, nøkkel, client ID og scope i testapplikasjon.

```c#
string clientID = "7ee41fce-9f6e-4c32-8195-0fe2c1517f43";
string scope = "altinn:systembruker.demo";
string systemUserOrg = "210493352";
string pemCertificatePath = @".\mp-key.pem";

```
