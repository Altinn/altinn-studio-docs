---
title: Modul 7
description: Utvidelser av appen
linktitle: Modul 7
tags: [apps, training ]
weight: 20
---

{{% notice warning %}}
🚧 Denne modulen er under oppdatering.
{{% /notice %}}

I denne modulen er det en samling med frittstående utvidelser av applikasjonen. De trenger ikke å løses i gitt rekkefølge.

**Temaer som dekkes i denne modulen:**
- Oppsummmeringsside
- Stateless applikasjon
- Variabler i tekst
- Bruk av eksternt API
<!-- - Konfigurasjon av meldingsboks
- Presentasjonstekster
- Events -->

## Oppgaver

{{% expandlarge id="Oppsummeringsside" header="Oppsummeringsside" %}}
### Krav fra kommunen

Sogndal kommune opplever at enkelte innsendinger inneholder feilopplysninger og skrivefeil som skaper unødig arbeid for saksbehandlere.
For å unngå at personer sender inn feil informasjon, ønsker kommunen at brukeren presenteres for en oppsummmeringsside hvor det er mulig å gå tilbake og redigere informasjonen brukeren har oppgitt.

Sogndal kommune ønsker at man benytter kategoriene **Personalia** om brukerens personinformasjon, og **Arbeid** om svarene gitt på brukerens arbeidshistorikk.

### Oppgaver

1. Opprett en oppsummeringsside og ekskluder den fra pdf-genereringen.
2. Legg til to gruppe-komponenter, "Personalia" og "Arbeid", og `Summary`-komponenter for skjema-komponentene. Inkluder `Summary`-komponentene i sine respektive grupper.
3. Legg til en beskrivende tekst øverst i dokumentet.
4. Gjør eventuelt andre nødvendige tilpasninger (f.eks. av tekster og knapper).

