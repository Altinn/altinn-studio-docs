---
title: Bolk 7
description: Frittstående utvidelser av appen
linktitle: Bolk 7
tags: [apps, training ]
weight: 20
---

{{% notice warning %}}
MERK: Denne bolken er fortsatt under utvikling. Ta en titt innom på et senere tidspunkt så er den nok blitt enda bedre!
{{% /notice %}}

I denne bolken er det en samling med frittstående utvidelser av applikasjonen. De trenger ikke å løses i rekkefølge.


**Temaer som dekkes i denne bolken:**
- Oppsummmeringsside
- Stateless applikasjon
- Variabler i tekst
- Bruk av eksternt API
- Konfigurasjon av Meldingsboks
- Presentasjonstekster

## Oppgaver

{{% expandlarge id="Oppsummeringsside" header="Oppsummeringsside" %}}
### Krav fra kommunen
Sogndal kommune opplever at enkelte innsendinger inneholder feilopplysninger og skrivefeil som skaper unødig arbeid for saksbehandlere.
For å unngå at personer sender inn feil informasjon ønsker kommunen at brukeren presenteres for en oppsummmeringsside som viser hvilk

Sogndal kommune ønsker at man benytter kategoriene **Personalia** om brukerens person-infomrasjon, og **Arbeid** om svarene gitt på brukerens arbeidshistorikk.

### Nyttig dokumentasjon
- [Hvordan sette opp visning av oppsummering av utfylt skjema](/nb/app/development/ux/pages/summary/)
- [Kategorier i oppsummering](/nb/app/development/ux/pages/summary/#kategorier)

### Forståelsessjekk
- Hvorfor burde oppsummeringssiden ignoreres fra PDF-genereringen?

{{% /expandlarge %}}


{{% expandlarge id="stateless" header="Stateless førsteside" %}}
### Krav fra kommunen
Sogndal kommune har oppdaget at det er en del trafikk fra personer som ikke møter kriteriene i applikasjonen.
For hver av disse brukerene blir det laget en instans lagret til databasen. Dette skaper unødige utgifter.

Sogndal kommune ønsker derfor at informasjonssiden vises som en "stateless"-del av applikasjonen, og at man derfra kan velge å starte en instans om man
møter kriteriene.

### Nyttig dokumentasjon
- [Introduksjon til stateless applikasjoner](/nb/app/development/configuration/stateless/#introduksjon-til-stateless-applikasjoner)
- [Konfigurasjon av stateless applikasjoner](/nb/app/development/configuration/stateless/#konfigurasjon)
- [Starte instans fra stateless skjema](/nb/app/development/configuration/stateless/#starte-instans-fra-et-stateless-skjema)
### Forståelsessjekk
- Hva lagres av data for stateless applikasjoner?

{{% /expandlarge %}}


{{% expandlarge id="variabler-i-tekst" header="Variabler i tekst" %}}
### Krav fra kommunen
IT-kompetanse er svært ettertraktet. I **Bolk 4** satt vi opp et skreddersydd tilbud til de med IT-kompetanse.

Sogndal kommune har sett på tallene og ser at det genererer for lite trafikk til stillingsutlysningene.
For å prøve å forbedre dette ønsker vi at tilbudet blir enda litt mer skreddersydd.

Vi ønsker at den originale teksten:

```rich
Vi ser at du besitter kompetanse vi trenger i kommunen.
Se en oversikt over våre ledige stillinger her.
```

Nå skal inneholde en personlig touch med brukerens navn. Teksten vi nå ønsker oss er:

```rich
Hei, {innsenders navn}! Vi ser at du besitter kompetanse vi trenger i kommunen.
Se en oversikt over våre ledige stillinger her.
```

Siste linje i teksten skal fortsatt være en lenke til stillingsutlysningene.

### Nyttig dokumentasjon
- [Variabler i tekster](/nb/app/development/ux/texts/#variabler-i-tekster)

### Forståelsessjekk
- Hva vises som en del av teksten om den aktuelle variabelen ikke har noen verdi i datamodellen?

{{% /expandlarge %}}

{{% expandlarge id="api" header="Eksternt API" %}}
I noen tilfeller vil man måtte ta i bruk eksterne API for å dekke alle behovene til en applikasjon. 
Dette kan være for å berrike nedtrekkslister eller å presentere data til brukeren basert på informasjon de har oppgitt.

I denne oppgaven skal du implementere en klient som integrerer seg mot Bring sine APIer for å berrike adressen som 
sluttbruker oppgir med et poststed basert på postnummer. 

APIet som skal benyttes er et postnummer oppslag tilgjengeliggjort av Bring. 
Test det gjerne i nettleser med ulike postnummer.

```
GET
https://fraktguide.bring.no/fraktguide/api/postalCode.json?country=no&pnr={postnummer}
```

### Krav fra kommunen
 - Adresseinformasjonen skal samles inn via standard-input komponenter og ikke Altinns adressekomponent
 - Poststed skal automatisk fylles ut for sluttbruker når postnummer er oppgitt
 - Poststed skal ikke være mulig å redigere 
 - Antall kall til Bring sitt API skal begrenses til maksimalt én gang om dager per postnummer

### Nyttig dokumentasjon
[Konsumering av eksterne API](nb/app/development/api/consume)

### Forståelsessjekk
- Med en _memorycache_ hvor mange ganger vil man maksimalt gjøre et API-kall i løpet av et døgn dersom applikasjonen kjører med tre replikas
{{% /expandlarge %}}

{{% expandlarge id="messagebox" header="Vise og skjule elementer i meldingsboks" %}}
### Krav fra kommunen


### Nyttig dokumentasjon

### Forståelsessjekk
{{% /expandlarge %}}

{{% expandlarge id="presentation-texts" header="Presentasjonstekst" %}}
### Krav fra kommunen


### Nyttig dokumentasjon

### Forståelsessjekk
{{% /expandlarge %}}

{{% expandlarge id="Events" header="Events" %}}
### Krav fra kommunen


### Nyttig dokumentasjon

### Forståelsessjekk
{{% /expandlarge %}}
