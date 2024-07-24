---
title: Lag infoside
description: Lag en informasjonsside som brukerne ser når de starter tjenesten.
linktitle: Lag infoside
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
- Tilpasse komponentbredde i et skjema

## Krav fra Sogndal kommune
Siden Sogndal kommune vil samle inn personopplysninger i denne tjenesten, må de klargjøre hvem skjemaet 
er ment for og hvordan de vil bruke dataene. Noen i kommunen har laget 
[et utkast til en informasjonsside for dette formålet](../resources/infoside_tilflyttere.pdf).

Informasjonssiden bør gjenspeile følgende elementer:
 - plassering av bilder
 - tekststørrelser
 - formatering av tekst

Du kan bruke følgende bilde av Sogndals kommunevåpen i tjenesten:

!["Sogndal kommunevåpen"](../resources/kommune-logo.png )

## Legg til ny side
1. Legg til en ny side i skjemaet ved å trykke på "Legg til ny side"-knappen.
2. Merk at det automatisk legges til en "Navigasjonsknapper"-komponent på begge sidene, som brukes for å navigere
    frem og tilbake mellom sidene.
3. Endre navn på den nye siden ved å klikke på sidens ID i konfigurasjonskolonnen, og skriv inn navnet `infoside`.
    - Det har automatisk dukket opp navigasjonsknapper på den nye siden. Åpne den første siden, og se at det også har 
    dukket opp navigasjonsknapper på denne. Åpne `infoside` igjen for å fortsette.
4. Klikk på menyikonet (tre prikker) ved siden av sidenavnet `infoside` og velg "Flytt opp".
    - Se at den nye siden nå flytter seg til øverst i skjemaoversikten. 
5. Legg til en Bilde-komponent fra komponentoversikten til venstre ved å dra den inn i `infoside`. Denne ligger under "Standard"-listen med komponenter.
6. Merk at du kan flytte bildekompnenten opp og ned på siden ved å dra den og slippe i ønsket posision. Pass på at bildekomponenten
    ligger øverst på siden.
7. Åpne "Innhold"-seksjonen i konfigurasjonskolonnen. 
8. Øverst i "Innhold"-seksjonen ligger en innstilling som heter "Komponentbredde". Valget "Bruk standardinnstilling" er på - skru av dette valget.
9. Sett bredden til 3. Pass på at valgt skjermstørrelse er "Mobil".
10. Under "Innstillinger for bilde" (nederst in "Innhold"-seksjonen), i feltet "Kilde", lim inn lenken til bildet: `https://docs.altinn.studio/nb/altinn-studio/getting-started/app-dev-course/resources/kommune-logo.png`.
11. Legg til en tittel under bildet. Tittelkomponenten kan du finne under seksjonen "Tekst" i panelet til venstre.
12. Åpne "Tekst"-seksjonen i konfigurasjonskolonnen (i midten).
13. Klikk på "Ledetekst" og legg inn denne teksten:
    ```text
    Skjema for informasjonsinnsamling for fremtidige tilflyttere
    ```
14. Åpne "Innhold"-seksjonen i konfigurasjonskolonnen. 
15. Øverst i "Innhold"-seksjonen ligger en innstilling som heter "Komponentbredde". Valget "Bruk standardinnstilling" er på - skru av dette valget.
16. Sett bredden til 9. Pass på at valgt skjermstørrelse er "Mobil".
17. Legg til en paragraf etter tittelen. Paragrefkomponenten kan du finne under seksjonen "Tekst" i panelet til venstre.
18. Åpne "Tekst"-seksjonen i konfigurasjonskolonnen (i midten).
19. Klikk på "Ledetekst" og legg inn denne teksten:
    ```text
    Opplysningene du oppgir i dette skjemaet vil benyttes til å skreddersy en pakke med kommunale tilbud til deg og de du eventuelt flytter til kommunen sammen med.
    ```
20. Legg til en ny paragrafkomponent i skjemaet og lim inn denne teksten:
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
