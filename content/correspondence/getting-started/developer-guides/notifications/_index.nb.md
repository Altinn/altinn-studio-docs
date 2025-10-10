---
title: Varsling i Altinn 3 Melding
linktitle: Varsling
description: Hvordan komme i gang med varslinger gjennom Altinn 3 Melding, for utviklere
tags: [Melding, guide, events, hendelser, Correspondence]
toc: true
weight: 40
---

{{<children />}}

For å bruke varslinger i en meldingstjeneste, legges en varslingsbestilling til når en melding opprettes.
Varslingen vil bli sendt ut 5 minutter etter publikasjonstidspunktet for meldingen. Hvis publikasjonstidspunktet er i fortiden, vil varslingen bli sendt 5 minutter etter nåværende tidspunkt.
Hvis revarsel er aktivert, vil revarselet sendes ut etter 7 dager dersom meldingen ikke er lest.
I test- og stagingmiljøet vil revarselet sendes ut etter 1 dag dersom meldingen ikke er lest.

{{% notice info %}}
Merk: Tidsintervallet for revarsel i test- og stagingmiljøer er for øyeblikket satt til 1 dag på grunn av begrensninger i varslingstjenesten. Dette er en midlertidig endring, og det arbeides med å gjenopprette det tidligere 1-timers intervallet.
{{% /notice %}}

Varslinger kan sendes via enten e-post eller SMS. Mens e-post ikke har noe tidsvindu, vil SMS-varsler bli sendt mellom kl. 09:00 og 17:00.
Hvis avsendingstidspunktet faller utenfor dette tidsvinduet, vil varselet bli sendt neste dag.
{{% notice warning  %}}
I testmiljøet kan du bare sende SMS-varsler til hvitlistede telefonnumre.  
Send en e-post til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no?subject=Hvitlisting%20av%20telefonnummer) med telefonnummeret som skal hvitlistes.
{{% /notice %}}

En varslingsbestilling gjøres ved å legge til følgende når du initialiserer en melding:

```json
{
  "correspondence": {
    ...,
    "notification": {
      "notificationTemplate": CustomMessage (0) | GenericAltinnMessage(1),
      "notificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3) | EmailAndSms(4),
      "sendReminder": boolean,
      "emailBody": string?,
      "emailSubject": string?,
      "emailContentType": Plain(0) | Html(1),
      "smsBody": string?,
      "reminderNotificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3) | EmailAndSms(4),
      "reminderEmailBody": string?,
      "reminderEmailSubject": string?,
      "reminderEmailContentType": Plain(0) | Html(1),
      "reminderSmsBody": string?,
      "requestedSendTime": DateTimeOffset?,
      "customRecipients": [
        {
          "organizationNumber": string?,
          "nationalIdentityNumber": string?,
          "mobileNumber": string?,
          "emailAddress": string?
        }
      ],
      "overrideRegisteredContactInformation": boolean
    }
  },
  "Recipients": [],
  "ExistingAttachments":{...}
}
```

## Feltvalidering og tegnbegrensninger

Når du oppretter varslinger, gjelder følgende valideringsregler og tegnbegrensninger. Disse grensene er anbefalt av Altinn Notifications-tjenesten for å sikre korrekt visning og levering:

| Felt | Maksimal lengde | Beskrivelse |
|------|----------------|-------------|
| `emailSubject` | 128 tegn | Anbefalt av Altinn Notifications-tjenesten for å sikre at e-postemnet vises korrekt i e-postklienter |
| `emailBody` | 10 000 tegn | Støtter detaljert innhold i både ren tekst og HTML-format |
| `smsBody` | 2 144 tegn | Samsvarer med Altinn Notifications-tjenestens SMS-behandlingsgrenser. Tilsvarer 16 SMS-segmenter (16 × 134 tegn per segment) |
| `reminderEmailSubject` | 128 tegn | Samme anbefaling som hovedvarslingens e-postemne |
| `reminderEmailBody` | 10 000 tegn | Støtter detaljert innhold i både ren tekst og HTML-format |
| `reminderSmsBody` | 2 144 tegn | Samme grense som hovedvarslingens SMS-innhold |

