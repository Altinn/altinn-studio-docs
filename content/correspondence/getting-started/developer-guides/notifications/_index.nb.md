---
title: Varsling i Altinn 3 Melding
linktitle: Varsling gjennom Altinn Melding
description: Hvordan komme i gang med varslinger gjennom Altinn 3 Melding, for utviklere
tags: [Melding, guide, events, hendelser, Correspondence]
toc: true
weight: 40
---

{{<children />}}

For å bruke varslinger i en meldingstjeneste, legges en varslingsbestilling til når en melding opprettes.
Varslingen vil bli sendt ut på publikasjonstidspunktet for meldingen. 
Hvis revarsel er aktivert, vil revarselet sendes ut etter 7 dager dersom meldingen ikke er lest.
I test- og stagingmiljøet vil revarselet sendes ut etter det har gått en time dersom meldingen ikke er lest.

Varslinger kan sendes via enten e-post eller SMS. Mens e-post ikke har noe tidsvindu, vil SMS-varsler bli sendt mellom kl. 09:00 og 17:00.
Hvis avsendingstidspunktet faller utenfor dette tidsvinduet, vil varselet bli sendt neste dag.
{{% notice warning  %}}
I testmiljøet kan varslinger via SMS kun sendes til telefonnumre som er hvitlistet internt.
Ta kontakt med oss på [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog) hvis dette er nødvendig for din tjeneste.
{{% /notice %}}

En varslingsbestilling gjøres ved å legge til følgende når du initialiserer en melding:

```json
{
  "Correspondence": {
    ...,
    "notification": {
      "notificationTemplate": CustomText (0) | GenericAltinnMessage(1),
      "notificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3),
      "SendReminder": boolean,
      "EmailBody": string?,
      "EmailSubject": string?,
      "SmsBody": string?,
      "ReminderNotificationChannel": Email(0) | Sms(1) | EmailPreferred(2) | SmsPreferred(3),
      "ReminderEmailBody": string?,
      "ReminderEmailSubject": string?,
      "ReminderSmsBody": string?
    }
  },
  "Recipients": [],
  "ExistingAttachments":{...}
}
```

## Keyword støtte

Keywords er en liste tokens som lar deg personalisere varslingene med for eksempel mottakers navn.
| Verdi                 | Beskrivelse                                                                                                                            | Ekstra                                                                               |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------- |--------------------------------------------------------------------------------------|
| \$sendersName\$       | Blir byttet ut med avsenders navn. Enten "MessageSender" om attributten har en verdi, eller basert på ett oppslag i Altinn Register.   | Støttes for alle scenarioer                                                          |
| \$recipientName\$     | Blir byttet ut med mottakers navn. Dette vil være enten organisasjonsnavn eller personens navn.                                        | Støttes ikke dersom varsel blir sendt direkte til e-post adresse eller telefonnummer |
| \$recipientNumber\$   | Dersom mottaker er en organisasjon vises Organisasjonsnummer. Dersom mottaker er en privatperson vises ingenting                       | Støttes ikke dersom varsel blir sendt direkte til e-post adresse eller telefonnummer |

## Varslingsmaler

Det tilbys to typer varslingsmaler når du bruker varsling gjennom Meldings-API`et.

**CustomText:**

- Hele meldingen skrives inn av avsender og sendes i sin helhet til mottaker.

**GenericAltinnMessage:**

- En generisk Altinn-tekst med mulighet for å supplere med ekstra tekst. Foreløpig støttede språk er norsk, nynorsk og engelsk. Språk velges basert på språket definert i meldingen

**Tittel:** Du har mottatt en melding i Altinn {textToken}<br>
**Innhold:** Hei \$recipientName\$, du har mottatt en ny melding fra \$sendersName\$. {textToken} Logg deg inn i Altinn for å se denne meldingen.

**Revarsel tittel:** Påminnelse - du har mottatt en melding i Altinn {textToken}<br>
**Revarsel innhold:** Hei \$recipientName\$, dette er en påminnelse om at du har mottatt en ny melding fra \$sendersName\$. {textToken} Logg deg inn i Altinn for å se denne meldingen.

I teksten vil textToken bli byttet ut med verdien gitt i for eksempel "EmailSubject" for tittelen. SMS bruker kun innholdet, ikke tittelen.
\$recipientName\$ vil bli byttet ut med mottakers navn. Dette vil være enten organisasjonsnavn eller personens navn.
 
NB! Linker skal ALDRI brukes i varslinger.

## Varslingskanaler

Støttede varslingskanaler:

- **Email:** Sender en e-post til mottaker.
- **SMS:** Sender en sms til mottaker. Støtter nasjonale og internasjonale telefonnummre.
- **EmailPreferred:** Bruker e-post som hoved kommunikasjonskanal, og SMS som fallback hvis e-post ikke er tilgjengelig.
- **SmsPreferred:** Bruker SMS som hoved kommunikasjonskanal, og e-post som fallback om SMS ikke finnes.

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
Dette gjøres ved å fylle ut `recipients`-feltet under `notification` slik:

```json
{
  "notification": {
    ...,
    "recipients": [
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

Alle valgfrie mottakere må overstyre en eksisterende mottaker i listen til `Correspondence.Recipients`l
Denne verdien vil være enten organisasjonsnummeret eller fødselsnummeret til mottakeren av korrespondansen.

Det er også kun mulig å oppgi ett av følgende felt for mottakeren:

1. Organisasjonsnummer
2. Fødselsnummer
3. Mobilnummer og/eller e-postadresse

Dersom enten mobilnummer eller e-postadresse brukes, må de ha riktig format for å kunne sende varslingene.
For e-poster aksepteres de fleste verdier så lenge de er i formen 'bruker@eksempel.com'.
For mobilnumre må de tilfredsstille _E.164-formatet_.

{{% panel theme="warning" %}}
⚠️ VIKTIG: For å bruke valgfrie mottakere for varslinger, må **alle** mottakere være gyldige.
Dersom en mottaker er ugyldig vil ikke meldingen(e) bli sendt ut.

Derfor anbefales det å kun bruke denne funksjonaliteten dersom det er kritisk for tjenesten.
For store utsendelser av meldinger bør disse opprettes uten tilpassede mottakere.
{{% /panel %}}
