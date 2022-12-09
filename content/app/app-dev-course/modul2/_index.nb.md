---
title: Modul 2
description: Legge til flere sider, sporvalg og forhåndsutfylling

linktitle: Modul 2
tags: [apps, training, prefill, sporvalg]
weight: 20
---

I denne modulen skal du videreutvikle applikasjonen du laget i [modul 1](../modul1) for å oppfylle flere av [kravene fra Sogndal kommune](../case/#krav-fra-kommunen).

**Temaer som dekkes i denne modulen:**

- Flere sider
- Bildekomponent
- Sporvalg
- Forhåndsutfylling


## Oppgaver

{{% expandlarge id="legge-til-infoside" header="Legge til infoside" %}}

For skjemaer der det samles inn eller gis mye informasjon
vil det forbedre brukeropplevelsen dersom man deler applikasjonen opp i flere sider.

La oss se nærmere på hvordan man kan opprette en ny side i applikasjonen
som vises _før_ brukeren kommer til første datainnsamlingsside som ble laget i modul 1.

For å redigere ulike skjemasider i Altinn Studio må du:
1. Logge inn i Altinn Studio
2. Finne applikasjonen din på dashboardet og trykke _Rediger app_
3. Navigere til _Lage_-fanen
4. Til høyre finner du området for administrasjon av skjemasider.

{{% notice info %}}
Opprettelse og administrasjon av flere sider kan enkelt gjøres i Altinn Studio,
men dersom du ønsker å gjøre det manuelt kan dokumentasjonen her være til
hjelp.
{{% /notice %}}

Da er det eneste som gjenstår å sette seg inn i kommunens
krav til infosiden og komme i gang med utviklingen. Lykke til!

### Krav fra kommunen

I og med at det skal samles inn en god del data i denne tjenesten,
er det viktig for Sogndal kommune at det tydelig kommuniseres hvem skjemaet
er ment for og hva som vil gjøres med dataen som samles inn.
Noen i kommunen har opprettet en skisse av informasjonssiden.

Følgende er ønskelig at reflekteres i applikasjonen:
 - plassering av bilder
 - tekststørrelser
 - formatering av tekst

[Skisse på informasjonsside](/app/app-dev-course/modul2/infoside_tilflyttere.pdf)

!["Sogndal kommunevåpen"](/app/app-dev-course/modul2/kommune-logo.png "Et bilde av Sogndals kommunevåpen som kan benyttes i applikasjonen" )

### Nyttig dokumentasjon

- [Formatering av tekst i en applikasjon](/nb/app/development/ux/texts/#formatering-av-tekster)
- [Hvordan legge til bilder i en applikasjon](/nb/app/development/ux/images/#legge-til-bilder-i-applikasjonen)
- [Sidestilte komponenter](/nb/app/development/ux/styling/#sidestilte-komponenter-grid)
- [Filoppsett ved flere sider](/nb/app/development/ux/pages/#oppsett)
- [Administrere rekkefølge på flere sider](/nb/app/development/ux/pages/navigation/#rekkefølge)

### Forståelsessjekk
- Hvilken fil i applikasjonsrepoet er det som må justeres på dersom du manuelt ønsker å endre siderekkefølgen på eksisterende sider?
- Hvis du ønsker å gi en side et annet navn, men ikke har Altinn Studio tilgjengelig, hvilke filer må oppdateres med det nye filnavnet?
- Hvordan oppnår du at teksten bryter dersom tekststrengen ikke er lang nok til å naturlig brytes?
{{% /expandlarge %}}


{{% expandlarge id="innfore-sporvalg" header="Alternativ arbeidsflyt" %}}

I mange tilfeller er det ikke aktuelt å svare på alle spørsmål i et skjema, kanskje fordi svaret sier seg selv, eller fordi det ikke er relevant basert på noe man har svart tidligere i skjemaet. Da kan sporvalg være en god løsning.

Ved hjelp av sporvalg kan man styre hvilke sider i en applikasjon som er synlige for brukeren.

I denne oppgaven skal du sette opp sporvalg i applikasjonen basert på kravene fra Sogndal kommune.


### Krav fra kommunen

En bruker som ikke oppfyller kravene for skjemaet skal stoppes så tidlig som mulig i arbeidsflyten.


På infosiden er det ønskelig at brukeren skal oppgi om skjemaet gjelder dem eller ikke.

Hvordan dette gjøres er fritt fram,  og feltet  `Innflytter.KanBrukeSkjema` i datamodellen er mulig å benytte til dette formålet.

Basert på svaret skal brukeren sendes videre til _Spor 1_ eller _Spor 2_.

### Spor 1

- Brukeren har ikke svart bekreftende på at skjemaet gjelder deres situasjon

- Bruker skal sendes til en side med følgende tekst:

    ```rich
    Dette skjemaet er ikke for deg.
    Se en oversikt over andre tilbud i kommunen her.
    ```

- Linje 2 i teksten skal være en hyperlenke som peker på
https://www.sogndal.kommune.no/

### Spor 2

- Brukeren har svart bekreftende på at skjemaet gjelder deres situasjon.

- Brukeren sendes videre til datainnsamlingssidene.

### Nyttig dokumentasjon
- [Dynamiske uttrykk](/nb/app/development/logic/expressions)
- [Hvordan vise/skjule hele sider](/nb/app/development/logic/expressions/#viseskjule-hele-sider)
- [Formatering av tekst](/nb/app/development/ux/texts/#formatering-av-tekster)

### Forståelsessjekk
- Hvis en bruker går tilbake og endrer svaret sitt på infosiden, får den da opp datainnsamlingssidene?
- Dersom man har sporvalg på et senere tidspunkt i en arbeidsflyt og en sluttbruker endrer et valg, hva skjer med skjemdataen man tidligere har fylt ut, dersom siden skjules for sluttbrukeren?
{{% /expandlarge %}}


{{% expandlarge id="prefill-expandable" header="Forhåndsutfylling av personopplysninger" %}}

En av fordelene til Altinn er at man allerede har metadata om både personer og virksomheter tilgjengelig. Ved hjelp av forhåndsutfylling kan man hente ned data om brukerne og presentere den i utfylte felter, slik at de slipper å fylle dem ut selv. Typiske forhåndsutfyllingsverdier vil være navn, adresse, e-post osv.

Dersom dataen er tilgjengelig i en av Altinns forhåndsutfyllingskilder, kan dette konfigureres mot et felt i datamodellen og automatisk populeres når skjemaet opprettes. Dersom man har andre behov for forhåndsutfylling, kan dette løses med kode i applikasjonen.

I denne oppgaven flyttes fokus tilbake til den første datainnsamlingssiden, og målet er å forhåndsutfylle personopplysninger om sluttbrukeren for å spare brukeren for tid.

### Krav fra kommunen

- Følgende verdier skal forhåndsutfylles for brukeren:
  - Fornavn: Innflytter.Fornavn
  - Mellomnavn: Innflytter.Mellomnavn
  - Etternavn: Innflytter.Etternavn
  - E-post: Innflytter.Kontaktinformasjon.Epost
  - Telefonnummer: Innflytter.Kontaktinformasjon.Telefonnummer
  - Alder: Innflytter.Alder

- Det skal **ikke** være mulig å endre forhåndsutfylt navn og alder
- Det skal være mulig å endre forhåndsutfylt e-post og telefonnummer

### Nyttig dokumentasjon
- [Tilgjengelige forhåndsutfyllingskilder](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json)
- [Forhåndsutfylling fra nasjonale registre og brukerprofil](/nb/app/development/data/prefill/config/#prefill-fra-nasjonale-register-og-brukerprofil)
- [Egendefinert forhåndsutfylling](/nb/app/development/data/prefill/custom)
- [Beskrivelse av InstanceOwner-objektet](../../../api/models/instance/#instanceowner) - Her finner man personnummeret.
  Vær oppmerksom på at egenskapene refereres til med store forbokstaver i koden, ikke med små som i denne oversikten.

### Kodehjelp: Beregning av alder fra personnummer
Denne funksjonen kan brukes til å beregne alder fra personnummeret. Det er viktig å legge til `using System;` øverst i filen for at den skal fungere.
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

### Forståelsessjekk
- Er det mulig å endre en forhåndsutfylt verdi når den først er satt?
- Hvordan kan man hindre at en forhåndsutfylt verdi endres av sluttbrukeren?
- Ikke alle norske innbyggere har et fødselsnummer,
  noen får tildelt et [D-nummer](https://jusleksikon.no/wiki/F%C3%B8dselsnummer#D-nummer). Hvordan må koden din justeres for å ta hensyn til dette dersom alder skal baseres på et fødselsnummer eller D-nummer som sluttbruker selv taster inn?
{{% /expandlarge %}}


## Oppsummering

I denne modulen har du utvidet applikasjonen din med mer funksjonalitet i form av å
legge til flere sider, sette opp sporvalg for å styre brukerflyten og sette opp forhåndsutfylling av skjemafelter
både med tilgjengelige datakilder i Altinn og egendefinert kode.

Tjenesten skal kunne kjøres opp på din lokale maskin med lokal test og du skal kunne teste begge brukerflytene og
bekrefte at riktige felter blir forhåndsutfylt.

**Husk å _pushe_ de lokale endringene dine, så de blir tilgjengelige i Altinn Studio når du er fornøyd**

### Løsningsforslag
Dersom du ikke har fått til alle stegene har vi et [løsningsforslag](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/2) som du kan hente inspirasjon fra.

![Skjermbilde av infoside](/app/app-dev-course/modul2/infopage-screenshot.png "Skjermbilde av infoside")

![Skjermbilde av forhåndsutfylt dataside](/app/app-dev-course/modul2/data-screenshot.png "Skjermbilde av forhåndsutfylt dataside")

![Skjermbilde av alternativ arbeidsflyt: denne siden er ikke for deg](/app/app-dev-course/modul2/ikke-for-deg-screenshot.png "Skjermbilde av alternativ arbeidsflyt: denne siden er ikke for deg")