---
title: Modul 6
description: Utvidelse av skjema med repeterende gruppe
linktitle: Modul 6
tags: [apps, training, repeterende grupper, validering, dataprosessering, konsumere API  ]
weight: 20
---

I denne modulen skal du utvide applikasjonen du har laget i foregående moduler for å støtte mer av [funksjonaliteten som Sogndal kommune ønsker](../case/#krav-fra-kommunen).

**Temaer som dekkes i denne modulen:**
- Repeterende grupper
- Validering
- Dataprosessering

## Oppgaver

{{% expandlarge id="rep-grupper" header="Repeterende grupper" %}}
### Krav fra kommunen

For å kunne skreddersy et best mulig tilbud til nye innflyttere ønsker vi oss en oversikt over tidligere bosteder til innflytteren.

På datasiden ønsker vi at det legges opp til at brukeren kan fylle inn tidligere bosteder. Tidligere bosteder skal inneholde følgende felter:
- Gateadresse
- Postnummer
- Poststed

Det skal være mulig å legge inn opptill 10 tidligere bosteder.

### Nyttig dokumentasjon
- [Oppsett for gruppering av felter](/nb/app//development/ux/fields/grouping)
- [Oppsett for repeterende grupper](/nb/app//development/ux/fields/grouping/repeating)

### Forståelsessjekk
- Hvilket felt i datamodellen er det som bestemmer om et element er repeterende?
- Hvor mange repetisjoner er tillatt for feltet `TidligereBosteder`?

{{% /expandlarge %}}


{{% expandlarge id="validering" header="Validering" %}}
### Krav fra kommunen

Grunnet en personlig vendetta blant en av Sogndal kommunes ansatte ønsker vi at om innflytter fyller inn postnummer `4619` som et av tidligere bosteder,
skal denne **IKKE** få lov til å flytte inn i Sogndal. Her ønsker vi at det skal dukke opp en feilmelding på det aktuelle feltet med følgende tekst:

```rich
Du er ikke velkommen til vår kommune. Beklager!
```

### Nyttig dokumentasjon
- [Serverside valideringer](/nb/app/development/logic/validation/#serverside-validering)
- [Hvordan legge til egendefinert validering](/nb/app/development/logic/validation/#hvordan-legge-til-egendefinert-validering)
- [Enkeltfeltvalideringer](/nb/app/development/logic/validation/#enkeltfeltvalidering)

### Forståelsessjekk
- Når kjøres valideringer serverside?
- Hvorfor burde valideringer som legges til på klientsiden også dupliseres på serversiden?

{{% /expandlarge %}}


{{% expandlarge id="processing" header="Dataprosessering" %}}
### Krav fra kommunen
En av kommunens databehandlere har sett seg lei av å manuelt rette opp i en gateadresse som ofte blir skrevet feil av innflyttere.
Vi ønsker derfor å programmatisk fikse opp i dette under utfyllingen av appen.

Om sluttbruker fyller inn `Sesame Street 1` i feltet `Innflytter.Adresse.Gateadresse` skal dette automatisk rettes til `Sesamsgate 1`.
I alle andre tilfeller skal feltet forbli urørt.


### Nyttig dokumentasjon
- [Dataprosessering](/nb/app/development/logic/dataprocessing/)
- [Kalkulering](/nb/app/development/logic/calculation/#kalkulering)

### Forståelsessjekk
- Når blir dataprosessering kjørt?
- Hva skiller `ProcessDataWrite` og `ProcessDataRead`?
- Hva er forskjellen på DataProcessing og Calculations?

{{% /expandlarge %}}


## Oppsummering
I denne modulen har du sett på **repeterende grupper** og hvordan dette konfigureres som en del av brukergrensesnittet.
Vi har også sett på hvordan man setter opp custom **valideringer** i backend for caser som ikke lar seg definere som en del av restriksjoner i datamodellen.
Til slutt har vi sett på hvordan man kan sette opp **dataprosessering** som muliggjør manipulering av data runtime.

### Løsningsforslag
Dersom du ikke har fått til alle stegene, har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/6) som du kan hente inspirasjon fra.

![Skjermbilde av datainnsamlingsside med repeterende gruppe](/app/app-dev-course/modul6/data-rep-grupper-screenshot.png "Skjermbilde av datainnsamlingsside med repeterende gruppe")