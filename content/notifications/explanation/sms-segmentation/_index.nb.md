---
title: SMS-segmentering
description: "Altinn Varslinger deler automatisk opp lange SMS-meldinger i flere segmenter for å sikre levering. Denne artikkelen forklarer hvordan SMS-segmentering fungerer, hvilke tegnbegrensninger som gjelder, og hva som fungerer og ikke fungerer når du bruker API-et."
linktitle: SMS-segmentering
tags: [sms, segmentering, tegnbegrensning]
weight: 40
---

## Introduksjon

SMS-meldinger har tekniske begrensninger på hvor mange tegn som kan sendes i én enkelt melding. Når du sender SMS via Altinn Varslinger, håndterer systemet automatisk oppdeling av lange meldinger i flere segmenter. Dette gjør at du kan sende lengre tekster uten å måtte dele dem opp manuelt.

Å forstå hvordan segmentering fungerer er viktig for å sikre at meldingene dine leveres som forventet, og for å unngå at meldinger blir avvist på grunn av lengdebegrensninger.

## Hvordan SMS-segmentering fungerer

SMS-teknologien har to forskjellige måter å håndtere meldingslengde på:

### Enkeltmelding (opp til 160 tegn)

Hvis meldingen din inneholder **160 tegn eller mindre**, sendes den som én enkelt SMS. Dette er den mest effektive måten å sende korte meldinger på.

### Konkatenerte meldinger (over 160 tegn)

Når meldingen er **lengre enn 160 tegn**, deles den automatisk opp i flere segmenter som sendes separat og settes sammen igjen på mottakerens telefon. Hvert segment i en konkatenert melding kan inneholde **opp til 134 tegn**.

{{% notice info %}}
Grunnen til at segmentene er på 134 tegn i stedet for 160 tegn, er at noe plass brukes til metadata som forteller mottakerens telefon hvordan segmentene skal settes sammen igjen.
{{% /notice %}}

## Tegnbegrensninger

Altinn Varslinger har følgende begrensninger for SMS-meldinger:

- **Enkeltmelding**: opp til **160 tegn**
- **Konkatenert melding**: opp til **134 tegn per segment**
- **Maksimalt antall segmenter**: **16 segmenter**
- **Maksimal totallengde**: **2144 tegn** (16 × 134 tegn)

{{% notice warning %}}
Den maksimale grensen på 16 segmenter er en begrensning i SMS-gatewayen som Altinn Varslinger bruker. Meldinger som overskrider denne grensen avkortes til de første 16 segmentene.
{{% /notice %}}

### Eksempel på segmentering

| Meldingslengde | Antall segmenter | Beskrivelse |
|----------------|------------------|-------------|
| 50 tegn | 1 | Sendes som én enkelt SMS |
| 160 tegn | 1 | Sendes som én enkelt SMS (maksimal lengde) |
| 161 tegn | 2 | Deles i 2 segmenter (134 + 27 tegn) |
| 268 tegn | 2 | Deles i 2 segmenter (134 + 134 tegn) |
| 269 tegn | 3 | Deles i 3 segmenter (134 + 134 + 1 tegn) |
| 2144 tegn | 16 | Deles i 16 segmenter (maksimal lengde) |
| 2145 tegn | 16 | Avkortes til 16 segmenter (innhold forkortes) |

## Spesialtegn og URL-koding

Når systemet beregner meldingslengden, måles lengden basert på **URL-kodet format**. Dette betyr at visse spesialtegn teller som mer enn ett tegn.

### Tegn som påvirker lengden

Følgende typer tegn kan påvirke den faktiske lengden av meldingen:

- **Æ, Ø, Å** og andre nasjonale spesialtegn
- **Emojier** og andre spesialsymboler
- **Linjeskift** og andre kontrolltegn

### Praktisk eksempel

```text
Original melding: "Møte kl. 14:00 🕐"
Lengde i tegn: 18 tegn
URL-kodet lengde: Kan være betydelig lengre på grunn av emojien
```

{{% notice info %}}
For å være sikker på at meldingen din ikke overstiger grensene, bør du teste med representative eksempler som inneholder de samme typene spesialtegn du planlegger å bruke.
{{% /notice %}}

## Begrensninger og hva som ikke fungerer

### Hva skjer med meldinger over 2144 tegn?

Når en melding (målt i URL-kodet lengde) overskrider 2144 tegn:

- Meldingen **avkortes automatisk** til de første 16 segmentene (2144 tegn)
- Innhold utover denne grensen **sendes ikke**
- Du får **ingen feilmelding** fra API-et om at innholdet er avkortet

{{% notice warning %}}
API-et vil ikke varsle deg om at meldingen er avkortet. Det er derfor svært viktig å teste meldingslengden på forhånd, spesielt hvis du bruker mange spesialtegn.
{{% /notice %}}

### Anbefalinger

For å sikre at meldingene dine leveres som forventet:

1. **Hold meldinger korte og konsise** - under 160 tegn om mulig
2. **Unngå unødvendige emojier** - disse kan øke lengden betydelig
3. **Test med representative data** - bruk spesialtegn som ligner på det du vil bruke i produksjon
4. **Planlegg for segmentering** - dersom du vet at meldingen blir lang, sørg for at den fortsatt gir mening selv om den deles opp
5. **Vurder alternative kanaler** - for lengre meldinger kan e-post være et bedre valg

## Hvordan API-et håndterer segmentering

Når du sender en SMS via Altinn Varslinger API-et:

1. **Du sender hele meldingen** - du trenger ikke dele den opp selv
2. **Systemet beregner lengden** - basert på URL-kodet lengde
3. **Systemet beregner antall segmenter** - og begrenser til maksimalt 16 segmenter
4. **Systemet deler opp meldingen** - automatisk i segmenter dersom nødvendig
5. **Meldingen sendes** - segmentene leveres til SMS-gatewayen

{{% notice warning %}}
Hvis den URL-kodede lengden av meldingen krever mer enn 16 segmenter, sendes kun de første 16 segmentene (2144 tegn). Du får ingen feilmelding om dette, så det er viktig å validere meldingslengden på forhånd.
{{% /notice %}}

{{% notice info %}}
Du kan ikke kontrollere hvordan meldingen deles opp i segmenter. Oppdelingen skjer automatisk basert på tegngrensene beskrevet i denne artikkelen.
{{% /notice %}}
