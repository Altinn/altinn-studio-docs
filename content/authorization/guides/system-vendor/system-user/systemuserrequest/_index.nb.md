---
title: Opprette Systembruker
description: "Denne veiledningen viser hvordan du som sluttbrukersystemleverandør oppretter systembruker for eget system og systembruker for klientsystem."
weight: 2
---



**Målgruppe:** Utviklere og systemintegratorer hos en Sluttbrukersystemleverandør (SBSL) som skal integrere sitt system med Altinn-plattformen.

**Forutsetninger:**

  * Ditt system (SBSL) må være forhåndsregistrert i Altinn ([Registrer System](/nb/authorization/guides/system-vendor/system-user/systemregistration/)).
  * Du må ha et gyldig Maskinporten-token med scopet `altinn:authentication/systemuser.request.write` (scopet opprettes i [Samarbeidsportalen](https://samarbeid.digdir.no/maskinporten/maskinporten/25)).
  * Du må kjenne organisasjonsnummeret (`partyOrgNo`) til sluttbrukerkunden.
  * Du må ha definert hvilke tilgangspakker (`accessPackages`) eller enkeltrettigheter (`rights`) systembrukeren trenger.
  * (Valgfritt) Hvis `redirectUrl` skal benyttes, må denne URL-en være forhåndsregistrert på systemet ditt.

-----

## 1. Opprette Systembruker for Eget System

Dette gjelder en systembruker for ditt eget system, hvor systemet handler på vegne av sluttbrukerorganisasjonen. Dette kan gjøres på to måter.

### Metode A: [**Leverandørstyrt Opprettelse**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/#Leverandørstyrt-opprettelse)

Dette er den foretrukne metoden hvor du som SBSL initierer opprettelsen via API.

1.  **Initier forespørsel:** Send en HTTP POST-forespørsel til API-endepunktet.

     * **Test (TT02):** `https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor`
     * **Produksjon:** `https://platform.altinn.no/authentication/api/v1/systemuser/request/vendor`

2.  **Konfigurer Request Body:** Inkluder en JSON-body som spesifiserer system, kunde og tilganger(`accesspackage`).

     ```json
    {
    "systemId": "991825827_smartcloud",
    "partyOrgNo": "314248295",
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
    "redirectUrl": "https://smartcloudxxxx/receipt"
  

3. **Motta respons:** API-et validerer forespørselen. Ved suksess mottar du en JSON-respons med `status: "New"`.
4. **Hent dyplenke:** Fra responsen, hent verdien av `confirmUrl`. Eksempel på respons:

      ```json
        {
          "id": "505f8488-3d48-4c15-8e21-35cb9432f815",
          "status": "New",
          "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=..."
        }
        ```

5.  **Formidle lenke:** Gi `confirmUrl`-dyplenken til sluttbrukeren på en trygg måte (f.eks. direkte i din programvare).

6.  **Sluttbruker godkjenner:** Sluttbrukeren må følge lenken for å [godkjenne SystemBruker](/nb/authorization/guides/end-user/system-user/accept-request/). Forespørselen får da status `Accepted`.


### Metode B: [**Brukerstyrt Opprettelse**](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/#brukerstyrt-opprettelse)

Denne metoden er kun aktuell hvis du som SBSL *ikke* har et eget grensesnitt for å håndtere leverandørstyrt opprettelse.

1.  **Instruer sluttbruker:** Be sluttbrukeren utføre følgende:
      * Gå til Altinn-portalen.
      * Navigere til opprettelse av systembruker.
      * Velge ditt system fra nedtrekkslisten. (Du må informere kunden om hva systemet ditt heter i listen).
2.  **Automatisk godkjenning:** Når brukeren fullfører, godkjenner de automatisk alle de forhåndsdefinerte tilgangene systemet trenger.
3.  **Hent token:** Etter at brukeren er opprettet, kan du (SBSL) hente ut systembruker-tokenet som trengs for integrasjonen.

-----

## 2\. Opprette Systembruker for Klientsystem

Dette gjelder en systembruker for et system som skal handle på vegne av sluttbrukerens *klienter* (f.eks. et regnskapssystem).

**Viktige forskjeller:**

  * Kun **leverandørstyrt** opprettelse er mulig.
  * Du kan *kun* angi påkrevde tilganger via `accessPackages`, ikke `rights`.
  * Etter godkjenning kreves et ekstra, manuelt steg fra sluttbrukeren.

### Instruksjoner (Leverandørstyrt Opprettelse)

1. **Initier forespørsel:** Send en HTTP POST-forespørsel til det spesifikke endepunktet for klientsystemer (`/agent/request`).

      * **Test (TT02):** `POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/agent/request`
      * **Produksjon:** `POST https://platform.altinn.no/authentication/api/v1/systemuser/agent/request`

2. **Konfigurer Request Body:** Inkluder en JSON-body. ***Merk*** at `rights`-listen må være tom eller utelatt.

    ```json
      {
    "systemId": "312605031_SuperRegnskap",
    "partyOrgNo": "310495670",
    "accessPackages": [
      {
        "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
      }
    ],
    "redirectUrl": "https://superregnskap.no"
    ```
    Denne forespørselen forutsetter at det finnes et System i Systemregisteret med systemIden "312605031_SuperRegnskap" og tilgangspakken "ansvarlig revisor" fra før.
    

3. **Motta respons:** Motta en JSON-respons med `status: "New"` og en `confirmUrl`, tilsvarende prosessen for "eget system".

4. **Formidle lenke:** Gi `confirmUrl`-dyplenken til sluttbrukeren på en trygg måte.

5. **Sluttbruker godkjenner:** Sluttbrukeren følger lenken og godkjenner forespørselen. (Se [Godkjenn SystemBruker](/nb/authorization/guides/end-user/system-user/accept-request/)). Status settes til `Accepted`.

6. **(Påkrevd) Sluttbruker delegerer klienter:** Etter at systembrukeren er godkjent, må sluttbrukeren **manuelt logge inn i Altinn** og delegere de klientene (dvs. de organisasjonene det skal rapporteres på vegne av) til den nyopprettede systembrukeren. (Se [Delegeres Klienter](/nb/authorization/guides/end-user/system-user/delegate-clients/)).

-----

## 3\. Verifisering og Status

### Verifisere Opprettelse

Etter at en sluttbruker har godkjent en forespørsel (status `Accepted`), kan du som SBSL verifisere at systembrukeren eksisterer.

1.  Send en HTTP GET-forespørsel til:
    `{{API_BASE_URL}}/authentication/api/v1/systemuser/vendor/byquery?system-id={systemId}&orgno={kundensOrgno}`
    *(Erstatt `{API_BASE_URL}`, `{systemId}` og `{kundensOrgno}`)*

2.  En vellykket respons returnerer JSON med detaljer om systembrukeren, inkludert systembruker `id` og `userType`.

### Status på Forespørsler

En forespørsel (request) har en livssyklus definert av status:

  * **New:** Nyopprettet forespørsel, venter på brukerhandling.
  * **Accepted:** Sluttbruker har godkjent forespørselen.
  * **Rejected:** Sluttbruker har trykket «Ikke godkjenn».
  * **TimedOut:** Forespørselen er ikke besvart innen 10 dager og er utløpt. Den er ikke lenger tilgjengelig via API.
  * **Denied:** Ikke i bruk.


## Utforsk API-dokumentasjonen
For fullstendig teknisk dokumentasjon, inkludert detaljerte beskrivelser av parametere, responser og autentisering, gå til Altinns OpenAPI-grensesnitt her: [**OpenAPI**](https://docs.altinn.studio/nb/api/authentication/spec/#/RequestSystemUser)
