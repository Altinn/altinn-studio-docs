---
title: Casebeskrivelse
description: Beskrivelse av kommunens krav og ønsker til tjenesten.
linktitle: Case
tags: [apps, case, training]
weight: 10
---

Sogndal kommune trenger sårt flere unge mennesker og ønsker å bli en
attraktiv kommune for unge voksne og andre i etableringsfasen.

I den sammenheng ønsker de å opprette en tjeneste i Altinn
beregnet på personer som skal flytte til Sogndal i løpet av de neste 6 månedene.

Ved å samle inn data om tilflyttere på et tidlig tidspunkt kan kommunen legge til rette og
spisse tilbudene til tilflytterne allerede før første flytteeske er pakket.

De har en del krav til tjenesten som er beskrevet i seksjonene nedenfor.

## Krav fra kommunen

### Navngivning
{{% expandlarge id="navngivning-expandable" header="Krav" %}}

- Applikasjonen må ha et fornuftig navn som gjør det enkelt å finne den igjen blant det store antallet
repositories Sogndal kommune har i Altinn Studio.

- Det er ingen foreløpige planer om årlige revisjoner av appen,
så man trenger ikke ta hensyn til årstall i navnet.

Det er et ønske om at et eller flere av ordene "tilflytter" og "Sogndal" er med i navnet.

{{% /expandlarge %}}

### Første side med datainnsamling
{{% expandlarge id="forste-side-datainnsamling-expandable" header="Krav" %}}

- Vil ha navn og alder på personen som er tilflytter
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
  - Alder
- Vil ha adressen på personen som er tilflytter
  - Gateadresse
  - Postnummer
  - Poststed
- Vil ha kontaktinformasjon på personen som er tilflytter
  - Epost
  - Telefon

{{% /expandlarge %}}

### Tekster
{{% expandlarge id="tekster-expandable" header="Krav" %}}

- Alle inputfelter skal ha forklarende ledetekster (labels) som beskriver hva som skal fylles inn.
- Applikasjonen må være tilgjengelig både på bokmål, nynorsk og engelsk.  
  I en første versjon er det tilstrekkelig at kun ett av disse språkene støttes.
- Det er viktig at applikasjonens visningsnavn klinger godt og er beskrivende for tjenesten.

{{% /expandlarge %}}

### Infoside
{{% expandlarge id="infoside-expandable" header="Krav" %}}

Noen i kommunen har opprettet en skisse av informasjonssiden.

Følgende er det ønskelig at reflekteres i applikasjonen:
 - Plassering av bilder
 - Tekststørrelser
 - Formatering av tekst

[Skisse på informasjonsside](/app/app-dev-course/modul2/infoside_tilflyttere.pdf)

!["Sogndal kommunevåpen"](/app/app-dev-course/modul2/kommune-logo.png "Et bilde av Sogndals kommunevåpen som kan benyttes i applikasjonen" )

{{% /expandlarge %}}


### Alternativ arbeidsflyt (sporvalg)
{{% expandlarge id="sporvalg-expandable" header="Krav" %}}

En bruker som ikke oppfyller kravene for skjemaet skal stoppes så tidlig som mulig i arbeidsflyten.

På infosiden er det ønskelig at brukerne skal oppgi om skjemaet gjelder dem eller ikke.

Hvordan dette gjøres er fritt fram, og feltet `Innflytter.KanBrukeSkjema` i datamodellen er mulig å benytte til dette formålet.

Basert på svaret skal brukeren sendes videre til _Spor 1_ eller _Spor 2_.

### Spor 1

- Brukeren har ikke svart bekreftende på at skjemaet gjelder vedkommendes situasjon.
- Bruker skal sendes til en side med følgende tekst:
    ```md
    Dette skjemaet er ikke for deg.
    Se en oversikt over andre tilbud i kommunen her.
    ```
- Linje 2 i teksten skal være en hyperlenke som peker på https://www.sogndal.kommune.no/.
- Det skal ikke være mulig å navigere til andre skjemasider etter denne.

### Spor 2

- Brukeren har svart bekreftende på at skjemaet gjelder vedkommendes situasjon.
- Brukeren sendes videre til datainnsamlingssidene.

{{% /expandlarge %}}

### Forhåndsutfylling av personopplysninger
{{% expandlarge id="prefill-expandable" header="Krav" %}}

- Følgende verdier skal forhåndsutfylles for brukeren:
  - Fornavn: Innflytter.Fornavn
  - Mellomnavn: Innflytter.Mellomnavn
  - Etternavn: Innflytter.Etternavn
  - E-post: Innflytter.Kontaktinformasjon.Epost
  - Telefonnummer: Innflytter.Kontaktinformasjon.Telefonnummer
  - Alder: Innflytter.Alder