**Merk:** Hvis du overskrider disse grensene, vil du motta en `400 Bad Request`-feilrespons med detaljer om hvilket felt som overskred grensen.

## Keyword støtte

Keywords er en liste tokens som lar deg personalisere varslingene med for eksempel mottakers navn.
| Verdi                           | Beskrivelse                                                                                                                            | Ekstra                                                                               |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------- |--------------------------------------------------------------------------------------|
| \$sendersName\$                 | Blir byttet ut med avsenders navn. Enten "MessageSender" om attributten har en verdi, eller basert på ett oppslag i Altinn Register.   | Støttes for alle scenarioer                                                          |
| \$correspondenceRecipientName\$ | Blir byttet ut med melding mottakers navn. Dette vil være enten organisasjonsnavn eller personens navn.                                | Støttes for alle scenarioer                                                          |
| \$recipientName\$               | Blir byttet ut med varsling mottakers navn. Dette vil være enten organisasjonsnavn eller personens navn.                               | Støttes ikke dersom varsel blir sendt direkte til e-post adresse eller telefonnummer |
| \$recipientNumber\$             | Dersom mottaker er en organisasjon vises Organisasjonsnummer. Dersom mottaker er en privatperson vises ingenting                       | Støttes ikke dersom varsel blir sendt direkte til e-post adresse eller telefonnummer |

## Varslingsmaler

