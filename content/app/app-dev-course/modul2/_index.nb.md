---
title: Modul 2
description: Legge til flere sider, sporvalg og forhåndsutfylling

linktitle: Modul 2
tags: [apps, training, prefill, sporvalg]
weight: 20
---

I denne modulen skal du videreutvikle applikasjonen du laget i [modul 1](../modul1) med blant annet en ny side, dynamisk skjuling av sider, sporvalg og forhåndsutfylling.

Deler av modul 2 kan gjøres i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) (Designer), men noe må utføres med [lokal utvikling](/nb/app/getting-started/local-dev).

**Temaer som dekkes i denne modulen:**

- Flere sider
- Bildekomponent
- Dynamisk skjuling av sider
- Sporvalg
- Forhåndsutfylling

## Oppgaver

{{% expandlarge id="legge-til-infoside" header="Legge til infoside" %}}

For skjemaer der det samles inn eller gis mye informasjon
kan det forbedre brukeropplevelsen dersom man deler applikasjonen opp i flere sider.

La oss se nærmere på hvordan man kan opprette en ny side i applikasjonen
som vises _før_ brukeren kommer til første datainnsamlingsside som ble laget i modul 1.

Opprettelse og administrasjon av flere sider kan enkelt gjøres i [Altinn Studio Designer](/nb/app/getting-started/ui-editor/) (venstre panel).
 For manuelt oppsett av sider, se 'Nyttig dokumentasjon' lenger ned på siden.

Da er det eneste som gjenstår å sette seg inn i kommunens
krav til infosiden og komme i gang med utviklingen. Lykke til!

### Krav fra kommunen

Siden det skal samles inn en god del data i denne tjenesten
er det viktig for Sogndal kommune å tydeliggjøre hvem skjemaet
er ment for og hva de vil gjøre med dataen som samles inn.
Noen i kommunen har opprettet en [skisse av informasjonssiden](infoside_tilflyttere.pdf) som skal brukes til dette formålet.

Følgende er ønskelig at reflekteres i applikasjonen:
 - plassering av bilder
 - tekststørrelser
 - formatering av tekst

Bilde av Sogndals kommunevåpen som kan benyttes i applikasjonen:

!["Sogndal kommunevåpen"](kommune-logo.png )

