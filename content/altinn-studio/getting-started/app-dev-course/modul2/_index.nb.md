---
title: Tilpass datamodellen
description: I denne modulen skal vi tilpasse datamodellen til tjenesten
weight: 20
toc: true
---

I denne modulen skal vi tilpasse _datamodellen_ for skjemaet vi skal lage.

### Temaer som dekkes i denne modulen
- Endre navn på felter i datamodellen
- Endre type på felter i datamodellen
- Legge til nye felter i datamodellen
- Endre innstillinger på felter i datamodellen

### Krav fra Sogndal kommune
Kommunen ønsker i første omgang å samle inn følgende data om innflyttere:
- Personinformasjon
  - Fornavn
  - Mellomnavn (valgfritt)
  - Etternavn
  - Alder
- Adresse
  - Gateadresse
  - Postnummer
  - Poststed
- Kontaktinformasjon
  - Epost
  - Telefon

## Tilpass datamodellen
Datamodellen definerer hvilke data man forventer å samle inn, og hvilket format disse skal være på. 
> _**Man kan se på en datamodell som en innholdsfortegnelse for skjemaet.**_

For et enkelt skjema er det ofte en 1-1 knytning fra felter i datamodellen til felter i skjemaet, mens for mer avanserte
skjemaer kan datamodellen og skjemaet være ganske forskjellige.

En datamodell med noen eksempel-felter følger med når man oppretter en tjeneste. Man kan redigere feltnavnene
for å gjøre det tydelig hva de representerer, og legge til egne felter. 

Datamodellen brukes til å bestemme _hva_ som skal hentes inn av data. Den brukes også til å bestemme _hvordan_ dataene
skal se ut/være, ved at man setter på begrensninger som valideres.

1. Naviger til "Datamodell"-siden ved å trykke på "Datamodell" i meny-linjen øverst på siden.
   - Du får da opp datamodellen, med de feltene som er lagt inn.
2. Klikk på det første feltet i datamodellen, `property1`. Det dukker da opp en del redigeringsmuligheter i høyre-panelet.
3. Endre navnet på feltet `property1` til `fornavn`.
4. Velg feltet `property2` ,og endre navnet på feltet til `etternavn`.
5. Velg feltet `property3`, og endre navnet på feltet til `mellomnavn`.
6. Merk at `mellomnavn`-feltet ikke er satt som påkrevd, ved at valget "Påkrevd" er skrudd av. Klikk på feltene 
    `fornavn` og `etternavn` og se at disse feltene er satt som påkrevd. Du kan beholde disse innstillingene som de er.
7. Klikk på "Legg til"-knappen ved siden av `model` øverst i datamodellen og velg "Heltall".
8. Se at det nå er lagt til et nytt felt med navn "name0" og type "Heltall" nederst i datamodellen. Endre navn på heltall-feltet til `alder`.
9. Lenger nede i "Egenskaper"-panelet på høyre-siden er det et felt som heter "Minder eller lik". Skriv inn tallet `120` i dette feltet. 
10. Klikk på "Legg til"-knappen ved siden av `model` øverst i datamodellen og velg "Objekt".
11. Se at det nå er lagt til et nytt felt med navn "name0" og type "Objekt" nederst i datamodellen. Endre navn på objekt-feltet til `adresse`.
12. Klikk på `adresse`-feltet i datamodellen. Se at pilen nå peker ned, og det åpner seg en gruppe under feltet, med beskjeden `Dette elementet er tomt`.
13. Hold musepekeren over adressefeltet. Du vil da se 3 knapper ved siden av feltet. Trykk på `+`-tegnet og så "Legg til felt" i meny-listen for å legge til et nytt felt i gruppen.
14. Klikk på det nye feltet som ble lagt inn i gruppen, og endre navn på feltet til `gateadresse`.
15. Hold musepekeren på nytt over `adresse`-gruppen, og trykk på `+`-tegnet og "Legg til felt" for å legge til et nytt felt i gruppen. Gi feltet navnet `postnummer`.
    - Feltet får automatisk typen "Tekst", og kan beholde den typen.
16. Legg til enda et nytt felt i `adresse`-gruppen og gi feltet navnet `poststed`.
    - Feltet får automatisk typen "Tekst", og kan beholde den typen.
17. Gå tilbake til toppen av datamodellen og legg til en ny gruppe med navn `kontaktinfo`.
    - Trykk på "Legg til"-knappen ved siden av `model` øverst i datamodellen og velg "Objekt". 
18. Legg til et felt i `kontaktinfo`-gruppen, og gi feltet navn `epost`.
19. Legg til et til felt i `kontaktinfo` gruppen og gi feltet navn `telefon`.
20. Alle feltene fra kravlisten er nå lagt inn. Trykk på knappen "Generer modeller" for å lage alle nødvendige
    modellfiler for tjenesten. Når dette er fullført vil du se en grønn boks med en bekreftende melding øverst
    på siden.

<video autoplay loop controls muted src="./create-datamodel.mp4">Nettleseren din støtter ikke videoavspilling.</video>

## Oppsummering
I denne modulen har du tilpasset datamodellen til tjenesten ved å legge til ønskede felter og navngi dem.

{{<navigation-buttons
  urlBack="../modul1"
  textBack="<< Forrige modul"
  urlNext="../modul3"
  textNext="Neste modul >>"
>}}