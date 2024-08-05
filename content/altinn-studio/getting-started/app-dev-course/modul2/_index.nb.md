---
title: "Modul 2: Tilpasse datamodellen"
description: I denne modulen skal du tilpasse datamodellen til tjenesten.
weight: 20
toc: true
---

I denne modulen skal vi tilpasse _datamodellen_ for skjemaet vi skal lage.

## Temaer som dekkes i denne modulen
- Endre navn på felter i datamodellen
- Endre type på felter i datamodellen
- Legge til nye felter i datamodellen
- Endre innstillinger på felter i datamodellen

## Krav fra Sogndal kommune
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
**Man kan se på en datamodell som en innholdsfortegnelse for skjemaet.**

For et enkelt skjema er det ofte en én-til-én-knytning fra felter i datamodellen til felter i skjemaet. For mer avanserte
skjemaer kan datamodellen og skjemaet være ganske forskjellige.

Det følger med en datamodell med noen eksempelfelter når du oppretter en tjeneste. Du kan kan redigere feltnavnene
for å tydelig vise hva de representerer, og legge til egne felter.

Datamodellen brukes til å bestemme _hva_ som skal hentes inn av data. Den brukes også til å bestemme _hvordan_ dataene
skal se ut, ved at man setter på begrensninger som blir validert.

### Legg til navn og alder
1. Gå til "Datamodell" i menyen.
   - Du får da opp datamodellen, med de feltene som er lagt inn.
2. Velg det første feltet i datamodellen, `property1`. Du får redigeringsmuligheter i et panel til høyre.
3. Endre navnet på feltet `property1` til `fornavn`.
4. Velg feltet `property2` ,og endre navnet på feltet til `etternavn`.
5. Velg feltet `property3`, og endre navnet på feltet til `mellomnavn`.
6. Merk at `mellomnavn`-feltet ikke er obligatorisk. Det ser du fordi valget "Påkrevd" er slått av. Klikk på feltene 
    `fornavn` og `etternavn` og sjekk at disse feltene er satt som påkrevd. Du kan beholde disse innstillingene som de er.
7. Velg "Legg til" ved siden av `model` øverst i datamodellen og velg "Heltall".
8. Se at det nå er lagt til et nytt felt med navn "name0" og type "Heltall" nederst i datamodellen. Endre navn på heltallfeltet til `alder`.
9. Lenger nede i "Egenskaper"-panelet på høyresiden er det et felt som heter "Mindre enn eller lik". Skriv inn tallet `120` i dette feltet.

### Legg til adresse
1. Velg "Legg til" ved siden av `model` øverst i datamodellen og velg "Objekt".
2. Du skal nå se at det er lagt til et nytt felt med navnet "name0" og typen "Objekt" nederst i datamodellen. Endre navn på objektet til `adresse`.
3. Velg `adresse`. Du skal nå se beskjeden `Dette elementet er tomt`.
4. Hold musepekeren over adressefeltet. Du vil da se tre knapper ved siden av feltet. Velg `+` og deretter "Legg til tekst" i menyen for å legge til et nytt tekstfelt i gruppen.
5. Velg det nye feltet du la inn i gruppen, og endre navnet til `gateadresse`.
6. Hold musepekeren på nytt over `adresse`-gruppen, og velg `+`-tegnet og deretter "Legg til tekst" for å legge til et nytt tekstfelt i gruppen. Gi feltet navnet `postnummer`.
7. Legg til enda et nytt tekstfelt i `adresse`-gruppen og gi feltet navnet `poststed`.

### Legg til kontaktinformasjon
1. Gå tilbake til toppen av datamodellen og legg til en ny gruppe med navn `kontaktinfo`.
   - Velg "Legg til" ved siden av `model` øverst i datamodellen, og velg "Objekt". Bytt navnet på feltet fra "name0" til "kontaktinfo".
2. Legg til et tekstfelt i `kontaktinfo`-gruppen, og gi feltet navnet `epost`.
3. Legg til et til tekstfelt i `kontaktinfo`-gruppen og gi feltet navnet `telefon`.
4. Du har nå lagt inn alle feltene som kommunen ønsket å ha på første side. Velg "Generer modeller" for å lage alle nødvendige
    modellfiler for tjenesten. Du får en bekreftelse på at modellen er generert.

<video autoplay loop controls muted src="./create-datamodel.mp4">Nettleseren din støtter ikke videoavspilling.</video>

## Oppsummering
I denne modulen har du tilpasset datamodellen til tjenesten ved å legge til ønskede felter og navngi dem.

{{<navigation-buttons
  urlBack="../modul1"
  textBack="<< Forrige modul"
  urlNext="../modul3"
  textNext="Neste modul >>"
>}}
