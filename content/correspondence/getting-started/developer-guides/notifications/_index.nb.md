---
title: Altinn 3 Correspondence Utviklerguider
linktitle: Varsling gjennom Altinn Melding
description: Hvordan komme i gang med varslinger gjennom Altinn 3 Melding, for utviklere
tags: [Melding, guide, events, hendelser, Correspondence]
toc: true
weight: 40
---

{{<children />}}

{{% notice warning  %}}
Denne delen av dokumentasjonen er under arbeid, og refererer derfor i stor grad til eksterne kilder.
{{% /notice %}}

{{% notice warning  %}}
For øyeblikket er varslinger for Melding ikke klare for fullskala bruk, på grunn av kommende endringer i Altinn Notifications.
Dette dokumenterer det forventede scenarioet, men kan endres.
{{% /notice %}}

For å bruke varslinger i en meldingstjeneste, legges en varslingsbestilling til når en melding opprettes. Varslingen vil bli sendt ut på publikasjonstidspunktet for meldingen. Hvis revarsel er aktivert, vil revarselet sendes ut etter 7 dager dersom meldingen ikke er lest.
I test- og stagingmiljøet vil revarselet sendes ut etter det har gått en time dersom meldingen ikke er lest.

Varslinger kan sendes via enten e-post eller SMS. Mens e-post ikke har noe tidsvindu, vil SMS-varsler bli sendt mellom kl. 09:00 og 17:00. Hvis avsendingstidspunktet faller utenfor dette tidsvinduet, vil varselet bli sendt neste dag.
{{% notice warning  %}}
I testmiljøet kan varslinger via SMS kun sendes til telefonnumre som er hvitlistet internt. Ta kontakt med oss på [Altinn@Slack#produkt-melding](https://join.slack.com/t/altinn/shared_invite/zt-7c77c9si-ZnMFwGNtab1aFdC6H_vwog) hvis dette er nødvendig for din tjeneste.
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
{{% notice warning  %}}
Keywords er ikke ferdig implementert, men forventes å være på plass i Q4 2024. Mer dokumentasjon kommer da. 
{{% /notice %}}
Keywords er en liste tokens som lar deg personalisere varslingene med for eksempel mottakers navn. For eksempel vil man kunne bruke \$sendersName\$ for å vise organisasjonsnavnet til avsender. 

## Varslingsmaler
Det tilbys to typer varslingsmaler når du bruker varsling gjennom Meldings-API`et.
{{% notice warning  %}}
NOTE: Disse malene vil kunne endres fremmover. Spesielt da Keywords blir ferdig implementert. 
{{% /notice %}}

**CustomText:** 
- Hele meldingen skrives inn av avsender og sendes i sin helhet til mottaker. 

**GenericAltinnMessage:** 
- En generisk Altinn-tekst med mulighet for å supplere med ekstra tekst. Foreløpig støttede språk er norsk, nynorsk og engelsk. Språk velges basert på språket definert i meldingen 

**Tittel:** Du har mottatt en melding i Altinn {textToken}<br>
**Innhold:** Hei \$recipientName\$, du har mottatt en ny melding i Altinn fra \$sendersName\$. {textToken} Logg deg inn i Altinn inboks for å se denne meldingen.

**Revarsel tittel:** Påminnelse - du har mottatt en melding i Altinn {textToken}<br>
**Revarsel innhold:** Hei \$recipientName\$, dette er en påminnelse om at du har mottatt en ny melding i Altinn fra \$sendersName\$. {textToken} Logg deg inn i Altinn inboks for å se denne meldingen.

I teksten vil textToken bli byttet ut med verdien gitt i for eksempel "EmailSubject" for tittelen. SMS bruker kun innholdet, ikke tittelen.

NB! Linker skal ALDRI brukes i varslinger. 

## Varslingskanaler 
Støttede varslingskanaler: 
- **Email:** Sender en e-post til mottaker.
- **SMS:** Sender en sms til mottaker. Støtter nasjonale og internasjonale telefonnummre.
- **EmailPreferred:** Bruker e-post som hoved kommunikasjonskanal, og SMS som fallback hvis e-post ikke er tilgjengelig.
- **SmsPreferred:** Bruker SMS som hoved kommunikasjonskanal, og e-post som fallback om SMS ikke finnes.

Hovedvarsel og revarsel kan bruke forskjellige notifikasjonskanaler. For eksempel kan man velge å sende første varsel på e-post, men så går det ett revarsel på sms etter 7 dager.

## Kansellering av varsling
Dersom en melding slettes før publiseringsdatoen, vil varslingsbestillingen også bli slettet. I tilfeller der det oppstår en feil under publisering av en melding, vil varslingen også bli slettet.

## Feil ved bestilling av varsling
Hvis det ikke finnes kontaktinformasjon for en mottaker, vil meldingen fortsatt bli sendt som planlagt. 
Informasjon om varslingen kan sees ved å hente detaljer om den spesifikke meldingen. 
Det er planlagt forbedringer for å gi tilbakemelding omkring dette under opprettelsen av en melding.
