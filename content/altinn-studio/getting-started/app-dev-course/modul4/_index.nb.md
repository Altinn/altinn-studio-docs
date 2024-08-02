---
title: "Modul 4: Lage infoside"
description: Lag en informasjonsside som brukerne ser når de starter tjenesten.
linktitle: "Modul 4: Lage infoside"
tags: [apps, training, form, pages]
weight: 40
toc: true
---

I denne modulen skal vi legge til en ny side i skjemaet som skal vise informasjon om tjenesten til brukere når
de starter tjenesten.


## Temaer som dekkes i denne modulen
- Flere sider i et skjema
- Tekster
- Bildekomponent
- Tilpasse bredden til en komponent i et skjema

## Krav fra Sogndal kommune
Siden Sogndal kommune vil samle inn personopplysninger i denne tjenesten, må de klargjøre hvem skjemaet 
er ment for og hvordan de vil bruke dataene. Noen i kommunen har laget 
[et utkast til en informasjonsside for dette formålet](../resources/infoside_tilflyttere.pdf).

Utdrag fra kravspesifikasjonen:
> Informasjonssiden bør gjenspeile følgende elementer fra skissen:
> - Plassering av bilder
> - Tekststørrelser
> - Formatering av tekst

Du kan bruke følgende bilde av Sogndals kommunevåpen i tjenesten:

!["Sogndal kommunevåpen"](../resources/kommune-logo.png )

## Legg til ny side
1. Legg til en ny side i skjemaet ved å trykke på "Legg til ny side"-knappen.
2. Merk at det automatisk legges til en "Navigasjonsknapper"-komponent på begge sidene, som brukes for å navigere
    frem og tilbake mellom sidene.
3. Endre navn på siden. Velg sidens ID under "Konfigurasjon", og skriv inn navnet `infoside`.
    - Det har automatisk dukket opp navigasjonsknapper på den nye siden. Åpne den første siden, og se at det også har 
    dukket opp navigasjonsknapper på denne. Åpne `infoside` igjen for å fortsette.
4. Klikk på menyien (tre prikker) ved siden av sidenavnet `infoside` og velg "Flytt opp". Du vil se at den nye siden kommer øverst i skjemaoversikten. 
5. Finn bildekomponenten i listen over standardkomponenter og dra den inn på infosiden.
6. Du kan dra og slippe bildekomponenten for å flytte den rundt på siden. Pass på at den
    ligger øverst på siden.
7. I egenskapene for kompontenen, åpne "Innhold".
8. Øverst i "Innhold"-seksjonen ligger en innstilling som heter "Komponentbredde". Valget "Bruk standardinnstilling" er på - skru av dette valget.
9. Sett bredden til 3. Pass på at valgt skjermstørrelse er "Mobil".
10. Under "BildeInnstillinger", i feltet "Kilde", legger du inn lenken til bildet: `https://docs.altinn.studio/nb/altinn-studio/getting-started/app-dev-course/resources/kommune-logo.png`.
11. Legg til en tittel under bildet. Tittelkomponenten kan du finne under seksjonen "Tekst" i panelet til venstre.
12. I panelet for egenskapene til komponenten, åpne "Tekst".
13. Velg "Ledetekst" og legg inn denne teksten:
    ```text
    Skjema for informasjonsinnsamling for fremtidige tilflyttere
    ```
14. Åpne "Innhold", gå til "Komponentbredde" og slå av valget "Bruk standardinnstilling".
16. Sett bredden til 9. Pass på at valgt skjermstørrelse er "Mobil".
17. Legg til en paragraf etter tittelen. Paragrefkomponenten kan du finne under seksjonen "Tekst" i panelet til venstre.
18. Åpne "Tekst"-seksjonen i konfigurasjonskolonnen (i midten).
19. Velg "Ledetekst" og legg inn denne teksten:
    ```text
    Opplysningene du oppgir i dette skjemaet vil benyttes til å skreddersy en pakke med kommunale tilbud til deg og de du eventuelt flytter til kommunen sammen med.
    ```
20. Dra inn en ny paragrafkomponent i skjemaet og lim inn denne teksten:
    ```text
    Du skal ikke bruke dette skjemaet hvis:
    - Du er allerede bosatt i Sogndal kommune
    - Du bor i en annen kommune og har ingen planer om å flytte
    - Du skal flytte til Sogndal, men **ikke** i løpet av de neste 12 månedene.
    ```
    Merk bruken av `-` for å formatere teksten som en punktliste, og `**` for å utheve tekst.


### Nyttig dokumentasjon
- [Formatering av tekster](/nb/altinn-studio/reference/ux/texts/#formatering-av-tekster)
- [Sidestilte komponenter](/nb/altinn-studio/reference/ux/styling/#sidestilte-komponenter-grid)

## Oppsummering
I denne modulen har vi lagt til en ny side i skjemaet. Vi har lagt inn informasjonskomponenter  som bilde og
tekster. Vi har stilt inn bredde på bilde og tekst, og lagt inn enkel formatering av tekst.


{{<navigation-buttons
  urlBack="../modul3"
  textBack="<< Forrige modul"
  urlNext="../modul5"
  textNext="Neste modul >>"
>}}
