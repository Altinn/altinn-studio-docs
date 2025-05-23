---
title: "Modul 7: Legge til dynamikk"
description: 
linktitle: "Modul 7: Legge til dynamikk"
tags: [apper, kurs, dynamikk]
weight: 70
toc: true
---
 
I denne modulen skal vi videreutvikle applikasjonen ved å legge til dynamisk skjuling av sider og komponenter. Dette gjør 
at du kan styre hvilke deler av appen som vises, basert på brukerens svar.

## Temaer i denne modulen
- Vise og skjule sider ved hjelp av logiske uttrykk
- Vise og skjule komponenter ved hjelp av logiske uttrykk

## Krav fra Sogndal kommune
Sogndal kommune har to krav for dynamikk.

### Krav 1: Stopp brukere som ikke oppfyller kravene tidlig
En bruker som ikke oppfyller kravene for skjemaet skal stoppes så tidlig som mulig i arbeidsflyten. 
Hvis brukerne ikke bekrefter at skjemaet er relevant, skal de sendes til en ny forklaringsside. Hvis de bekrefter at det er relevant,
skal de sendes til datainnsamlingssidene.

### Krav 2: Vis stillingsutlysninger for IKT-bransjen
Om en bruker velger **IKT (data/it)** under bransje skal det vises en tekst med en lenke til en av deres stillingsutlysninger.

## Implementer dynamisk visning og skjuling av sider
For å oppfylle krav 1 fra Sogndal kommune, må vi opprette en ny side som skal vises hvis appen ikke er relevant for brukeren. 
Vi legger også til en funksjon der brukeren kan bekrefte om appen er relevant. Ut fra dette valget kan vi skjule eller vise sider dynamisk, ved hjelp av logiske uttrykk.

### Legg til ny side
Vi legger til en ny side som skal vises hvis brukeren ikke bekrefter at de oppfyller kravene for appen.
1. Klikk på **Utforming**.
2. Klikk på **Legg til ny side** og gi den navnet ```ikke-for-deg``` 
3. Dra inn en komponent av typen **Avsnitt**.
4. Klikk på **Ledetekst** under **Tekst**-menyen til komponenten.
5. Kopier inn følgende tekst: 
    ```md
    Dette skjemaet er ikke for deg.
    Se en oversikt over andre tilbud i kommunen [her](https://www.sogndal.kommune.no/).
    ```
Appen skal nå bestå av fire sider.

!["Fire sider"](fire_sider.png)

### Oppdater datamodellen
For at appen skal kunne vurdere om skjemaet er relevant for brukeren, må vi oppdatere datamodellen.
1. Klikk på **Datamodell**.
2. Klikk på **Legg til**.
3. Klikk på **Ja/nei**.
4. Endre navnet på feltet til ```KanBrukeSkjema```.
5. Klikk på **Generer modeller**.

Datamodellen skal nå se slik ut:

!["Datamodell med KanBrukeSkjema"](datamodell.png)

### Legg til radioknapper
Vi legger til radioknapper på infosiden, så brukeren kan bekrefte at skjemaet er relevant for dem.
1. Klikk på **Utforming**.
2. Klikk på **infoside** og dra inn en komponent av typen **Radioknapper**.
    !["Skjermbilde av radioknapper-komponenten satt inn i skjemabyggeren"](skjemabygger_med_radioknapper.png)
3. Klikk på **Ledetekst** under **Tekst**-menyen til komponenten og kopier inn teksten:
    ```Jeg møter kriteriene for å bruke appen.```
4. Lag en ny kodeliste ved å klikke på **Lag ny**.
5. Velg `Boolsk` fra nedtrekkslisten for valg av kodenes datatype.          
6. Klikk på **Legg til alternativ**.
7. Klikk på boksen for koden. Når den er sjekket er verdien `true`.
8. Fyll inn teksten `Ja` for ledeteksten til alternativ 1.
9. Klikk på **Legg til alternativ** igjen.
10. Fyll inn teksten `Nei` for ledeteksten til alternativ 2.
11. Lukk modalen.
12. Klikk på **Radioknapper** under **Datamodellknytninger**-menyen 
13. Velg **KanBrukeSkjema** som datamodellknytning. 

