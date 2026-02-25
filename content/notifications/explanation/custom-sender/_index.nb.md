---
title: Egendefinerte avsendere for epost og SMS
linktitle: Egendefinerte avsender
description: "Fremgangsmåte for å benytte egendefinerte avsendere i Altinn Varsling."
tags: [notifications, epost, domene, DNS, SMS, sender, avsender]
weight: 40
---
{{% notice info %}}
**Det er ikke nødvendig å benytte egendefinerte avsendere for å sende varsler gjennom Altinn Varsling.**

Dersom ingen annen konfigurasjon eksisterer er det følgende som gjelder:

* Avsender på SMS: **Altinn** (**Altinn-test** for testmiljøet)
* Avsender på epost: **noreply@altinn** (**noreply-tt02@altinn.no** for testmiljøet og **noreply@altinn.cloud** for ytelsestestmiljøet)
{{% /notice %}}
 
## Bruk av egendefinert avsender for SMS

Det er mulig å sende SMS med egendefinert avsender ved å inkludere `sender`-feltet i `smsSettings`-objektet i API-kallet for å bestille varsler.

Se Bruno-testen [Fulfilling eForv. §8 - custom sender](https://github.com/Altinn/altinn-notifications/blob/main/test/bruno/v2%20(future)/create-notifications/fulfilling-eforv-paragraf8-custom-sender.bru) for eksempler på bruk.

### Viktige begrensninger og hensyn for SMS-avsendere:

* Avsender blir avkortet til maksimalt 11 tegn. For eksempel blir `sender` "*Digitaliseringsdirektoratet*" forkortet til "*Digitaliser*" i visningen på brukerens telefon.
* Dersom avsendernavnet er (eller i fremtiden blir) beskyttet med tredjepartsprodukter som [SenderID](https://www.linkmobility.com/products/sms-sender-id), må du sørge for å godkjenne Altinn/Digitaliseringsdirektoratet som meldingsprodusent.  

## Bruk av eget domene som epost-avsender for Altinn Varsling

Det er mulig å sende epost med egendefinert avsender ved å inkludere `senderEmailAddress`-feltet i `emailSettings`-objektet i API-kallet for å bestille varsler.

Se Bruno-testen [Fulfilling eForv. §8 - custom sender](https://github.com/Altinn/altinn-notifications/blob/main/test/bruno/v2%20(future)/create-notifications/fulfilling-eforv-paragraf8-custom-sender.bru) for eksempler på bruk.

Før det er mulig å bruke et eget domene som avsenderadresse i API-kall, må det gå gjennom flere steg i en registrerings- og verifiseringsprosess for domenet:

| Steg | Handling                                                      | Utfører      |
|------|---------------------------------------------------------------|--------------|
| 1    | Send henvendelse om registrering av domene/avsender           | Tjenesteeier |
| 2    | Registrering av domene og utstedelse av verifiseringsnøkler   | Digdir       |
| 3    | Legg til DNS-poster (TXT, SPF, DKIM, DMARC)                   | Tjenesteeier |
| 4    | Verifiser DNS-poster og koble domenet                         | Digdir       |
| 5    | Bruk domenet i API-kall                                       | Tjenesteeier |

### Send henvendelse om registrering av domene/avsender

Send en support-sak til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no) med informasjon om at du ønsker å benytte egendefinert avsender for Altinn Varsling, og ønsket avsenderadresse.

{{% notice info %}}
Tilgangen gis til eksplisitte adresser, *ikke* hele domener. Du må spesifisere den eksakte avsenderadressen du ønsker å bruke, for eksempel `noreply@example.com`. Det er mulig å bestille flere adresser.
{{% /notice %}}

### Legg til DNS-poster (TXT, SPF, DKIM, DMARC)

Du vil få tilsendt en **UUID** som må legges til i DNS-konfigurasjonen for domenet.

| Record | Type  | Name                                    | Verdi                                                 |                                                                                                                     |
|--------|-------|-----------------------------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------| 
|        | TXT   |                                         | ms-domain-verification=**UUID**                       | *UUID* er unik pr. miljø, så her må det typisk legges inn 2 records                                                 |
| SPF    | TXT   |                                         | v=spf1 include:spf.protection.outlook.com -all        | Eksempel, den faktiske konfigurasjonen kan variere basert på eksisterende konfigurasjon for andre epost-leverandører |
| DKIM   | CNAME | selector1-azurecomm-prod-net._domainkey | selector1-azurecomm-prod-net._domainkey.azurecomm.net |                                                                                                                     |
| DKIM2  | CNAME | selector2-azurecomm-prod-net._domainkey | selector2-azurecomm-prod-net._domainkey.azurecomm.net |                                                                                                                     |

Vurder å sette opp [DMARC](https://en.wikipedia.org/wiki/DMARC). Hvis domenet allerede har en DMARC-policy, kontroller at denne er kompatibel med epost-utsendingen fra Altinn Varsling.

{{% notice info %}}
**Gi beskjed når DNS-postene er lagt inn. Digdir må fullføre en valideringsprosess før domenet er koblet sammen og klart til bruk.**
{{% /notice %}}