---
title: Modul 3
description: Kontroller og dynamikk
linktitle: Modul 3
tags: [apps, training, datamodel, texts]
weight: 30
---
I denne modulen skal du videreutvikle applikasjonen du laget i [Modul 1](../modul1) med blant annet en ny side og dynamisk skjuling av felter.

Denne modulen vil i all hovedsak foregå i Altinn Studio designer, men noen oppdateringer vil også trenge at vi oppdaterer
filene til applikasjonen direkte i det sentrale filområdet til applikasjonen.

**Temaer som dekkes i denne modulen:**

- Flere sider
- Bildekomponent
- Dynamisk skjuling av felter/komponenter
- Flervalgskomponenter

## Oppgaver

{{% expandlarge id="legge-til-infoside" header="Legge til infoside" %}}

For skjemaer der det samles inn eller gis mye informasjon
kan det forbedre brukeropplevelsen dersom man deler applikasjonen opp i flere sider.

La oss se nærmere på hvordan man kan opprette en ny side i applikasjonen
som vises _før_ brukeren kommer til første datainnsamlingsside som ble laget i Modul 1.

Opprettelse og administrasjon av flere sider kan gjøres i [Altinn Studio Designer](/nb/app/getting-started/), 
ved å trykke på "Legg til side" i skjemaoversikten.

### Krav fra kommunen

Siden Sogndal kommune vil samle inn en betydelig mengde data i denne tjenesten, må de klargjøre hvem skjemaet 
er ment for og hvordan de vil bruke dataene. Noen i kommunen har laget et 
[utkast til en informasjonsside](infoside_tilflyttere.pdf) for dette formålet.

Informasjonssiden bør gjenspeile følgende elementer:
 - plassering av bilder
 - tekststørrelser
 - formatering av tekst

Du kan bruke følgende bilde av Sogndals kommunevåpen i applikasjonen:

!["Sogndal kommunevåpen"](kommune-logo.png )

### Oppgaver

1. Legg til en ny side. Gi den et passende navn og plasser den foran skjemasiden du opprettet i Modul 1.
2. [Legg til bilde](/nb/app/development/ux/components/image/#legg-til-komponent) av Sogndals kommunevåpen.
3. Legg til tekst i henhold til [skisse](infoside_tilflyttere.pdf).

### Nyttig dokumentasjon

- [Formatering av tekst](/nb/app/development/ux/texts/#formatering-av-tekster)
- [Hvordan legge til bilder i en applikasjon](/nb/app/development/ux/components/images/)
- [Sidestilte komponenter](/nb/app/development/ux/styling/#sidestilte-komponenter-grid)
- [Filoppsett ved flere sider](/nb/app/development/ux/pages/)
- [Administrere rekkefølge på flere sider](/nb/app/development/ux/pages/navigation/#rekkefølge)

### Forståelsessjekk

{{% expandsmall id="m2t1q3" header="Hvordan kan du tvinge tekst til å bryte dersom tekststrengen ikke er lang nok til å naturlig brytes?" %}}
Alle tekstressurser støtter Markdown og dermed HTML-notasjon. Du kan derfor benytte `<br>` for å tvinge tekstbrytning.
{{% /expandsmall %}}

{{% /expandlarge %}}

{{% expandlarge id="sporvalg" header="Dynamisk vis/skjul av felter" %}}

I mange tilfeller er det ønskelig å kontrollere hvilke deler av applikasjonen som er synlige basert på brukerens respons.
For eksempel kan det være relevant å hoppe over noen av spørsmålene i et skjema hvis svaret er åpenbart eller irrelevant basert på tidligere svar.

I denne oppgaven vil du sette opp dynamiske uttrykk i applikasjonen for å vise og skjule ulike felter basert på brukerens respons.

### Krav fra kommunen

En bruker som ikke oppfyller kravene for tjenesten, bør stoppes så tidlig som mulig i arbeidsflyten.
Brukeren skal indikere om tjenesten gjelder dem på informasjonssiden.

Måten svaret samles inn på er valgfri, men et tips er å bruke en valg-komponent som [avkrysningsbokser](/nb/app/development/ux/components/checkboxes/), [radioknapper](/nb/app/development/ux/components/radiobuttons/) eller [nedtrekksliste](/nb/app/development/ux/components/dropdown/).
Merk at en komponent må være knyttet til et felt i datamodellen for å lagre verdier (du kan bruke feltet `Innflytter.KanBrukeSkjema` i datamodellen).

Brukeren skal vises ett av følgende alternativ basert på svaret deres:

*Alternativ 1*

- Brukeren indikerer at tjenesten ikke gjelder deres situasjon.
- Brukeren skal vises en info-melding med følgende tekst:

    > Dette skjemaet er ikke for deg.  
    > [Se en oversikt over andre tilbud i kommunen her](https://www.sogndal.kommune.no/).
    
    Linje 2 i teksten er en hyperlenke som peker på https://www.sogndal.kommune.no/
- Navigeringsknapp til neste side i skjemaet skal skjules.

*Alternativ 2*

- Brukeren har svart bekreftende på at tjenesten gjelder deres situasjon.
- Info-melding om at skjemaet ikke gjelder for brukeren skal skjules.
- Navigeringsknapp til neste side i skjemaet skal vises.

### Oppgaver
1. Legg til et nytt felt i datamodellen som skal lagre brukerens valg om skjemaet gjelder for dem eller ikke.
   - Husk å trykke på "Generer modeller" når du har lagt til et nytt felt, og _Last opp dine endringer_.
2. Legg til en komponent på informasjonssiden hvor brukeren kan oppgi om skjemaet gjelder dem eller ikke.
3. Legg til dynamikk som viser relevante skjemakomponenter basert på brukerens svar.

### Nyttig informasjon
Dynamikk på en komponent settes opp via en editor i Altinn Studio. Når man har valgt en komponent i skjemaet,
kan man gå til "Dynamikk"-seksjonen i høyre-panelet. Der kan man legge til nye dynamiske uttrykk som f.eks. kan styre
om et felt skjules basert på enkle regler. 

For å skjule et valgt felt:
- Åpne Dynamikk-seksjonen og velg "Lag ny logikkregel".
- Velg "Skjul felt dersom"
- Trykk på "Legg til underutrykk"
- Trykk på "Endre"
- I første del av uttrykket (første operand)
  - I "Type"-feltet, velg "Datamodell"
  - I "Datamodellfelt"-feltet, velg datamodell som inneholder verdien du ønsker å sjekke
- Operator - velg det som gjelder
- I andre del av uttrykket (andre operand)
  - Velg det du ønsker å sammenligne mot. Det kan være et annet felt i datamodellen, eller et tall eller en tekst
- Trykk på "Lagre og lukk"

### Nyttig dokumentasjon
- [Dynamiske uttrykk](/nb/app/development/logic/expressions)
- [Hvordan skjule hele sider](/nb/app/development/logic/expressions/#viseskjule-hele-sider)
- [Formatering av tekst](/nb/app/development/ux/texts/#formatering-av-tekster)

{{% /expandlarge %}}

## Oppsummering
I denne modulen har du opprettet en informasjonsside med tekster og bilde. Du har lagt inn dynamiske uttrykk
som styrer når visse felter vises/skjules basert på brukerens valg.

{{% center %}}
[<< Forrige modul (modul 2)](../modul2/)      [Neste modul (modul 4) >>](../modul4/)
{{% /center %}}