### Nyttig dokumentasjon
- [Hvordan sette opp visning av oppsummering av utfylt skjema](/nb/app/development/ux/pages/summary/)
- [Kategorier i oppsummering](/nb/app/development/ux/pages/summary/#kategorier)

### Forståelsessjekk
{{% expandsmall id="m7t1q1" header="Hvorfor burde oppsummeringssiden ignoreres fra PDF-genereringen?" %}}
PDF-genereringen har per nå ikke støtte for oppsummerings-komponenten.
 For at PDF-generering skal fungere må enten alle oppsummerings-komponentene, eller hele oppsummerings-siden(e) ekskluderes fra PDF.
{{% /expandsmall %}}

{{% /expandlarge %}}


{{% expandlarge id="stateless" header="Stateless førsteside" %}}
### Krav fra kommunen
Sogndal kommune har oppdaget at det er en del trafikk fra personer som ikke møter kriteriene i applikasjonen.
For hver av disse brukerne blir det lagret en instans i databasen. Dette skaper unødige utgifter.

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
IT-kompetanse er svært ettertraktet. I **Modul 4** satt vi opp et skreddersydd tilbud til de med IT-kompetanse.

Sogndal kommune har sett på tallene og ser at det genererer for lite trafikk til stillingsutlysningene.
For å prøve å forbedre dette ønsker vi at tilbudet blir enda litt mer skreddersydd.

Vi ønsker at den originale teksten;

```rich
Vi ser at du besitter kompetanse vi trenger i kommunen.
Se en oversikt over våre ledige stillinger her.
```

nå skal bli mer personlig med brukerens navn. Teksten vi nå ønsker oss er:

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
I noen tilfeller vil man måtte ta i bruk eksterne APIer for å dekke alle behovene til en applikasjon. 
Dette kan være for å berike nedtrekkslister eller å presentere data til brukeren basert på oppgitt informasjon.

I denne oppgaven skal du implementere en klient som integrerer seg mot Bring sine APIer for å berike adressen som 
sluttbruker oppgir med et poststed basert på postnummer. 

APIet som skal benyttes er et postnummeroppslag tilgjengeliggjort av Bring. 
Test det gjerne i en nettleser med ulike postnumre.

```
GET
https://fraktguide.bring.no/fraktguide/api/postalCode.json?country=no&pnr={postnummer}
```

### Krav fra kommunen
 - Adresseinformasjonen skal samles inn via standard inndatakomponenter og ikke Altinns adressekomponent
 - Poststed skal automatisk fylles ut for sluttbruker når postnummer er oppgitt
 - Poststed skal det ikke være mulig å redigere
 - Antall kall til Bring sitt API skal begrenses til maksimalt én gang om dagen per postnummer

### Nyttig dokumentasjon
[Konsumering av eksterne API](/nb/app/development/api/consume)

### Forståelsessjekk
- Med en _memorycache_, hvor mange ganger vil man maksimalt gjøre et API-kall i løpet av et døgn dersom applikasjonen kjører med tre replikas?
{{% /expandlarge %}}

<!-- {{% expandlarge id="messagebox" header="Vise og skjule elementer i meldingsboks" %}}
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
{{% /expandlarge %}} -->

## Løsningsforslag
[Kildekode Modul 7](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul7)<br>

{{% expandlarge id="Oppsummeringsside-solution" header="Oppsummeringsside" %}}

<br>

**Skjermbilde av oppsummeringsside:**

![Oppsummeringsside del 1. skjermbilde](oppsummering-screenshot-1.png)
![Oppsummeringsside del 2. skjermbilde](oppsummering-screenshot-2.png "Screenshot av oppsummeringsside")

* **Opprett siden `oppsummering.json` under `App/ui/layouts` eller i Studio Designer**
  * Legg til et avsnitt med forklarende tekst (se tekstressurser under).
  * Legg til to gruppekomponenter, `Personalia` og `Arbeid`.
  * Legg til `Summary`-komponenter tilsvarende skjemakomponentene og inkluder dem i den aktuelle gruppen.

Gruppekomponent og `Summary`-komponenter for "Arbeid":

{{< code-title >}}
App/ui/layouts/oppsummering.json
{{< /code-title >}}

```json
...
      {
        "id": "arbeidsforhold-group",
        "type": "Group",
        "textResourceBindings": {
          "title": "Arbeid"
        },
        "children": ["summary9", "summary10", "summary11"]
      },
      {
        "id": "summary9",
        "type": "Summary",
        "componentRef": "RadioButtons-sektor",
        "pageRef": "Arbeidsforhold"
      },
      {
        "id": "summary10",
        "type": "Summary",
        "componentRef": "Checkboxes-bransje",
        "pageRef": "Arbeidsforhold"
      },
      {
        "id": "summary11",
        "type": "Summary",
        "componentRef": "Dropdown-years-in-workforce",
        "pageRef": "Arbeidsforhold"
      },
      ...
```

* Legg til en innsendingsknapp med teksten 'Bekreft' og fjern innsendingsknappen fra siden `Arbeidsforhold.json`.
* Bonus: Legg til en `Panel`-komponent over 'Bekreft'-knappen med advarsel om at brukeren ikke kan gå tilbake etter å ha klikket 'Bekreft'.

{{< code-title >}}
App/ui/layouts/oppsummering.json
{{< /code-title >}}

```json
...
      {
        "id": "panelinfo",
        "type": "Panel",
        "textResourceBindings": {
          "title": "MERK",
          "body": "preview.warning"
        },
        "variant": "warning",
        "showIcon": true
      },
      {
        "id": "preview-confirm",
        "type": "Button",
        "textResourceBindings": {
          "title": "button.confirm"
        }
      },
      ...
```

Fullstendig løsning: [oppsummering.json](https://altinn.studio/repos/tss/flyttemelding-sogndal/src/branch/modul7/App/ui/layouts/oppsummering.json)

* **Legg til tekstressurs `summaryTitle` på Adresse-komponenter:**

{{< code-title >}}
App/ui/layouts/innflytterPersonalia.json
{{< /code-title >}}

```json

// addressComponent
"textResourceBindings": {
    "summaryTitle": "Adresse"
}

// AddressComponent-tidligere-bosted
"textResourceBindings": {
    "summaryTitle": "innflytterPersonalia.AddressComponent-tidligere-bosted.title"
}
```

* **Legg til siden `oppsummering` under `pages` og `excludeFromPdf`:**

Merk at hvis siden er lagt til i Studio Designer vil den dukke opp under `pages` automatisk
 (husk å lagre endringer i Designer og hente de ned lokalt).

{{< code-title >}}
App/ui/Settings.json
{{< /code-title >}}

```json{hl_lines=[9,13]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": [
      "info",
      "innflytterPersonalia",
      "ikke-for-deg",
      "Arbeidsforhold",
      "oppsummering"
    ],
    "excludeFromPdf": [
      "ikke-for-deg",
      "oppsummering"
    ]
  }
}
```
* **Følgende tekstressurser er lagt til/endret:**

{{< code-title >}}
App/config/texts/resources.nb.json
{{< /code-title >}}

```json
{
  "language": "nb",
  "resources": [
    ...
    {
      "id": "innflytterPersonalia.tidligere-bosteder-overskrift.title",
      "value": "Tidligere bosteder"
    },
    {
      "id": "confirm.title",
      "value": "Du er nå klar for å sende inn skjemaet"
    },
    {
      "id": "confirm.body",
      "value": "Ved å sende inn dette skjemaet samtykker du til at dataen du har fylt ut kan lagres og benyttes til å tilpasse kommunens tilbud til deg de neste 18 månedene. </br></br> For å avbryte innsendingen kan du klikke på krysset oppe i høyre hjørne."
    },
    {
      "id": "preview.body",
      "value": "<h3>Sjekk at svarene dine er riktige</h3><br>Se over svarene dine før du sender inn skjemaet. Om du ser at noen av svarene er feil kan du trykke 'Endre' ved det aktuelle svaret for å gå tilbake og endre det. Felter som er markert med rødt og har feilmelding må rettes opp før skjemaet kan sendes inn."
    },
    {
      "id": "preview.warning",
      "value": "**Når du klikker 'Bekreft' vil du gå videre til innsending. Derfra kan du se og laste ned oppsummerings-pdf og avbryte innsendingen, men ikke endre svarene.**"
    }
  ]
}
```

{{% /expandlarge %}}


<br><br>

{{% center %}}
[<< Forrige modul](../modul6/)
{{% /center %}}