### Oppgaver
1. Legg til en ny side. Gi den et passende navn og sørg for at den vises før skjemasiden du opprettet i modul 1.
2. [Legg til bilde](/nb/app/development/ux/components/images/#legge-til-bilder-i-applikasjonen) av Sogndals kommunevåpen.
3. Legg til tekst i henhold til [skisse](infoside_tilflyttere.pdf).
### Nyttig dokumentasjon

- [Formatering av tekst](/nb/app/development/ux/texts/#formatering-av-tekster)
- [Hvordan legge til bilder i en applikasjon](/nb/app/development/ux/components/images/)
- [Sidestilte komponenter](/nb/app/development/ux/styling/#sidestilte-komponenter-grid)
- [Filoppsett ved flere sider](/nb/app/development/ux/pages/)
- [Administrere rekkefølge på flere sider](/nb/app/development/ux/pages/navigation/#rekkefølge)

### Forståelsessjekk

{{% expandbold "Hvilken fil i applikasjonsrepoet må redigeres dersom du ønsker å endre siderekkefølgen på eksisterende sider manuelt?" %}}
<br>

I `App/ui/Settings.json` ligger siderekkefølgen beskrevet.
For å justere på siderekkefølgen, må listen beskrevet under `pages.order` endres til å representere ønsket siderekkefølge.  
Se [Administrere rekkefølge på flere sider](/nb/app/development/ux/pages/navigation/#rekkefølge).
{{% /expandbold %}}

<br>

{{% expandbold "Hvis du ønsker å gi en side et annet navn, men ikke har Altinn Studio tilgjengelig, hvilke filer må oppdateres med det nye filnavnet?" %}}
<br>

- `App/ui/layouts/<page>.json`: endre filnavnet (`<page>`) på siden som skal bytte navn.
- `App/ui/Settings.json`: endre navnet på siden under `pages.order`.
{{% /expandbold %}}

<br>

{{% expandbold "Hvordan kan du tvinge tekst til å bryte dersom tekststrengen ikke er lang nok til å naturlig brytes?" %}}
<br>

Alle tekstressurser støtter markdown og dermed html-notasjon, så ved å benytte `<br>` vil man kunne tvinge tekstbrytning.
{{% /expandbold %}}

{{% /expandlarge %}}

{{% expandlarge id="sporvalg" header="Alternativ arbeidsflyt" %}}

I mange tilfeller er det ikke aktuelt å svare på alle spørsmålene i et skjema, kanskje fordi svaret sier seg selv, eller fordi det ikke er relevant basert på noe man har svart tidligere i skjemaet. Da kan sporvalg være en god løsning.
 Ved hjelp av sporvalg kan man styre hvilke sider i en applikasjon som er synlige for brukeren.

I denne oppgaven skal du sette opp sporvalg i applikasjonen basert på kravene fra Sogndal kommune.

### Krav fra kommunen

En bruker som ikke oppfyller kravene for skjemaet skal stoppes så tidlig som mulig i arbeidsflyten.
 På infosiden er det ønskelig at brukeren skal oppgi om skjemaet gjelder dem eller ikke.

Hvordan svaret innhentes er valgfritt. Merk at en komponent må knyttes til et felt i datamodellen for å kunne lagre verdier.
  Feltet `Innflytter.KanBrukeSkjema` i datamodellen er tilgjengelig til dette formålet.

Basert på svaret skal brukeren sendes videre til ett av følgende spor:

*Spor 1*

- Brukeren har ikke svart bekreftende på at skjemaet gjelder deres situasjon
- Bruker skal sendes til en side med følgende tekst:

    > Dette skjemaet er ikke for deg.  
    > [Se en oversikt over andre tilbud i kommunen her](https://www.sogndal.kommune.no/).
    
    Linje 2 i teksten er en hyperlenke som peker på https://www.sogndal.kommune.no/

*Spor 2*

- Brukeren har svart bekreftende på at skjemaet gjelder deres situasjon.
- Brukeren sendes videre til datainnsamlingssidene.

### Oppgaver

1. Legg til en komponent hvor brukeren kan oppgi om skjemaet gjelder dem eller ikke.
2. Legg til en side brukeren skal sendes til i _spor 1_.
3. Legg til logikk som aktiverer _spor 1_ eller _spor 2_ basert på brukerens svar.

### Nyttig dokumentasjon
- [Dynamiske uttrykk](/nb/app/development/logic/expressions)
- [Hvordan skjule hele sider](/nb/app/development/logic/expressions/#viseskjule-hele-sider)
- [Formatering av tekst](/nb/app/development/ux/texts/#formatering-av-tekster)

### Forståelsessjekk

{{% expandbold "Dersom man har sporvalg på et senere tidspunkt i en arbeidsflyt og en sluttbruker endrer et valg, hva skjer med skjemadataen man tidligere har fylt ut, dersom siden skjules for sluttbrukeren?" %}}
<br>

Dersom du har denne typen logikk i en applikasjon der man kan fortsette til innsending for flere spor, bør dataen på siden(e) som nå blir skjult for bruker nullstilles.
{{% /expandbold %}}

{{% /expandlarge %}}


{{% expandlarge id="prefill" header="Forhåndsutfylling av personopplysninger" %}}

Altinn gir fordelen av å ha lett tilgjengelig metadata for enkeltpersoner og virksomheter. Med forhåndsutfylling kan vi hente brukerdata og fylle ut felt sømløst, noe som reduserer behovet for manuell dataregistrering, spesielt for vanlige detaljer som navn, adresser og e-post.

Data fra Altinns [forhåndsutfyllingskilder](/nb/app/development/data/prefill/config/#tilgjengelige-prefill-verdier) kan integreres direkte i appen ved å koble data til spesifikke felt i datamodellen, og slik automatisere utfylling av felt under opprettelse av skjemaet. For mer spesifikke behov for forhåndsutfylling kan kodebaserte løsninger integreres i appens logikk.

Denne oppgaven fokuserer på den første siden for datainnsamling, med mål om å effektivisere brukeropplevelsen ved å forhåndsutfylle deres personlige opplysninger.

### Krav fra kommunen

- Følgende verdier skal forhåndsutfylles for brukeren:
  - Fornavn: `Innflytter.Fornavn`
  - Mellomnavn: `Innflytter.Mellomnavn`
  - Etternavn: `Innflytter.Etternavn`
  - E-post: `Innflytter.Kontaktinformasjon.Epost`
  - Telefonnummer: `Innflytter.Kontaktinformasjon.Telefonnummer`
  - Alder: `Innflytter.Alder`

- Det skal **ikke** være mulig å endre forhåndsutfylt navn og alder
- Det skal være mulig å endre forhåndsutfylt e-post og telefonnummer

### Oppgaver
1. Opprett en [fil for forhåndsutfylling](/nb/app/development/data/prefill/config/#oppsett-av-prefill-i-applikasjons-repository).
2. Konfigurer forhåndsutfylling for verdier tilgjengelig i Altinns [forhåndsutfyllingskilder](/nb/app/development/data/prefill/config/#tilgjengelige-prefill-verdier) (alle unntatt alder).
3. Opprett [egendefinert forhåndsutfylling](/nb/app/development/data/prefill/custom) for alder basert på personnummer (se kodehjelp under).
4. Konfigurer innstillinger for felter som ikke skal kunne endres av brukeren.

{{% expandbold "Kodehjelp: Beregning av alder fra personnummer" %}}
<br>

Den følgende funksjonen kan brukes til å beregne en persons alder fra personnummeret deres:

```cs
private static int CalculateAge(string sosialSecNumber)
    {
        int MAX_D_NUMBER = 71;
        int MIN_D_NUMBER = 41;
        int MAX_TEST_NUMBER = 92;
        int MIN_TEST_NUMBER = 81;
        int START_D_NUMBER = 40;
        int START_TEST_NUMBER = 80;

        string stringDay = sosialSecNumber.Substring(0, 2);
        string stringMonth = sosialSecNumber.Substring(2, 2);
        string stringYear = sosialSecNumber.Substring(4, 2);
        string stringIndivid = sosialSecNumber.Substring(6, 3);

        int day = int.Parse(stringDay);
        int month = int.Parse(stringMonth);
        int year = int.Parse(stringYear);
        int individ = int.Parse(stringIndivid);

        // Get day if D-number
        if (MAX_D_NUMBER >= day && MIN_D_NUMBER <= day)
        {
            day -= START_D_NUMBER;
        }

        // Get month if TestUser-number
        if (MAX_TEST_NUMBER >= month && MIN_TEST_NUMBER <= month)
        {
            month -= START_TEST_NUMBER;
        }

        // find century
        if (year > 54 && (individ >= 500 && individ < 750))
        {
            // 1855-1899
            year += 1800;
        }
        else if (year > 39 && (individ >= 900 && individ < 1000))
        {
            // 1940-1999
            year += 1900;
        }
        else if (year < 40 && (individ >= 500 && individ < 1000))
        {
            // 2000-2039
            year += 2000;
        }
        else
        {
            year += 1900;
        }

        // calculate age
        int age = DateTime.Now.Year - year;

        if (DateTime.Now.Month < month)
        {
            age -= 1;
        }
        else if (DateTime.Now.Month == month)
        {
            if (DateTime.Now.Day < day)
            {
                age -= 1;
            }
        }

        return age;
    }
```
{{% /expandbold %}}
<br>

*Husk å pushe de lokale endringene dine så de blir tilgjengelige i Altinn Studio.*

### Nyttig dokumentasjon
- [Forhåndsutfylling fra nasjonale registre og brukerprofil](/nb/app/development/data/prefill/config/#prefill-fra-nasjonale-register-og-brukerprofil)
- [Tilgjengelige kilder og verdier for forhåndsutfylling](/nb/app/development/data/prefill/config/#tilgjengelige-prefill-verdier)
- [Egendefinert forhåndsutfylling](/nb/app/development/data/prefill/custom)
- [Beskrivelse av InstanceOwner-objektet](/nb/api/models/instance/#instanceowner) - Her finner man personnummeret.
  Vær oppmerksom på at egenskapene refereres til med store forbokstaver i koden, ikke med små som i denne oversikten.


### Forståelsessjekk

{{% expandbold "Er det mulig å endre en forhåndsutfylt verdi når den først er satt?" %}}
<br>

Ja. Dersom man ikke gjør noen endringer vil en standardkomponent med forhåndsutfylt data være redigerbar.
{{% /expandbold %}}

<br>

{{% expandbold "Hvordan kan man hindre at en forhåndsutfylt verdi endres av sluttbrukeren?" %}}
<br>

Komponenten kan settes til `readOnly` på én av to måter:

**1\.** I Altinn Studio Designer ved å huke av ved "Det skal ikke være mulig å svare (read only)" for den aktuelle komponenten:
![Altinn Studio innstilling for 'read only'. Bilde](<screenshot-readonly-setting.png>)

**2\.** Sette egenskapen `readOnly` til `true` for komponenten i json-filen til siden:
```json{linenos=false,hl_lines=["13"]}
// Fil: /App/ui/layouts/<page>.json
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "firstName",
        "type": "Input",
        "dataModelBindings": {
          "simpleBinding": "Innflytter.Fornavn"
        },
        "required": false,
        "readOnly": true,
        "textResourceBindings": {
          "title": "firstName"
        }
      }
    ]
  }
}
```

Alternativt kan man kjøre valideringer av dataen på serversiden for å verifisere at dataen i feltet matcher dataen fra forhåndsutfyllingskilden. Dette kan gjøres i prosesserings- eller valideringslogikken til applikasjonen.
{{% /expandbold %}}

<br>

{{% expandbold "Ikke alle norske innbyggere har et fødselsnummer, noen får tildelt et D-nummer. Hvordan må koden din justeres for å ta hensyn til dette dersom alder skal baseres på et fødselsnummer eller D-nummer som sluttbruker selv taster inn?" %}}
<br>

{{% notice info %}}
Et [D-nummer](https://jusleksikon.no/wiki/F%C3%B8dselsnummer#D-nummer) er ellevesifret, som ordinære fødselsnummer, og består av en modifisert sekssifret fødselsdato og et femsifret personnummer. Fødselsdatoen modifiseres ved at _det legges til 4 på det første sifferet_. For eksempel, en person født 1. januar 1980 får fødselsdato 410180, mens en som er født 31. januar 1980 får 710180.
{{% /notice %}}

Den følgende funksjonen konverterer et vilkårlig fødsels- eller d-nummer til en streng for fødselsdato på formatet `dd-MM-yy`:

```cs
public static string GetDOB(string fOrDNumber){
  List<string> firstCharsInDNumber = new(){"4", "5", "6", "7" };

  var fOrDNumberArray = fOrDNumber.ToCharArray();

  char[] dobArray = new char[6];
  Array.Copy(fOrDNumberArray, dobArray, 6);

  char firstChar = dobArray[0];
  int firstInt = 0;

  if(firstCharsInDNumber.Contains(firstChar.ToString()))
  {
    firstInt = firstChar - 4;
    dobArray[0] = (char)firstInt;
  }

  string dobString = $"{dobArray[0]}{dobArray[1]}.{dobArray[2]}{dobArray[3]}.{dobArray[4]}{dobArray[5]}";
  // verify that it is a valid date
  DateTime.ParseExact(dobString, "dd.MM.yy", CultureInfo.InvariantCulture);
  return dobString;
}
```
{{% /expandbold %}}

{{% /expandlarge %}}

## Oppsummering
I denne modulen har du utvidet applikasjonen din med mer funksjonalitet i form av å
legge til flere sider, sette opp sporvalg for å styre brukerflyten og sette opp forhåndsutfylling av skjemafelter
både med tilgjengelige datakilder i Altinn og egendefinert kode.

Tjenesten skal kunne kjøres opp på din lokale maskin med lokal test og du skal kunne teste begge brukerflytene og
bekrefte at riktige felter blir forhåndsutfylt.

<br>

{{<expandlarge id="solution" header="Løsningsforslag">}}

{{% markdown %}}
[Kildekode modul 2](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul2)<br>
[(Kildekode modul 2 - tidligere versjon)](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/2)<br>

### Legge til infoside

I dette steget er det lagt til en enkel infoside med bilde og tekst.

![Skjermbilde av infoside. Bilde](screenshot-info-page-1.png "Infoside")

{{% /markdown %}}

{{<content-version-selector classes="thin-border">}}

{{<content-version-container version-label="Altinn Studio Designer">}}

<br>

#### Komponenter

{{% notice info %}}
Se *Kode* for sidestilling av komponenter.
{{% /notice %}}

![Komponenter på info-side. Bilde](screenshot-info-page-layout-1.png "Komponenter på info-side")

#### Bilde

I denne løsningen er bildet lastet ned og lagret i mappen`/App/wwwroot` (mappen `wwwroot` ble også opprettet).
 Et alternativ er å bruke en ekstern URL for bildet som kilde.

{{% expandbold "Legg til mappe wwwroot og last opp bilde i Designer" %}}
<br>

Naviger til repository (klikk logo øverst i høyre hjørne eller tre prikker til høyre på menylinjen) og velg "Last opp fil" fra menyen "Add file".

![Repository legg til fil. Bilde](screenshot-repository-add-file.png "Repository")

I feltet "Legg til mappe" fyller du inn `/App/wwwroot`.
 Last opp bildet og legg til en beskrivende commit-melding.
  Klikk "Commit endringer" for å lagre.


![Legg til fil. Bilde](screenshot-add-file.png "Legg til fil")

![Eksempel utfylt legg til fil. Bilde](screenshot-add-file-filled.png "Utsnitt utfylt skjema")

{{% /expandbold %}}

![Innstillinger for bilde. Skjermbilde](screenshot-image-settings-wwwroot.png "Innstillinger for bilde")


#### Tekst

Både overskrift og beskrivelse er lagt til som "Paragraf" (underkategori av "Tekst") og formatert med markdown.

![Innstillinger for overskrift](screenshot-heading-settings.png "Innstillinger for overskrift")

![Innstillinger for beskrivelse. Bilde](screenshot-description-settings.png "Innstillinger for beskrivelse")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

<br>

#### Infoside - komponenter og innstillinger

Sidestilling av bilde og overskrift er gjort ved hjelp av `grid` (markert).

```json{linenos=false,hl_lines=["17-19", "30-32"]}
// Fil: /App/ui/layouts/info.json

{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "kommune-logo",
        "type": "Image",
        "image": {
          "src": {
            "nb": "wwwroot/kommune-logo.png"
          },
          "width": "100%",
          "align": "center"
        },
        "grid": {
          "xs": 2
        },
        "textResourceBindings": {
          "altTextImg": "kommune-logo.altTextImg"
        }
      },
      {
        "id": "overskrift",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "info.overskrift.title"
        },
        "grid": {
          "xs": 7
        }
      },
      {
        "id": "beskrivelse",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "info.beskrivelse.title"
        }
      },
      {
        "id": "NavigationButtons-hateTR",
        "type": "NavigationButtons",
        "componentType": "NavigationButtons",
        "dataModelBindings": {},
        "showBackButton": true,
        "textResourceBindings": {
          "next": "navigation.next",
          "back": "navigation.back"
        }
      }
    ]
  }
}
```

#### Tekstressurser (nb)
```json
// Fil: /App/config/texts/resource.nb.json

{
  "language": "nb",
  "resources": [
    ...
    {
      "id": "info.overskrift.title",
      "value": "# Skjema for informasjonsinnsamling for fremtidige tilflyttere"
    },
    {
      "id": "info.beskrivelse.title",
      "value": "<br>Opplysningene du oppgir i dette skjemaet vil benyttes til å skreddersy en pakke med kommunale tilbud til deg og de du eventuelt flytter til kommunen sammen med.\n<br><br>\nDu skal ikke bruke dette skjemaet hvis:\n* Du er allerede bosatt i Sogndal kommune\n* Du bor i en annen kommune og har ingen planer om å flytte\n* Du skal flytte til Sogndal, men **ikke** i løpet av de neste 12 månedene."
    },
    {
      "id": "kommune-logo.altTextImg",
      "value": "Sogndal kommunevåpen. Bilde"
    }
  ]
}
```
{{</content-version-container>}}
{{</content-version-selector>}}

{{% gray-divider-line %}}

{{% markdown %}}

### Alternativ arbeidsflyt

I denne løsningen er det valgt å legge til en komponent for radioknapper på info-siden hvor brukeren skal angi om de oppfyller kravene for å bruke skjemaet.
 Det er valgt å forhåndsmarkere alternativet 'Nei' så brukeren må gjøre et aktivt valg for å bruke skjemaet.
 
 Som alternativ til radioknapper kan man bruke avkrysningsboks eller nedrekksfelt.

![Skjermbilde av oppdatert infoside. Bilde](infoside-screenshot.png "Oppdatert infoside")

Det er lagt til en ny side som brukere sendes til dersom de ikke bekrefter at de oppfyller kravene (spor 1).

![Skjermbilde av alternativ arbeidsflyt: dette skjemaet er ikke for deg](side-ikke-for-deg-screenshot.png "Ny side: Dette skjemaet er ikke for deg")

{{% /markdown %}}

{{<content-version-selector classes="thin-border">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

{{% notice info %}}
Se *Kode* for logikk ved veivalg.
{{% /notice %}}

#### Radioknapper

![Komponenter på info-side. Bilde](screenshot-info-page-layout-2.png "Ny komponent på info-siden")

![Radioknapper innstillinger. Bilde](screenshot-radio-buttons-settings.png "Innstillinger for radioknapper")

![]()

#### Ny side

Ny side for *Spor 1*.

![Komponenter på siden ikke-for-deg. Bilde](screenshot-ikke-for-deg-layout.png "Komponenter på siden Ikke for deg")

![Tekst innstillinger. Bilde](screenshot-ikke-for-deg-tekst.png "Innstillinger for tekst")

{{</content-version-container>}}

{{<content-version-container version-label="Kode">}}

<br>

#### Radioknapper

```json{linenos=false,hl_lines=["8-29"]}
// Fil: /App/ui/layouts/info.json

{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      ...
      {
        "id": "bekreftelse",
        "type": "RadioButtons",
        "required": true,
        "textResourceBindings": {
          "title": "info.bekreft"
        },
        "dataModelBindings": {
          "simpleBinding": "Innflytter.KanBrukeSkjema"
        },
        "options": [
          {
            "label": "info.ja",
            "value": "true"
          },
          {
            "label": "info.nei",
            "value": "false"
          }
        ],
        "preselectedOptionIndex": 1
      },
      ...
    ]
  }
}
```

#### Ny side 'Ikke for deg' og logikk ved veivalg

Det er lagt til en ny side som kun skal vises dersom brukeren ikke oppfyller kravene for å bruke tjenesten.
 En måte å gjøre dette på er å skjule siden dersom brukeren bekrefter at de *kan* bruke tjenesten.

Logikk for å skjule siden er lagt til ved hjelp av egenskapen `hidden` (se markering i koden).
 Verdien fra den aktiverte radioknappen lagres i feltet `Innflytter.KanBrukeSkjema` men kan nås via komponenten (`["component", "bekreftelse"]`).
 Alternativt kan du teste verdien av feltet direkte (`["dataModel", "Innflytter.KanBrukeSkjema"]`).

```json{linenos=false,hl_lines="6-13"}
// Fil: /App/ui/layouts/ikke-for-deg.json

{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "hidden": [
      "equals",
      [
        "component",
        "bekreftelse"
      ],
      true
    ],
    "layout": [
      {
        "id": "ikke-for-deg",
        "type": "Paragraph",
        "textResourceBindings": {
          "title": "ikke-for-deg.info"
        }
      },
      {
        "id": "NavigationButtons-azt7sj",
        "type": "NavigationButtons",
        "componentType": "NavigationButtons",
        "dataModelBindings": {},
        "showBackButton": true,
        "textResourceBindings": {
          "back": "navigation.back"
        }
      }
    ]
  }
}
```

Tilsvarende logikk er lagt til for skjemasiden.
 Denne siden vil skjules dersom verdien til `bekreftelse`-komponenten er satt til `false`, altså når det krysses av for at man *ikke* oppfyller kravene for tjenesten.

```json{linenos=false,hl_lines=["6-13"]}
// Fil: /App/ui/layouts/innflytterPersonalia.json

{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "hidden": [
      "equals",
      [
        "component",
        "bekreftelse"
      ],
      false
    ],
    "layout": [
      ...
```

#### Ekskludere side fra pdf

Siden 'Ikke for deg' ønsker vi ikke å inkludere dersom det skal genereres en pdf-fil.
 Dette kan stilles inn med egenskapen `excludeFromPdf` i `Settings.json`.

```json{linenos=false,hl_lines="10"}
// Fil: /App/Settings.json

{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "order": [
      "info",
      "innflytterPersonalia",
      "ikke-for-deg"
    ],
    "excludeFromPdf": ["ikke-for-deg"]
  }
}
```

#### Tekstressurser (nb)

Nye tekstressurser som er lagt til.

```json{linenos=false,hl_lines=["7-22"]}
// Fil: /App/config/texts/resource.nb.json

{
  "language": "nb",
  "resources": [
    ...
    {
      "id": "info.bekreft",
      "value": "**Jeg møter kriteriene for å bruke appen.**"
    },
    {
      "id": "info.ja",
      "value": "Ja"
    },
    {
      "id": "info.nei",
      "value": "Nei"
    },
    {
      "id": "ikke-for-deg.info",
      "value": "### Dette skjemaet er ikke for deg.<br><br>\n[Se en oversikt over tilbud i kommunen her](https://www.sogndal.kommune.no)."
    }
  ]
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

{{% gray-divider-line %}}

<h3>Forhåndsutfylling</h3>

{{% markdown %}}

Under er et eksempel på hvordan datasiden kan se ut med forhåndsutfylt informasjon.
 I tillegg til forhåndsutfylling er flere av komponentene sidestilt og det er lagt til en 'Send inn'-knapp.

![Skjermbilde av forhåndsutfylt dataside](prefilled-data-screenshot.png "Oppdatert dataside med forhåndsutfylling")

![]()

{{% /markdown %}}

{{<content-version-selector classes="thin-border">}}
{{<content-version-container version-label="Altinn Studio Designer">}}

{{% notice info %}}
Se *Kode* for forhåndsutfylling og sidestilling av komponenter.
{{% /notice %}}

![Komponenter på dataside. Bilde](screenshot-data-page-components.png "Komponenter på dataside")

For felt som det ikke skal være mulig å endre (navn og alder) må det hukes av for dette:

![Read only innstilling](screenshot-readonly-setting.png "Innstilling for readOnly")

Det er lagt til en 'Send inn'-knapp for skjemaet:

![Send inn-knapp innstillinger. Bilde](screenshot-send-inn-button-settings.png "Innstillinger for 'Send inn'-knapp")

{{</content-version-container>}}
{{<content-version-container version-label="Kode">}}

#### Oppdatert dataside

* Komponentene for navn og alder er satt til `readOnly`
* Noen komponenter er sidestilt
* Det er lagt til en ny knapp

Koden under viser et eksempel med noen av komponentene der endringer er markert.
 For en fullstendig løsning, se [kildekode for modul 2](https://altinn.studio/repos/testdep/flyttemelding-sogndal/src/branch/modul2).

```json{linenos=false,hl_lines=["22", "26-28", "37", "41-43", "47-54"]}
// Fil: /App/ui/layouts/innflytterPersonalia.json

{
  "$schema": "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "hidden": [
      "equals",
      [
        "component",
        "bekreftelse"
      ],
      false
    ],
    "layout": [
      {
        "id": "firstName",
        "type": "Input",
        "dataModelBindings": {
          "simpleBinding": "Innflytter.Fornavn"
        },
        "required": false,
        "readOnly": true,
        "textResourceBindings": {
          "title": "firstName"
        },
        "grid": {
          "xs": 6
        }
      },
      {
        "id": "middleName",
        "type": "Input",
        "dataModelBindings": {
          "simpleBinding": "Innflytter.Mellomnavn"
        },
        "required": false,
        "readOnly": true,
        "textResourceBindings": {
          "title": "middleName"
        },
        "grid": {
          "xs": 6
        }
      },

      ...

      {
        "id": "send-inn",
        "type": "Button",
        "textResourceBindings": {
          "title": "button.send-inn"
        }
      },
      ...
    ]
  }
}
```

#### Forhåndsutfylling

Forhåndsutfylling av personalia (unntatt alder) er konfigurert i den nyopprettet filen `datamodel.prefill.json`:

```json{linenos=false,hl_lines=[""]}
// Fil: /App/models/datamodel.prefill.json

{
    "$schema": "https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json",
    "allowOverwrite": true,
    "ER": {
    },
    "DSF": {
        "FirstName": "Innflytter.Fornavn",
        "MiddleName": "Innflytter.Mellomnavn",
        "LastName": "Innflytter.Etternavn",
        "TelephoneNumber": "Innflytter.Kontaktinformasjon.Telefonnummer"
    },
    "UserProfile": {
        "Email": "Innflytter.Kontaktinformasjon.Epost"
    }
}
```

#### Beregning og forhåndsutfylling av alder

For egendefinert forhåndsutfylling av alder er det opprettet en fil `InstantiationProcessor.cs` i mappen `logic/Instantiation` (mappen `Instantiation` er også opprettet).
 Metoden `DataCreation` henter personnummer fra instansen og bruker det til å beregne alder ved hjelp av metoden `CalculateAge` (utelatt, se kodehjelp under [Forhåndsutfylling](#prefill) i oppgaveteksten).
 Alderen blir så tilordnet datafeltet `skjema.Innflytter.Alder`.

```csharp{linenos=false,hl_lines=[""]}
// Fil: App/logic/Instantiation/InstantiationProcessor.cs

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Models;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.AppLogic.Instantiation;

public class InstantiationProcessor : IInstantiationProcessor
{
    public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
    {
        Skjema skjema = (Skjema)data;
        string personNumber = instance.InstanceOwner.PersonNumber;
        skjema.Innflytter.Alder = CalculateAge(personNumber);
        await Task.CompletedTask;
    }

  // Kode for hjelpemetoden CalculateAge()
}
```

Datatypen for `skjema` er gitt av datamodellen `datamodel.xsd`:

```xml{linenos=false,hl_lines="4"}
<!-- Fil: /App/models/datamodel.xsd -->

 <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">
  <xsd:element name="InnflytterSkjema" type="Skjema" />
  <xsd:complexType name="Skjema">
    <xsd:sequence>
    ...
```

Til slutt må implementeringen registreres i `Program.cs` for at koden skal kjøre:

```csharp{linenos=false,hl_lines="7"}
// Fil: /App/Program.cs
...

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IInstantiationProcessor, InstantiationProcessor>();
}

...
```

{{</content-version-container>}}
{{</content-version-selector>}}
{{</expandlarge>}}

<br><br>

{{% center %}}
[<< Forrige modul](../modul1/)      [Neste modul >>](../modul3/)
{{% /center %}}