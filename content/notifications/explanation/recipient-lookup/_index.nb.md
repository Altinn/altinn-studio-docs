---
title: Mottakeroppslag
description: "Altinn Varslinger tilbyr en omfattende tjeneste for mottakeroppslag for varsler sendt
til fødselsnummer og organisasjonsnummer. Denne artikkelen forklarer oppslagsprosessen,
inkludert hvilke registre som brukes, for å sikre nøyaktige kontaktdetaljer og levering."
linktitle: Mottakeroppslag
tags: [varslinger, mottakeroppslag]
weight: 30
---


Altinn Varslinger støtter sending av varsler til mottakere identifisert med fødselsnummer eller organisasjonsnummer.
Mottakerens kontaktdetaljer og reservasjonsstatus blir sjekket ved bestilling og igjen på ønsket sendetidspunkt.

Bestilleren må verifisere om varslene ble sendt, ettersom oppslagsresultater blir gitt i bestillingsresponsen og oppdatert etter ønsket sendetidspunkt.

### Mottakeroppslag
{{% notice warning  %}}
Resultatet av mottakeroppslaget reflekterer kontaktinformasjonen som er tilgjengelig på et bestemt tidspunkt.
Hvis det er en betydelig forsinkelse mellom bestilling og sending av et varsel, kan det endelige oppslaget gi andre resultater.
Derfor må du alltid verifisere statusen til varselet etter planlagt sendetidspunkt for å bekrefte vellykket generering, utsending og levering.
{{% /notice %}}


Objektet _recipientLookup_ indikerer sannsynligheten for at Altinn lykkes med å levere varsler
til de spesifiserte mottakerne. Gjennomgang av denne informasjonen gir mulighet for alternative handlinger før sendetidspunktet hvis mottakere er reservert eller mangler kontaktdetaljer.

| Egenskap       | Beskrivelse                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| status         | Resultatet av det innledende oppslaget.                                                                             |
| isReserved     | En liste over fødselsnumre for mottakere som har valgt å reservere seg mot elektronisk kommunikasjon.    |
| missingContact | En liste over fødselsnumre og/eller organisasjonsnumre for mottakere som ikke har kontaktdetaljer.       |

Status-egenskapen kan ha en av tre verdier:
| Status         | Beskrivelse                                     |
| -------------- | ----------------------------------------------- |
| Success        | Mottakeroppslag var vellykket for alle mottakere.  |
| PartialSuccess | Mottakeroppslag var vellykket for noen mottakere. |
| Failed         | Mottakeroppslag mislyktes for alle mottakere.     |


__Eksempler__
```json
"recipientLookup": {
    "status": "Success",
    "isReserved": [ "16069412345" ],
    "missingContact": [ "810419652", "14029112345" ]
  }
```


### Registre som brukes for oppslag

Når du sender et varsel gjennom Altinn, kan avsenderen oppgi kontaktdetaljene (e-post eller SMS).
I tillegg bruker Altinn et sett med registre for å hente kontaktdetaljer hvis avsenderen ikke har oppgitt dem for en mottaker.

__Kontakt- og reservasjonsregisteret__

Altinn vedlikeholder en lokal kopi av dette registeret, som kan brukes til å hente
navn og kontaktdetaljer når mottakeren er identifisert med sitt fødselsnummer.

[Les mer om Kontakt- og reservasjonsregisteret her](https://eid.difi.no/en/privacy-policy/privacy-policy-common-contact-register-krr).

__Varslingsadresser for virksomheter__

Altinn vedlikeholder også en lokal kopi av dette registeret,
som kan brukes til å hente navn og kontaktdetaljer når mottakeren er identifisert med sitt organisasjonsnummer.

[Les mer om Varslingsadresser for virksomheter her](https://www.brreg.no/en/other-topics/notification-addresses-to-apply-in-public-administration/?nocache=1704206499405).


__Altinn brukerprofil__

Sluttbrukere kan registrere sine foretrukne kontaktdetaljer for varsler knyttet til organisasjoner
i sin Altinn-profil. Disse kontaktdetaljene kan brukes når varselsmottakeren er identifisert med en organisasjon som brukeren kan representere.