---
title: "Modul 6: Legge til kodelister"
description: 
linktitle: "Modul 6: Legge til kodelister"
tags: [apper, kurs, kodelister]
weight: 60
toc: true
---

I denne modulen skal vi bygge videre på appen vår for å støtte enda flere av [kravene til Sogndal kommune](../case/#krav-fra-kommunen).

## Temaer i denne modulen
- Radioknapper
- Avkrysningsbokser
- Nedtrekkslister
- Kodelister
- Gitea

## Krav fra Sogndal kommune
I denne modulen skal vi jobbe med disse kravene fra kommunen:
> Kommunen ønsker å samle inn følgende data om innflyttere:
> - Arbeids- og bransjeerfaring
> - Sektor (privat/offentlig)
> - Bransje ([standardliste med bransjer](../industry.json))

## Oppgaver

I mange tjenester trenger vi å gi brukerne et sett med svaralternativer for et datafelt.
Slike sett med svaralternativer kalles _kodelister_ eller _alternativer_.

Du kan sette opp kodelister på tre måter i Altinn:
- Ved å legge til alternativer manuelt for komponenten i Altinn Studio.
- Ved å la komponenten hente alternativer fra JSON-fil med ferdige alternativer.
- Ved å generere alternativer dynamisk ved hjelp av kode.

I denne oppgaven skal vi se på de første to metodene.

### Legg til de nye feltene i datamodellen

1. Gå til **Datamodell**.
2. Velg **Legg til**.
3. Velg **Objekt**.
4. Gi objektet navnet **arbeidsforhold**.
5. Gå til **Felter**-fanen.
6. Legg til tre tekstfelter med navnene **sektor**, **bransje** og **aar_i_arbeidslivet**.

!["Datamodell med arbeidserfaring"](datamodell.png)

### Opprett en ny skjemaside for arbeidsforhold

1. Gå til **Lage**.
2. Opprett en ny side og kall den **Arbeidsforhold**.

Skjemaet du har laget skal nå ha tre sider.

!["Tre sider"](tre_sider.png)

### Legg til radioknapper for sektor
Brukeren skal kunne velge mellom offentlig og privat sektor. Til det er det naturlig å bruke [radioknapper](/nb/altinn-studio/reference/ux/components/radiobuttons/).

1. Dra inn en komponent av typen **Radioknapper** øverst på den nye siden.
2. Under **Tekst** i egenskapene til komponenten du har lagt til, legg til ledeteksten **Sektor**. Nå bør skjemabyggeren se slik ut:
   !["Skjemabygger med sektor"](skjemabygger_med_sektor.png)
3. Nederst i tekstseksjonen kan man sette opp alternativer. Fanen **Velg kodeliste** er valgt som utgangspunkt. Velg fanen **Sett opp egne alternativer** for å legge til egne alternativer.
4. Velg **Egendefinert kodeliste**. Du vil se at det dukker opp et vindu med overskriften **Kodeliste**.
5. Klikk på **Legg til alternativ**.
6. Skriv `offentlig` i **Verdi**-kolonnen. Dette er verdien som vil bli sendt til systemet når brukeren besvarer skjemaet.
7. Skriv `Offentlig` i **Ledetekst**-kolonnen. Dette er teksten som brukeren vil se ved siden av radioknappen.
8. Gjenta stegene fra trinn 5 til trinn 7, men oppgi verdien `privat` og ledeteksten `Privat`.
   !["Alternativer for sektor"](alternativer_sektor.png)
9. Nå mangler vi bare å koble komponenten til riktig felt i datamodellen. Åpne **Datamodellknytninger**, klikk på **Radioknapper** og velg `arbeidsforhold.sektor`.

### Legg til avmerkingsbokser for bransje
Brukeren skal også kunne velge én eller flere bransjer. Siden det skal være mulig å velge mer enn ett alternativ, er det naturlig å bruke [avmerkingsbokser](/nb/altinn-studio/reference/ux/components/checkboxes/). I stedet for å legge til alternativene manuelt, skal vi bruke [en fil med en _kodeliste_](industri.json). En kodelistefil er nyttig hvis vi for eksempel trenger å bruke de samme alternativene flere steder.

Slik bruker du en kodeliste til å lage en liste med avmerkingsbokser:

#### Legg til komponenten
1. Dra en komponent av typen **Avmerkingsbokser** inn på siden, etter radioknappkomponenten for sektor.
2. Under **Tekst** i egenskapene til komponenten du har lagt til, legg til ledeteksten **Bransje**. Nå bør skjemabyggeren se slik ut:
   !["Skjemabygger med bransje"](skjemabygger_med_bransje.png)
3. Gå til **Datamodellknytninger**, velg **Avmerkingsbokser** og koble komponenten til feltet `arbeidsforhold.bransje`.

#### Laste opp og koble til kodelisten til komponenten
1. Last ned [kodelisten](industri.json).
2. Åpne siden der du la til **Bransje** og klikk på **Bransje**.
3. Under **Tekst** i egenskapene for **Bransje**, sjekk at fanen **Velg kodeliste** er valgt.
4. Trykk på knappen med teksten **Last opp din egen kodeliste**.
5. Finn frem til filen du nettopp lastet ned. Den har navnet **industri.json**.
6. Velg filen, og trykk på **Åpne**.
7. Velg **industri** fra nedtrekkslisten som vist under.
   !["Bruk kodeliste"-nedtrekssliste](bruk_kodeliste.png)

Nå skal avmerkingsboksene være klare.

### Legg til en nedtrekksliste for antall år i arbeidslivet
Det siste vi skal gjøre i denne modulen er å legge til en nedtrekksliste hvor brukerne kan si noe om hvor lenge de har vært i arbeid. Listen skal ha følgende alternativer:

| Visningsverdi   | Dataverdi |
|-----------------|-----------|
| 0 – 5 år        | `0-5`     |
| 5 – 10 år       | `5-10`    |
| 10 – 20 år      | `10-20`   |
| 20 år eller mer | `20+`     |

Til denne komponenten skal vi også bruke en kodelistefil, men denne gangen skal vi kode alternativene selv.

#### Legg til komponenten og del endringene
1. Fra **Komponenter**-panelet, dra inn komponenten som heter **Nedtrekksliste** og legg den til rett etter avmerkingsboksene.
2. Gi komponenten ledeteksten **Antall år i arbeidslivet**. Skjemaet skal nå se slik ut:
   ![Skjemabygger med antall_år i arbeidslivet](skjemabygger_med_tid_i_arbeidslivet.png)
3. Legg til en datamodellknytning til feltet `arbeidsforhold.aar_i_arbeidslivet`.
4. Klikk på **Last opp dine endringer** for å dele arbeidet du har gjort. Den røde prikken viser at du har gjort endringer som ikke er delt.
   !["Last opp dine endringer"-knapp](last_opp_dine_endringer.png)
5. Skriv en kort tekst om hva du har oppdatert. Hvis det er flere som jobber på samme app, blir det lettere for dem å vite hva du har jobbet med. Dette er frivillig.
6. Velg **Del endringer** for å lagre teksten og laste opp endringene dine. Etter en liten stund skal du få en beskjed om at appen er oppdatert, og den røde prikken skal forsvinne.

#### Legg til kodelisten i repositoriet
1. Klikk på profilikonet og gå til repositoriet i Gitea.
2. Gå til mappen `App/options`. Her vil du se at filen `industri.json` fra forrige steg er listet opp.
3. Velg **Add file** og deretter **Ny fil**.
4. Skriv inn filnavnet `aar_i_arbeidslivet.json`. Husk filtypen `.json`. Uten den vil ikke Studio finne filen når vi skal koble kodelisten til komponenten etterpå.
5. Kopier koden under og lim den inn i tekstområdet der det står **Ny fil**.
   ```
   [
       {
           "label": "0 – 5 år",
           "value": "0-5"
       },
       {
           "label": "5 – 10 år",
           "value": "5-10"
       },
       {
           "label": "10 – 20 år",
           "value": "10-20"
       },
       {
           "label": "20 år eller mer",
           "value": "20+"
       }
   ]
   ```
6. Velg **Commit endringer** nederst på siden. Det kan hende du får en melding fra Gitea om at filen inneholder tvetydige tegn, men den kan du trygt ignorere.

#### Koble kodelisten til komponenten
1. I Altinn Studio ser du nå en rød prikk ved knappen **Hent endringer**. Det betyr at det er gjort endringer i filsystemet (mappen du har lagt til i Gitea), som du må synkronisere med Studio.
   !["Hent endringer"-knapp](hent_endringer.png)
2. Klikk på knappen. Du vil få en bekreftelse på at du har fått siste versjon og prikken forsvinner.
3. Klikk på komponenten **Antall år i arbeidslivet** og legg til den nye kodelisten på samme måte som du gjorde da du la til kodeliste for bransje.

Nå skal din app ha fått en nedtrekksliste med alternativene som er spesifisert i kodelisten.

## Nyttig dokumentasjon
Se [kodelisteguiden](../../../guides/development/options/) for å se hvordan kodelister settes opp i appkoden.

## Oppsummering
I denne modulen har du lagt til en gruppe med radioknapper, en gruppe med avkrysningsbokser og en nedtrekksliste. Du har også satt opp svaralternativer manuelt i Studio og ved hjelp av JSON-filer i Gitea.

{{<navigation-buttons
  urlBack="../modul5"
  textBack="<< Forrige modul"
  urlNext="../modul7"
  textNext="Neste modul >>"
>}}