Det tilbys to typer varslingsmaler når du bruker varsling gjennom Meldings-API`et.

**CustomText:**

- Hele meldingen skrives inn av avsender og sendes i sin helhet til mottaker.

**GenericAltinnMessage:**

- En generisk Altinn-tekst med mulighet for å supplere med ekstra tekst. Foreløpig støttede språk er norsk, nynorsk og engelsk. Språk velges basert på språket definert i meldingen

**Tittel:** En melding har blitt mottatt i Altinn {textToken}<br>
**Innhold:** Hei. $correspondenceRecipientName$ har mottatt en ny melding fra $sendersName$. {textToken}Logg deg inn i Altinn for å se denne meldingen.

**Revarsel tittel:** Påminnelse - en melding har blitt mottatt i Altinn {textToken}<br>
**Revarsel innhold:** Hei. Dette er en påminnelse om at $correspondenceRecipientName$ har mottatt en ny melding fra $sendersName$. {textToken}Logg deg inn i Altinn for å se denne meldingen.

I teksten vil textToken bli byttet ut med verdien gitt i for eksempel "EmailSubject" for tittelen. SMS bruker kun innholdet, ikke tittelen.
\$recipientName\$ vil bli byttet ut med mottakers navn. Dette vil være enten organisasjonsnavn eller personens navn.
 
NB! Linker skal ALDRI brukes i varslinger.

## Varslingskanaler

Støttede varslingskanaler:

- **Email:** Sender en e-post til mottaker.
- **SMS:** Sender en sms til mottaker. Støtter nasjonale og internasjonale telefonnummre.
- **EmailPreferred:** Bruker e-post som hoved kommunikasjonskanal, og SMS som fallback hvis e-post ikke er tilgjengelig.
- **SmsPreferred:** Bruker SMS som hoved kommunikasjonskanal, og e-post som fallback om SMS ikke finnes.
- **EmailAndSms:** Sender både e-post og SMS til mottakeren samtidig.
Hovedvarsel og revarsel kan bruke forskjellige notifikasjonskanaler. 
For eksempel kan man velge å sende første varsel på e-post, men så går det ett revarsel på sms etter 7 dager.

## Kansellering av varsling

Dersom en melding slettes før publiseringsdatoen, vil varslingsbestillingen også bli slettet.
I tilfeller der det oppstår en feil under publisering av en melding, vil varslingen også bli slettet.

## Feil ved bestilling av varsling

Hvis det ikke finnes kontaktinformasjon for en mottaker, vil meldingen fortsatt bli sendt som planlagt.
Informasjon om varslingen kan sees ved å hente detaljer om den spesifikke meldingen.
Det er planlagt forbedringer for å gi tilbakemelding omkring dette under opprettelsen av en melding.

## Valgfri mottakere for varsling

For meldinger som er opprettet med varsling aktivert vil mottakeren av varslingen være den samme som mottakeren av meldingen.
Det er derimot mulig benytte valgfrie mottakere av varsling, som ikke nødvendigvis er mottaker av meldingen.
I praksis betyr dette at valgfrie mottakere vil motta varsler **i tillegg til** den opprinnelige meldingsmottakeren.

### Bruk av customRecipients (Anbefalt)
Den anbefalte måten er å bruke `customRecipients`-feltet under `notification` for å spesifisere flere mottakere:

```json
{
  "notification": {
    ...,
    "customRecipients": [
      {
        "organizationNumber": "string",
        "nationalIdentityNumber": "string",
        "mobileNumber": "string",
        "emailAddress": "string"
      },
      {
        "organizationNumber": "string",
        "nationalIdentityNumber": "string",
        "mobileNumber": "string",
        "emailAddress": "string"
      }
    ]
  }
}
```

**Merk**: Varsler vil bli sendt til både standard meldingsmottaker OG alle valgfrie mottakere som er listet ovenfor.

{{% notice warning %}}
⚠️ UTGÅTT: Feltet `customRecipient` er utgått og vil bli fjernet i en fremtidig versjon. Vennligst bruk `customRecipients` i stedet.
{{% /notice %}}

### Bruk av customRecipient (Utgått)
For bakoverkompatibilitet kan du fortsatt bruke `customRecipient`-feltet for en enkelt mottaker:

```json
{
  "notification": {
    ...,
    "customRecipient": {
      "organizationNumber": "string",
      "nationalIdentityNumber": "string",
      "mobileNumber": "string",
      "emailAddress": "string"
    }
  }
}
```

{{% notice warning %}}
⚠️ UTGÅTT: Feltet `customNotificationRecipients` er utgått og vil bli fjernet i en fremtidig versjon. Vennligst bruk `customRecipients` i stedet.
{{% /notice %}}

### Bruk av customNotificationRecipients (Utgått)
Dette gjøres ved å fylle ut `customNotificationRecipients`-feltet under `notification` slik:

```json
{
  "notification": {
    ...,
    "customNotificationRecipients": [
      {
        "recipientToOverride": "string",
        "recipients": [
          {
            "organizationNumber": "string",
            "nationalIdentityNumber": "string",
            "mobileNumber": "string",
            "emailAddress": "string"
          }
        ]
      }
    ]
  }
}
```

### Valideringsregler for valgfrie mottakere

Når du bruker valgfrie mottakere, gjelder følgende valideringsregler:

1. **Tilleggsmottakere**: Valgfrie mottakere får varsler **i tillegg til** standard meldingsmottaker, ikke i stedet for dem.

2. **Kun én mottaker**: Hvis valgfrie mottakere er spesifisert, må meldingen ha kun én standard mottaker (ikke flere mottakere).

3. **Kun én identifikator påkrevd**: Hver valgfrie mottaker må ha nøyaktig ett identifikatorfelt fylt ut:
   - `organizationNumber` (for organisasjoner)
   - `nationalIdentityNumber` (for personer)
   - `emailAddress` (for direkte e-postvarsler)
   - `mobileNumber` (for direkte SMS-varsler)

4. **Keyword-begrensninger**: Når du bruker `emailAddress` eller `mobileNumber`, kan ikke `$recipientName$`-keywordet brukes i noe varslingsinnhold (e-postemne, e-postinnhold, SMS-innhold, revarselfelt) fordi navneoppslag ikke er tilgjengelig for direkte kontaktinformasjon.

5. **Formatvalidering**:
   - **E-postadresser**: Må være i gyldig e-postformat (f.eks. `bruker@eksempel.com`)
   - **Mobilnumre**: Må følge E.164-standarden og være gyldige telefonnumre. Kan starte med `+` eller `00` for internasjonalt format. Norske numre som starter med 4 eller 9 får automatisk `+47`-prefiks hvis ingen landskode er oppgitt.
   - **Organisasjonsnumre**: Må være i format `0192:organisasjonsnummer` eller `urn:altinn:organisasjonsnummer:organisasjonsnummer`
   - **Fødselsnumre**: Må være gyldige 11-sifrede norske fødselsnumre

### Hvordan bruke valgfri mottaker
For anbefalt tilnærming (flere mottakere):
```
correspondence.notification.customRecipients[0].organizationNumber
correspondence.notification.customRecipients[0].nationalIdentityNumber
correspondence.notification.customRecipients[0].mobileNumber
correspondence.notification.customRecipients[0].emailAddress
correspondence.notification.customRecipients[1].organizationNumber
// ... ytterligere mottakere
```

For utgått enkelt mottaker tilnærming:
```
correspondence.notification.customRecipient.organizationNumber
correspondence.notification.customRecipient.nationalIdentityNumber
correspondence.notification.customRecipient.mobileNumber
correspondence.notification.customRecipient.emailAddress
```

For utgått flere mottakere tilnærming:
```
correspondence.notification.customNotificationRecipients[0].recipientToOverride
correspondence.notification.customNotificationRecipients[0].recipients[0].organizationNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].nationalIdentityNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].mobileNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].emailAddress
```

{{% panel theme="warning" %}}
⚠️ VIKTIG: 
Både `notificationTemplate` og `notificationChannel` er anvendelige når du bruker valgfrie mottakere:

- **`notificationTemplate`**: Bestemmer innholdet (e-postemne, innhold, SMS-innhold) som vil bli sendt til den valgfrie mottakeren
- **`notificationChannel`**: For organisasjon og person som valgfrie mottakere bestemmer dette kanalene som varslingene sendes til. For direkte e-post/mobil som valgfrie mottakere er kanalen ikke lenger anvendelig.

Flere detaljer er gitt [her](#varslingsmaler).
{{% /panel %}}

## Overstyr standard mottaker oppførsel

Som standard, når du bruker valgfrie mottakere, sendes varsler til både standard meldingsmottaker OG alle valgfrie mottakere. Du kan imidlertid overstyre denne oppførselen ved å bruke `overrideRegisteredContactInformation`-flagget.

### Bruk av overrideRegisteredContactInformation

`overrideRegisteredContactInformation`-flagget lar deg kontrollere om standard meldingsmottaker skal inkluderes i varsler:

```json
{
  "notification": {
    ...,
    "customRecipients": [
      {
        "organizationNumber": "string",
        "nationalIdentityNumber": "string",
        "mobileNumber": "string",
        "emailAddress": "string"
      }
    ],
    "overrideRegisteredContactInformation": true
  }
}
```

### Oppførsel

- **`overrideRegisteredContactInformation: false` (standard)**: Varsler sendes til standard meldingsmottaker OG alle valgfrie mottakere
- **`overrideRegisteredContactInformation: true`**: Varsler sendes KUN til valgfrie mottakere (standard meldingsmottaker ekskluderes)

### Valideringsregler

1. **Valgfrie mottakere påkrevd**: `overrideRegisteredContactInformation`-flagget kan kun settes til `true` når `customRecipients` er oppgitt og ikke tom
2. **Standardverdi**: Hvis ikke spesifisert, standardiserer `overrideRegisteredContactInformation` til `false`

### Eksempel brukstilfeller

**Scenario 1: Tilleggsmottakere (Standard oppførsel)**
```json
{
  "notification": {
    "customRecipients": [{"organizationNumber": "123456789"}],
    "overrideRegisteredContactInformation": false
  }
}
```
Resultat: Varsler sendes til både standard meldingsmottaker OG den valgfrie organisasjonen

**Scenario 2: Overstyr standard mottaker**
```json
{
  "notification": {
    "customRecipients": [{"organizationNumber": "123456789"}],
    "overrideRegisteredContactInformation": true
  }
}
```
Resultat: Varsler sendes KUN til den valgfrie organisasjonen (standard meldingsmottaker ekskluderes)


