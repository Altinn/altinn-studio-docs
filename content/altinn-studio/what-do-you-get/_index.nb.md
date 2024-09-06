---
title: Hva får du?
description: Overordnet beskrivelse av hva du får ut av boksen med Altinn Studio
weight: 20
---

## Tilgjengelige tjenester
Alle som har laget web løsninger vet at det krever litt ekstra jobb for å lage gode tilgjengelige tjenester.
Med Altinn Studio før du støtte for:
- WCAG og ELMER 3 standardene
- Responsivt design

Vi bruker komponenter fra  [Felles Designsystem](https://www.designsystemet.no/) som sikrer en helhetlig brukeropplevelse
og gode, brukervennlige tjenester.

## Både skjema og API innsending samtidig
Våre tjenester har som standard støtte for både skjema- og API-basert innsending av data. De som har behov for å sende
inn store mengder data kan velge å gjøre dette via tjenesten side standard API'er. Det er den samme datamodellen
og de samme valideringsreglene som ligger til grunn.

## Skjemakontroll
Du har selv kontroll på hvordan et skjema skal fremstå med tanke på antall sider og komponenter på sidene. Vi tilbyr
et sett med skjemakomponenter som dekker alt fra enkle inputfelter til repeterende grupper og avanserte tabeller.

## Vedlegg
Vi støtter opplasting av vedlegg, både direkte i et skjema og via API. Opplasting av vedlegg i skjema kan også fordeles
over flere skjemakomponenter og på forskjellige sider. Vi har relativt rik støtte for funksjonalitet 
knyttet til vedlegg, som f.eks:
- Virus skanning av vedlegg
- Kontroll av filtyper, størrelse og antall vedlegg
- Mulighet til å skrive egen logikk for utvidet kontroll
- Tagging/merking av vedlegg
- Så mange vedlegg du vil

## Forhåndsutfylte data
Du kan hjelpe brukeren på vei ved å forhåndsutfylle skjema med data man allerede har tilgjengelig. Dataene kan komme
f.eks. fra offentlige registere, og vi har en standard konfigurasion for forhåndsutfylte data fra:
- Enhetsregisteret
- Folkeregisteret
- Altinn Profil/Kontakt og Reservasjonsregisteret

Du kan også skrive din egen logikk for å forhåndsutfylle med data fra f.eks. egne API'er.

## Kodelister
Vi har støtte for å hente inn valgmuligheter til felt skjema fra en rekke standard kodelister. I tillegg kan man definere 
sine egne statiske kodelister, eller koble seg opp mot et API for å hente valg derfra.
Det er også mulig å skrive logikk hvor man tilpasser _hvilke_ valg fra en kodeliste som er tilgjengelig for brukeren, 
f.eks. basert på noe brukeren har svart på tidligere.

## Dynamiske uttrykk
Dynamiske uttrykk lar deg uttrykke logikk og valideringer i et enkelt JSON basert språk. Uttrykk kan bygges i vårt
verktøy med en brukervennlig editor. Uttrykkene kjøres så både frontend og backend, og kan brukes til å bl.a.:
- Vise og skjule elementer dynamisk basert på brukerens valg
- Sette elementer som påkrevd eller skrivebeskyttet dynamisk basert på brukerens valg
- Styre tekster
- Styre prosessflyt
- Validering av skjemadata

## Full fleksibilitet
Hver tjeneste er en fullstendig web applikasjon, og man har dermed stor fleksibilitet. Det er fullt mulig å plugge inn 
egenutviklet kode for spesialtilpasninger. Vi tilbyr en del standard hendelser og oppsett som man kan hekte sin kode på,
eller man kan skrive noe helt eget.

Vi tilbyr også ferdig kode for integrasjoner med andre fellesløsninger, f.eks.:
- Maskinporten
- ID-porten
- eFormidling
- Hendelser
- data.altinn.no

## Prosess
Hver tjeneste kommer med en prosessflyt som kan konfigureres. Du kan selv definere hvilke steg du skal ha, hvem som skal 
ha tilgang, og hvilke handlinger som skal være tilgjengelig for hvem. Foreløpig støtter vi å kunne definere egne steg 
for:
- Datautfylling
- Signering
- Betaling
- Tilbakemelding
- Oppsummering

PDF for kvittering genereres automatisk.

## Utvikling
Ny funksjonalitet og feilrettinger legges ut fortløpende. Vi har også omfattende dokumentasjon, som inkluderer et 
[kurs](../../altinn-studio/getting-started/app-dev-course/) i å bruke Altinn Studio til tjenesteutvikling. 

Vi har etablert et enkelt oppsett for å kunne få et utviklingsmiljø som lar deg kjøre og teste tjenester lokalt på 
egen maskin.

Ved å publisere en tjeneste til et testmiljø, kan man også teste med brukere fra Tenor Testdata.