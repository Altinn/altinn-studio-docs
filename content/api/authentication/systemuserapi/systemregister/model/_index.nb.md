---
title: Modell for system register information
linktitle: Modell
description: Modell for å lese/skrive systemregisterinformasjon.
toc: false
weight: 1
---

## Model

### Id

ID-en bør være i formatet {systemleverandørorgnr}\_{navn valgt av leverandøren}. For eksempel "310547891_testprodukt". Dette er en unik ID for å identifisere produktet.

### Vendor

Organisasjonsnummeret til systemleverandøren. Det må starte med en referansekode for enhetsregisteret.

for eksempel

```json
"vendor": {
  "ID": "0192:991825827"
}
```

<<0192>> er referansen som angir at det er en verdi for Enhetsregisteret i henhold til [Elektronisk adresseordning](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/), og 991825827 er organisasjonsnummeret til Direktoratet for digitalisering.

### Name

Navn på systemet. Dette støtter språkene engelsk (en), norsk bokmål (nb) og nynorsk (nn). Dette brukes ved visning av systemet i brukergrensesnittet for manuell oppretting av systembruker, samt ved godkjenning av en systembrukerforespørsel.

```json
"name": {
  "nb": "The Matrix",
  "en": "The Matrix",
  "nn": "The Matrix"
}
```

### Description

En kort tekst som beskriver systemet. Denne brukes til å presentere systemet for sluttbrukeren i Altinn-portalen. Engelsk (en), norsk bokmål (nb) og nynorsk (nn) støttes.

```json
"description": {
  "nb": "Test system",
  "en": "Test system",
  "nn": "Test system"
}
```

## Valgfrie argumenter

### Rights

Dette definerer tjenestene som leverandørens system krever tilgang til fra systembrukeren. Dette kan være enten en Altinn 3-app, en tjeneste utenfor Altinn, men som er registrert som en ressurs i Altinn. Eksempelet nedenfor definerer en app "app_ttd_endring-av-navn-v2" i Altinn og en tjeneste "ske-krav-og-betalinger" utenfor Altinn som er registrert som en ressurs i Altinn. Dette er et valgfrie argument for å opprette et system, men det må settes før systembrukeren kan opprettes.

```json
"rights": [
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "app_ttd_endring-av-navn-v2"
      }
    ]
  },
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "ske-krav-og-betalinger"
      }
    ]
  }
]
```

### AccessPackages

En tilgangspakke er en samling av rettigheter og tilganger som er gruppert sammen for å gjøre det enklere å administrere tilgang. Tilgangspakker definerer hvilke tjenester og ressurser systembrukeren skal ha tilgang til.

**Viktig:** Det finnes spesifikke tilgangspakker for klientsystemer (systembrukere for klientforhold) som ikke kan brukes for systembrukere for eget system. Disse tilgangspakkene er designet for å håndtere delegeringer fra klienter til tjenesteytere (som regnskapsførere, revisorer eller forretningsførere), og krever derfor klientforhold som er etablert via Enhetsregisteret eller direkte delegering.

Tilgangspakkene for klientsystemer må være knyttet til rollene Regnskapsfører (REGN), Revisor (REVI) eller Forretningsfører (FFOR). Se [tabellen over tilgjengelige tilgangspakker basert på ER-roller](/nb/authorization/guides/end-user/system-user/delegate-clients/) for en oversikt over disse spesifikke tilgangspakkene.

Du kan også opprette en systembruker for klientforhold med vanlige tilgangspakker, så lenge klienten har delegert tilgangspakken til organisasjonen som eier systembrukeren. Se [veiledningen om å sette opp klientforhold](/nb/authorization/guides/end-user/system-user/setup-client-relationship/) for mer informasjon.

```json
"accessPackages": [
  {
    "urn": "urn:altinn:accesspackage:skattnaering"
  }
]
```

### ClientId

Et system kan være knyttet til flere klient-ID-er. Disse klient-ID-ene må være relevante klient-ID-er som er definert på Maskinporten-klienten til systemleverandøren eller de som skal hente systembrukertoken. Klient-ID-ene genereres for integrasjoner i Maskinporten, og hver av dem er unik, knyttet spesifikt til et system. Som et resultat kan en klient-ID ikke gjenbrukes for et annet system. Hvis systemet som er knyttet til en klient-ID blir slettet, kan klient-ID-en tildeles et nytt eller eksisterende system.

```json
"clientId": [
  "32ef65ac-6e62-498d-880f-76c85c2052ae"
]
```

### IsVisible

Leverandøren kan bestemme om systemet skal være synlig i Altinn-portalen for sluttbrukere å opprette manuelt..

- True: Systemet er synlig i den brukerstyrte systembruker opprettingsprosessen i Altinn-portalen..
- False: Systemet er ikke synlig i Altinn-portalen og kan kun opprettes av leverandøren gjennom den leverandørstyrte systembruker opprettelse.

### AllowedRedirectUrls

Denne funksjonen brukes for å hvitliste URL-ene som er tillatt å sette i redirecturl for en leverandørstyrt systembrukerforespørsel.

```json
"allowedredirecturls": [
  "https://vg.no",
  "https://nrk.no",
  "https://altinn.no"
]
```
