---
title: Samtykke for tjenesteeier
linktitle: Samtykke
description: Hvordan tjenesteeiere oppretter og konfigurerer samtykkeressurser i Altinn 3.
toc: false
---
 
For å bruke Altinn Samtykke må du opprette samtykkeressurser for hvert sett med tjenester eller data som skal inngå i et samtykke.
 
Eksempler på slike ressurser er Skatteetatens "inntekts-API" og skattegrunnlag, som banker bruker for innsyn i finansielle forhold ved lånesøknader.
 
Denne veiledningen forklarer hvordan du setter opp en samtykkeressurs.
 
## Forutsetninger
 
Du må ha tilgang til ressursadministrasjon for din organisasjon. Se [Kom i gang-veiledningen](../../../getting-started/resource-admin-studio).
 
## Opprett ny samtykkeressurs
 
Velg **Opprett ressurs** øverst til høyre.
 
ID for ressursen bør navngis på formen `{tjenesteeierkode}-{forståeligressursid}`.
 
![consentresource](consentresource1.png)
 
### Navn og beskrivelse
 
Gi samtykkeressursen et navn og en beskrivelse. Dette vises til brukere når de skal delegere tilgang til å gi samtykke på vegne av virksomheter.
 
![consentresource](navn-beskrivelse.png)
 
### Samtykkemal
 
Velg en mal for hvordan samtykkeforespørselen skal presenteres i Altinn for brukeren som skal akseptere det.
 
Du kan se en forhåndsvisning av teksten i malen til høyre.
 
![consentresource](samtykkemal.png)
 
### Metadata og samtykketekst
 
Samtykketeksten er teksten sluttbrukeren ser når de skal gi samtykke i Altinn. Den bør tydelig forklare hvilke data som deles.

Du kan sette inn metadata i samtykketeksten ved å bruke krøllparenteser  { }. Metadata brukes når samtykket krever tilleggsinformasjon utover selve tjenesten – for eksempel hvilket år, hvilken periode eller hvilke data samtykket gjelder for.

List opp metadataene som skal brukes i samtykketeksten i feltet Metadata for samtykketekst. Se forhåndsvisningen til høyre og aktiver «variabler med eksempeltekst» for å kontrollere at metadataene vises riktig.
 
![consentresource](metadata-samtykketekst2.png)
![consentresource](forhandsvisning-samtykke.png)
 
### Engangssamtykke
 
Dersom du ønsker at samtykket kun skal kunne brukes én gang til utlevering av opplysninger, må engangssamtykke aktiveres. Hvis ikke, vil samtykket være tidsavgrenset.

![consentresource](engangssamtykke.png)

### Delegering

Aktiver delegering for å gi brukere mulighet til å gi andre i virksomheten rett til å godkjenne samtykkeforespørsler på vegne av virksomheten.

Skriv en kort tekst som beskriver hva den som får delegert retten, får mulighet til å gjøre. Teksten vises i Altinn når en bruker delegerer tjenesten videre til andre i virksomheten.

![Create Resource](delegering.png)

### Nøkkelord

Skriv inn relevante nøkkelord som gjør tjenesten enklere å finne i søk. Nøkkelordene er ikke i bruk ennå, men vil bli benyttet i fremtidige tjenestekataloger.

![Create Resource](create_resource_6.png)

### Status

Angi status for tjenesten. Velg *Fullført* dersom tjenesten er i produksjon, og *Avviklet* for tjenester som er avviklet.

![Create Resource](status.png)

### Brukertyper

Definerer hvilke typer brukere som har tilgang. Disse innstillingene kan brukes til filtrering på et senere tidspunkt. For tiden er dette bare informasjon.

![Create Resource](create_resource_8.png)

### Parter som kan bruke tjenesten

Definerer hvilken type part tjenesten er målrettet mot. Kan bli brukt til filtrering i tjenestekatalog på et senere tidspunkt.

![Create Resource](parter.png)

### Kontaktinformasjon

Kontaktinformasjon for tjenesten. Kan bli presentert i tjenestekatalog på et senere tidspunkt.

![Create Resource](kontaktinfo.png)



## Tilgangsregler

Her kan du definere regler for hvilke enhetsregisterroller, tilgangspakker og Altinn-roller som gir tilgang til å godkjenne en samtykkeforespørsel på vegne av en virksomhet

### Sikkerhetsnivå

Velg hvilket sikkerhetsnivå som skal være minimumskrav for innlogging.  Det samme nivået vil også gjelde når brukeren skal godkjenne samtykket.

![Create Resource](sikkerhetsnivaa.png)

### Hvem skal kunne be om samtykke?

Velg tilgangsliste med utvalgte organisasjoner for å avgrense hvem som skal kunne be om samtykke. Kun organisasjonene som inngår i de valgte listene vil kunne sende samtykkeforespørsel og hente ut data. 
Tilgangsliste kan opprettes i på sidene for [tilgangsliste i Altinn Studio](https://docs.altinn.studio/nb/authorization/guides/resource-owner/manage-accesslists-resource-admin/) eller [via API](https://docs.altinn.studio/nb/authorization/guides/resource-owner/manage-accesslist-api/). 


![Create Resource](hvem-skal-kunne-be.png)

### Hvem skal kunne godkjenne en samtykkeforespørsel?

Velg roller fra Enhetsregisteret, tilgangspakker og Altinn-roller for å angi hvem som kan gi samtykke på vegne av en virksomhet. Tilgangspakker tar over for Altinn-roller. Bruk dagens Altinn-roller og tilsvarende tilgangspakker til nye delegeringer er gjort og Altinn-roller er slått av. Roller fra Enhetsregisteret, som daglig leder og styrets leder, administreres i Brønnøysundregistrene og fungerer som tidligere.

 
![Create Resource](hvem-skal-kunne-godkjenne.png)



## Validering av samtykker
 
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