### Vis og skjul sider ved hjelp av logiske uttrykk
Sidene **Side1** og **Arbeidsforhold** skal vises når brukerne har bekreftet at de oppfyller kriteriene for appen. Dette gjør du 
ved å bruke logiske uttrykk. De styrer når en side skal vises, ut fra dataene brukeren har lagt inn.
1. Klikk på **Side1**.
2. Klikk på **Valg for dynamikk**.
3. Klikk på **Gjør om til logisk uttrykk**.
4. Klikk på **Endre** for å åpne komponenten som brukes til å bygge logiske uttrykk.
5. For den første operanden velg **Datamodell** som type. Deretter velger du datamodellfeltet **KanBrukeSkjema**.
6. For operator velg **er ikke lik**.
7. For den andre operanden velg **Sann/Usann** som type og sett verdien til **Sann**.

!["Skjermbilde av dynamikkinnstillinger for Side1"](dynamikk_Side1.png)

Gjenta prosessen for "Arbeidsforhold" ved å klikke på **Arbeidsforhold** i steg 1.

Gjenta prosessen over for siden **ikke-for-deg** , men velg verdien **Usann** i stedet for **Sann** for operanden i steg 7.

## Vis stillingsutlysning for brukere med IKT-kompetanse
Sogndal kommune ønsker at stillingsutlysningene deres vises når brukeren har markert at de har IKT-kompetanse.
### Legg inn stillingsutlysningen
Første steg er å legge inn stillingsannonsen i skjemaet.
1. Klikk på **Utforming** og gå til siden **Arbeidsforhold**.
2. Dra inn en **Avsnitt**-komponent og legg den mellom komponentene **Bransje** og **Antall år i arbeidslivet**.
   !["Skjermbilde av avsnittskomponenten satt inn i skjemabyggeren"](skjemabygger_med_avsnitt.png)
3. Klikk på **Ledetekst** under **Tekst** for Avsnitt-komponenten, og kopier inn følgende tekst:
    ```md
    Vi ser at du besitter kompetanse vi trenger i kommunen.
    
    [Se en oversikt over våre ledige stillinger her](https://sogndal.easycruit.com/index.html).
    ```
### Skjul stillingsutlysningen om IKT ikke er valgt som bransje
Nå skal vi legge inn en logikkregel for å skjule stillingsutlysningen hvis brukeren ikke har valgt IKT som bransje.
1. Klikk på **Valg for dynamikk** i avsnittskomponenten som ble lagt inn i forrige steg.
2. Klikk på **Lag en ny logikkregel** og **Skjul felt dersom**.
3. For å sette opp en avansert dynamikkregel, må vi legge inn et manuelt uttrykk. Klikk **Manuell** og kopier inn uttrykket:
   ```
    [
        "not",
        [
            "commaContains",
            [
                "dataModel",
                "arbeidsforhold.bransje"
            ],
            "491"
        ]
    ]
    ```
    Dette uttrykket sjekker om bransjefeltet i datamodellen inneholder nummeret 491, som tilsvarer **IKT (data/IT)** i kodelisten for bransje.

!["Skjermbilde av dynamikkinnstillinger for stillingsutlysningen"](dynamikk_stillingsutlysning.png)

## Nyttig dokumentasjon
- [Brukerveiledning - Dynamikk](../../../guides/development/dynamics/)
- [Dokumentasjon - Dynamiske uttrykk](../../../reference/logic/expressions/)

## Oppsummering
I denne modulen har du satt opp logiske utrykk for å dynamisk bestemme hvilke sider og komponenter som skal vises til brukeren.

{{<navigation-buttons
  urlBack="../modul6"
  textBack="<< Forrige modul"
>}}