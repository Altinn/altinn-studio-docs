---
title: Validere samtykketoken
linktitle: Validere
description: Hvordan tjenesteeiere validerer samtykketoken
toc: false
---

Når du er ferdig med å konfigurere tilgangsregler for samtykket, må du validere at samtykket fungerer som forventet i tjenesten.
Dette gjøres ved å kontrollere at rettighetene som er angitt i samtykke-tokenet (under `consentRights`) samsvarer med de rettighetene tjenesten krever.

I den nye samtykkeløsningen for Altinn 3 er det Maskinporten som utsteder samtykke-tokenet.
Tokenet utstedes som et vanlig Maskinporten-token, men inneholder i tillegg et attributt kalt `authorization_details`.
Dette feltet inneholder informasjon om hvilke rettigheter samtykket gir, og brukes av tjenesten for å verifisere at nødvendig samtykke er gitt.

Eksemplet nedenfor viser et samtykke-token fra demoapplikasjonen Smartbank i testmiljøet TT02.
Her ser vi at tokenet har fått samtykket `samtykke-test-vegard` for inntektsåret 2022. Dette bekrefter at samtykkeoppsettet fungerer som forventet:

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "93413201-b7e8-4ec3-a899-580fc02c6aeb",
      "from": "urn:altinn:person:identifier-no:25922947409",
      "to": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:991825827"
      },
      "consented": "2025-07-18T07:57:30.409251+00:00",
      "validTo": "2026-07-18T07:57:15.639509+00:00",
      "consentRights": [
        {
          "action": ["consent"],
          "resource": [
            {
              "type": "urn:altinn:resource",
              "value": "samtykke-test-vegard"
            }
          ],
          "metadata": {
            "inntektsaar": "2022"
          }
        }
      ]
    }
  ],
  "scope": "altinn:consentrequests.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1752825571,
  "iat": 1752825451,
  "client_id": "107c6f58-e06b-44e9-be7a-11ea44c7ad8b",
  "jti": "T2KUt3ufgIPycdoGPMEFU87pNm9e9nPB1ODkJj5wH0k",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  }
}
```


## Validering av konverterte samtykker

Som del av migrasjonsprosessen fra Altinn 2 til Altinn 3 vil Altinn automatisk konvertere eksisterende samtykker. 

Dette betyr at tjenestetilbydere må være forberedt på å håndtere tre ulike typer samtykke-token:

1. **Eksisterende Altinn 2-token** - Gamle samtykke-token som fortsatt er gyldige
2. **Nye Altinn 3-token** - Token basert på nye ressursdefinisjoner opprettet av tjenesteeier
3. **Migrerte token** - Token for tjenester som opprinnelig ble samtykket til i Altinn 2, men som nå er konvertert til Altinn 3-format

### Ansvar og konfigurasjonsarbeid

Altinn tar ansvaret for selve konverteringen av ressurser og migreringen av samtykker. Tjenesteeieren må imidlertid konfigurere sitt API slik at det godkjenner token med migrerte ressurser. 

RessursID for migrerte ressurser følger formatet: `{org}_{serviceCode}_{serviceEditionCode}`

{{% alert title="Viktig" color="warning" %}}
**Parametere i samtykket vil også bli konvertert til små bokstaver (lowercased) under migreringen.**
{{% /alert %}}


