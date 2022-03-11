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
- Konfigurasjon av Meldingsboks
- Stateless applikasjon
- Presentasjonstekster
- Variabler i tekst

## Oppgaver

{{% expandlarge id="Oppsummeringsside" header="Oppsummeringsside" %}}
### Krav fra kommunen
Sogndal kommune opplever at enkelte innsendinger inneholder feilopplysninger og skrivefeil som skaper unødig arbeid for saksbehandlere.
For å unngå at personer sender inn feil informasjon ønsker kommunen at brukeren presenteres for en oppsummmeringsside som viser hvilk

Sogndal kommune ønsker at man benytter kategoriene **Personalia** om brukerens person-infomrasjon, og **Arbeid** om svarene gitt på brukerens arbeidshistorikk.

### Nyttig dokumentasjon
- [Hvordan sette opp visning av oppsummering av utfylt skjema](../development/ux/pages/summary/)
- [Kategorier i oppsummering](../development/ux/pages/summary/#kategorier)

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
- [Introduksjon til stateless applikasjoner](../development/configuration/stateless/#introduksjon-til-stateless-applikasjoner)
- [Konfigurasjon av stateless applikasjoner](../development/configuration/stateless/#konfigurasjon)
- [Starte instans fra stateless skjema](../development/configuration/stateless/#starte-instans-fra-et-stateless-skjema)
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
-  [Variabler i tekster](../development/ux/texts/#variabler-i-tekster)

### Forståelsessjekk
- Hva vises som en del av teksten om den aktuelle variabelen ikke har noen verdi i datamodellen?

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



{{% expandlarge id="api" header="Eksternt API" %}}
### Krav fra kommunen


### Nyttig dokumentasjon

### Forståelsessjekk
{{% /expandlarge %}}