- Det skal **ikke** være mulig å endre forhåndsutfylt navn og alder
- Det skal være mulig å endre forhåndsutfylt e-post og telefonnummer

{{% /expandlarge %}}


### Differensiert datagrunnlag for offentlig og privat sektor
{{% expandlarge id="options-expandable" header="Krav" %}}

Vi ønsker at brukerne skal ha et ulikt sett med svaralternativer for bransjevalget
basert på hvilken sektor de har krysset av for.

- Privat sektor: [Standardlisten med bransjer](../industry.json)
- Offentlig sektor: `Stat` og `Kommune`

{{% /expandlarge %}}


### Skreddersydd tilbud for IT-kompetanse
{{% expandlarge id="dynamics-expandable" header="Krav" %}}

Vi ønsker at dersom brukeren velger `IKT (data/it)` under bransje at det vises en tekst med en lenke til en av våre stillingsutlysninger.

- Under bransjevalget skal følgende tekst presenteres:
    ```md
    Vi ser at du besitter kompetanse vi trenger i kommunen.
    Se en oversikt over våre ledige stillinger her.
    ```
- Linje 2 i teksten skal være en hyperlenke som peker på https://sogndal.easycruit.com/index.html.

Tekst og lenke skal **kun** vises om man har valgt `IKT (data/it)`. I alle andre tilfeller skal dette være skjult.

{{% /expandlarge %}}


### Bekreftelse før innsending
{{% expandlarge id="bekreftelse-expandable" header="Krav" %}}

Vi ønsker at brukeren før innsending presenteres for hva dataen skal benyttes til
og samtykker (indirekte) til dette ved å sende inn skjemaet.

### Mulige operasjoner
På dette punktet i arbeidsflyten skal brukeren kunne:
1. Se over dataen som er utfylt
2. Avslutte arbeidsflyten uten å sende inn skjemaet
3. Avslutte arbeidsflyten og sende inn skjemaet


### Autorisasjon
- Det skal være samme rollekrav for å fylle ut og bekrefte en instans.

### Validering
- Det skal kun være mulig for brukeren som eier instansen å sende inn skjemaet, selv om andre måtte inneha de nødendigve rollene.

### Tekster

Vi ønsker at brukeren skal presenteres med følgende tekst før innsending:

```md
Du er nå klar for å sende inn melding om tilflytting til Sogndal kommune.

Ved å sende inn dette skjemaet samtykker du til at dataen du har fylt ut kan lagres og benyttes
til å tilpasse kommunens tilbud til deg de neste 18 månedene.

Før du sender inn vil vi anbefale å se over svarene dine. Du kan ikke endre svarene etter at du har sendt inn.
```
{{% /expandlarge %}}

### Innhenting av tidligere bosteder
{{% expandlarge id="bosteder-expandable" header="Krav" %}}

For å kunne skreddersy et best mulig tilbud til nye innflyttere, ønsker vi oss en oversikt over tidligere bosteder til innflytteren.

På datasiden ønsker vi at det legges opp til at brukeren kan fylle inn tidligere bosteder.
Tidligere bosteder skal inneholde følgende felter:

- Gateadresse
- Postnummer
- Poststed

Det skal være mulig å legge inn opptill 10 tidligere bosteder.

{{% /expandlarge %}}

### Validering tidligere bosteder
{{% expandlarge id="vendetta-expandable" header="Krav" %}}

Grunnet en personlig vendetta blant en av Sogndal kommunes ansatte, ønsker vi at om innflytter fyller inn
postnummer `4619` som en av tidligere bosteder, skal vedkommende **IKKE** få lov til å flytte inn i Sogndal.

Her ønsker vi at det skal dukke opp en feilmelding på det aktuelle feltet med følgende tekst:

```md
Du er ikke velkommen til vår kommune. Beklager!
```

{{% /expandlarge %}}

### Dataprossessering av ugyldig gateadresse
{{% expandlarge id="dataprossesering-expandable" header="Krav" %}}

En av kommunens databehandlere har sett seg lei av å manuelt rette opp i en gateadresse som ofte blir skrevet feil av innflyttere.
Vi ønsker derfor å programmatisk fikse opp i dette under utfyllingen av appen.

Om sluttbruker fyller inn `Sesame Street 1` i feltet `Innflytter.Adresse.Gateadresse`, skal dette automatisk rettes til `Sesamsgate 1`.
I alle andre tilfeller skal feltet forbli urørt.

{{% /expandlarge %}}
