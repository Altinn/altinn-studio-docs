---
title: Modul 4
description: Legge til kodelister manuelt, programatisk og dynamisk
linktitle: Modul 4
tags: [apps, training, options, kodelister, dynamikk ]
weight: 20
---

I denne modulen skal du utvide applikasjonen du har laget i foregående moduler for å støtte enda fler av [kravene til Sogndal kommune](../case/#krav-fra-kommunen).

**Temaer som dekkes i denne modulen:**

- Kodelister/Options
- Dynamikk

## Oppgaver

{{% expandlarge id="options-expandable" header="Innsamling av arbeidsopplysninger" %}}

I mange applikasjoner er det behov for å gi brukeren et sett med svaralternativer for et datafelt.
Svaralternativene refereres til som _kodelister_ eller _options_.

I Altinn Studio er dette støttet i form av radioknapper, avkrysningsbokser og nedtrekkslister.

{{% notice info %}}
Det er tre måter å sette opp kodelister i Altinn i dag
 1. Direkte på komponenten via Altinn Studio eller manuelt i _FormLayout.json_\*
 2. I en statisk json-fil som referes til i komponenten
 3. Programmatisk i applikasjonslogikken

   \* kun tilgjengelig på radioknapp og avkrysningsboks
{{% /notice %}}

I denne oppgaven skal du få prøve deg på alle tre måtene å sette opp en kodeliste på.


Sogndal kommune ønsker å samle inn opplysninger om tilflytterens arbeidsituasjon. Blant dataen de ønsker å samle inn er hvilken **sektor** og **bransje** tilflytter jobber i, og hvor mange **år** tilflytter har vært yrkesaktiv.


### I Altinn Studio

1. Opprett en ny skjemaside for å samle inn data om arbeidsforhold

2. Sett opp en **radioknapp**-komponent for _Sektor_ opprett svaralternativene `Offentlig` og `Privat` manuelt.

3. Sett opp en **avkrysningsboks** for _Bransje_.
   Velg _Kodeliste_ som metode for å legge til avkrysningsboker og legg inn _Kodeliste ID_ `industry`.

   Resten av oppsettet for denne komponenten gjøres lokalt.

4. Sett opp en **nedrekksliste** for _År i arbeidslivet_.
   Legg inn _Kodeliste ID_ `years-in-work-force`.

   Resten av oppsettet for denne komponenten gjøres lokalt.

5. _Commit_ og _Push_ endringene dine til master,
   og _Pull_ endringene i ditt lokale utviklingsmiljø.

### I lokalt utviklingsmiljø

1. Sogndal kommune har opprettet [en kodeliste for **bransjer**](../industry.json). Last ned filen og plasser denne på rett sted i repoet.

2. Sett opp verdiene i kodelisten for **År i arbeidslivet** direkte i en ny C#-klasse.

   Svaralternativer:

   Label      | Dataverdi
   -----------|----------
   0 - 5 år   | `0-5`
   5 - 10 år  | `5-10`
   10 - 20 år | `10-20`
   20+ år     | `20+`

3. Verifiser at alle kodelister fungerer som forventet.

### Nyttig dokumentasjon

- [Hvordan sette opp statiske kodelister](/nb/app/development/data/options/#statisk-kodeliste-fra-app-repo)
- [Sikrede dynamiske kodelister](/nb/app/development/data/options/#sikrede-dynamiske-kodelister)

### Forståelsessjekk
- Hva er forskjellen på statiske og dynamiske svaralternativer?
- Hva vil være et bruksområde for sikrede, dynamiske svaralternativer?

{{% /expandlarge %}}


{{% expandlarge id="dynamikk-expandable" header="Differensiert datagrunnlag for offentlig og privat sektor" %}}

I noen tilfeller kan verdiene som skal vises fram i en kodeliste være knyttet til et annet felt i skjemaet.

Sogndal kommune ønsker at listen av bransjer å velge mellom skal spisses til hvilken sektor man jobber i.

Les gjennom kravene til kommunen for å se om du kan hjelpe dem.

### Krav fra kommunen

Vi ønsker at brukerne skal ha et ulikt sett med svaralternativer for bransjevalget
basert på hvilken sektor de har krysset av for.

- Privat sektor: [Standardlisten med bransjer](../industry.json)
- Offentlig sektor: `Stat` og `Kommune`

### Nyttig dokumentasjon
- [Hvordan sende med spørringsparametre ved henting av kodelister](/nb/app/development/data/options/#sende-med-query-parametere-ved-henting-av-options)
- [Hvordan sette opp dynamiske kodelister](/nb/app/development/data/options/#dynamisk-kodeliste-generert-runtime)

### Forståelsessjekk
- Om en kodeliste er satt opp med en mapping mot datamodellen, hva skjer når det aktuelle feltet endrer verdi?
- Hva skjer med valgt verdi på et felt som er koblet til en kodeliste som hentes på nytt fra serversiden?

{{% /expandlarge %}}

{{% expandlarge id="dynamikk-skjemavisning" header="Skreddersydd tilbud for IT-kompetanse" %}}

### Krav fra kommunen

Vi ønsker at dersom brukeren velger `IKT (data/it)` under bransje at det vises en tekst med en lenke til en av våre stillingsutlysninger.

- Under bransje-valget skal følgende tekst presenteres:

    ```rich
    Vi ser at du besitter kompetanse vi trenger i kommunen.
    Se en oversikt over våre ledige stillinger her.
    ```

- Linje 2 i teksten skal være en hyperlenke som peker på https://sogndal.easycruit.com/index.html.

Tekst og lenke skal **kun** vises om man har valgt `IKT (data/it)`. I alle andre tilfeller skal dette være skjult.

### Nyttig dokumentasjon
- [Legge til funksjoner for regler eller dynamikk](/nb/app/development/logic/dynamic/#legg-tilrediger-funksjoner-for-beregninger-eller-visskjul)
- [Eksempler på bruk av dynamikk i skjema](/nb/app/development/logic/dynamic/#eksempel-på-bruk-av-dynamikk-i-skjema)

### Forståelsessjekk
- Hvis du legger til en ny funksjon i `RuleHandlerHelper`, hvor kjøres disse funksjonene?
  - Vil dynamikk fungere uten denne definert?
- Hvis du legger til en ny funksjon i `RuleHandlerObject`, hvor kjøres disse funksjonene?
  - Vil dynamikk fungere uten denne definert?
- Hva er sammenhengen mellom funksjoner definert i `RuleHandlerObject` og filen `RuleConfiguration.json`?

{{% /expandlarge %}}

## Oppsummering

I denne modulen har du satt opp nedtrekksliste, radioknapp og avkrysningsbokser og lagt inn verdier for disse komponentene manuelt, programmatisk og dynamisk.

Tjenesten skal kunne kjøres opp på din lokale maskin med lokal test
og du skal kunne validere at komponentene presenterer forventede dataverdier.

**Husk å _pushe_ de lokale endringene dine, så de blir tilgjengelig i Altinn Studio når du er fornøyd**

### Løsningsforslag
Dersom du ikke har fått til alle stegene, har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/4) som du kan hente inspirasjon fra.

![Skjermbilde av innsamling av arbeidsopplysninger for privat sektor](/app/app-dev-course/modul4/arbeidsopplysninger-privat-screenshot.png "Skjermbilde av innsamling av arbeidsopplysninger for privat sektor")
![Skjermbilde av innsamling av arbeidsopplysninger for offentlig sektor](/app/app-dev-course/modul4/arbeidsopplysninger-offentlig-screenshot.png "Skjermbilde av innsamling av arbeidsopplysninger for offentlig sektor")