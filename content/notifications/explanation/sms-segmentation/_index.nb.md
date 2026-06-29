---
title: SMS-segmentering
description: "Lange SMS-meldinger deles automatisk opp i flere segmenter for å kunne leveres. Denne artikkelen forklarer hvordan SMS-segmentering fungerer, hvordan tegnene i meldingen avgjør hvor mange segmenter den blir, og hva det betyr for kostnaden."
linktitle: SMS-segmentering
tags: [sms, segmentering, tegnbegrensning]
weight: 40
---

## Innledning

En SMS kan bare inneholde et begrenset antall tegn. Når du sender en lengre melding gjennom Altinn Varslinger, deles den automatisk opp i flere deler, kalt segmenter. Mottakeren ser fortsatt én sammenhengende melding, fordi telefonen setter segmentene sammen igjen.

Det er nyttig å forstå hvordan denne oppdelingen fungerer, for hvert segment teller og faktureres som en egen SMS. En melding som ser kort ut, kan likevel bli til flere segmenter dersom den inneholder visse tegn. Tegnene du bruker, påvirker altså både kostnaden og hvor mye tekst det er plass til.

## Tegnkodingen bestemmer segmentlengden

Hvor mange tegn det er plass til i hvert segment, avhenger av hvordan teksten kodes. En SMS sendes på én av to måter, og mottelefonen velger automatisk ut fra hvilke tegn meldingen inneholder:

- **GSM-7** er standardalfabetet for SMS. Det dekker vanlige bokstaver, tall og tegnsetting, og **de norske bokstavene æ, ø og å** (også store). Så lenge meldingen bare bruker tegn fra dette alfabetet, er det god plass i hvert segment.
- **UCS-2** brukes når meldingen inneholder minst ett tegn som ikke finnes i GSM-7-alfabetet, for eksempel en emoji eller et ikke-latinsk tegn. Da kodes hele meldingen på en måte som tar mer plass, og det blir plass til langt færre tegn per segment.

Det holder med ett eneste tegn utenfor GSM-7-alfabetet for at hele meldingen går over til UCS-2. Da blir plassen mer enn halvert, slik tabellen under viser.

## Hvor mange tegn det er plass til

| Tegnkoding | Enkeltmelding | Per segment i en oppdelt melding |
|------------|---------------|----------------------------------|
| GSM-7 (vanlig tekst, inkludert æ, ø, å) | 160 tegn | 153 tegn |
| UCS-2 (emoji, typografiske tegn, ikke-latinske tegn) | 70 tegn | 67 tegn |

Når en melding må deles opp, går noe av plassen i hvert segment med til skjøteinformasjon, altså opplysninger telefonen trenger for å sette segmentene sammen i riktig rekkefølge. Derfor rommer hvert segment litt mindre enn en enkeltmelding: 153 tegn med GSM-7 og 67 tegn med UCS-2.

### Tegn som teller dobbelt i GSM-7

Noen tegn finnes i GSM-7, men i en egen utvidelsestabell, og hvert av dem teller som **to** tegn:

- `^ { } \ [ ] ~ |`
- `€` (eurotegnet)

Bruker du for eksempel flere krøllparenteser eller eurotegn, fylles meldingen raskere enn antall synlige tegn skulle tilsi.

## Antall segmenter og øvre grense

En melding kan bli inntil **16 segmenter** i Altinn Varslinger. Hvor mye tekst det gir plass til totalt, avhenger av tegnkodingen:

- Med **GSM-7** er den øvre grensen 16 × 153 tegn.
- Med **UCS-2** er den øvre grensen 16 × 67 tegn.

Det finnes altså ikke ett fast tak på antall tegn. Taket avhenger av hvilke tegn meldingen inneholder. En melding med bare vanlig tekst får plass til mye mer enn en melding med emoji eller andre spesialtegn.

Meldinger som er lengre enn 16 segmenter, blir avkortet. Da kommer ikke hele teksten fram til mottakeren, og derfor er det viktig å holde lange meldinger innenfor grensen.

## Eksempel: ett tegn kan doble kostnaden

Tenk deg en melding på 70 tegn som bare bruker vanlige bokstaver:

- Skrevet med vanlig tekst (GSM-7) får den plass i **én** SMS, siden grensen er 160 tegn. Du betaler for ett segment.
- Bytter du ut det vanlige sitattegnet `"` med et typografisk anførselstegn (`"` eller `"`), eller legger til én emoji, går hele meldingen over til UCS-2. Da er grensen 70 tegn for en enkeltmelding, og en melding på 70 tegn fyller akkurat opp. Legger du til litt mer tekst, deles den i **to** segmenter à 67 tegn, og du betaler for to.

Ett enkelt «smart» anførselstegn, en tankestrek (– eller —) eller en emoji kan altså flytte meldingen fra GSM-7 til UCS-2 og mer enn doble antall segmenter, og dermed kostnaden.

## Råd for å holde kostnaden nede

For å unngå at meldingene blir dyrere eller lengre enn nødvendig:

- Hold meldingene korte. Jo kortere teksten er, desto større er sjansen for at den får plass i ett segment.
- Vær forsiktig med emoji og typografiske tegn. Ett enkelt slikt tegn kan halvere plassen og doble kostnaden.
- Pass på hvilke anførselstegn og tankestreker du kopierer inn. Tegn fra tekstbehandlere er ofte typografiske varianter som utløser UCS-2. Bruk heller vanlig `"` og bindestrek `-`.
- Hold lange meldinger innenfor 16 segmenter. Tekst utover grensen blir avkortet og kommer ikke fram.
- Vurder e-post for lengre innhold. SMS egner seg best til korte beskjeder.
