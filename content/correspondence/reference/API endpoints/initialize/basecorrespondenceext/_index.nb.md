---
title: BaseCorrespondenceExt
linktitle: BaseCorrespondenceExt
description: Beskrivelse av feltene i objektet

weight: 60
toc: true
---
Link til [BaseCorrespondenceExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/BaseCorrespondenceExt.cs)

Representerer et request objektet for operasjonen InitializeCorrespondence, som kan opprette en melding i Altinn.

### resourceId

Type: _string_

ID-en for ressursen knyttet til meldingen

### sender

Type: _string_

Avsenderen av meldingen.

### sendersReference

Type: _string_

Brukes av avsendere og mottakere for å identifisere en spesifikk melding ved bruk av eksterne identifikasjonsmetoder.

### messageSender

Type: _string?_

Et alternativt navn for avsenderen av meldingen. Navnet vil bli vist i stedet for organisasjonsnavnet.

### content

Type: [InitializeCorrespondenceContentExt](/correspondence/reference/api-endpoints/initialize/initializecorrespondencecontentext)

Meldinginnholdet. Inneholder informasjon om tittel, innhold, osv.

### requestedPublishTime

Type: _DateTimeOffset?_

Når meldingen skal bli synlig for mottakeren.
Hvis verdien er satt til `null` under initialisering, publiseres meldingen umiddelbart.

### allowSystemDeleteAfter

Type: _DateTimeOffset?_

Når Altinn kan fjerne meldingen fra databasen sin

### dueDateTime

Type: _DateTimeOffset?_

Dato og tid for når mottakeren må svare/bekrefte.

### externalReferences

Type: [List\<ExternalReferencesExt>?](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/ExternalReferenceExt.cs)

En liste over referanser som avsendere kan bruke for å informere mottakeren om at meldingen er relatert til de refererte elementene.
Eksempler inkluderer Altinn App-instanser, Altinn Formidling filoverføringer.

### propertyList

Type: _Dictionary\<string, string>_

Brukerdefinerte egenskaper relatert til meldingen.

### replyOptions

Type: [List\<CorrespondenceReplyOptions>](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/CorrespondenceReplyOptionExt.cs)

Alternativer for hvordan mottakeren kan svare på meldingen ved å få tilgang til en eller flere URL-er.

### notification

Type: [InitializeCorrespondenceNotificationExt?](/correspondence/reference/api-endpoints/initialize/initializecorrespondencenotificationext)

Varslinger direkte relatert til meldingen

### ignoreReservation

Type: _bool?_, false hvis ikke spesifisert

Spesifiserer om meldingen kan overstyre reservasjon mot digital kommunikasjon i __Kontakt- og reservasjonsregisteret (KRR)__

### published

Type: _DateTimeOffset?_

Dato og tid for når meldingen ble publisert. Denne verdien settes automatisk etter at meldingen er publisert.

### isConfirmationNeeded

Type: _bool?_, false hvis ikke spesifisert

Spesifiserer om mottakeren må bekrefte at meldingen er lest.
Hvis bekreftelse er nødvendig og mottakeren ikke har bekreftet meldingen innen forfallsdatoen, vil dette resultere i at hendelsen `CorrespondenceRecipientNeverConfirmed` blir publisert.