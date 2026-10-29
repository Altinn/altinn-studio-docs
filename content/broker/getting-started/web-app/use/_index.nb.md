---
title: Sende og motta filer i nettleseren
linktitle: Sende og motta
description: Slik logger du inn og sender eller laster ned filer i Altinn Formidling.
tags: [Broker, guide, Formidling]
toc: true
weight: 20
---

Denne veiledningen er for deg som sender eller mottar filer på vegne av en virksomhet. Tjenesteeieren må ha satt opp formidlingstjenesten først. Se [Slik setter du opp en formidlingstjeneste for nettleseren](/nb/broker/getting-started/web-app/service-owner/).

I testmiljøet TT02 åpner du

https://ab.tt02.altinn.no

## Logg inn

1. Åpne Formidling i nettleseren og logg inn med ID-porten.
2. Velg virksomheten du representerer, øverst på siden.

Du ser bare virksomheter du kan representere. Bytter du virksomhet, bytter også listene under.

Menyen har tre valg under **Formidlinger**:

- **Dine formidlingstjenester** er tjenestene virksomheten kan sende med, motta fra eller konfigurere.
- **Aktive formidlinger** er filer mottakeren fortsatt kan laste ned.
- **Historiske formidlinger** er filer som er ferdige.

## Finn tjenesten

1. Åpne **Dine formidlingstjenester**.
2. Søk i **Søk etter formidlingstjenester** hvis listen er lang.
3. Klikk på tjenesten.

Ser du ikke tjenesten, står ikke virksomheten din på tilgangslisten, eller den mangler rett til å sende eller motta. Ta kontakt med tjenesteeieren.

Kan du bare motta, står det **Du er ikke autorisert for å sende på denne tjenesten.** Du kan likevel laste ned filer som er sendt til deg, under **Aktive formidlinger**.

## Send en fil

Du ser **Opprett ny formidling** når virksomheten kan sende, og tjenesten har minst én mottaker du kan sende til.

1. Klikk på **Opprett ny formidling**.
2. Kontroller **Avsender**. Det er virksomheten du valgte øverst.
3. Velg **Mottakere**. Du kan bare velge virksomheter på tilgangslisten. Har tjenesten en påkrevd part, er mottakeren allerede valgt.
4. Skriv en **Referanse**. Den bruker du til å kjenne igjen formidlingen senere.
5. Legg til **Andre metadata** hvis mottakeren trenger nøkkel og verdi sammen med filen. Feltet er valgfritt.
6. Kryss av **Varsle mottakere** hvis mottakerne skal få beskjed. Velg **Varslingskanal**. Slå på **Send påminnelse** hvis de skal få en ny beskjed etter sju dager. Under **Varsle andre i tillegg** kan du oppgi e-postadresse eller mobilnummer til en kontaktperson, på vegne av en av mottakerne.
7. Velg filen.
8. Du ser **Virusskann filen** bare når tjenesten tillater å slå av skanning. Er skanning på, kan mottakeren laste ned filen etter at den er skannet.
9. Klikk på **Send formidling**.

Bli på siden til opplastingen er ferdig. Du kan klikke **Pause** og deretter **Fortsett**. Er opplastingen avbrutt, klikker du **Fortsett opplastingen**. Vil du stanse den, klikker du **Avbryt opplastingen**.

Når opplastingen er ferdig, åpnes formidlingen under **Aktive formidlinger**.

## Last ned en fil

1. Åpne **Aktive formidlinger**.
2. Søk i **Søk på referanse**, eller velg tjeneste i **Filtrer på tjeneste**.
3. Klikk på formidlingen.
4. Klikk på **Start nedlasting**.
5. Når filen er lagret hos deg, klikker du **Bekreft nedlasting**.

Bekreftelsen forteller avsenderen at du har filen. Har tjenesteeieren slått på sletting etter bekreftelse, sletter Formidling filen når venteperioden er ute og alle mottakerne har bekreftet.

Avsender ser status på samme side, men ikke **Start nedlasting**.

## Se tidligere formidlinger

Åpne **Historiske formidlinger** for filer som ikke lenger er aktive. Du kan søke på referanse og filtrere på tjeneste. Du laster ikke ned filer fra denne listen.
