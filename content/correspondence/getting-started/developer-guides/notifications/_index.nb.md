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
I testmiljøet kan varslinger via SMS kun sendes til telefonnumre som er hvitlistet internt.
Ta kontakt med oss på [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog) hvis dette er nødvendig for din tjeneste.
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
      "smsBody": string?,
      "reminderNotificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3) | EmailAndSms(4),
      "reminderEmailBody": string?,
      "reminderEmailSubject": string?,
      "reminderSmsBody": string?,
      "requestedSendTime": DateTimeOffset?,
      "customRecipient": {
        "organizationNumber": string?,
        "nationalIdentityNumber": string?,
        "mobileNumber": string?,
        "emailAddress": string?
      }
    }
  },
  "Recipients": [],
  "ExistingAttachments":{...}
}
```

{{% notice info %}}
Merk: Varslingstjenesten bruker et V2 API internt. Varslingsbestillingen vil automatisk bli konvertert til V2-format når den behandles.
{{% /notice %}}

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
Det er også mulig å legge til valgfrie mottakere av varselet som ikke nødvendigvis er mottaker(e) av meldingen. 
I praksis betyr dette at valgfrie mottakere vil overstyre/erstatte den opprinnelige mottakeren som er angitt for varselet.

{{% notice warning %}}
⚠️ UTGÅTT: Feltet `customNotificationRecipients` er utgått og vil bli fjernet i en fremtidig versjon. Vennligst bruk `customRecipient` i stedet.
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
        "notificationRecipient": [
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

### Bruk av customRecipient (Anbefalt)
Den anbefalte måten er å bruke `customRecipient`-feltet under `notification` slik:

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

### Hvordan bruke valgfri mottaker
For utgått tilnærming:
```
correspondence.notification.customNotificationRecipients[0].recipientToOverride
correspondence.notification.customNotificationRecipients[0].recipients[0].organizationNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].nationalIdentityNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].mobileNumber
correspondence.notification.customNotificationRecipients[0].recipients[0].emailAddress
```

For anbefalt tilnærming:
```
correspondence.notification.customRecipient.organizationNumber
correspondence.notification.customRecipient.nationalIdentityNumber
correspondence.notification.customRecipient.mobileNumber
correspondence.notification.customRecipient.emailAddress
```

{{% panel theme="warning" %}}
⚠️ VIKTIG: 
Husk verdien som gis til `notificationTemplate` og `notificationChannel`, da disse vil påvirke den valgfri mottakeren. Flere detaljer er gitt [her](#varslingsmaler).
{{% /panel %}}

### Explanation of template and channel

For hver av de valgfrie mottakerne (i begge tilnærminger) er det kun mulig å oppgi ett av følgende felt:

1. Organisasjonsnummer
2. Fødselsnummer
3. Mobilnummer og/eller e-postadresse

Dersom enten mobilnummer eller e-postadresse brukes, må de ha riktig format for å kunne sende varslingene.
For e-poster aksepteres de fleste verdier så lenge de er i formen 'bruker@eksempel.com'.
For mobilnumre må de tilfredsstille _E.164-formatet_.

{{% panel theme="warning" %}}
⚠️ VIKTIG: For å bruke valgfrie mottakere for varslinger, må mottakerne være gyldige.
Dersom mottakerne er ugyldige vil ikke meldingen bli sendt ut.

Derfor anbefales det å kun bruke denne funksjonaliteten dersom det er kritisk for tjenesten.
For store utsendelser av meldinger bør disse opprettes uten tilpassede mottakere.
{{% /panel %}}
