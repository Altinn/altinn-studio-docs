---
title: "Modul 4: Lage infoside"
description: Lag en informasjonsside som brukerne ser når de starter tjenesten.
linktitle: "Modul 4: Lage infoside"
tags: [apps, training, form, pages]
weight: 40
toc: true
---

I denne modulen skal vi legge til en ny side i skjemaet, som skal vise informasjon om tjenesten til brukere når
de starter tjenesten.


## Temaer i denne modulen
- Legge til flere sider i et skjema
- Endre tekster
- Legge til et bilde
- Tilpasse bredden til en komponent i et skjema

## Krav fra Sogndal kommune
Siden Sogndal kommune vil samle inn personopplysninger i denne tjenesten, må de klargjøre hvem skjemaet 
er ment for og hvordan de vil bruke dataene. Noen i kommunen har laget 
[et utkast til en informasjonsside for dette formålet](../resources/infoside_tilflyttere.pdf).

Utdrag fra kravspesifikasjonen:
> Informasjonssiden bør gjenspeile følgende elementer fra skissen:
> - Plassere bilder
> - Endre tekststørrelser
> - Formatere tekst

Du kan bruke dette bildet av Sogndals kommunevåpen i tjenesten:

!["Sogndal kommunevåpen"](../resources/kommune-logo.png )

## Legg til ny side
1. Klikk på **Legg til ny side** for å legge til en ny side i skjemaet. Du får automatisk navigasjonsknappene **Neste** og **Forrige** på begge sidene.
3. Endre navnet på siden. Klikk på **Side-ID** i egenskapene for siden og skriv navnet `infoside`.
    - Test navigasjonsknappene på side 1 og 2. Deretter åpner du `infoside` igjen for å fortsette.
4. Klikk på de tre prikkene til høyre for navnet på infosiden og velg **Flytt opp**. Du ser at siden blir flyttet og kommer først. 
5. Klikk på **Legg til komponent**, og deretter på **Vis alle**. Under **Informasjon** i komponentoversikten, klikker du på **Bilde** og deretter på **Legg til**. Pass på at bildet
    ligger øverst på siden.
7. I egenskapene for komponenten, åpne **Innhold**.
8. Under **Komponentbredde** slår du av valget **Bruk standardinnstilling** og setter bredden til 3.
10. Gå til **Bildeinnstillinger**. I feltet **Kilde**, legger du inn lenken til bildet: 
`https://docs.altinn.studio/nb/altinn-studio/v8/getting-started/app-dev-course/resources/kommune-logo.png`. 
Tips! Du kan også lagre bildet på PC-en din og laste det opp under **Tekst og valg for bilde**. 
11. Gå til komponentoversikten og legg til komponenten **Tittel**. Under egenskapene for komponenten åpner du **Tekst** og klikker på **Ledetekst**.
Legg til ledeteksten
    ```text
    Informasjon om fremtidige tilflyttere
    ```
14. Gå til **Innhold** og **Komponentbredde**. Slå av **Bruk standardinnstilling** og sett bredden til 9.
17. Gå til komponentoversikten igjen og legg til komponenten **Avsnitt**. Flytt den så den ligger under Tittel, som du la til tidligere.
18. Under egenskapene for komponenten, åpner du **Tekst** og klikker på **Ledetekst**.
Legg inn denne teksten:
    ```text
    Sogndal kommune bruker informasjonen du oppgir i dette skjemaet til å skreddersy en pakke med kommunale tilbud til deg og de du eventuelt flytter til kommunen sammen med.
    ```
20. Legg til en ny Avsnitt-komponent og lim inn følgende tekst:
    ```text
    Du skal ikke bruke dette skjemaet hvis
    - du allerede bor i Sogndal kommune
    - du bor i en annen kommune og ikke har planer om å flytte
    - du skal flytte til Sogndal, men **ikke** innen de neste 12 månedene
    ```
    Du kan bruke `-` til å formatere teksten som en punktliste, og `**` til å utheve tekst.


### Nyttig dokumentasjon
- [Formatere tekster](/nb/altinn-studio/v8/reference/ux/texts/#formatering-av-tekster)
- [Sidestilte komponenter](/nb/altinn-studio/v8/reference/ux/styling/#sidestilte-komponenter-grid)

## Oppsummering
I denne modulen har du lagt til en ny side i skjemaet. Du har lagt inn bilde og
tekster og stilt inn bredden på dem. Du har også lært enkel formatering av tekst.


{{<navigation-buttons
  urlBack="../modul3"
  textBack="<< Forrige modul"
  urlNext="../modul5"
  textNext="Neste modul >>"
>}}
