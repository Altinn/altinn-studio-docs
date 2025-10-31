---
title: Registrering av system
description: Denne veiledningen beskriver hvordan du som sluttbrukersystemleverandør registrerer et system i systemregisteret.
linktitle: Registrering av system
weight: 1
---

**Målgruppe:** Utviklere eller tekniske integrasjonsansvarlige hos sluttbrukersystemleverandører (SBS).

## Forutsetninger

Du må ha noen forutsetninger på plass før du registrer et system, se [Kom i gang-veiledningen](https://docs.altinn.studio/nb/authorization/getting-started/systemuser/).

-----

## Instruksjoner

Registrering av et sluttbrukersystem gjøres ved å kalle Altinns systemregister-API med en JSON-nyttelast som definerer systemet. 
* **Merk:** Tokenet som benyttes må ha blitt tildelt scopet: `altinn:authentication/systemregister.write`.

### Steg-for-steg

1.  **Strukturér JSON-nyttelasten**
    Klargjør en JSON-nyttelast (payload) som skal sendes til API-et. Nedenfor følger en detaljert beskrivelse av feltene.

2.  **Definer Identifikatorer**

     * `id`: En unik identifikator for systemet.
         * **Format:** `{systemleverandørorgnr}_{valgt navn}`.
         * **Eksempel:** `991825827_smartcloud`.
     * `vendor`: Inneholder organisasjonsnummeret til systemleverandøren.
         * **Format:** `ID` må settes til `0192:{orgnr}` for å angi referanse til Enhetsregisteret.
         * **Eksempel:** `"ID": "0192:991825827"`.
     * **Viktig:** Organisasjonsnummeret som brukes i `id` og `vendor.ID` må samsvare med organisasjonsnummeret i autentiseringstokenet (Maskinporten eller Altinn). For å få opprettet et ekte organisasjonsnummer i TT02, må SBS kontakte servicedesk@altinn.no.

3.  **Definer Synlige Tekster**

     * Angi navn og beskrivelse som skal vises for systemet i Altinn-portalen.
     * Tekster må oppgis for alle støttede språk: `nb` (bokmål), `nn` (nynorsk) og `en` (engelsk).

4.  **Definer Rettigheter (`rights` og `accessPackages`)**

     * Angi hvilke tjenester eller tilgangspakker systemet krever tilgang til.
     * Bruk `rights` for å spesifisere individuelle ressurser (f.eks. `urn:altinn:resource`).
     * Bruk `accessPackages` for å spesifisere forhåndsdefinerte tilgangspakker (f.eks. `urn:altinn:accesspackage:skattegrunnlag`).
     * **Merk:** Disse rettighetene **må** være definert korrekt *før* en systembruker kan opprettes for dette systemet.

5.  **Knytt Klient-ID (`clientId`)**

     * Oppgi en liste med `clientId`-verdier (som UUIDs) som er generert i Maskinporten for denne integrasjonen.
     * Et system kan være knyttet til flere klient-ID-er.
     * Dette er den samme klient-ID-en som senere skal brukes ved opprettelse av systembruker mot Maskinporten.

6.  **Angi Synlighet (`isVisible`)**

     * `true`: Systemet er synlig i Altinn-portalen og kan benyttes for å opprette en systembruker derfra (brukerstyrt opprettelse).
     * `false`: Systemet er ikke synlig i portalen. Systembruker må i dette tilfellet opprettes gjennom en leverandørstyrt prosess.
     * **Viktig:** Et system kan ikke settes til isVisible: true dersom det samtidig har IsAssignable: false (et felt som styrer tildelbarhet, ikke vist i JSON-eksempelet).

7. **Angi Omdirigerings-URLer (Valgfritt) (`allowedredirecturls`)**

    * Dette feltet er valgfritt og kan utelates eller settes som en tom liste (`[]`).

    * *Hvis* feltet benyttes, må det inneholde en liste over nøyaktige URL-er som er godkjent for omdirigering i flyten for opprettelse av systembruker.

    * Dersom listen er definert, må en systembrukerforespørsel bruke en URL fra denne listen (eller et subsett av den).

8.  **Eksempel på JSON-nyttelast**
    Bruk følgende struktur som mal for din JSON-nyttelast:

    ```json
    {
      "id": "991825827_smartcloud",
      "vendor": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:991825827"
      },
      "name": {
        "nb": "SmartCloud 1",
        "en": "SmartCloud 1",
        "nn": "Smart SKY"
      },
      "description": {
        "nb": "SmartCloud er verdens beste system.",
        "en": "SmartCloud Rocks.",
        "nn": "SmartSky er vestlandets beste system"
      },
      "rights": [
        {
          "resource": [
            {
              "id": "urn:altinn:resource",
              "value": "ske-krav-og-betalinger"
            }
          ]
        }
      ],
      "accessPackages": [
        {
          "urn": "urn:altinn:accesspackage:skattegrunnlag"
        }
      ],
      "clientId": ["32ef65ac-6e62-498d-880f-76c85c2052ae"],
      "allowedredirecturls": ["https://smartcloudxxxx/receipt"],
      "isVisible": true
    }
    ```

9.  **Send API-kallet**

    * Bruk en POST-forespørsel for å opprette systemet første gang.

    * Bruk en PUT-forespørsel for å endre et eksisterende system.

    * **VIKTIG:** En PUT-forespørsel overskriver hele systemdefinisjonen. Når du skal endre (f.eks. legge til en ny tilgangspakke), må du hente den eksisterende definisjonen, gjøre endringene, og deretter sende hele den oppdaterte JSON-nyttelasten i PUT-kallet. Hvis du kun sender de nye endringene, vil all tidligere informasjon bli slettet.

    * Inkluder alltid ditt gyldige Maskinporten- eller Altinn-token i Authorization-headeren for autentisering.
-----

## Verifisering og Merknader

  * **Verifisering:** Etter vellykket registrering vil systemet være tilgjengelig for opprettelse av systembrukere. Hvis `isVisible` er satt til `true`, vil systemet også være synlig i Altinn-portalen.
  * **Endring:** Systemer som er registrert kan endres og slettes i etterkant via API-et.